const express = require('express');
const companyController = require('../controller/companyController');

function routes(Company) {
  const companyRouter = express.Router();
  const controller = companyController(Company);
  companyRouter
    .route('/company')
    .post(controller.post)
    .get(controller.get);

  companyRouter.use('/company/:id', (req, res, next) => {
    Company.findById(req.params.id, (err, company) => {
      if (err) {
        return res.send(err);
      }
      if (company) {
        req.company = company;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  companyRouter
    .route('/company/:id')
    .get((req, res) => res.json(req.company))
    .put((req, res) => {
      req.company.company_name = req.body.company_name;
      req.company.year_founded = req.body.year_founded;
      req.company.revenue = req.body.revenue;
      req.company.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.company);
      });
    })
    .patch((req, res) => {
      const { company } = req;
      if (req.body._id) {
        delete req.body._id;
      }
      Object.entries(req.body).forEach(item => {
        const key = item[0];
        const value = item[1];
        company[key] = value;
      });
      console.log('company', req.company);

      req.company.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(req.company);
      });
    })
    .delete((req, res) => {
      req.company.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return companyRouter;
}

module.exports = routes;
