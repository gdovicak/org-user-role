describe("Datacalls", function(){
  var _this = this;
  var _sutParams;

  beforeEach(function(){
    Parse = {};
    Parse.initialize = jasmine.createSpy('initialize');
    Parse.FacebookUtils = {};
    Parse.FacebookUtils.init = jasmine.createSpy('init');
    Parse.FacebookUtils.logIn = jasmine.createSpy('login');

    window.fbAsyncInit = jasmine.createSpy('fbAsyncInit');

   _this.sut = new Wb.DataCalls();
  });

  describe("on initialization", function(){
    it("should initialize Parse", function(){
      _this.sut.initializeDataSource();
      expect(Parse.initialize).toHaveBeenCalled();
    });
    
    it("should initialize Facebook", function(){
      spyOn(_this.sut, 'initializeFacebook');
      _this.sut.initializeDataSource();
      expect(_this.sut.initializeFacebook).toHaveBeenCalled();
    });
  });

  describe("When initializing facebook", function(){
    it("Should init parse facebook utilities", function(){
      _this.sut.parseFacebookInit();
      expect(Parse.FacebookUtils.init).toHaveBeenCalled();
    });

    it("Should call parseFacebookInit on facebook async load", function(){
      _this.sut.initializeFacebook();
      expect(window.fbAsyncInit).toEqual(_this.sut.parseFacebookInit);
    });
  });

  describe("when loggin in", function(){
    it("should call parse login", function(){
      _this.sut.login();
      expect(Parse.FacebookUtils.logIn).toHaveBeenCalled();  
    });
  });
});
