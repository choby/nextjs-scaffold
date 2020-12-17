const withLess = require('@zeit/next-less');
module.exports = withLess({
    /* config options here */
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    }
});