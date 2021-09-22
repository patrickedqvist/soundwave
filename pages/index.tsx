import Page from '@/components/ui/Page';
import Layout from '@/components/ui/Layout';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = (props) => {
  const meta = {
    title: `Soundwave`,
    description: `See your spotify`,
  };

  return (
    <Page meta={meta}>
      <Layout>
        <div className="container mx-auto">
          <h1>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p>
            Get started by editing <code>pages/index.js</code>
          </p>

          <div className="flex gap-5">
            <a href="https://nextjs.org/docs" className="bg-white p-4">
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className="bg-white p-4">
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>

            <a
              href="https://github.com/vercel/next.js/tree/master/examples"
              className="bg-white p-4"
            >
              <h2>Examples &rarr;</h2>
              <p>Discover and deploy boilerplate example Next.js projects.</p>
            </a>

            <a
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className="bg-white p-4"
            >
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your Next.js site to a public URL with Vercel.
              </p>
            </a>
          </div>
        </div>
      </Layout>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { } };
};

export default Home;