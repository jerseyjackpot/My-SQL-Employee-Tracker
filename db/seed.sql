INSERT INTO Employee_schema.department (department_id, name)
VALUES (1, "Accounting");

INSERT INTO Employee_schema.department (department_id, name)
VALUES (2, "Legal");

INSERT INTO Employee_schema.department (department_id, name)
VALUES (3, "Marketing");

INSERT INTO Employee_schema.department (department_id, name)
VALUES (4, "Engineering");


INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (1, "Jr Developer", 40000, 4, 1);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (2, "Senior Developer", 80000, 4, 0);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (3, "Finance Manager", 100000, 1, 1);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (4, "Accountant", 60000, 1, 0);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (5, "Admin", 50000, 1, 0);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (6, "Paralegal", 65000, 2, 0);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (7, "Lawyer", 80000, 2, 0);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (8, "Marketing Lead", 85000, 3, 1);

INSERT INTO Employee_schema.roles (role_id, role_title, role_salary, department_id, manager)
VALUES (9, "Marketing Associate", 65000, 3, 0);


INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (1, "Anthony", "Maddatu", 7, 4);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (2, "Vanessa", "Delacue", 1, Null);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (3, "Ana", "Banana", 3, Null);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (4, "Beth", "Chapman", 4, Null);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (5, "Zorro", "Smith", 3, 7);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (6, "Charlie", "Smith", 2, 2);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (7, "Mustafa", "Dag", 4, Null);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (8, "Matthew", "Wetmore", 2, 7);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (9, "Adam", "Elgindy", 1, 7);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (10, "Madonna", "Ciccone", 2, 2);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (11, "Marguerite", "Murphy", 2, 3);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (12, "Jerry", "Seinfeld", 3, 4);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (13, "Elaine", "Bennis", 4, 7);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (14, "George", "Costanza", 3, 7);

INSERT INTO Employee_schema.employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (15, "Cosmo", "Kramer", 1, 3);



