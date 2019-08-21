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
      }catch(error) {
        res.serverError(error);
      }
    },

    async find(req, res) {

      try {
        if(req.user.model == 'customer') {
          const customer = await Customer.find({id: req.user.id});
          res.json(customer);
        }else res.status(403).json({message: 'Forbidden'})

      }catch(error) {
        res.serverError(error)
      }
    }
};

