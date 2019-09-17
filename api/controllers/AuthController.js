/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcrypt")
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
        res.status(404).json({message: 'Cliente no encontrado' })
      }
    }catch(error) {
      res.serverError(error)
    }
  },
  async loginBusiness(req, res) {
    try {
      const business = await Business.findOne({cif: req.body.cif })
      if(!business) return res.status(404).json({message: 'Cif o contraseña incorrecta'})
      if(!business.active) return  res.status(401).json({message: 'Empresa no activa' })
      bcrypt.compare(req.body.password, business.password, (error, isCorrect) => {
        if(error) return res.serverError(error)
        else {
          if(!isCorrect) return res.status(404).json({message: 'Cif o contraseña incorrecta'})
          delete business.password
          res.status(201).json({
            business,
            token: jwt.sign({id: business.id, model: 'business'})
          })
        }
      })
    }catch(error) {
      res.serverError(error)
    }

  }
};

