/*global define, Dropbox */
define(['notification'],
    function (notification) {

        'use strict';

        var client = new Dropbox.Client({key: 'ba8gabtdkf308th'}),
            escribaStore;

        // Try to finish OAuth authorization.
        client.authenticate({interactive: false}, function (error) {
            if (error) {
                notification.setText('Ops, something went wrong!');
            }
        });

        // Open DB datastore, and save it.
        if (client.isAuthenticated()) {
            console.log('Authenticated to Dropbox');

            var datastoreManager = client.getDatastoreManager();

            datastoreManager.openDefaultDatastore(function (error, datastore) {
                if (error) {
                    notification.setText('Ops, something went wrong!');
                }

                escribaStore = datastore.getTable('escriba');
            });
        }

        /**
         * Saves the file to dropbox.
         * @param  {String} text  What to save.
         * @param  {String} title Name of the file to save.
         */
        function save (text, title) {
            if (!client.isAuthenticated()) {
                client.authenticate();
            }

            if (!text) return;

            title = title || 'escriba';

            var callback = function () {
                notification.setText('Saved to Dropbox!');
            };

            client.writeFile(title + '.txt', text, {}, callback);
        }

        return {
            client: client,
            data: escribaStore,
            save: save
        };
});