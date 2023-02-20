const path = require("path"); // j'importe une librairie path
const HtmlWebpackPlugin = require("html-webpack-plugin"); // j'importe le html-webpack-plugin
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = {
    // Point d'entree
    entry: {
        main: path.join(__dirname, "src/index.ts")
    },
    // Point de sortie
    output: {
        // permet d'avoir un chemin absolu
        path: path.join(__dirname, "dist"),
        // le [name] correspond au main de "entry"
        filename: "[name].bundle.js"
    },
    module: {
        // on applique ici nos loaders
        rules: [
            {
                //regex pour recuperer tous les fichiers .js
                test: /\.js/,
                // on exclue de la regle tous les fichiers provenant de node_modules
                exclude: /(node_modules)/,
                // et on utilise comme loader pour les fichiers js: babel-loader => ecrire en version plus anciennes nos scripts js
                use: ["babel-loader"]
            },
            {
                test: /\.scss$/i,
                exclude: /(node_modules)/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test:/\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    // plugins => fonctionnalites en plus que l'on va ajouter
    plugins: [
        // il va nous permettre de recuperer le index.html et d'injecter directement le bundle, sans que l'on est a faire manuellement
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            chunks: ["main"]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets',
                    to: 'assets'
                }
            ]
        }),
        new CleanWebpackPlugin(),
    ],
    stats: "minimal",
    devtool: "source-map",
    mode: "development",
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
    devServer: {
        static: path.resolve(__dirname, './dist'),
        open: true,
        port: 4000
    }
};