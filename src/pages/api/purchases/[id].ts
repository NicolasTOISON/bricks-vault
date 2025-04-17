import { PrismaClient, Condition } from '@prisma/client';
import type { APIRoute } from 'astro';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { id } = params;
    const formData = await request.formData();
    
    // Vérifier si c'est une requête PUT
    if (formData.get('_method') === 'PUT') {
      const purchase = await prisma.purchase.update({
        where: { id: Number(id) },
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
          Location: `/achats/${id}`,
        },
      });
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error updating purchase:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update purchase' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}; 