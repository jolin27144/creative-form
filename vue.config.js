module.exports = {
  lintOnSave: true,

  runtimeCompiler: true,

  devServer: {
    proxy: {
      // 服务器接口
      "/view-server": {
        target: "http://218.104.177.15:7010",
        changeOrigin: true
      },

      "/news": {
        target: "http://218.104.177.15:7010",
        changeOrigin: true
      },

      "/opp-server": {
        target: "http://218.104.177.15:7010/opp-server",
        changeOrigin: true,
        pathRewrite: {
          "^/opp-server": ""
        }
      },

      "/dss-server-shunde": {
        target: "http://218.104.177.15:7010/dss-server-shunde",
        changeOrigin: true,
        pathRewrite: {
          "^/dss-server-shunde": ""
        }
      },

      "/wind": {
        target: "https://19.202.174.129",
        changeOrigin: true
      },

      "/dss-server-taishan": {
        target: "https://122.13.2.144:7006/dss-server-taishan",
        changeOrigin: true,
        pathRewrite: {
          "^/dss-server-taishan": ""
        }
      },

      // YAPI mock
      "/yapi": {
        target: "http://14.29.227.104:9000",
        changeOrigin: true,
        pathRewrite: {
          "^/yapi": "/mock/6"
        }
      },

      "/dss-opp-shunde": {
        target: "http://218.104.177.15:7010",
        changeOrigin: true
      },

      "/dss-opp": {
        target: "http://218.104.177.15:7010/dss-opp/",
        changeOrigin: true
      },
      "/opp-shunde": {
        target: "http://218.104.177.15:7010/dss-opp-shunde",
        changeOrigin: true,
        pathRewrite: {
          "^/opp-shunde": ""
        }
      },

      svc: {
        target: "https://as.zaiyaa.com/",
        changeOrigin: true
      },

      "/paint/real/image": {
        target: "http://19.202.174.129:8084",
        changeOrigin: true
      },

      "/news/search": {
        target: "https://19.202.174.129",
        changeOrigin: true
      }
    }
  }
};
