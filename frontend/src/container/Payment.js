import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./../App.css";
import { createPayment } from "../actions/payment";

class Payment extends Component {
  state = {
    receiverAccountId: "",
    receiverName: "",
    message: "",
    amount: 0
  };

  createPayment(event) {
    event.preventDefault(); // Prevent form from reloading page
    const { receiverAccountId, receiverName, message, amount } = this.state;
    const { accountId, firstName, lastName, balance } = this.props.account;
    if (receiverAccountId && receiverName && amount > 0 && amount <= balance) {
      const newPayment = {
        transferAccountId: accountId,
        receiverAccountId,
        receiverName,
        transferName: `${firstName} ${lastName}`,
        message,
        amount
      };
      this.props.createPayment(newPayment);
      this.setState({
        receiverAccountId: "",
        receiverName: "",
        message: "",
        amount: 0
      });
    }
  }

  render() {
    const { isSaving, isLoading, error } = this.props;
    let { receiverAccountId, receiverName, message, amount } = this.state;
    return (
      <section className="section full-column">
        <div className="error">{error}</div>
        <form
          className="form-horizontal"
          onSubmit={this.createPayment.bind(this)}
        >
          <fieldset>
            <div className="field">
              <label className="label" htmlFor="recever-account-id">
                Receiver account number
              </label>
              <div className="control">
                <input
                  id="recever-account-id"
                  name="recever-account-id"
                  type="text"
                  value={receiverAccountId}
                  placeholder="e.g. 1233445556"
                  className="input"
                  onChange={e =>
                    this.setState({ receiverAccountId: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label className="label" htmlFor="receiver-name">
                  Receiver name
                </label>
                <div className="control">
                  <input
                    id="receiver-name"
                    name="receiver-name"
                    type="text"
                    value={receiverName}
                    placeholder="firstname lastName"
                    onChange={e =>
                      this.setState({ receiverName: e.target.value })
                    }
                    className="input "
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="amount">
                  Amount(Euro)
                </label>
                <div className="control">
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    value={amount}
                    placeholder="placeholder"
                    onChange={e =>
                      this.setState({ amount: parseFloat(e.target.value) })
                    }
                    className="input "
                  />
                </div>
              </div>
              <div className="field">
                <label className="label" htmlFor="message">
                  Message
                </label>
                <div className="control">
                  <textarea
                    className="textarea"
                    id="message"
                    name="message"
                    value={message}
                    onChange={e => this.setState({ message: e.target.value })}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" htmlFor="save-payment">
                  Single Button
                </label>
                <div className="control">
                  <button
                    id="save-payment"
                    name="save-payment"
                    className={`button is-success ${(isLoading || isSaving) &&
                      "is-loading"}`}
                    disabled={isLoading || isSaving}
                  >
                    Add payment
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
    account: state.account.account,
    isLoading: state.account.loading,
    isSaving: state.payment.saving,
    success: state.payment.success,
    error: state.payment.error
  };
};

const mapDispatchToProps = {
  createPayment
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
