const inquirer = require('inquirer');
// const mysql = require('mysql');
const cTable = require('console.table');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'employeeTracker_db'
// });

// connection.connect(err => {
//     if(err) throw err;
//     console.log(`MySQL connected on ${connection.threadId}`);
//     runEmployeeTracker();
// });

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

function runEmployeeTracker() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: actionChoices
        })
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
                case actionChoices[-1]:
                    exitEmployeeTracker();
                    break;
            }
        });
}

function exitEmployeeTracker() {
    connection.end();
    process.exit();
}

runEmployeeTracker();