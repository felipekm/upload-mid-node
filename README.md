# Upload Mid Node

> Node.js file upload middleware to work with ´´´multipart/form-data´´´ which is used for uploading files.

## Installation
```sh
$ npm install --save uploadmidnode
```

## Usage
Go to the examples folder **(/examples/)**
run:
``` sh
$ node server.js
```
Now you can make calls throught ```/upload``` route on port 3000.

[Here](http://code.runnable.com/UkmAgT7F3K4tAAAn/uploading-files-with-formidable-for-node-js) is a good place to make calls from a ready web app: 
Just change the ```action``` variable to your local server eg: ```http://localhost:3000/upload```

All the uploaded files will be saved on the ```param.options.path``` path that you need to provide.

*Please, any problem or suggestion please get in touch.*

## License

MIT © [Felipe Kautzmann](http://felipekm.com)
