// TODO: Include packages needed for this application
const inquirer = require('inquirer')
const fs = require('fs')

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: "Enter your project's title"
    },
    {
        type: 'input',
        name: 'description',
        message: "Enter a description of your project"
    },
    {
        type: 'input',
        name: 'installation',
        message: "Enter installation instructions for your project"
    },
    {
        type: 'input',
        name: 'usage',
        message: "Enter usage instructions for your project"
    },
    {
        type: 'list',
        name: 'license',
        message: "Select a license for your project",
        choices: ['None','GNU AGPLv3','GNU GPLv3','GNU LGPLv3','Mozilla Public License 2.0','Apache License 2.0','MIT License','Boost Software License 1.0','The Unlicense']
    },
    {
        type: 'input',
        name: 'contributing',
        message: "Enter contribution instructions"
    },
    {
        type: 'input',
        name: 'tests',
        message: "Enter testing instructions"
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter your GitHub username"
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter your email address"
    }
];

function licenseBadge(license) {
    switch(license) {
        case 'None': return '';
        case 'GNU AGPLv3': return '![badge](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)\n\n---';
        case 'GNU GPLv3': return '![badge](https://img.shields.io/badge/License-GPLv3-blue.svg)\n\n---';
        case 'GNU LGPLv3': return '![badge](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)\n\n---';
        case 'Mozilla Public License 2.0': return '![badge](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)\n\n---';
        case 'Apache License 2.0': return '![badge](https://img.shields.io/badge/License-Apache%202.0-blue.svg)\n\n---';
        case 'MIT License': return '![badge](https://img.shields.io/badge/License-MIT-yellow.svg)\n\n---';
        case 'Boost Software License 1.0': return '![badge](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)\n\n---';
        case 'The Unlicense': return '![badge](https://img.shields.io/badge/license-Unlicense-blue.svg)\n\n---';
    }
}

function licenseLink(license) {
    switch(license) {
        case 'None': return 'This application has no license';
        case 'GNU AGPLv3': return 'This application is licensed by [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)';
        case 'GNU GPLv3': return 'This application is licensed by [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)';
        case 'GNU LGPLv3': return 'This application is licensed by [GNU LGPLv3](https://choosealicense.com/licenses/lgpl-3.0/)';
        case 'Mozilla Public License 2.0': return 'This application is licensed by [Mozilla Public License 2.0](https://choosealicense.com/licenses/mpl-2.0/)';
        case 'Apache License 2.0': return 'This application is licensed by [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)';
        case 'MIT License': return 'This application is licensed by [MIT License](https://choosealicense.com/licenses/mit/)';
        case 'Boost Software License 1.0': return 'This application is licensed by [Boost Software License 1.0](https://choosealicense.com/licenses/bsl-1.0/)';
        case 'The Unlicense': return 'This application is licensed by [The Unlicense](https://choosealicense.com/licenses/unlicense/)';
    }
}

// TODO: Create a function to write README file
function writeToFile(fileName,data,licBadge,licLink,readmeMarkdown) {
    fs.writeFile('./generated/README.md',readmeMarkdown,error => error ? console.log(error):console.log('README created.'))
}

// TODO: Create a function to initialize app
function init() {
    inquirer.prompt(questions)
    .then(function(ans) {
        var licBadge = licenseBadge(ans.license)
        var licLink = licenseLink(ans.license)
        var fileName = ans.title;
        var data = ans;

        //figure out how to export below instead...module export?
        var readmeMarkdown =

`# ${data.title}
${licBadge}

## Description

${data.description}

---

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contribution](#contribution)
  * [Questions](#questions)
    
---

## Installation

${data.installation}

---

## Usage

${data.usage}
    
---

## License
        
${licLink}
    
---

## Contributing

${data.contributing}
        
---

## Tests

${data.tests}

---

## Questions
        
Feel free to contact me via one of the links below with any questions you may have.

GitHub: [${data.github}](https://github.com/${data.github})

Email: [${data.email}](mailto:${data.email})
`

        writeToFile(fileName,data,licBadge,licLink,readmeMarkdown)})
}

// Function call to initialize app
init();