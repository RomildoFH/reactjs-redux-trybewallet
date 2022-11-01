import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currenciesComponent: [],
  //   };
  // }

  // componentDidMount() {
  //   const {  }
  // }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
