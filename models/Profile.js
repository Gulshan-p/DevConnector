const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//create first user schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    require: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    require: true
  },
  skills: {
    type: [String],//storing in form of array separating by ,
    require: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [{ //storing in form of JSON(array of object)
    title: {
      type: String,
      require: true
    },
    company: {
      type: String,
      require: true
    },
    location: {
      type: String
    },
    from: {
      type: Date,
      require: true
    },
    to: {
      type: String
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    }
  }],
  education: [{ //storing in form of JSON(array of object)
    school: {
      type: String,
      require: true
    },
    degree: {
      type: String,
      require: true
    },
    fieldofstudy: {
      type: String,
      require: true
    },
    from: {
      type: Date,
      require: true
    },
    to: {
      type: String
    },
    current: {
      type: Boolean,
      default: false
    }
  }],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});
//create collection using ProfileSchema
const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;