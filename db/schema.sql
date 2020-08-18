DROP DATABASE IF EXISTS Employee_schema;

CREATE DATABASE Employee_schema;

USE Employee_schema;

CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL, 
PRIMARY KEY (id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT, 
title VARCHAR(30) NOT NULL,
salary DECIMAL (10,2) NOT NULL, 
department_id INT NOT NULL, 
FOREIGN KEY (department_id) REFERENCES departments(id),
PRIMARY KEY (id)
);
CREATE TABLE employees (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR (30) NOT NULL, 
role_id INT  NOT NULL,
FOREIGN KEY (role_id) REFERENCES roles(id), 
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employees(id),
PRIMARY KEY(id)
)
