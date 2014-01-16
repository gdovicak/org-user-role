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
        if(this.role != 'Denied')
        _this.allowedOrgs[this.orgName] = this;
      });
    };

    _this.getRoleFor = function(org){
      var role = _this.allowedOrgs[org.orgName] ? _this.allowedOrgs[org.orgName].role  : 'Denied';
      
      if(role == 'Denied'){
        role = (_this.allowedOrgs[org.parent]) ? _this.allowedOrgs[org.parent].role : 'Denied';
      }
      
      if(role == 'Denied'){
        role = (_this.allowedOrgs['Root Org']) ? _this.allowedOrgs['Root Org'].role : 'Denied';
      }

      return role;
    };

    init(userOrgMap);
  }

  return User;
})();
