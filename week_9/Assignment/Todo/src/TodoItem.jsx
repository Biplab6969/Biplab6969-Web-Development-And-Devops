import React, { useState } from 'react'

function TodoItem({todo, onUpdate, onDelete, onToggleDone}) {
const [isEditing, setIsEditing] = useState(false);
const [newTitle, setNewTitle] = useState(todo.title);
const [newDescription, setNewDescription] = useState(todo.description);

const handleUpdate = () => {
  onUpdate(todo.id, {title: newTitle, description: newDescription});
  setIsEditing(false);
}
  return (
    <div style={{textDecoration: todo.done ? 'line-through' : 'none'}}>
      {isEditing ? (
        <>
        <input
        type='text'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder='Title'
        />

        <input
        type='text'
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder='Description' 
        />

        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
        <h4>{todo.title}</h4>
        <p>{todo.description}</p>

        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(todo.id)}>Delete</button>

        <button onClick={() => onToggleDone(todo.id)}>
          {todo.done ? 'Mark as Undone' : 'Mark as Done'}
        </button>
        </>
      )}
    </div>
  )
}

export default TodoItem
