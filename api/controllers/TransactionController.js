/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment');
module.exports = {

    async create(req, res) {
      const validator = await sails.helpers.hasAttrs( req.body , ['ticket'])
      if(  !validator  ) res.status(400).json({ message: `Missings ${JSON.stringify(validator.missing)}`})
      try {
        const ticket_ref = req.body.ticket;
        const item = req.body.item || 1

        const ticket = await Ticket.findOne({ id: ticket_ref }).populate('business').populate('product')
        if(!ticket) return res.status(404).json({ message: 'Not found'})
        // Check date expires ticket
        if( moment().isAfter(ticket.expires) ) res.status(423).json({ message: "El ticket esta caducado, fecha final de uso " + moment(ticket.expires).format('DD/MM/YYYY')})
        // Ticket owner and user auth must be the same
        if( ticket.business.id == req.user.id ) {
          // Get transactions before by ticket
          const transaction_before = await Transaction.countTransactionsByTicket(req.body.ticket);

          if( (transaction_before + item) <= ticket.product.items ) {
            const transaction = await Transaction.create({ ticket: ticket_ref , item }).fetch()
            res.status(201).json({...transaction, total: transaction_before + item })
          }else res.status(403).json({ message: `Transacción no permitida, tienes ${transaction_before}, quieres ${item}, puedes ${ticket.product.items}, te quedan ${ticket.product.items - transaction_before}`})

        }else res.status(403).json({ message: 'Solo el dueño del producto puede realizar transacciones'})
      }catch(error) {
        res.serverError(error)
      }
    }
};

