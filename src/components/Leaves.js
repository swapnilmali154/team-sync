import React, { useEffect, useState } from "react";
import {
  getData,
  createData,
  updateData,
  deleteData,
} from "../services/ApiService";
import {
  GET_EMPLOYEE_ENDPOINT,
  GET_LEAVES_ENDPOINT,
  CREATE_LEAVES_ENDPOINT,
  UPDATE_LEAVES_ENDPOINT,
  DELETE_LEAVES_ENDPOINT,
} from "../constants/constant";

const Leaves = () => {
    const [empList, setEmpList] = useState([]);
    const [leavesList, setLeavesList] = useState([]);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [leavesObj, setLeavesObj] = useState({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
      });
  
    useEffect(() => {
      getEmployees();
      getLeaves();
    }, []);
  
    const getEmployees = () => {
      getData(GET_EMPLOYEE_ENDPOINT).then((result) => {
        setEmpList(result.data);
      });
    };
  
    const getLeaves = () => {
      getData(GET_LEAVES_ENDPOINT).then((result) => {
        setLeavesList(result.data);
      });
    };
  
    const updateFormValue = (event, key) => {
      setLeavesObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
    };
  
    const saveLeaves = () => {
      setIsFormSubmitted(true);
      createData(CREATE_LEAVES_ENDPOINT, leavesObj).then((result) => {
        if (result.result) {
          alert("Leaves Saved Successfully");
          getLeaves();
          setLeavesObj({
            "leaveId": 0,
            "employeeId": 0,
            "leaveDate": "",
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
          });
          setIsFormSubmitted(false);
        } else {
          alert(result.message);
        }
      });
    };
  
    const onEdit = (levObj) => {
      setLeavesObj(levObj);
    };
  
    const updateLeaves = () => {
      setIsFormSubmitted(true);
      updateData(UPDATE_LEAVES_ENDPOINT, leavesObj).then((result) => {
        if (result.result) {
          alert("Leaves Updated Successfully");
          getLeaves();
          setLeavesObj({
            "leaveId": 0,
            "employeeId": 0,
            "leaveDate": "",
            "leaveReason": "",
            "noOfFullDayLeaves": 0,
            "noOfHalfDayLeaves": 0
          });
          setIsFormSubmitted(false);
        } else {
          alert(result.message);
        }
      });
    };
  
    const onDelete = (leaveId) => {
      deleteData(DELETE_LEAVES_ENDPOINT, leaveId).then((result) => {
        if (result.result) {
          alert("Leaves deleted successfully");
          getLeaves();
        } else {
          alert(result.message);
        }
      });
    };
  
    const onReset = () => {
      setLeavesObj({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
      });
      setIsFormSubmitted(false);
    };
  
    return (
      <div>
        <h1>Leaves</h1>
        <div className="row p-2">
          <div className="col-12">
            <div className="row pt-2">
              <div className="col-4">
                <label>Employee:</label>
                <select
                  value={leavesObj.employeeId}
                  className="form-control"
                  onChange={(event) => updateFormValue(event, "employeeId")}
                >
                  <option value="">Select Employee</option>
                  {empList.map((emp) => {
                    return <option value={emp.empId}>{emp.empName}</option>;
                  })}
                </select>
                {isFormSubmitted && leavesObj.employeeId === "" && (
                  <div className="text-danger">This is required.</div>
                )}
              </div>
              <div className="col-4">
                <label>Leave Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={leavesObj.leaveDate.split("T")[0]}
                  onChange={(event) => updateFormValue(event, "leaveDate")}
                  placeholder="Leave Date"
                />
                {isFormSubmitted && leavesObj.leaveDate === "" && (
                  <div className="text-danger">This is required.</div>
                )}
              </div>
              <div className="col-4">
                <label>Leave Reason:</label>
                <input
                  type="text"
                  className="form-control"
                  value={leavesObj.leaveReason}
                  onChange={(event) => updateFormValue(event, "leaveReason")}
                  placeholder="Leave Reason"
                />
                {isFormSubmitted && leavesObj.leaveReason === "" && (
                  <div className="text-danger">This is required.</div>
                )}
              </div>
            </div>
            <div className="row pt-2">
              <div className="col-4">
                <label>No Of FullDay Leaves:</label>
                <input
                  type="text"
                  className="form-control"
                  value={leavesObj.noOfFullDayLeaves}
                  onChange={(event) => updateFormValue(event, "noOfFullDayLeaves")}
                  placeholder="No Of FullDay Leaves"
                />
                {isFormSubmitted && leavesObj.noOfFullDayLeaves === "" && (
                  <div className="text-danger">This is required.</div>
                )}
              </div>
              <div className="col-4">
                <label>No Of HalfDay Leaves:</label>
                <input
                  type="text"
                  className="form-control"
                  value={leavesObj.noOfHalfDayLeaves}
                  onChange={(event) => updateFormValue(event, "noOfHalfDayLeaves")}
                  placeholder="No Of HalfDay Leaves"
                />
                {isFormSubmitted && leavesObj.noOfHalfDayLeaves === "" && (
                  <div className="text-danger">This is required.</div>
                )}
              </div>
              <div className="col-4">
                <div className="row pt-4">
                  <div className="col-3">
                    <button className="btn btn-primary" onClick={onReset}>
                      Reset
                    </button>
                  </div>
                  <div className="col-3">
                    {leavesObj.leaveId === 0 && (
                      <button className="btn btn-success" onClick={saveLeaves}>
                        Save
                      </button>
                    )}
                    {leavesObj.leaveId !== 0 && (
                      <button className="btn btn-warning" onClick={updateLeaves}>
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row p-2">
          <div className="col-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee Contact No</th>
                  <th>Employee Id</th>
                  <th>Leave Date</th>
                  <th>Leave Id</th>
                  <th>Leave Reason</th>
                  <th>No Of FullDay Leave</th>
                  <th>No Of HalfDay Leave</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leavesList.map((lev, index) => {
                  return (
                    <tr key={index}>
                      <td>{lev.empName}</td>
                      <td>{lev.empContactNo}</td>
                      <td>{lev.employeeId}</td>
                      <td>{lev.leaveDate}</td>
                      <td>{lev.leaveId}</td>
                      <td>{lev.leaveReason}</td>
                      <td>{lev.noOfFullDayLeaves}</td>
                      <td>{lev.noOfHalfDayLeaves}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => onEdit(lev)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => onDelete(lev.leaveId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default Leaves;