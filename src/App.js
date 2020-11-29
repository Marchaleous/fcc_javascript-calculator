import { Component } from 'react';

class App extends Component {
  state = {
    history: '15', // Example
    input: '0', // Example
    operator: '*', // Example
    currentValue: '', // Example
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

  // Put all calculator functions here
  handleInput(input) {
    switch (input) {
      case 'Backspace':
        this.setState({
          input: this.state.input.slice(0, this.state.input.length - 1) || '0',
        });
        break;
      case 'Delete':
        this.setState({
          input: '0',
        });
        break;
      case 'Escape':
        this.setState({
          history: '',
          input: '0',
          operator: '',
          currentValue: '',
        });
        break;

      default:
        this.setState({
          input: this.state.input === '0' ? input : this.state.input + input,
        });
    }
  }

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
      width: 260,
      padding: '20px 10px',
    };

    return (
      <div className='App' style={appStyle}>
        <div className='container' style={containerStyle}>
          <Display props={this.state} />
          <Buttons buttons={this.calculatorButtons} />
        </div>
      </div>
    );
  }
}

const Display = ({ props: { history, input, operator, currentValue } }) => {
  const displayStyle = {
    border: '1px solid #333',
    background: '#fff',
    borderRadius: 5,
    width: 240,
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
    <div className='display-container' id='display' style={displayStyle}>
      <h5 id='history' style={historyStyle}>
        {history} {operator}
      </h5>
      <h1 id='input' style={inputStyle}>
        {input.slice(-15) || currentValue}
      </h1>
    </div>
  );
};

const Buttons = ({ buttons }) => {
  const buttonsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '5px',
    height: 200,
    width: 240,
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
