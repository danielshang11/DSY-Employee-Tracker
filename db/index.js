const connection = require('../config')
const mysql = require('mysql2')


class empDB {
    constructor(connection) {
        this.connection = connection;
    }

    allEmp() {
        return this.connection
          .promise()
          .query(
            `SELECT 
            employee.id AS ID,
            CONCAT(employee.first_name, " ", employee.last_name) AS Name, role.title AS Title, department.name AS Department, role.salary AS Salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
            FROM employee
            LEFT JOIN role
            ON employee.role_id = role.id
            LEFT JOIN department
            ON role.department_id = department.id
            LEFT JOIN employee AS manager
            ON manager.id = employee.manager_id;`
            );
    }

    addEmp(employee) {
        return this.connection
        .promise()
        .query(`INSERT INTO employee SET ?`, employee)
        .then(console.log(`\n Employee ${employee.first_name} ${employee.last_name} has been added into the database.`));
    }

    updateEmp(attr,employee_id,role_id){
        return this.connection
        .promise()
        .query("UPDATE employee SET role_id = ? WHERE id = ?", [
        role_id,
        employee_id,
        ])
        .then(console.log(`\nUpdated employee's ${attr}.`))
    }

    deleteEmp(employee){
        return this.connection
        .promise()
        .query(`DELETE FROM employee WHERE ?`, employee )
        .then(console.log(`\nEmployee ${employee.first_name} ${employee.last_name} has been removed from the database.`))
    }

    allRole(){
        return this.connection
        .promise()
        .query(`SELECT * FROM role`)
        .then(console.log(`\nHere are the all Roles.`)) 
    }

    addRole(role){
        return this.connection
        .promise()
        .query(`INSERT INTO role SET ?`,role)
        .then(console.log(`\nRole ${role.title} has been added into the database.`))
    }

    deleteRole(role){
        return this.connection
        .promise()
        .query(`DELETE FROM role WHERE ?`, role )
        .then(console.log(`\n${role.title} has been removed from the database.`))
    }

    allManager(managerId){
        return this.connection
        .promise()
        .query(`
        SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, roles.title FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        WHERE employee.manager_id = ?`, managerId)
        .then(console.log(`\n All the managers are Here.`)) 
    }

    allDep(){
        return this.connection
        .promise()
        .query(`SELECT * FROM department`)
        .then(console.log(`Here are the all Departments.`))
    }

    addDep(department){
        return this.connection
        .promise()
        .query(`INSERT INTO department SET ?`, department)
        .then(console.log(`\n ${department.name} has been added as a department into the database.`))
    }

    deleteDep(department){
        return this.connection
        .promise()
        .query(`DELETE FROM department WHERE ?`, department)
        .then(console.log(`\n ${department.name} has been removed from the database.`))
    }
}

module.exports = new empDB(connection)