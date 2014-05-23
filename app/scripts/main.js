/*global require */
require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        dropbox: './dropbox',
        markdown: '../bower_components/markdown/lib/markdown'
    },
    shim: {
        'markdown': {
            exports: 'markdown'
        }
    },
    urlArgs: + new Date()
});

require(['app'], function () {
    'use strict';
    console.log('Hello!');
});
