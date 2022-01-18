const {Thought} = require('../models');

const thoughtController = {
    // get all thoughts 
    getAllThoughts(req, res) {
        // console.log(req)
        Thought.find({})
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },
    // get one thought by id
    getThoughtsById({ params }, res ){
        // console.log(params)
        Thought.findOne({ _id: params.thoughtId })
        .populate({
            path: 'user',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    },
    // create a thought
    createThoughts(req, res) {
        console.log(req.body)
        Thought.create(req.body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: req.params.id}, {$push: {thoughts: req.body.thoughtText }}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thought found with this Id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err)); 
    },
    // add a reaction
    addReaction ({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this Id'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },
    // delete a reaction 
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
    // update a thought by Id
    updateThoughts({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(updatedThought => {
            if(!updatedThought) {
                return res.status(404).json({ message: 'No thought found with this Id'});
            }
            res.json(updatedThought);
        })
        .catch(err => res.json(err));
    },
    // delete a thought by Id 
    deleteThoughts({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought found with this Id'})
            }
            res.json(deletedThought);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController