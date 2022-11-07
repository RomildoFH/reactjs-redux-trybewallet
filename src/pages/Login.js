import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionEmail } from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;

    dispatch(actionEmail(email));

    history.push('carteira');
  };

  handleChange({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.inputsValidation());
  }

  inputsValidation = () => {
    const { email, password } = this.state;

    let emailValidation = false;

    // the email validation was found at:
    // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex)) {
      emailValidation = true;
    } else {
      emailValidation = false;
    }

    const minLength = 6;
    const passwordValidation = password.length >= minLength;

    const validation = (emailValidation && passwordValidation);

    this.setState({
      disabled: !validation,
    });

    return validation;
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-email">
            Email
            <input
              name="email"
              id="input-email"
              type="email"
              data-testid="email-input"
              placeholder="exemple@exemple.com"
              onChange={ (event) => this.handleChange(event) }
              value={ email }
              required
            />
          </label>
          <label htmlFor="input-password">
            Senha
            <input
              name="password"
              id="input-password"
              type="password"
              data-testid="password-input"
              placeholder="******"
              minLength={ 6 }
              onChange={ (event) => this.handleChange(event) }
              value={ password }
              required
            />
          </label>
          <button
            id="login-btn"
            type="button"
            onClick={ this.handleClick }
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

export default connect(mapStateToProps)(Login);
