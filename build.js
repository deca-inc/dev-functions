const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

// Function to delete the dist directory
const cleanDist = () => {
  const distPath = path.resolve(__dirname, "packages");
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log("Cleaned packges directory");
  }
};

// Clean dist folder before build
cleanDist();

// Build with multiple entry points and specific output files
esbuild
  .build({
    entryPoints: {
      "example/hello/index": "./src/functions/hello.ts",
      // .. NEW ENTRY POINTS HERE
    },
    bundle: true, // Bundle dependencies
    platform: "node", // Node.js platform
    target: "node18", // Target Node.js 18
    outdir: "./packages/", // Output directory
    format: "cjs", // CommonJS format (for Node.js)
    loader: { ".ts": "ts" }, // TypeScript loader
    sourcemap: true, // Include sourcemaps for debugging
  })
  .catch(() => process.exit(1));
