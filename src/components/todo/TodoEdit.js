import React, {
    useState, useEffect
} from "react";
import todoService from "../../services/TodoService";

const TodoEdit = (props) => {
    const todoState = {
        id: null,
        content: "",
        status: "",
    };

    const id = props.match.params.id;
    const [currentData, setCurrentData] = useState(todoState);

    const handleInputChange = event => {
        const {
            target: { name, value }
        } = event;
        setCurrentData({ ...currentData, [name]: value });
    };

    const editTodo = () => {
        todoService.get(id)
            .then(response => {
                setCurrentData(response.data[0]);
            })
            .catch(e => {
                console.log(e)
            });
    }

    const updateTodo = () => {
        todoService.update(currentData.id, currentData)
            .then(response => {
                props.history.push('/');
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        editTodo()
    }, [])

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        required
                        value={currentData.content}
                        onChange={handleInputChange}
                        name="content"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" className="form-control" onChange={handleInputChange}>
                        <option value="0">Non Active</option>
                        <option value="1" selected={currentData.status === '1' ? true : false}>Active</option>
                    </select>
                </div>

                <button
                    onClick={updateTodo}
                    className="btn btn-success">
                    Submit
                </button>
            </div>
        </div>
    )
}

export default TodoEdit;