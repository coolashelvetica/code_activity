// DEPENDENCIES
// ============
var express = require("express");
var http = require("http");
var port = (process.env.PORT || 3000);
var server = module.exports = express();

// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname));

    server.use(express.errorHandler({

        dumpExceptions:true,

        showStack:true

    }));

    server.use(express.bodyParser());

    server.use(server.router);
});

// SERVER
// ======
// Start Node.js Server
http.createServer(server).listen(port);