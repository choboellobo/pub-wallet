/**
 * PaymentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async find(req, res) {
    try {
      const payments = await Payment.find({ business: req.user.id }).sort('id DESC').populate('product')
      if(!payments) return res.status(404).json({ message: 'No data found '})
      res.json(payments)
    }catch(error) {
      res.serverError(error)
    }
  }

};

