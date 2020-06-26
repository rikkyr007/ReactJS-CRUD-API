import React, {
    useState, useEffect
} from 'react';
import assignmentService from "../../services/AssignmentService";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

const AssignmentList = (props) => {
    //tangkep data
    const prevprops = props.location.state.data;
    const data = props.location.state.data.assignment;
    const [assignment, setAssignment] = useState([])
    useEffect(() => {
        setAssignment(data);
    }, [])

    const onDeleteHandle = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    assignmentService.remove(id)
                        .then((res) => {
                            const newAssignment = assignment.filter(data => data.id !== id)
                            console.log(newAssignment, 'new assignment baru')
                            setAssignment(newAssignment)
                        }).catch(e => {
                            console.log(e)
                        })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    // useEffect(() => {
    //     console.log(assignment,'setelah dihapus');
    // },[assignment])

    return (
        <div>
            <center><h3>Assignment List for '{prevprops.content}' </h3></center>
            <Link to={'/todo/list/'}>
                <button className="btn btn-success mb-2"> Back</button>
            </Link>
            <table style={{ width: '100%' }} className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {assignment.map((assignment) => (
                        <tr key={assignment.id}>
                            <td>{assignment.id}</td>
                            <td>{assignment.name}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => props.history.push('/todo/assignment/edit/' + assignment.id, { assignment: assignment })}>Update</button>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => onDeleteHandle(assignment.id)}>Delete</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AssignmentList