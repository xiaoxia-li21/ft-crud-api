import React from 'react';
import axios from 'axios';

const CompanyList = ({ list, err, update }) => {
  const editEntry = e => {
    update(e.target.id, 'put');
  };
  const deleteEntry = e => {
    const id = e.target.id;
    axios
      .delete(`http://localhost:4000/api/company/${id}`)
      .then(response => {
        update(id, 'delete');
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (err) {
    return (
      <div>
        <p className='error'>{err}</p>
      </div>
    );
  }
  let listHtml = list.map((item, i) => (
    <div key={`companylist_${i}`}>
      <ul company_id={item._id}>
        <li>company: {item.company_name}</li>
        <li>Year founded: {item.year_founded}</li>
        <li>Revenue: {item.revenue}</li>
      </ul>
      <input type='button' value='Edit' id={item._id} onClick={editEntry} />
      <input type='button' value='Delete' id={item._id} onClick={deleteEntry} />
    </div>
  ));
  return (
    <div className='company__list'>
      <h2>A list of the company entires</h2>
      {listHtml}
    </div>
  );
};

export default CompanyList;
