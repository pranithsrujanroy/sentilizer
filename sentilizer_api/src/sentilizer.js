const { promisify } = require('util');
let { PythonShell } = require('python-shell');
let python_shell_run = promisify(PythonShell.run);

export function sentilize(sentence) {
    return new Promise(
        (resolve, reject) => {
            let options = {
                scriptPath: '/Users/pranithsru.maddineni/git/webdev/sentilizer_api/src',
                args: ['-s', '\"' + sentence + '\"']
            };
            python_shell_run('vader.py', options)
                .then(results => {
                    let sentiment = results[0];
                    let response = { sentiment: 'Neutral' };
                    if (sentiment == 'neg') {
                        response.sentiment = 'Negative';
                    }
                    else if (sentiment == 'pos') {
                        response.sentiment = 'Positive';
                    }
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        }
    );
}