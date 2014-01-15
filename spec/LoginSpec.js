describe("The journal controller, ", function(){
  var _this = this;
  var _sutParams;
  var user;
  var avatarUrl = 'http://my.avatar.url/hi';
  var journalData = {date: new Date()};

  beforeEach(function(){
    user = {name:"blah"};

    $avatarDeferred = new $.Deferred();
    $datasourceInitialized = new $.Deferred();
    $datasourceInitialized.resolve();
    $journalPromise = new $.Deferred();
    $fbUserDeferred = new $.Deferred();

    _this.view = jasmine.createSpyObj('view', ['showAvatar', 'bindToggleAccountSettings', 'bindLoginClick']);
    _this.view.showJournal = {};
    _this.view.showJournal = jasmine.createSpy('showJournal');
    _this.view.init = {};
    _this.view.init = jasmine.createSpy('init');
    _this.view.toggleAccountSettings = jasmine.createSpy('toggleAccountSettings');

    _this.dataCalls = {};
    _this.dataCalls.getFbUser = jasmine.createSpy('getFbUser').andCallFake($fbUserDeferred.resolve({name: 'woo'})).andReturn($fbUserDeferred);
    _this.dataCalls.initializeDataSource = jasmine.createSpy('initializeDataSource').andReturn($datasourceInitialized);
    _this.dataCalls.getUser = jasmine.createSpy('getUser').andReturn(user);
    _this.dataCalls.getAvatarUrl = jasmine.createSpy('getAvatarUrl').andCallFake($avatarDeferred.resolve(avatarUrl)).andReturn($avatarDeferred);

    _this.dataCalls.getJournal = jasmine.createSpy('getJournal').andCallFake($journalPromise.resolve([])).andReturn($journalPromise);

    _this.logger = new Wb.EventLogger();
    _this.logger.track = jasmine.createSpy('track');

    _sutParams = {view: _this.view,
                  dataCalls: _this.dataCalls,
                  eventLogger: _this.logger
                 };

   _this.sut = new Wb.User.Journal.Controller(_sutParams);
  });

  describe("when initializing ", function(){
    it("should initialize the datasource", function(){
      _this.sut.initialize();
      expect(_this.dataCalls.initializeDataSource).toHaveBeenCalled();
    });

    it("should load the user", function(){
      _this.sut.initialize();
      expect(_this.sut.user).toEqual(user);
    });
  });

  describe("when a user is logged in", function(){
    it("then the avatar should be displayed", function(){
      _this.sut.initialize();
      expect(_this.view.showAvatar).toHaveBeenCalledWith(avatarUrl, 'woo');
    });

    it("then the journal should be rendered", function(){
      _this.sut.initialize();
      expect(_this.view.showJournal).toHaveBeenCalled();
    });
  });

  describe("when a user is not logged in", function(){
    it("then the login button should be displayed", function(){
      _this.dataCalls.getUser = jasmine.createSpy('getUser').andReturn(null);
      _this.sut.initialize();
      expect(_this.view.showAvatar.calls.length).toEqual(0);
    });
  });

  describe("when the user name is clicked", function(){
      it("should track the event", function(){
        _this.sut.accountSettingsClick();
        expect(_this.logger.track).toHaveBeenCalledWith('User', 'DropdownToggle');
      });

      it("should toggle the drop down menu", function(){
        _this.sut.accountSettingsClick();
        expect(_this.view.toggleAccountSettings).toHaveBeenCalled();
      });
    });
    
});

describe("Journal View", function(){
  var _this = this;
  var path = '123/abc';
  var $html = null; 
  beforeEach(function(){
    _this.view = new Wb.User.Journal.View();
  });

  describe("Given a user is logged in", function(){
    describe("When the avatar is rendered", function(){
      it("then the correct avatar should show", function(){
        $html = _this.view.renderAvatar(path, 'FirstName');
        expect($html.html()).toContain(path);
      });

      it("then the users first name should be displayed", function(){
        var name = "wooWoo";
        $html = _this.view.renderAvatar('whatever', name);
        expect($html.html()).toContain(name);
      });
    });
  });
 /*describe("when submitting a username should", function(){ 
  it("not submit the Username form if empty or blank", function(){
      _this.viewMock.getUsername = function(){return '';};
      _this.sut = new Cmc.ChatController(_sutParams);

      _this.sut.updateUserName('');

      expect(_this.dataCalls.UpdateProfile).wasNotCalled();
      expect(_this.viewMock.hideUsernameModal).not.toHaveBeenCalled();
    });

    it("update current user with the submitted username", function(){
     _this.sut.updateUserName('Ben'); 
     expect(_this.user.userName).toEqual('Ben');
    });

    it("update list of room members", function(){
      _this.sut.updateUserName('Ben');
      expect(_this.dataCalls.UpdateProfile).toHaveBeenCalledWith(_this.user, _this.sut.updateUserCallback);
    });
    
    it("save user updates to the server", function(){
      _this.sut.updateUserName('Ben');
      expect(_this.dataCalls.UpdateProfile).toHaveBeenCalledWith(_this.user, _this.sut.updateUserCallback);
    });

    it("hide the username modal after username submitted.", function(){
      _this.sut.updateUserName('Ben');
      expect(_this.viewMock.hideUsernameModal).toHaveBeenCalled();
    });

    it("update user when finished", function(){
      var obj = {a: "a"};
      _this.sut.updateUserCallback(obj);
      expect(_this.sut.me).toEqual(obj);
    });

    it("let the view know who 'me' is", function(){
      var obj = {a: "a"};
      var user = new Cmc.User();
      spyOn(_this.viewMock, 'setMe');
      _this.sut.initializeMe(user);
      expect(_this.viewMock.setMe).toHaveBeenCalledWith(user);
    });
  });
  */

});
