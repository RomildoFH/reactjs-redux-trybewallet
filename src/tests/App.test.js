import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import mockFetch from './helpers/mockFetch';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

import {
  validEmail,
  validPassword,
  invalidEmail,
  invalidPassword,
  stdCurrency,
} from './helpers/constantes';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

const currencyTestId = 'currency-input';
const methodTestId = 'method-input';
const adicionarText = 'Adicionar despesa';

describe('Página de login', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('1- Verificar se ao carregar a apalicação inicia na rota home', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />);

    expect(pathname).toBe('/');
  });

  test('2- Verifica se ao inicializar aplicação a página contém os inputs de email e password', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    expect(inputEmail).toHaveAttribute('placeholder', 'exemple@exemple.com');
    expect(inputEmail).not.toBe(inputPassword);
    expect(inputPassword).toHaveAttribute('placeholder', '******');
  });

  test('3- Verifica se ao inicializar aplicação o botão entrar encontra-se desabilitado e é habilitado após correto preenchimento', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    expect(entrarBtn).toHaveAttribute('disabled');

    userEvent.type(inputEmail, invalidEmail);

    expect(inputEmail.value).toBe(invalidEmail);
    expect(entrarBtn).toHaveAttribute('disabled');

    userEvent.type(inputPassword, invalidPassword);

    expect(inputPassword.value).toBe(invalidPassword);
    expect(entrarBtn).toHaveAttribute('disabled');

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);

    userEvent.type(inputEmail, validEmail);

    expect(inputEmail.value).toBe(validEmail);
    expect(entrarBtn).toHaveAttribute('disabled');

    userEvent.type(inputPassword, invalidPassword);

    expect(inputPassword.value).toBe(invalidPassword);
    expect(entrarBtn).toHaveAttribute('disabled');

    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);

    expect(inputEmail.value).toBe('');
    expect(inputPassword.value).toBe('');

    userEvent.type(inputEmail, validEmail);

    expect(inputEmail.value).toBe(validEmail);

    userEvent.type(inputPassword, validPassword);

    expect(inputPassword.value).toBe(validPassword);
    expect(entrarBtn).not.toHaveAttribute('disabled');
  });

  test('4- Ao preencher os dados de login corretamente e clicar no botão Entrar, é redirecionado para a página da Carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);

    act(() => {
      userEvent.click(entrarBtn);
    });

    expect(history.location.pathname).toBe('/carteira');
    expect(global.fetch).toBeCalled();
  });
});

