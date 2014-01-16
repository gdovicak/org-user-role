//Data Structure
//var orgMap = {
//   userid: 1,
//   orgId: 'blah',
//   role: 'Admin'
// }
//
// var org = {
//   'name': 'org 1',
//   'parent': 'Root Org',
//   }
//
//var usr = {
// 'id': 1,
// 'name': 'Ben'
// }

var User = (function(){
  function User(userOrgMap){
    var _this = this;
    _this.id = 1,
    _this.allowedOrgs = {};

    function init(orgs){
      $(orgs).each(function(){
        _this.allowedOrgs[this.orgName] = this;
      });
    };

    _this.getRoleFor = function(org){
      if(isSpecificallyDenied(org)) 
        return 'Denied';

      var role = isSpecificallyAllowed(org);
      
      if(role == 'Denied'){
        role = (_this.allowedOrgs[org.parent]) ? _this.allowedOrgs[org.parent].role : 'Denied';
      }
      
      if(role == 'Denied'){
        role = (_this.allowedOrgs['Root Org']) ? _this.allowedOrgs['Root Org'].role : 'Denied';
      }

      return role;
    };
    
    var isSpecificallyDenied = function(org){
      return (_this.allowedOrgs[org.orgName] && _this.allowedOrgs[org.orgName].role == 'Denied');
    };

    var isSpecificallyAllowed = function(org){
      return _this.allowedOrgs[org.orgName] ? _this.allowedOrgs[org.orgName].role  : 'Denied';
    }


    init(userOrgMap);
  }

  

  return User;
})();

var Organization = (function(){
  function Organization(orgName, parent){
    var _this = this;
    _this.orgName = orgName,
    _this.parent = parent;
  };
  return Organization;
})();

var UserOrg = (function(){
  function UserOrg(orgName, role, parent, userId){
    var _this = this;
    _this.userId = 1;
    _this.orgName = orgName;
    _this.role = role;
    _this.parent = parent;
  };
 return UserOrg; 
})();
