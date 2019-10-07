/**
 * Business.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require("bcrypt");

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    icon: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      custom(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    },
    password: {
      type: 'string',
      required: true,
      unique: true
    },
    phone: {
      type: 'string'
    },
    cif: {
      type: 'string',
      required: true,
      unique: true,
    },
    location: {
      type: 'json'
    },
    active: {
      type: 'boolean',
      defaultsTo: false
    },
    tickets: {
      collection: 'ticket',
      via: 'business'
    }

  },
  customToJSON() {
    return _.omit(this, ['password'])
  },
  beforeCreate(business, done) {
    bcrypt.genSalt(10, (error, salt)=> {
      bcrypt.hash(business.password, salt, (error, hash) => {
        if(error) return done(error)
        business.password = hash
        done()
      })
    })
  },
  async findRandom() {
    console.log(this)
    const all = await Business.find();
    const random = Math.floor(Math.random() * all.length)
    return all[random].id;
  }

};

