const util = require('util');

describe('Customer (model)', function() {

  describe('Find ...', () => {
    it('should find all records', () => {

      return new Promise( async (resolve, reject) => {
          const customers = await Customer.find()
          if( typeof customers.length == 'number') resolve()
          else reject( new Error('Spec number and is was a ' + typeof customers.length))
      })
    })
  })
});
