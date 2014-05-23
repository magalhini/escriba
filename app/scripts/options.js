/*global define */
define([],
    function () {

        'use strict';

        var options = {
            init: function (element) {
                this._element = element;
                this._markdown = false;
                this._body = $('body');
                this._optionsBar = $('.options');
            },

            run: function (element) {
                var action = element.data('action');

                switch (action) {
                case 'left':
                    this.alignLeft();
                    break;
                case 'center':
                    this.alignCenter();
                    break;
                case 'right':
                    this.alignRight();
                    break;
                case 'print':
                    this.print();
                    break;
                case 'contrast':
                    this.toggleTheme();
                    break;
                case 'markdown':
                    this.enableMarkdown();
                    break;
                case 'monospace':
                    this.toggleMonospace();
                    break;
                }
            },

            alignLeft: function () {
                this._element.css('text-align', 'left');
            },

            alignCenter: function () {
                this._element.css('text-align', 'center');
            },

            alignRight: function () {
                this._element.css('text-align', 'right');
            },

            print: function () {
                window.print();
                return this;
            },

            enableMarkdown: function () {
                this._markdown = !this._markdown;
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
                this._element.toggleClass('monospace');
            }
        };

        return options;
});