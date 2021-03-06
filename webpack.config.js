const env = process.env.NODE_ENV || 'development';
process.env.BABEL_ENV = env;

const pkg = require('./package.json');
const {ProgressPlugin, EnvironmentPlugin} = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const buildPath = path.join(__dirname, 'build', process.env.BUILD_TARGET);

const srcPath = path.join(__dirname, 'src');
const pagesPath = path.join(srcPath, 'pages');
const fileExtensions = ['png', 'svg'];
const isDev = env === 'development';

const pageTemplate = name => new HtmlPlugin({
    chunks: [name],
    filename: `${name}.html`,
    template: path.join(pagesPath, 'template.html'),
});

module.exports = {
    devtool: isDev ? 'cheap-module-source-map' : undefined,
    entry: {
        background: path.join(pagesPath, 'Background', 'index.js'),
        contentScripts: path.join(srcPath, 'contentScripts.js'),
        options: path.join(pagesPath, 'Options', 'index.jsx'),
        phoneCollector: path.join(pagesPath, 'PhoneCollector', 'index.jsx'),
        popup: path.join(pagesPath, 'Popup', 'index.jsx'),
    },
    mode: isDev ? 'development' : 'production',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {name: '[name].[ext]'},
                test: new RegExp(`.(${fileExtensions.join('|')})$`),
            },
            {
                exclude: /node_modules/,
                loader: 'html-loader',
                test: /\.html$/,
            },
            {
                exclude: /node_modules/,
                test: /\.(gif|jpeg|jpg|png)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            },
            {
                exclude: /node_modules/,
                test: /\.m?[j|t]sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            'react-hot-loader/babel',
                        ],
                        presets: [
                            'react-app',
                        ],
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: !isDev
    },
    output: {
        filename: '[name].bundle.js',
        path: buildPath,
    },
    plugins: [
        new ProgressPlugin,
        new CleanPlugin({verbose: true}), // clean the build folder
        new EnvironmentPlugin(['NODE_ENV']), // expose and write the allowed env vars on the compiled bundle
        new CopyPlugin({
            patterns: [
                {
                    force: true,
                    from: 'src/manifest.json',
                    to: buildPath,
                    async transform(content) {
                        content = JSON.parse(content);

                        if ('chrome' === process.env.BUILD_TARGET) {
                            content.options_ui.chrome_style = true;
                            content.options_ui.open_in_tab = true;
                        } else {
                            content.applications = {gecko: {id: 'firefox@sms77.io'}};
                            content.developer = {
                                name: 'Andr?? Matthies',
                                url: 'https://github.com/matthiez',
                            };
                        }

                        return Buffer.from(
                            JSON.stringify({
                                ...content,
                                description: pkg.description,
                                version: pkg.version,
                            })
                        );
                    },
                },
                {from: 'src/_locales', to: `${buildPath}/_locales`},
                {from: 'src/img/*.png', to: `${buildPath}/[name][ext]`},
            ]
        }),
        pageTemplate('options'),
        pageTemplate('popup'),
        pageTemplate('phoneCollector'),
        new WriteFilePlugin,
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: fileExtensions.map(ext => `.${ext}`).concat(['.css', '.js', '.jsx']),
    },
    watch: isDev,
};
