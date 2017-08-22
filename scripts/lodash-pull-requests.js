var request = require('request');
var whilst = require('async/whilst');

var baseUrl ='https://api.github.com/repos/lodash/lodash/pulls';

// Maximum item limit github api will allow to be returned
var maxPagination = 100;

var uriConfig = {
    state: 'all',
    page: '1',
    perPage: '100',
}

var requestConfig = {
    uri: `${baseUrl}${'?state='}${uriConfig.state}${'&page='}${uriConfig.page}${'&per_page='}${uriConfig.perPage}`,
    method: 'GET',
    headers: {
        'accept': 'application/vnd.github.v3+json',
        'User-Agent': 'sambytes',
    }
}

var setRequestConfigUri = function setRequestConfigUri(page, perPage) {
    uriConfig.page = page.toString();
    uriConfig.perPage = perPage.toString();
    requestConfig.uri =`${baseUrl}${'?state='}${uriConfig.state}${'&page='}${uriConfig.page}${'&per_page='}${uriConfig.perPage}`;
}

var requestPullData = function retrievePullData() {
    return new Promise((resolve, reject) => {
        request(requestConfig, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            resolve(data);
        } else {
            reject(error);
        }
    })
});
}

var returnPullData = async function pullData() {
    try {
        var data = await requestPullData();
        return data;
    } catch(error) {
        console.error(error, 'Error retrieving lodash pull data');
    }
}

var returnAllPullData = function getAllLodashData() {

    var data = [],
        returnedData = [],
        index = 1;

    // Whilst from async module to make async while loop calls
    whilst(
        function() { return (index === 1 || returnedData.length === maxPagination) },
        async function(callback) {
            try {
                setRequestConfigUri(index, maxPagination);
                returnedData = await returnPullData();
                data = data.concat(returnedData);
                index++;
            } catch(err) {
                console.log('Error retrieving lodash pull data', err);
            }
        },
        function() {
            console.log('All lodash pull data:', data);
            console.log('Lodash data array length:', data.length);
        }
    )
    return data;
}

var lodashPullData = returnAllPullData();