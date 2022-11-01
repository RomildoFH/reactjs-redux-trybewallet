import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions/index';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
    const renderCurrencies = currencies;
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          { ' ' }
          <input id="value-input" type="number" data-testid="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição
          { ' ' }
          <input id="description-input" type="text" data-testid="description-input" />
        </label>
        <label htmlFor="description-input">
          Moeda
          { ' ' }
          <select type="select" data-testid="currency-input">
            { renderCurrencies.map((element, index) => (
              element !== 'USDT'
                ? <option key={ index }>{element}</option>
                : null
            ))}
            {/* { renderCurrencies.map((element, index) => (
              <option key={ index }>{element}</option>
            ))} */}
          </select>
        </label>
        <label htmlFor="description-input">
          Pagamento
          { ' ' }
          <select type="select" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Categoria
          { ' ' }
          <select type="select" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
