function companyController(Company) {
  function post(req, res) {
    const company = new Company(req.body);
    if (!req.body.company_name) {
      res.status(400);
      return res.send('company name is required');
    }
    company.save();
    res.status(201);
    return res.json(company);
  }
  function get(req, res) {
    const query = {};
    if (req.query.year_founded) {
      query.year_founded = req.query.year_founded;
    }
    Company.find(query, (err, company) => {
      if (err) {
        return res.send(err);
      }
      const returnCompanies = company.map(item => {
        let newCompany = item.toJSON();
        newCompany.links = `http://${req.headers.host}/api/company/${item._id}`;
        return newCompany;
      });
      return res.json(returnCompanies);
    });
  }
  return { post, get };
}

module.exports = companyController;
