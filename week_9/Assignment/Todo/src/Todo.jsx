
import React, { useState } from 'react'
import TodoItem from './TodoItem';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const handleAddTodo = () => {
    if (todoTitle.trim() && todoDescription.trim()){
      setTodos([
        ...todos, 
        {
          id: Date.now(),
          title: todoTitle.trim(),
          description: todoDescription.trim(),
          done: false,
        },
      ]);
      setTodoTitle("");
      setTodoDescription("");
    } else {
      alert("Title and description are required");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleDone = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, done: !todo.done } : todo)));
  }
  const handleUpdateTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div>
      <h1>Todo App</h1>
      <input
      type="text"
      value={todoTitle}
      onChange={(e) => setTodoTitle(e.target.value)}
      placeholder='Description' 
      />
      <input
      type="text"
      value={todoDescription}
      onChange={(e) => setTodoDescription(e.target.value)}
      placeholder='Description' 
      />

      <button onClick={handleAddTodo}>Add Todo</button>
      <div>
        {todos.length === 0 ? (
          <p>No Todo</p>
        ) : (
          todos.map((todo) => (
            <TodoItem 
            key={todo.id}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            onToggleDone={handleToggleDone}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Todo
