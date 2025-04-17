import { PrismaClient } from '@prisma/client';
import type { APIRoute } from 'astro';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Validation des champs requis
    const name = formData.get('name');
    const year = formData.get('year');
    const pieces = formData.get('pieces');

    if (!name || !year || !pieces) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields', 
          details: {
            name: !name ? 'Name is required' : null,
            year: !year ? 'Year is required' : null,
            pieces: !pieces ? 'Pieces count is required' : null,
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Conversion et validation des types
    const yearNum = parseInt(year as string);
    const piecesNum = parseInt(pieces as string);
    const minifigsValue = formData.get('minifigs');
    const minifigsNum = minifigsValue ? parseInt(minifigsValue as string) : null;
    const imageValue = formData.get('image') as string || null;

    if (isNaN(yearNum) || isNaN(piecesNum) || (minifigsValue && isNaN(minifigsNum as number))) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid number format',
          details: {
            year: isNaN(yearNum) ? 'Year must be a number' : null,
            pieces: isNaN(piecesNum) ? 'Pieces count must be a number' : null,
            minifigs: minifigsValue && isNaN(minifigsNum as number) ? 'Minifigs count must be a number' : null,
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const setData = {
      name: name as string,
      year: yearNum,
      pieces: piecesNum,
      minifigs: minifigsNum,
      image: imageValue,
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
    return new Response(
      JSON.stringify({ 
        error: 'Failed to create set',
        details: error instanceof Error ? error.message : 'Unknown error'
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
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch sets',
        details: error instanceof Error ? error.message : 'Unknown error'
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