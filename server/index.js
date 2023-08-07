const app = require('./config/express');
const config = require('./config/config');
const {ieNoOpen} = require('helmet');
const {isObject} = require('core-js/core/object')

// initialize mongo
require('./config/mongoose');

//listen to the port
app.listen(config.port, ()=>{
    console.log(`server started on port ${config.port} (${config.env})
    `);
});
