/**
 * Transaction.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    item: {
      type: 'number',
      defaultsTo: 1
    },
    ticket: {
      model: 'ticket',
      required: true
    }
  },

  async countTransactionsByTicket( ticket ) {
    const tickets = await Transaction.find({ ticket })
    if(tickets.length == 0) return 0
    else return tickets.map( t => t.item).reduce( (a,b) => a + b)
  }

};

