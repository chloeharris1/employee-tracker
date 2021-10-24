const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log('Connected to the tracker_db database.')
);


const main = () => {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Deparments', 'Add Department']
    })
}



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