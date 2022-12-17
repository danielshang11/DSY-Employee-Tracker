// const { default: inquirer } = require('inquirer');
const db = require('../db/connection');
const {addDepartment, addRole} = require ('../lib/question')
const cTable = require("console.table");
const  inquirer  = require("inquirer");

const VIEW_ALL_DEPARTMENTS = () => {
    console.clear();
    db.query(`
        SELECT department.id AS ID,
        department.name AS Departments
        FROM department;        
        `, (err, data) => {
            if (err) throw err;
            console.table(data);
        }
    )
    init();
};

const VIEW_ALLROLES = ()=>{
    console.clear();
    db.query(
        `
        SELECT 
        role.id AS ID,
        role.title AS Title,
        role.salary AS Salary,
        department.name AS Department
        FROM role
        LEFT JOIN department
        ON role.department_id = department.id;
        `,(err,data) => {
            if(err) throw err;
            console.table(data);
        }
    )
    init ();
};

const VIEW_ALLEMLOYEES = () => {
    console.clear();
    db.query(
        `
        SELECT 
        employee.id AS ID,
        CONCAT(employee.first_name, " ", employee.last_name) AS Name, 
        role.title AS Title,
        department.name AS Department, 
        role.salary AS Salary,
        CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM employee
        LEFT JOIN role
        ON employee.role_id = role.id
        LEFT JOIN department
        ON role.department_id = department.id
        LEFT JOIN employee AS manager
        ON manager.id = employee.manager_id;
        `,(err,data) => {
            if(err) throw err;
            console.table(data);
        }
    )
    init ();
};

const ADD_DEPARTMENT = () => {
    console.clear();
    inquirer.prompt(addDepartment)
        .then((res) => {
            const newDepartment = res.newDepartment;
            db.query(
                `
                INSERT INTO department (name)
                VALUES ("${newDepartment}");
                `,(err,data) => {
                    if(err) throw err;
                    console.log('New Department has been added!');
                    console.clear();
                    init();
                })
        })
    init();
};




const ADD_ROLE = () => {
    console.clear();
    inquirer.prompt(addRole)
        .then((res) => {
            const newRole = res.newRole;
            const new_rolesalary = res.new_rolesalary;
            db.query(
                `
                SELECT department.name FROM department;
                `,(err,data) => {
                    if(err) throw err;
                    const department = data.map((e)=>{return e.name});
                    // department cant import to question
                    inquirer
                        .prompt({
                            type: "list",
                            message: "What department does the new role belong to?",
                            name: "new_role_department",
                            choices: department
                            })
                        .then((res) => {
                            const newRoleDepartment = res.new_role_department;
                            db.query(
                                `
                                SELECT department.id FROM department WHERE department.name = "${newRoleDepartment}";
                                `,(err,data) => {
                                if(err) throw err;
                                const newRoleDepartmentID = data[0].id;
                                db.query(`
                                    INSERT INTO role (title, salary, department_id)
                                    VALUES ("${newRole}", "${new_rolesalary}", ${newRoleDepartmentID});
                                    `, (err, data) => {
                                    if (err) throw err;
                                    console.log('New Role has been added!');
                                    console.clear();
                                })
                        })
                        })
                })
        })
    init ();
};

const ADD_EMPLOYEE = () => {
    console.clear();
    inquirer.prompt(addingEmployee)
                        .then((res) => {
                            const newFirstName = res.first_name;
                            const newLastName = res.last_name;

                            // Adding employee - prompting to add role
                            db.query(`
                                SELECT role.title FROM role;
                            `, (err, data) => {
                                if (err) throw err;
                                const mapData = data.map((obj) => obj.title);
                                inquirer.prompt({
                                    type: "list",
                                    message: "What is the new employee's role?",
                                    name: "new_role",
                                    choices: mapData
                                })
                                    .then((res) => {
                                        const newRole = res.new_role;
                                        db.query(`
                                            SELECT role.id FROM role WHERE role.title = "${newRole}";
                                        `, (err, data) => {
                                            if (err) throw err;
                                            const newRoleID = data[0].id;

                                            // Adding employee - prompting to add manager
                                            db.query(`
                                                SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name
                                                FROM employee
                                                WHERE employee.manager_id IS NULL;
                                            `, (err, data) => {
                                                if (err) throw err;
                                                const mapData = data.map((obj) => {return obj.name});
                                                const concatData = mapData.concat("None");
                                                inquirer.prompt({
                                                    type: "list",
                                                    message: "Who is the new employee's manager?",
                                                    name: "new_manager",
                                                    choices: concatData
                                                })
                                                    .then((res) => {
                                                        const newManager = res.new_manager;
                                                        db.query(`
                                                            SELECT employee.id FROM employee WHERE CONCAT(employee.first_name, ' ', employee.last_name) = "${newManager}";
                                                        `, (err, data) => {
                                                            if (err) throw err;
                                                            const newManagerID = data[0].id;

                                                            // Adding new employee into database
                                                            db.query(`
                                                                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                                                VALUES ("${newFirstName}", "${newLastName}", ${newRoleID}, ${newManagerID});
                                                            `, (err, data) => {
                                                                if (err) throw err;
                                                                console.log("-----NEW EMPLOYEE ADDED TO DATABASE!-----");
                                                                console.log(" ");
                                                                
                                                            })
                                                        })

                                                    })
                                            })
                                        })

                                    })
                            })
                        })
    
    init ();
};

const UPDATE_EMPLOYEE_ROLE = () => {
    console.clear();
    db.query(`
                        SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name FROM employee;
                    `, (err, data) => {
                        if (err) throw err;
                        const employeeName = data.map((obj) => {return obj.name});
                        inquirer.prompt({
                            type: "list",
                            message: "Which employee do you want their role updated?",
                            name: "employee_update_name",
                            choices: employeeName
                        })
                            .then((res) => {
                                const employeeUpdateName = res.employee_update_name;
    
                                // Updating employee role - prompting for the new role
                                db.query(`
                                    SELECT role.title FROM role;
                                `, (err, data) => {
                                    if (err) throw err;
                                    const roleForUpdate = data.map((obj) => {return obj.title})
                                    inquirer.prompt({
                                        type: "list",
                                        message: "What will be the employee's new role?",
                                        name: "employee_update_role",
                                        choices: roleForUpdate
                                    })
                                        .then((res) => {
                                            const employeeUpdateRole = res.employee_update_role;
    
                                            db.query(`
                                                SELECT role.id FROM role WHERE role.title = "${employeeUpdateRole}";
                                            `, (err, data) => {
                                                if (err) throw err;
                                                const employeeUpdateRoleID = data[0].id;
    
                                                // Updating employee role in database
                                                db.query(`
                                                    UPDATE employee
                                                    SET role_id = ${employeeUpdateRoleID}
                                                    WHERE CONCAT(employee.first_name, ' ', employee.last_name) = "${employeeUpdateName}";
                                                `, (err, data) => {
                                                    if (err) throw err;
                                                    console.log("-----EMPLOYEE'S ROLE HAS BEEN UPDATED!-----");
                                                    console.log(" ");
                                                    askMainPrompt();
                                                })
                                            })
                                        })
                                }) 
                            })
                    })
    init ();
};

const LEAVE = () => {}

module.exports = {
    VIEW_ALL_DEPARTMENTS,
    VIEW_ALLROLES,
    VIEW_ALLEMLOYEES,
    ADD_DEPARTMENT,
    ADD_ROLE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE_ROLE,
    LEAVE,
};