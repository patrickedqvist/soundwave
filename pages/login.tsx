import Image from 'next/image';
import { signIn } from 'next-auth/react';

import Page from '@/components/ui/Page';
import Layout from '@/components/ui/Layout';

export default function LoginPage() {
  const meta = {
    title: `Soundwave`,
    description: `See your spotify`,
  };

  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000 '})
  }

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
