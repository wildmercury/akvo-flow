var loader = {
  register: function(path, fun) {
    fun();
  }
};
window.loader = loader;