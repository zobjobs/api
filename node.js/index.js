/*
zobjobs.com API example

This example will call the zobjobs API, return results & show the titles
Subsequent calls are then made every hour.

Other fields are available from the call.
Contact support at zobjobs.com with any qustions
*/

const
    request = require('request'),
    anHour = 3600000; // This is 1 hour in milliseconds - dont change it


main()
async function main() {
    var results = await apiCall(); // make an initial call to the API
    await showResults(results); // call the showResults function 

    setInterval(async () => {
        results = await apiCall();
        await showResults(results);
    }, anHour) // make a call every hour
}

async function apiCall() {
    return new Promise((resolve) => {
        var options = {
            uri: 'https://zobjobs.com/api/jobs',
            method: 'GET'
        };

        try {
            request(options, function (error, response, body) { // Call the zobjobs API
                if (error) {
                    // There was an error. Display it and return from function
                    console.log('response', error)
                    resolve(false) // 
                }
                //console.log(body)
                resolve(body) // return results
            });
        } catch (error) {
            // There was an error so display it and return
            console.log('apiCall Error: ', e)
            resolve(false)
        }
    })
}

async function showResults(results) {
    if (!results) {
        return // Do not process this 
    }

    try {
        var json = JSON.parse(results) // parse the string from the API
        for (job of json.jobs) { // loop through all the jobs
            console.log(job.title); // Display the job tile to console.
        }
    } catch (error) {
        console.log('showResults Error: ', error) // Show any errors
    }
    return
}
