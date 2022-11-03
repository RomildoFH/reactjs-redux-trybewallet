// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES,
  EXPENSE_ENTRY,
  DELETE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return ({
      ...state,
      currencies: action.currencies,
    });
  case EXPENSE_ENTRY:
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
    });
  case DELETE_EXPENSE:
    console.log(action.expenseId);
    return ({
      ...state,
      expenses: (
        state.expenses.length === 1 ? INITIAL_STATE.expenses
          : state.expenses.filter((element) => (element.id !== action.expenseId))
      ),
    });
  default:
    return state;
  }
};

export default wallet;
