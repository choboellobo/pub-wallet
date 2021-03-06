/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
const blueprint_config = require('./blueprints').blueprints;
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /login/customer': 'AuthController.loginCustomer',
  'POST /login/business': 'AuthController.loginBusiness',
  'POST /login/social': 'AuthController.socialLogin',
  [`GET ${blueprint_config.prefix}/business/me`]: 'BusinessController.me',
  [`POST ${blueprint_config.prefix}/business/new`]: 'BusinessController.new',
  [`POST ${blueprint_config.prefix}/transaction/create`]: 'TransactionController.create',
  [`GET ${blueprint_config.prefix}/product/:id/tickets`]: 'Product.ticketsByProduct',
  [`GET ${blueprint_config.prefix}/ticket/:id/transactions`] : 'TransactionController.findByTicket',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
