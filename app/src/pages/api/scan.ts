import type { APIRoute } from 'astro'
import { addLegoSet } from '../../utils/database'
import { fetchLegoSetInfo } from '../../utils/api'

export const POST: APIRoute = async ({ request }) => {
  try {
    const { barcode } = await request.json()

    const legoSet = await fetchLegoSetInfo(barcode)
    await addLegoSet(legoSet)

    return new Response(
      JSON.stringify({
        success: true,
        data: legoSet,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Scan API error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process barcode',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
