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

    _this.loadOrgs = function(orgs){
      $(orgs).each(function(){
        _this.allowedOrgs[this.orgName] = this;
      });
    };

    _this.getRoleFor = function(org){
      if(isSpecificallyDenied(org)) 
        return 'Denied';

      var role = getExplicitlyAllowed(org);
      
      if(role == 'Denied')
        role =  inheritRoleFromParent(org);
      
      if(role == 'Denied')
        role = inhertiRoleFromRoot(org);

      return role;
    };
    
    var isSpecificallyDenied = function(org){
      return (_this.allowedOrgs[org.orgName] && _this.allowedOrgs[org.orgName].role == 'Denied');
    };

    var getExplicitlyAllowed = function(org){
      return _this.allowedOrgs[org.orgName] ? _this.allowedOrgs[org.orgName].role  : 'Denied';
    }

    var inheritRoleFromParent = function(org){
      return (_this.allowedOrgs[org.parent]) ? _this.allowedOrgs[org.parent].role : 'Denied';
    };

    var inhertiRoleFromRoot = function(org){
      return (_this.allowedOrgs['Root Org']) ? _this.allowedOrgs['Root Org'].role : 'Denied'; 
    }

    _this.loadOrgs(userOrgMap);
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

var Application = (function(){
  function Application(dataCalls, user){
    var _this = this;
    _this.dataCalls = dataCalls,
    _this.user = user,
    _this.orgToValidate = new Organization('Org 1', 'Root Org');

    _this.run = function(){
      var orgProm = _this.dataCalls.getOrgRolesForUser(user.id);

      orgProm.done(function(orgs){
        _this.user.loadOrgs(orgs);
        console.log(_this.user.getRoleFor(_this.orgToValidate));
      });
    }

  }

  return Application;
})();
