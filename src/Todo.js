import React from 'react';

class Todo extends React.Component{
  state = {
    newTodo: '',
    todos: [],
    loading: false,
    count:0,
  };
  todoId = 1;

  inputChange = event => {
    this.setState({
      newTodo: event.target.value
    });
  };
  SubmitButtonClick = () => {
    const newCount=++this.state.count;
    const newTodo = {
      text: this.state.newTodo,
      isDone: false,
      id: this.todoId++,
      count: newCount
    };

    this.setState({
      todos: [
        ...this.state.todos,
        newTodo
      ],
      newTodo: ''
    });
  };

  todoClick = todoId => {
    const foundTodo = this.state.todos.find(
      todo => todo.id === todoId
    );

    const nextTodo = {
      ...foundTodo,
      isDone: !foundTodo.isDone
    };

    const nextTodos = this.state.todos.filter(
      todo => todo.id !== todoId
    );

    this.setState({
      todos: [
        ...nextTodos,
        nextTodo
      ]
    });
  };
  todoDelete = todoId => {
    const nextTodos = this.state.todos.filter(
      todo => todo.id !== todoId
    );
      const newCount=--this.state.count;
    this.setState({
      todos: nextTodos,
      count: newCount
    });
  };
  render(){
    return(
      <div>
        <div>Count todos:{this.state.count}</div>
        <input  placeholder="New todo..." aria-label="Recipient's username" 
            onChange={this.inputChange} 
            value={this.state.newTodo}
          />
          <button class="btn btn-outline-secondary" 
            onClick={this.SubmitButtonClick}
          >
            Add todo
          </button>
          <div>
            {
              this.state.todos
                .map(
                  todo => (
                    <div 
                      key={todo.id}
                    >
                        <span className={
                        todo.isDone 
                        ? 'Todo-completed'
                        : ''
                      }>
                      <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={() => this.todoClick(todo.id)}/>
                      <span >
                        {todo.text}
                      </span>
                      </span>
                      <button type="button" class="btn btn-outline-dark"
                        onClick={
                          () => this.todoDelete(todo.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  )
                )
            }
          </div>
      </div>
    )
  }
}
export default Todo;