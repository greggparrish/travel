import {observable, action, decorate, runInAction} from "mobx";
import apiCalls from '../ApiCalls'


class FlightStore {
  // observables
  count = undefined;
  email: undefined;
  formData: undefined;
  linkedObjects = [];
  makePrimaryState = undefined;
  page = 1;
  perPage = undefined;
  queryArgs = [];
  record = [];
  recordDisplayName = undefined;
  recordId = undefined;
  recordList = [];
  resetPasswordState = false;
  responseError = undefined;
  responseMessage = undefined;
  searchList = [];
  searchQuery = undefined;

  // config

  getOne = async () => {
    const response = await apiCalls.flights.one(this.recordId)
    const res = await response.json();
    if (res) {
      runInAction('loadUserSuccess', () => {
        this.record = res;
        this.email = res.auth_user.email.value;
        this.setRecordDisplayName(res);
        this.formData = res;
        }
      )
    }
  }

  handleSearchChange = (e) => {
    const query = e.target.value
    if (query.length < 2) {
      this.resetSearch();
    }
    if (query.length >= 2) {
      this.setSearchQuery(query);
      this.search();
    }
  }

  formSubmit = async (formData) => {
      const response = await apiCalls.flights.formSubmit(this.recordId, formData)
      const res = await response.json();
      if (res) {
        runInAction('loadFormSuccess', () => {
          this.responseError = res.error;
          this.responseMessage = res.message;
          res.user_id ?
            window.location.replace('/users/'+res.user_id)
          :
            this.getOne(this.recordId)
        })
    }
  }

  search = async () => {
    const response = await apiCalls.flights.search(this.searchQuery);
    const res = await response.json();
    if (res) {
      runInAction('loadUserSearchSuccess', () => {
        console.log(res)
        this.searchList = res.records;
      })
    }
  }

  resetAll() {
    this.displayName = undefined;
    this.formData = undefined;
    this.queryArgs = [];
    this.responseError = undefined;
    this.responseMessage = undefined;
    this.searchList = [];
    this.searchQuery = undefined;
  }

  resetSearch() {
    this.searchQuery = [];
    this.searchList = [];
  }

  setRecordDisplayName(getOneResponse) {
    this.recordDisplayName = getOneResponse.auth_user.email.value
  }

  setPage(page) {
    this.page = page;
  }

  setRecordId(recordId) {
    this.recordId = recordId;
  }

  setSearchQuery(query) {
    this.searchQuery = query;
  }

  updateFormData = (e) => {
    const {name, value, type} = e.target
    const [group, field] = name.split('___')
    if (type === 'checkbox') {
      var boolVal = value === 'on' ? 1 : 0
      this.formData[group][field].value = boolVal
    } else {
      this.formData[group][field].value = value
    }
  }
}

decorate(FlightStore, {
  count: observable,
  displayname: observable,
  email: observable,
  getAll: action,
  getLinkedObjects: action,
  handleSearchChange: action,
  linkedObjects: observable,
  makeUserPrimary: action,
  page: observable,
  perPage: observable,
  queryArgs: observable,
  record: observable,
  recordId: observable,
  recordList: observable,
  resetAll: action,
  resetPassword: action,
  resetPasswordState: observable,
  resetSearch: action,
  responseError: observable,
  responseMessage: observable,
  searchAll: action,
  searchList: observable,
  searchQuery: observable,
  setDisplayName: action,
  setPage: action,
  setRecordId: action,
  setSearchQuery: action,
  unlinkObject: action,
  unlinkState: observable,
  updateFormData: action,
});

export default new FlightStore();

