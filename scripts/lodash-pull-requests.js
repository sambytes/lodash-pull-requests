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
        console.log('Lodash Pull Data, first 40 requests', data.length);
        return data;
    } catch(error) {
        console.error(error, 'Error retrieving lodash pull data');
    }
}

function getNextData(index) {
    // setRequestConfigUri(index, maxPagination);
    // returnedData = returnPullData();
    // index++;
    console.log('callback');
}

var returnAllPullData = function getAllLodashData(that) {

    var data = [],
        returnedData = [],
        index = 1;

    var callback = function() {
        console.log('function')
    };
    whilst(
        function() { return index < 3; },
        async function(callback) {
            try {
                await
                returnPullData();
                index++;
            } catch(err) {
                console.log('error', err);
            }
        },
        function() {
            console.log('finished');
        }
    )
    return data;
}
var that = this;

// var lodashData = returnPullData();
var lodashPullData = returnAllPullData(that);