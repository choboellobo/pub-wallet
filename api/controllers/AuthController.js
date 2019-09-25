/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const request = require('request');
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
  async socialLogin(req, res) {

    request('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token='+ req.body.access_token, async (error, response, body) => {
      if(error) return res.serverError(error)
      body = JSON.parse(body)
      if(response.statusCode == 200) {
          try {
            let customer = await Customer.findOne({email: body.email})
            if(customer) {
              res.json({
                customer,
                token: jwt.sign({id: customer.id, model: 'customer'})
              })
            }else {

              customer = Customer.create(req.body.customer).fetch();
              res.json({
                customer,
                token: jwt.sign({id: customer.id, model: 'customer'})
              })

            }
          }catch(error) {
            res.serverError(error)
          }
      }else {
        res.status(response.statusCode).json(body)
      }
    })
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

