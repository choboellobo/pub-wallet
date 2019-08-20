/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * Create a new customer
   *
   * @param {*} req
   * @param {*} res
   */
  async create(req, res) {
      try {
        const customer =  await Customer.create(req.body).fetch();
        res.json({id: customer.id });
      }catch(e) {
        res.status(400).json(e);
      }
    }
};

