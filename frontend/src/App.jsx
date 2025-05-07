import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const API_URL = 'http://localhost:3000/api/todos';

  const fetchTodos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    });
    setNewTodo('');
    fetchTodos();
  };

  const deleteTodo = async (index) => {
    await fetch(`${API_URL}/${index}`, { method: 'DELETE' });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.text}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}

export default App;
