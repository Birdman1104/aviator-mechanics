const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    filename: '[name].[contenthash].bundle.js',
                },
            },
        },
    },
    plugins: [
        new WebpackObfuscator(
            {
                rotateStringArray: true,
                stringArray: true,
                stringArrayThreshold: 0.75,
            },
            ['vendors.*.js', 'sw.js'],
        ),
    ],
});
