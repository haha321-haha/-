import Head from 'next/head';

export default function NoIndexMeta() {
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
      <meta name="bingbot" content="noindex, nofollow" />
    </Head>
  );
}
