const login = require("../index")({});
const accounts = require('../.cache/accounts');
describe('Login', function () {
    // before(function() {
    //     this.skip();
    // });
    describe("Undefined user/pass", function () {
        it('Can not login without user', tryLoginFail(undefined));
        it('Can not login without pass', tryLoginFail(accounts[0].studentCode, undefined));
    });

    describe("Incorrect user/pass", function () {
        it('Can not login with Incorrect user', tryLoginFail(accounts[0].studentCode, "1232"));
        it('Can not login with Incorrect pass', tryLoginFail(accounts[1].studentCode, "ashdsids"));
    });

    describe("Correct user/pass", function () {
        it('User 1', tryLoginSuccess(accounts[0].studentCode, accounts[0].password));
        it('User 2', tryLoginSuccess(accounts[1].studentCode, accounts[1].password));
    });
});

function tryLoginFail(user, pass) {
    return function (done) {
        login({ user, pass }, function (error, api) {
            if (error) done();
        })
    }
}
function tryLoginSuccess(user, pass) {
    return function (done) {
        login({ user, pass }, function (error, api) {
            if (!error) done();
            else console.log(error.stack)
        })
    }
}