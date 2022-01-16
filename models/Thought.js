const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionsSchema = require('./Reaction');

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        // tying reactions to thought
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// get a total count of friends
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create the user model using the userSchema
const Thoughts = model('Thoughts', thoughtsSchema);

// export the User model
module.exports = { Thoughts };