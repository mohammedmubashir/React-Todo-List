import React, { useEffect, useState } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo'
import db from './firebase'
import firebase from 'firebase';


function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  //When the app loads we need to listen to the database and fetch new todos as they get added/removed

  useEffect(() => {
    //this loads when the app loads
    db.collection('todos').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, [])

  const addTodo = (event) => {
    // this will fire of when we click the button 
    event.preventDefault()
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    setInput('')
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Let's Get Work Done</h1>
        <form>
          <FormControl>
            <InputLabel>Enter a Task</InputLabel>
            <Input value={input} onChange={e => setInput(e.target.value)} />
          </FormControl>
          <Button className="addBtn" disabled={!input} type="submit" onClick={addTodo} variant="contained" color="secondary">
            Add todo
          </Button>
        </form>
      </div>

      <ul>
        {todos.map(todo => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
