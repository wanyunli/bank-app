import React, { Component } from "react";
import { connect } from "react-redux";
import "bulma/css/bulma.css";
import "./../App.css";
import { submitPayment, clearError } from "../actions/payment";

class Payment extends Component {
  state = {
    receiverAccountId: "",
    receiverName: "",
    message: "",
    amount: 0,
    password: "",
    paymentCreated: false
  };

  createPayment(event) {
    event.preventDefault();
    this.setState({
      paymentCreated: true
    });
    this.props.clearError();
  }

  cancelPayment(event) {
    event.preventDefault();
    this.setState({
      receiverAccountId: "",
      receiverName: "",
      message: "",
      amount: 0,
      password: "",
      paymentCreated: false
    });
  }

  submitPayment(event) {
    event.preventDefault();
    const {
      receiverAccountId,
      receiverName,
      message,
      amount,
      password
    } = this.state;
    const { accountId, firstName, lastName } = this.props.account;
    const newPayment = {
      transferAccountId: accountId,
      receiverAccountId: receiverAccountId.trim(),
      receiverName: receiverName.trim(),
      transferName: `${firstName} ${lastName}`,
      message: message.trim(),
      amount,
      accountId,
      password
    };
    this.props.submitPayment(newPayment);
    this.setState({
      receiverAccountId: "",
      receiverName: "",
      message: "",
      amount: 0,
      password: "",
      paymentCreated: false
    });
  }

  render() {
    const { isSubmitting, error } = this.props;
    let {
      receiverAccountId,
      receiverName,
      message,
      amount,
      password,
      paymentCreated
    } = this.state;
    return (
      <section className="section full-column">
        <div className="error">{error}</div>
        {!paymentCreated && (
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
                    placeholder="e.g. 123456"
                    className="input"
                    onChange={e =>
                      this.setState({ receiverAccountId: e.target.value })
                    }
                    required
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
                      onChange={e =>
                        this.setState({ receiverName: e.target.value })
                      }
                      className="input"
                      required
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
                      required
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
                  <div className="control">
                    <button
                      id="save-payment"
                      name="save-payment"
                      className={`button is-success ${isSubmitting &&
                        "is-loading"}`}
                      disabled={isSubmitting}
                    >
                      Add payment
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        )}
        {paymentCreated && (
          <form
            className="form-horizontal"
            onSubmit={this.submitPayment.bind(this)}
          >
            <fieldset>
              <div className="field">
                <label className="label" htmlFor="payment-password">
                  Password
                </label>
                <div className="control">
                  <input
                    id="payment-password"
                    name="payment-password"
                    type="password"
                    value={password}
                    placeholder="Login password"
                    onChange={e => this.setState({ password: e.target.value })}
                    className="input"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className={`button is-success ${isSubmitting &&
                          "is-loading"}`}
                        id="submit-payment"
                        name="submit-payment"
                        disabled={isSubmitting}
                        required
                      >
                        Pay now
                      </button>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className="button is-text"
                        onClick={this.cancelPayment.bind(this)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account.account,
    isSubmitting: state.payment.isSubmitting,
    success: state.payment.success,
    error: state.payment.error
  };
};

const mapDispatchToProps = {
  submitPayment,
  clearError
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
