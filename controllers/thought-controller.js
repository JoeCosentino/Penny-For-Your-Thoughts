const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.json(404).json({ message: 'No thought found with this id!' })
                    return
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add thought
    addThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            {new: true}
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })

    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true}
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No reaction with this id!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    },

    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            });
    }
}

module.exports = thoughtController;