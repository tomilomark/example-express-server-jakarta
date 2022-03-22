// // Simple usage of callback
// function greeting(name) {
//     console.log('Hello ' + name);
// }
//
// function processUserInput(callback) {
//     var name = prompt('Please enter your name.');
//     callback(name);
// }
//
// processUserInput(greeting);

/*
  Rewrite using async/await
*/
function greeting(name) {
    console.log('Hello ' + name);
}

async function processUserInput() {
    const name = prompt('Please enter your name.');
    if (!name) {
        return Promise.reject(null);
    }

    return Promise.resolve(name);
}

(async () => {
    const userName = await processUserInput()
    greeting(userName);
})();

