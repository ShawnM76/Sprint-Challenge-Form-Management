import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import Cards from './Cards';
import axios from 'axios';
import * as Yup from 'yup';

const Forms = ({ errors, touched }) => {
  const [users, setUsers] = useState([]);
  //console.log('users', users);

  useEffect(() => {
    axios.get('http://localhost:5000/api/restricted/data').then(res => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1> Registration </h1>
        <Form>
          <Field type='text' name='username' placeholder='Enter your Name' />
          {touched.username && errors.username && (
            <p className='error'>{errors.username}</p>
          )}

          <Field type='password' name='password' placeholder='Enter Password' />
          {touched.password && errors.password && (
            <p className='error'>{errors.password}</p>
          )}

          <div />
          <button type='submit'>SignUp</button>
        </Form>
        <div>
          {users.map(e => (
            <Cards
              key={e.name}
              name={e.name}
              course={e.course}
              technique={e.technique}
            />
          ))}
        </div>
      </header>
    </div>
  );
};

const FormikForm = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || '',
      password: password || '',
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string()
      .min(5, 'Password is too short - must be 5 characters minium')
      .required('Password is required!'),
  }),

  handleSubmit(values, { setStatus }) {
    console.log('values', values);
    axios
      .post('http://localhost:5000/api/register', values)
      .then(res => {
        console.log(res.data);
        setStatus(res);
      })
      .catch(err => console.log(err.res));
  },
})(Forms);

export default FormikForm;
