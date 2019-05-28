import commonStore from './Stores/CommonStore';

const euc = encodeURIComponent
const constructParams = (args) => Object.keys(args).map(k => euc(k) + '=' + euc(args[k])).join('?');
const baseUrl = 'http://127.0.0.1:5000/'
const apiHeaders = {'Content-Type': 'application/json', 'x-access-token': commonStore.token}

const auth = {
  store: 'authStore',
  login: args =>
    fetch(baseUrl+'ops/auth/login/', {method: 'post',
      headers: {'Content-Type': 'application/json'}, body: JSON.stringify(args) }),
  check: token =>
    fetch(baseUrl+'ops/auth/check/', {method: 'get', headers: apiHeaders}),
  renew: token =>
    fetch(baseUrl+'ops/auth/renew/', {method: 'get', headers: apiHeaders}),
}

const cities = {
  all: args =>
    fetch(baseUrl+'ops/merchants?'+constructParams(args), {method: 'get', headers: apiHeaders}),
  createMerchantUser: (merchant_id, userId) =>
    fetch(baseUrl+'ops/merchants/'+merchant_id+'/users/'+userId+'/', {method: 'put', headers: apiHeaders}),
  jurisdictions: () =>
    fetch(baseUrl+'ops/merchants/jurisdictions/', {method: 'get', headers: apiHeaders}),
  jurisdictions: () =>
    fetch(baseUrl+'ops/merchants/jurisdictions/', {method: 'get', headers: apiHeaders}),
  linkedUsers: merchant_id =>
    fetch(baseUrl+'ops/merchants/'+merchant_id+'/users/', {method: 'get', headers: apiHeaders}),
  marketingReferral: () =>
    fetch(baseUrl+'ops/marketing_referral/', {method: 'get', headers: apiHeaders}),
  one: merchant_id =>
    fetch(baseUrl+'ops/merchants/'+merchant_id+'/', {method: 'get', headers: apiHeaders}),
  search: query =>
    fetch(baseUrl+'ops/merchants?query='+query, {method: 'get', headers: apiHeaders}),
};

const flights = {
  all: args =>
    fetch(baseUrl+'ops/merchants?'+constructParams(args), {method: 'get', headers: apiHeaders}),
  createMerchantUser: (merchant_id, userId) =>
    fetch(baseUrl+'ops/merchants/'+merchant_id+'/users/'+userId+'/', {method: 'put', headers: apiHeaders}),
  jurisdictions: () =>
    fetch(baseUrl+'ops/merchants/jurisdictions/', {method: 'get', headers: apiHeaders}),
  jurisdictions: () =>
    fetch(baseUrl+'ops/merchants/jurisdictions/', {method: 'get', headers: apiHeaders}),
  linkedUsers: merchant_id =>
    fetch(baseUrl+'ops/merchants/'+merchant_id+'/users/', {method: 'get', headers: apiHeaders}),
  marketingReferral: () =>
    fetch(baseUrl+'ops/marketing_referral/', {method: 'get', headers: apiHeaders}),
  one: merchant_id =>
    fetch(baseUrl+'ops/merchants/'+merchant_id+'/', {method: 'get', headers: apiHeaders}),
  search: query =>
    fetch(baseUrl+'flight?query='+query, {method: 'get', headers: apiHeaders}),
};

export default {auth, flights, cities}
