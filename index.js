// const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./connection')

// Connect to database

connection.connect(function() {
startApp()
})

const opt = ["ALL_DEPT", "ALL_ROLES", "ALL_EMPLOYEES", "ADD_DEPARTMENT", "ADD_ROLES", "ADD_EMPLOYEES", "UPDATE_ROLL"];

function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "userview",
            message: "What you want to see?",
            choices: opt
        }
    ])
        .then((ans) => {
            console.log(ans);
            switch (ans.userview) {
                case opt[0]:
                    // queryFunctions.allDepts();
                    allDepts();
                    break;
                    case opt[2]:
                    allEmployees();
                        break;
                        case opt[0]:
                    //         // queryFunctions.allDepts();
                    //         allDepts();
                    //         break;
                case opt[5]:
                    addEmployees();
                    break;


                default:
                    break;
            }
        })
}

function allDepts() {
    connection.query('SELECT * FROM department', function (err, results) {
        if (err) throw err
        console.table(results);
        startApp();
    });
}

function allEmployees() {
    connection.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err
        console.table(results);
        startApp();
    });
}

// function allDepts() {
//     connection.query('SELECT * FROM department', function (err, results) {
//         if (err) throw err
//         console.table(results);
//         startApp();
//     });
// }

function addEmployees() {
    connection.query('SELECT * FROM emp_role', function(err, results) {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is Employees first name?"
            },
            {
            type: "input",
            name: "last_name",
            message: "What is Employees last name?"
            },
            {
                type: "list",
                name: "role_title",
                message: "What is the employee's role?",
                choices: results.map(role => role.title)
            }
        ]) .then(response => {
            const selectedRole = results.find(role => role.title === response.role_title)
            connection.query('INSERT INTO employee SET ?', {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: selectedRole.id
            })
            startApp()
        })
    });
}
// write function to query employee table to slect existing employee db.query .map for employee first name insert into inquirer prompt .then query role table select role .then update emnployee with response from role id