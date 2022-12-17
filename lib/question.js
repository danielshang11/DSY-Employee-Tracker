const { ADD_ROLE } = require ('../lib/generate')
const promptQuestions = [
    {
        type: 'list',
        name: 'choice',
        message:'What would you like to do?',
        choices: [
            {
                name: 'View all departments',
                value: 'VIEW_ALL_DEPARTMENTS',
            },
            {
                name:'View all roles',
                value:'VIEW_ALLROLES',
            },
            {
                name:'View all employees',
                value:'VIEW_ALLEMLOYEES',
            },
            {
                name:'Add a department',
                value:'ADD_DEPARTMENT',
            },
            {
                name:'Add a role',
                value:'ADD_ROLE',
            },
            {
                name:'Add an employee',
                value:'ADD_EMPLOYEE',
            },
            {
                name:'Update an employee role',
                value:'UPDATE_EMPLOYEE_ROLE',
            },
            {
                name:'Leave',
                value:'LEAVE',
            }
        ]
    }
]
    
const addDepartment = [
    {
        type: "input",
        message: "Which department you'd like to add?",
        name: "new_department"
    }
]

const addRole = [
    {
        type: "input",
        message: "What do you want to name the new role?",
        name: "new_role"
    },
    {
        type: "input",
        message: "What is salary of the new role?",
        name: "new_rolesalary"
    }
]

// const departmentChoice = {
//     type: "list",
//     message: "What department does the new role belong to?",
//     name: "new_role_department",
//     choices: department
// }

module.exports = {promptQuestions, addDepartment, addRole};