const { whenDev } = require("@craco/craco");
const path = require("path");

module.exports = {
  webpack: {
    plugins: [...whenDev(() => [new BundleAnalyzerPlugin()], [])],
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@store": path.resolve(__dirname, "src/store"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utiles": path.resolve(__dirname, "src/utiles"),
      "@config": path.resolve(__dirname, "src/config"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@mock": path.resolve(__dirname, "src/utils/mock"),
      "@themes": path.resolve(__dirname, "src/utils/themes"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
    },
  },
};
