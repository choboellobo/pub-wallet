const faker = require('faker');

module.exports = {


  friendlyName: 'Generate customers',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run generate-customers`)');
    for(let i = 1; i < 50; i++) {
      const customer = {
        name: faker.name.findName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        birthdate: faker.date.past()
      }
      await Customer.create(customer)
    }
  }


};

