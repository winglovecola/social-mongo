const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
  updateThought,
  deleteThought,
  addReactionThought,
  deleteReactionThought
} = require('../../controllers/thoughtController');

// get all thoughts or post thought
router.route('/').get(getThoughts).post(createThought);

// get a single thought or update thought or delete thought
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);


//post reactions
router.route('/:thoughtId/reactions').post(addReactionThought);

//delete reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionThought);



module.exports = router;
