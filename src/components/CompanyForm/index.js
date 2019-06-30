import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyForm = ({ update, entry }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [revenue, setRevenue] = useState('');
  const [errorclass, setErrorclass] = useState('');
  useEffect(() => {
    if (entry.method === 'put') {
      axios
        .get(`http://localhost:4000/api/company/${entry.id}`)
        .then(response => {
          if (response.status === 200) {
            setName(response.data.company_name);
            setYear(response.data.year_founded);
            setRevenue(response.data.revenue);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setName('');
      setYear('');
      setRevenue('');
    }
  }, [entry]);
  const submitForm = e => {
    e.preventDefault();
    if (entry.method === 'put') {
      axios
        .put(`http://localhost:4000/api/company/${entry.id}`, {
          company_name: name,
          year_founded: year,
          revenue: revenue
        })
        .then(response => {
          if (response.status === 200) {
            update(response.data._id, 'put');
            setName('');
            setYear('');
            setRevenue('');
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .post('http://localhost:4000/api/company/', {
          company_name: name,
          year_founded: year,
          revenue: revenue
        })
        .then(response => {
          if (response.status === 201) {
            update(response.data._id, 'post');
          }
          setName('');
          setYear('');
          setRevenue('');
        })
        .catch(error => {
          console.log('error', error);
          setErrorclass('error__class');
        });
    }
  };

  const setNameFunc = e => {
    if (e.target.value) {
      setErrorclass('');
    }
    setName(e.target.value);
  };
  const setYearFunc = e => {
    setYear(e.target.value);
  };
  const setRevenueFunc = e => {
    setRevenue(e.target.value);
  };
  return (
    <form onSubmit={submitForm} className='company__form'>
      <h2>Please enter company information here</h2>
      <input
        className={errorclass}
        type='text'
        name='company_name'
        placeholder='company name'
        value={name}
        onChange={setNameFunc}
      />
      <br />
      <input
        type='text'
        name='year_founded'
        value={year}
        placeholder='year founded'
        onChange={setYearFunc}
      />
      <br />
      <input
        type='text'
        name='revenue'
        value={revenue}
        placeholder='revenue'
        onChange={setRevenueFunc}
      />
      <br />
      <input type='submit' value='submit' />
    </form>
  );
};

export default CompanyForm;
