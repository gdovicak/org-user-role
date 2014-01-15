describe("Application",function(){
  it("should have only one root organization", function(){
    var app = new Application();
    expect(app.rootOrganization).toNotEqual(null);
  });
});

//describe("Organization should", function(){
//  it("be root when there is no parent organization", function(){
//    var rootOrgData = {'name': 'Root Org', 'parent': null};
//    var org = new Organization(rootOrgData);
//    expect(org.isRoot).toEqual(true);
//  });
//
//  it("not be root when there is a parent organizaation", function(){
//    var rootOrgData = {'name': 'Not Root', 'parent': 'Org 1'};
//    var org = new Organization(rootOrgData);
//    expect(org.isRoot).toEqual(false);
//  });
//});
//

describe("User should", function(){
  it("have access to an organization if it is an Admin of that organization", function(){
    var orgName = 'Org 1';
    var user = new User();
    user.adminOrgs = [orgName];
    expect(user.hasAccessTo(orgName)).toEqual(true);
  });

  it("have access to an organization if it is a user of that organization", function(){
    var orgName = 'Org 1';
    var user = new User();
    user.userOrgs = [orgName];
    expect(user.hasAccessTo(orgName)).toEqual(true);
  });
  
  it("should not have access to an organization it has denied role for that org", function(){
    var orgName = 'Org 1';
    var user = new User();
    user.userOrgs = [];
    user.deniedOrgs = [orgName];
    expect(user.hasAccessTo(orgName)).toEqual(false);
  });


});
