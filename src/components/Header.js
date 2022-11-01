import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  getTotalInGlobalState = () => {
    const { expenses } = this.props;
    let total = 0;
    const expensesArray = expenses;
    const exchangeArray = expensesArray.map((element) => (
      (Number(element.value) * element.exchangeRates[element.currency].ask)
    ));
    for (let index = 0; index < exchangeArray.length; index += 1) {
      total += exchangeArray[index];
    }
    return (total.toFixed(2));
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <div>
        <span data-testid="email-field">{ email }</span>
        <span> Despesa Total: </span>
        <span
          data-testid="total-field"
        >
          { expenses.length > 0 ? this.getTotalInGlobalState() : 0.00 }
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
