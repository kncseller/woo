import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;



// module.exports = {
//     async redirects() {
//         return [
//             // Basic permanent redirect
//             {
//                 source: '/api/:slug',
//                 destination: '/api/index/',
//                 permanent: false,
//             },
//             // Match paths using a wildcard
//             {
//                 source: '/old_blog/:post_id',
//                 destination: '/new_blog/:post_id',
//                 permanent: true,
//             },
//             // Regex matching for a temporary redirect
//             {
//                 source: '/old_blog/:post_id(\\d{1,})', // Regex matches /old_blog/123 but not /old_blog/xyz:
//                 destination: '/new_blog/:post_id', 
//                 permanent: false,
//             },
//         ]
//     },
// }