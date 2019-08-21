/**
 * TicketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   async find(req, res) {
    try{
      const tickets = await Ticket.findByCustomer('5d5c1fe55106cf08ce9f8673');
      res.json(tickets)
    }catch(error) {
      res.serverError(error);
    }
  }
};

