import React, {
    useState, useEffect
} from 'react';
import todoService from "../../services/TodoService";
import { Link } from "react-router-dom";
const TodoList = () => {

    const [todo, setTodo] = useState([])

    const getData = () => {
        todoService.getAll()
            .then((res) => {
                setTodo(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const onDeleteHandle = (id) => {
        todoService.remove(id)
            .then((res) => {
                const newTodo = todo.filter(item => item.id !== id)
                setTodo(newTodo)
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <center><h1>Todo List</h1></center>
            <table style={{ width: '100%' }} className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((todo) => (
                        <tr key={todo.id}>
                            <td>{todo.id}</td>
                            <td>{todo.content}</td>
                            <td>{(todo.status == 1) ? 'Sudah Selesai' : 'Belum Selesai'}</td>
                            <td>
                                <Link to={'/todo/edit/' + todo.id}>
                                    <button className="btn btn-primary" >Update</button>
                                </Link>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => onDeleteHandle(todo.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList