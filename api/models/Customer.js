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
      type: 'string'
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    }

  },

};

