const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "TEST",
  database: "Employee_schema"
});

connection.connect(function (err) {
  console.log("Connected");
  if (err) throw err;
  start();

});
// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Departments",
        // "Review Department Budget",
        "View Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Remove Employee",
        "Remove Role",
        "Remove Department",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View Departments":
          viewDepartments();
          break;

        // case 'Review Department Budget':
        //   deptBudget();
        //   break;

        case "View Roles":
          viewRoles();
          break;

        case "View All Employees":
          viewEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Remove Employee":
          removeEmp();
          break;

        case 'Remove Role':
          removeRole();
          break;
        case 'Remove Department':
          removeDept();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });

}


//View all departments:
function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("");
    start();
  });
}

// To be corrected at a later time.  
//   function deptBudget(){
//     let depts = [];
//     connection.query('SELECT name FROM department', function(err, res){
//         if(err) throw err;
//         for(i=0; i<res.length; i++){
//             depts.push(res[i].name)
//         }
//         inquirer.prompt(
//             [
//                 {
//                     type: 'list',
//                     message: 'Which Dept? ',
//                     name: 'chosenDept',
//                     choices: depts
//                 }
//             ]
//         ).then(deptData =>{
//             connection.query('SELECT department_id from department WHERE ?', {name: deptData.chosenDept}, function(err, res){
//                 if(err) throw err;
//                 connection.query('SELECT SUM(role_salary) FROM roles WHERE ?',{roles: res[0].id}, function(err, res){
//                     if(err) throw err;
//                     console.log(res);
//                     start();
//                 })
//             })
//         })
//     })
// }

//View all roles:
function viewRoles() {
  const query = "SELECT role_id, role_title FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("\n");
    console.table(res);
    console.log("\n");
    start();
  });
}

//View all employees:
function viewEmployees() {
  const query = "SELECT employee.first_name, employee.last_name, roles.role_title, roles.role_salary, " +
    "department.name FROM employee " +
    "LEFT JOIN roles on employee.role_id = roles.role_id " +
    "LEFT JOIN department on roles.department_id = department.department_id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    console.log("");
    start();
  });
}


//Add a department:
function addDepartment() {
  inquirer.prompt({
    name: "department",
    type: "input",
    message: "What department would you like to add?"
  })
    .then(function (answer) {
      connection.query("INSERT INTO department SET ?", { name: answer.department }, function (err) {
        if (err) throw err;
        console.log(`${answer.department} department was successfully updated. \n`);
        start();
      });
    });
}

//Add a role:
function addRole() {
  let array = [];
  const query = "SELECT department_id as value, name as name FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    array = JSON.parse(JSON.stringify(res));
    const questions = [
      {
        type: "input",
        name: "name",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this new role?",
      },
      {
        type: "list",
        name: "department",
        message: "To which department does the new roll belong?",
        choices: array
      },
      {
        type: "confirm",
        name: "manager",
        message: "Is this a manager role?",
        default: false
      }];

    inquirer.prompt(questions).then(answer => {
      connection.query("INSERT INTO roles (role_title, role_salary, department_id, manager) VALUES (?, ?, ?, ?)",
        [answer.name, answer.salary, answer.department, answer.manager], function (err, res) {
          if (err) throw err;
          if (res.affectedRows > 0) {
            console.log(res.affectedRows + " record added successfully!");
          }
          console.log("");
          start();
        });
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is your first name?"
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your last name?"
    }
  ]).then(function (answer) {
    const query = "SELECT role_id as value, role_title as name FROM roles WHERE manager = 0";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let array = JSON.parse(JSON.stringify(res));
      inquirer
        .prompt(
          {
            name: "role",
            type: "list",
            message: "Choose a role for the new employee",
            choices: array
          }).then(function (answer1) {
            var query = "SELECT employee.employee_id as value, CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee INNER JOIN roles ON employee.role_id = roles.role_id WHERE roles.manager = 1;";
            connection.query(query, function (err, res) {
              if (err) throw err;
              let array2 = JSON.parse(JSON.stringify(res));
              inquirer
                .prompt({
                  name: "manager",
                  type: "list",
                  message: "Assign a manager for the new employee",
                  choices: array2
                }).then(function (answer2) {
                  connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)",
                    [answer.first_name, answer.last_name, answer1.roles, answer2.manager], function (err, res) {
                      if (err) throw err;
                      if (res.affectedRows > 0) {
                        console.log(res.affectedRows + " record added successfully!");
                      }
                      console.log("");
                      start();
                    });
                });
            });
          });
    });
  });
}

