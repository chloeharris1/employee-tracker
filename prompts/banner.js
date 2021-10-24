const figlet = require ('figlet');

function bannerPrompt () {
    console.log(figlet.textSync('EMPLOYEE', {
        font: 'standard'
    }));
    console.log(figlet.textSync('MANAGER', {
        font: 'standard'
    }));
}

module.exports = {
    bannerPrompt,
}