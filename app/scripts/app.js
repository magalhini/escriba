/*global define */
define(['app', 'jquery', 'storage', 'options'],
    function (app, $, storage, options) {

        'use strict';

        var hasStorage  = storage.checkStorage(),
            input       = $('.editable'),
            optionsEl   = $('.options'),
            titleEl     = $('.title'),
            hiddenEl    = $('.printing'),
            aboutEl     = $('.about'),
            hideBarTime = 5000,
            deadMouse   = null,
            timeToSave  = 500,
            dropBox     = null,
            timer       = null;

        initializeApp();

        /**
         * Constructor function.
         *
         */
        function initializeApp() {
            addEvents(input);
            findHeight();

            // Read previous values, if any.
            input.val(storage.read('notepad-text'));
            titleEl.val(storage.read('notepad-title'));

            // Update printing text (which is hidden).
            updateHidden(storage.read('notepad-text'));
        }

        /**
         * Adds main events.
         * @param {[type]} el [description]
         */
        function addEvents (el) {
            // Tell options where is the input to read from.
            options.init(input);

            // Resize textarea and save on keyup.
            $(window).on('resize', findHeight);
            el.on('keyup', saveText);
            titleEl.on('keyup', saveText);

            // Hide bar after a while, but show on mousemove/touch.
            $('body').on('mousemove ontouchstart', hideOnDeadMouse);

            // Map options to actions.
            optionsEl.on('click li', function (el) {
                options.run($(el.target));

                // Special case: Dropbox. Require API file.
                if ($(el.target).data('action') === 'dropbox') {
                    require(['dropbox'], function (dropboxApi) {
                        dropBox = dropboxApi;

                        var text = storage.read('notepad-text'),
                            title = storage.read('notepad-title');

                        if (window.Dropbox) {
                            dropBox.save(text, title);
                        }
                    });
                }
            });

            // Toggle about.
            aboutEl.on('click', toggleAbout);
        }

        /**
         * Finds the new height of the textarea, and sets it.
         * @return {[type]} [description]
         */
        function findHeight () {
            var docHeight   = $(window).height(),
                inputTop    = input.offset().top;

            input.height(docHeight - inputTop - 50);
        }

        /**
         * Saves text to storage.
         */
        function saveText () {
            if (!timer) {
                timer = setTimeout(saveToStorage, timeToSave);
            }
        }

        /**
         * Saves to storage, after a while.
         *
         */
        function saveToStorage () {
            console.log('Saving to storage...');

            var text = input.val(),
                title = titleEl.val();

            storage.save('notepad-text', text)
                   .save('notepad-title', title);

            // Update the text of the hidden element.
            updateHidden(text);

            clearTimeout(timer);
            timer = null;
        }

        /**
         * Hides the options bar on mouse inactivity.
         * @param  {[type]} e [description]
         */
        function hideOnDeadMouse (e) {
            var timeToShowBar = null;

            if (timeToShowBar) {
                clearTimeout(deadMouse);
                deadMouse = null;
            }

            if (deadMouse) {
                clearTimeout(deadMouse);
                deadMouse = null;

                // After moving mouse, only show bar after X time.
                timeToShowBar = setTimeout(function () {
                    options.showBar();
                }, 500);
            }

            deadMouse = setTimeout(function (e) {
                options.hideBar();
            }, hideBarTime);
        }

        /**
         * Updates the text of the hidden element for printing purposes.
         * Will replace breaks with visible paragraphs.
         *
         * @param  {String} text Input text.
         */
        function updateHidden(text) {
            hiddenEl[0].innerHTML = text.replace(/\n/g, '<p>');
        }

        /**
         * Toggle the information div.
         * @param  {Event} e Click event
         */
        function toggleAbout(e) {
            var el = aboutEl.find('.info'),
                toggle = function () {
                    el.toggleClass('hide');
                };

            if (el.hasClass('hide')) {
                el.fadeIn(toggle);
            } else {
                el.fadeOut(toggle);
            }
        }
});