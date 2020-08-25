DROP DATABASE IF EXISTS Employee_schema;
CREATE database Employee_schema;

USE Employee_schema;

CREATE TABLE department (
  department_id INT AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (department_id) NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT,
  role_title VARCHAR(30) NOT NULL,
  role_salary DECIMAL(8,0) NULL,
  department_id INT NOT NULL,
  manager BOOLEAN NOT NULL default 0, 
  PRIMARY KEY (role_id) NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(department_id) ON DELETE CASCADE
);

CREATE TABLE employee (
  employee_id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (employee_id) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE
);
