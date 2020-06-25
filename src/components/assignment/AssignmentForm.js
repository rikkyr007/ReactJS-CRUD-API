import React, {
    useState, useEffect
} from "react";
import swal from "sweetalert"
import assignmentService from "../../services/AssignmentService";

const AssigmentForm = (props) => {

    //ambil data yang dibutuhkan
    const id = props.match.params.id;
    const todo_id = props.location.state.data.id;

    //siapin state nya
    const AssignmentState = {
        id: null,
        todo_id: todo_id,
        name: ""
    }
    //bikin setter dan getternya
    const [assignment, setAssignment] = useState(AssignmentState);

    //event input
    const handleInputChange = event => {
        const {
            name,
            value
        } = event.target;
        setAssignment({
            ...assignment,
            [name]: value
        });
    }

    const editAssignment = () => {
        assignmentService.get(id)
            .then(response => {
                setAssignment(response.data);
            })
            .catch(e => {
                console.log(e)
            });
    }

    //event update
    const updateAssignment = () => {
        assignmentService.update(assignment.id, assignment)
            .then(response => {
                swal("Success!", "data has been saved successfully!", "success")
                    .then((res) => {
                        props.history.push('/todo/list/');
                    });
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        //kalo ada idnya tarik datanya
        if (id != null) {
            editAssignment()
        }
    }, [])

    return (
        <div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={assignment.name}
                    onChange={handleInputChange}
                    name="name"
                />
            </div>
            {(assignment.id != null) ?
                <button className="btn btn-success" onClick={updateAssignment}>
                    Update
                </button>
                :
                <button className="btn btn-success">
                    Save
                </button>
            }
        </div>
    )
}
export default AssigmentForm