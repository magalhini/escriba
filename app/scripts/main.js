/*global require */
require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        dropbox: './dropbox'
    },
    urlArgs: + new Date()
});

require(['app', 'jquery'], function () {
    'use strict';
    console.log('Hello!');
});
