const supertest = require('supertest');
const expect = require("chai").expect;
describe('AuthController.business', function() {

  describe('#login()', function() {
    let cif

    beforeEach( async ()=>{
      cif = Date.now();
      const nuevo = await Business.create({email: Date.now()+'@yo.es', name: 'test', cif, password: '1234567890'})
    })

    afterEach( async () => {
      const done = await Business.destroy({});
    })

    it('should return a business and a token', function (done) {
      supertest(sails.hooks.http.app)
      .post('/login/business')
      .send({ cif , password: '1234567890' })
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
