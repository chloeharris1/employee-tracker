SELECT * FROM department; 

SELECT * FROM role; 

-- View All Roles, JOIN with department table ==
SELECT role.id, role.title, role.salary
FROM role
JOIN department ON role.department_id = department_id;

