import {v4 as uuidv4} from 'uuid';
const initialState = localStorage.getItem('storeage')?JSON.parse(localStorage.getItem('storeage')):{
    todos:[
        {
            title: 'Lets start',
            status: false,
            id:uuidv4()
         }
    ]
}

initialState.todos.map((obj)=>{
    return localStorage.setItem('storeage', JSON.stringify(obj))
})
function todoReducer(state = initialState, action) {
    if (action.type === "ADDTODO") {
        var todo={
            ...state,
            todos: [...state.todos, {...action.payload}]
        }
        localStorage.setItem('storeage', JSON.stringify(todo))
        return (todo)
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
        alert('Deleting task');
        var deleteTodo ={
            ...state,
            todos: [...temp]
        }
        localStorage.setItem('storeage', JSON.stringify(deleteTodo))
        return (deleteTodo)
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
        
        var toggleTodo ={...state, todos:[...tempTodos]}
        localStorage.setItem('storeage', JSON.stringify(toggleTodo))
        return (toggleTodo)
    }

    return ({
        ...state
    })
}

export default todoReducer