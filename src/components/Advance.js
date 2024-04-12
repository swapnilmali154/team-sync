import React, { useEffect, useState } from "react";
import {
  getData,
  createData,
  updateData,
  deleteData,
} from "../services/ApiService";
import {
  GET_EMPLOYEE_ENDPOINT,
  GET_ADVANCE_ENDPOINT,
  CREATE_ADVANCE_ENDPOINT,
  UPDATE_ADVANCE_ENDPOINT,
  DELETE_ADVANCE_ENDPOINT,
} from "../constants/constant";

const Advance = () => {
  const [empList, setEmpList] = useState([]);
  const [advanceList, setAdvanceList] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [advanceObj, setAdvanceObj] = useState({
    advanceId: 0,
    employeeId: 0,
    advanceDate: "",
    advanceAmount: 0,
    reason: "",
  });

  useEffect(() => {
    getEmployees();
    getAdvance();
  }, []);

  const getEmployees = () => {
    getData(GET_EMPLOYEE_ENDPOINT).then((result) => {
      setEmpList(result.data);
    });
  };

  const getAdvance = () => {
    getData(GET_ADVANCE_ENDPOINT).then((result) => {
      setAdvanceList(result.data);
    });
  };

  const updateFormValue = (event, key) => {
    setAdvanceObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const saveAdvance = () => {
    setIsFormSubmitted(true);
    createData(CREATE_ADVANCE_ENDPOINT, advanceObj).then((result) => {
      if (result.result) {
        alert("Advance Saved Successfully");
        getAdvance();
        setAdvanceObj({
          advanceId: 0,
          employeeId: 0,
          advanceDate: "",
          advanceAmount: 0,
          reason: "",
        });
        setIsFormSubmitted(false);
      } else {
        alert(result.message);
      }
    });
  };

  const onEdit = (advObj) => {
    setAdvanceObj(advObj);
  };

  const updateAdvance = () => {
    setIsFormSubmitted(true);
    updateData(UPDATE_ADVANCE_ENDPOINT, advanceObj).then((result) => {
      if (result.result) {
        alert("Advance Updated Successfully");
        getAdvance();
        setAdvanceObj({
          advanceId: 0,
          employeeId: 0,
          advanceDate: "",
          advanceAmount: 0,
          reason: "",
        });
        setIsFormSubmitted(false);
      } else {
        alert(result.message);
      }
    });
  };

  const onDelete = (advanceId) => {
    deleteData(DELETE_ADVANCE_ENDPOINT, advanceId).then((result) => {
      if (result.result) {
        alert("Advance deleted successfully");
        getAdvance();
      } else {
        alert(result.message);
      }
    });
  };

  const onReset = () => {
    setAdvanceObj({
      advanceId: 0,
      employeeId: 0,
      advanceDate: "",
      advanceAmount: 0,
      reason: "",
    });
    setIsFormSubmitted(false);
  };

  return (
    <div>
      <h1>Advance</h1>
      <div className="row p-2">
        <div className="col-12">
          <div className="row pt-2">
            <div className="col-4">
              <label>Employee:</label>
              <select
                value={advanceObj.employeeId}
                className="form-control"
                onChange={(event) => updateFormValue(event, "employeeId")}
              >
                <option value="">Select Employee</option>
                {empList.map((emp) => {
                  return <option value={emp.empId}>{emp.empName}</option>;
                })}
              </select>
              {isFormSubmitted && advanceObj.employeeId === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Advance Date:</label>
              <input
                type="date"
                className="form-control"
                value={advanceObj.advanceDate.split("T")[0]}
                onChange={(event) => updateFormValue(event, "advanceDate")}
                placeholder="Advance Date"
              />
              {isFormSubmitted && advanceObj.advanceDate === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Advance Amount:</label>
              <input
                type="text"
                className="form-control"
                value={advanceObj.advanceAmount}
                onChange={(event) => updateFormValue(event, "advanceAmount")}
                placeholder="Advance Amount"
              />
              {isFormSubmitted && advanceObj.advanceAmount === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Reason:</label>
              <input
                type="text"
                className="form-control"
                value={advanceObj.reason}
                onChange={(event) => updateFormValue(event, "reason")}
                placeholder="Reason"
              />
              {isFormSubmitted && advanceObj.reason === "" && (
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
                  {advanceObj.advanceId === 0 && (
                    <button className="btn btn-success" onClick={saveAdvance}>
                      Save
                    </button>
                  )}
                  {advanceObj.advanceId !== 0 && (
                    <button className="btn btn-warning" onClick={updateAdvance}>
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
                <th>Advance Date</th>
                <th>Advance Amount</th>
                <th>Advance Id</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {advanceList.map((adv, index) => {
                return (
                  <tr key={index}>
                    <td>{adv.empName}</td>
                    <td>{adv.empContactNo}</td>
                    <td>{adv.employeeId}</td>
                    <td>{adv.advanceDate}</td>
                    <td>{adv.advanceAmount}</td>
                    <td>{adv.advanceId}</td>
                    <td>{adv.reason}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onEdit(adv)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onDelete(adv.advanceId)}
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

export default Advance;
