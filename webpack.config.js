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
  entry: {
    project1: "./src/project1/script.ts",
    project2: "./src/project2/script.ts",
  },
  // выходной файл и путь для сохранения
  // [name] будет подставлять имя entry (project1 или project2)
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  //доп. плагины, которые можно применять к процессу сборки
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/project1/index.html",
      filename: "project1.html",
      chunks: ["project1"], // Только файлы для project1
    }),

    // HTML для второго проекта
    new HtmlWebpackPlugin({
      template: "./src/project2/index.html",
      filename: "project2.html",
      chunks: ["project2"], // Только файлы для project2
    }),
    new MiniCssExtractPlugin({
      // Имя выходного файла. [contenthash] нужен, чтобы при изменении стилей
      // менялось имя файла (для сброса кэша браузера)
      filename: "[name].[contenthash].css",
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
    open: "/project1.html",
  },
};
