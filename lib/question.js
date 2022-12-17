
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
                type: 'input',
                name: 'name',
                message: "Which department you'd like to add?",
            }
        ]

// const addRoleQ = [
//     {
//       type: 'input',
//       name: 'title',
//       message: 'What is the title of the role?'
//     },
//     {
//       type: 'input',
//       name: 'salary',
//       message: 'What is the salary of the role?'
//     },
//     {
//       type: 'list',
//       name: 'department_id',
//       message: 'Which department does the role belong to?',
//       choices: depChoices
//     }
//   ]


module.exports = {promptQuestions, addDepartment};