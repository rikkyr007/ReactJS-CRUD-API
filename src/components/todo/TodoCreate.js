import React, {
    useState
} from "react";
import todoService from "../../services/TodoService";

const TodoCreate = () => {
    const TodoState = {
        id: null,
        content: "",
        status: ""
    }
    const [todo, setTodo] = useState(TodoState);
    const [submitted, setSubmitted] = useState(false);

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
        setSubmitted(true);
        console.log(response.data);
    })
    .catch(e => {
        console.log(e)
    });
};

const newTodo = () => {
    setTodo(TodoState)
    setSubmitted(false)
}

return(
    <div className="submit-form">
    { submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newTodo}>
          Add
        </button>
      </div>
    ) : (
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
              <option name="status" value="1">Active</option>
          </select>
        </div>

        <button onClick={saveTodo} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
)
}

export default TodoCreate;
