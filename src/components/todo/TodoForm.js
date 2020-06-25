import React, {
    useState, useEffect
} from "react";
import swal from "sweetalert"
import todoService from "../../services/TodoService";

const TodoForm = (props) => {
    const TodoState = {
        id: null,
        content: "",
        status: "0"
    }
    const [todo, setTodo] = useState(TodoState);
    const [alert, setAlert] = useState({ show: false })

    //ambil id
    const id = props.match.params.id;

    const handleInputChange = event => {
        const {
            name,
            value
        } = event.target;
        setTodo({
            ...todo,
            [name]: value
        });
    }

    const saveTodo = () => {
        var data = {
            content: todo.content,
            status: todo.status
        }

        todoService.create(data)
            .then(response => {
                setTodo({
                    id: response.data.id,
                    content: response.data.content,
                    status: response.data.status
                })
                swal("Success!", "data has been saved successfully!", "success")
                    .then((res) => {
                        props.history.push('/todo/list');
                    });
            })
            .catch(e => {
                console.log(e)
            });
    };

    const editTodo = () => {
        todoService.get(id)
            .then(response => {
                setTodo(response.data[0]);
            })
            .catch(e => {
                console.log(e)
            });
    }

    const updateTodo = () => {
        todoService.update(todo.id, todo)
            .then(response => {
                swal("Success!", "data has been saved successfully!", "success")
                    .then((res) => {
                        props.history.push('/todo/list');
                    });
            })
            .catch(e => {
                console.log(e)
            })
    }

    const hideAlert = () => {
        setAlert({ show: false })
    }


    useEffect(() => {
        //kalo ada idnya tarik datanya
        if (id != null) {
            editTodo()
        }
    }, [])

    //CARA DEBUG ASYNCHRONOUS
    // useEffect(() => {
    //     console.log(todo)
    // }, [todo])


    return (
        <div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <input
                    type="text"
                    className="form-control"
                    id="content"
                    required
                    value={todo.content}
                    onChange={handleInputChange}
                    name="content"
                />
            </div>

            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" className="form-control" onClick={handleInputChange}>
                    <option name="status" value="0">Non Active</option>
                    <option name="status" value="1" selected={todo.status == '1' ? true : false}>Active</option>
                </select>
            </div>

            {(todo.id != null) ?
                <button className="btn btn-success" onClick={updateTodo}>
                    Update
                </button>
                :
                <button className="btn btn-success" onClick={saveTodo}>
                    Save
                </button>
            }
        </div>
    )
}
export default TodoForm