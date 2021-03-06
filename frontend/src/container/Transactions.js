import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./../App.css";
import "bulma-timeline/dist/css/bulma-timeline.min.css";
import { fetchTransactions } from "../actions/transactions";

function Record(props) {
  const record = props.record;
  const date = new Date(record.createdAt).toLocaleDateString();

  let name;
  if (record.amount > 0) {
    name = "From: " + record.transferName;
  } else {
    name = "To: " + record.receiverName;
  }
  return (
    <div className="timeline-item is-primary">
      <div className="timeline-marker" />
      <div className="timeline-content">
        <p className="heading">{date}</p>
        <p>{name}</p>
        <p>Message: {record.message}</p>
        <p>Amount: {record.amount} euro</p>
      </div>
    </div>
  );
}

class Transactions extends Component {
  componentDidMount() {
    this.props.fetchTransactions(this.props.account.accountId);
  }
  render() {
    const { transactions, error } = this.props;
    const hasTransactions = !(transactions === []);
    return (
      <section className="section full-column">
        <div className="error">{error}</div>
        <div className="container account">
          {hasTransactions && (
            <div className="timeline">
              <header className="timeline-header">
                <span className="tag is-medium is-primary">Today</span>
              </header>
              {transactions.map(trans => (
                <Record record={trans} key={trans.createdAt} />
              ))}
              <header className="timeline-header">
                <span className="tag is-medium is-primary">Start</span>
              </header>
            </div>
          )}
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
