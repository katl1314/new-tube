import { db } from '@/db';
import { categories } from '@/db/schema';

// TODO: Create a script to seed Categories
const categoryNames = [
  'Cars and vehicles',
  'Comedy',
  'Education',
  'Gaming',
  'Entertainment',
  'Film and animation',
  'How-to and style',
  'Music',
  'News and politics',
  'People and blog',
  'Pets and blogs',
  'Science and technology',
  'Sports',
  'Travel and events',
];

async function main() {
  console.log('Seeding categories');

  try {
    const values = categoryNames.map(category => ({
      name: category,
      description: `Videos related to ${category.toLowerCase()}`,
    }));

    // Categories schema insert
    await db.insert(categories).values(values);

    console.log(`Categories seeded successfully`);
  } catch (error: unknown) {
    console.error('Error seeding categories', error);
    process.exit(1);
  }
}

main();
