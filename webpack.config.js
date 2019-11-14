const mode = process.env.NODE_ENV;

const enabledSourceMap = mode === 'production';

module.exports = {
    mode:mode,
    entry: __dirname + "/src/index.ts",
    output: {
        path: __dirname +'/dist', 
        filename: 'simple-fs-loading.js',
        library: 'sfsLoading',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
              test: /\.ts$/,
              loader: 'ts-loader'
            },

            {
              test: /\.scss/,
              use: [
                  "style-loader",
                  {
                      loader: "css-loader",
                      options: {
                        sourceMap: enabledSourceMap,
                        // 0 => no loaders (default);
                        // 1 => postcss-loader;
                        // 2 => postcss-loader, sass-loader
                        importLoaders: 2
                      }
                  },
                  {
                      loader: "sass-loader",
                      options: {
                        sourceMap: enabledSourceMap
                      }
                  }
              ]
            }
        ]
    },

    devServer: {
        contentBase: __dirname + '/demo',
        port: 3000,
    },
};