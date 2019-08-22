/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    customer :{
      model: 'customer',
      required: true
    },
    business: {
      model: 'business',
      required: true
    }
  },
  findByCustomer(customer)  {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Ticket.find({customer})
        resolve(result)
      } catch(error) {
        reject(error)
      }
    })
  }

};

