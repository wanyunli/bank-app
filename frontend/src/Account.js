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
        <section className="section full-column">
          <h1 className="title white">My Account</h1>
          <div className="error">{error}</div>
          <div className="container account">
            <div className="white">
              {account.firstName}:{account.lastName} balance: {account.balance}
              euro
            </div>
          </div>
        </section>
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
