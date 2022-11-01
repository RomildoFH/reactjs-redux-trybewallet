// Coloque aqui suas actions
export const GET_EMAIL = 'GET_EMAIL';

export const REQUEST_CURRENCIES_STARTED = 'GET_CURRENCIES_STARTED';

export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

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

// const fetchMoedas = async () => {
//   const response = await fetch(currenciesUrl);
//   const data = await response.json();
//   console.log(data);
//   const keys = Object.keys(data);
//   console.log(keys);
//   return (keys);
// };

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return fetch(currenciesUrl)
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(Object.keys(currencies)
        .filter((currencie) => (currencie !== 'USDT')))));
  };
}

// export function fetchCurrencies() {
//   return (dispatch) => {
//     dispatch(requestCurrencies());
//     return dispatch(receiveCurrencies(fetchMoedas()));
//   };
// }
