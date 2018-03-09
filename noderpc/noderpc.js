var thrift = require('thrift');
var events = require('events');

var transport = thrift.x;
var protocol = thrift.TBinaryProtocol;


//创建connections对象
//ServiceClient
var Client = function (ServiceClient, ips) {
    var clients = []
    var ipList = ips.split(",");
    var self=this
    ipList.forEach(function (ip) {
        var ipPort = ip.split(":");

        var connection = thrift.createConnection(ipPort[0], ipPort[1], {
            transport: transport,
            protocol: protocol
        });

        connection.on('error', function (err) {
            // console.log("clients size:"+self.t_clients.length)
            console.log(false, err);
            // return true
        });

        //最大尝试10次
        connection.max_attempts=10
        //10s
        connection.retry_delay=10000

        clients.push(thrift.createClient(ServiceClient, connection));
    })

    this.t_clients = clients

};

//获取client
Client.prototype.getClient = function () {
    var client = this.t_clients.shift()
    this.t_clients.push(client)

    // console.log("clients size:"+this.t_clients.length)
    return client
};

exports.createClient = function(ServiceClient, ips) {
    return new Client(ServiceClient, ips);
};