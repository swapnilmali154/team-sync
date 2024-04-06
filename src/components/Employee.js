import React, { useEffect, useState } from "react";
import { getAllEmployee, createEmployee } from "../services/ApiService";

const Employee = () => {
  const [empObj, setEmpObj] = useState({
    EmpId: 0,
    EmpName: "",
    EmpContactNo: "",
    EmpAltContactNo: "",
    EmpEmail: "",
    AddressLine1: "",
    AddressLine2: "",
    Pincode: "",
    City: "",
    State: "",
    BankName: "",
    IFSC: "",
    AccountNo: "",
    BankBranch: "",
    Salary: 0,
  });

  const [empList, setEmpList] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    getAllEmployee().then((result) => {
      setEmpList(result.data);
    });
  };

  const updateFormValue = (event, key) => {
    setEmpObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const saveEmployee = () => {
    createEmployee(empObj).then((result) => {
      if (result.result) {
        alert("Employee created successfully");
        getEmployees();
        setEmpObj({
          EmpId: 0,
          EmpName: "",
          EmpContactNo: "",
          EmpAltContactNo: "",
          EmpEmail: "",
          AddressLine1: "",
          AddressLine2: "",
          Pincode: "",
          City: "",
          State: "",
          BankName: "",
          IFSC: "",
          AccountNo: "",
          BankBranch: "",
          Salary: 0,
        });
      } else {
        alert(result.message);
      }
    });
  };

  return (
    <div>
      <h1>Employee</h1>
      {JSON.stringify(empObj)}
      <div className="row p-2">
        <div className="col-12">
          <div className="row pt-2">
            <div className="col-4">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.EmpName}
                onChange={(event) => updateFormValue(event, "EmpName")}
                placeholder="Name"
              />
            </div>
            <div className="col-4">
              <label>Contact No:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.EmpContactNo}
                onChange={(event) => updateFormValue(event, "EmpContactNo")}
                placeholder="Contact No"
              />
            </div>
            <div className="col-4">
              <label>Alt Contact No:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.EmpAltContactNo}
                onChange={(event) => updateFormValue(event, "EmpAltContactNo")}
                placeholder="Alt Contact No"
              />
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.EmpEmail}
                onChange={(event) => updateFormValue(event, "EmpEmail")}
                placeholder="Email"
              />
            </div>
            <div className="col-4">
              <label>Address Line 1:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.AddressLine1}
                onChange={(event) => updateFormValue(event, "AddressLine1")}
                placeholder="Address Line 1"
              />
            </div>
            <div className="col-4">
              <label>Address Line 2:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.AddressLine2}
                onChange={(event) => updateFormValue(event, "AddressLine2")}
                placeholder="Address Line 2"
              />
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Pincode:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.Pincode}
                onChange={(event) => updateFormValue(event, "Pincode")}
                placeholder="Pincode"
              />
            </div>
            <div className="col-4">
              <label>City:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.City}
                onChange={(event) => updateFormValue(event, "City")}
                placeholder="City"
              />
            </div>
            <div className="col-4">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                value={empObj.State}
                onChange={(event) => updateFormValue(event, "State")}
                placeholder="State"
              />
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Bank Name:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.BankName}
                onChange={(event) => updateFormValue(event, "BankName")}
                placeholder="Bank Name"
              />
            </div>
            <div className="col-4">
              <label>IFSC:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.IFSC}
                onChange={(event) => updateFormValue(event, "IFSC")}
                placeholder="IFSC"
              />
            </div>
            <div className="col-4">
              <label>Account No:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.AccountNo}
                onChange={(event) => updateFormValue(event, "AccountNo")}
                placeholder="Account No"
              />
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Bank Branch:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.BankBranch}
                onChange={(event) => updateFormValue(event, "BankBranch")}
                placeholder="Bank Branch"
              />
            </div>
            <div className="col-4">
              <label>Salary:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.Salary}
                onChange={(event) => updateFormValue(event, "Salary")}
                placeholder="Salary"
              />
            </div>
            <div className="col-4">
              <div className="row pt-4">
                <div className="col-3">
                  <button className="btn btn-primary">Reset</button>
                </div>
                <div className="col-3">
                  <button className="btn btn-success" onClick={saveEmployee}>
                    Save
                  </button>
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
                <th>Id</th>
                <th>Name</th>
                <th>Contact No</th>
                <th>Alt Contact No</th>
                <th>Email</th>
                <th>Address Line 1</th>
                <th>Address Line 2</th>
                <th>Pincode</th>
                <th>City</th>
                <th>State</th>
                <th>Bank Name</th>
                <th>IFSC</th>
                <th>Account No</th>
                <th>Bank Branch</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((emp, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.empContactNo}</td>
                    <td>{emp.empAltContactNo}</td>
                    <td>{emp.empEmail}</td>
                    <td>{emp.addressLine1}</td>
                    <td>{emp.addressLine2}</td>
                    <td>{emp.pincode}</td>
                    <td>{emp.city}</td>
                    <td>{emp.state}</td>
                    <td>{emp.bankName}</td>
                    <td>{emp.ifsc}</td>
                    <td>{emp.accountNo}</td>
                    <td>{emp.bankBranch}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <button>Edit</button>
                      <button>Delete</button>
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

export default Employee;
