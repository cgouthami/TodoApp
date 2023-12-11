// Todo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // Fetch todos from the API
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos', error));
  }, []);

  const handleAddTodo = () => {
    // Create a new todo and add it to the API
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: newTodo,
      completed: false
    })
      .then(response => setTodos([...todos, response.data]))
      .catch(error => console.error('Error adding todo', error));

    setNewTodo('');
  };

  const handleDeleteTodo = (id) => {
    // Delete a todo from the API
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .catch(error => console.error('Error deleting todo', error));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
};

export default Todo;
