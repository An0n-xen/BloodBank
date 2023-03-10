/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  env: {
    MYSQL_HOST: "127.0.0.1",
    MYSQL_PORT: "3306",
    MYSQL_DATABASE: "assignments",
    MYSQL_USER: "root",
    MYSQL_PASSWORD: "Genesis begins",
  },
};
