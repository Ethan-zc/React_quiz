import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './models/TodoList';

class PendingTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: this.props.todoList
    }
  }

  render() {
    return (
      <div>
        <h3>Pending tasks</h3>
          {
            this.state.todoList.todoItems.map((item,index) => !item.done ? (
            <div key={index}>
              <input type="checkbox" defaultChecked={item.done} onChange={() => {
                item.finishTask();
              }}/>
              <span>{item.content}</span>
              <span style={{ fontSize: '12px', color: 'grey', padding: '0 10px' }}>{ "Created at: " + item.createdAt}</span>
              <button type="button" onClick={() => {
                item.removeTask();
              }}>X</button>
            </div>) : null)
          }
          <p>
            <input type="text" value={this.state.inputText} onChange={(event) => {
              this.setState({ inputText: event.target.value });
            }} 
            onKeyDown={(event)=>{
              if (event.keyCode  === 13) {
                this.state.todoList.addTask(this.state.inputText);
              }
            }}/>
            <button type="button" onClick={() => {
              this.state.todoList.addTask(this.state.inputText);
              }}>ADD</button>
          </p>
          <p>
            <button onClick={this.props.switch}>VIEW COMPLETED</button>
          </p>
      </div>
      )
  }
}

class CompletedList extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      todoList: this.props.todoList
    }
  }

  render() {
    return (
      <div>
        <h3>Completed tasks</h3>
        {
          this.state.todoList.todoItems.map((item,index) => item.done ? (
            <div key={index}>
              <span>{item.content}</span>
              <span style={{ fontSize: '12px', color: 'grey', padding: '0 10px' }}>{ "Created at: " + item.createdAt}</span>
              <button type="button" onClick={() => {
                item.removeTask();
              }}>X</button>
            </div>
          ) : null)
        }
        <p>
          <button onClick={this.props.switch}>RETURN</button>
        </p>
      </div>
    )
  }


}

class App extends React.Component {
  constructor(props) {
    super(props);
    const todoList = new TodoList('todo-list', this);
    this.state = {
      todoList: todoList,
      inputText: "",
      showFinished: false
    };
  }

  switchList=()=>{
    this.setState({ showFinished: !this.state.showFinished })
  }

  render() {
    return (
      <div>
        <h1>TODO LIST</h1>
        {
          !this.state.showFinished ? (
            <PendingTask todoList={this.state.todoList} switch={this.switchList}/>
          ) : (
            <CompletedList todoList={this.state.todoList} switch={this.switchList}/>
          )
        }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

