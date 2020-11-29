import { Component } from 'react';

class App extends Component {
  state = {
    history: '',
    input: '',
    operator: '',
    currentValue: 0,
  };

  calculatorButtons = [
    {
      id: 'backspace',
      key: 'Backspace',
      buttonText: '«',
    },
    {
      id: 'clear-entry',
      key: 'Delete',
      buttonText: 'CE',
    },
    {
      id: 'clear',
      key: 'Escape',
      buttonText: 'C',
    },
    {
      id: 'divide',
      key: '/',
      buttonText: '/',
    },
    {
      id: 'seven',
      key: '7',
      buttonText: '7',
    },
    {
      id: 'eight',
      key: '8',
      buttonText: '8',
    },
    {
      id: 'nine',
      key: '9',
      buttonText: '9',
    },
    {
      id: 'multiply',
      key: '*',
      buttonText: 'x',
    },
    {
      id: 'four',
      key: '4',
      buttonText: '4',
    },
    {
      id: 'five',
      key: '5',
      buttonText: '5',
    },
    {
      id: 'six',
      key: '6',
      buttonText: '6',
    },
    {
      id: 'subtract',
      key: '-',
      buttonText: '-',
    },
    {
      id: 'one',
      key: '1',
      buttonText: '1',
    },
    {
      id: 'two',
      key: '2',
      buttonText: '2',
    },
    {
      id: 'three',
      key: '3',
      buttonText: '3',
    },
    {
      id: 'add',
      key: '+',
      buttonText: '+',
    },
    {
      id: 'zero',
      key: '0',
      buttonText: '0',
      wide: true,
    },
    {
      id: 'decimal',
      key: '.',
      buttonText: '.',
    },
    {
      id: 'equals',
      key: '=',
      altKey: 'Enter',
      buttonText: '=',
    },
  ];

  handleClick = e => {
    e.target.blur();
    for (let i = 0; i < this.calculatorButtons.length; i++) {
      if (this.calculatorButtons[i].key === e.target.value) {
        this.handleInput(e.target.value);
      }
    }
  };

  handleKeyDown = e => {
    for (let i = 0; i < this.calculatorButtons.length; i++) {
      if (
        this.calculatorButtons[i].key === e.key ||
        this.calculatorButtons[i].altKey === e.key
      ) {
        this.handleInput(this.calculatorButtons[i].key);
      }
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClick);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  handleInput = buttonInput => {
    switch (buttonInput) {
      case 'Backspace':
        this.setState({
          input: this.state.input.slice(0, this.state.input.length - 1) || '',
        });
        if (this.state.input === '-') {
          this.setState({ input: '' });
        }
        document.getElementById('display').innerText = this.state.input || '0';
        break;
      case 'Delete':
        this.setState({
          input: '0',
        });
        document.getElementById('display').innerText = this.state.input;
        break;
      case 'Escape':
        this.setState({
          history: '',
          input: '',
          operator: '',
          currentValue: 0,
        });
        document.getElementById('display').innerText = 0;
        break;
      case '+':
      case '*':
      case '/':
        this.calculate(buttonInput);
        break;
      case '-':
        // Appends a negative sign
        if (this.state.input === '' || this.state.input === '-0') {
          console.log('first');
          this.setState({
            input:
              this.state.input[0] === '-0'
                ? this.state.input.slice(1)
                : this.state.input === '0' || this.state.input === ''
                ? '-0'
                : '-' + this.state.input,
          });
          document.getElementById('display').innerText = this.state.input;
          // Adds minus operator
        } else {
          console.log('second');
          this.calculate(buttonInput);
        }
        break;
      case '.':
        if (!this.state.input.includes('.')) {
          this.setState({
            input: this.state.input + buttonInput,
          });
        }
        document.getElementById('display').innerText = this.state.input;
        break;
      case '=':
        this.calculate();
        break;
      default:
        this.setState({
          input:
            this.state.input === '' || this.state.input === '0'
              ? buttonInput
              : this.state.input === '-0' || this.state.input === '-'
              ? '-' + buttonInput
              : this.state.input + buttonInput,
        });
        document.getElementById('display').innerText = this.state.input;
    }
  };

  calculate = buttonInput => {
    const { currentValue, operator, input, history } = this.state;
    let newCurrentValue = currentValue;

    if (buttonInput && operator && (!input || input === '0')) {
      this.setState({
        operator: buttonInput,
        history:
          this.state.history.slice(0, this.state.history.length - 1) +
          buttonInput,
      });
      return;
    }

    switch (operator) {
      case '+':
        console.log('plus');
        newCurrentValue += +input;
        break;
      case '-':
        newCurrentValue -= +input;
        break;
      case '*':
        newCurrentValue *= +input;
        break;
      case '/':
        console.log('division');
        newCurrentValue /= +input;
        break;
      default:
        this.setState({
          operator: buttonInput ? buttonInput : this.state.operator,
        });
        newCurrentValue = +input;
    }

    if (buttonInput) {
      this.setState({
        currentValue: newCurrentValue,
        history: history + (input || '0') + (buttonInput || ''),
        input: '',
        operator: buttonInput,
      });
      document.getElementById('display').innerText = this.state.currentValue;
    } else {
      this.setState({
        currentValue: 0,
        history: '',
        input: newCurrentValue + '',
        operator: '',
      });
      document.getElementById('display').innerText = this.state.input;
    }
  };

  render() {
    const appStyle = {
      fontFamily: 'monospace',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '80vh',
    };
    const containerStyle = {
      background: '#333',
      border: 0,
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: 275,
      padding: '20px 10px',
    };

    return (
      <div style={appStyle}>
        <div style={containerStyle}>
          <Display props={this.state} />
          <Buttons buttons={this.calculatorButtons} />
        </div>
      </div>
    );
  }
}

const Display = ({ props: { history } }) => {
  const displayStyle = {
    border: '1px solid #333',
    background: '#fff',
    borderRadius: 5,
    width: 260,
    height: 60,
    textAlign: 'right',
    marginBottom: 10,
    position: 'relative',
  };
  const historyStyle = {
    position: 'absolute',
    top: -10,
    right: 10,
  };

  const inputStyle = {
    position: 'absolute',
    bottom: -15,
    right: 10,
  };

  return (
    <div style={displayStyle}>
      <h4 style={historyStyle}>{history}</h4>
      <h2 id='display' style={inputStyle}>
        0
      </h2>
    </div>
  );
};

const Buttons = ({ buttons }) => {
  const buttonsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '5px',
    height: 200,
    width: 260,
  };
  return (
    <div style={buttonsStyle}>
      {buttons.map(button => {
        const { id, key, buttonText, wide } = button;
        const buttonStyle = {
          border: 0,
          borderRadius: 3,
          gridColumn: wide ? '1 / span 2' : '1fr',
          width: '100%',
          height: '100%',
          fontSize: 18,
          fontWeight: 'bold',
        };
        return (
          <button id={id} key={id} style={buttonStyle} value={key}>
            {buttonText}
          </button>
        );
      })}
    </div>
  );
};

export default App;
