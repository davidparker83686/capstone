import { dbContext } from '../db/DbContext'
// import { BadRequest } from '../utils/Errors'
import { logger } from '../utils/Logger'

class ItemsService {
  // ANCHOR how to do query for getAllItems

  async getAllItems(query = {}) {
    const data = await dbContext.Items.find(query).populate('creator', 'name picture')
    return data
  }

  async getOneItem(id) {
    const data = await dbContext.Items.findOne({ _id: id }).populate('creator')
    return data
  }

  async getItemsByUserId(query = {}) {
    const data = await dbContext.Items.find(query).populate('creator')
    return data
  }

  async createItem(body) {
    return await dbContext.Items.create(body)
  }

  async deleteItem(id) {
    const data = await dbContext.Items.findOneAndDelete({ _id: id })
    return data
  }

  async editItem(body) {
    const data = await dbContext.Items.findOneAndUpdate({ _id: body.id }, body, { new: true })
    return data
  }

  // async searchItems(query = {}) {
  //   const data = await dbContext.Items.find({
  //     $and:
  //       [{ title: query.search },
  //         {
  //           location: {
  //             $nearSphere: {
  //               $geometry: {
  //                 type: 'Point',
  //                 coordinates: [query.y, query.x]
  //               },
  //               $maxDistance: query.distance * 1609.34
  //             }
  //           }
  //         }
  //       ]
  //   })
  //   logger.log(data)
  //   return data
  // }

  async searchItems(query = {}) {
    const data = await dbContext.Items.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [query.y, query.x]
          },
          $minDistance: 0,
          $maxDistance: query.distance * 1609.34
        }
      }
    })
    logger.log(data)
    return data
  }
}

export const itemsService = new ItemsService()
