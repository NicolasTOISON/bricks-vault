import { PrismaClient, Condition } from '@prisma/client';
import type { APIRoute } from 'astro';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const purchase = await prisma.purchase.create({
      data: {
        legoSetId: Number(formData.get('legoSetId')),
        price: parseFloat(formData.get('price') as string),
        quantity: parseInt(formData.get('quantity') as string),
        condition: formData.get('condition') as Condition,
        purchaseDate: new Date(formData.get('purchaseDate') as string),
        seller: formData.get('seller') as string,
        notes: formData.get('notes') as string,
      },
    });

    return new Response(null, {
      status: 303,
      headers: {
        Location: '/achats',
      },
    });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create purchase' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const GET: APIRoute = async () => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        legoSet: true,
      },
      orderBy: {
        purchaseDate: 'desc',
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: purchases,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}; 