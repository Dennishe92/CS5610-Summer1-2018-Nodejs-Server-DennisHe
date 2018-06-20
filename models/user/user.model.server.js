var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema); // Like repository

// function findUserByCredentials(credentials) {
//     return userModel.findOne(credentials, {username: 1});
// }
function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}


function deleteUser (userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, user) {
    var userId = userId;
    var user = user;
    return userModel.update({_id: userId},{
        $set: {
            username: user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            email: user.email}});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserById(userId) {
    return userModel.findUserById(userId);
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByUsername: findUserByUsername,
    updateUser: updateUser,
    deleteUser: deleteUser

};

module.exports = api;