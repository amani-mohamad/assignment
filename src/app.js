import React from 'react';
import List from './Components/list';
import Input from './Components/input';

const tasks = [
  { name: 'task1', isComplete: false },
  { name: 'task2', isComplete: true },
  { name: 'task3', isComplete: false },
]

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks,
    }
  }

  render() {
    return (
      <div>
        <Input
          createTask={this.createTask.bind(this)}
          taskList={this.state.tasks}
        />
        <List
          editMode={this.state.isEditing}
          taskList={this.state.tasks}
          deleteTask={this.deleteTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          toggleTask={this.toggleTask.bind(this)}
        />
      </div>
    )
  }

  createTask(task, errorMsg) {
    this.setState((prevState) => {
      prevState.tasks.push({ name: task, isComplete: false });
      return {
        tasks: prevState.tasks
      }
    })
  }

  deleteTask(taskToDelete) {
    this.setState(prevState => {
      const tasks = prevState.tasks.filter(task => task.name !== taskToDelete);
      return { tasks };
    });
  }

  saveTask(oldTask, newTask) {
    console.log('saving task: ' + oldTask + " => " + newTask);
    
    const foundTask = tasks.find(task => task.name === oldTask)

    foundTask.name = newTask;
    this.setState({ tasks: this.state.tasks });
  }

  toggleTask(taskToToggle) {
    this.setState(({ tasks }) => ({
      tasks: tasks.map(task =>
        task.name === taskToToggle.name ? { ...task, isComplete: !task.isComplete } : task)
    }))
  }

  
}

export default App;