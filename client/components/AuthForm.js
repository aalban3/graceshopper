import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

// import Button from "@material-ui/core/Button";
import Button from "react-bootstrap/Button";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const bottomLinkMessage =
    displayName !== "Sign Up"
      ? "Don't have an account?"
      : "Already have an account?";
  const navLink = displayName === "Sign Up" ? "/login" : "/signup";
  const linkName = displayName === "Sign Up" ? "Sign In" : "Sign Up";
  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="username">
            <big>Username</big>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <big>Password</big>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <Button variant="warning" type="submit">
            {displayName}
          </Button>
        </div>

        {error && error.response && (
          <div className="login-error"> {error.response.data} </div>
        )}
        <div className="auth-container">
          <p className="auth-message">
            <span>{bottomLinkMessage},</span>
            <Link color="primary" to={navLink}>
              {` ${linkName}`}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Sign In",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName, history));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
