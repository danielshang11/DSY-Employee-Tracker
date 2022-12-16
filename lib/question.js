class allquestion {
    promptQuestions = [
        {
            type: 'list',
            name: 'choice',
            message:'What would you like to do?',
            choice: [
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
}

module.exports = allquestion;