# The User Mongoose model:
global.User = mongoose.model 'User', new Schema
  id: ObjectId
  firstname: 
    type: String
    required: true
  lastname: 
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