import { GetServerSideProps } from 'next';
import { prisma } from '../lib/prisma';
import InventoryList from '../components/InventoryList';
import Layout from '../components/Layout';

export const getServerSideProps: GetServerSideProps = async () => {
  const inventory = await prisma.inventory.findMany({
    include: {
      legoSet: true,
    },
  });

  return {
    props: {
      inventory: JSON.parse(JSON.stringify(inventory)),
    },
  };
};

export default function InventoryPage({ inventory }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <InventoryList inventory={inventory} />
      </div>
    </Layout>
  );
} 