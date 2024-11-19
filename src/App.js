import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', description: '', date: '', time: '' });
  const [editingIndex, setEditingIndex] = useState(-1);

  const addTask = () => {
    if (newTask.name) {
      if (editingIndex === -1) {
        setTasks([...tasks, { ...newTask, completed: false }]);
      } else {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = { ...newTask, completed: false };
        setTasks(updatedTasks);
        setEditingIndex(-1);
      }
      setNewTask({ name: '', description: '', date: '', time: '' });
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditingIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Todo List</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          placeholder="Task name"
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <input
          type="text"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          placeholder="Task description"
          style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }}
        />
        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          style={{ width: '48%', padding: '8px', marginRight: '4%', boxSizing: 'border-box' }}
        />
        <input
          type="time"
          value={newTask.time}
          onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
          style={{ width: '48%', padding: '8px', boxSizing: 'border-box' }}
        />
        <button
          onClick={addTask}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {editingIndex === -1 ? 'Add Task' : 'Update Task'}
        </button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{
            backgroundColor: '#f9f9f9',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{task.name}</h3>
              <p style={{ margin: '0 0 5px 0' }}>{task.description}</p>
              <p style={{ margin: '0', fontSize: '0.8em', color: '#666' }}>
                {task.date} {task.time}
              </p>
            </div>
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={() => toggleComplete(index)}
                style={{
                  marginRight: '5px',
                  padding: '5px 10px',
                  backgroundColor: task.completed ? '#ccc' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => editTask(index)}
                style={{
                  marginRight: '5px',
                  padding: '5px 10px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;