import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

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
  plugins: [
    typescript(),
    terser(),
    copy({
      targets: [
        {
          src: "dist/select.js",
          dest: "docs",
        },
      ],
    }),
  ],
};
