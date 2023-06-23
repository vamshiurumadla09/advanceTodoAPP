import { React, useState, useEffect } from 'react';
import "../styles/todolist.css";
import { connect } from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import bgImg2 from '../assets/bd3.jpg';

function Todolist(store) {
  const [newTodo, setNewTodo] = useState({ title: '', status: false, id:''});
  const [filteredTodos, setfiltfilteredTodos] = useState(store.todolist.todos);
  const [filterKey, setfilterKey] = useState('all');

  function getTodoValue(e) {
    setNewTodo({ ...newTodo, title:e.target.value, id:uuidv4()})
  }

  function todofilter (e){
    setfilterKey(e.target.value)
  }

  useEffect(() => {
    if(filterKey === 'all'){
      setfiltfilteredTodos(store.todolist.todos)
    }

    if(filterKey === 'completed'){
      var temp = store.todolist.todos.filter((todo)=>{
        return todo.status === true
      })
      setfiltfilteredTodos([...temp])
    }
    
    if(filterKey === 'notCompleted'){
      var temptodo = store.todolist.todos.filter((todo)=>{
        return todo.status === false
      })
      setfiltfilteredTodos([...temptodo])
    }

  }, [store.todolist, filterKey])

  return (
    <div className='todo-advance'>
      <div className='bg-img-div'>
       <img src={bgImg2} alt="loading" /> 
      </div>
      <div className='container todolist'>
      <h1> <span>{`plan your day`}</span> </h1>
      <h3>{`total tasks(${store.todolist.todos.length})`}</h3>
      <ul className='ul-tag'>
        <li className='input-todo'>
          <input type="text" placeholder='create your own task' onChange={getTodoValue} />
          <button className='add-todo' onClick={() => { store.dispatch({ type: 'ADDTODO', payload: newTodo }) }}>Add todo</button>
        </li>
        <li className='filter-todos'>
          <div>
            <input type="radio" name='filter' value='all' onClick={todofilter}/>
            <span>all</span>
          </div>
          <div>
            <input type="radio" name='filter' value='completed' onClick={todofilter}/>
            <span>completed</span>
          </div>
          <div>
            <input type="radio" name='filter' value='notCompleted' onClick={todofilter}/>
            <span>not completed</span>
          </div>
        </li>
        { filteredTodos.map((todo, index) => {
          return (
            <li className={`todo ${todo.status ? 'todo-completed' : 'todo-not-completed'}`} data-id={todo.id}>
              <span>{`${index + 1}. ${todo.title} - ${todo.status ? 'completed' : 'not completed'}`}</span>
              <div>
                { todo.status ?
                <button className='undoTodo todo-btn' onClick={() => { store.dispatch({ type:'TOGGLE_TODO_STATUS', payload:todo}) }}>undo</button> :
                <button className='done-todo todo-btn' onClick={() => { store.dispatch({ type:'TOGGLE_TODO_STATUS', payload:todo}) }}>Done</button>
                }
                <button className='delete-todo todo-btn' onClick={() => { store.dispatch({ type: 'DELETETODO', payload: todo }) }}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
    </div>
    
  )
}

export default connect((store) => { return store })(Todolist);