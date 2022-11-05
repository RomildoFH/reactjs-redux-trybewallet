import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExpense, updateExpense } from '../redux/actions/index';

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

  componentDidUpdate(prevProps) {
    const { editor } = this.props;
    if (editor && !prevProps.editor) {
      this.handleEdit();
    }
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

  handleEdit = () => {
    const { expenses, editor, idToEdit } = this.props;
    if (editor) {
      this.setState({
        id: idToEdit,
        value: expenses[idToEdit].value,
        description: expenses[idToEdit].description,
        currency: expenses[idToEdit].currency,
        method: expenses[idToEdit].method,
        tag: expenses[idToEdit].tag,
      });
    }
  };

  handleUpdateExpense = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;
    this.setState({
      id: expenses.length - 1,
    });
    const updatedExpense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(updateExpense(idToEdit, updatedExpense));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { currencies, editor } = this.props;
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
        {
          !editor
            ? (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
            : <button type="button" onClick={ this.handleUpdateExpense }>Editar despesa</button>
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
