import { act } from 'react-dom/test-utils';
import {v4 as uuidv4} from 'uuid';
const initialState = {
    todos: [
        {
            title: 'Lets start',
            status: false,
            id:uuidv4()
         }
    ]
}

function todoReducer(state = initialState, action) {
    if (action.type === "ADDTODO") {
        
        return ({
            ...state,
            todos: [...state.todos, {...action.payload}]
        })
    }

    if (action.type === "DELETETODO") {
        var temp = [...state.todos];
        temp = temp.filter((task)=>{
            if(task.id === action.payload.id){
                return false
            }else{
                return true
            }
        })
        alert('Deleting task')
        return ({
            ...state,
            todos: [...temp]
        })
    }
    
    if (action.type === 'TOGGLE_TODO_STATUS'){
        var tempTodos = [...state.todos];
        console.log(tempTodos);
        tempTodos = tempTodos.map((todo)=>{
            if(todo.id === action.payload.id){
                todo.status ? alert('tast pending') : alert('task completed');
                todo.status = !todo.status;
                return todo
            }
            return todo
        })
        return ({...state, todos:[...tempTodos]})
    }

    return ({
        ...state
    })
}

export default todoReducer