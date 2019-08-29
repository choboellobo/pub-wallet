/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async find(req, res) {
    const products = await Product.find({business: req.user.id }).populate('tickets')
    res.json(products)
  }
};

