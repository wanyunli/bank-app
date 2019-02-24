import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./../App.css";
import {
  togglePayment,
  toggleTransactions,
  logoutAccount
} from "../actions/account";
import Payment from "./Payment";
import Transactions from "./Transactions";
import Login from "./Login";

class Account extends Component {
  render() {
    const { account, error } = this.props;
    console.log("account is", account);
    return (
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img
                src="https://img.icons8.com/dusk/64/000000/bank.png"
                width="40"
                height="28"
              />
            </a>
            {this.props.isAuthenticated && (
              <a className="navbar-item" onClick={this.props.togglePayment}>
                New payment
              </a>
            )}
            {this.props.isAuthenticated && (
              <a
                className="navbar-item"
                onClick={this.props.toggleTransactions}
              >
                Transactions
              </a>
            )}
            {this.props.isAuthenticated && (
              <a className="navbar-item" onClick={this.props.logoutAccount}>
                Log out
              </a>
            )}
          </div>
        </nav>
        {this.props.isAuthenticated && (
          <h4 className="title is-4 padding-t-24 padding-l-24">
            Welcome {account.firstName} {account.lastName}
          </h4>
        )}
        {this.props.isAuthenticated && (
          <h6 className="title is-6 padding-l-24">
            Account balance: {account.balance} euro
          </h6>
        )}
        {this.props.isAuthenticated && (
          <h6 className="title is-6 padding-l-24">
            Account number: {account.accountId}
          </h6>
        )}
        {!this.props.isAuthenticated && (
          <h6 className="title is-6 padding-l-24">Login your account</h6>
        )}
        <div className="error">{error}</div>
        {!this.props.isAuthenticated && <Login />}
        {this.props.showPayment && <Payment />}
        {this.props.showTransactions && <Transactions />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.account.isAuthenticated,
    account: state.account.account,
    isLoading: state.account.loading,
    showPayment: state.account.showPayment,
    showTransactions: state.account.showTransactions,
    error: state.account.error
  };
};

const mapDispatchToProps = {
  // fetchAccount,
  togglePayment,
  toggleTransactions,
  logoutAccount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
