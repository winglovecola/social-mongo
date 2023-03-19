const { Schema, Types, model } = require('mongoose');
const dayjs = require('dayjs');


// Schema to create User model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (createdDate) => {
        try {
          return dayjs(createdDate).format('MMM D, YYYY h:mm A');
        } catch (err) {
          console.log(err);
        }
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


// Schema to create Post model
const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    thoughtText: {
      type: String,
      require: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use a getter method to format the timestamp on query
      get: (createdDate) => {
        try {
          return dayjs(createdDate).format('MMM D, YYYY h:mm A');
        } catch (err) {
          console.log(err);
        }
      },
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
