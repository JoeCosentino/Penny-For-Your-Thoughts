const { User, Thought } = require('../models');

const thoughtController = {
    // add thought
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
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
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought=> {
                if(!deletedThought) {
                    res.status(404).json({ message: 'No comment with this id!' });
                    return
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
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