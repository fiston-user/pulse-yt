const tsConfigPaths = require("tsconfig-paths");
const tsConfig = require("./tsconfig.json");

const baseUrl = "./src";
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
