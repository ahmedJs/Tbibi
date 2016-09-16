"use strict";describe("module angularMoment",function(){var e,t,a,n,o,i,s,r,c,u;beforeEach(module("angularMoment")),beforeEach(inject(function(l){e=l.get("$rootScope"),t=l.get("$compile"),a=l.get("$window"),n=l.get("$filter"),o=l.get("moment"),u=l.get("amMoment"),i=l.get("amTimeAgoConfig"),r=l.get("angularMomentConfig"),s=angular.copy(i),c=angular.copy(r),(o.locale||o.lang)("en"),o.tz.add("UTC|UTC|0|0|"),o.tz.add("Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00"),o.tz.add("Pacific/Tahiti|LMT TAHT|9W.g a0|01|-2joe1.I")})),afterEach(function(){angular.copy(s,i),angular.copy(c,r),jasmine.clock().uninstall()}),describe("am-time-ago directive",function(){it('should change the text of the element to "a few seconds ago" when given unix timestamp',function(){e.testDate=(new Date).getTime()/1e3;var a=angular.element('<span am-time-ago="testDate" am-preprocess="unix"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it('should change the text of the element to "a few seconds ago" when given current time',function(){e.testDate=new Date;var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it('should change the text of the div to "3 minutes ago" when given a date 3 minutes ago',function(){e.testDate=new Date((new Date).getTime()-18e4);var a=angular.element('<div am-time-ago="testDate"></div>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("3 minutes ago")}),it('should change the text of the div to "2 hours ago" when given a date 2 hours ago',function(){e.testDate=new Date((new Date).getTime()-72e5);var a=angular.element('<div am-time-ago="testDate"></div>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("2 hours ago")}),it('should change the text of the div to "one year ago" when given a date one year ago',function(){var a=new Date;e.testDate=new Date(a.getFullYear()-1,a.getMonth(),a.getDate());var n=angular.element('<div am-time-ago="testDate"></div>');n=t(n)(e),e.$digest(),expect(n.text()).toBe("a year ago")}),it("should parse correctly numeric dates as milliseconds since the epoch",function(){e.testDate=(new Date).getTime();var a=angular.element('<div am-time-ago="testDate"></div>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it("should update the value if date changes on scope",function(){var a=new Date;e.testDate=new Date(a.getFullYear()-1,a.getMonth(),a.getDate()).getTime();var n=angular.element('<div am-time-ago="testDate"></div>');n=t(n)(e),e.$digest(),expect(n.text()).toBe("a year ago"),e.testDate=new Date,e.$digest(),expect(n.text()).toBe("a few seconds ago")}),it("should update the span text as time passes",function(a){e.testDate=new Date((new Date).getTime()-44e3);var n=angular.element('<div am-time-ago="testDate"></div>');n=t(n)(e),e.$digest(),expect(n.text()).toBe("a few seconds ago");var o=setInterval(function(){(new Date).getTime()-e.testDate.getTime()<45e3||(clearInterval(o),e.$digest(),expect(n.text()).toBe("a minute ago"),a())},50)}),it("should schedule the update timer to one hour ahead for date in the far future (#73)",function(){e.testDate=new Date((new Date).getTime()+864e5),jasmine.clock().install(),spyOn(a,"setTimeout");var n=angular.element('<div am-time-ago="testDate"></div>');n=t(n)(e),e.$digest(),expect(a.setTimeout).toHaveBeenCalledWith(jasmine.any(Function),36e5)}),describe("bindonce",function(){it('should change the text of the div to "3 minutes ago" when given a date 3 minutes ago with one time binding',function(){e.testDate=new Date((new Date).getTime()-18e4);var a=angular.element('<div am-time-ago="::testDate"></div>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("3 minutes ago")}),it("should parse correctly numeric dates as milliseconds since the epoch with one time binding",function(){e.testDate=(new Date).getTime();var a=angular.element('<div am-time-ago="::testDate"></div>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it("should not update the value if date changes on scope when using one time binding",function(){var a=new Date;e.testDate=new Date(a.getFullYear()-1,a.getMonth(),a.getDate()).getTime();var n=angular.element('<div am-time-ago="::testDate"></div>');n=t(n)(e),e.$digest(),expect(n.text()).toBe("a year ago"),e.testDate=new Date,e.$digest(),expect(n.text()).toBe("a year ago")})}),it("should handle undefined data",function(){e.testDate=null;var a=angular.element('<div am-time-ago="testDate"></div>');a=t(a)(e);var n=function(){e.$digest()};expect(n).not.toThrow()}),it("should remove the element text and cancel the timer when an empty string is given (#15)",function(){e.testDate=(new Date).getTime();var n=angular.element('<div am-time-ago="testDate"></div>');n=t(n)(e),e.$digest(),expect(n.text()).toBe("a few seconds ago"),e.testDate="",spyOn(a,"clearTimeout").and.callThrough(),e.$digest(),expect(a.clearTimeout).toHaveBeenCalled(),expect(n.text()).toBe("")}),it("should not change the contents of the element until a date is given",function(){e.testDate=null;var a=angular.element('<div am-time-ago="testDate">Initial text</div>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("Initial text"),e.testDate=(new Date).getTime(),e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it("should cancel the timer when the scope is destroyed",function(){var n=e.$new();e.testDate=new Date;var o=angular.element('<span am-time-ago="testDate"></span>');o=t(o)(n),e.$digest(),spyOn(a,"clearTimeout").and.callThrough(),n.$destroy(),expect(a.clearTimeout).toHaveBeenCalled()}),it("should generate a time string without suffix when configured to do so",function(){i.withoutSuffix=!0,e.testDate=new Date;var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds")}),it("should generate update the text following a locale change via amMoment.changeLocale() method",function(){e.testDate=new Date;var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago"),u.changeLocale("fr"),expect(a.text()).toBe("il y a quelques secondes")}),it("should update the `datetime` attr if applied to a TIME element",function(){e.testDate=Date.UTC(2012,8,20,15,20,12);var a=angular.element('<time am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.attr("datetime")).toBe("2012-09-20T15:20:12.000Z")}),describe("setting the element title",function(){it("should not set the title attribute of the element to the date by default",function(){e.testDate=(new Date).getTime()/1e3;var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.attr("title")).toBeUndefined()}),it("should not change the title attribute of the element if the element already has a title",function(){i.titleFormat="MMMM Do YYYY, h:mm:ss a",e.testDate=(new Date).getTime()/1e3;var a=angular.element('<span am-time-ago="testDate" title="test"></span>');a=t(a)(e),e.$digest(),expect(a.attr("title")).toBe("test")}),it("should set the title attribute of the element to the formatted date as per the config",function(){i.titleFormat="MMMM Do YYYY, h:mm:ss a",e.testDate=(new Date).getTime()/1e3;var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest();var n=o(e.testDate).format(i.titleFormat);expect(a.attr("title")).toBe(n)}),describe("full date support",function(){it("should display relative time if the date is recent",function(){i.fullDateThreshold=7,e.testDate=new Date((new Date).getTime()-1728e5);var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("2 days ago")}),it("should display full time if the date is past the threshold",function(){i.fullDateThreshold=7,e.testDate=new Date(2012,5,5);var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toMatch(/^2012-06-05T00:00:00[\+\-]\d\d:\d\d$/)}),it("should display full time using the given format",function(){i.fullDateThreshold=7,i.fullDateFormat="YYYY,DD,MM",e.testDate=new Date(2010,1,8);var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("2010,08,02")}),it("should support changing the full date threshold through attribute",function(){e.threshold=7,e.testDate=new Date((new Date).getTime()-10368e5);var a=angular.element('<span am-time-ago="testDate" am-full-date-threshold="{{threshold}}"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe(o(e.testDate).format()),e.threshold=20,e.$digest(),expect(a.text()).toBe("12 days ago")}),it("should support setting the full date format through attribute",function(){i.fullDateThreshold=7,e.testDate=new Date(2013,11,15);var a=angular.element('<span am-time-ago="testDate" am-full-date-format="YYYY-MM-DD"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("2013-12-15")})}),describe("am-from attribute",function(){it("should make the calculations from the am-from given",function(){e.from=new Date(2015,6,11),e.testDate=new Date(2015,6,12);var a=angular.element('<span am-time-ago="testDate" am-from="from"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("in a day")})})}),describe("am-without-suffix attribute",function(){it("should generate a time string without suffix when true",function(){e.testDate=new Date;var a=angular.element('<span am-time-ago="testDate" am-without-suffix="true"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds")}),it("should generate a time string with suffix when false",function(){i.withoutSuffix=!0,e.testDate=new Date;var a=angular.element('<span am-time-ago="testDate" am-without-suffix="false"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it("should support expressions",function(){e.testDate=new Date,e.withSuffix=!1;var a=angular.element('<span am-time-ago="testDate" am-without-suffix="!withSuffix"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds"),e.withSuffix=!0,e.$digest(),expect(a.text()).toBe("a few seconds ago")}),it("should ignore non-boolean values",function(){e.testDate=new Date,e.withoutSuffix="string";var a=angular.element('<span am-time-ago="testDate" am-without-suffix="withoutSuffix"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("a few seconds ago")})}),describe("am-format attribute",function(){it("should support custom date format",function(){var a=new Date,n=Math.min(a.getDate(),28);e.testDate=a.getFullYear()+"#"+n+"#"+a.getMonth();var o=angular.element('<span am-time-ago="testDate" am-format="YYYY#DD#MM"></span>');o=t(o)(e),e.$digest(),expect(o.text()).toBe("a month ago")}),it("should support angular expressions in date format",function(){var a=new Date,n=Math.min(a.getDate(),28);e.testDate=a.getMonth()+"@"+a.getFullYear()+"@"+n;var o=angular.element('<span am-time-ago="testDate" am-format="{{dateFormat}}"></span>');o=t(o)(e),e.$digest(),e.dateFormat="MM@YYYY@DD",e.$digest(),expect(o.text()).toBe("a month ago")})}),describe("format config property",function(){it("should be used when no `am-format` attribute is found",function(){r.format="MM@YYYY@DD";var a=new Date,n=Math.min(a.getDate(),28);e.testDate=a.getMonth()+"@"+a.getFullYear()+"@"+n;var o=angular.element('<span am-time-ago="testDate"></span>');o=t(o)(e),e.$digest(),expect(o.text()).toBe("a month ago")}),it("should be overridable by `am-format` attribute",function(){r.format="YYYY@MM@@DD";var a=new Date,n=Math.min(a.getDate(),28);e.testDate=a.getMonth()+"@"+a.getFullYear()+"@"+n;var o=angular.element('<span am-format="MM@YYYY@DD" am-time-ago="testDate"></span>');o=t(o)(e),e.$digest(),expect(o.text()).toBe("a month ago")})}),describe("serverTime configuration",function(){it("should calculate time ago in respect to the configured server time",function(){i.serverTime=Date.UTC(2014,5,12,5,22,11),e.testDate=Date.UTC(2014,5,12,9,22,11);var a=angular.element('<span am-time-ago="testDate"></span>');a=t(a)(e),e.$digest(),expect(a.text()).toBe("in 4 hours")})})}),describe("amCalendar filter",function(){var e;beforeEach(function(){e=n("amCalendar")}),it("should convert today date to calendar form",function(){var t=new Date,a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),13,33,33);expect(e(a)).toBe("Today at 1:33 PM")}),it("should convert date in long past to calendar form",function(){expect(e(new Date(2012,2,25,13,14,15))).toBe("03/25/2012")}),it("should gracefully handle undefined values",function(){expect(e()).toBe("")}),it("should accept a numeric unix timestamp (milliseconds since the epoch) as input",function(){expect(e(new Date(2012,0,22,4,46,54).getTime())).toBe("01/22/2012")}),it("should respect the configured timezone",function(){r.timezone="Pacific/Tahiti",expect(e(Date.UTC(2012,0,22,4,46,54))).toBe("01/21/2012")}),it("should respect the timezone parameter",function(){var t=Date.UTC(2012,0,22,12,46,54);u.changeLocale("en",{calendar:{sameElse:"(HH,mm,ss);MM.DD.YYYY"}}),expect(e(t,"utc","Pacific/Tahiti")).toBe("(02,46,54);01.22.2012"),u.changeLocale("en",{calendar:{sameElse:"L"}})}),it("should parse timezones containing Z correctly (issue #168)",function(){r.timezone="Europe/Zurich",expect(e(Date.UTC(2015,8,3,23,55,55))).toBe("2015-09-04T01:55:55+02:00")}),it("should accept UTC offset as a timezone parameter",function(){var t=Date.UTC(2012,0,22,12,46,54);u.changeLocale("en",{calendar:{sameElse:"(HH,mm,ss);MM.DD.YYYY"}}),expect(e(t,"utc","-10:00")).toBe("(02,46,54);01.22.2012"),u.changeLocale("en",{calendar:{sameElse:"L"}})}),it('should apply the "utc" preprocessor when the string "utc" is given in the second argument',function(){expect(e(Date.UTC(2012,0,22,0,0,0),"utc")).toBe("01/22/2012"),expect(e(Date.UTC(2012,0,22,23,59,59),"utc")).toBe("01/22/2012")}),it('should apply the "unix" preprocessor if angularMomentConfig.preprocess is set to "unix" and no preprocessor is given',function(){var t=new Date(1970,0,2,10,0,0).getTime()/1e3;r.preprocess="unix",expect(e(t)).toBe("01/02/1970")}),it("should ignore the default preprocessor if we explicity give it null in the second argument",function(){var t=new Date(1970,0,1,10,0,0).getTime();r.preprocess="unix",expect(e(t,null)).toBe("01/01/1970")}),it("should gracefully handle the case where timezone is given but moment-timezone is not loaded",function(){r.timezone="Pacific/Tahiti";var t=o.fn.tz;try{delete o.fn.tz,expect(e(new Date(2012,0,22,4,46,54).getTime())).toBe("01/22/2012")}finally{o.fn.tz=t,o.fn.tz=t}}),it("should return an empty string for invalid input",function(){expect(e("blah blah")).toBe("")})}),describe("amDifference filter",function(){var e;beforeEach(function(){e=n("amDifference")}),it("should take the difference of two dates in milliseconds",function(){var t=new Date(2012,0,22,0,0,0),a=new Date(t.getFullYear(),t.getMonth(),t.getDate(),13,33,33);expect(e(a,t)).toBe(48813e3)}),it('should support passing "years", "months", "days", etc as a units parameter',function(){var t=new Date(2012,0,22,4,46,54),a=new Date(2013,0,22,4,46,54);expect(e(a,t,"years")).toBe(1);var n=new Date(2012,1,22,4,46,54);expect(e(n,t,"months")).toBe(1);var o=new Date(2012,0,23,4,46,54);expect(e(o,t,"days")).toBe(1)}),it("should allow rounding to be disabled via parameter",function(){var t=new Date(2012,0,22,4,46,54),a=new Date(t.getFullYear()+1,t.getMonth()+6,t.getDate());expect(e(a,t,"years")).toBe(1),expect(e(a,t,"years",!0)).toBeCloseTo(1.5)}),it("dates from the future should return negative values",function(){var t=new Date(2012,0,22,4,46,54),a=new Date(2013,0,22,4,46,54);expect(String(e(t,a))).toContain("-")}),it("should gracefully handle undefined values",function(){expect(e()).toBe("")}),it("should accept a numeric unix timestamp (milliseconds since the epoch) as input",function(){expect(e(new Date(2012,0,22,4,46,55).getTime(),new Date(2012,0,22,4,46,54).getTime())).toBe(1e3)}),it('should apply the "utc" preprocessor when the string "utc" is given as a preprocessor argument',function(){expect(e([2012,0,22,0,0,1],Date.UTC(2012,0,22,0,0,0),null,null,"utc")).toBe(1e3),expect(e(Date.UTC(2012,0,22,0,0,1),[2012,0,22,0,0,0],null,null,null,"utc")).toBe(1e3)}),it('should apply the "unix" preprocessor if angularMomentConfig.preprocess is set to "unix" and no preprocessor is given',function(){r.preprocess="unix",expect(e(100001,1e5)).toBe(1e3)}),it("should return an empty string for invalid input",function(){expect(e("blah blah")).toBe("")})}),describe("amDateFormat filter",function(){var e;beforeEach(function(){e=n("amDateFormat")}),it("should support displaying format",function(){var t=new Date,a=t.getDate()+"."+(t.getMonth()+1)+"."+t.getFullYear();expect(e(t,"D.M.YYYY")).toBe(a)}),it("should gracefully handle undefined values",function(){expect(e(void 0,"D.M.YYYY")).toBe("")}),it("should accept a numeric unix timestamp (milliseconds since the epoch) as input",function(){var t=new Date(2012,0,22,12,46,54).getTime();expect(e(t,"(HH,mm,ss);MM.DD.YYYY")).toBe("(12,46,54);01.22.2012")}),it("should gracefully handle string unix timestamp as input",function(){var t=String(new Date(2012,0,22,12,46,54).getTime());expect(e(t,"(HH,mm,ss);MM.DD.YYYY")).toBe("(12,46,54);01.22.2012")}),it("should respect the configured timezone",function(){r.timezone="Pacific/Tahiti";var t=Date.UTC(2012,0,22,12,46,54);expect(e(t,"(HH,mm,ss);MM.DD.YYYY")).toBe("(02,46,54);01.22.2012")}),it("should respect the timezone parameter",function(){var t=Date.UTC(2012,0,22,12,46,54);expect(e(t,"(HH,mm,ss);MM.DD.YYYY","utc","Pacific/Tahiti")).toBe("(02,46,54);01.22.2012")}),it("should accept UTC offset as a timezone parameter",function(){var t=Date.UTC(2012,0,22,12,46,54);expect(e(t,"(HH,mm,ss);MM.DD.YYYY","utc","-10:00")).toBe("(02,46,54);01.22.2012")}),it("should return an empty string for invalid input",function(){expect(e("blah blah","(HH,mm,ss);MM.DD.YYYY")).toBe("")}),it("should accept a string format to parse input date",function(){var t="20120122124654";expect(e(t,"(HH,mm,ss);MM.DD.YYYY","utc","-10:00","YYYYMMDDHHmmss")).toBe("(02,46,54);01.22.2012")}),describe("format config property",function(){it("should be used when no inputFormat parameter is set",function(){var t="20120122124654";r.format="YYYYMMDDHHmmss",expect(e(t,"(HH,mm,ss);MM.DD.YYYY","utc","-10:00")).toBe("(02,46,54);01.22.2012")}),it("should be overrideable by inputFormat parameter",function(){var t="20120122124654";r.format="ssmmHHDDMMYYYY",expect(e(t,"(HH,mm,ss);MM.DD.YYYY","utc","-10:00","YYYYMMDDHHmmss")).toBe("(02,46,54);01.22.2012")})})}),describe("amDurationFormat filter",function(){var e;beforeEach(function(){e=n("amDurationFormat")}),it("should support return the given duration as text",function(){expect(e(1e3,"milliseconds")).toBe("a few seconds")}),it("should support return a day given 24 hours",function(){expect(e(24,"hours")).toBe("a day")}),it('should add prefix the result with the word "in" if the third parameter (suffix) is true',function(){expect(e(1,"minutes",!0)).toBe("in a minute")}),it('should add suffix the result with the word "ago" if the duration is negative and the third parameter is true',function(){expect(e(-1,"minutes",!0)).toBe("a minute ago")}),it("should gracefully handle undefined values for duration",function(){expect(e(void 0,"minutes")).toBe("")})}),describe("amTimeAgo filter",function(){var e;beforeEach(function(){e=n("amTimeAgo")}),it("should support return the time ago as text",function(){var t=new Date;expect(e(t)).toBe("a few seconds ago")}),it("should remove suffix from the result if the third parameter (suffix) is true",function(){var t=new Date;expect(e(t,null,!0)).toBe("a few seconds")}),it("should support started date as fourth parameter",function(){var t=new Date(2015,7,14),a=new Date(2015,7,15);expect(e(t,null,null,a)).toBe("a day ago"),expect(e(t,null,!0,a)).toBe("a day")}),it("should gracefully handle undefined values",function(){expect(e()).toBe("")}),it("should gracefully handle invalid input",function(){expect(e("noDate")).toBe("")})}),describe("amSubtract filter",function(){var e;beforeEach(function(){e=n("amSubtract")}),it("should subtract 1 hour from date",function(){var t=new Date(2e3,1,1,0,0,0);expect(e(t,1,"hours").toString()).toMatch(/^Mon Jan 31 2000 23:00:00/)}),it("should subtract 1 minute from date",function(){var t=new Date(2e3,1,1,0,0,0);expect(e(t,1,"minutes").toString()).toMatch(/^Mon Jan 31 2000 23:59:00/)})}),describe("amAdd filter",function(){var e;beforeEach(function(){e=n("amAdd")}),it("should add 1 hour to date",function(){var t=new Date(2e3,1,1,0,0,0);expect(e(t,1,"hours").toString()).toMatch(/^Tue Feb 01 2000 01:00:00/)}),it("should add 1 minute to date",function(){var t=new Date(2e3,1,1,0,0,0);expect(e(t,1,"minutes").toString()).toMatch(/^Tue Feb 01 2000 00:01:00/)})}),describe("amMoment service",function(){describe("#changeLocale",function(){it("should convert today's date to custom calendar format",function(){var e=new Date;u.changeLocale("en",{calendar:{sameDay:"[This Day]"}});var t=n("amCalendar"),a=new Date(e.getFullYear(),e.getMonth(),e.getDate(),13,33,33);expect(t(a)).toBe("This Day")}),it("should return the current locale",function(){expect(u.changeLocale()).toBe("en")}),it("should broadcast an angularMoment:localeChanged event on the root scope if a locale is specified",function(){var t=!1;e.$on("amMoment:localeChanged",function(){t=!0}),u.changeLocale("fr"),expect(t).toBe(!0)}),it("should not broadcast an angularMoment:localeChanged event on the root scope if no locale is specified",function(){var t=!1;e.$on("amMoment:localeChanged",function(){t=!0}),u.changeLocale(),expect(t).toBe(!1)})}),describe("#changeTimezone",function(){it("Should update the current timezone",function(){u.changeTimezone("UTC"),expect(u.applyTimezone(o()).utcOffset()).toBe(0),u.changeTimezone("Pacific/Tahiti"),expect(u.applyTimezone(o()).utcOffset()).toBe(-600)}),it("should broadcast an angularMoment:timezoneChanged event on the root scope with the new timezone value",function(){var t=!1;e.$on("amMoment:timezoneChanged",function(){t=!0}),u.changeTimezone("UTC"),expect(t).toBe(!0)})}),describe("#preprocessDate",function(){it("should call a custom preprocessor that was registered on amMoment.preprocessors",function(){var e=new Date(2013,0,22,12,46,54),t={name:"Budget plan",date:e};u.preprocessors.foobar=function(e){return o(e.date)},expect(u.preprocessDate(t,"foobar").valueOf()).toEqual(e.getTime())}),it("should issue a warning if an unsupported preprocessor is used and fall-back to default processing",inject(function(e){var t=new Date(2014,0,22,12,46,54);spyOn(e,"warn"),expect(u.preprocessDate(t.getTime(),"blabla").valueOf()).toEqual(t.getTime()),expect(e.warn).toHaveBeenCalledWith("angular-moment: Ignoring unsupported value for preprocess: blabla")}))})}),describe("amTimeAgoConfig constant",function(){it("should generate time with suffix by default",function(){expect(i.withoutSuffix).toBe(!1)})}),describe("angularMomentConfig constant",function(){it("should have an empty timezone value by default",function(){expect(r.timezone).toBe("")}),it("should have an empty preprocess value by default",function(){expect(r.preprocess).toBe(null)})})});