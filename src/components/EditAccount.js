import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { updateAccount } from "../http/userService";
import { useHistory } from "react-router";

import FileUpload from "../components/FileUpload";

export default function EditAccount() {
  const { register, handleSubmit, setError } = useForm({
    mode: "onBlur"
  });

  const history = useHistory();

  const handleAccountChange = formData => {
    return updateAccount(formData)
      .then(history.push("/login"))
      .catch(error => {
        setError(error);
      });
  };
  return (
    <React.Fragment>
      <main className="updateAccountMain">
        <Link className="linkBack" to="/profile">
          ← Go Back
        </Link>
        <section className="sectionAvatar">
          <h3 className="titleEditAvatar">Change your avatar</h3>
          <FileUpload />
        </section>
        <section className="form-edit-account">
          <h3 className="titleEditAccount">Edit Account</h3>
          <form
            onSubmit={handleSubmit(handleAccountChange)}
            className="editForm"
          >
            <div className="userUpdate">
              <label className="labelPassword">Current Password</label>
              <input
                className="inputPassword"
                type="password"
                name="oldPassword"
                ref={register({
                  required: "The password is mandatory",
                  minLength: {
                    message: "Password length should be greater than 6",
                    value: 6
                  }
                })}
              />
            </div>
            <div className="userUpdate">
              <label className="labelPassword">New Password</label>
              <input
                className="inputPassword"
                type="password"
                name="newPassword"
                ref={register({
                  required: "The password is mandatory",
                  minLength: {
                    message: "Password length should be greater than 6",
                    value: 6
                  }
                })}
              />
            </div>
            <div className="userUpdate">
              <button type="submit" className="updateButton">
                Update Changes
              </button>
              <p className="pRestartSession">
                Your session will be need restarted to apply changes
              </p>
            </div>
          </form>
        </section>
        <Link className="linkDelete" to="/delete">
          Delete your account
        </Link>
      </main>
    </React.Fragment>
  );
}