describe('Página de carteira', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const valueInput = 'value-input';
  const descriptionInput = 'description-input';
  const selectedCurrency = 'USD';
  const selectedMethod = 'Cartão de crédito';
  const exchangeValue = Number(mockData[selectedCurrency].ask).toFixed(2);
  const Value = '10';
  const stdTag = 'Lazer';
  const stdDescription = 'Cinema';

  test('1- Ao carregar a página da carteira, ela contem informações do usuário', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    userEvent.click(entrarBtn);

    const textEmail = screen.getByText(validEmail);
    const textExpenses = screen.getByTestId('total-field');
    const textCurrency = screen.getByTestId('header-currency-field');

    expect(textEmail).toBeInTheDocument();
    expect(textExpenses).toBeInTheDocument();
    expect(textCurrency).toBeInTheDocument();
  });

  test('2- Ao carregar a página de carteira, ela contém o total de despesas cadastradas em BRL', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    userEvent.click(entrarBtn);

    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent(stdCurrency);
  });

  test('3- Verifica se a página de wallet renderiza um formulário', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    userEvent.click(entrarBtn);

    const inputValue = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const inputCurrency = screen.getByTestId(currencyTestId);
    const inputMethod = screen.getByTestId(methodTestId);
    const inputTag = screen.getByTestId('tag-input');
    const adicionarBtn = screen.getByRole('button', { name: adicionarText });
    // const options = screen.getByRole('option', { name: 'USD' });

    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(adicionarBtn).toBeInTheDocument();
  });

  test('4- Verifica se a preencher o formulário, o valor total é atualizado', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText('Email');
    const inputPassword = screen.getByLabelText('Senha');
    const entrarBtn = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    userEvent.click(entrarBtn);

    const usdOption = await screen.findByText('USD');
    expect(usdOption).toBeInTheDocument();

    const inputValue = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const adicionarBtn = screen.getByRole('button', { name: adicionarText });

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'cinema');
    userEvent.click(adicionarBtn);

    const totalText = await screen.findAllByText('47.53');

    const inputValue2 = screen.getByTestId(valueInput);
    const inputDescription2 = screen.getByTestId(descriptionInput);

    expect(inputValue2.value).toBe('');
    expect(inputDescription2.value).toBe('');
    expect(totalText[0]).toBeInTheDocument();
  });
  test('5- Ao renderizar a carteira, ela contém uma tablea', () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const tabela = screen.getByRole('table');
    // const tableDescription = screen.getByRole('row')
    expect(tabela).toHaveTextContent('Descrição');
    expect(tabela).toHaveTextContent('Tag');
    expect(tabela).toHaveTextContent('Método de pagamento');
    expect(tabela).toHaveTextContent('Valor');
    expect(tabela).toHaveTextContent('Câmbio utilizado');
    expect(tabela).toHaveTextContent('Valor convertido');
    expect(tabela).toHaveTextContent('Moeda de conversão');
    expect(tabela).toHaveTextContent('Editar/Excluir');
  });

  test('6- Ao adicionar uma despesa, ela é renderizada na tabela', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });
    const usdOption = await screen.findByText(selectedCurrency);
    expect(usdOption).toBeInTheDocument();

    const inputValue = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const inputMoeda = screen.getByTestId(currencyTestId);
    const inputMetodo = screen.getByTestId(methodTestId);
    const inputTag = screen.getByTestId('tag-input');
    const adicionarBtn = screen.getByRole('button', { name: adicionarText });

    userEvent.type(inputValue, Value);
    userEvent.type(inputDescription, stdDescription);
    userEvent.selectOptions(inputMoeda, [selectedCurrency]);
    userEvent.selectOptions(inputMetodo, [selectedMethod]);
    userEvent.selectOptions(inputTag, [stdTag]);
    userEvent.click(adicionarBtn);

    const expensePrice = await screen.findAllByText('47.53');
    expect(expensePrice[0]).toBeInTheDocument();

    const row1 = screen.getAllByRole('row')[1];

    expect(row1).toHaveTextContent(Value);
    expect(row1).toHaveTextContent(stdDescription);
    expect(row1).toHaveTextContent(selectedCurrency);
    expect(row1).toHaveTextContent(selectedMethod);
    expect(row1).toHaveTextContent('Lazer');
    expect(row1).toHaveTextContent(exchangeValue);
    expect(row1).toHaveTextContent('Dólar Americano/Real Brasileiro');
  });

  test('7- Testa se o botão excluir funciona corretamente', async () => {
    renderWithRouterAndRedux(<App />, {
      initialEntries: ['/carteira'],
    });

    const usdOption = await screen.findByText(selectedCurrency);
    expect(usdOption).toBeInTheDocument();

    const inputValue = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const inputMoeda = screen.getByTestId(currencyTestId);
    const inputMetodo = screen.getByTestId(methodTestId);
    const inputTag = screen.getByTestId('tag-input');
    const adicionarBtn = screen.getByRole('button', { name: adicionarText });

    userEvent.type(inputValue, Value);
    userEvent.type(inputDescription, stdDescription);
    userEvent.selectOptions(inputMoeda, [selectedCurrency]);
    userEvent.selectOptions(inputMetodo, [selectedMethod]);
    userEvent.selectOptions(inputTag, [stdTag]);
    userEvent.click(adicionarBtn);

    const expensePrice = await screen.findAllByText('47.53');
    expect(expensePrice[0]).toBeInTheDocument();

    userEvent.type(inputValue, '5');
    userEvent.type(inputDescription, 'academia');
    userEvent.selectOptions(inputMoeda, ['CAD']);
    userEvent.selectOptions(inputMetodo, ['Dinheiro']);
    userEvent.selectOptions(inputTag, 'Saúde');
    userEvent.click(adicionarBtn);

    const expensePrice2 = await screen.findAllByText('18.78');
    expect(expensePrice2[0]).toBeInTheDocument();

    const deleteBtn = screen.getAllByRole('button', { name: 'Excluir' });

    userEvent.click(deleteBtn[0]);

    const tableRows = screen.getAllByRole('row');

    expect(tableRows[1]).not.toHaveTextContent(Value);
    expect(tableRows[1]).not.toHaveTextContent(stdDescription);
    expect(tableRows[1]).not.toHaveTextContent(selectedCurrency);
    expect(tableRows[1]).not.toHaveTextContent(selectedMethod);
    expect(tableRows[1]).not.toHaveTextContent(stdTag);
    expect(tableRows[1]).not.toHaveTextContent(exchangeValue);
    expect(tableRows[1]).not.toHaveTextContent('Dólar Americano/Real Brasileiro');

    expect(tableRows[1]).toHaveTextContent('5');
    expect(tableRows[1]).toHaveTextContent('academia');
    expect(tableRows[1]).toHaveTextContent('CAD');
    expect(tableRows[1]).toHaveTextContent('Dinheiro');
    expect(tableRows[1]).toHaveTextContent('Saúde');
    expect(tableRows[1]).toHaveTextContent('3.76');
    expect(tableRows[1]).toHaveTextContent('Dólar Canadense/Real Brasileiro');
  });

  test('8- Testa se o botão editar funciona corretamente', async () => {
    jest.resetAllMocks();
    const dataArray = Object.values(mockData);
    const currency = dataArray.map((coin) => coin.code);
    const editDescription = 'Viajem para praia';

    const newArray = [{
      id: 0,
      value: '10',
      description: 'cinema',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
      exchangeRates: mockData,
    },
    {
      id: 1,
      value: '20',
      description: 'hamburger',
      currency: 'CAD',
      method: 'Cartão de débito',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }];

    const state = {
      wallet: {
        currencies: currency,
        expenses: newArray,
        editor: false,
        idToEdit: 0,
      },
    };

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<Wallet />, { initialState: state });

    const buttonEditar = await screen.findAllByTestId('edit-btn');
    expect(buttonEditar[0]).toBeInTheDocument();
    userEvent.click(buttonEditar[0]);

    const editarDespesaBtn = screen.getByTestId('btn-editar-despesa');
    expect(editarDespesaBtn).toBeInTheDocument();

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue.value).toBe('10');
    userEvent.clear(inputValue);
    userEvent.type(inputValue, '5');
    expect(inputValue.value).toBe('5');

    const inputDescricao = screen.getByTestId('description-input');
    expect(inputDescricao.value).toBe('cinema');
    userEvent.clear(inputDescricao);
    userEvent.type(inputDescricao, editDescription);
    expect(inputDescricao.value).toBe(editDescription);

    userEvent.click(editarDespesaBtn);

    const textValue = screen.getByText('5.00');
    expect(textValue).toBeInTheDocument();

    const textDescription = screen.getByText(editDescription);
    expect(textDescription).toBeInTheDocument();

    const tableRows = screen.getAllByRole('row');

    expect(tableRows[1]).toHaveTextContent(editDescription);
    expect(tableRows[2]).toHaveTextContent('hamburger');

    jest.resetAllMocks();
  });
});
