import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Request = new Schema(
  {
    itemId: { type: String },
    ownerId: { type: String },
    ownerReview: { type: Boolean },
    borrowerId: { type: String },
    borrowerReview: { type: Boolean },
    pending: { type: Boolean, required: true, default: true },
    accepted: { type: Boolean, required: true, default: false },
    returned: { type: Boolean, required: true, default: false },
    borrowStartDate: { type: String, required: true },
    borrowEndDate: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    ownerName: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Request.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Request.virtual('itemOwner', {
  localField: 'ownerId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

Request.virtual('itemName', {
  localField: 'itemId',
  ref: 'Item',
  foreignField: '_id',
  justOne: true
})
export default Request
