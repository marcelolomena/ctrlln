module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'libs/jquery/jquery.js',
      'libs/angular/angular.js',
      'app/**/*.js',
      'tests/**/*.js',
      'app/templates/*.html'
    ],
    preprocessors: {
      'app/templates/*.html': 'ng-html2js'
    },
    reporters: ['progress'],
    colors: true,
    autoWatch: false,
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'/*, 'Chrome_without_security'*/], // You may use 'ChromeCanary', 'Chromium' or any other supported browser 
    singleRun: true,
    plugins: [
      //'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ]/*,
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['--disable-web-security']
      }
    }*/
  });
};