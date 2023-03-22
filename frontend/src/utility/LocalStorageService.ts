class LocalStorageService {
  _service!: LocalStorageService;

  constructor() {
    if (!this._service) {
      this._service = this;
      return this._service;
    }
    return this._service;
  }

  getService() {
    return this._service;
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  clearToken() {
    localStorage.removeItem('access_token');
  }
}

export default new LocalStorageService();
