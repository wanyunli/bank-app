import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./../App.css";
import { login } from "../actions/login";
import { isEmpty } from "../utils";

class Login extends Component {
  state = {
    userName: "",
    password: ""
  };

  loginRequest(event) {
    event.preventDefault(); // Prevent form from reloading page
    const { userName, password } = this.state;
    console.log("here..00.", this.state);
    if (!isEmpty(userName.trim()) && !isEmpty(password.trim())) {
      console.log("here...", this.state);
      const loginInfo = {
        userName: userName.trim(),
        password: password.trim()
      };
      this.props.login(loginInfo);
      this.setState({
        userName: "",
        password: ""
      });
    }
  }

  formatError(error) {
    if (Array.isArray(error)) {
      return error.join("\n");
    }
    return error;
  }

  render() {
    let { userName, password } = this.state;
    let { isLogging, error } = this.props;
    return (
      <section className="section full-column">
        <div className="error">{this.formatError(error)}</div>
        <form
          className="form-horizontal"
          onSubmit={this.loginRequest.bind(this)}
        >
          <fieldset>
            <div className="field">
              <label className="label" htmlFor="username">
                Username
              </label>
              <div className="control">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={userName}
                  placeholder="e.g. 123456"
                  className="input"
                  onChange={e => this.setState({ userName: e.target.value })}
                  required
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="password">
                  Receiver name
                </label>
                <div className="control">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => this.setState({ password: e.target.value })}
                    className="input"
                    required
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    id="login-submi"
                    name="login-submi"
                    className={`button is-success ${isLogging && "is-loading"}`}
                    disabled={isLogging}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogging: state.login.isLogging,
    error: state.login.error
  };
};

const mapDispatchToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
