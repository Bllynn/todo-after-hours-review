import React, { Component } from 'react';
import axios from 'axios';
import ToDo from './component/Todo';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      input: '',
    };

    this.deleteTask = this.deleteTask.bind(this);
  }

  deleteTask(id) {
    axios.delete(`/api/tasks/${id}`).then(response => {
      this.setState({ tasks: response.data });
    });
  }

  generateTasksJSX(tasks) {
    return tasks.map(task => <ToDo key={task.id} delete={this.deleteTask} task={task} />);
  }

  handleChange(input) {
    this.setState({ input });
  }

  createTodo() {
    axios.post('/api/tasks', { actionItem: this.state.input }).then(response => {
      this.setState({
        tasks: response.data,
        input: '',
      });
    });
  }

  getTasks() {
    axios.get('/api/tasks').then(response => {
      console.log(response);
      this.setState({ tasks: response.data });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={() => this.getTasks()}>Get</button>
        <div>
          Todo:{' '}
          <input
            type="text"
            value={this.state.input}
            onChange={e => {
              this.handleChange(e.target.value);
            }}
          />
          <button
            onClick={() => {
              this.createTodo();
            }}
          >
            add
          </button>
        </div>
        {this.generateTasksJSX(this.state.tasks)}
      </div>
    );
  }
}

export default App;
