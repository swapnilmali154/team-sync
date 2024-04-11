import React, { useEffect, useState } from "react";
import {
  getAllEmployee,
  getAllAttendance,
  addAttendance,
  deleteAttendance
} from "../services/ApiService";

const Attendance = () => {
  const [empList, setEmpList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [attendanceObj, setAttendanceObj] = useState({
    attendanceId: 0,
    employeeId: 0,
    attendanceDate: "",
    inTime: "",
    outTime: "",
    isFullDay: true,
  });

  useEffect(() => {
    getEmployees();
    getAttendance();
  }, []);

  const getEmployees = () => {
    getAllEmployee().then((result) => {
      setEmpList(result.data);
    });
  };

  const getAttendance = () => {
    getAllAttendance().then((result) => {
      setAttendanceList(result.data);
    });
  };

  const updateFormValue = (event, key) => {
    setAttendanceObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const saveAttendance = () => {
    setIsFormSubmitted(true);
    addAttendance(attendanceObj).then((result) => {
      if (result.result) {
        alert("Attendance Saved Successfully");
        getAttendance();
      } else {
        alert(result.message);
      }
    });
  };

  const onEdit = (empObj) => {
    setAttendanceObj(empObj);
  };

  const updateAttendance = () => {};

  const onDelete = (attendanceId) => {
    deleteAttendance(attendanceId).then(result => {
      if(result.result){
        alert("Attendance deleted successfully")
        getAllAttendance();
      }else{
        alert(result.message)
      }
    })
  };

  const onReset = () => {
    setAttendanceObj({
      attendanceId: 0,
      employeeId: 0,
      attendanceDate: "",
      inTime: "",
      outTime: "",
      isFullDay: true,
    });
  };

  return (
    <div>
      <h1>Attendance</h1>
      <div className="row p-2">
        <div className="col-12">
          <div className="row pt-2">
            <div className="col-4">
              <label>Employee:</label>
              <select
                value={attendanceObj.employeeId}
                className="form-control"
                onChange={(event) => updateFormValue(event, "employeeId")}
              >
                <option value="">Select Employee</option>
                {empList.map((emp) => {
                  return <option value={emp.empId}>{emp.empName}</option>;
                })}
              </select>
              {isFormSubmitted && attendanceObj.employeeId === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Attendance Date:</label>
              <input
                type="date"
                className="form-control"
                value={attendanceObj.attendanceDate}
                onChange={(event) => updateFormValue(event, "attendanceDate")}
                placeholder="Attendance Date"
              />
              {isFormSubmitted && attendanceObj.attendanceDate === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>In Time:</label>
              <input
                type="date"
                className="form-control"
                value={attendanceObj.inTime}
                onChange={(event) => updateFormValue(event, "inTime")}
                placeholder="In Time"
              />
              {isFormSubmitted && attendanceObj.inTime === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Out Time:</label>
              <input
                type="date"
                className="form-control"
                value={attendanceObj.outTime}
                onChange={(event) => updateFormValue(event, "outTime")}
                placeholder="Out Time"
              />
              {isFormSubmitted && attendanceObj.outTime === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <div className="row pt-4">
                <div className="col-3">
                  <button className="btn btn-primary" onClick={onReset}>
                    Reset
                  </button>
                </div>
                <div className="col-3">
                  {attendanceObj.attendanceId === 0 && (
                    <button
                      className="btn btn-success"
                      onClick={saveAttendance}
                    >
                      Save
                    </button>
                  )}
                  {attendanceObj.attendanceId !== 0 && (
                    <button
                      className="btn btn-warning"
                      onClick={updateAttendance}
                    >
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
                <th>Attendance Date</th>
                <th>Attendance Id</th>
                <th>In Time</th>
                <th>Out Time</th>
                <th>Full Day Present</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attend, index) => {
                return (
                  <tr key={index}>
                    <td>{attend.empName}</td>
                    <td>{attend.empContactNo}</td>
                    <td>{attend.employeeId}</td>
                    <td>{attend.attendanceDate}</td>
                    <td>{attend.attendanceId}</td>
                    <td>{attend.inTime}</td>
                    <td>{attend.outTime}</td>
                    <td>{attend.isFullDay ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onEdit(attend)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onDelete(attend.attendanceId)}
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

export default Attendance;
