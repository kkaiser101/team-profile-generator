const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require("./lib/Employee.js");
const Manager = require("./lib/Manager.js");
const Engineer = require("./lib/Engineer.js");
const Intern = require("./lib/Intern.js");
const generateHTML = require('./src/generateHTML.js');

//We declare this team array in the global scope so that our function can continuosly add members to it
let team = [];


async function callInquirers() {

    const inq1 = await inquirer.prompt([
        {
            type: 'list',
            name: 'title',
            message: 'What is this employees title?',
            choices: [
                "Manager",
                "Intern",
                "Engineer",
            ]
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "If you selected Manager, enter the managers office number. Otherwise type N/A",
        },
        {
            type: 'input',
            name: 'github',
            message: "If you selected Engineer, enter the engineers github username. Otherwise type N/A",
        },
        {
            type: 'input',
            name: 'school',
            message: "If you selected Intern, enter the interns school. Otherwise type N/A",
        },
        {
            type: 'input',
            name: 'name',
            message: "What is this employees name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is this employees ID?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is this employees email address?",
        }
    ])
    .then((data) => {

        employeeInfo = new Employee(data);

        if(data.officeNumber != "N/A") {
            const managerData = new Manager(data);
            team.push(managerData);
        } else if(data.github != "N/A") {
            const engineerData = new Engineer(data);
            team.push(engineerData);
        } else if(data.school != "N/A") {
            const internData = new Intern(data);
            team.push(internData);
        }

        console.log(team);
    })

    const inq2 = await inquirer.prompt([
        {
            type: 'list',
            name: 'confirm',
            message: 'Are you done adding team members?',
            choices: [
                "Yes",
                "No",
            ]
        }
    ])
    .then((response) => {
        if(response.confirm === "No"){
            callInquirers();
        } else {
            htmlPage = generateHTML(team);
            fs.writeFile('./dist/index.html', htmlPage, (err) =>
            err ? console.log(err) : console.log('A webpage with your teams information has been created'))
                // for (var i = 0; i < team.length; i++){
                
                //     var employeeCard = document.createElement('card');
            
                //     var employeeTitle = document.createElement('h1');
                //     employeeTitle.textContent = team[i].title;
                //     employeeCard.appendChild(employeeTitle);
            
                //     var employeeName = document.createElement('p');
                //     employeeName.textContent = team[i].name;
                //     employeeCard.appendChild(employeeName);
            
                //     var employeeID = document.createElement('a');
                //     employeeID.textContent = team[i].id;
                //     employeeCard.appendChild(employeeID);
            
                //     document.body.appendChild(employeeCard);
                // }
        }
    })
}

callInquirers();
