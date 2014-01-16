describe("User should", function(){
  var org1Name = {orgName: 'Org 1', role: 'Admin'},
      user = null;

  beforeEach(function(){
    user = new User();
  });

  describe("have Admin role for org given", function(){
    it("she is an Admin of that organization", function(){
      var allowedOrgs = [org1Name];
      user = new User(allowedOrgs);
      expect(user.getRoleFor(org1Name)).toEqual('Admin');
    });
    
    it("is admin of root and not denied role for org", function(){
      var rootOrg= {'name': 'Root Org', role: 'Admin', parent: null};
      var org = {'name': 'Org 1', 'parent': 'Root Org', role: 'User'};
      user = new User([rootOrg]);

      expect(user.getRoleFor(org)).toEqual('Admin');
    });
    
    it("is admin of parent org and not denied role for child org", function(){
      var orgOne = {orgName: 'Org 1', role: 'Admin', parent: 'Root Org'};
      var childOrg = {orgName: 'Child Org 1', 'parent': 'Org 1'};
      user = new User([orgOne]);

      expect(user.getRoleFor(childOrg)).toEqual('Admin');
    });
  });

  describe("have User role given", function(){
    it("is a user of that organization", function(){
      org1Name = {orgName: 'Org 1', role: 'User'},
      user = new User([org1Name]);
      expect(user.getRoleFor(org1Name)).toEqual('User');
    });

    it("the parent org is a user of that organization", function(){
      var orgOne = {orgName: 'Org 1', role: 'User', parent: 'Root Org'};
      var childOrg = {orgName: 'Child Org 1', 'parent': 'Org 1'};
      user = new User([orgOne]);

      expect(user.getRoleFor(childOrg)).toEqual('User');
    });

  });

 describe("have denied role given she", function(){ 
  it("has denied role for that org", function(){
    var userOrg = {orgName: org1Name, role: 'Denied'};
    user = new User([userOrg]);
    expect(user.getRoleFor(org1Name)).toEqual('Denied');
  });

  it("does not have any role for an org", function(){
    var userOrg = {orgName: org1Name, role: 'Denied'};
    user = new User([]);
    expect(user.getRoleFor(userOrg)).toEqual('Denied');
  });

  //does not have any role for parent org
  //is admin of root and denied parent org
});

 // it("does not have access to a parent org", function(){
 //     
 // });

});



