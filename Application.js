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

var User = (function(){
  function User(){
    var _this = this;
    _this.deniedOrgs = [];

    _this.hasAccessTo = function(orgName){
      var access = true;

      $(_this.deniedOrgs).each(function(){
        if (this == orgName)
          access = false;
      });

      return access;
    };
  }

  return User;
})();
