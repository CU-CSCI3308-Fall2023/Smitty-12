//We are checking POST /add_user API by passing the user info in the correct order. This test case should pass and return a status 200 along with a "Success" message.
//Positive cases

// Imports the index.js file to be tested.
const server = require('../index'); //TO-DO Make sure the path to your index.js is correctly added
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe('Server!', () => {
    // Sample test case given to test / endpoint.
    // it('Returns the default welcome message', done => {
    //     chai
    //         .request(server)
    //         .get('/welcome')
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             expect(res.body.status).to.equals('success');
    //             assert.strictEqual(res.body.message, 'Welcome!');
    //             done();
    //         });
    // });

    // ===========================================================================
    // TO-DO: Part A Login unit test case
    it('positive : /login', done => {
        chai
            .request(server)
            .post('/login')
            .send({ username: 'JohnDoe', password: '123' })
            .redirects(0)
            .end((err, res, body) => {
              res.should.have.status(302);
              done();
            });
    });

    it('positive : /register', done => {
        chai
            .request(server)
            .post('/register')
            .send({ username: 'blah', password: '308' })
            .redirects(0)
            .end((err, res, body) => {
              res.should.have.status(302);
              done();
            });
    });

    it('negative : /login', done => {
        chai
            .request(server)
            .post('/login')
            .send({ username: '', password: '' })
            .redirects(0)
            .end((err, res, body) => {
              res.should.have.status(302);
              done();
            });
    });

    it('negative : /register', done => {
        chai
            .request(server)
            .post('/register')
            .send({ username: '', password: '' })
            .redirects(0)
            .end((err, res, body) => {
              res.should.have.status(302);
              done();
            });
    });

    it('positive : /discover', done => {
        chai
            .request(server)
            .post('/discover')
            // .send({ username: '', password: '' })
            .redirects(0)
            .end((err, res, body) => {
              res.should.have.status(302);
              done();
            });
    });
});


// it('positive : /add_user', done => {
//     chai
//         .request(server)
//         .post('/add_user')
//         .send({ id: 5, name: 'John Doe', dob: '2020-02-20' })
//         .end((err, res) => {
//             expect(res).to.have.status(200);
//             expect(res.body.message).to.equals('Success');
//             done();
//         });
// });

//We are checking POST /add_user API by passing the user info in the correct order. This test case should pass and return a status 200 along with a "Success" message.
//Positive cases


// it('positive : /login', done => {
//     chai
//         .request(server)
//         .post('/login')
//         .send({username: 'bob', password: '123' })
//         .end((err, res) => {
//             res, should.redirectTO('/register');
//             done()
//         });
// });

// // res,should.redirectTO('/register');
// // done()

// it('negative : /login', done => {
//     chai
//         .request(server)
//         .post('/login')
//         .send({username: 'bob', password: '' })
//         .end((err, res) => {
//             res, should.redirectTO('/register');
//             done()
//         });
// });

// // user in table but pass is not

// it('negative : /login', done => {
//     chai
//         .request(server)
//         .post('/login')
//         .send({username: 'bob', password: '' })
//         .end((err, res) => {
//             res, should.redirectTO('/register');
//             done()
//         });
// });
