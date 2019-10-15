/**
 * Payment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require('moment');
const firebase = require('../services/firebase')
const createTicket = async (values, next) => {

  if(values.status == 'succeeded' && !values.completed) {

    const product = await Product.findOne(values.product).populate('business')
    const ticket = await Ticket.create({
      customer: values.customer,
      business: values.business,
      product: values.product,
      payment: values.id,
      expires: product.expiresInDate || moment().add( product.expiresIn, 'days').toISOString()
    }).fetch()
    const done = await Payment.update({id: values.id}, {...values, ticket: ticket.id,  completed: true}).fetch()

    try {
      const notification = {
        ticket: 'BonoWallet notificación',
        body: `Enhorabuena, has adquirido ${product.name} de ${product.business.name}`,
        icon: product.business.icon,
        tag: "notification-1"
      }
      firebase.getPushTokenByCustomerIdAndSendNotification(values.customer, notification);
    }catch(error) {console.log(error)}
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

