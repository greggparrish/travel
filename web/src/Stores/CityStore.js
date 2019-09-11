import {observable, action, decorate, runInAction} from "mobx";
import apiCalls from '../ApiCalls'


class CityStore {
  // observables
  searchQuery = undefined;

  getOne = async () => {
    const response = await apiCalls.cities.one(this.recordId)
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
    const response = await apiCalls.cities.formSubmit(this.recordId, formData)
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
    const response = await apiCalls.cities.search(this.searchQuery);
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
}

decorate(CityStore, {
  count: observable
});

export default new CityStore();
