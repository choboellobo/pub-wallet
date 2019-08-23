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

      const tickets = await Ticket.find({where: query}).populate('product').populate('customer').populate('business')
      res.json(tickets)
    }catch(error) {
      res.serverError(error);
    }
  }
};

