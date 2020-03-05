import React from 'react';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { deleteAccount } from '../http/userService';

export function UserDelete() {
  const { handleSubmit, register, errors, formState, setError } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();

  const handleUserDelete = formData => {
    return deleteAccount(formData).then(response => {
      history.push('/login');
    });
  };

  return (
    <React.Fragment>
      <main className='centered-container2'>
        <Link className='linkDelete' to='/profile'>
          Go profile
        </Link>
        <form onSubmit={handleSubmit(handleUserDelete)}>
          <h3 className='titleDeleteAccount'>Delete account</h3>
          <div className='form-control'>
            <label className='typeDelete' htmlFor='confirm'>
              {'Type to delete'}: DELETE MY ACCOUNT
            </label>
            <input
              name='confirm'
              type='text'
              id='confirm'
              placeholder='COMFIRM DELETE'
            ></input>
          </div>

          <div className='btn-container'>
            <button
              type='submit'
              className='btn'
              disabled={formState.isSubmitting}
              onClick={() => {
                localStorage.clear();
                window.location.href = '/login';
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
