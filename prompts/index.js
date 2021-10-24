const inquirer = require('inquirer');
const mysql = require('mysql2');
const { bannerPrompt } = require('./banner');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
);

bannerPrompt()

const main = () => {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Deparments', 'Add Department']
    })
    .then((data) => {
        switch (data.choice) {
            case 'View All Employees': 
            viewAllEmployees();
            break;
            case 'Add Employee':
            addEmployee();
            break;
            case 'Update Employee Role':
            updateEmployeeRole();
            break;
            case 'View All Roles':
            viewAllRoles();
            break;
            case 'Add Role':
            addRole();
            break;
            case 'View All Deparments':
            viewAllDepartments();
            break;
            case 'Add Department':
            addDepartment();
            break;
        }
    })
        
}


main()


// .then((data) => {
//     if (data.choice === 'View All Employees') {
//         db.query('SELECT * FROM employee', (err, data) => {
//             if (err) {
//                 throw err;
//             } else {
//                 console.log(data)
//             }
//         })




// -- What would you like to do? --
// -- View All Employees
// -- Update Employee Role


// -- View All Departments (Left to right: id, name)

// -- View All Roles 
//     -- Join roles table with department table (Left to right: id, title, department, salary)


// -- Add Department 
//     -- What is the name of the department? Then console log (Added "x" to the database)

// -- Add Role 
//     -- What is the name of the role?
//     -- What is the salary of the role?
//     -- Which department does the role belong to? (Give user department choices to select), Then console log (Added "x" to the database)

// -- Add Employee 
//     -- What is the employee's first name?
//     -- What is the employee's last name?
//     -- What is the employee's role? (Give user role choices to select)
//     -- Who is the employee's manager? (Give user department choices to select), Then console log (Added "x" to the database)