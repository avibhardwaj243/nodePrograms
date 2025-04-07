const { grpc, customersProto } = require('./gRPC-Server');
const { v4: uuidv4 } = require("uuid");

const server = new grpc.Server();
let customers = [];
const axios = require('axios');
async function fetchData() {
    try {
        const response = await axios.get('https://dummyjson.com/users');
        const results = response.data;
        let i = 0;
        results.users.forEach(user => {
            customers.push({
                id: user.id,
                name: `${user.firstName} ${user.lastName}`,
                age: user.age,
                address: user.university
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

server.addService(customersProto.CustomerService.service, {
    getAll: async (_, callback) => {
        await fetchData();
        callback(null, { customers });
    },

    get: (call, callback) => {
        let customer = customers.find(n => n.id == call.request.id);

        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    insert: (call, callback) => {
        let customer = call.request;
        
        customer.id = uuidv4();
        customers.push(customer);
        callback(null, customer);
    },

    update: (call, callback) => {
        let existingCustomer = customers.find(n => n.id == call.request.id);

        if (existingCustomer) {
            existingCustomer.name = call.request.name;
            existingCustomer.age = call.request.age;
            existingCustomer.address = call.request.address;
            callback(null, existingCustomer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },

    remove: (call, callback) => {
        let existingCustomerIndex = customers.findIndex(
            n => n.id == call.request.id
        );

        if (existingCustomerIndex != -1) {
            customers.splice(existingCustomerIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    }
});

server.bind("127.0.0.1:6000", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:6000");
server.start();
