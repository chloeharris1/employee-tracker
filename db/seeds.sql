USE tracker_db;

INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'); 

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 4),
       ('Sales Person', 80000, 4),
       ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1), 
       ('Account Manager', 160000, 2),
       ('Accountant', 125000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lucy', 'Ricardo', 1, NULL),
       ('Marion', 'Strong', 2, 1),
       ('Ricky', 'Ricardo', 3, NULL),
       ('Eddie', 'Grant', 4, 1),
       ('Fred', 'Mertz', 4, NULL),
       ('Betty', 'Ramsey', 5, 2),
       ('Ethel', 'Mertz', 6, NULL), 
       ('Freddy', 'Filmore', 6, 2);
