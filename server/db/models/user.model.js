const mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

//JWT Secret
const jwtSecret = "30c3970a8523403t37819d340337f819709r6p667h0312jk29";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

//Instance Methods
UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  //return the document except the password and sessions (private info)
    return _.omit(userObject, ['password', 'sessions']);
};

UserSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        //Create JSON Web Token and return
        jwt.sign({_id: user._id.toHexString()}, jwtSecret, {expiresIn: "15m"}, (err, token) => {
            if(err) {
                resolve(token);
            }
            else {
                reject();
            }
        });
    });
};

UserSchema.methods.generateRefreshAuthToken = function() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(!err) {
                let token = buf.toString('hex');

                return resolve(token);
            }
        })
    })
};