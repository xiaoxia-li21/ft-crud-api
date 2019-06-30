import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './main.scss';
import CompanyList from './components/CompanyList/index';
import CompanyForm from './components/CompanyForm/index';

const App = () => {
  const [list, setList] = useState([]);
  const [err, setErr] = useState('');
  const [entry, setEntry] = useState({
    id: '',
    method: ''
  });
  const update = (id, method) => {
    if (entry.id === id && entry.method === 'put') {
      setEntry({
        id: '',
        method: ''
      });
    } else {
      setEntry({
        id: id,
        method: method
      });
    }
  };
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/company/')
      .then(response => {
        setList(response.data);
      })
      .catch(err => {
        setErr('Error occurred, please fresh the page and try again...');
      });
  }, [entry]);
  return (
    <div className='app__wrapper'>
      <h1>CRUD API</h1>
      <CompanyForm update={update} entry={entry} />
      <CompanyList list={list} err={err} update={update} />
    </div>
  );
};

export default App;
