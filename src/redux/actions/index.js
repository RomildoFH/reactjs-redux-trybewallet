// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';

export const REQUEST_CURRENCIES_STARTED = 'GET_CURRENCIES_STARTED';

export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const EXPENSE_ENTRY = 'EXPENSE_ENTRY';

export const REQUEST_EXCHANGE = 'REQUEST_EXCHANGE';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

const currenciesUrl = 'https://economia.awesomeapi.com.br/json/all';

export const actionEmail = (value) => ({
  type: GET_EMAIL,
  email: value,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES_STARTED,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch(currenciesUrl)
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(Object.keys(currencies)
        .filter((currencie) => (currencie !== 'USDT')))));
  };
}

export const requestExchagne = () => ({
  type: REQUEST_EXCHANGE,
});

export const expenseEntry = (expense, exchange) => ({
  type: EXPENSE_ENTRY,
  expenses: {
    id: expense.id,
    value: expense.value,
    description: expense.description,
    currency: expense.currency,
    method: expense.method,
    tag: expense.tag,
    exchangeRates: exchange,
  },
});

export function fetchExpense(expense) {
  return (dispatch) => {
    dispatch(requestExchagne());
    return fetch(currenciesUrl)
      .then((response) => response.json())
      .then((currencies) => dispatch(expenseEntry(expense, currencies)));
  };
}

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  editor: true,
  idToEdit: expenseId,
});
