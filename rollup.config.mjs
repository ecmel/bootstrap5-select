import typescript from "@rollup/plugin-typescript";

export default {
  input: "select.ts",
  output: [
    {
      file: "dist/select.js",
      format: "iife",
      name: "bootstrap5",
      globals: {
        bootstrap: "bootstrap",
      },
      sourcemap: true,
    },
    {
      file: "dist/select.cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/select.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  external: ["bootstrap"],
  plugins: [typescript()],
};
