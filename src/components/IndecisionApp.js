import React from 'react';
import ReactDOM from 'react-dom';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  componentDidMount(){
    try {
      const jsonOptions = localStorage.getItem('options');
      const options = JSON.parse(jsonOptions);

      if (options ) this.setState(() => ({ options: options }));
    } catch(e){
      console.error(e);
    }
  }
  componentDidUpdate(_prevProps, prevState){
    if (prevState.options.length === this.state.options.length) return;

    const jsonOptions = JSON.stringify(this.state.options);
    localStorage.setItem('options', jsonOptions);
  }
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== optionToRemove)
    }));
    console.log(optionToRemove);
  };
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({
      selectedOption: option
    }));
  };
  handleAddOption = (option) => {
    if (!option){
      return 'Enter valid value to add...';
    }

    if(this.state.options.indexOf(option) > -1){
      return 'This option already exists';
    }

    this.setState((prevState) => (
      { options: prevState.options.concat([option]) })
    );
  };
  handleClearSelectedOption = () => { 
    this.setState(() => ({ selectedOption: undefined }));
  }
  render(){
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        /> 
        <Options
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
        <OptionModal 
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));