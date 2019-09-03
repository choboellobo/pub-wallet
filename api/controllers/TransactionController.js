/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    async create(req, res) {
      const validator = await sails.helpers.hasAttrs( req.body , ['ticket'])
      if(  !validator  ) res.status(400).json({ message: `Missings ${JSON.stringify(validator.missing)}`})
      try {
        const ticket_ref = req.body.ticket;
        const item = req.body.item || 1

        const ticket = await Ticket.findOne({ id: ticket_ref }).populate('business').populate('product')
        if(!ticket) return res.status(404).json({ message: 'Not found'})
        // Ticket owner and user auth must be the same
        if( ticket.business.id == req.user.id ) {
          // Get transactions before by ticket
          const transaction_before = await Transaction.countTransactionsByTicket(req.body.ticket);

          if( (transaction_before + item) <= ticket.product.items ) {
            const transaction = await Transaction.create({ ticket: ticket_ref , item }).fetch()
            res.status(201).json({...transaction, total: transaction_before + item })
          }else res.status(403).json({ message: `Transaction not allowed, has ${transaction_before}, wants ${item}, can ${ticket.product.items}, left ${ticket.product.items - transaction_before}`})

        }else res.status(403).json({ message: 'Only own business can generate a transaction'})
      }catch(error) {
        res.serverError(error)
      }
    }
};

