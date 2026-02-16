const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

//экспортируем объект конфигурации
module.exports = {
  //production - оптимизация производительности и минимизация размера кода
  //development - скорость сборки и удобство отладки
  mode: "development",
  // Карты кода для отладки (показывают строки в TS, а не в скомпилированном JS)
  devtool: "source-map",

  //точка входа в приложение, с которого начнётся процесс сборки
  entry: "./src/script.ts",
  // выходной файл и путь для сохранения
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  //доп. плагины, которые можно применять к процессу сборки
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Путь к вашему исходному HTML
    }),
    new MiniCssExtractPlugin({
      // Имя выходного файла. [contenthash] нужен, чтобы при изменении стилей
      // менялось имя файла (для сброса кэша браузера)
      filename: "style.[contenthash].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets", // Откуда брать (путь относительно корня проекта)
          to: "assets", // Куда класть (внутри папки dist)
          noErrorOnMissing: true, // Не падать с ошибкой, если папки нет
        },
      ],
    }),
  ],

  //поддреживаемые расширения при импортах
  resolve: {
    extensions: [".ts", ".js"],
  },
  //настройка загрузчика
  module: {
    rules: [
      {
        //файлы .ts
        test: /\.ts$/,
        //обрабатываются с помощью загрузчика ts-loader
        use: "ts-loader",
        //не обрабатываем файлы из
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  // отключаем предупреждения о превышении размера скрипта
  performance: {
    hints: false,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
