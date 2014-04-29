/*global define */
define([],
    function () {

        'use strict';

        var storageApi = {
            checkStorage: function () {
                this.storage = window.localStorage || null;
                return !!window.localStorage;
            },

            erase: function (key) {
                if (!key) { return false; }

                this.storage.removeItem(key);
                return this;
            },

            save: function (key, value) {
                this.storage.setItem(key, value);
                return this;
            },

            read: function (key) {
                return this.storage.getItem(key);
            }
        };

        return storageApi;
});
