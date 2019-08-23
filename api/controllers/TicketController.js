/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   async find(req, res) {
    try{
      const query = {}
            query[req.user.model] = req.user.id;
      if(req.query.active) query.expiresIn = {'>': Date.now() }

      let tickets = await Ticket.find({where: query}).populate('product').populate('customer').populate('business').populate('transactions')
      tickets = tickets.map( ticket => {
        ticket.transactions_count = ticket.transactions.map(t => t.item).reduce( (a,b) => a + b )
        return ticket
      })
      res.json(tickets)
    }catch(error) {
      res.serverError(error);
    }
  }
};

