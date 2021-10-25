// Installed Packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const console = require('console.table');

// Banner Header
const { bannerPrompt } = require('./banner');

// Connect to mySQL
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
);

// Display employee manager banner
bannerPrompt()

// Main menu
const main = () => {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Deparments', 'Add Department', 'Quit']
    })
    .then((data) => {
        switch (data.choice) {
            case 'View All Deparments':
            viewAllDepartments();
            break;
            case 'View All Roles':
            viewAllRoles();
            break;
            case 'View All Employees': 
            viewAllEmployees();
            break;
            case 'Add Department':
            addDepartment();
            break;
            case 'Add Role':
            addRole();
            break;
            case 'Add Employee':
            addEmployee();
            break;
            case 'Update Employee Role':
            updateEmployeeRole();
            break;
            case 'Quit':
            console.log("Goodbye")
            db.end();
            break;
        }
    })
        
}

main();

// View All Departments (JOIN Left to right: id, name)
function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data);
            main()
        }
    })   
}

// View All Roles 
// Join roles table with department table (Left to right: id, title, department, salary)
function viewAllRoles() {
    db.query('SELECT * FROM roles', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data);
            main()
        }
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee', (err, data) => {
        if (err) {
            throw err;
        } else {
            console.log(data);
            main()
        }
    })  
}

// Add Department 
// What is the name of the department? Then console log (Added "x" to the database)
function addDepartment() {
    inquirer.prompt ([
        {
            type: 'Input',
            name: 'name',
            message: 'What is the name of the department?', 
        },
    ]).then((ans) => {
        db.query('INSERT INTO department WHERE department_id=?', ans.id, (err, data) => {
            console.log ('Added to the database')
        });
        main();
    });

};

// Add Role 
// Which department does the role belong to? (Give user department choices to select)
// Then console log (Added "x" to the database)
function addRole() {
    inquirer.prompt ([
        {
            type: 'Input',
            name: 'title',
            message: 'What is the name of the role?', 
        },
        {
            type: 'Input',
            name: 'salary',
            message: 'What is the salary of the role?', 
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?', 
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        },
        
    ]).then ((ans) => {
        db.query('INSERT INTO role WHERE role_title=?, salary=?, department=?', ans.title, ans.salary, ans.department, (err, data) => {
            console.log('Added (department) to the database')
        });
        main();
    });
};

// Add Employee 
// What is the employee's role? (Give user role choices to select)
// Who is the employee's manager? (Give user manager choices to select)
// Then console log (Added "x" to the database)

function addEmployee() {
    inquirer.prompt ([
        {
            type: 'Input',
            name: 'first_name',
            message: 'What is the employee\'s first name?', 
        },
        {
            type: 'Input',
            name: 'last_name',
            message: 'What is the employee\'s last name?', 
        },
        {
            type: 'list',
            name: 'employee_role',
            message: 'What is the employee\'s role?', 
            choices: ['Sales Lead', 'Sales Person', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employee\'s manager?', 
            choices: []
        },
        
    ]).then ((ans) => {
        db.query('INSERT INTO employee WHERE first_name=?, last_name=?, employee_role=?, manager=?', ans.first_name, ans.last_name, ans.employee_role, ans.manager, (err, data) => {
            console.log('Added (name) to the database')
        });
        main();
    });

};

function updateEmployeeRole() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'employee',
            message: 'Which employee\'s role do you want to update?',
            choices: [] 
        },
        {
            type: 'list',
            name: 'new_role',
            message: 'Which role do you want to assign to the selected employee?',
            choices: [] 
        },
    ]).then((ans) => {
    db.query('INSERT INTO employee WHERE employee=?, new_role=?', ans.employee, ans.new_role, (err, data) => {
        console.log('Updated employee\'s role')
    });
    main();
    });

};











