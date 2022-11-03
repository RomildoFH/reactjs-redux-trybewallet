import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  makeTable = () => {
    const { expenses } = this.props;
    // return expenses.map((expense, index) => <p key={ index }>{ expense.currency }</p>);
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
            expenses.map((expense, index) => (
              <tr key={ index }>
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
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  };

  render() {
    // const { expenses } = this.props;
    return (
      <div>
        <Header />
        <WalletForm />
        {/* { expenses.length > 0 ? this.makeTable() : null } */}
        { this.makeTable() }
      </div>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
