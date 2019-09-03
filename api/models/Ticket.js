/**
 * Ticket.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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
    },
    payment: {
      model: 'payment'
    },
    transactions: {
      collection: 'transaction',
      via: 'ticket'
    }
  },

};

