const euc = encodeURIComponent
const constructParams = (args) => Object.keys(args).map(k => euc(k) + '=' + euc(args[k])).join('?');
const baseUrl = process.env.REACT_APP_API_URL
const apiHeaders = {'Content-Type': 'application/json', 'x-access-token': process.env.REACT_APP_API_TOKEN}

const cities = {
  all: args =>
    fetch(baseUrl+'cities?'+constructParams(args), {method: 'get', headers: apiHeaders}),
  one: merchant_id =>
    fetch(baseUrl+'cities/'+merchant_id+'/', {method: 'get', headers: apiHeaders}),
  search: query =>
    fetch(baseUrl+'cities?query='+query, {method: 'get', headers: apiHeaders}),
};

const flights = {
  all: args =>
    fetch(baseUrl+'flights?'+constructParams(args), {method: 'get', headers: apiHeaders}),
  one: merchant_id =>
    fetch(baseUrl+'flights/'+merchant_id+'/', {method: 'get', headers: apiHeaders}),
  search: query =>
    fetch(baseUrl+'flights?query='+query, {method: 'get', headers: apiHeaders}),
};

export default {flights, cities}
