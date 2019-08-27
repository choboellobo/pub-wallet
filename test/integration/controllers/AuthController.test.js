const supertest = require('supertest');
const expect = require("chai").expect;
const faker = require('faker');
describe('AuthController.business', function() {

  describe('#login()', function() {
    let cif
    let password = faker.internet.password()

    beforeEach( async ()=>{
      cif = Date.now();
      const business_model = {email: faker.internet.email() , name: faker.name.findName() , cif, password}
      await Business.create( business_model )

    })

    afterEach( async () => {
      const done = await Business.destroy({});
    })

    it('should return a business and a token', function (done) {
      supertest(sails.hooks.http.app)
      .post('/login/business')
      .send({ cif , password })
      .expect(201)
      .end( (err, res) => {
        if (err) throw err;
        else {
          expect(res.status).to.equal(201)
          expect(res.body).to.have.property("token")
					expect(res.body.business).to.be.a('object')
          done()
        }
      })
    });

    it('should return a 404 if login fails', (done) => {
      supertest(sails.hooks.http.app)
      .post('/login/business')
      .send({ cif: 'xxxx', password: 'xxxx'})
      .expect(404, done)
    })
  });

});
