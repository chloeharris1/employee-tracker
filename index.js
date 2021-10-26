// Import Inquirer
const inquirer = require('inquirer');
// Import mySql2
const mysql = require('mysql2');
// Import console.table
require('console.table');

// Banner Header
const { bannerPrompt } = require('./prompts/banner');

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
        .then((answers) => {
            switch (answers.choice) {
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

// View All Departments (id, name)
function viewAllDepartments() {
    db.query(`SELECT * FROM department`, (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table(data);
            main()
        }
    })
}

// View All Roles 
function viewAllRoles() {
    db.query(`SELECT role.id, role.title,role.salary,department.department.name 
    FROM role, department 
    WHERE role.department_id=department.id`, (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table(data);
            main()
        }
    })
}

function viewAllEmployees() {
    db.query(`
        SELECT
            employee.id,
            employee.first_name,
            employee.last_name,
            role.title AS job_title,
            role.salary AS salary,
            managers.first_name AS manager_first_name,
            managers.last_name AS manager_last_name,
            department.name AS department_name
        FROM
            employee
            LEFT JOIN employee managers ON employee.manager_id = managers.id,
            department,
            role
        WHERE
            employee.role_id = role.id
            AND role.department_id = department.id
        `, (err, data) => {
        if (err) {
            throw err;
        } else {
            console.table(data);
            main()
        }
    })
}

// Add Department 
function addDepartment() {
    inquirer.prompt([
        {
            type: 'Input',
            name: 'name',
            message: 'What is the name of the department?',
        },
    ]).then((ans) => {
        // console.log(ans);
        db.query(`INSERT INTO department SET ?`, ans)
        main();
    });

};

// Add Role 

function addRole() {
    inquirer.prompt([
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

    ]).then((ans) => {
        // console.log(ans);
        db.query(`INSERT INTO role SET ?`, ans)
        main();
    });
};

// Add Employee 

async function addEmployee() {

    const allRolesRaw = await db.promise().query('SELECT * FROM role');

    const role = allRolesRaw[0].map((role) => {
        return {
            name: role.title,
            value: role.id
        }
    });


    const allEmployeeRaw = await db.promise().query('SELECT * FROM employee');

    const employees = allEmployeeRaw[0].map((employee) => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });

    inquirer.prompt([
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
            name: 'role_id',
            message: 'What is the employee\'s role?',
            choices: role
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Who is the employee\'s manager?',
            choices: employees
        }
    ]).then((ans) => {

        // console.log(ans);

        db.query(`INSERT INTO employee SET ?`, ans)
        main();
    });

};

async function updateEmployeeRole() {
    const allRolesRaw = await db.promise().query('SELECT * FROM role');


    const role = allRolesRaw[0].map((role) => {
        return {
            name: role.title,
            value: role.id
        }
    });


    const allEmployeeRaw = await db.promise().query('SELECT * FROM employee');


    const employees = allEmployeeRaw[0].map((employee) => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    });
    inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'Which role do you want to assign to the selected employee?',
            choices: role
        },
        {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee\'s role do you want to update?',
            choices: employees
        },
    ]).then((ans) => {
        db.query(`UPDATE employee SET role_id = ? WHERE id= ?`, [ans.role_id, ans.employee_id]);

        main();
    });

};









