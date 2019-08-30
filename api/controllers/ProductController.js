/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async find(req, res) {
    const limit = 100
    const query = {
      where: { business: req.user.id },
      limit,
      skip: (+req.query.page * limit) - limit || 0
    }
    console.log(query)
    const total = await Product.count(query.where)
    const products = await Product.find(query).populate('tickets')
    res.json({total, products })
  }
};

