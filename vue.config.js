const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: config => {
        config.resolve.symlinks(true);
        config.resolve.alias
            .set('@', resolve('src'));
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/css/variable.scss";@import "~@/assets/css/mixin.scss";`
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000'
            }
        }
    },
    pluginOptions: {
        electronBuilder: {
            productName: '贴吧'
        }
    }
}