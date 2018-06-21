module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.post('/api/register', register);
    app.put('/api/profile', updateUser);
    app.delete('/api/profile', deleteUser)


    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                if(user !== null) {
                    req.session['currentUser'] = user;
                    res.json(user);
                } else {
                    res.send(404);
                }
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }


    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        res.send(req.session['currentUser']);
    }


    function register(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        var newUser = {
            username: username,
            password: password
        };
        userModel.findUserByUsername(username)
            .then(function(user) {
                if(!user){
                    return userModel.createUser(newUser)}})
            .then(function(user) {
                req.session['currentUser'] = user;
                res.send(user);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function updateUser(req, res) {
        var user = req.body;
        userModel.updateUser(user)
            .then(function (user) {
                res.json(user);
            })
    }

    function deleteUser(req, res) {
        var userId = req.query["userId"];
        userModel.deleteUser(userId);
    }
}