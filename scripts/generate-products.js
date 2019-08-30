const faker = require('faker');

module.exports = {


  friendlyName: 'Generate products',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run generate-products`)');
    await Product.destroy({})
    for(let i = 1; i < 50; i++) {
      const product = {
        name: faker.name.title(),
        description: faker.lorem.text(),
        price: 11,
        items: 10,
        business: await Business.findRandom()
      }
      await Product.create(product);
    }
  }


};

