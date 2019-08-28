/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      allowNull: false
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
      custom(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }
    },
    avatar: {
      type: 'string',
      defaultsTo: `https://api.adorable.io/avatars/256/${Date.now()}.png`
    },
    birthdate: {
      type: 'string',
      allowNull: false
    },
    tickets: {
      collection: 'ticket',
      via: 'customer'
    }
  },
  async findRandom() {
    const all = await Customer.find();
    const random = Math.floor(Math.random() * all.length)
    return all[random].id;
  }
  // customToJSON: function() {
  //   return _.omit(this, ['name'])
  // }

};

