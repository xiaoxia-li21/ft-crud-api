const should = require('should');
const sinon = require('sinon');
const companyController = require('../controller/companyController');

describe('Company Controller Tests', () => {
  describe('Post', () => {
    it('should not allow an empty company on post', () => {
      const Company = function(book) {
        this.save = () => {};
      };

      const req = {
        body: {
          year_founded: 'test',
          revenue: '16m'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = companyController(Company);
      controller.post(req, res);
      res.status
        .calledWith(400)
        .should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('company name is required').should.equal(true);
    });
  });
});
