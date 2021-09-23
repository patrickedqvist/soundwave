import Page from '@/components/ui/Page';
import Layout from '@/components/ui/Layout';
import NewReleases from '@/components/features/NewReleases';
import type { GetServerSideProps, NextPage } from 'next';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = (props) => {

  const router = useRouter();
     const { data: session } = useSession();

     useEffect(() => {       
       if (session?.error === 'RefreshAccessTokenError') {
         signIn('spotify', { callbackUrl: '/' }); // Force sign in to hopefully resolve error
       }
     }, [session]);

  const meta = {
    title: `Soundwave`,
    description: `See your spotify`,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <div className="container mx-auto">

          <NewReleases />
         
        </div>
      </Layout>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { } };
};

export default Home;