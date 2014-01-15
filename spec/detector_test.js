var assert = require("should");
var detector = require("../detector");

describe('Boolean check', function(){
  describe('for falsehoods', function(){
    it('is false when lying', function(){
      (true == false).should.be.false;
    });
  });
});

describe('The iOS user agent path', function(){
  it('is invoked when the visitor is using iOS', function(){
    var index = Math.floor(Math.random()*2);
    console.log(index);
    var navigator = {
      userAgent : function(){
                    var userAgents = ['iPhone', 'iPad', 'iPod'];
                    console.log(userAgents[index]);
                    return userAgents[index];
                  }
    }

    detector.getDestinationFor(navigator.userAgent()).should.equal('http://ad.apps.fm/sBRq29NDaocBjmmtFDSUgK914wHrDm-B2krNaaQ_1TOVHZH9Y43nT6ho_7QAurn-N7gDGVibwFugAw2eRJe4th4Ow_hK90DUtQzpaSlVx28');
  });
  it('is not invoked when the visitor is using Android', function(){
    var navigator = {
      userAgent: function(){
        return "Android";
      }
    }
    detector.getDestinationFor(navigator.userAgent()).should.equal('http://ad.apps.fm/D8k5d1HY9R6ZPDVh84R_74fOW8qaPnHZPLfEiC4jfzvI7LpgNFGEOjB2tVxaBpTLAJCmGZg_mhGsnXTHb_bBGT9c7B6o8_RBiFHZw77jcemfO2AgSVqMIkW5tH_42FX9F9MM7wQkHRlz6VvctOAdrw');
  });
});
