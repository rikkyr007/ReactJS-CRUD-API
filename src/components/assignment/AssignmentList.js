import React, {
    useState, useEffect
} from 'react';
import todoService from "../../services/TodoService";
import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';

const AssignmentList = (props) => {
    //tangkep data
    const data = props.location.state.data;
    const [alert, setAlert] = useState({ show: false })
    return (
        <div>
            <center><h3>Assignment List for '{data.content}' </h3></center>
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
                    {data.assignment.map((assignment) => (
                        <tr key={assignment.id}>
                            <td>{assignment.id}</td>
                            <td>{assignment.name}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => props.history.push('/todo/assignment/edit/' + assignment.id, { data: data })}>Update</button>
                                &nbsp;
                                <button className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AssignmentList