import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Employee from "./components/Employee";
import Advance from "./components/Advance";
import Attendance from "./components/Attendance";
import Salary from "./components/Salary";
import Dashboard from "./components/Dashboard";
import Leaves from "./components/Leaves";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Dashboard
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/employee"
                >
                  Employee
                </Link>
                <Link className="nav-link" to="/attendance">
                  Attendance
                </Link>
                <Link className="nav-link" to="/advance">
                  Advance
                </Link>
                <Link className="nav-link" to="/leaves">
                  Leaves
                </Link>
                <Link className="nav-link" to="/salary">
                  Salary
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}></Route>
          <Route path="/employee" element={<Employee></Employee>}></Route>
          <Route path="/attendance" element={<Attendance></Attendance>}></Route>
          <Route path="/advance" element={<Advance></Advance>}></Route>
          <Route path="/leaves" element={<Leaves></Leaves>}></Route>
          <Route path="/salary" element={<Salary></Salary>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
