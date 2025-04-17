import { GetServerSideProps } from 'next';
import { prisma } from '../../../lib/prisma';
import LegoSetDetails from '../../../components/LegoSetDetails';
import Layout from '../../../components/Layout';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const legoSet = await prisma.legoSet.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  if (!legoSet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      legoSet: JSON.parse(JSON.stringify(legoSet)),
    },
  };
};

export default function LegoSetPage({ legoSet }) {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <LegoSetDetails legoSet={legoSet} />
      </div>
    </Layout>
  );
} 