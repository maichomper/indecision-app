class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.state = {
      options: props.options
    }
  }
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
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(optionToRemove){
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => option !== optionToRemove)
    }));
    console.log(optionToRemove);
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  handleAddOption(option){
    if (!option){
      return 'Enter valid value to add...';
    }

    if(this.state.options.indexOf(option) > -1){
      return 'This option already exists';
    }

    this.setState((prevState) => (
      { options: prevState.options.concat([option]) })
    );
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
      </div>
    );
  }
}

IndecisionApp.defaultProps = {
  options: []
}
const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision',
  subtitle: 'Put your life in the hands of a computer'
}

const Action = (props) => {
  return (
    <div>
      <button 
        onClick={props.handlePick}
        disabled={!props.hasOptions}
      >
        What should I do?
      </button>
    </div>
  );
}

const Options = (props) => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      { props.options.length === 0 && <p>There are not options bruh!</p>}
      { 
        props.options.map((opt) => (
          <Option 
            key={opt} 
            option={opt}
            handleDeleteOption={props.handleDeleteOption}
          /> 
        ))
      }
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.option}
      <button 
        onClick={(e) => {
          props.handleDeleteOption(props.option)
        }}>remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    }
  }
  handleAddOption(e){
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error } ));
    if (!error) e.target.elements.option.value = '';
  }

  render(){
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option"/>
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));