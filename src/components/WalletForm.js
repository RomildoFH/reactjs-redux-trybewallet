import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExpense } from '../redux/actions/index';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
    const newExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(fetchExpense(newExpense));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const renderCurrencies = currencies;
    return (
      <form>
        <label htmlFor="value-input">
          Valor
          { ' ' }
          <input
            name="value"
            id="value-input"
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description-input">
          Descrição
          { ' ' }
          <input
            name="description"
            id="description-input"
            type="text"
            data-testid="description-input"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="description-input">
          Moeda
          { ' ' }
          <select
            name="currency"
            type="select"
            data-testid="currency-input"
            onChange={ this.handleChange }
            value={ currency }
          >
            { renderCurrencies.map((element, index) => (
              element !== 'USDT'
                ? <option key={ index }>{element}</option>
                : null
            ))}
          </select>
        </label>
        <label htmlFor="description-input">
          Método
          { ' ' }
          <select
            name="method"
            type="select"
            data-testid="method-input"
            onChange={ this.handleChange }
            value={ method }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="description-input">
          Categoria
          { ' ' }
          <select
            name="tag"
            type="select"
            data-testid="tag-input"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
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
