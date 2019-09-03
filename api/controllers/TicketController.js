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
        tickets = tickets.map(  async (ticket) => {
          ticket.transations_count =  await Transaction.countTransactionsByTicket(ticket.id)
          return ticket
        })
      res.json( await Promise.all(tickets) )
    }catch(error) {
      res.serverError(error);
    }
  }
};

