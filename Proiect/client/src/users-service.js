function users() {
  get = function () {
    return axios.get('http://localhost:3000/phones');
  };

  remove = function (index) {
    return axios.delete('http://localhost:3000/phones/'+index);
  };

  return {
    get: get,
    remove: remove
  };
}
