import Image from 'next/image';
import { getProviders, signIn } from 'next-auth/react';

import Page from '@/components/ui/Page';
import Layout from '@/components/ui/Layout';
import type { Provider } from 'next-auth/providers';

interface Props {
  providers: Provider
}


function LoginPage({ providers }: Props) {
  const meta = {
    title: `Soundwave`,
    description: `See your spotify`,
  };

  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000 ' });
  };

  return (
    <Page meta={meta}>
      <Layout>
        <div className="container mx-auto">
          <Image
            src="/images/spotify_logo.png"
            alt="spotify logo"
            className="object-contain h-24 w-80"
            height={96}
            width={320}
          />
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
          <button
            className="flex px-12 py-2 text-lg tracking-widest uppercase rounded-full focus:outline-none bg-primary hover:bg-opacity-80"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </Layout>
    </Page>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default LoginPage;