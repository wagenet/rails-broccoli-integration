var http = require('http'),
    httpProxy = require('http-proxy');

var railsPort     = Number(process.env.RAILS_PORT) || 3000,
    broccoliPort  = Number(process.env.BROCCOLI_PORT) || 4200,
    proxyPort     = Number(process.env.PORT) || 5000;

var railsProxy = httpProxy.createProxyServer({}),
    broccoliProxy = httpProxy.createProxyServer({});

var server = require('http').createServer(function(req, res) {
  var match = req.url.match(/\/client(\/.*)?/);
  if (match) {
    req.url = match[1];
    broccoliProxy.web(req, res, { target: 'http://127.0.0.1:'+broccoliPort });
  } else {
    railsProxy.web(req, res, { target: 'http://127.0.0.1:'+railsPort });
  }
});

console.log("listening on port "+proxyPort);
server.listen(proxyPort);