import { db, FieldValue, storage } from '../../config/firebase';
import { CreateBlogPostInput, UpdateBlogPostInput } from './blog.schema';
import { SeoService } from '../seo/seo.service';
import { FastifyBaseLogger } from 'fastify';

export class BlogService {
  private collection = db.collection('blog_posts');
  private seoService: SeoService;

  constructor(logger: FastifyBaseLogger) {
    this.seoService = new SeoService(logger);
  }

  private slugify(input: string): string {
    let slug = input.toLowerCase();
    slug = slug.replace(/<[^>]+>/g, '');
    slug = slug.replace(/[^a-z0-9\s-]/g, '');
    slug = slug.replace(/\s+/g, '-');
    slug = slug.replace(/-+/g, '-');
    slug = slug.replace(/^-|-$/g, '');
    if (slug.length > 80) slug = slug.substring(0, 80).replace(/-$/, '');
    return slug || 'post';
  }

  private async ensureUniqueSlug(slug: string, excludeId?: string): Promise<string> {
    let candidate = slug;
    let counter = 1;
    while (true) {
      const snapshot = await this.collection.where('slug', '==', candidate).limit(1).get();
      if (snapshot.empty) return candidate;
      if (excludeId && snapshot.docs[0].id === excludeId) return candidate;
      counter++;
      candidate = `${slug}-${counter}`;
    }
  }

  private calculateReadingTime(content: string): number {
    const text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const wordCount = text.split(' ').filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  }

  private generateExcerpt(content: string): string {
    const text = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length <= 155) return text;
    return text.substring(0, 155).replace(/\s+\S*$/, '') + '...';
  }

  async create(input: CreateBlogPostInput, author: string) {
    const slug = await this.ensureUniqueSlug(
      input.slug ? this.slugify(input.slug) : this.slugify(input.title)
    );
    const excerpt = input.excerpt || this.generateExcerpt(input.content);
    const readingTimeMinutes = this.calculateReadingTime(input.content);

    const data = {
      title: input.title,
      slug,
      content: input.content,
      excerpt,
      coverImageUrl: input.coverImageUrl || '',
      tags: input.tags || '',
      author,
      readingTimeMinutes,
      isPublished: input.isPublished,
      isFeatured: input.isFeatured,
      publishedDate: input.isPublished ? FieldValue.serverTimestamp() : null,
      metaTitle: input.metaTitle || '',
      metaDescription: input.metaDescription || '',
      viewCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    const doc = await this.collection.add(data);

    if (input.isPublished) {
      this.seoService.pingSearchEngines([`https://petfolioo.com/blog/${slug}`]);
    }

    return { id: doc.id, ...data, slug };
  }

  async update(id: string, input: UpdateBlogPostInput) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Blog post not found');
      error.statusCode = 404;
      throw error;
    }

    const existing = doc.data()!;
    const updates: Record<string, any> = { updatedAt: FieldValue.serverTimestamp() };

    if (input.title !== undefined) updates.title = input.title;
    if (input.content !== undefined) {
      updates.content = input.content;
      updates.readingTimeMinutes = this.calculateReadingTime(input.content);
      if (!input.excerpt) updates.excerpt = this.generateExcerpt(input.content);
    }
    if (input.excerpt !== undefined) updates.excerpt = input.excerpt;
    if (input.coverImageUrl !== undefined) updates.coverImageUrl = input.coverImageUrl;
    if (input.tags !== undefined) updates.tags = input.tags;
    if (input.metaTitle !== undefined) updates.metaTitle = input.metaTitle;
    if (input.metaDescription !== undefined) updates.metaDescription = input.metaDescription;
    if (input.isFeatured !== undefined) updates.isFeatured = input.isFeatured;

    if (input.slug !== undefined) {
      updates.slug = await this.ensureUniqueSlug(this.slugify(input.slug), id);
    }

    if (input.isPublished !== undefined) {
      updates.isPublished = input.isPublished;
      if (input.isPublished && !existing.publishedDate) {
        updates.publishedDate = FieldValue.serverTimestamp();
      }
    }

    await this.collection.doc(id).update(updates);

    if (input.isPublished && !existing.isPublished) {
      const slug = updates.slug || existing.slug;
      this.seoService.pingSearchEngines([`https://petfolioo.com/blog/${slug}`]);
    }

    return { id, ...existing, ...updates };
  }

  async delete(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Blog post not found');
      error.statusCode = 404;
      throw error;
    }
    await this.collection.doc(id).delete();
    return { success: true };
  }

  async getAll(options: { page?: number; limit?: number; search?: string; publishedOnly?: boolean }) {
    const { page = 1, limit = 10, search, publishedOnly = false } = options;

    let query: FirebaseFirestore.Query = this.collection;

    if (publishedOnly) {
      query = query.where('isPublished', '==', true);
    }

    query = query.orderBy('createdAt', 'desc');

    const countSnap = await query.count().get();
    const total = countSnap.data().count;

    const offset = (page - 1) * limit;
    const snapshot = await query.offset(offset).limit(limit).get();

    let posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      const { content, ...rest } = data;
      return { id: doc.id, ...rest };
    });

    if (search) {
      const term = search.toLowerCase();
      posts = posts.filter(
        (p: any) =>
          p.title?.toLowerCase().includes(term) ||
          p.tags?.toLowerCase().includes(term) ||
          p.author?.toLowerCase().includes(term)
      );
    }

    return { data: posts, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getBySlug(slug: string) {
    const snapshot = await this.collection
      .where('slug', '==', slug)
      .where('isPublished', '==', true)
      .limit(1)
      .get();

    if (snapshot.empty) {
      const error: any = new Error('Blog post not found');
      error.statusCode = 404;
      throw error;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }

  async getById(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Blog post not found');
      error.statusCode = 404;
      throw error;
    }
    return { id: doc.id, ...doc.data() };
  }

  async incrementViewCount(slug: string) {
    const snapshot = await this.collection
      .where('slug', '==', slug)
      .where('isPublished', '==', true)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update({ viewCount: FieldValue.increment(1) });
    }
  }

  async toggleFeatured(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      const error: any = new Error('Blog post not found');
      error.statusCode = 404;
      throw error;
    }
    const current = doc.data()!.isFeatured || false;
    await this.collection.doc(id).update({ isFeatured: !current, updatedAt: FieldValue.serverTimestamp() });
    return { id, isFeatured: !current };
  }

  async uploadCoverImage(file: Buffer, filename: string): Promise<string> {
    const bucket = storage.bucket();
    const path = `blog/${Date.now()}-${filename}`;
    const blob = bucket.file(path);

    await blob.save(file, {
      metadata: { contentType: 'image/jpeg' },
      public: true,
    });

    return `https://storage.googleapis.com/${bucket.name}/${path}`;
  }
}
