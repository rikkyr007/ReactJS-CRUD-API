import React, {
    useState, useEffect
} from 'react';
import todoService from "../../services/TodoService";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';

const TodoList = () => {

    const [todo, setTodo] = useState([])
    const [alert, setAlert] = useState({ show: false })

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
                setAlert({ show: false })
            }).catch(e => {
                console.log(e)
            })
    }

    const onDeleteCancel = () => {
        setAlert({ show: false })
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
                                <button className="btn btn-danger" onClick={() => setAlert({ show: true })}>Delete</button>
                                <SweetAlert
                                    show={alert.show}
                                    warning
                                    showCancel
                                    confirmBtnText="Yes, delete it!"
                                    confirmBtnBsStyle="danger"
                                    cancelBtnBsStyle="default"
                                    title="Are you sure?"
                                    onConfirm={() => onDeleteHandle(todo.id)}
                                    onCancel={() => onDeleteCancel()}
                                >
                                    You will not be able to recover this imaginary file!
                                </SweetAlert>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList