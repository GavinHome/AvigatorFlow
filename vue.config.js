module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/avigatorflow" : "/",
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "AvigatorFlow";
      return args;
    });
  },
  devServer: {
    open: true,
    disableHostCheck: true,
    port: process.env.Port || 19000,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    // proxy: {
    //   "/api": {
    //     target: target,
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // }
  },
};
