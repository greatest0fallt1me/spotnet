import React, { useState } from 'react';
import { ReactComponent as HealthIcon } from 'assets/icons/health.svg';
import { ReactComponent as EthIcon } from 'assets/icons/ethereum.svg';
import { useAddDeposit } from 'hooks/useAddDeposit';
import './addDeposit.css';
import Card from 'components/ui/card/Card';
import TokenSelector from 'components/ui/token-selector/TokenSelector';
import { NUMBER_REGEX } from 'utils/regex';
import { Button } from 'components/ui/custom-button/Button';
import Sidebar from 'components/layout/sidebar/Sidebar';
import clockIcon from 'assets/icons/clock.svg';
import computerIcon from 'assets/icons/computer-icon.svg';
import depositIcon from 'assets/icons/deposit.svg';
import withdrawIcon from 'assets/icons/withdraw.svg';

export const AddDeposit = () => {
  const [amount, setAmount] = useState('0');
  const [selectedToken, setSelectedToken] = useState('STRK');

  const { mutate: addDeposit, isLoading } = useAddDeposit();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (NUMBER_REGEX.test(value)) {
      setAmount(value);
    }
  };

  const handleDeposit = () => {
    addDeposit(
      {
        amount,
        tokenSymbol: selectedToken,
      },
      {
        onSuccess: () => {
          setAmount('0');
          setSelectedToken('STRK');
        },
      }
    );
  };

  const dashboardItems = [
    { id: 'dashboard', name: 'Dashboard', link: '/dashboard', icon: computerIcon },
    { id: 'position_history', name: 'Position History', link: '/dashboard/position-history', icon: clockIcon },
    { id: 'deposit', name: 'Add Deposit', link: '/dashboard/deposit', icon: depositIcon },
    { id: 'withdraw', name: 'Withdraw All', link: '/dashboard/withdraw', icon: withdrawIcon },
  ];

  return (
    <div className="deposit">
      <Sidebar items={dashboardItems} />
      <div className="deposit-wrapper">
        <div className="deposit-container">
          <h1 className="deposit-title">zkLend Deposit</h1>
          <div className="main-container-deposit">
            <div className="top-cards-deposit">
              <Card label="Health Factor" value="1.47570678" icon={<HealthIcon className="icon" />} />
              <Card label="Borrow Balance" value="$-55.832665" icon={<EthIcon className="icon" />} />
            </div>
          </div>
          <h1 className="deposit-title2">Please make a deposit</h1>
          <TokenSelector selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
          <div className="amount-input-deposit" aria-labelledby="amount-input-label">
            <input
              type="text"
              id="amount-field"
              value={amount}
              onChange={handleAmountChange}
              pattern="^\d*\.?\d*$"
              className="amount-field-deposit"
              aria-describedby="currency-symbol"
              placeholder="0.00"
              disabled={isLoading}
            />
            <span id="currency-symbol" className="currency-deposit">
              {selectedToken}
            </span>
          </div>

          <Button size="lg" variant="primary" onClick={handleDeposit} disabled={isLoading || amount === '0'}>
            {isLoading ? 'Processing...' : 'Deposit'}
          </Button>
        </div>
      </div>
    </div>
  );
};
