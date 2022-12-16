
const generate = require('./lib/generate')
const allquestion = require ('./lib/question')

const { prompt } = require('inquirer');

console.log(allquestion.promptQuestions)

function init() {
    inquirer.prompt(allquestion.promptQuestions).then((inquirerResponses) => {
        let responses = inquirerResponses.choice
        switch(responses){
            case 'VIEW_ALL_DEPARTMENTS':
                VIEW_ALL_DEPARTMENTS();
            break;
            case 'VIEW_ALLROLES':
            break;
            case 'VIEW_ALLEMLOYEES':
            break;
            case 'ADD_DEPARTMENT':
            break;
            case 'ADD_ROLE':
            break;
            case 'ADD_EMPLOYEE':
            break;
            case 'UPDATE_EMPLOYEE_ROLE':
            break;
            case 'LEAVE':
            break;
            
        }
    //   console.log('Generating README...');
    //   writeToFile('README.md', generateMarkdown({ ...inquirerResponses }));
    });
  }
  
  init();
  

  function VIEW_ALL_DEPARTMENTS()