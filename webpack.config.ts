import type { Configuration } from "webpack";

const GasPlugin = require("gas-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const commonConfig: Configuration = {
  context: __dirname,
  mode: "none",
  output: {
    clean: true,
    filename: "Code.js"
  },
  resolve: { extensions: [".ts"] }
};

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    { from: "./config/appsscript.json", to: "./" },
    { from: "./src/index.html", to: "./" }
  ]
});

const es2022Global: Configuration = {
  ...commonConfig,
  entry: "./src/es2022-global/main.ts",
  name: "es2022Global",
  module: { rules: [{ test: /(\.ts)$/, loader: "ts-loader" }] },
  output: {
    ...commonConfig.output,
    path: `${__dirname}/dist/es2022-global`
  },
  plugins: [
    new GasPlugin(),
    copyPlugin
  ]
};

const es2022AutoGlobal: Configuration = {
  ...commonConfig,
  entry: "./src/es2022-autoGlobal/main.ts",
  name: "es2022AutoGlobal",
  module: { rules: [{ test: /(\.ts)$/, loader: "ts-loader" }] },
  output: {
    ...commonConfig.output,
    path: `${__dirname}/dist/es2022-autoGlobal`
  },
  plugins: [
    new GasPlugin({
      autoGlobalExportsFiles: ["./src/es2022-autoGlobal/main.ts"]
    }),
    copyPlugin
  ]
};

const es2022ExportConstAutoGlobal: Configuration = {
  ...commonConfig,
  entry: "./src/es2022-exportConstAutoGlobal/main.ts",
  name: "es2022ExportConstAutoGlobal",
  module: { rules: [{ test: /(\.ts)$/, loader: "ts-loader" }] },
  output: {
    ...commonConfig.output,
    path: `${__dirname}/dist/es2022-exportConstAutoGlobal`
  },
  plugins: [
    new GasPlugin({
      autoGlobalExportsFiles: ["./src/es2022-exportConstAutoGlobal/main.ts"]
    }),
    copyPlugin
  ]
};

const commonJsAutoGlobal: Configuration = {
  ...commonConfig,
  entry: "./src/commonjs-autoGlobal/main.ts",
  name: "commonJsAutoGlobal",
  module: {
    rules: [{
      test: /(\.ts)$/, use: [
        {
          loader: "ts-loader",
          options: {
            configFile: 'tsconfig.cjs.json'
          }
        }
      ]
    }]
  },
  output: {
    ...commonConfig.output,
    path: `${__dirname}/dist/commonjs-autoGlobal`
  },
  plugins: [
    new GasPlugin({
     autoGlobalExportsFiles: ["./src/commonjs-autoGlobal/main.ts"]
    }),
    copyPlugin
  ]
};

export default [es2022Global, es2022AutoGlobal, commonJsAutoGlobal, es2022ExportConstAutoGlobal];
