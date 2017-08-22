var request = require('request');

var baseUrl ='https://api.github.com/repos/lodash/lodash/pulls';

var urlConfig = {
    state: 'all',
    page: '9',
    perPage: '100',
}

var requestConfig = {
    uri: `${baseUrl}${'?state='}${urlConfig.state}${'&page='}${urlConfig.page}${'&per_page='}${urlConfig.perPage}`,
    method: 'GET',
    headers: {
        'accept': 'application/vnd.github.v3+json',
        'User-Agent': 'sambytes',
    }
}

var setRequestConfigUri = function setRequestConfigUri(page, perPage) {
    requestConfig.uri =`${baseUrl}${'?state='}${urlConfig.state}${'&page='}${page}${'&per_page='}${perPage}`
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
        console.log('Lodash Pull Data, requests', data.length);
        return data;
    } catch(error) {
        console.error(error, 'Error retrieving lodash pull data');
    }
}

setRequestConfigUri(2,30);

var lodashPullData = returnPullData();