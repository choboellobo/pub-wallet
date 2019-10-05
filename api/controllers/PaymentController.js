/**
 * PaymentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async find(req, res) {
    try {
      const query =  {}
      if(req.query.from && req.query.to) query.createdAt = {'>=': new Date(req.query.from).toISOString(), '<=': new Date(req.query.to).toISOString() }
      const payments = await Payment.find({ where: { business: req.user.id, ...query } }).sort('createdAt DESC').populate('product')
      if(!payments) return res.status(404).json({ message: 'No data found '})
      res.json(payments)
    }catch(error) {
      res.serverError(error)
    }
  }

};

