const supertest = require('supertest');
const expect = require("chai").expect;
const faker = require('faker');

describe('In a CustomerController ...', () => {
  it('... should create a one', done => {
    const body = {
      name: faker.name.findName(),
      firstName: faker.name.firstName(),
      email: faker.internet.email(),
      birthdate: new Date(1984,6,23)
    }
    supertest(sails.hooks.http.app)
      .post('/api/v1/customer')
      .send(body)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        done()
      })
  })
})
