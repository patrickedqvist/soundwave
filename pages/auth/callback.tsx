import type { GetServerSideProps, NextPage } from "next"

import Layout from '@/components/ui/Layout';
import Page from '@/components/ui/Page';
import useAuth from "@/hooks/useAuth";
import { AuthState } from "@/contexts/auth/interface";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PageProps {
    authentication: AuthState
}

const LoginCallbackPage: NextPage<PageProps> = ({ authentication }) => {
  const { SaveAuthentication } = useAuth();
  const router = useRouter();

  useEffect(() => {

    if ( authentication ) {
        SaveAuthentication(authentication);
        router.push('/')
    }

  }, [authentication, SaveAuthentication, router])

  const meta = {
    title: 'Verifying authentication',
    description: '',
  };

  return (
    <Page meta={meta}>
      <Layout>
        <div className="container mx-auto max-w-lg">
          <h1>Verifying...</h1>
        </div>
      </Layout>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    console.log(ctx.query);
    return {
      props: {
        authentication: { ...ctx.query },
      },
    };
} 

export default LoginCallbackPage;