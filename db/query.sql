SELECT * FROM department;
SELECT * FROM role; 

-- View All Departments --
SELECT * FROM department;

-- View All Roles, JOIN column order: id, title, department(name), salary --
SELECT role.id AS ID, role.title, department.name AS department, role.salary AS salary
FROM role
JOIN department ON role.department_id = department_id;


-- View All Employees, JOIN column order: id, first name, last name, title, department(name), salary, manager(name) -- 
SELECT employee_id, employee.first_name, employee.last_name
FROM employee
JOIN role ON employee.employee_id = employee_id;