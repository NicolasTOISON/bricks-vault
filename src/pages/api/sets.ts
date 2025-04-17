import { PrismaClient } from '@prisma/client';
import type { APIRoute } from 'astro';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const setData = {
      setNumber: formData.get('setNumber') as string,
      name: formData.get('name') as string,
      theme: formData.get('theme') as string,
      year: parseInt(formData.get('year') as string),
      pieces: formData.get('pieces') ? parseInt(formData.get('pieces') as string) : null,
      minifigs: formData.get('minifigs') ? parseInt(formData.get('minifigs') as string) : null,
      retailPrice: formData.get('retailPrice') ? parseFloat(formData.get('retailPrice') as string) : null,
    };

    const set = await prisma.legoSet.create({
      data: setData,
    });

    return new Response(JSON.stringify(set), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating set:', error);
    return new Response(JSON.stringify({ error: 'Failed to create set' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const GET: APIRoute = async () => {
  try {
    const sets = await prisma.legoSet.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return new Response(JSON.stringify(sets), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching sets:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch sets' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 