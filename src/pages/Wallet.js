import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { deleteExpense, editExpense } from '../redux/actions/index';

class Wallet extends React.Component {
  deleteHandleClick = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(expenseId));
  };

  editHandleClick = (expenseId) => {
    const { dispatch } = this.props;
    dispatch(editExpense(expenseId));
  };

  makeTable = () => {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>
              Descrição
            </th>
            <th>
              Tag
            </th>
            <th>
              Método de pagamento
            </th>
            <th>
              Valor
            </th>
            <th>
              Moeda
            </th>
            <th>
              Câmbio utilizado
            </th>
            <th>
              Valor convertido
            </th>
            <th>
              Moeda de conversão
            </th>
            <th>
              Editar/Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.length > 0 && expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ Number(expense.value).toFixed(2) }</td>
                <td>{ expense.currency }</td>
                <td>{ expense.exchangeRates[expense.currency].name }</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency]
                      .ask * expense.value)
                      .toFixed(2)
                  }

                </td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency]
                      .ask)
                      .toFixed(2)
                  }
                </td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.editHandleClick(expense.id) }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => this.deleteHandleClick(expense.id) }
                    data-testid="delete-btn"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  };

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        { this.makeTable() }
      </div>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
