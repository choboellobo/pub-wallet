/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async find(req, res) {
    let business;
    req.user.model == 'business' ? business = req.user.id : business = req.query.business
    const limit = 100
    const query = {
      where: { business , for_sale: true },
      limit,
      skip: (+req.query.page * limit) - limit || 0
    }
    const total = await Product.count(query.where)
    const products = await Product.find(query).populate('tickets')
    res.json({total, products })
  },


  async ticketsByProduct(req, res) {
    try {
      let tickets = await Ticket.find({ product: req.params.id })
            .populate('product')
            .populate('customer')
            .populate('payment')
            .populate('transactions')

      tickets = tickets.map( (ticket) => {
        if(ticket.transactions.length > 0) ticket.transations_count = ticket.transactions.map( transaction => transaction.item).reduce( (a, b) => a + b)
        else ticket.transations_count = 0
        return ticket
      })

      res.json(tickets)

    }catch(error) {
      res.errorServer(error)
    }
  },

  async update(req, res) {
   try{
    const product = await Product.updateOne(req.params.id).set(req.body)
    res.json(product)
   }catch(error) {
     res.serverError(error)
   }
  }
};

