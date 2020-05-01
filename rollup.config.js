/*
 * @Author: lichao
 * @Description:
 * @Date: 2020-04-29 15:35:43
 */
import babel from "@rollup/plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser"; // for generated es bundle

export default [
  // SDK
  {
    input: "src/main.js",
    output: [
      {
        file: "./dist/WhaleAgent_JS.min.js", // UMD
        format: "umd",
        name: "WhaleAgent",
        freeze: false,
        plugins: [terser()],
      },
      {
        file: "./dist/WhaleAgent_JS.es6.min.js", // ES Module
        format: "es",
        name: "WhaleAgent",
        plugins: [
          terser({
            module: true,
          }),
        ],
      },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
      }),
      eslint({
        exclude: ["src/**"],
      }),
      postcss({
        extensions: [".css"],
      }),
      commonjs(),
    ],
  },
];
