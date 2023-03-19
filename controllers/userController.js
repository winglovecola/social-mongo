const { Thought } = require('../models');
const User = require('../models/User');

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find()
    .populate('thoughts')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((createUserData) => res.json(createUserData))
      .catch((err) => res.status(500).json(err));
  },

  // delete a single user
  deleteUser(req, res) {

    let deleteThoughtMsg = '';
    

    User.findOneAndDelete({ _id: req.params.userId }) 
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' })
        }
        else
        {
          //when user is remove from database, also remove all the thoughts related to this user
          //BONUS question
          Thought.deleteMany({ _id: { $in: user.thoughts } })
          .then((deletedThoughts) => {deleteThoughtMsg = ` Thoughts related to this user has been removed ${JSON.stringify(deletedThoughts)}`})
          .then (() => {

            res.json({ message: `User ${req.params.userId} has been removed!${deleteThoughtMsg}`})
          })
          
        }

      })
      .catch((err) => res.status(500).json(err));
  },
  
  //add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'Cannot find user with this id!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  
  //delete friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'Cannot find user with this id!' })
        : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  
};
