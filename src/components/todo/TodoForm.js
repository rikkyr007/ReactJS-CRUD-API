import React, {
    useState, useEffect
} from "react";
import todoService from "../../services/TodoService";

const TodoForm = (props) => {
    const TodoState = {
        id: null,
        content: "",
        status: ""
    }
    const [todo, setTodo] = useState(TodoState);

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
                props.history.push('/todo/list');
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
                props.history.push('/todo/list');
            })
            .catch(e => {
                console.log(e)
            })
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
    // },[todo])


    return (
        <div>
            <div className="form-group">
                <label htmlFor="content">Content 123</label>
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