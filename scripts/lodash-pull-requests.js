var request = require('request');

var baseUrl ='https://api.github.com/repos/lodash/lodash/pulls';

var urlConfig = {
    state: 'all',
    page: '1',
    perPage: '40',
}

var requestConfig = {
    uri: `${baseUrl}${'?state='}${urlConfig.state}${'&page='}${urlConfig.page}${'&per_page='}${urlConfig.perPage}`,
    method: 'GET',
    headers: {
        'accept': 'application/vnd.github.v3+json',
        'User-Agent': 'sambytes',
    }
}

var requestPullData = function retrievePullData() {
    return new Promise((resolve, reject) => {
        request(requestConfig, (error, response, body) => {
            if(!error && response.statusCode === 200) {
                var data = JSON.parse(body);
                console.log('return data array length',data.length);
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

var lodashPullData = returnPullData();

urlConfig.perPage = '100';

requestConfig.uri = `${baseUrl}${'?state='}${urlConfig.state}${'&page='}${urlConfig.page}${'&per_page='}${urlConfig.perPage}`;

var lodashPullData = returnPullData();