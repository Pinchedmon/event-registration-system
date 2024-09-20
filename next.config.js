/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        port: "",
      },
    ],
    // domains: ["data.terabox.com"],
    // loader: "custom",
    // loaderFile: "/src/app/loader.js",
    // unoptimized: true,
  },
};

export default config;
