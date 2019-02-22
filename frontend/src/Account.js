import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./App.css";
import {
  fetchAccount,
  togglePayment,
  toggleTransactions
} from "./actions/account";
import Payment from "./Payment";
import Transactions from "./Transactions";

class Account extends Component {
  componentDidMount() {
    this.props.fetchAccount();
  }
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
            <a className="navbar-item" onClick={this.props.togglePayment}>
              New payment
            </a>
            <a className="navbar-item" onClick={this.props.toggleTransactions}>
              Transactions
            </a>
            <a className="navbar-item">Log in</a>
          </div>
        </nav>
        <h4 className="title is-4 padding-t-24 padding-l-24">
          Welcome {account.firstName} {account.lastName}
        </h4>
        <h6 className="title is-6 padding-l-24">
          Account balance: {account.balance} euro
        </h6>
        <h6 className="title is-6 padding-l-24">
          Account number: {account.accountId}
        </h6>
        <div className="error">{error}</div>

        {this.props.showPayment && <Payment />}
        {this.props.showTransactions && <Transactions />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account.account,
    isLoading: state.account.loading,
    showPayment: state.account.showPayment,
    showTransactions: state.account.showTransactions,
    error: state.account.error
  };
};

const mapDispatchToProps = {
  fetchAccount,
  togglePayment,
  toggleTransactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account);
