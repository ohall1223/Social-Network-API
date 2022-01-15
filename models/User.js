const { Schema, model } = require('mongoose');

const usersSchema = new Schema (
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // use REGEX to validate email 
            match: [/^([a-z0-9_\.-]+)A([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'Users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
)

// get total friend count 
usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// create the users model using the users schema
const Users = model('Users', usersSchema);

// export users module
module.exports = Users