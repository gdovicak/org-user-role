describe("Application",function(){
  it("should have only one root organization", function(){
    var app = new Application();
    expect(app.rootOrganization).toNotEqual(null);
  });
});

describe("Organization should", function(){
  it("be root when there is no parent organization", function(){
    var rootOrgData = {'name': 'Root', 'parent': null};
    var org = new Organization(rootOrgData);
    expect(org.isRoot).toEqual(true);
  });

  it("not be root when there is a parent organizaation", function(){
    var rootOrgData = {'name': 'Root', 'parent': 'Org 1'};
    var org = new Organization(rootOrgData);
    expect(org.isRoot).toEqual(false);
  });
});
