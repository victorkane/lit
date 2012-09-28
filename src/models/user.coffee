# The User Mongoose model:
global.User = mongoose.model 'User', new Schema
  id: ObjectId
  name: 
    first: 
      type: String
      required: true
    last: 
      type: String
      required: true
  email:
    type: String
    unique: true
  password: 
    type: String
    required: true
  created_at:
    type: Date
    default: Date.now
  modified_at:
    type: Date
    default: Date.now