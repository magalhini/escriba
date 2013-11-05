escriba
=======

A pretty and simple online writing place. Your document is saved to local storage, with the option to save it for Dropbox.

## How to run

Clone the repo and run grunt server.

## How to build

Run grunt build. Please note that at the moment you will have to rename two files for it to work
in production:

dist/scripts/###.notification.js => notification.js
dist/scripts/###.dropbox.js => dropbox.js

This is due to the files being required on the fly. To fix soon, promise!