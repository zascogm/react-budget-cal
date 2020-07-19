import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import {v4 as uuidv4} from 'uuid';

const initialExpenses = [
  { id:uuidv4(), charge:"rent", amount:1600 },
  { id:uuidv4(), charge:"car payment", amount:400 },
  { id:uuidv4(), charge:"credit card bill", amount:1200 },
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show:false});

  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleAlert = ({type, text}) => {
    setAlert({show: true, type, text});
    setTimeout(() => {
      setAlert({show: false});
    }, 3000);
  };

  
  const handleSubmit = e => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      const singleExpense = {id: uuidv4(), charge, amount};
      setExpenses([...expenses, singleExpense]);
      handleAlert({type: 'success', text: 'item added'});
      setCharge('');
      setAmount('');
    } else {
      handleAlert({type: 'danger', text: `charge can't be empty value and amount has to be bigger than zero`});
    }
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert/>
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge} 
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handlesubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        total spending: {" "}
        <span className="total">
          $ {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
