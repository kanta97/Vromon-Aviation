import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const RobotsTxtPage = ({ content }) => {
  return <pre>{content}</pre>;
};

export async function getStaticProps() {
  const { NEXT_PUBLIC_ROBOTS_TXT } = publicRuntimeConfig;
  const content = NEXT_PUBLIC_ROBOTS_TXT
    ? ''
    : 'User-agent: *\nAllow: / \nDisallow: /_next/ \nDisallow: /api/ \nDisallow: /public/ \nSitemap:';

  return {
    props: {
      content,
    },
  };
}

export default RobotsTxtPage;
