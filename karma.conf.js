// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import path from "path";
import karmaJasmine from "karma-jasmine";
import karmaChromeLauncher from "karma-chrome-launcher";
import karmaHtmlReporter from "karma-html-reporter";
import karmaCoverageIstanbulReporter from "karma-coverage-istanbul-reporter";
import angularKarma from "@angular-devkit/build-angular/plugins/karma";

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      karmaJasmine,
      karmaChromeLauncher,
      karmaHtmlReporter,
      karmaCoverageIstanbulReporter,
      angularKarma,
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: path.join(__dirname, "./coverage/notus-angular"),
      reports: ["html", "lcovonly", "text-summary"],
      fixWebpackSourcePaths: true,
    },
    reporters: ["progress", "html"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: false,
    restartOnFileChange: true,
  });
};