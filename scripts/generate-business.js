const faker = require('faker');
module.exports = {


  friendlyName: 'Generate business',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run generate-business`)');
    for(let i = 1; i < 5; i++) {
      const business = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        cif: faker.random.number(),
        password: faker.internet.password()
      }
      await Business.create(business);
    }
  }


};

