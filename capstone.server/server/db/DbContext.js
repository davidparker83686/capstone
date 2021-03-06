import mongoose from 'mongoose'
import AccountSchema from '../models/Account'
import ItemSchema from '../models/Item'
import RequestSchema from '../models/Request'
import ReviewSchema from '../models/Review'
import MessageSchema from '../models/Message'
import ValueSchema from '../models/Value'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Items = mongoose.model('Item', ItemSchema);
  Requests = mongoose.model('Request', RequestSchema);
  Reviews = mongoose.model('Review', ReviewSchema);
  Messages = mongoose.model('Message', MessageSchema);
  Values = mongoose.model('Value', ValueSchema);
}

export const dbContext = new DbContext()
