const fs = require('fs');
const { exec } = require('child_process');
const inquirer = require('inquirer');
const npm = JSON.parse(fs.readFileSync('./package.json'));

let version = {
    major: npm.version.split('.')[0],
    minor: npm.version.split('.')[1],
    patch: npm.version.split('.')[2]
};

inquirer.prompt([
    {
        choices: ['major', 'minor', 'patch'],
        type: 'list',
        name: 'version'
    }
]).then(response => {
    ++version[response.version];

    exec(`npm version ${version.major}.${version.minor}.${version.patch} && git push --tags`);
});
