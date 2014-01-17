describe("User should", function(){
  var user = null;

  beforeEach(function(){
  });

  describe("have 'Admin' role for org given she has 'Admin' role for", function(){
    it("the organization", function(){
      var orgMap = new UserOrg('Org 1', 'Admin', 'Root Org');
      user = new User([orgMap]);
      expect(user.getRoleFor(orgMap)).toEqual('Admin');
    });
    
    it("'Root Org' and not denied role for org", function(){
      var rootOrg = new UserOrg('Root Org', 'Admin', null);
      var org = new Organization('Org 1', 'Root Org');
      user = new User([rootOrg]);

      expect(user.getRoleFor(org)).toEqual('Admin');
    });
    
    it("parent org and not denied role for child org", function(){
      var userOrg = new UserOrg('Org 1', 'Admin', 'Root Org');
      var childOrg = new Organization('Child Org 1','Org 1');
      user = new User([userOrg]);

      expect(user.getRoleFor(childOrg)).toEqual('Admin');
    });
  });

  describe("have 'User' role for org given she has 'User' role for", function(){
    it("the organization", function(){
      var userOrg = {orgName: 'Org 1', role: 'User', parent: 'Root Org'},
      user = new User([userOrg]);
      expect(user.getRoleFor(userOrg)).toEqual('User');
    });

    it("the parent org and not denied role for org", function(){
      var orgOne = {orgName: 'Org 1', role: 'User', parent: 'Root Org'};
      var childOrg = new Organization('Child Org 1','Org 1');
      user = new User([orgOne]);

      expect(user.getRoleFor(childOrg)).toEqual('User');
    });

    it("the root org and not denied role for org", function(){
      var userOrg = new UserOrg('Org 1', 'User', 'Root Org');
      var childOrg = new Organization('Child Org 1', 'Org 1');
      user = new User([userOrg]);

      expect(user.getRoleFor(childOrg)).toEqual('User');
    });

  });

   describe("have 'Denied' role given she", function(){ 
    it("has denied role for that org", function(){
      var userOrg = new Organization('Org 1','Root Org');
      user = new User([userOrg]);
      expect(user.getRoleFor('Org 1')).toEqual('Denied');
    });

    it("does not have any role for an org", function(){
      var userOrg = new Organization('Org 1','Denied');
      user = new User([]);
      expect(user.getRoleFor(userOrg)).toEqual('Denied');
    });

    it("has a denied role for the parent org", function(){
        var userOrg = new UserOrg('Org 1', 'Denied', 'Root Org');
        var childOrg = new Organization('Child Org 1', 'Org 1');

        user = new User([userOrg]);
        expect(user.getRoleFor(childOrg)).toEqual('Denied');
    });
  });

  describe("inherit rolls for all children", function(){
    var child1 = null, 
        child2 = null;

    beforeEach(function(){
      child1 = new Organization('Child 1', 'Org 2');
      child2 = new Organization('Child 2', 'Org 2');
    });

    it("when parent has user role", function(){
      var userOrg = new UserOrg('Org 2', 'User', 'Root Org');
      var user = new User([userOrg]);

      expect(user.getRoleFor(child1)).toEqual('User'); 
      expect(user.getRoleFor(child2)).toEqual('User'); 
    });

    it("when 'Root Org' has user role", function(){
      var userOrg = new UserOrg('Root Org', 'User', null);
      var user = new User([userOrg]);

     expect(user.getRoleFor(child1)).toEqual('User'); 
     expect(user.getRoleFor(child2)).toEqual('User'); 
    });

    it("unless child org is specifically denied", function(){
      var userOrg = new UserOrg('Root Org', 'User', null);
      var deniedUserOrg = new UserOrg('Child 2', 'Denied',  'Org 2');
      var user = new User([userOrg, deniedUserOrg]);

      expect(user.getRoleFor(child1)).toEqual('User'); 
      expect(user.getRoleFor(child2)).toEqual('Denied'); 
    });
  });



});




