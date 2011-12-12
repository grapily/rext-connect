
# Rext-connect

  Simple Rext router middleware for [connect](http://senchalabs.github.com/connect "connect")
  
  
## How to use
  
    var connect = require('connect')
      , rext_connect = require('rext-connect');
  
    app.use(connect.bodyParser());
    app.use(connect.router(rext_connect.routes({"prefix":'myapp',"rext":rext})));
  

## Running node tests

  Install dependencies:
  
    $ npm install -d
  
  Run them!
  
    $ make server-test


## License 

(The MIT License)

Copyright (c) 2011 Grapily &lt;dev@grapily.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.