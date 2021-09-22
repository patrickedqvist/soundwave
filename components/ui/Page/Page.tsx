import { useRouter } from 'next/router';
import Head from 'next/head';
import { FC } from 'react';

interface Meta {
  title: string | null;
  description: string | null;
  image?: string | null;
  url?: string | null;
}

interface PageProps {
  meta: Meta;
}

const Page: FC<PageProps> = ({ meta, children }) => {
  const router = useRouter();
  const title = meta.title || 'soundwave';
  const url = meta.url || router.asPath;
  const description = meta.description || 'soundwave';
  return (
    <div className="page-container">
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default Page;
