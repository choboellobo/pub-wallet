/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  async loginCustomer(req, res) {
    try {
      const customer = await Customer.findOne({email: req.body.email})
      if(customer) {
        res.json({
          customer,
          token: jwt.sign({id: customer.id, model: 'customer'})
        })
      }else {
        res.status(404).json({message: 'Email or password incorrect'})
      }
    }catch(error) {
      res.serverError(error)
    }
  },
  async loginBusiness(req, res) {
    try {
      const business = await Business.findOne({cif: req.body.cif})
      res.json({
        business,
        token: jwt.sign({id: business.id, model: 'business'})
      })
    }catch(error) {
      res.serverError(error)
    }
  }
};

