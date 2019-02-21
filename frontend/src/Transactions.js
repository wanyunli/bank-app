import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./App.css";
import { fetchTransactions } from "./actions/transactions";

class Transactions extends Component {
  componentDidMount() {
    console.log("Transaction account is: ", this.props.account.accountId);
    this.props.fetchTransactions(this.props.account.accountId);
  }
  render() {
    const { transactions, error } = this.props;
    return (
      <section className="section full-column">
        <h2 className="title white">My Transactions</h2>
        <div className="error">{error}</div>
        <div className="container account">
          <div className="white">
            {/* {account.firstName}:{account.lastName} balance: {account.balance} */}
            euro
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account.account,
    isLoading: state.transactions.loading,
    transactions: state.transactions.transactions,
    error: state.transactions.error
  };
};

const mapDispatchToProps = {
  fetchTransactions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
