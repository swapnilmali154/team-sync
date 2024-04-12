import React, { useEffect, useState } from "react";
import {
  getData,
  createData,
  updateData,
  deleteData,
} from "../services/ApiService";
import {
  GET_EMPLOYEE_ENDPOINT,
  GET_ATTENDANCE_ENDPOINT,
  CREATE_ATTENDANCE_ENDPOINT,
  UPDATE_ATTENDANCE_ENDPOINT,
  DELETE_ATTENDANCE_ENDPOINT,
} from "../constants/constant";

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
    isFullDay: false,
  });

  useEffect(() => {
    getEmployees();
    getAttendance();
  }, []);

  const getEmployees = () => {
    getData(GET_EMPLOYEE_ENDPOINT).then((result) => {
      setEmpList(result.data);
    });
  };

  const getAttendance = () => {
    getData(GET_ATTENDANCE_ENDPOINT).then((result) => {
      setAttendanceList(result.data);
    });
  };

  const updateFormValue = (event, key) => {
    setAttendanceObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const updateCheckboxValue = (event, key) =>{
    setAttendanceObj((prevObj)=> ({...prevObj, [key]: event.target.checked}));
  }

  const saveAttendance = () => {
    setIsFormSubmitted(true);
    createData(CREATE_ATTENDANCE_ENDPOINT, attendanceObj).then((result) => {
      if (result.result) {
        alert("Attendance Saved Successfully");
        getAttendance();
        setAttendanceObj({
          attendanceId: 0,
          employeeId: 0,
          attendanceDate: "",
          inTime: "",
          outTime: "",
          isFullDay: false,
        });
        setIsFormSubmitted(false);
      } else {
        alert(result.message);
      }
    });
  };

  const onEdit = (attendObj) => {
    setAttendanceObj(attendObj);
  };

  const updateAttendance = () => {
    setIsFormSubmitted(true);
    updateData(UPDATE_ATTENDANCE_ENDPOINT, attendanceObj).then((result) => {
      if (result.result) {
        alert("Attendance Updated Successfully");
        getAttendance();
        setAttendanceObj({
          attendanceId: 0,
          employeeId: 0,
          attendanceDate: "",
          inTime: "",
          outTime: "",
          isFullDay: false,
        });
        setIsFormSubmitted(false);
      } else {
        alert(result.message);
      }
    });
  };

  const onDelete = (attendanceId) => {
    deleteData(DELETE_ATTENDANCE_ENDPOINT, attendanceId).then((result) => {
      if (result.result) {
        alert("Attendance deleted successfully");
        getAttendance();
      } else {
        alert(result.message);
      }
    });
  };

  const onReset = () => {
    setAttendanceObj({
      attendanceId: 0,
      employeeId: 0,
      attendanceDate: "",
      inTime: "",
      outTime: "",
      isFullDay: false,
    });
    setIsFormSubmitted(false);
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
                value={attendanceObj.attendanceDate.split("T")[0]}
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
                value={attendanceObj.inTime.split("T")[0]}
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
                value={attendanceObj.outTime.split("T")[0]}
                onChange={(event) => updateFormValue(event, "outTime")}
                placeholder="Out Time"
              />
              {isFormSubmitted && attendanceObj.outTime === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Full Day Present:</label><br></br>
              <input
                type="checkbox"
                className=""
                checked={attendanceObj.isFullDay}
                onChange={(event) => updateCheckboxValue(event, "isFullDay")}
                placeholder="Is Full Day"
              />
              {isFormSubmitted && attendanceObj.isFullDay === "" && (
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
