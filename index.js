// const generate = require('./lib/generate')
const {promptQuestions} = require ('./lib/question')
// https://www.npmjs.com/package/figlet
const empDB = require('./db');
const inquirer  = require("inquirer");
const cTable = require("console.table");
const { start } = require('repl');
// require( " console.table " );
// import inquirer from 'inquirer';
// import db from './db/connection';
// import allquestion from './lib/question';
init();
function init(){
    console.log('Welcome to the greatest Employee Tracker!')
    start()
}


function start() {
    inquirer.prompt(promptQuestions).then((inquirerResponses) => {
        let responses = inquirerResponses.choice
        switch(responses){
            case 'VIEW_ALL_DEPARTMENTS':
                VIEW_ALL_DEPARTMENTS;
            break;
            case 'VIEW_ALLROLES':
                VIEW_ALLROLES;
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
                console.log('got');
                // LEAVE();
            break;
            
        }
    });
}
start();

function VIEW_ALL_DEPARTMENTS () {
    console.clear();
    empDB.allDep()
    .then(([rows]) => {
        console.log(`\n`);
        console.table(rows); 
      })
      .then((=>start()))
}

function VIEW_ALLROLES () {
    console.clear();
    empDB.allRole()
    .then(([rows]) => {
        console.log(`\n`);
        console.table(rows); 
      })
      .then((=>start()))
}

function VIEW_ALLEMLOYEES () {
    console.clear();
    empDB.allEmp()
    .then(([rows]) => {
        console.log(`\n`);
        console.table(rows); 
      })
      .then(()=>start())
}


function ADD_DEPARTMENT() {
    inquirer.prompt(addDepartment)
    .then(res =>{
        empDB.addDep(res)
        .then(()=>start())
    })
}

function ADD_ROLE() {
    empDB.allDep()
    .then(([rows]) => {
    const depChoices = rows.map(({ id, name }) => ({
      name: name, 
      value: id
    }));
    inquirer.prompt([
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
    ])
      .then(res => {
        empDB.addRole(res)
        .then(() => start());
      })
  })
}