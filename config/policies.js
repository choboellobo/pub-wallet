/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  //'*': true,
  'CustomerController': {
    '*': ['isAuthorized'],
    'update': ['onlyCustomer'],
    'destroy': false,
    'create': true
  },
  'BusinessController': {
    '*': ['isAuthorized', 'onlyBusiness'],
    'create': true
  },
  'ProductController': {
    '*': ['isAuthorized'],
    'create': ['isAuthorized', 'onlyBusiness']
  },
  'TicketController': {
    '*': ['isAuthorized'],
    'create': false,
    'destroy': false,
    'update': false
  },
  'PaymentController': {
    '*': ['isAuthorized'],
    'find': ['isAuthorized', 'onlyBusiness']
  },
  'TransactionController': {
    '*': ['isAuthorized'],
    'find': false,
    'destroy': false,
    'update': false
  }

};
