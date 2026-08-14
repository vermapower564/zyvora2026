import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Zyvora Database...');
  
  // Seed initial categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics & Audio',
      slug: 'electronics',
      description: 'High performance audio gear, smart gadgets, and wearable electronics.',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    },
  });

  const fashion = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: {
      name: 'Luxury Apparel & Fashion',
      slug: 'fashion',
      description: 'Tailored luxury streetwear, designer watches, and minimalist leather goods.',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    },
  });

  console.log('Seed finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
