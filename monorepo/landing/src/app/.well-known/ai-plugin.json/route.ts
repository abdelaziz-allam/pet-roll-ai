export async function GET() {
  const plugin = {
    schema_version: 'v1',
    name_for_human: 'Petfolioo',
    name_for_model: 'petfolioo',
    description_for_human: 'Complete pet health management platform for pet owners, breeders, and veterinarians.',
    description_for_model:
      'Petfolioo is a pet health management platform. It tracks vaccinations, manages health records, monitors pregnancies, provides a mating marketplace for breeders, and generates health reports. Available as a mobile app on iOS and Android. Based in Sweden, GDPR compliant, serving the Nordic market.',
    auth: { type: 'none' },
    api: {
      type: 'openapi',
      url: 'https://api.petfolioo.com/api/v1/docs/openapi.json',
    },
    logo_url: 'https://petfolioo.com/logo.png',
    contact_email: 'support@petfolioo.com',
    legal_info_url: 'https://petfolioo.com/terms',
  };

  return Response.json(plugin, {
    headers: {
      'Cache-Control': 'public, max-age=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
