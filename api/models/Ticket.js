/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    expiresIn: {
      type: 'number',
      defaultsTo: Date.now() + ( 3 * 2678400000 )
    },
    product: {
      model: 'product',
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

};

