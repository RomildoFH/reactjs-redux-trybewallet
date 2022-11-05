// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  RECEIVE_CURRENCIES,
  EXPENSE_ENTRY,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  UPDATE_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const expenseEdit = (updatedExpense, expenses) => expenses.map((expense) => {
  if (updatedExpense.id === expense.id) {
    return {
      ...expense,
      value: updatedExpense.value,
      description: updatedExpense.description,
      currency: updatedExpense.currency,
      method: updatedExpense.method,
      tag: updatedExpense.tag,
    };
  }
  return expense;
});

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
    return ({
      ...state,
      expenses: (
        state.expenses.length === 1 ? INITIAL_STATE.expenses
          : state.expenses.filter((element) => (element.id !== action.expenseId))
      ),
    });
  case EDIT_EXPENSE:
    return ({
      ...state,
      editor: true,
      idToEdit: action.idToEdit,
    });
  case UPDATE_EXPENSE:
    return ({
      ...state,
      editor: action.editor,
      idToEdit: action.idToEdit,
      expenses: expenseEdit(action.expenses, state.expenses),
    });
  default:
    return state;
  }
};

export default wallet;
