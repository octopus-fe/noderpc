var Noderpc = require('../noderpc/noderpc.js');
var Calculator = require('./gen-nodejs/AuthService');

var ips="localhost:9090,localhost:9091"

var clients=Noderpc.createClient(Calculator,ips);

// setInterval(function(){
//     for (var i=0;i<10;i++){
//         var client = clients.getClient();
//         console.log("call:"+i)
//
//         client.login(""+i,"22",function(err,res) {
//             console.log("err:",err);
//             console.log("Res:",res);
//         });
//     }
// },10000);


var hz,
    period,
    startTime = new Date,
    runs = 0;
    runTime=10;
do {
    // 被测试的代码
    runs++;
    for (var i=0;i<runTime;i++){
        var client = clients.getClient();
        // console.log("call:"+i)

        client.login(""+i,"22",function(err,res) {
            // console.log("err:",err);
            // console.log("Res:",res);
        });
    }
    totalTime = new Date - startTime;
} while (totalTime < runTime);

// 毫秒
totalTimeS = totalTime/1000;

// period → 单位运算的耗时
period = totalTimeS / runs;

// hz → 单位时间（1秒）内进行的运算量
hz = 1 / period;

console.log("hz:"+hz)
console.log("totalTime(s):"+totalTimeS)
console.log("totalTime(ms):"+totalTime)
console.log("period:"+period)
