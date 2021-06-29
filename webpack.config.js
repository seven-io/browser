//process.env.BABEL_ENV = 'production';
//process.env.NODE_ENV = 'production';

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
};

process.env.BABEL_ENV = env.NODE_ENV;

const {ProgressPlugin, EnvironmentPlugin} = require('webpack');
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const buildPath = path.join(__dirname, 'build', process.env.BUILD_TARGET);

const pageTemplate = name => new HtmlPlugin({
    chunks: [name],
    filename: `${name}.html`,
    template: path.join(__dirname, 'src', 'pages', 'template.html'),
});

const fileExtensions = [
    'eot',
    'gif',
    'jpeg',
    'jpg',
    'otf',
    'png',
    'svg',
    'ttf',
    'woff',
    'woff2',
];

const isDev = env.NODE_ENV === 'development';

module.exports = {
    devtool: isDev ? 'cheap-module-source-map' : undefined,
    entry: {
        background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
        contentScripts: path.join(__dirname, 'src', 'contentScripts.js'),
        numberCollector: path.join(__dirname, 'src', 'pages', 'NumberCollector', 'index.jsx'),
        options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
        popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
    },
    mode: process.env.NODE_ENV || 'development',
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
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
                test: /\.m?[j|t]sx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            'react-hot-loader/babel',
                            //'@babel/plugin-proposal-private-methods',
                        ],
                        presets: [
                            //'@babel/preset-env',
                            'react-app',
                        ],
                    },
                },
            },
            {
                exclude: /node_modules/,
                test: /\.(gif|jpeg|jpg|png)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
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

                        if ('chrome' === process.env.BUILD_TARGET)
                            content.options_ui.chrome_style = true;
                        else {
                            content.applications = {gecko: {id: 'firefox@sms77.io'}};

                            content.developer = {
                                name: 'André Matthies',
                                url: 'https://github.com/matthiez',
                            };
                        }

                        return Buffer.from(
                            JSON.stringify({
                                ...content,
                                description: process.env.npm_package_description,
                                version: process.env.npm_package_version,
                            })
                        );
                    },
                },
                {from: 'src/_locales', to: `${buildPath}/_locales`},
            ]
        }),
        pageTemplate('options'),
        pageTemplate('popup'),
        pageTemplate('numberCollector'),
        new WriteFilePlugin,
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: fileExtensions.map(ext => `.${ext}`)
            .concat(['.css', '.js', '.jsx', '.ts', 'tsx']),
    },
    watch: isDev,
};