function updateEmployeeRole() {
  //let array = [];
  const query = "SELECT employee.employee_id as value, " +
    "CONCAT(employee.first_name, ' ', employee.last_name) as name FROM employee WHERE manager_id IS NOT NULL";
  connection.query(query, function (err, res) {
    if (err) throw err;
    let array = JSON.parse(JSON.stringify(res));
    inquirer
      .prompt({
        name: "employee",
        type: "list",
        message: "Which employee\"s role do you want to change?",
        choices: array
      }).then(function (answer1) {
        const query = "SELECT role_id as value, role_title as name FROM roles WHERE manager = 0";
        connection.query(query, function (err, res) {
          if (err) throw err;
          let array2 = JSON.parse(JSON.stringify(res));
          inquirer
            .prompt({
              name: "roles",
              type: "list",
              message: "Which is the new role?",
              choices: array2
            }).then(function (answer2) {
              connection.query("UPDATE employee SET role_id = ? WHERE employee_id = ?",
                [answer2.roles, answer1.employee], function (err, res) {
                  if (err) {
                    if (err.errno === 1451) {
                      console.log("You cannot delete this record because of foreign key constrait!");
                    } else {
                      console.log("An error occured!");
                    }
                    return start();
                  }
                  if (res.affectedRows > 0) {
                    console.log(res.affectedRows + " record updated successfully!");
                  }
                  console.log("");
                  start();
                });
            });
        });
      });
  });
}

function removeEmp() {
  let emps = [];
  connection.query('SELECT first_name FROM employee', function (err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      emps.push(res[i].first_name);
    }
    inquirer.prompt(
      [
        {
          type: 'list',
          name: 'delEmp',
          message: 'Employee for Deletion: ',
          choices: emps
        }
      ]
    ).then(chosenEmp => {
      var empQuery = 'DELETE FROM employee WHERE ?'
      connection.query(empQuery, { first_name: chosenEmp.delEmp }, function (err, res) {
        if (err) throw err;
        console.log(chosenEmp.delEmp + " successfully deleted!")
        start();
      })
    })
  })
};

function removeRole() {
  let roles = [];
  connection.query('SELECT role_title FROM roles', function (err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      roles.push(res[i].role_title)
    }
    inquirer.prompt(
      [
        {
          type: 'list',
          name: 'delrole',
          message: 'Which role would you like to delete?',
          choices: roles
        }
      ]
    ).then(chosenrole => {
      var rolequery = 'DELETE FROM roles WHERE ?'
      connection.query(rolequery, { role_title: chosenrole.delrole }, function (err, res) {
        if (err) throw err;
        console.log(chosenrole.delrole + " successfully deleted!")
        start();
      })
    })
  })
}

function removeDept() {
  let depts = [];
  connection.query('SELECT name FROM department', function (err, res) {
    if (err) throw err;
    for (i = 0; i < res.length; i++) {
      depts.push(res[i].name)
    }
    inquirer.prompt(
      [
        {
          type: 'list',
          name: 'deldept',
          message: 'Which department would you like to delete?',
          choices: depts
        }
      ]
    ).then(chosendept => {
      var deptquery = 'DELETE FROM department WHERE ?'
      connection.query(deptquery, { name: chosendept.deldept }, function (err, res) {
        if (err) throw err;
        console.log(chosendept.deldept + " successfully deleted!")
        start();
      })
    })
  })
}




//Exit
function exit() {
  connection.end();
}