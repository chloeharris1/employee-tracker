USE tracker_db;

INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'); 

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Sales Person', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2), 
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Lucy', 'Ricardo', 1, NULL),
       ('Marion', 'Strong', 5, 1),
       ('Ricky', 'Ricardo', 2, NULL),
       ('Eddie', 'Grant', 6, 1),
       ('Fred', 'Mertz', 3, NULL),
       ('Betty', 'Ramsey', 8, 2),
       ('Ethel', 'Mertz', 4, NULL), 
       ('Freddy', 'Filmore', 7, 2);
