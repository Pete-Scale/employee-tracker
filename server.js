const inquirer = require('inquirer');
const mysql = require('mysql');
// const cTable = require('console.table');

// CONNECTION -----------------------------------------------------
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeeTracker_db'
});

connection.connect(err => {
    if(err) throw err;
    console.log(`MySQL connected on ${connection.threadId}`);
    // START APP
    runEmployeeTracker();
});
// CONNECTION -----------------------------------------------------


// RUN TRACKER ----------------------------------------------------
function runEmployeeTracker() {
    const actionChoices = [
        "View All Employees",
        "View All Roles",
        "View All Departments", 
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Roles",
        "Exit"
    ];
    inquirer
        .prompt([{
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: actionChoices
        }])
        .then(answer => {
            switch (answer.action) {
                case actionChoices[0]:
                    viewAllEmployees();
                    break;
                case actionChoices[1]:
                    viewAllRoles();
                    break;
                case actionChoices[2]:
                    viewAllDepartments();
                    break;
                case actionChoices[3]:
                    addEmployee();
                    break;
                case actionChoices[4]:
                    addRole();
                    break;
                case actionChoices[5]:
                    addDepartment();
                    break;
                case actionChoices[6]:
                    updateEmployeeRole();
                    break;
                case actionChoices[7]:
                    exitEmployeeTracker();
                    break;
            }
        });
}

function exitEmployeeTracker() {
    connection.end();
    process.exit();
}
// RUN TRACKER ----------------------------------------------------

// VIEW -----------------------------------------------------------
function results(res) {
    console.log(" ");
    console.table(res);
    runEmployeeTracker();
}

function viewAllEmployees() {
    const query = 'SELECT e.id AS "ID", e.first_name AS "First Name", e.last_name AS "Last Name", role.title AS "Role Title", department.name AS "Department", role.salary AS "Salary", CONCAT (m.first_name, " " ,  m.last_name) AS "Manager" FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id';
    connection.query(query, (err, res) => {
        if(err) throw err;
        results(res);
    });
}

function viewAllRoles() {
    const query = 'SELECT r.id AS "ID", r.title AS "All Role Titles", r.salary AS "Salary", r.department_id AS "Department ID" FROM role r';
    connection.query(query, (err, res) => {
        if(err) throw err;
        results(res);
    });
}

function viewAllDepartments() {
    const query = 'SELECT d.id AS "ID", d.name AS "All Departments" FROM department d';
    connection.query(query, (err, res) => {
        if(err) throw err;
        results(res);
    });
}
// VIEW -----------------------------------------------------------

// ADD ------------------------------------------------------------
function roleChoices() {
    let roleArray = [];
    connection.query('SELECT r.title FROM role r', (err, res) => {
        if(err) throw err;
        res.forEach(role => {
            roleArray.push(role.title);
        });
    });
    return roleArray;
}

function managerChoices() {
    let managerArray = [];
    const query = "SELECT CONCAT (e.first_name, ' ', e.last_name) AS full_name FROM employee e;"
    connection.query(query, (err, res) => {
        if(err) throw err;
        res.forEach(employee => {
            managerArray.push(employee.full_name);
        });
        managerArray.push('N/A');
    });
    return managerArray;
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "role",
                type: "list",
                message: "What is the employee's role title?",
                choices: roleChoices()
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager? (If none leave blank)",
                choices: managerChoices()
            },
        ])
        .then(answer => {
            managerFirstLast = answer.manager.split(' ');
            const managerFirst = managerFirstLast[0];
            const managerLast = managerFirstLast[1];
            const query1 = `SELECT id FROM employee WHERE first_name = "${managerFirst}" AND last_name = "${managerLast}"`;
            connection.query(query1, (err, res1) => {
                if(err) throw err;
                if(res1 === 'N/A') {
                    res1 = null;
                }
                const query2 = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.first}", "${answer.last}", (SELECT id FROM role WHERE title = "${answer.role}"), ${res1[0].id})`;
                connection.query(query2, (err, res2) => {
                    if(err) throw err;
                    results(res2);
                });
            });
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What new role title would you like to add?"
            },
            {
                name: "salaryAmount",
                type: "input",
                message: "What is the salary for this new role?"   
            },
            {
                name: "departmentID",
                type: "input",
                message: "What is the department id number?",
            }
        ])
        .then(answer => {
            const query = `INSERT INTO role (title, salary, department_id) VALUES ("${answer.roleTitle}", ${answer.salaryAmount}, ${answer.departmentID})`;
            connection.query(query,
            (err, res) => {
                if(err) throw err;
                results(res);
            });
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: "addDepartment",
                type: "input",
                message: "What new department would you like to add?"
            }
        ])
        .then(answer => {
            const query = `INSERT INTO department (name) VALUES ("${answer.addDepartment}")`;
            connection.query(query, (err, res) => {
                if(err) throw err;
                results(res);
            });
        });
}
// ADD ------------------------------------------------------------

