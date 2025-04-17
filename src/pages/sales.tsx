import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import SaleList from '../components/SaleList';
import Layout from '../components/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
  const [sales, inventory] = await Promise.all([
    prisma.sale.findMany({
      include: {
        legoSet: true,
      },
    }),
    prisma.inventory.findMany({
      include: {
        legoSet: true,
      },
    }),
  ]);

  return {
    props: {
      sales: JSON.parse(JSON.stringify(sales)),
      inventory: JSON.parse(JSON.stringify(inventory)),
    },
  };
};

export default function SalesPage({ sales, inventory }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SaleList sales={sales} inventory={inventory} />
      </div>
    </Layout>
  );
} 