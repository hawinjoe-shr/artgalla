import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getEmployees() {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );

                if (!response.ok) {
                    throw new Error("Could not get employee data.");
                }

                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        getEmployees();
    }, []);

    return (
        <div>
            <h1 className="mb-4">Employee Dashboard</h1>

            {loading && <p>Loading employee data...</p>}

            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                        </thead>

                        <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

function EmployeeForm() {
    function handleSubmit(event) {
        event.preventDefault();
        alert("Form submitted. No data was sent because this assignment does not require it.");
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-sm">
                    <div className="card-body p-4">
                        <h1 className="h3 mb-4">Employee Form</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter employee name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="designation" className="form-label">
                                    Designation
                                </label>
                                <input
                                    id="designation"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter designation"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter location"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="salary" className="form-label">
                                    Salary
                                </label>
                                <input
                                    id="salary"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter salary"
                                    min="0"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Submit Employee
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        Employee Dashboard
                    </NavLink>

                    <div>
                        <NavLink className="btn btn-outline-light me-2" to="/">
                            Home
                        </NavLink>

                        <NavLink className="btn btn-light" to="/employee-form">
                            Employee Form
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/employee-form" element={<EmployeeForm />} />
                </Routes>
            </main>
        </>
    );
}

export default App;