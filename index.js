
const {promptQuestions, addDepartment} = require ('./lib/question')
// https://www.npmjs.com/package/figlet
const empDB = require('./db/index');
const inquirer  = require('inquirer');
const cTable = require('console.table');

var figlet = require('figlet');
init();
function init(){
    console.log(
        figlet.textSync("Employee\nTracker\n", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
            })
    )
    startPrompt()
}


function startPrompt() {
    inquirer.prompt(promptQuestions).then((inquirerResponses) => {
        let responses = inquirerResponses.choice
        switch(responses){
            case 'VIEW_ALL_DEPARTMENTS':
                VIEW_ALL_DEPARTMENTS();
            break;
            case 'VIEW_ALLROLES':
                VIEW_ALLROLES();
            break;
            case 'VIEW_ALLEMLOYEES':
                VIEW_ALLEMLOYEES();
            break;
            case 'ADD_DEPARTMENT':
                ADD_DEPARTMENT();
            break;
            case 'ADD_ROLE':
                ADD_ROLE();
            break;
            case 'ADD_EMPLOYEE':
                ADD_EMPLOYEE();
            break;
            case 'UPDATE_EMPLOYEE_ROLE':
                UPDATE_EMPLOYEE_ROLE();
            break;
            case 'LEAVE':
                LEAVE();
            break;
            
        }
    });
}


function VIEW_ALL_DEPARTMENTS () {
    console.clear();
    empDB.allDep()
    .then(([rows]) => {
        console.log(`\n`);
        console.table(rows); 
      })
      .then(()=>startPrompt())
}

function VIEW_ALLROLES () {
    console.clear();
    empDB.allRole()
    .then(([rows]) => {
        console.log(`\n`);
        console.table(rows); 
      })
      .then(()=>startPrompt())
}

function VIEW_ALLEMLOYEES () {
    console.clear();
    empDB.allEmp()
    .then(([rows]) => {
        console.log(`\n`);
        console.table(rows); 
      })
      .then(()=>startPrompt())
}


function ADD_DEPARTMENT() {
    inquirer.prompt(
        addDepartment
    )
    .then(res =>{
        empDB.addDep(res)
        .then(()=>startPrompt())
    })
}

function ADD_ROLE() {
    empDB.allDep()
    .then(([rows]) => {
    const depChoices = rows.map(({ id, name }) => ({
      name: name, 
      value: id
    }));
    inquirer.prompt(
        [
            {
              type: 'input',
              name: 'title',
              message: 'What is the title of the role?'
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What is the salary of the role?'
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'Which department does the role belong to?',
              choices: depChoices
            }
          ]
    )
      .then(res => {
        empDB.addRole(res)
        .then(() => startPrompt());
      })
  })
}

function ADD_EMPLOYEE (){
    inquirer.prompt([
        {
          type:'input',
          name: 'first_name',
          message: "What is the employee's first name?"
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?"
        }
      ])
      .then(resopnse => {
        let firstName = resopnse.first_name;
        let lastName = resopnse.last_name;
        
        empDB.allRole()
        .then(([rows]) => {
          const rolesChoices = rows.map(({ id, title }) => ({
            name: title, 
            value: id
          }));
          
          inquirer.prompt([
            {
              type:'list',
              name: 'role_id',
              message: "What is the employee's role?",
              choices: rolesChoices
            }
          ])
          .then(response => {
            let roleId = response.role_id;
    
            empDB.allEmp()
            .then(([rows]) => {
              const managerChoices = rows.map(({ id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id
              }));
    
              managerChoices.unshift({ name: "None", value: null });
    
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager_id',
                  message: "Who is the employee's manager?",
                  choices: managerChoices
                }
              ])
              .then(res => {
                const newEmployee = {
                  first_name: firstName,
                  last_name: lastName,
                  role_id: roleId,
                  manager_id: res.manager_id
                }
                empDB.addEmp(newEmployee)
                .then(() => startPrompt())
              })
            })
          })
        })
      })
}

function UPDATE_EMPLOYEE_ROLE(){
    empDB.allEmp()
  .then(([rows]) => {
    const employeeChoice = rows.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's role do you want to update?",
        choices: employeeChoice
      }
    ])
    .then(response => {
      let employeeId = response.employeeId;

      empDB.allRole()
      .then(([rows]) => {
        const rolesChoices = rows.map(({ id, title }) => ({
          name: title, 
          value: id
        }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'role_id',
            message: "Which role do you wnat to assing the selected employee?",
            choices: rolesChoices
          }
        ])
        .then(response => {
          empDB.updateEmp("role", employeeId, response)
          .then(() => startPrompt())
        })
      }) 
    })
  })
}

function LEAVE (){
    console.log('Bye!');
    process.exit();
}