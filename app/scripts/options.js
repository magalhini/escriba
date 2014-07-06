/*global define */
define([],
    function () {

        'use strict';

        var options = {
            init: function (title, element) {
                this._title = title;
                this._element = element;
                this._markdown = false;
                this._body = $('body');
                this._optionsBar = $('.options');
                this._preview = $('.preview');
            },

            run: function (element) {
                var action = element.data('action');

                switch (action) {
                case 'write-direction':
                    this.writeDirection();
                    break;
                case 'center':
                    this.alignCenter();
                    break;
                case 'preview':
                    this.preview(element);
                    break;
                case 'print':
                    this.printDoc();
                    break;
                case 'contrast':
                    this.toggleTheme();
                    break;
                case 'monospace':
                    this.toggleMonospace();
                    break;
                }
            },

            writeDirection: function () {
                this._element.toggleClass('rtl');
            },

            alignCenter: function () {
                this._element.toggleClass('a-right');
            },

            preview: function (element) {
                this._preview.toggleClass('open');
                element.toggleClass('selected');
            },

            printDoc: function () {
                window.print();
                return this;
            },

            toggleTheme: function () {
                /**
                 * Due to the lack of support of transitions on gradients,
                 * we're hiding the pseudo-element with the transparency between
                 * theme switching.
                 * By the time the transition is done, display it again.
                 * Not ideal, but... will do for now.
                 */
                this._body.addClass('hide-gradient');
                this._body.toggleClass('dark');

                this._optionsBar.on('transitionend', function () {
                    this._body.removeClass('hide-gradient');
                }.bind(this));

                return this;
            },

            hideBar: function () {
                this._optionsBar.addClass('closed');
            },

            showBar: function () {
                this._optionsBar.removeClass('closed');
            },

            toggleMonospace: function () {
                this._title.toggleClass('monospace');
                this._element.toggleClass('monospace');
            }
        };

        return options;
});