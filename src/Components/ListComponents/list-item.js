import React from 'react';

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  renderTasks() {
    const { name, isComplete } = this.props;

    const taskStyle = {
      cursor: 'pointer',
      fontWeight: 'bold',
      color: isComplete ? 'green' : 'red',
	  display: 'inline-block',
	  minWidth: 200,
    }    
    // if is editing - show text input box
    if (this.state.editing) {
      return (
        <div key={name}>
          <form onSubmit={this.handleSave.bind(this)}>
            <input name={name} type="text" defaultValue={name} ref="editInput"/>
          </form>
        </div>
      )
    }

    // if not editing - just show text
    return (

      <div key={name} style={taskStyle} onClick={this.handleToggleComplete.bind(this)}>
        {name}
      </div>
      
    )
  }

  
  renderButtons() {
	const inline={
		display: 'inline-block',marginLeft: "20px",
	};
    // if editing - show these buttons (Cancel, Save)
    if (this.state.editing) {
      return (
        <div style={inline}>
          <button onClick={this.handleToggleEdit.bind(this)}>Cancel</button>
          <button onClick={this.handleSave.bind(this)}>Save</button>
        </div>
      )
    }

    // if not editing 
    return (
      <div style={inline}>
        <a onClick={this.handleToggleEdit.bind(this)}><i class="fas fa-edit"></i></a>
		<a onClick={this.handleDelete.bind(this)}><i class="far fa-trash-alt"></i></a>
      </div>
    )
  }

  // Overall output to screen
  render() {
    return (
      <div>
        {this.renderTasks()}
        {this.renderButtons()}
      </div> 
    )
  }

  //Change title colour on click
  handleToggleComplete() {
    const taskToToggle = this.props;
    this.props.toggleTask(taskToToggle);
  }

  // Will trigger deleteTask() in app.js
  handleDelete() {
    const taskToDelete = this.props.name;
    this.props.deleteTask(taskToDelete);
  }

  // Will trigger saveTask() in app.js
  handleSave(event) {
    event.preventDefault();

    const oldTask = this.props.name;
    const newTask = this.refs.editInput.value;    
    this.props.saveTask(oldTask, newTask);

    // Set editing mode back to false
    this.setState({editing: false});
  }

  // Triggers edit locally
  handleToggleEdit() {
    this.setState(prevState => ({ editing: !prevState.editing}));
  }
}

export default ListItem;