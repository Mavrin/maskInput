module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '..',

        // frameworks to use
        frameworks: ['qunit'],
      //  plugins: ['karma-qunit'],
        // list of files / patterns to load in the browser
        files: [
            'lib/jquery/dist/jquery.js',
            'jquery.numberMask.js',
            'tests/tests.js'
        ],
        // test results reporter to use
        reporters: ['progress'],
        preprocessors: {"jquery.numberMask.js": "coverage"},
        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,


        // Start these browsers
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};