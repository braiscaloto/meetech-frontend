import React, { useState, useRef } from 'react';
import { updateAvatar } from '../http/userService';
import { useHistory } from 'react-router-dom';

export function FileUpload() {
  const [file, setFile] = useState();
  const history = useHistory();

  const handleFormSubmit = e => {
    e.preventDefault();
    avatarUpload(file).then(response => {
      console.log(response.data);
      history.push('/');
      history.push('/profile');
    });
  };

  const handleChange = e => {
    setFile({ file: e.target.files[0] });
  };

  const avatarUpload = file => {
    const formData = new FormData();
    formData.append('avatar', file.file);
    return updateAvatar(formData);
  };

  return (
    <form className='uploadAvatarForm' onSubmit={handleFormSubmit}>
      <input type='file' className='avatar-input' onChange={handleChange} />
      <button type='submit' className='button-avatar-update'>
        Update
      </button>
    </form>
  );
}

export default FileUpload;
