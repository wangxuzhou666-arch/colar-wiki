/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // NOTE: output:'export' does not support redirects(); the root redirect
  // to /wiki/Colar_Wang/ is handled client-side in app/page.jsx.
};

export default nextConfig;
