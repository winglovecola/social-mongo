const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// /api/users
//get all users
router.route('/').get(getUsers).post(createUser);

//get and delete single user
router.route('/:userId').get(getSingleUser).delete(deleteUser);



//post and delete friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
