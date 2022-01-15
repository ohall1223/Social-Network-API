const {Users} = require('../models')

const userController = {
    // get all users
    getUsers(req, res) {
        Users.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        }) 
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    // get user info by id 
    getUserById({ params }, res) {
        Users.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate ({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        // return if no user is found
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },
    // create a new user
    createUser({ body }, res) {
        Users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // update user info by id
    updateUser({ params, body}, res) {
        Users.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },
    // delete a user
    deleteUser({ params }, res){
        Users.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData){
                return res.status(404).json({ message: 'No user found with this id'});
            }
        })
        .then(() => {
            res.json({ message: 'User was successfully deleted'});
        })
        .catch(err => res.status(400).json(err));
    },
    // add a friend to a user
    addFriend({ params }, res) {
        Users.findOneAndUpdate(
            {_id: params.userId},
            { $push: {friends: params.friendId }},
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData){
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // remove a friend from a user
    removeFriend({ params }, res){
        Users.findOneAndUpdate({ _id: params.id }, { $pull: {friends: params.friendId } }, { runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    }
}

module.exports = userController