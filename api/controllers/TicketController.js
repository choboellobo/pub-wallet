/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   async find(req, res) {
    try{

      let tickets = await Ticket.find({ [req.user.model]: req.user.id }).populate('product').populate('customer').populate('business').populate('transactions')
      tickets = tickets.map( ticket => {
        if(ticket.transactions.length > 0 ) ticket.transactions_count = ticket.transactions.map(t => t.item).reduce( (a,b) => a + b )
        else ticket.transactions = 0
        return ticket
      })
      res.json(tickets)
    }catch(error) {
      res.serverError(error);
    }
  }
};

