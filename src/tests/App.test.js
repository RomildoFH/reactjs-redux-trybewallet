import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import mockFetch from './helpers/mockFetch';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const validEmail = 'romildo@trybe.com';
const validPassword = '123456';
const invalidEmail = 'romildo@trybe';
const invalidPassword = '123';

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
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

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
});
