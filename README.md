# Upload Mid Node

> Upload Mid Node is a middleware for [ExpressJS](http://expressjs.com/) to handle ´´´multipart/form-data´´´ which basically is used for uploading files.

## Installation
```sh
$ npm install --save uploadmidnode
```

## Usage
On your routes file include it with ```require``` then insert the ```check``` function such as:

``` javascript
var upload_mid_node = require('upload-mid-node');

app.post('/upload',

    // Upload middleware check
    upload_mid_node.check({
        options: global.config.public_folders.application.docs,
        supportedFileExt: ['txt', 'doc'],
        multiFiles: true
    }),

    // Next statement
    function (req, res) {
        res.status(200).send(req.uploads);
    }
);
```
### Options:

``` javascript
global.config = {
    public_folders: {
        application: {
            docs: {
                path: "./public/documents",
                limitSize: 20000000
            }
        }
    }
};
```

*  **path**: It must contain the physical path which the file will be stored, also it will create a ```temp``` which is cleaned after store the files on the final path.
* **limitSize**: The file size limit (**KB**);
* **supportedFileExt**: Supported file extensions;

After the middleware route it to the next statement you can access all your uploaded file properties on ```req.uploads```.

## Testing

[Here](http://code.runnable.com/UkmAgT7F3K4tAAAn/uploading-files-with-formidable-for-node-js) is a good place to make calls from a ready web app:
Just change the ```action``` variable to your local server eg: ```http://localhost:PORT/upload```

##### Any problem or suggestion get in touch.

## License

MIT © [Felipe Kautzmann](http://felipekm.com)
