/*global define */
define(['jquery'],
    function ($) {

        'use strict';

        var notification = $('.status-bar'),
            hideTimeout;

        function setText(text) {
            if (text) {
                notification[0].innerHTML = text;

                if (notification.hasClass('off')) {
                    notification
                        .removeClass('off')
                        .addClass('on')
                        .fadeIn();

                    hideTimeout = setTimeout(function () {
                        notification.removeClass('on')
                                    .addClass('off')
                                    .fadeOut();

                        hideTimeout = null;
                    }, 3500);
                }
            }
        }

        return {
            setText: setText
        };
});