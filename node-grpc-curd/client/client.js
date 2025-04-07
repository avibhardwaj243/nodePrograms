const { grpc, customersProto } = require('./gRPC-Server');

const CustomerService = customersProto.CustomerService;

const client = new CustomerService(
    "localhost:6000",
    grpc.credentials.createInsecure()
);

module.exports = client;