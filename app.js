//loading the service definiton
var grpc = require("@grpc/grpc-js")
var protoLoader= require("@grpc/proto-loader")

var PROTO_PATH = __dirname + "/protos/calc.proto"
//load the proto file
var packageDefinition = protoLoader.loadSync(PROTO_PATH) //protoLoader going to sync up file we just specified
//once loaded use grpc to help define package
var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc

//service implementation where the logic resides
function add(call, callback){
  try{
    var number1 = parseInt(call.request.number1)
    var number2 = parseInt(call.request.number2)
    if(!isNaN(number1) && !isNaN(number2)){
      var result = number1+number2
          callback(null,{
            message: "success",
            result: result
          })
    }else{
          callback(null, {
          message: "please specify two numbers"
        })

    }
  }catch(e){
      callback(null,{
      message: "Error occured"

    })
  }
}



//commands so server will be up and running
var server = new grpc.Server()
server.addService(calc_proto.CalcService.service, {add:add})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(),
function(){
  //server.start()
})
