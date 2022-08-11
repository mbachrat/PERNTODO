import React, {Fragment, useEffect, useState} from "react";

import EditTodo from "./EditTodo"

const ListTodos = () => {

    const[todos, setTodos] = useState([])

const deleteTodo = async (id) => {

    try {
        const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
            method: "DELETE"
        })

        setTodos(todos.filter(todo => todo.todo_id !==id));

    } catch (error) {
        console.log(error.message)
    }
}


   const getTodos = async () => {
    try {
        
        const response = await fetch("http://localhost:4000/todos")
        const jsonData = await response.json();


setTodos(jsonData);
    } catch (error) {
        console.log(error.message)
    }
   }

useEffect(() => {
    getTodos();
}, []);




    return (
        <Fragment>
            <table className="table mt-5 text-center">
            <thead>
                <tr>
                <th scope="col">Description</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><EditTodo todo={todo}/></td>
                    <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)} >Delete</button></td>
                    </tr>
                ))}
                {/* <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr> */}
                
            </tbody>
            </table>
        </Fragment>
    );
}

export default ListTodos;