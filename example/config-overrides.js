/*
 * @Author: lichao
 * @Description:
 * @Date: 2020-05-01 18:49:08
 */
const {
  override,
  fixBabelImports,
  addLessLoader,
  disableEsLint,
} = require("customize-cra");

module.exports = override(
  disableEsLint(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "#74BEF0" },
  })
);
