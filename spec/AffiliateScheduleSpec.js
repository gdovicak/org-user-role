var _wods = [
    {
        "wodID": "6421b611-0752-4867-933c-5c271615d898",
        "wodDate": "2013-12-25",
        "hostBoxName": "CrossFit 216",
        "announcement": "upcoming fundraiser, event at the gym, other comps, etc etc",
        "details": {
            "commentary": "It's gonna be a hot one today! Be sure you stay hydrated throughout the day",
            "sections": [
                {
                    "position": 0,
                    "name": "warm-up",
                    "commentary": "",
                    "details": "here is where you'd specify your warm-up"
                },
                {
                    "position": 2,
                    "name": "strength",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 3,
                    "name": "metcon",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 4,
                    "name": "post-recovery",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 1,
                    "name": "skill",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 5,
                    "name": "mobility",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 6,
                    "name": "extra",
                    "commentary": "",
                    "details": ""
                }
            ]
        }
    },
    {
        "wodID": "6421b611-0752-4867-933c-5c271615d898",
        "wodDate": "2013-12-25",
        "hostBoxName": "CrossFit 216",
        "announcement": "upcoming fundraiser, event at the gym, other comps, etc etc",
        "details": {
            "commentary": "It's gonna be a hot one today! Be sure you stay hydrated throughout the day",
            "sections": [
                {
                    "position": 0,
                    "name": "warm-up",
                    "commentary": "",
                    "details": "here is where you'd specify your warm-up"
                },
                {
                    "position": 2,
                    "name": "strength",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 3,
                    "name": "metcon",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 4,
                    "name": "post-recovery",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 1,
                    "name": "skill",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 5,
                    "name": "mobility",
                    "commentary": "",
                    "details": ""
                },
                {
                    "position": 6,
                    "name": "extra",
                    "commentary": "",
                    "details": ""
                }
            ]
        }
    }
];

describe("The Affiliate Calendar Controller, ", function(){
  var _this = this,
      _view = null,
      _dataCalls = null,
      _wodPromise = null,
      _model = null;
      _sutParams = {};
      
  beforeEach(function(){
    _view = new Wb.AffiliateCalendar.View();
    _wodPromise = new $.Deferred();
    _dataCalls = new Wb.DataCalls();
    _model  = new Wb.AffiliateCalendar.Model();
    spyOn(_view, 'initialize');
    spyOn(_dataCalls, 'getWods').andCallFake(_wodPromise.resolve(_wods)).andReturn(_wodPromise);
    _sutParams.view = _view;
    _sutParams.dataCalls =  _dataCalls;
    _sutParams.model = _model;

   _this.sut = new Wb.AffiliateCalendar.Controller(_sutParams);
  });

  describe("when initialized should", function(){
    it("get all the wods", function(){
      _this.sut.initialize();
      expect(_dataCalls.getWods).toHaveBeenCalled();
    });

    it("initialize the view", function(){
      var events = [];
      spyOn(_model, 'getEvents').andReturn(events);

      _this.sut.initialize();
      expect(_view.initialize).toHaveBeenCalled();
    });

  });
});

describe("The Affiliate Calendar View, ", function(){
  var _this = this,
      _sut = null,
      _blah = null,
      _model = null; 

  beforeEach(function(){
    _model = new Wb.AffiliateCalendar.Model();
    _sut = new Wb.AffiliateCalendar.View(_model);
  });

  describe("when initialized", function(){
    it("should render a calendar with passed in events", function(){
      spyOn(_sut, 'renderCalendar');
      _sut.initialize(_wods)
      expect(_sut.renderCalendar).toHaveBeenCalled();
    });
  });

  describe("when in week view should", function(){
    it("display more information about the wod", function(){
      var wod = [{start: '1/1/2012', title: 'blah', longTitle: 'This is longer'}];
      spyOn(_sut, 'isMonthView').andReturn(false);
      var weekEvent = _sut.getFormattedEvents(wod)[0];
      expect(weekEvent.title).toEqual(wod[0].longTitle);
    });
  });

  describe("when a function is bound to eventClick", function(){
    it("should fire that event when triggered", function(){
      var mock = {callMe:function(){}};
      spyOn(mock, 'callMe');
      _sut.bindEventClick(mock.callMe);

      _sut.eventClick();
      expect(mock.callMe).toHaveBeenCalled();
    });
  });
  
  describe("when a function is bound to dayClick", function(){
    it("should fire that event when triggered", function(){
      var mock = {callMe:function(){}};
      spyOn(mock, 'callMe');
      _sut.bindDayClick(mock.callMe);

      _sut.dayClick();
      expect(mock.callMe).toHaveBeenCalled();
    });
  });

  describe("The Affiliate Calendar Model, ", function(){
    it("should use UTC time", function(){
      var sut = new Wb.AffiliateCalendar.Model();
      var d = new Date('2014-02-24T00:00:00Z');
      var date = sut.getEventDateFromWodDate(d);

      expect(d.getMonth()).toEqual(1);
      expect(d.getDate()).toEqual(23);
      expect(d.getFullYear()).toEqual(2014);
    });

  });

});
