var Application = (function(){
  function Application(){
  var _this = this;
  _this.rootOrganization = {};
  
}
 return Application; 
})();

var Organization = (function(){
  function Organization(dataObj){
    var _this = this;
    _this.parent = null,
    _this.isRoot = dataObj.parent ? false : true;
  };

  return Organization;
})();
