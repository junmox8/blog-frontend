// eslint-disable-next-line no-undef
module.exports = {
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
      "/bgc": {
        target:
          "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN",
        changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/bgc": "", // 替换成target中的地址
        },
      },
      "/word": {
        target: "http://open.iciba.com/dsapi/",
        changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/word": "", // 替换成target中的地址
        },
      },
    },
  },
  lintOnSave: false, //这里禁止使用eslint-loader
  //以下是其它相关配置
  configureWebpack: {
    externals: {
      BMap: "BMap",
    },
  },
};
