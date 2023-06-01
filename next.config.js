/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
        remotePatterns:[
          {
            protocol: "https",
            hostname: "**"
          }
        ],
        domains:["images.ecency.com"]
    },
}
