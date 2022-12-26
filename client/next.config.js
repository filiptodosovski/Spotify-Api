/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }


module.exports = () => {
  return {
    // reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `http://localhost:5000/:path*`,
        },
      ]
    },
  }
}



// module.exports = {
//   async rewrites() {
//       return [
//         {
//           source: '/:path*',
//           destination: 'http://localhost:5000/:path*'
//         },
//       ]
//   },
//   reactStrictMode: true
// }

