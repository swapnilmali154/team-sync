import React, { useEffect, useState } from "react";
import {
  getData,
  createData,
  updateData,
  deleteData,
} from "../services/ApiService";
import {
  GET_EMPLOYEE_ENDPOINT,
  CREATE_EMPLOYEE_ENDPOINT,
  UPDATE_EMPLOYEE_ENDPOINT,
  DELETE_EMPLOYEE_ENDPOINT,
} from "../constants/constant";

const Employee = () => {
  const [empObj, setEmpObj] = useState({
    empId: 0,
    empName: "",
    empContactNo: "",
    empAltContactNo: "",
    empEmail: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    city: "",
    state: "",
    bankName: "",
    ifsc: "",
    accountNo: "",
    bankBranch: "",
    salary: 0,
  });

  const [empList, setEmpList] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    getData(GET_EMPLOYEE_ENDPOINT).then((result) => {
      setEmpList(result.data);
    });
  };

  const updateFormValue = (event, key) => {
    setEmpObj((prevObj) => ({ ...prevObj, [key]: event.target.value }));
  };

  const saveEmployee = () => {
    setIsFormSubmitted(true);
    if (
      empObj.empName !== "" &&
      empObj.empContactNo !== "" &&
      empObj.accountNo !== "" &&
      empObj.addressLine1 !== "" &&
      empObj.addressLine2 !== "" &&
      empObj.bankBranch !== "" &&
      empObj.bankName !== "" &&
      empObj.city !== "" &&
      empObj.empAltContactNo !== "" &&
      empObj.empEmail !== "" &&
      empObj.pincode !== "" &&
      empObj.state !== "" &&
      empObj.ifsc !== "" &&
      empObj.salary !== ""
    ) {
      createData(CREATE_EMPLOYEE_ENDPOINT, empObj).then((result) => {
        if (result.result) {
          alert("Employee created successfully");
          getEmployees();
          setEmpObj({
            empId: 0,
            empName: "",
            empContactNo: "",
            empAltContactNo: "",
            empEmail: "",
            addressLine1: "",
            addressLine2: "",
            pincode: "",
            city: "",
            state: "",
            bankName: "",
            ifsc: "",
            accountNo: "",
            bankBranch: "",
            salary: 0,
          });
        } else {
          alert(result.message);
        }
      });
    }
  };

  const onEdit = (empObj) => {
    setEmpObj(empObj);
  };

  const updateEmp = () => {
    updateData(UPDATE_EMPLOYEE_ENDPOINT, empObj).then((result) => {
      if (result.result) {
        alert("Employee Updated Successfully");
        getEmployees();
        setEmpObj({
          empId: 0,
          empName: "",
          empContactNo: "",
          empAltContactNo: "",
          empEmail: "",
          addressLine1: "",
          addressLine2: "",
          pincode: "",
          city: "",
          state: "",
          bankName: "",
          ifsc: "",
          accountNo: "",
          bankBranch: "",
          salary: 0,
        });
      } else {
        alert(result.message);
      }
    });
  };

  const onDelete = (empId) => {
    deleteData(DELETE_EMPLOYEE_ENDPOINT, empId).then((result) => {
      if (result.result) {
        alert("Employee Deleted Successfully");
        getEmployees();
      } else {
        alert(result.message);
      }
    });
  };

  const onReset = () => {
    setIsFormSubmitted(false);
    setEmpObj({
      empId: 0,
      empName: "",
      empContactNo: "",
      empAltContactNo: "",
      empEmail: "",
      addressLine1: "",
      addressLine2: "",
      pincode: "",
      city: "",
      state: "",
      bankName: "",
      ifsc: "",
      accountNo: "",
      bankBranch: "",
      salary: 0,
    });
  };

  return (
    <div>
      <h1>Employee</h1>
      <div className="row p-2">
        <div className="col-12">
          <div className="row pt-2">
            <div className="col-4">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.empName}
                onChange={(event) => updateFormValue(event, "empName")}
                placeholder="Name"
              />
              {isFormSubmitted && empObj.empName === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Contact No:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.empContactNo}
                onChange={(event) => updateFormValue(event, "empContactNo")}
                placeholder="Contact No"
              />
              {isFormSubmitted && empObj.empContactNo === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Alt Contact No:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.empAltContactNo}
                onChange={(event) => updateFormValue(event, "empAltContactNo")}
                placeholder="Alt Contact No"
              />
              {isFormSubmitted && empObj.empAltContactNo === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.empEmail}
                onChange={(event) => updateFormValue(event, "empEmail")}
                placeholder="Email"
              />
              {isFormSubmitted && empObj.empEmail === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Address Line 1:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.addressLine1}
                onChange={(event) => updateFormValue(event, "addressLine1")}
                placeholder="Address Line 1"
              />
              {isFormSubmitted && empObj.addressLine1 === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Address Line 2:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.addressLine2}
                onChange={(event) => updateFormValue(event, "addressLine2")}
                placeholder="Address Line 2"
              />
              {isFormSubmitted && empObj.addressLine2 === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Pincode:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.pincode}
                onChange={(event) => updateFormValue(event, "pincode")}
                placeholder="Pincode"
              />
              {isFormSubmitted && empObj.pincode === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>City:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.city}
                onChange={(event) => updateFormValue(event, "city")}
                placeholder="City"
              />
              {isFormSubmitted && empObj.city === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>State</label>
              <input
                type="text"
                className="form-control"
                value={empObj.state}
                onChange={(event) => updateFormValue(event, "state")}
                placeholder="State"
              />
              {isFormSubmitted && empObj.state === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Bank Name:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.bankName}
                onChange={(event) => updateFormValue(event, "bankName")}
                placeholder="Bank Name"
              />
              {isFormSubmitted && empObj.bankName === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>IFSC:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.ifsc}
                onChange={(event) => updateFormValue(event, "ifsc")}
                placeholder="IFSC"
              />
              {isFormSubmitted && empObj.ifsc === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Account No:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.accountNo}
                onChange={(event) => updateFormValue(event, "accountNo")}
                placeholder="Account No"
              />
              {isFormSubmitted && empObj.accountNo === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-4">
              <label>Bank Branch:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.bankBranch}
                onChange={(event) => updateFormValue(event, "bankBranch")}
                placeholder="Bank Branch"
              />
              {isFormSubmitted && empObj.bankBranch === "" && (
                <div className="text-danger">This is required.</div>
              )}
            </div>
            <div className="col-4">
              <label>Salary:</label>
              <input
                type="text"
                className="form-control"
                value={empObj.salary}
                onChange={(event) => updateFormValue(event, "salary")}
                placeholder="Salary"
              />
              {isFormSubmitted && empObj.salary === "" && (
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
                  {empObj.empId === 0 && (
                    <button className="btn btn-success" onClick={saveEmployee}>
                      Save
                    </button>
                  )}
                  {empObj.empId !== 0 && (
                    <button className="btn btn-warning" onClick={updateEmp}>
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
                <th>Id</th>
                <th>Name</th>
                <th>Contact No</th>
                {/* <th>Alt Contact No</th> */}
                <th>Email</th>
                {/* <th>Address Line 1</th>
                <th>Address Line 2</th> */}
                <th>Pincode</th>
                <th>City</th>
                <th>State</th>
                <th>Bank Name</th>
                {/* <th>IFSC</th> */}
                <th>Account No</th>
                {/* <th>Bank Branch</th> */}
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
                    {/* <td>{emp.empAltContactNo}</td> */}
                    <td>{emp.empEmail}</td>
                    {/* <td>{emp.addressLine1}</td>
                    <td>{emp.addressLine2}</td> */}
                    <td>{emp.pincode}</td>
                    <td>{emp.city}</td>
                    <td>{emp.state}</td>
                    <td>{emp.bankName}</td>
                    {/* <td>{emp.ifsc}</td> */}
                    <td>{emp.accountNo}</td>
                    {/* <td>{emp.bankBranch}</td> */}
                    <td>{emp.salary}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => onEdit(emp)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onDelete(emp.empId)}
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

export default Employee;
