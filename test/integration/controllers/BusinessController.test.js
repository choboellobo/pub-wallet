const supertest = require('supertest');
const expect = require("chai").expect;
const faker = require('faker');

describe('In a BusinessController ... ', () => {
  afterEach( async () => {
    const done = await Business.destroy({});
  })
  it('... shouldn´t create a business', done => {
    const body = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password,
      cif: '12345678'
    }
    supertest(sails.hooks.http.app)
      .post('/api/v1/business')
      .send(body)
      .end( (error, res) => {
        expect(res.status).to.equals(401);
        done()
      })

  })
})
