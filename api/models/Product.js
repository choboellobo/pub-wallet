/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name : {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'number',
      required: true
    },
    items: {
      type: 'number',
      required: true
    },
    expiresIn: {
      type: 'number',
      defaultsTo: Date.now() + ( 3 * 2678400000 )
    },
    business: {
      model:'business',
      required: true
    }
  },
  beforeCreate(values, done) {
    if(!Number.isInteger(values.price)) values.price = values.price.toFixed(2);
    done();
  },
  async findRandom() {
    const all = await Product.find();
    const random = Math.floor(Math.random() * all.length)
    return all[random].id;
  },
  async findBusiness( id ) {
    const product = await Product.findOne({ id }).populate('business')
    return product.business.id
  }

};

