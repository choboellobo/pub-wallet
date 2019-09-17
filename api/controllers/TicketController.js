/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async findOne(req, res) {
   try {
      const ticket = await Ticket.findOne({id: req.params.id})
        .populate('product')
        .populate('customer')
        .populate('business')
        .populate('transactions')

      // If there are not any ticket 404
      if( !ticket ) return res.status(404).json({message: 'Not found '})
      // Then add transactions
      ticket.transations_count = await Transaction.countTransactionsByTicket(ticket.id)
      res.json(ticket)

   }catch(error) {
    res.serverError(error);
   }

  },
   async find(req, res) {
    try{
      let tickets = await Ticket.find({ [req.user.model]: req.user.id })
        .populate('product')
        .populate('customer')
        .populate('business')
        .populate('transactions')
        .populate('payment')

        tickets = tickets.map( (ticket) => {
          if(ticket.transactions.length > 0) ticket.transations_count = ticket.transactions.map( transaction => transaction.item).reduce( (a, b) => a + b)
          else ticket.transations_count = 0
          return ticket
        })

      res.json( tickets )
    }catch(error) {
      res.serverError(error);
    }
  }
};

