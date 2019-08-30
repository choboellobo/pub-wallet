module.exports = {


  friendlyName: 'Generate tickets',


  description: '',


  fn: async function () {

    sails.log('Running custom shell script... (`sails run generate-tickets`)');
    for(let i = 1; i < 5; i++) {
      const product_id = await Product.findRandom()
      console.log(product_id)
      const ticket = {
        product: product_id,
        business: await Product.findBusiness(product_id),
        customer: await Customer.findRandom()
      }
      await Ticket.create(ticket)
    }
  }


};

