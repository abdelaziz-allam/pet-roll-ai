import nodemailer from 'nodemailer';
import { env } from '../config/env';

interface MatchEmailData {
  senderName: string;
  senderEmail: string;
  senderPetName: string;
  senderPetBreed: string;
  senderPetPhoto?: string;
  receiverName: string;
  receiverEmail: string;
  receiverPetName: string;
  receiverPetBreed: string;
  receiverPetPhoto?: string;
  species: string;
  location?: string;
  matchDate: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
    });
  }

  async sendMatchWeddingCard(data: MatchEmailData): Promise<void> {
    const html = this.buildWeddingCardTemplate(data);

    const recipients = [data.senderEmail, data.receiverEmail].filter(Boolean);

    if (recipients.length === 0) {
      console.log('[EMAIL] No recipients for wedding card');
      return;
    }

    if (env.NODE_ENV === 'development' && !process.env.SMTP_USER) {
      console.log('[EMAIL] Wedding card would be sent to:', recipients.join(', '));
      console.log('[EMAIL] Subject: Congratulations! Your pets are matched!');
      console.log('[EMAIL] HTML length:', html.length);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"PET Roll" <${process.env.SMTP_FROM || 'noreply@petfolioo.com'}>`,
        to: recipients.join(', '),
        subject: `💕 Congratulations! ${data.senderPetName} & ${data.receiverPetName} are matched! 💕`,
        html,
      });
      console.log('[EMAIL] Wedding card sent to:', recipients.join(', '));
    } catch (err) {
      console.error('[EMAIL] Failed to send wedding card:', err);
    }
  }

  buildWeddingCardTemplate(data: MatchEmailData): string {
    const petEmoji = data.species === 'dog' ? '🐕' : data.species === 'cat' ? '🐱' : data.species === 'horse' ? '🐴' : '🐾';

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pet Match Celebration</title>
</head>
<body style="margin:0;padding:0;background:#fdf2f8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf2f8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(219,39,119,0.15);">

          <!-- Header with gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#ec4899 0%,#be185d 50%,#9d174d 100%);padding:40px 30px;text-align:center;">
              <div style="font-size:48px;margin-bottom:8px;">💕</div>
              <h1 style="color:#ffffff;font-size:28px;margin:0;font-weight:800;letter-spacing:-0.5px;">It's a Match!</h1>
              <p style="color:#fce7f3;font-size:14px;margin:8px 0 0;">A beautiful connection has been made</p>
            </td>
          </tr>

          <!-- Confetti decoration -->
          <tr>
            <td style="background:linear-gradient(180deg,#fce7f3 0%,#ffffff 100%);padding:30px 30px 0;text-align:center;">
              <div style="font-size:24px;letter-spacing:8px;">🎊 ✨ 🎉 ✨ 🎊</div>
            </td>
          </tr>

          <!-- Pet pairing section -->
          <tr>
            <td style="padding:24px 30px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <!-- Left Pet -->
                  <td width="40%" style="text-align:center;vertical-align:top;">
                    <div style="width:100px;height:100px;border-radius:50%;margin:0 auto;overflow:hidden;border:4px solid #3b82f6;box-shadow:0 8px 24px rgba(59,130,246,0.3);">
                      ${data.senderPetPhoto
                        ? `<img src="${data.senderPetPhoto}" width="100" height="100" style="object-fit:cover;display:block;" alt="${data.senderPetName}" />`
                        : `<div style="width:100px;height:100px;background:linear-gradient(135deg,#dbeafe,#93c5fd);display:flex;align-items:center;justify-content:center;font-size:36px;">♂</div>`
                      }
                    </div>
                    <h3 style="color:#1e40af;font-size:18px;margin:12px 0 4px;font-weight:700;">${data.senderPetName}</h3>
                    <p style="color:#6b7280;font-size:13px;margin:0;">${data.senderPetBreed}</p>
                    <p style="color:#9ca3af;font-size:11px;margin:4px 0 0;">Owner: ${data.senderName}</p>
                  </td>

                  <!-- Heart connector -->
                  <td width="20%" style="text-align:center;vertical-align:middle;">
                    <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#f43f5e,#e11d48);margin:0 auto;line-height:56px;box-shadow:0 8px 24px rgba(225,29,72,0.4);">
                      <span style="font-size:24px;">💖</span>
                    </div>
                    <p style="color:#e11d48;font-size:10px;margin:8px 0 0;font-weight:600;text-transform:uppercase;letter-spacing:1px;">${petEmoji} ${data.species}</p>
                  </td>

                  <!-- Right Pet -->
                  <td width="40%" style="text-align:center;vertical-align:top;">
                    <div style="width:100px;height:100px;border-radius:50%;margin:0 auto;overflow:hidden;border:4px solid #ec4899;box-shadow:0 8px 24px rgba(236,72,153,0.3);">
                      ${data.receiverPetPhoto
                        ? `<img src="${data.receiverPetPhoto}" width="100" height="100" style="object-fit:cover;display:block;" alt="${data.receiverPetName}" />`
                        : `<div style="width:100px;height:100px;background:linear-gradient(135deg,#fce7f3,#f9a8d4);display:flex;align-items:center;justify-content:center;font-size:36px;">♀</div>`
                      }
                    </div>
                    <h3 style="color:#be185d;font-size:18px;margin:12px 0 4px;font-weight:700;">${data.receiverPetName}</h3>
                    <p style="color:#6b7280;font-size:13px;margin:0;">${data.receiverPetBreed}</p>
                    <p style="color:#9ca3af;font-size:11px;margin:4px 0 0;">Owner: ${data.receiverName}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Celebration message -->
          <tr>
            <td style="padding:0 30px 24px;text-align:center;">
              <div style="background:linear-gradient(135deg,#fdf2f8,#fce7f3);border-radius:16px;padding:20px;border:1px solid #fbcfe8;">
                <p style="color:#be185d;font-size:16px;margin:0;font-weight:600;">🌟 Congratulations to both families! 🌟</p>
                <p style="color:#6b7280;font-size:14px;margin:10px 0 0;line-height:1.5;">
                  Love is in the air! <strong>${data.senderPetName}</strong> and <strong>${data.receiverPetName}</strong>
                  have been matched for a beautiful union. We wish them a wonderful journey together!
                </p>
              </div>
            </td>
          </tr>

          <!-- Match details card -->
          <tr>
            <td style="padding:0 30px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Match Date</td>
                        <td style="color:#1e293b;font-size:14px;font-weight:600;text-align:right;">${data.matchDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ${data.location ? `
                <tr>
                  <td style="padding:16px 20px;border-bottom:1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">📍 Location</td>
                        <td style="color:#1e293b;font-size:14px;font-weight:600;text-align:right;">${data.location}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding:16px 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">${petEmoji} Species</td>
                        <td style="color:#1e293b;font-size:14px;font-weight:600;text-align:right;text-transform:capitalize;">${data.species}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td style="padding:0 30px 32px;text-align:center;">
              <a href="#" style="display:inline-block;background:linear-gradient(135deg,#ec4899,#be185d);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:700;font-size:14px;box-shadow:0 8px 24px rgba(236,72,153,0.4);">
                View Match Details in App
              </a>
            </td>
          </tr>

          <!-- Footer with hearts -->
          <tr>
            <td style="background:linear-gradient(135deg,#fdf2f8,#fce7f3);padding:24px 30px;text-align:center;border-top:1px solid #fbcfe8;">
              <div style="font-size:20px;margin-bottom:8px;">💕 🐾 💕</div>
              <p style="color:#9d174d;font-size:12px;margin:0;font-weight:600;">PET Roll - Where Love Finds a Way</p>
              <p style="color:#9ca3af;font-size:11px;margin:8px 0 0;">Making beautiful connections between pets and their families</p>
              <div style="margin-top:16px;padding-top:16px;border-top:1px solid #fbb6ce;">
                <p style="color:#d1d5db;font-size:10px;margin:0;">You received this because your pet was matched on PET Roll.</p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }
}

export const emailService = new EmailService();
