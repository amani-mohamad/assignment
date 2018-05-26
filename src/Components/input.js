import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
    }
  }
  
  render() {
	const inputStyle = {
	  minWidth: 200,
    }
	const formStyle={
		marginBottom: "50px",
	}
    return (
      <form style={formStyle}  ref={(input) => { this.taskInput = input }} onSubmit={this.handleCreate.bind(this)}>
        <TextField style={inputStyle} placeholder=""/>
        <Button type="submit"> Add task</Button>
        {this.renderError()}
      </form>
    )
  }

  capitaliseWord() {
    console.log('Capitalising...');

  }

  validateInput(taskName) {
    if (!taskName) {
      return '*No task entered';
    } else if (this.props.taskList.find(todo => todo.name.toLowerCase() === taskName.toLowerCase())) {
      return '*Task already exists'
    } else {
      return null;
    }
  }

  handleCreate(event) {
    event.preventDefault();

    const newTask = this.taskInput[0].value;
    const validateInput = this.validateInput(newTask);

    if (validateInput) {
      this.setState({ error: validateInput })
      return;
    }

    this.setState({ error: null });

    if (newTask) {
      this.props.createTask(newTask);
      this.taskInput.reset();
    }
  }

  renderError() {
    if (!this.state.error) { return null }
    return <div style={{color: 'red'}}>{this.state.error}</div>
  }
  

 

}

export default Input;