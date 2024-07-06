let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');

//Assertion Style
//chai.should();
const assert = require('chai').assert;

chai.use(chaiHttp);

describe("Case 1 Test", () => {

    it("It should run", (done) => {
        chai.request(server)
            .get("/test")
            .end((err, response) => {
                assert.equal(response.status, 200);
                //response.should.have.status(200);
                done();
            })

    })
})

