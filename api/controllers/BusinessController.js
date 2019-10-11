/**
 * BusinessControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  async create(req, res) {
    try {
      const business = await Business.create(req.body).fetch()
      res.status(201).json({ id: business.id })

    }catch(error) {
      res.serverError(error)
    }
  },

  async me(req, res) {
    try {
      const business = await Business.findOne({ id: req.user.id })
      res.json(business)
    }catch(error) {
      res.serverError(error)
    }
  },


  async new(req, res){
    try{
      const business = await Business.create(req.body).fetch();
      res.status(201).json(business);
    }catch(error) {
      res.serverError(error)
    }
  },

  async find(req, res) {
    try {
      let query = {}
      if(req.query.city) query["location.city"] = {contains: req.query.city }
      if(req.query.name) query.name = { contains: req.query.name }
      const business = await Business.find({ where: query }).meta({enableExperimentalDeepTargets:true})
      res.json(business)
    }catch(error) {
      res.serverError(error)
    }
  }

};

