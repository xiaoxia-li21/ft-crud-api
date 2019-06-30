require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';
const app = require('../app.js');

const Company = mongoose.model('Company');
const agent = request.agent(app);

describe('Company Crud Test', () => {
  it('should allow a company entry to be posted and return company and _id', done => {
    const companyPost = {
      company_name: 'My test',
      year_founded: '2060',
      revenue: '10m'
    };
    agent
      .post('/api/company')
      .send(companyPost)
      .expect(200)
      .end((err, results) => {
        results.body.should.have.property('company_name');
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(done => {
    Company.deleteMany({}).exec();
    done();
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
