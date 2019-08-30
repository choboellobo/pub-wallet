/**
 * Payment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const createTicket = async (values, next) => {

  if(values.status == 'succeeded' && !values.completed) {
    const ticket = await Ticket.create({
      customer: values.customer,
      business: values.business,
      product: values.product
    }).fetch()
    const done = await Payment.update({id: values.id}, {...values,ticket: ticket.id,  completed: true}).fetch()
    console.log(done)
  }
  next()
}
module.exports = {

  attributes: {

    customer: {
      model: 'customer',
      required: true
    },
    business: {
      model: 'business',
      required: true
    },
    ticket: {
      model: 'ticket'
    },
    product: {
      model: 'product',
      required: true
    },
    status: {
      type: 'string',
      isIn: ['succeeded', 'failed', 'pending'],
      defaultsTo: 'pending'
    },
    completed: {
      type: 'boolean',
      defaultsTo: false
    },
    provider: {
      type: 'string',
      isIn: ['cash'],
      defaultsTo: 'cash'
    },
    raw: {
      type: 'json'
    }

  },
  afterCreate: createTicket,
  afterUpdate: createTicket

};
