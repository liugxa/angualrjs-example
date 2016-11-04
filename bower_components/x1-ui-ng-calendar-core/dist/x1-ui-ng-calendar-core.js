/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-core.module.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core", [
		"angularMoment",
		"pascalprecht.translate"
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-data.service.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.factory("CalendarCoreDataService", ["calendarCoreConstants",
		function(calendarCoreConstants) {
			"use strict";

			var today = moment();
			var initDate = "20140510";
			var quartersSubName = ["Jan", "Mar", "Apr", "Jun", "Jul", "Sep", "Oct", "Dec"];
			var dayNamesShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
			var monthNamesShort = [
				{name: "Jan"},
				{name: "Feb"},
				{name: "Mar"},
				{name: "Apr"},
				{name: "May"},
				{name: "Jun"},
				{name: "Jul"},
				{name: "Aug"},
				{name: "Sep"},
				{name: "Oct"},
				{name: "Nov"},
				{name: "Dec"}
			];
			var quartersName = [
				{
					name: "Q1",
					subNameStart: quartersSubName[0],
					subNameEnd: quartersSubName[1]
				},
				{
					name: "Q2",
					subNameStart: quartersSubName[2],
					subNameEnd: quartersSubName[3]
				},
				{
					name: "Q3",
					subNameStart: quartersSubName[4],
					subNameEnd: quartersSubName[5]
				},
				{
					name: "Q4",
					subNameStart: quartersSubName[6],
					subNameEnd: quartersSubName[7]
				}
			];
			var minDate = {
				quarter: 1,
				day: 1,
				month: 1,
				year: 2013,
				dateId: "20130101"
			};
			var maxDate = {
				quarter: today.quarter(),
				day: today.date(),
				month: today.month() + 1,
				year: today.year(),
				dateId: today.format(calendarCoreConstants.DATE_FORMAT.DATE_ID)
			};

			return {
				setOffsetDates: function(timeOffest) {
					today = moment().utcOffset(timeOffest);
					maxDate = {
						quarter: today.quarter(),
						day: today.date(),
						month: today.month() + 1,
						year: today.year(),
						dataId: today.format(calendarCoreConstants.DATE_FORMAT.DATE_ID)
					};
				},
				getInitDate: function() {
					return initDate;
				},
				getMaxDate: function() {
					return maxDate;
				},
				getMinDate: function() {
					return minDate;
				},
				getDayNamesShort: function() {
					return dayNamesShort;
				},
				getMonthNamesShort: function() {
					return monthNamesShort;
				},
				getQuartersName: function() {
					return quartersName;
				},
				getQuartersSubName: function() {
					return quartersSubName;
				}
			};
		}
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-quarter.service.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.factory("CalendarCoreQuarterService", [
		"CalendarCoreUiService", "CalendarCoreDataService", "moment", "calendarCoreConstants",
		function(CalendarCoreUiService, CalendarCoreDataService, moment, calendarCoreConstants) {
			"use strict";


			var service = {
				quartersName: CalendarCoreDataService.getQuartersName(),
				quartersSubName: CalendarCoreDataService.getQuartersSubName(),
				monthNamesShort: CalendarCoreDataService.getMonthNamesShort(),

				setFiscalData: function(fiscal) {
					this.fiscalData = fiscal;
					this.isFiscal = !!fiscal;
				},

				getQuarters: function(minDate, maxDate) {
					if (this.fiscalData) {
						return this.getFiscalQuarters();
					} else {
						return this.getGregorianQuarters(minDate, maxDate);
					}
				},

				getEndDate: function(endDate, maxDate) {
					var lastSelectedDate = moment(endDate, calendarCoreConstants.DATE_FORMAT.DATE_ID);
					if (lastSelectedDate.isAfter(maxDate)) {
						return maxDate.format(calendarCoreConstants.DATE_FORMAT.DATE_ID);
					} else {
						return endDate;
					}
				},

				getGregorianQuarters: function(min, max) {
					var minDate = moment(min || CalendarCoreUiService.getMinDate("quarters"));
					var maxDate = moment(max || CalendarCoreUiService.getMaxDate("quarters"));
					var minYear = minDate.get("year");
					var maxYear = maxDate.get("year");
					var result = {};
					while (minYear <= maxYear) {
						result[minYear] = getYearQuarters(minYear, maxDate);
						minYear++;
					}
					return result;
				},

				getFiscalQuarters: function() {
					var fiscalQuarters = this.fiscalData.quarters.data;
					var result = {};
					var quarterNumber = 1;
					var quarter;
					var endDate;
					var startMonth;
					var endMonth;
					var year;
					var i;

					for (i = 0; i < fiscalQuarters.length; i += 1) {
						quarter = fiscalQuarters[i];
						quarterNumber = year !== +(quarter.toString().substr(0, 4)) ? 1 : quarterNumber;
						year = +(quarter.toString().substr(0, 4));
						result[year] = result[year] || [];
						endDate = CalendarCoreUiService.getPreviousDate(fiscalQuarters[i + 1]);
						startMonth = CalendarCoreUiService.getDateObjFromStr(quarter).month;
						endMonth = CalendarCoreUiService.getDateObjFromStr(endDate).month;
						result[year].push({
							name: "Q" + quarterNumber++,
							subNameStart: this.monthNamesShort[startMonth].name,
							subNameEnd: this.monthNamesShort[endMonth].name,
							startDate: +quarter,
							endDate: +endDate
						});
					}
					return result;
				}
			};

			function getYearQuarters(minYear, maxDate) {
				var quarters = [];
				var currentQuarter;
				var i;

				for (i = 0; i < service.quartersName.length; i++) {
					currentQuarter = moment(minYear, "YYYY").quarter(i + 1);

					quarters.push({
						startDate: +currentQuarter.startOf("quarter")
							.format(calendarCoreConstants.DATE_FORMAT.DATE_ID),
						endDate: +service.getEndDate(currentQuarter.endOf("quarter")
							.format(calendarCoreConstants.DATE_FORMAT.DATE_ID), maxDate),

						name: "Q" + (i + 1),
						subNameStart: service.quartersSubName[i * 2],
						subNameEnd: service.quartersSubName[i * 2 + 1]
					});
				}
				return quarters;
			}

			return service;
		}]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-ui.service.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.factory("CalendarCoreUiService", ["moment", "calendarCoreConstants", "CalendarCoreDataService",
		function(moment, calendarCoreConstants, CalendarCoreDataService) {
			"use strict";


			return {
				isFiscal: !!this.fiscalData,
				initDate: CalendarCoreDataService.getInitDate(),
				minDate: CalendarCoreDataService.getMinDate(),
				maxDate: CalendarCoreDataService.getMaxDate(),
				monthNamesShort: CalendarCoreDataService.getMonthNamesShort(),
				dayNamesShort: CalendarCoreDataService.getDayNamesShort(),

				setFiscalData: function(data) {
					this.fiscalData = data;
					this.isFiscal = !!data;
				},

				getFiscalData: function() {
					return this.fiscalData;
				},

				getMonthName: function(nonStandardYear, monthIndex) {
					return nonStandardYear ? "Period" : this.monthNamesShort[monthIndex].name;
				},

				getMonth: function(yearIndex, monthIndex, nonStandardYear) {
					return {
						name: this.getMonthName(nonStandardYear, monthIndex),
						periodNum: nonStandardYear ? (monthIndex + 1) : "",
						start: +this.fiscalData.months.data[yearIndex],
						end: +moment(this.fiscalData.months.data[yearIndex + 1],
							calendarCoreConstants.DATE_FORMAT.DATE_ID).subtract(1, "days")
							.format(calendarCoreConstants.DATE_FORMAT.DATE_ID)
					};
				},

				getMonthNameShort: function(year) {
					return this.isFiscal ? this.getMonthNameShortFiscal(year) : this.monthNamesShort;
				},

				getMonthNameShortFiscal: function(year) {
					var month = [];
					var fiscalYears = this.fiscalData.years;
					var yearNum = this.getYearNumFiscal(year);
					var i;

					if (yearNum >= 0) {
						var yearCountMonth = fiscalYears.yearCountMonths[yearNum];
						var yearStartMonth = fiscalYears.yearStartMonths[yearNum] - 1;
						var yearStartDate = fiscalYears.data[yearNum];
						var nonStandardYear = fiscalYears.nonStandard[yearNum];

						var yearIndex = this.getYearIndexFiscal(yearStartDate);

						if (!nonStandardYear) {
							for (i = yearStartMonth; i < yearCountMonth; i++, yearIndex++) {
								month.push(this.getMonth(yearIndex, i, nonStandardYear));
							}

							for (i = 0; i < yearStartMonth; i++, yearIndex++) {
								month.push(this.getMonth(yearIndex, i, nonStandardYear));
							}
						} else {
							for (i = 0; i < yearCountMonth; i++, yearIndex++) {
								month.push(this.getMonth(yearIndex, i, nonStandardYear));
							}
						}

					}
					return month;
				},

				getDayNameShort: function(date) {
					if (this.isFiscal) {
						var dayNames = this.dayNamesShort.slice();
						var firstDayOfWeek = this.getFirstDayOfWeek(date);
						var end = dayNames.splice(0, firstDayOfWeek);
						return dayNames.concat(end);
					} else {
						return this.dayNamesShort;
					}
				},

				getYearNumFiscal: function(year) {
					var fiscalYears = this.fiscalData.years.data;
					var length = fiscalYears.length;
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var lastYear;
					var i;

					//the last item is actually the end date
					for (i = 0; i < length - 1; i++) {
						if (moment(fiscalYears[i], format).get("year") === year) {
							return i;
						}
					}

					lastYear = moment(fiscalYears[length - 1], format).subtract(1, "day").get("year");
					
					if (lastYear === year) { 
						return length - 2;
					}
					
					return -1;
				},

				getYearIndexFiscal: function(yearStartDate) {
					var fiscalMonths = this.fiscalData.months.data;
					var length = fiscalMonths.length;
					var i;

					for (i = 0; i < length; i++) {
						if (fiscalMonths[i] === yearStartDate) {
							return i;
						}
					}
					return -1;
				},

				getInitDate: function() {
					return this.initDate;
				},

				getFiscalMaxDate: function(type) {
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var data = this.fiscalData[type].data;
					var maxDate = data[data.length - 1].toString();
					maxDate = moment(maxDate, format).subtract(1, "days").format(format);
					maxDate = this.getDateObjFromStr(maxDate);

					return {
						day: maxDate.day,
						month: maxDate.month,
						year: maxDate.year,
						quarter: maxDate.quarter,
						dateId: maxDate.dateId
					};
				},

				getFiscalMaxDateID: function(type) {
					var data = this.fiscalData[type].data;
					return data[data.length - 1];
				},

				getMaxDate: function(type) {
					var fiscalMaxDateID;
					var dateMoment;
					var maxDateId;

					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var maxDateObj = {
						day: this.maxDate.day,
						month: this.maxDate.month - 1,
						year: this.maxDate.year,
						quarter: this.maxDate.quarter,
						dateId: this.maxDate.dateId
					};
					if (!this.isFiscal) {
						return maxDateObj;
					} else {
						fiscalMaxDateID = this.getFiscalMaxDateID(type);
						fiscalMaxDateID = moment(fiscalMaxDateID.toString(), format)
							.subtract(1, "day")
							.format(format);
						dateMoment = moment({
							year: +this.maxDate.year,
							month: this.maxDate.month - 1,
							day: +this.maxDate.day
						});
						maxDateId = dateMoment.format(calendarCoreConstants.DATE_FORMAT.DATE_ID);
						return (+fiscalMaxDateID < +maxDateId) ? this.getFiscalMaxDate(type) : maxDateObj;
					}
				},

				getFiscalMinDate: function(type) {
					var data = this.fiscalData[type].data[0];
					var minDate = this.getDateObjFromStr(data);
					return {
						day: minDate.day,
						month: minDate.month,
						year: minDate.year,
						quarter: minDate.quarter,
						dateId: data
					};
				},

				getFiscalMinDateID: function(type) {
					var data = this.fiscalData[type].data;
					return data[0];
				},

				getMinDate: function() {
					return {
						day: this.minDate.day,
						month: this.minDate.month - 1,
						year: this.minDate.year,
						quarter: this.minDate.quarter,
						dateId: this.minDate.dateId
					};
				},

				setMinDate: function(dateId) {
					var momentDate;

					if (dateId) {
						momentDate = moment(dateId, calendarCoreConstants.DATE_FORMAT.DATE_ID);
						this.minDate.day = momentDate.date();
						this.minDate.month = momentDate.month() + 1;
						this.minDate.quarter = momentDate.quarter();
						this.minDate.year = momentDate.year();
						this.minDate.dateId = dateId;
					}
				},

				setMaxDate: function(dateId) {
					var momentDate;

					if (dateId) {
						momentDate = moment(dateId, calendarCoreConstants.DATE_FORMAT.DATE_ID);
						this.maxDate.day = momentDate.date();
						this.maxDate.month = momentDate.month() + 1;
						this.maxDate.quarter = momentDate.quarter();
						this.maxDate.year = momentDate.year();
						this.maxDate.dateId = dateId;
					}
				},

				getDateObjFromStr: function(dateId) {
					var momentDate = moment("" + dateId, calendarCoreConstants.DATE_FORMAT.DATE_ID);
					var month = momentDate.month();
					return {
						dateId: dateId,
						year: momentDate.year(),
						quarter: momentDate.quarter() - 1,
						month: month,
						day: momentDate.date(),
						data: "" + dateId,
						options: this.monthNamesShort[month]
					};
				},

				getDatesArray: function(date, useSelectedDate, shiftedTime) {
					var i;
					var j;
					var newDate;
					var title;
					var arrayDates = [];
					var disableDay = false;
					var daysInCurrentMonth = true;
					var today = false;
					var fiscalWeek;

					shiftedTime = shiftedTime || moment().utcOffset();

					var toDate = date.endDate || this.getMaxDateForCalendar(date);
					var fromDate = date.startDate || this.getMinDateForCalendar(date);
					var startDate = moment(fromDate).format(calendarCoreConstants.DATE_FORMAT.DATE_ID);
					//create copy
					fromDate = moment(fromDate);

					var firstDayOfWeeks = this.getFirstDayOfWeek(date);
					var firstDay = fromDate.get("day");
					var calendarStartDay = 7 - firstDayOfWeeks + firstDay > 6 ? firstDay - firstDayOfWeeks :
					7 - firstDayOfWeeks + firstDay;

					//get first date for calendar
					fromDate.subtract(calendarStartDay, "days");

					var countWeeks = Math.ceil((toDate.diff(fromDate, "days") + 1) / 7);

					for (i = 0; i < countWeeks; i++) {
						arrayDates[i] = [];

						for (j = 0; j < 7; j++) {

							//check if days in current month
							daysInCurrentMonth = this.displayDay(startDate, toDate, fromDate);

							//check if today
							today = fromDate.format(calendarCoreConstants.DATE_FORMAT.DATE_ID) ===
								moment().utcOffset(shiftedTime).format(calendarCoreConstants.DATE_FORMAT.DATE_ID);

							//check if date in our date range
							disableDay = this.checkForDisableDay(fromDate, "weeks");

							title = (daysInCurrentMonth && !disableDay) ? this.formatTitle(fromDate.toDate()) : "";

							//push object
							newDate = {
								day: fromDate.get("date"),
								month: fromDate.get("month"),
								year: fromDate.get("year"),
								title: title,
								disable: disableDay,
								daysInCurrentMonth: daysInCurrentMonth,
								today: today,
								fiscalData: {
									startDate: moment(startDate, calendarCoreConstants.DATE_FORMAT.DATE_ID),
									endDate: toDate
								},
								data: fromDate.format(calendarCoreConstants.DATE_FORMAT.DATE_ID),
								maxDate: this.isMinMaxDate(fromDate, "MAX", "weeks", date),
								minDate: this.isMinMaxDate(fromDate, "MIN", "weeks", date)
							};

							if (this.isFiscal) {
								fiscalWeek = this.fromGregorianToFiscalWeek(newDate, useSelectedDate);
								newDate.week = fiscalWeek.index;
								newDate.fiscal = fiscalWeek.fiscal;
								newDate.fiscalDateType = fiscalWeek.type;
								newDate.fiscalStart =
									(+fromDate.format(calendarCoreConstants.DATE_FORMAT.DATE_ID) ===
									fiscalWeek.fiscal);
								newDate.fiscalEnd = fromDate
										.format(calendarCoreConstants.DATE_FORMAT.DATE_ID) ===
									moment(fiscalWeek.nextWeek,
										calendarCoreConstants.DATE_FORMAT.DATE_ID).subtract(1, "days")
										.format(calendarCoreConstants.DATE_FORMAT.DATE_ID);
							}

							arrayDates[i].push(newDate);
							fromDate.add(1, "days");
						}

					}
					return arrayDates;
				},

				getPreviousDate: function(dateStr) {
					var date = moment(this.getDateObjFromStr(dateStr));
					date.subtract(1, "days");
					return date.format(calendarCoreConstants.DATE_FORMAT.DATE_ID);
				},

				displayDay: function(_fromDate, _toDate, _currentDate) {
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var fromDate = moment(_fromDate, format);

					if (!this.isFiscal) {
						fromDate.startOf("month");
					}

					//if we have dates in/out range
					return (+_toDate.format(format) >= +_currentDate.format(format)) &&
						(+fromDate.format(format) <= +_currentDate.format(format));
				},

				getWeekEndDate: function(dateObject, useSelectedDate) {
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var endWeek = +dateObject.data.fiscal;
					var weeks = this.fiscalData.weeks.data;
					var weekEndDate;
					var nextWeek;
					var indexMonth;

					indexMonth = weeks.indexOf(endWeek);
					nextWeek = weeks[indexMonth + 1];
					weekEndDate = moment(nextWeek, dateFormat).subtract(1, "days");

					var maxEnd = moment(this.getMaxDate("weeks"));
					var resultDate = (weekEndDate.isAfter(maxEnd) && !useSelectedDate) ? maxEnd : weekEndDate;
					// set week index of passed week data
					dateObject.index = indexMonth;
					return resultDate.format(dateFormat);
				},

				getStartDate: function(dateObject) {
					var date = this.isFiscal && dateObject.data ? dateObject.data.fiscal : dateObject;
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var startDate = moment(date, dateFormat);
					var minDate = moment(this.getMinDate());

					return startDate.isAfter(minDate) ?
						startDate.format(dateFormat) :
						minDate.format(dateFormat);
				},

				getEndDate: function(dateObject, type, useSelectedDate) {
					var date = this.isFiscal && dateObject.data ? dateObject.data.fiscal : dateObject;
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var endDate = moment(date, dateFormat);
					var maxDate = moment(this.getMaxDate(type));

					return (endDate.isAfter(maxDate) && !useSelectedDate) ?
						maxDate.format(dateFormat) :
						endDate.format(dateFormat);
				},

				getFirstDayOfWeek: function(date) {
					var fiscalYears;
					var length;
					var i;
					if (!this.isFiscal) {
						return 0;
					}

					fiscalYears = this.fiscalData.years;
					length = fiscalYears.data.length;

					for (i = 0; i < length - 1; i++) {
						var currYear = moment("" + fiscalYears.data[i],
							calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
						if (currYear === date.year) {
							return fiscalYears.firstDayOfWeeks[i] - 1;
						}
					}

					return fiscalYears.firstDayOfWeeks[length - 2] - 1;
				},

				getMaxDateForCalendar: function(date) {
					if (!this.isFiscal) {
						return moment({
							year: date.year,
							month: date.month,
							day: 1
						}).endOf("month");
					}

					var monthIndex;
					var fiscalWeeks = this.fiscalData.weeks.data;

					for (var i = 0; i < fiscalWeeks.length; i++) {
						if (+fiscalWeeks[i].toString().substr(4, 2) === (date.month + 1) &&
							+fiscalWeeks[i].toString().substr(0, 4) === date.year) {
							monthIndex = i;
						}
					}

					var maxDate = fiscalWeeks[monthIndex + 1];

					return moment({
						year: +maxDate.toString().substr(0, 4),
						month: +maxDate.toString().substr(4, 2) - 1,
						day: +maxDate.toString().substr(6, 2)
					});

				},

				getMinDateForCalendar: function(date) {
					if (!this.isFiscal) {
						return moment({
							year: date.year,
							month: date.month,
							day: 1
						}).startOf("month");
					}

					var monthIndex;
					var fiscalMonths = this.fiscalData.weeks.data;
					var length = fiscalMonths.length;
					var i;

					for (i = 0; i < length; i++) {
						if (+fiscalMonths[i].toString().substr(4, 2) === (date.month + 1) &&
							+fiscalMonths[i].toString().substr(0, 4) === date.year) {
							monthIndex = i;
							break;
						}
					}

					var minDate = fiscalMonths[monthIndex];
					return moment({
						year: +minDate.toString().substr(0, 4),
						month: minDate.toString().substr(4, 2) - 1,
						day: +minDate.toString().substr(6, 2)
					});

				},

				checkForDisableDay: function(momentDate, type) {
					var disable;
					var minDateObj = this.getJsDAte(this.getMinDate(type));
					var maxDateObj = this.getJsDAte(this.getMaxDate(type));

					disable = (new Date(momentDate.toDate().toDateString()) >
						new Date(maxDateObj.toDateString()) ||
						new Date(momentDate.toDate().toDateString()) <
						new Date(minDateObj.toDateString())
					);

					return disable;
				},

				isMinMaxDate: function(dateMoment, type, periodType, date) {
					var result;
					var minDateObj = this.getJsDAte(this.getMinDate(periodType));
					var maxDateObj = this.getJsDAte(this.getMaxDate(periodType));

					switch (type) {
						case "MAX" :
							result = dateMoment.toDate().toDateString() ===
								maxDateObj.toDateString();
							if (date && date.endDate) {
								result = date.endDate.isSame(dateMoment);
							}
							break;
						case "MIN" :
							result = dateMoment.toDate().toDateString() ===
								minDateObj.toDateString();
							if (date && date.startDate) {
								result = moment(date.options.start,
									calendarCoreConstants.DATE_FORMAT.DATE_ID)
									.isSame(dateMoment);
							}
							break;
						default :
							break;
					}

					return result;
				},

				getJsDAte: function(obj) {
					return new Date(obj.year, obj.month, obj.day);
				},

				formatTitle: function(date) {
					var day = date.getDate();
					var month = date.getMonth();
					var year = date.getFullYear();
					var monthName = this.monthNamesShort[month].name;

					return monthName + " " + day + ", " + year;
				},

				formatNumber: function(date) {
					return date < 10 ? "0" + date : date;
				},

				getNextDate: function(date) {
					if (this.isFiscal) {
						var currentFiscalData = this.fromGregorianToFiscalMonth(date);
						var nextFiscalData = this.getNextFiscalMonth(currentFiscalData.options.start);

						return this.fromGregorianToFiscalMonth(nextFiscalData);
					}

					var month = date.month;
					var year = date.year;

					month++;

					if (month === 12) {
						month = 0;
						++year;
					}

					return {
						dateId: ""+year+month+"01",
						month: month,
						year: year,
						options: {
							name: this.monthNamesShort[month].name
						}
					};
				},

				getDate: function(date) {
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;

					return {
						dateId: moment(date).format(dateFormat),
						month: date.month,
						year: date.year,
						data: moment(date).format(dateFormat),
						options: {
							name: this.monthNamesShort[date.month].name
						}
					};
				},

				checkMaxDate: function(config) {
					var momentRightDate = moment(config.rightDate);
					var momentMaxDate = moment(config.maxDate);
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var data;

					if (+momentRightDate.format(dateFormat) > +momentMaxDate.format(dateFormat)) {
						data = this.getDate(config.maxDate);
						config.leftDate = config.singleView ? data : this.getPrevDate(data);
						config.rightDate = this.getNextDate(config.leftDate);
					}
					return {
						rightDate: config.rightDate,
						leftDate: config.leftDate
					};
				},

				checkMinDate: function(config) {
					var momentLeftDate = moment(config.leftDate);
					var momentMinDate = moment(config.minDate);
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var data;

					if (+momentLeftDate.format(dateFormat) < +momentMinDate.format(dateFormat)) {
						data = this.getDate(config.minDate);
						config.rightDate = config.isSingle ? data : this.getNextDate(data);
						config.leftDate = this.getPrevDate(config.rightDate);
					}
					return {
						rightDate: config.rightDate,
						leftDate: config.leftDate
					};
				},

				getMonthFromPrevNextYear: function(date, type) {
					var month = this.fiscalData.months.data;
					var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var currentDate = moment(date);
					var length = month.length;
					var neededMonth;
					var i;

					currentDate = type === "next" ? currentDate.add(1, "years") : currentDate.subtract(1, "years");
					currentDate = +currentDate.format(dateFormat);

					for (i = 0; i < length - 1; i++) {
						if (+month[i] <= currentDate && currentDate < +month[i + 1]) {
							neededMonth = i > 0 ? month[i] : month[0];
							break;
						}
					}

					return this.fromGregorianToFiscalMonth({data: neededMonth});
				},

				getPrevNextYear: function(date, type) {
					var years = this.fiscalData.years.data;
					var currentDate = +moment(date).format("YYYYMMDD");
					var length = years.length;
					var prevYear;
					var nextYear;
					var result;
					var i;

					for (i = 0; i < length - 1; i++) {
						if (+years[i] <= currentDate && currentDate < +years[i + 1]) {
							prevYear = i > 0 ? years[i - 1] : years[0];
							nextYear = years[i + 1];
							break;
						}
					}

					result = {
						next: nextYear || years[length],
						prev: prevYear
					};

					return this.fromGregorianToFiscalMonth({data: result[type]});
				},

				getPrevDate: function(date) {
					if (this.isFiscal) {
						var currentFiscalData = this.fromGregorianToFiscalMonth(date);
						var nextFiscalData = this.getPrevFiscalMonth(currentFiscalData.options.start);

						return this.fromGregorianToFiscalMonth(nextFiscalData);
					}

					var month = date.month;
					var year = date.year;

					month--;

					if (month === -1) {
						month = 11;
						--year;
					}

					return {
						month: month,
						year: year,
						options: {
							name: this.monthNamesShort[month].name
						}
					};
				},

				getLeftSideDate: function(date, isSingleView) {
					var currentFiscalData;
					var checkedDate;
					var maxDate;


					maxDate = this.getMaxDate("weeks");
					checkedDate = isSingleView ? date : this.getNextDate(date);

					if (!checkedDate || +maxDate.dateId <= +checkedDate.dateId) {
						date = maxDate;

						if (!isSingleView) {
							date = this.getPrevDate(date);
						}
					}

					//if we have fiscal calendar - translate it to the fiscal mode
					if (this.isFiscal) {
						currentFiscalData = this.fromGregorianToFiscalMonth(date);
						return this.fromGregorianToFiscalMonth(currentFiscalData);
					}

					date.options = {
						name: this.monthNamesShort[date.month].name
					};

					return date;
				},

				isSelectedWeek: function(date, selectedDate) {
					var activeWeek = false;
					var year = selectedDate.year;
					var month = selectedDate.month;
					var day = selectedDate.day;

					for (var i = 0; i < 7; i++) {
						var matchYears = date[i].year === year;
						var matchMonths = date[i].month === month;
						var matchWeeks = date[i].day === day;

						activeWeek = activeWeek || (matchYears && matchMonths && matchWeeks);
					}
					return activeWeek;
				},

				getStartEndDateOfFiscalYear: function(year) {
					var yearData = this.fiscalData.years.data;
					for (var i = 0; i < yearData.length - 1; i++) {
						var startDate = yearData[i];
						var currYear =
							moment("" + startDate, calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
						if (currYear === year) {
							var nextFiscalYear = yearData[i + 1];
							var endDate = this.getPreviousDate(nextFiscalYear);
							return {
								startDate: +startDate,
								endDate: +endDate
							};
						}
					}
				},

				getStartEndDateOfFiscalQuarter: function(currDate, quarters) {
					var startDate;
					var endDate;
					for (var i = 0; i < quarters.length; i++) {
						if (currDate >= +quarters[i].startDate &&
							currDate <= +quarters[i].endDate) {
							startDate = quarters[i].startDate;
							endDate = quarters[i].endDate;
							return {
								startDate: +startDate,
								endDate: +endDate
							};
						}
					}
				},

				/**
				 * convert date from gregorian to fiscal week
				 * @param dateObj
				 * @param useSelectedDate
				 * @returns {*}
				 */
				fromGregorianToFiscalWeek: function(dateObj, useSelectedDate) {
					var type;
					var week;
					var nextWeek;
					var k;
					var weeks = this.fiscalData.weeks.data;
					var fiscalDate = dateObj.data;
					var maxEndDate = moment(this.getMaxDate("weeks"))
						.add(1,	"days")
						.format(calendarCoreConstants.DATE_FORMAT.DATE_ID);
					for (k = 0; k < weeks.length; k++) {
						week = (+weeks[k] > +maxEndDate && !useSelectedDate) ? maxEndDate : weeks[k];
						nextWeek = (+weeks[k + 1] > +maxEndDate && !useSelectedDate) ? maxEndDate : weeks[k + 1];
						if (+fiscalDate >= +week && +fiscalDate < +nextWeek) {
							if (+fiscalDate === +week) {
								type = "first";
							} else if (+fiscalDate === +this.getPreviousDate(nextWeek)) {
								type = "last";
							}
							dateObj.fiscal = week;
							break;
						}
					}
					return {
						type: type,
						index: k,
						fiscal: week,
						nextWeek: nextWeek
					};
				},

				/**
				 *
				 * @param date as string
				 * @returns {{year: *, month: *, data: *, startDate: *, endDate: *, options: *}}
				 */
				fromGregorianToFiscalMonth: function(date) {
					var i;
					var fiscalMonth;
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var dateID = +date.data || +date.dateId;
					var monthArray = this.getMonthNameShort(date.year);
					var lastArrElem = null;
					var fiscalData = this.getFiscalData();
					var fiscalYears = fiscalData.years.data;
					var fiscalYearsLength = fiscalYears.length;
					var startYear = moment(fiscalYears[0], calendarCoreConstants.DATE_FORMAT.DATE_ID).get("year");

					//look in all dates
					for (i = 0; i < fiscalYearsLength; i++) {
						if (monthArray && monthArray.length > 0) {
							lastArrElem = monthArray[monthArray.length - 1];
						}
						monthArray = this.getMonthNameShort(startYear);
						if (lastArrElem) {
							monthArray.unshift(lastArrElem);
						}
						fiscalMonth = this.findFiscalMonth(monthArray, dateID);
						if (fiscalMonth) {
							return {
								dateId: fiscalMonth.currentDate,
								data: fiscalMonth.currentDate,
								options: fiscalMonth.options,
								year: moment(fiscalMonth.currentDate, format).get("year"),
								month: moment(fiscalMonth.currentDate, format).get("month"),
								startDate: moment(fiscalMonth.options.start, format),
								endDate: moment(fiscalMonth.nextDate, format).subtract(1, "days")
							};
						}
						startYear++;
					}
				},

				findFiscalMonth: function(monthArray, dateID) {
					var i;
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;

					for (i = 0; i < monthArray.length; i++) {
						if (dateID >= +monthArray[i].start && dateID <= +monthArray[i].end) {

							return {
								//options for current date
								options: monthArray[i],
								//start date for current date
								currentDate: monthArray[i].start,
								//next date for define end date of current date
								nextDate: moment("" + monthArray[i].end, format).add(1, "day").format(format)
							};
						}
					}
				},

				getNextFiscalMonth: function(dateFiscalStr) {
					var nextMonth;
					var fiscalMonths = this.fiscalData.months.data;
					var length = fiscalMonths.length;
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;

					for (var i = 0; i < length - 1; i++) {
						if (fiscalMonths[i] === dateFiscalStr) {
							nextMonth = fiscalMonths[i + 1];
						}
					}

					//last month
					if (fiscalMonths[length - 1] === dateFiscalStr) {
						return false;
					}

					return {
						data: nextMonth,
						year: moment(nextMonth, format).get("year"),
						month: moment(nextMonth, format).get("month")
					};
				},

				getPrevFiscalMonth: function(dateFiscalStr) {
					var prevMonth;
					var format = calendarCoreConstants.DATE_FORMAT.DATE_ID;
					var fiscalMonths = this.fiscalData.months.data;
					var length = fiscalMonths.length;

					//start from second item
					for (var i = 1; i < length; i++) {
						if (fiscalMonths[i] === dateFiscalStr) {
							prevMonth = fiscalMonths[i - 1];
						}
					}
					//first month
					if (fiscalMonths[0] === dateFiscalStr) {
						return false;
					}

					return {
						data: prevMonth,
						year: moment(prevMonth, format).get("year"),
						month: moment(prevMonth, format).get("month")
					};
				},

				/**
				 * @param startDate as string
				 * @param endDate as string
				 * @param type as string (month, week)
				 * @returns {Number}
				 */
				getNumberOfPeriods: function(startDate, endDate, type) {
					var num;
					var start;
					var end;

					start = moment(startDate, calendarCoreConstants.DATE_FORMAT.DATE_ID);
					end = moment(endDate, calendarCoreConstants.DATE_FORMAT.DATE_ID);
					num = end.diff(start, type);

					return num + 1;
				}
			};

		}]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-core.constant.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.constant("calendarCoreConstants", {
		EVENTS: {
			INPUT_CHANGED: "inputChanged",
			CALENDAR_CLICK: "calendarClick",
			CALENDAR_DATE_CLICKED: "x1.ui.calendarDateClicked",
			CALENDAR_DATA_CHANGED: "x1.ui.calendarDataChanged",
			CALENDAR_DATA_UPDATE: "x1.ui.calendarDataUpdate",
			CALENDAR_MIN_MAX_UPDATE: "x1.ui.calendarMinMaxUpdate"
		},
		DATE_FORMAT: {
			DATE_ID: "YYYYMMDD"
		},
		VIEWS: {
			ANY: "ANY",
			DAY: "DAY",
			WEEK: "WEEK",
			MONTH: "MONTH",
			QUARTER: "QUARTER",
			YEAR: "YEAR"
		}
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-core.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("x1CalendarCoreCtrl", ["$scope", "CalendarCoreDataService", "calendarCoreConstants", "moment",
		function($scope, CalendarCoreDataService, calendarCoreConstants, moment) {
			"use strict";

			var defaultFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;

			/**
			 * watch for definition changes
			 */
			$scope.$watchGroup(["definition.view", "definition.noEndDate"], function(newVal, oldVal) {
				if (newVal !== oldVal) {
					init();
                    $scope.$broadcast(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, {
                        startDate: $scope.config.startDate,
                        endDate: $scope.config.endDate,
						type: newVal[0]
                    });
				}
			});

			$scope.$watchGroup(["definition.minStartDate", "definition.maxEndDate", "definition.maxDateRange"],
				function(newVal, oldVal) {
				if (newVal !== oldVal) {
                    $scope.$broadcast(calendarCoreConstants.EVENTS.CALENDAR_MIN_MAX_UPDATE, {
						minStartDate: "" + newVal[0],
						maxEndDate: "" + newVal[1],
						maxDateRange: "" + newVal[2]
                    });
				}
			});

			/**
			 * calendar data updating triggered by event
			 */
			$scope.$on(calendarCoreConstants.EVENTS.INPUT_CHANGED, function(e, data) {
				var fromFormat = $scope.definition.dateFormat || defaultFormat;
				var view = data.view;
				data = changeDateFormat(data, fromFormat, defaultFormat);
				checkNoEndDate(data);
				data.type = view;
				$scope.$broadcast(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, data);
			});

			/**
			 * catching date changes from calendar-core views
			 */
			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_CLICK, function(e, data) {
				var toFormat = $scope.definition.dateFormat || defaultFormat;
				var isClicked = data.isClicked;
				var numPeriods = data.selectedPeriods;
				//cancel emit
				e.stopPropagation();
				//change date format to output format
				data = changeDateFormat(data, defaultFormat, toFormat);
				data.endDate = $scope.definition.noEndDate ? null : "" + data.endDate;
                data.startDate = "" + data.startDate;
				data.isClicked = isClicked;
				if ($scope.config.multiSelection) {
					data.numPeriods = numPeriods;
				}
				//emit selected dates
				$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_DATA_CHANGED, data);
			});

			function changeDateFormat(date, fromFormat, toFormat) {
				if (fromFormat === toFormat) {
					return  {
						startDate: date.startDate,
						endDate: date.endDate
					};
				}
				return {
					startDate: moment(date.startDate, fromFormat).format(toFormat),
					endDate: moment(date.endDate, fromFormat).format(toFormat)
				};
			}

			function checkNoEndDate(data) {
				if ($scope.config.noEndDate) {
					$scope.config.endDate = $scope.config.maxEndDate;
					$scope.config.view = $scope.config.view === "DAY" ? "ANY" : $scope.config.view;

					if (data) {
						data.endDate = $scope.config.endDate;
					}
				}
			}

			function getDateByType(dateType) {
				var dateFormat = $scope.definition.dateFormat || defaultFormat;

				return $scope.definition.useSelectedDate ?
					(dateType==="startDate" ? $scope.definition.useSelectedDate.selectedStartDate
					: $scope.definition.useSelectedDate.selectedEndDate) :
					moment($scope.definition[dateType], dateFormat).format(defaultFormat);
			}

			/**
			 * init config object
			 */
			function init() {
				var dateFormat = $scope.definition.dateFormat || defaultFormat;
				var offsetTime = $scope.definition.timezone || moment().utcOffset();
				CalendarCoreDataService.setOffsetDates(offsetTime);
				$scope.config = {
					endDate: getDateByType("endDate"),
					startDate: getDateByType("startDate"),
					maxEndDate: ($scope.definition.maxEndDate) ?
						moment($scope.definition.maxEndDate, dateFormat).format(defaultFormat) :
						moment().utcOffset(offsetTime).format(defaultFormat),
					minStartDate: ($scope.definition.minStartDate) ?
						moment($scope.definition.minStartDate, dateFormat).format(defaultFormat) :
						"20130101",
					view: $scope.definition.view,
					noEndDate: $scope.definition.noEndDate,
					maxDateRange: $scope.definition.maxDateRange,
					calendarSize: $scope.definition.calendarSize || "md",
					multiSelection: $scope.definition.multiSelection,
					singleView: $scope.definition.singleView,
					useSelectedDate: !!$scope.definition.useSelectedDate,
					timezone: offsetTime
				};
				checkNoEndDate();
			}

			/**
			 * init calendar-core with new definition
			 */
			init();
		}]);

/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-core.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("x1CalendarCore", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/calendar-core.html",
			scope: {
				definition: "=",
				fiscalData: "="
			}
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * any.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("anyCoreCtrl", ["$scope", "CalendarCoreUiService", "calendarCoreConstants", "moment",
		function($scope, CalendarCoreUiService, calendarCoreConstants, moment) {
			"use strict";

			var CalendarUiService = angular.copy(CalendarCoreUiService);
			var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;

			$scope.singleView = $scope.definition.singleView;
			$scope.dayShortNames = "x1UiNgCalendarCore.dayShortNames.";
			$scope.monthShortNames = "x1UiNgCalendarCore.monthShortNames.";

			$scope.anyDay = {
				init: function(startDateStr, endDateStr) {
					var dates = this.checkMaxRange(startDateStr, endDateStr);

					startDateStr = dates.startDateStr;
					endDateStr = dates.endDateStr;
					this.isSingle = $scope.singleView;
					this.minDate = CalendarUiService.getMinDate("weeks");
					this.maxDate = CalendarUiService.getMaxDate("weeks");

					this.startDate = startDateStr ?
						CalendarUiService.getDateObjFromStr(startDateStr) : {};
					this.endDate = endDateStr ?
						CalendarUiService.getDateObjFromStr(endDateStr) : {};

					this.getLeftRight();
					this.updateCalendar();
				},

				checkMaxRange: function(startDateStr, endDateStr) {
					var startDate = moment(startDateStr, dateFormat);
					var endDate = moment(endDateStr, dateFormat);

					if (!$scope.config.maxDateRange) {
						return {
							startDateStr: startDateStr,
							endDateStr: endDateStr
						};
					}
					if (endDate.diff(startDate, "days") > $scope.config.maxDateRange) {
						endDate = startDate.add($scope.config.maxDateRange, "days");
					}
					return {
						startDateStr: startDateStr,
						endDateStr: endDate.format(dateFormat)
					};

				},
				getLeftRight: function() {
					this.leftDate = CalendarUiService.getLeftSideDate(this.startDate, $scope.singleView);
					this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					
					$scope.dayNamesShortLeft = CalendarUiService.getDayNameShort(this.leftDate);
					if (!this.isSingle) {
						$scope.dayNamesShortRight = CalendarUiService.getDayNameShort(this.rightDate);	
					}
				},

				/**
				 * click on next button
				 */
				next: function() {
					this.leftDate = CalendarUiService.getNextDate(this.leftDate);
					this.processRightPart(CalendarUiService.getNextDate, this.rightDate);
					this.updateCalendar();
				},

				/**
				 * click on prev year button
				 */
				prevYear: function() {
					var prevDate;
					if ($scope.fiscalData) {
						this.leftDate = CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "prev");
						this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					} else {
						this.leftDate.year -= 1;
						this.rightDate.year -= 1;
					}
					prevDate = CalendarUiService.checkMinDate({
						leftDate: this.leftDate,
						rightDate: this.rightDate,
						minDate: this.minDate,
						isSingle: this.isSingle
					});
					this.leftDate = prevDate.leftDate;
					this.rightDate = prevDate.rightDate;
					this.updateCalendar();
				},

				/**
				 * click on next year button
				 */
				nextYear: function() {
					var nextDate;
					var config;

					if ($scope.fiscalData) {
						this.leftDate = CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "next");
						this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					} else {
						this.leftDate.year += 1;
						this.rightDate.year += 1;
					}
					config = {
						leftDate: this.leftDate,
						rightDate: this.rightDate,
						maxDate: this.maxDate,
						singleView: $scope.singleView
					};

					nextDate = CalendarUiService.checkMaxDate(config);

					this.leftDate = nextDate.leftDate;
					this.rightDate = nextDate.rightDate;
					this.updateCalendar();
				},

				/**
				 * click on previous button
				 */
				prev: function() {
					this.leftDate = CalendarUiService.getPrevDate(this.leftDate);
					this.processRightPart(CalendarUiService.getPrevDate, this.rightDate);
					this.updateCalendar();
				},

				/**
				 * check is disabled next
				 */
				isDisableNext: function() {
					var compareDate = $scope.singleView ? this.leftDate : this.rightDate;

					return compareDate.year >= this.maxDate.year &&
						compareDate.month >= this.maxDate.month;
				},

				isDisablePrevYear: function() {
					var prevYear = +this.leftDate.year;
					var minYear = +this.minDate.year;
					return prevYear <= minYear;
				},

				isDisableNextYear: function() {
					var compareDate = $scope.singleView ? this.leftDate : this.rightDate;

					var nextYear = +compareDate.year;
					var maxYear = +this.maxDate.year;
					var result = nextYear >= maxYear;
					if ($scope.fiscalData) {
						return result || !CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "next");
					}
					return result;
				},

				/**
				 * check is disabled prev
				 */
				isDisablePrev: function() {
					return this.leftDate.year <= this.minDate.year &&
						this.leftDate.month <= this.minDate.month;
				},

				isStartDate: function(date) {
					var inputDate = +date.data;
					var startDate = +this.startDate.data;
					return inputDate === startDate;
				},

				isEndDate: function(date) {
					var inputDate = +date.data;
					if (!this.endDate) {
						return false;
					}
					var endDate = +this.endDate.data;
					return inputDate === endDate;
				},

				isInRange: function(date) {
					var inputDate = +date.data;
					var startDate = +this.startDate.data;
					if (!this.endDate) {
						return false;
					}
					var endDate = +this.endDate.data;

					return inputDate > startDate && inputDate < endDate;
				},

				updateCalendar: function() {
					this.calendarLeft = CalendarUiService.getDatesArray(this.leftDate, null, $scope.config.timezone);
					
					if (this.isSingle) {
						return;
					}
					this.calendarRight = CalendarUiService.getDatesArray(this.rightDate, null, $scope.config.timezone);
				},

				maxDateRange: function(obj) {
					//if we have new range just return false to continue script
					//if we don't have maxDateRange we have to return false too
					if (this.startDateSelected || !$scope.config.maxDateRange) {
						return false;
					}

					var startDate = moment(this.startDate.data, "YYYYMMDD");
					var clickedDate = moment(obj.data, "YYYYMMDD");

					if (startDate.diff(clickedDate, "days") > $scope.config.maxDateRange) {
						this.startDate = obj;
						this.endDate = obj;
						this.startDateSelected = true;
						return true;
					}

					return false;
				},

				click: function(obj) {
					if ($scope.config.noEndDate) {
						this.startDateSelected = true;
						this.startDate = obj;
					} else if (!this.maxDateRange(obj)) {
						if (!this.startDateSelected && (+obj.data > +this.endDate.data)) {
							this.startDate = obj;
							this.endDate = obj;
							this.startDateSelected = true;
						} else {
							if (+obj.data < +this.startDate.data) {
								this.endDate = this.startDate;
								this.startDate = obj;
							} else {
								this.endDate = obj;
							}
							this.startDateSelected = false;
						}
					}

					this.applyDates(true);
				},

				applyDates: function(isClicked) {
					var endDate;
					var startDate;

					//Java script months starts with 0
					startDate = moment();
					startDate.set("year", this.startDate.year);
					startDate.set("month", this.startDate.month);
					startDate.set("date", this.startDate.day);
					startDate = startDate.format(dateFormat);

					if (this.endDate) {
						endDate = moment();
						endDate.set("year", this.endDate.year);
						endDate.set("month", this.endDate.month);
						endDate.set("date", this.endDate.day);
						endDate = endDate.format(dateFormat);
					}

					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_CLICK, {
						startDate: startDate,
						endDate: endDate,
						anySelectionDone: !this.startDateSelected,
						isClicked: isClicked,
                        selectedPeriods: CalendarUiService.getNumberOfPeriods(startDate, endDate, "days")
                    });
				},
				
				processRightPart: function (fn, arg) {
					this.rightDate = this.isSingle ? {} : fn.call(CalendarUiService, arg);
				}
			};

			CalendarUiService.setFiscalData($scope.fiscalData);
			CalendarUiService.setMinDate($scope.config.minStartDate);
			CalendarUiService.setMaxDate($scope.config.maxEndDate);

			$scope.anyDay.init($scope.config.startDate, $scope.config.endDate);
			$scope.anyDay.applyDates();

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, function(e, date) {
				if (date.type === calendarCoreConstants.VIEWS.ANY) {
					$scope.anyDay.init(date.startDate, date.endDate);
				}
			});

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_MIN_MAX_UPDATE, function(e, date) {
				CalendarUiService.setMinDate(date.minStartDate);
				CalendarUiService.setMaxDate(date.maxEndDate);

				$scope.anyDay.minDate = CalendarUiService.getMinDate("weeks");
				$scope.anyDay.maxDate = CalendarUiService.getMaxDate("weeks");

				$scope.config.maxDateRange = +date.maxDateRange;
				$scope.anyDay.updateCalendar();
			});
		}
	]);
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-any.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("calendarCoreAny", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/any/any.html",
			controller: "anyCoreCtrl"
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-day.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("calendarCoreDay", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/day/day.html",
			controller: "dayCoreCtrl"
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * day.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("dayCoreCtrl", ["$scope", "CalendarCoreUiService", "calendarCoreConstants",
		function($scope, CalendarCoreUiService, calendarCoreConstants) {
			"use strict";

			var CalendarUiService = angular.copy(CalendarCoreUiService);

			$scope.singleView = $scope.config.singleView;
			$scope.dayShortNames = "x1UiNgCalendarCore.dayShortNames.";
			$scope.monthShortNames = "x1UiNgCalendarCore.monthShortNames.";

			/**
			 * declare main object
			 */
			$scope.calendarDay = {

				/**
				 * declare init
				 * @param dateId
				 */
				init: function(dateId) {
					this.isSingle = $scope.singleView;
					this.minDate = CalendarUiService.getMinDate("weeks");
					this.maxDate = CalendarUiService.getMaxDate("weeks");
					this.selectedDate = CalendarUiService.getDateObjFromStr(dateId);

					this.getLeftRight();
					this.updateCalendar();
				},

				/**
				 * get date for left and right calendar view
				 */
				getLeftRight: function() {
					this.leftDate = CalendarUiService.getLeftSideDate(this.selectedDate, $scope.singleView);
					this.processRightPart(CalendarUiService.getNextDate, this.leftDate);

					$scope.dayNamesShortLeft = CalendarUiService.getDayNameShort(this.leftDate);
					if (!this.isSingle) {
						$scope.dayNamesShortRight = CalendarUiService.getDayNameShort(this.rightDate);
					}
				},

				/**
				 * click on next button
				 */
				next: function() {
					this.leftDate = CalendarUiService.getNextDate(this.leftDate);
					this.processRightPart(CalendarUiService.getNextDate, this.rightDate);
					this.updateCalendar();
				},

				/**
				 * click on previous button
				 */
				prev: function() {
					this.leftDate = CalendarUiService.getPrevDate(this.leftDate);
					this.processRightPart(CalendarUiService.getPrevDate, this.rightDate);
					this.updateCalendar();
				},

				/**
				 * click on prev year button
				 */
				prevYear: function() {
					var prevDate;
					if ($scope.fiscalData) {
						this.leftDate = CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "prev");
						this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					} else {
						this.leftDate.year -= 1;
						this.rightDate.year -= 1;
					}
					prevDate = CalendarUiService.checkMinDate({
						leftDate: this.leftDate,
						rightDate: this.rightDate,
						minDate: this.minDate,
						isSingle: this.isSingle
					});
					this.leftDate = prevDate.leftDate;
					this.rightDate = prevDate.rightDate;
					this.updateCalendar();
				},

				/**
				 * click on next year button
				 */
				nextYear: function() {
					var nextDate;
					var config;

					if ($scope.fiscalData) {
						this.leftDate = CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "next");
						this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					} else {
						this.leftDate.year += 1;
						this.rightDate.year += 1;
					}

					config = {
						leftDate: this.leftDate,
						rightDate: this.rightDate,
						maxDate: this.maxDate,
						singleView: $scope.singleView
					};

					nextDate = CalendarUiService.checkMaxDate(config);

					this.leftDate = nextDate.leftDate;
					this.rightDate = nextDate.rightDate;
					this.updateCalendar();
				},

				/**
				 * check is disabled next
				 */
				isDisableNext: function() {
					var compareDate = $scope.singleView ? this.leftDate : this.rightDate;

					return compareDate.year >= this.maxDate.year &&
						compareDate.month >= this.maxDate.month;
				},

				/**
				 * check is disabled prev
				 */
				isDisablePrev: function() {
					return this.leftDate.year <= this.minDate.year &&
						this.leftDate.month <= this.minDate.month;
				},

				isDisablePrevYear: function() {
					var prevYear = +this.leftDate.year;
					var minYear = +this.minDate.year;
					return prevYear <= minYear;
				},

				isDisableNextYear: function() {
					var compareDate = $scope.singleView ? this.leftDate : this.rightDate;

					var nextYear = +compareDate.year;
					var maxYear = +this.maxDate.year;
					return nextYear >= maxYear;
				},

				/**
				 * check if day is selected (to apply css rules)
				 */
				isSelectedDay: function(day, month, year) {
					var isDay = day === this.selectedDate.day;
					var isMonth = month === this.selectedDate.month;
					var isYear = year === this.selectedDate.year;
					return isDay && isMonth && isYear;
				},

				/**
				 * update view for calendars
				 */
				updateCalendar: function() {
					this.calendarLeft = CalendarUiService.getDatesArray(this.leftDate, null, $scope.config.timezone);
					if (this.isSingle) {
						return;
					}

					this.calendarRight = CalendarUiService.getDatesArray(this.rightDate, null, $scope.config.timezone);
				},

				/**
				 * click on day
				 */
				click: function(obj) {
					this.selectedDate = obj;
					this.applyDates(true);

					var date = this.selectedDate.data;
					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_DATE_CLICKED, {
						startDate: date,
						endDate: date
					});
				},

				/**
				 * send data to somewhere
				 */
				applyDates: function(isClicked) {
					var date = this.selectedDate.data;
					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_CLICK, {
						startDate: date,
						endDate: date,
						isClicked: isClicked
					});
				},

				processRightPart: function (fn, arg) {
					this.rightDate = this.isSingle ? {} : fn.call(CalendarUiService, arg);
				}
			};

			CalendarUiService.setFiscalData($scope.fiscalData);
			CalendarUiService.setMinDate($scope.config.minStartDate);
			CalendarUiService.setMaxDate($scope.config.maxEndDate);

			$scope.calendarDay.init($scope.config.startDate);
			$scope.calendarDay.applyDates();

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, function(e, date) {
				if (date.type === calendarCoreConstants.VIEWS.DAY) {
					$scope.calendarDay.init(date.startDate);
					$scope.calendarDay.applyDates();
				}
			});

		}]);

/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-month.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("calendarCoreMonth", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/month/month.html",
			controller: "monthCoreCtrl"
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * month.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("monthCoreCtrl", ["$scope", "CalendarCoreUiService", "moment", "calendarCoreConstants",
		function($scope, CalendarCoreUiService, moment, calendarCoreConstants) {
			"use strict";

			var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
			var CalendarUiService = angular.copy(CalendarCoreUiService);

			$scope.monthShortNames = "x1UiNgCalendarCore.monthShortNames.";

			/**
			 * declare main object
			 */
			$scope.calendarMonth = {

				/**
				 * init all variable
				 */
				init: function(dateObj) {
					this.minDate = CalendarUiService.getMinDate("months");
					this.maxDate = CalendarUiService.getMaxDate("months");
					this.selectedDate = CalendarUiService.getDateObjFromStr(dateObj.startDate);
					this.startDate = CalendarUiService.getStartDate(dateObj.startDate || dateObj.endDate);
					this.endDate = CalendarUiService.getEndDate(dateObj.endDate || dateObj.startDate,
						"months", $scope.config.useSelectedDate);
					this.activeYear = this.selectedDate.year;
					this.months = CalendarUiService.getMonthNameShort(this.activeYear);
				},

				/**
				 * click on next
				 */
				next: function() {
					++this.activeYear;
					this.months = CalendarUiService.getMonthNameShort(this.activeYear);
				},

				/**
				 * click on prev
				 */
				prev: function() {
					--this.activeYear;
					this.months = CalendarUiService.getMonthNameShort(this.activeYear);
				},

				/**
				 * check is disabled next
				 */
				isDisableNext: function() {
					return this.activeYear >= this.maxDate.year;
				},

				/**
				 * check is disabled prev
				 */
				isDisablePrev: function() {
					return this.activeYear <= this.minDate.year;
				},

				/**
				 * check for active month (apply css class)
				 */
				isActive: function(index, month) {
					if (CalendarUiService.isFiscal) {
						return $scope.config.multiSelection ?
                            +month.start >= +this.startDate && +month.start <= +this.endDate :
                            +this.selectedDate.data >= +month.start && +this.selectedDate.data <= +month.end;
					} else {
                        var date = moment({ month: index, year: this.activeYear })
                            .startOf("month")
                            .format(dateFormat);

                        return $scope.config.multiSelection ? +date >= +this.startDate && +date <= +this.endDate :
                            this.selectedDate.year === this.activeYear && this.selectedDate.month === index;
                    }

				},

                /**
                 * check for start or end month of date range (apply css class)
                 */
                isStartEndMonth: function(index, month) {
					return CalendarUiService.isFiscal ? this.isFiscalStartEndMonth(index, month) :
						this.isGregorianStartEndMonth(index);
                },

				isGregorianStartEndMonth: function(index) {
					var startDate;
					var endDate;
					var isStartMonth;
					var isEndMonth;

					startDate = moment(this.startDate, dateFormat);
					endDate = moment(this.endDate, dateFormat);
					isStartMonth = index === startDate.month() && this.activeYear === startDate.year();
					isEndMonth = index === endDate.month() && this.activeYear === endDate.year();

					return $scope.config.multiSelection ? (isStartMonth || isEndMonth) : isStartMonth;
				},

				isFiscalStartEndMonth:  function(index, month) {
					var isStartMonth;
					var isEndMonth;

					isStartMonth = +this.startDate >= +month.start && +this.startDate <= +month.end;
					isEndMonth =  +this.endDate >= +month.start && +this.endDate <= +month.end;

					return $scope.config.multiSelection ? (isStartMonth || isEndMonth) : isStartMonth;
				},

				/**
				 * check is month disable (apply css class)
				 */
				isDisable: function(index) {
                    if (CalendarUiService.isFiscal) {
                        var maxDateId = moment(this.maxDate).format(dateFormat);
                        var minDateId = moment(this.minDate).format(dateFormat);
                        return (this.maxDate.year <= this.activeYear &&
                            +maxDateId < +$scope.calendarMonth.months[index].start) ||
                            (this.minDate.year >= this.activeYear &&
                            +minDateId > +$scope.calendarMonth.months[index].end);
                    } else {
                        return (this.maxDate.year <= this.activeYear &&
                            this.maxDate.month < index) || (this.minDate.year >= this.activeYear &&
                            this.minDate.month > index);
                    }
				},

				/**
				 * click btn
				 */
				click: function(monthIndex, month) {
					if (CalendarUiService.isFiscal) {
						this.selectedDate = CalendarUiService.getDateObjFromStr(month.start);

                        if (!$scope.config.multiSelection ||
                            (!this.startDateSelected && (+month.start > +this.endDate))) {

                            this.startDate = month.start;
                            this.endDate = month.end;

                            this.startDateSelected = true;
                        } else {
                            if (+month.start < +this.startDate) {

                                this.endDate = this.startDate;
                                this.startDate = month.start;
                            } else {
                                this.endDate = month.end;
                            }
                            this.startDateSelected = false;
                        }
					} else {

                        this.selectedDate = {
                            month: monthIndex,
                            year: this.activeYear
                        };

                        if (!$scope.config.multiSelection || (!this.startDateSelected &&
                            (+moment(this.selectedDate).format(dateFormat) > +this.endDate))) {

                            this.startDate = moment(this.selectedDate)
                                .startOf("month").format(dateFormat);

                            this.endDate = moment(this.selectedDate)
                                .endOf("month").format(dateFormat);

                            this.startDateSelected = true;
                        } else {
                            if (+moment(this.selectedDate).format(dateFormat) < +this.startDate) {

                                this.endDate = moment(this.startDate, dateFormat)
                                    .endOf("month").format(dateFormat);

                                this.startDate = moment(this.selectedDate)
                                    .startOf("month").format(dateFormat);
                            } else {
                                this.endDate = moment(this.selectedDate)
                                    .endOf("month").format(dateFormat);
                            }
                            this.startDateSelected = false;
                        }
                    }
                    this.applyDates(true);
				},

				/**
				 * get start/end date for fiscal calendar
				 */
				getFiscalStartEndDate: function() {
					var startDate;
					var endDate;
					var i;
					var currMonth;
					var startPeriod;
					var endPeriod;
					var length = $scope.calendarMonth.months.length;
					var endFiscal;

					endFiscal = $scope.config.multiSelection ? this.endDate : this.startDate;

					for (i = 0; i < length; i++) {
						currMonth = $scope.calendarMonth.months[i];
						if (this.startDate >= +currMonth.start && this.startDate <= +currMonth.end) {
                            startPeriod = currMonth.periodNum;
                            startDate = currMonth.start;
						}

                        if (endFiscal >= +currMonth.start && endFiscal <= +currMonth.end) {
                            endPeriod = currMonth.periodNum;
                            endDate = (+currMonth.end > +$scope.config.maxEndDate) ?
                                $scope.config.maxEndDate :
                                currMonth.end;
                        }
					}
					return {
                        // setting maxEndDate as endDate for case when this.endDate doesn't exist in fiscal dates
						endDate: endDate || $scope.config.maxEndDate,
						startDate: startDate,
                        selectedMonths: endPeriod - startPeriod + 1
					};
				},

				/**
				 * send data to the server or wherever
				 */
				applyDates: function(isClicked) {
					var startDate;
					var endDate;
					var lastDay;
					var resultDate;
					var lastDayDate;
					var maxDate;
					var selectedMonths;
					var eventObj;
					var firstDayDate;
					var minDate;
					var startDay;

					if (CalendarUiService.isFiscal) {
						resultDate = this.getFiscalStartEndDate();
						startDate = resultDate.startDate;
						endDate = resultDate.endDate;
                        selectedMonths = resultDate.selectedMonths;
					} else {
						lastDayDate = $scope.config.multiSelection ?
							moment(this.endDate, dateFormat) :
							moment(this.startDate, dateFormat);

						lastDayDate = lastDayDate.endOf("month");
						maxDate = moment(this.maxDate);

						lastDay = lastDayDate.isAfter(maxDate) ?
							maxDate.format(dateFormat) : lastDayDate.format(dateFormat);

						firstDayDate = moment(this.startDate, dateFormat).startOf("month");
						minDate = moment(this.minDate);

						startDay = firstDayDate.isAfter(minDate) ?
							firstDayDate.format(dateFormat) : minDate.format(dateFormat);

						startDate = startDay;
						endDate = lastDay;
					}

					endDate = +endDate > +$scope.config.maxEndDate ? $scope.config.maxEndDate : endDate;
					startDate = +startDate < +$scope.config.minStartDate ? $scope.config.minStartDate : startDate;

                    eventObj = {
                        startDate: startDate,
                        endDate: endDate,
                        isClicked: isClicked
                    };

                    if ($scope.config.multiSelection) {
                        // pass additional property needed for back-end purposes
                        eventObj.selectedPeriods = CalendarUiService.isFiscal ?
                            selectedMonths : CalendarCoreUiService.getNumberOfPeriods(startDate, endDate, "months");
                    }

					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_CLICK, eventObj);
				}
			};

			/**
			 * init object
			 */
			CalendarUiService.setFiscalData($scope.fiscalData);
			CalendarUiService.setMinDate($scope.config.minStartDate);
			CalendarUiService.setMaxDate($scope.config.maxEndDate);

			$scope.calendarMonth.init($scope.config);
			$scope.calendarMonth.applyDates();

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, function(e, date) {
				if (date.type === calendarCoreConstants.VIEWS.MONTH) {
					$scope.calendarMonth.init(date);
					$scope.calendarMonth.applyDates();
				}
			});

		}]);

/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-quarter.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("calendarCoreQuarter", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/quarter/quarter.html",
			controller: "quarterCoreCtrl"
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * quarter.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("quarterCoreCtrl", [
		"$scope", "CalendarCoreUiService", "CalendarCoreQuarterService", "calendarCoreConstants",
		function($scope, CalendarCoreUiService, CalendarCoreQuarterService, calendarCoreConstants) {
			"use strict";

			var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
			var CalendarUiService = angular.copy(CalendarCoreUiService);
			var CalendarQuarterService = angular.copy(CalendarCoreQuarterService);

			$scope.monthShortNames = "x1UiNgCalendarCore.monthShortNames.";
			$scope.quarterNames = "x1UiNgCalendarCore.quarterNames.";

			/**
			 * declare main object
			 */
			$scope.calendarQuarter = {

				init: function(dateStr) {
					this.minDate = CalendarUiService.getMinDate("quarters");
					this.maxDate = CalendarUiService.getMaxDate("quarters");
					this.selectedDate = CalendarUiService.getDateObjFromStr(dateStr);

					this.activeYear = this.selectedDate.year;
					this.quartersByYears = CalendarQuarterService.getQuarters(this.minDate, this.maxDate);
					this.quarters = this.quartersByYears[this.activeYear];
					this.years = [];

					for (var i = this.minDate.year; i <= this.minDate.year; i++) {
						this.years.push(i);
					}
				},

				/**
				 * click on next btn
				 */
				next: function() {
					++this.activeYear;
					this.quarters = this.quartersByYears[this.activeYear];
				},

				/**
				 * click on prev btn
				 */
				prev: function() {
					--this.activeYear;
					this.quarters = this.quartersByYears[this.activeYear];
				},

				/**
				 * check is disabled next
				 */
				isDisableNext: function() {
					return this.activeYear >= this.maxDate.year;
				},

				/**
				 * check is disabled prev
				 */
				isDisablePrev: function() {
					return this.activeYear <= this.minDate.year;
				},

				/**
				 * check for active quarter (apply css class)
				 */
				isActive: function(quarterIndex, quarter) {
					var date = +this.selectedDate.data;
					var currentIndex = CalendarUiService.isFiscal ?
						CalendarUiService.getDateObjFromStr(quarter.startDate).quarter : quarterIndex;
					var currentQuarter = $scope.calendarQuarter.quarters[currentIndex];
					var that = this;

					function isStartEnd() {
						return ($scope.config.multiSelection && (+currentQuarter.startDate === that.startDate ||
						+currentQuarter.endDate === that.endDate));
					}

					if (!CalendarUiService.isFiscal) {
						return (isStartEnd() || this.selectedDate.year === this.activeYear &&
							this.selectedDate.quarter === quarterIndex);
					} else {
						return (isStartEnd() || (date >= +quarter.startDate && date < +quarter.endDate));
					}
				},

				/**
				 * check for quarters in range - for multiple selection (apply css class)
				 */
				isInRange: function(quarterIndex, quarter) {
					var currentIndex = CalendarUiService.isFiscal ?
						CalendarUiService.getDateObjFromStr(quarter.startDate).quarter : quarterIndex;
					var currentQuarter = $scope.calendarQuarter.quarters[currentIndex];
					return ($scope.config.multiSelection) && (+currentQuarter.startDate >= +this.startDate &&
						+currentQuarter.endDate <= +this.endDate);
				},

				/**
				 * check is quarter disable (apply css class)
				 */
				isDisable: function(index) {
					var maxDateId = moment(this.maxDate).format(dateFormat);
					var minDateId = moment(this.minDate).format(dateFormat);
					return (this.maxDate.year <= this.activeYear &&
						+maxDateId < +$scope.calendarQuarter.quarters[index].startDate) ||
						(this.minDate.year >= this.activeYear &&
						+minDateId > +$scope.calendarQuarter.quarters[index].endDate);

				},
				/**
				 * click btn
				 */
				click: function(quarterIndex, quarter) {
					if (!CalendarUiService.isFiscal) {
						this.selectedDate = {
							quarter: quarterIndex,
							year: this.activeYear
						};

					} else {
						this.selectedDate =
							CalendarUiService.getDateObjFromStr(quarter.startDate);
					}
					this.applyDates(true);
				},

				/**
				 * send data to the server or wherever
				 */
				applyDates: function(isClicked) {
					var startDate;
					var endDate;
					var currDate;
					var clickedDate;
					var that = this;
					var startEndDate;
					var endYear;

					function isNewRangeStart(clickedDate) {
						return (!$scope.config.multiSelection || (!that.startDateSelected &&
						(!that.endDate || +clickedDate.startDate > that.endDate)));
					}

					function setQuarterRange() {
						clickedDate = $scope.calendarQuarter.quarters[that.selectedDate.quarter];
						if (isNewRangeStart(clickedDate)) {
							startDate = $scope.calendarQuarter.quarters[that.selectedDate.quarter].startDate;
							endDate = $scope.calendarQuarter.quarters[that.selectedDate.quarter].endDate;
							that.startDateSelected = true;
						} else {
							if (+clickedDate.startDate < that.startDate) {
								startDate = $scope.calendarQuarter.quarters[that.selectedDate.quarter].startDate;
								endDate = that.endDate;
							} else {
								startDate = that.startDate;
								endDate = clickedDate.endDate;
							}
							that.startDateSelected = false;
						}
					}

					if (!CalendarUiService.isFiscal) {
						setQuarterRange();
					} else {
						currDate = +this.selectedDate.data;
						if (isClicked) {
							setQuarterRange();
						} else {
							startEndDate = CalendarUiService.getStartEndDateOfFiscalQuarter(currDate,
								$scope.calendarQuarter.quarters);
							if ($scope.config.multiSelection) {
								endYear = moment($scope.config.endDate,
									calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
								startEndDate.endDate =
									CalendarUiService.getStartEndDateOfFiscalQuarter(+$scope.config.endDate,
										this.quartersByYears[endYear]).endDate;
							}
							startDate = startEndDate.startDate;
							endDate = startEndDate.endDate;
						}
					}

					this.endDate = +endDate > +$scope.config.maxEndDate ? +$scope.config.maxEndDate : endDate;
					this.startDate = +startDate < +$scope.config.minStartDate ? +$scope.config.minStartDate : startDate;

					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_CLICK, {
						startDate: this.startDate,
						endDate: this.endDate,
						isClicked: isClicked
					});
				}
			};

			/**
			 * init main object
			 */
			CalendarUiService.setFiscalData($scope.fiscalData);
			CalendarQuarterService.setFiscalData($scope.fiscalData);
			CalendarUiService.setMinDate($scope.config.minStartDate);
			CalendarUiService.setMaxDate($scope.config.maxEndDate);

			$scope.calendarQuarter.init($scope.config.startDate);
			$scope.calendarQuarter.applyDates();

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, function(e, date) {
				if (date.type === calendarCoreConstants.VIEWS.QUARTER) {
					$scope.calendarQuarter.init(date.startDate);
					$scope.calendarQuarter.applyDates();
				}
			});

		}]);

/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-week.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("calendarCoreWeek", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/week/week.html",
			controller: "weekCoreCtrl"
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * week.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("weekCoreCtrl", ["$scope", "CalendarCoreUiService", "moment", "calendarCoreConstants",
		function($scope, CalendarCoreUiService, moment, calendarCoreConstants) {
			"use strict";

			var dateFormat = calendarCoreConstants.DATE_FORMAT.DATE_ID;
			var CalendarUiService = angular.copy(CalendarCoreUiService);

			$scope.singleView = $scope.config.singleView;
			$scope.dayShortNames = "x1UiNgCalendarCore.dayShortNames.";
			$scope.monthShortNames = "x1UiNgCalendarCore.monthShortNames.";

			$scope.calendarWeek = {

				init: function(dateObj) {
					this.hoveredDate = {};
					this.fiscalDateHover = {};
					this.fiscalDateSelected = {};

					this.isSingle = $scope.singleView;
					this.minDate = CalendarUiService.getMinDate("weeks");
					this.maxDate = CalendarUiService.getMaxDate("weeks");
					this.selectedDate = CalendarUiService.getDateObjFromStr(dateObj.startDate);
					this.monthNamesShort = CalendarUiService.getMonthNameShort(this.selectedDate.year);

					this.getStartEndDate(dateObj);
					this.getLeftRight();
					this.updateCalendar();
				},

                getStartEndDate: function (dateObj) {
                    var startDate;
                    var endDate;
                    var startDateFiscal;
                    var endDateFiscal;
                    var startMonth;
                    var endMonth;
                    var startWeek;
                    var endWeek;

                    dateObj.startDate = dateObj.startDate || dateObj.endDate;
                    dateObj.endDate = dateObj.endDate || dateObj.startDate;

                    startDate = CalendarCoreUiService.getDateObjFromStr(dateObj.startDate);
                    endDate = CalendarCoreUiService.getDateObjFromStr(dateObj.endDate);

                    if (CalendarUiService.isFiscal) {
						endDate = $scope.config.multiSelection ? endDate : startDate;
                        startMonth = CalendarUiService.fromGregorianToFiscalMonth(startDate);
                        endMonth = CalendarUiService.fromGregorianToFiscalMonth(endDate);

                        startWeek = CalendarUiService.fromGregorianToFiscalWeek(startDate,
							$scope.config.useSelectedDate);
                        endWeek = CalendarUiService.fromGregorianToFiscalWeek(endDate,
							$scope.config.useSelectedDate);

                        startDateFiscal = {
                            data: {
                                fiscalData: startMonth,
                                fiscal: startWeek.fiscal
                            }
                        };

                        endDateFiscal = {
                            data: {
                                fiscalData: endMonth,
                                fiscal: endWeek.fiscal
                            }
                        };

                        this.startDate = moment(CalendarUiService.getStartDate(startDateFiscal), dateFormat);
                        this.endDate = moment(CalendarUiService.getWeekEndDate(endDateFiscal,
							$scope.config.useSelectedDate), dateFormat);

                        //set selected date for highlighting
                        this.fiscalDateSelected = {
                            data: startWeek.fiscal,
                            fiscalMonth: startMonth.data
                        };

                        this.startFiscalWeek = startWeek.index;
                        this.endFiscalWeek = endWeek.index;

                    } else {
                        this.startDate = moment(CalendarUiService.getStartDate(dateObj.startDate), dateFormat);
                        this.endDate = moment(CalendarUiService.getEndDate(dateObj.endDate), dateFormat);
                    }
                },

				/**
				 * get date for left and right calendar view
				 */
				getLeftRight: function() {
					this.leftDate = CalendarUiService.getLeftSideDate(this.selectedDate, $scope.singleView);
					this.processRightPart(CalendarUiService.getNextDate, this.leftDate);

					$scope.dayNamesShortLeft = CalendarUiService.getDayNameShort(this.leftDate);
					if (!this.isSingle) {
						$scope.dayNamesShortRight = CalendarUiService.getDayNameShort(this.rightDate);
					}
				},

				/**
				 * click on next button
				 */
				next: function() {
					this.leftDate = CalendarUiService.getNextDate(this.leftDate);
					this.processRightPart(CalendarUiService.getNextDate, this.rightDate);
					this.updateCalendar();
				},

				/**
				 * click on previous button
				 */
				prev: function() {
					this.leftDate = CalendarUiService.getPrevDate(this.leftDate);
					this.processRightPart(CalendarUiService.getPrevDate, this.rightDate);
					this.updateCalendar();
				},

				/**
				 * click on prev year button
				 */
				prevYear: function() {
					var prevDate;
					if ($scope.fiscalData) {
						this.leftDate = CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "prev");
						this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					} else {
						this.leftDate.year -= 1;
						this.rightDate.year -= 1;
					}
					prevDate = CalendarUiService.checkMinDate({
						leftDate: this.leftDate,
						rightDate: this.rightDate,
						minDate: this.minDate,
						singleView: $scope.singleView
					});
					this.leftDate = prevDate.leftDate;
					this.rightDate = prevDate.rightDate;
					this.updateCalendar();
				},

				/**
				 * click on next year button
				 */
				nextYear: function() {
					var nextDate;
					var config;

					if ($scope.fiscalData) {
						this.leftDate = CalendarUiService.getMonthFromPrevNextYear(this.leftDate, "next");
						this.processRightPart(CalendarUiService.getNextDate, this.leftDate);
					} else {
						this.leftDate.year += 1;
						this.rightDate.year += 1;
					}

					config = {
						leftDate: this.leftDate,
						rightDate: this.rightDate,
						maxDate: this.maxDate,
						singleView: $scope.singleView
					};

					nextDate = CalendarUiService.checkMaxDate(config);

					this.leftDate = nextDate.leftDate;
					this.rightDate = nextDate.rightDate;
					this.updateCalendar();
				},

				/**
				 * check is disabled next
				 */
				isDisableNext: function() {
					var compareDate = $scope.singleView ? this.leftDate : this.rightDate;

					return compareDate.year >= this.maxDate.year &&
						compareDate.month >= this.maxDate.month;
				},

				/**
				 * check is disabled prev
				 */
				isDisablePrev: function() {
					return this.leftDate.year <= this.minDate.year &&
						this.leftDate.month <= this.minDate.month;
				},

				isDisablePrevYear: function() {
					var prevYear = +this.leftDate.year;
					var minYear = +this.minDate.year;
					return prevYear <= minYear;
				},

				isDisableNextYear: function() {
					var compareDate = $scope.singleView ? this.leftDate : this.rightDate;

					var nextYear = +compareDate.year;
					var maxYear = +this.maxDate.year;
					return nextYear >= maxYear;
				},

				/**
				 * check if week is selected (to apply css rules)
				 */
				isSelectedWeek: function(date) {
					if (CalendarUiService.isFiscal) {
						return false;
					}
                    return $scope.config.multiSelection ?
                        (+moment(date[0]).format(dateFormat) >= this.startDate.format(dateFormat) &&
                        +moment(date[6]).format(dateFormat) <= this.endDate.format(dateFormat)) :
                        CalendarUiService.isSelectedWeek(date, this.selectedDate);
				},

				/**
				 * update view for calendars
				 */
				updateCalendar: function() {
					this.calendarLeft = CalendarUiService.getDatesArray(this.leftDate,
						$scope.config.useSelectedDate, $scope.config.timezone);
					if (this.isSingle) {
						return;
					}
					this.calendarRight = CalendarUiService.getDatesArray(this.rightDate,
						$scope.config.useSelectedDate, $scope.config.timezone);
				},


				checkNoEndDate: function (date) {
					return $scope.config.noEndDate &&
						(+date > +this.startDate.startOf("week").format(dateFormat));
				},

                inMultiSelection: function (date) {
                    return $scope.config.multiSelection &&
                        (date > this.startDate.format(dateFormat) &&
                        date < this.endDate.format(dateFormat));
                },

				/**
				 * check if FISCAL week is hovered (to apply css rules)
				 */
				isFiscalWeekHover: function(fiscalData) {
					if (!CalendarUiService.isFiscal) {
						return false;
					}
					return this.fiscalDateHover.data === fiscalData;
				},

				/**
				 * add data to the hoveredDate (support hover in two or more tabs)
				 */
				addHover: function(data) {
					if (CalendarUiService.isFiscal) {
						return false;
					}
					var selectedDate = data[0];

					this.hoveredDate = {
						year: selectedDate.year,
						month: selectedDate.month,
						day: selectedDate.day
					};
				},

				/**
				 * remove data from hoveredDate
				 */
				removeHover: function() {
					if (CalendarUiService.isFiscal) {
						return false;
					}
					this.hoveredDate = {};
				},

				/**
				 * check if week is selected (to apply css rules)
				 */
				isHoveredWeek: function(date) {
					if (CalendarUiService.isFiscal) {
						return false;
					}
					return CalendarUiService.isSelectedWeek(date, this.hoveredDate);
				},

				/**
				 * check if FISCAL week is selected (to apply css rules)
				 */
				isFiscalWeekSelected: function(fiscalData) {
					if (!CalendarUiService.isFiscal) {
						return false;
					}
					return $scope.config.multiSelection ?
                        +fiscalData >= +this.startDate.format(dateFormat) &&
                        +fiscalData <= +this.endDate.format(dateFormat) :
                        this.fiscalDateSelected.data === fiscalData;
				},

				/**
				 * add data to the fiscalDateHover (support hover in two or more tabs for FISCAL)
				 */
				addFiscalHover: function(fiscalData, type) {
					this.fiscalDateHover = {
						data: fiscalData,
						type: type
					};
				},

				/**
				 * remove data from fiscalDateHover
				 */
				removeFiscalHover: function() {
					this.fiscalDateHover = {};
				},

				/**
				 * add data to the fiscalDateSelected (support selected week for FISCAL)
				 */
				addFiscalSelected: function(fiscalData, fiscalMonth) {

					this.fiscalDateSelected = {
						data: fiscalData,
						fiscalMonth: fiscalMonth
					};
				},

                /**
                 * click on fiscal week
                 */
                fiscalClickHandler: function(obj) {
                    var fiscalMonth = obj.type === "left" ? this.leftDate.data : this.rightDate.data;
                    var endOfWeek;

                    this.addFiscalSelected(obj.data.fiscal, fiscalMonth);
                    this.selectedDate = {};

                    if (!$scope.config.multiSelection || (!this.startDateSelected &&
                        +this.fiscalDateSelected.data > +this.endDate.format(dateFormat))) {

                        this.startDate = moment(CalendarUiService.getStartDate(obj), dateFormat);
                        this.endDate = moment(CalendarUiService.getWeekEndDate(obj, false), dateFormat);

                        this.startFiscalWeek = this.endFiscalWeek = obj.data.week;
                        this.startDateSelected = true;
                    } else {
                        if (+this.fiscalDateSelected.data < +this.startDate.format(dateFormat)) {
                            endOfWeek = {data: {fiscal: this.startDate.format(dateFormat)}};

                            this.endDate = moment(CalendarUiService.getWeekEndDate(endOfWeek, false), dateFormat);
                            this.startDate = moment(CalendarUiService.getStartDate(obj), dateFormat);

                            this.startFiscalWeek = obj.data.week;
                            this.endFiscalWeek = endOfWeek.index;
                        } else {
                            this.endDate = moment(CalendarUiService.getWeekEndDate(obj, false), dateFormat);

                            this.endFiscalWeek = obj.data.week;
                        }
                        this.startDateSelected = false;
                    }
                },

                /**
                 * click on gregorian week
                 */
                clickHandler: function(obj) {
                    this.selectedDate = obj.data;

                    if (!$scope.config.multiSelection || (!this.startDateSelected &&
                        (+moment(this.selectedDate).format(dateFormat) > +this.endDate.format(dateFormat)))) {

                        this.startDate = moment(this.selectedDate)
                            .startOf("week");

                        this.endDate = moment(this.selectedDate)
                            .endOf("week");

                        this.startDateSelected = true;
                    } else {
                        if (+moment(this.selectedDate).format(dateFormat) < +this.startDate.format(dateFormat)) {

                            this.endDate = this.startDate
                                .endOf("week");

                            this.startDate = moment(this.selectedDate)
                                .startOf("week");
                        } else {
                            this.endDate = moment(this.selectedDate)
                                .endOf("week");
                        }
                        this.startDateSelected = false;
                    }
                },

				/**
				 * click on week
				 */
				click: function(obj) {
					if (CalendarUiService.isFiscal) {
                        this.fiscalClickHandler(obj);
					} else {
                        this.clickHandler(obj);
					}

					this.applyDates(true);
				},

				/**
				 * send data to somewhere
				 */
				applyDates: function(isClicked) {
					var startDate;
					var endDate;
					var eventObj;

					if (CalendarUiService.isFiscal) {
						startDate = +this.startDate.format(dateFormat);
						endDate = +this.endDate.format(dateFormat);
					} else {
						startDate = +this.startDate.startOf("week").format(dateFormat);
						endDate = $scope.config.multiSelection ?
							this.endDate : this.startDate;

						endDate = +endDate.endOf("week").format(dateFormat);
					}

					var maxDate = +moment(this.maxDate).format(dateFormat);
					var minDate = +moment(this.minDate).format(dateFormat);

					if (endDate > maxDate) {
						endDate = maxDate;
					}

					if (startDate < minDate) {
						startDate = minDate;
					}

                    eventObj = {
                        startDate: startDate,
                        endDate: endDate,
                        isClicked: isClicked
                    };

                    if ($scope.config.multiSelection) {
                        // pass additional property needed for back-end purposes
                        eventObj.selectedPeriods = CalendarUiService.isFiscal ?
                            this.endFiscalWeek - this.startFiscalWeek + 1 :
                            CalendarCoreUiService.getNumberOfPeriods(startDate, endDate, "weeks");
                    }

					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_CLICK, eventObj);
				},

				processRightPart: function (fn, arg) {
					this.rightDate = this.isSingle ? {} : fn.call(CalendarUiService, arg);
				}

			};

            CalendarUiService.setFiscalData($scope.fiscalData);
			CalendarUiService.setMinDate($scope.config.minStartDate);
			CalendarUiService.setMaxDate($scope.config.maxEndDate);

			$scope.calendarWeek.init($scope.config);
			$scope.calendarWeek.applyDates();

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, function(e, date) {
				if (date.type === calendarCoreConstants.VIEWS.WEEK) {
					$scope.calendarWeek.init(date);
					$scope.calendarWeek.applyDates();
				}
			});

		}]);

/**
 *
 * Licensed Materials – Property of IBM
 *
 * calendar-year.directive.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.directive("calendarCoreYear", function() {
		"use strict";

		return {
			restrict: "EA",
			templateUrl: "calendar-core/year/year.html",
			controller: "yearCoreCtrl"
		};
	});
/**
 *
 * Licensed Materials – Property of IBM
 *
 * year.controller.js
 *
 * (C) Copyright IBM Corporation 2015.
 * U.S. Government Users Restricted Rights:  Use, duplication or disclosure
 * restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

angular
	.module("x1.ui.calendar-core")
	.controller("yearCoreCtrl", ["$scope", "CalendarCoreUiService", "calendarCoreConstants",
		function($scope, CalendarCoreUiService, calendarCoreConstants) {
			"use strict";

			var CalendarUiService = angular.copy(CalendarCoreUiService);

			/**
			 * declare main object
			 */
			$scope.calendarYear = {

				/**
				 * init
				 */
				init: function(dateStr) {
					this.minDate = CalendarUiService.getMinDate("years");
					this.maxDate = CalendarUiService.getMaxDate("years");
					this.curentView = 0;
					this.isFiscal = CalendarUiService.isFiscal;
					this.selectedDate = CalendarUiService.getDateObjFromStr(dateStr);
					this.setYearsArray();
				},

				getMaxYear: function() {
					return this.maxDate.year;
				},

				setYearsArray: function() {
					var k = 0;
					var j = 0;

					this.yearsArr = [];
					this.yearsArr[j] = [];
					for (var i = this.minDate.year; i <= this.getMaxYear(); i++) {
						if (k !== 0 && k % 12 === 0) {
							j++;
							this.yearsArr[j] = [];
						}
						this.yearsArr[j].push(i);
						k++;
					}
					this.years = this.yearsArr[this.curentView];
				},

				/**
				 * check is year selected (apply css style)
				 */
				isSelected: function(year) {
					var isStartEnd;
					var startYear;
					var endYear;
					if ($scope.config.multiSelection) {
						startYear = moment(this.startDate, calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
						endYear = moment(this.endDate, calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
						isStartEnd = (startYear === year || endYear === year);
					}
					return (this.selectedDate.year === year || isStartEnd);
				},

				/**
				 * check for years in range - for multiple selection (apply css class)
				 */
				isInRange: function(year) {
					var startYear;
					var endYear;
					if ($scope.config.multiSelection) {
						startYear = moment(this.startDate, calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
						endYear = moment(this.endDate, calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
					}
					return ($scope.config.multiSelection && year >= +startYear && year <= +endYear);
				},

				/**
				 * click on next button
				 */
				next: function() {
					this.curentView++;
					this.years = this.yearsArr[this.curentView];
				},

				/**
				 * click on prev button
				 */
				previous: function() {
					this.curentView--;
					this.years = this.yearsArr[this.curentView];
				},

				/**
				 * check is disabled next
				 */
				isDisableNext: function() {
					return this.curentView >= this.yearsArr.length - 1;
				},

				/**
				 * check is disabled prev
				 */
				isDisablePrev: function() {
					return this.curentView <= 0;
				},

				/**
				 * click on year
				 */
				click: function(year) {
					this.selectedDate.year = year;
					this.applyDates(true);
				},

				/**
				 * send data to server or wherever
				 */
				applyDates: function(isClicked) {
					var startDate;
					var endDate;
					var that = this;
					var startEndDate;
					var endYear;

					function isNewRangeStart(clickedDate) {
						return (!$scope.config.multiSelection || (!that.startDateSelected &&
						(!that.endDate || +clickedDate.startDate > that.endDate)));
					}

					function setYearRange(clickedDate) {
						if (isNewRangeStart(clickedDate)) {
							startDate = clickedDate.startDate;
							endDate = clickedDate.endDate;
							that.startDateSelected = true;
						} else {
							if (+clickedDate.startDate < that.startDate) {
								startDate = clickedDate.startDate;
								endDate = that.endDate;
							} else {
								startDate = that.startDate;
								endDate = clickedDate.endDate;
							}
							that.startDateSelected = false;
						}
					}
					if (this.isFiscal) {
						startEndDate = CalendarUiService.
							getStartEndDateOfFiscalYear(this.selectedDate.year);
						if ($scope.config.multiSelection && !isClicked) {
							endYear = moment($scope.config.endDate, calendarCoreConstants.DATE_FORMAT.DATE_ID).year();
							startEndDate.endDate = CalendarUiService.
								getStartEndDateOfFiscalYear(endYear).endDate;
						}
						setYearRange({
							startDate: startEndDate.startDate,
							endDate: startEndDate.endDate
						});
					} else {
						setYearRange({
							startDate: this.selectedDate.year + "0101",
							endDate: this.selectedDate.year + "1231"
						});
					}

					this.endDate = +endDate > +$scope.config.maxEndDate ? $scope.config.maxEndDate : endDate;
					this.startDate = +startDate < +$scope.config.minStartDate ? $scope.config.minStartDate : startDate;

					$scope.$emit(calendarCoreConstants.EVENTS.CALENDAR_CLICK, {
						startDate: this.startDate,
						endDate: this.endDate,
						isClicked: isClicked
					});
				}
			};

			/**
			 * init object
			 */
			CalendarUiService.setFiscalData($scope.fiscalData);
			CalendarUiService.setMinDate($scope.config.minStartDate);
			CalendarUiService.setMaxDate($scope.config.maxEndDate);
			$scope.calendarYear.init($scope.config.startDate);
			$scope.calendarYear.applyDates();

			$scope.$on(calendarCoreConstants.EVENTS.CALENDAR_DATA_UPDATE, function(e, date) {
				if (date.type === calendarCoreConstants.VIEWS.YEAR) {
					$scope.calendarYear.init(date.startDate);
					$scope.calendarYear.applyDates();
				}
			});

		}]);

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/calendar-core.html',
    '<div ng-controller="x1CalendarCoreCtrl" ng-switch on="config.view" class="x1-calendar-core {{config.calendarSize}}">\n' +
    '    <calendar-core-any ng-switch-when="ANY"></calendar-core-any>\n' +
    '    <calendar-core-day ng-switch-default></calendar-core-day>\n' +
    '    <calendar-core-week ng-switch-when="WEEK"></calendar-core-week>\n' +
    '    <calendar-core-month ng-switch-when="MONTH"></calendar-core-month>\n' +
    '    <calendar-core-quarter ng-switch-when="QUARTER"></calendar-core-quarter>\n' +
    '    <calendar-core-year ng-switch-when="YEAR"></calendar-core-year>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/any/any.html',
    '<section role="region" class="x1-calendar-core-any row text-center" aria-label="{{\'x1UiNgCalendarCore.ARIA.CAL_TYPE_ANY\' | translate}}">\n' +
    '	<!--CALENDAR HEADER-->\n' +
    '	<header role="banner" class="year-header" ng-class="{\'single-year\': singleView}" aria-labelledby="calYearLabel">\n' +
    '		<div class="year-control">\n' +
    '			<button ng-if="!anyDay.isDisablePrevYear()" role="button" title="{{anyDay.leftDate.year - 1}}" class="calendar-controls prev-year" ng-click="anyDay.prevYear()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_YEAR"></span>\n' +
    '			</button>\n' +
    '			<h2 id="calYearLabel" class="year-label">{{anyDay.leftDate.year}}</h2>\n' +
    '			<button ng-if="!anyDay.isDisableNextYear()" role="button" title="{{anyDay.leftDate.year + 1}}" class="calendar-controls next-year" ng-click="anyDay.nextYear()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_YEAR"></span>\n' +
    '			</button>\n' +
    '		</div>\n' +
    '	</header>\n' +
    '	<!--LEFT CALENDAR-->\n' +
    '	<section role="region" class="calendar-left row col-sm-6" aria-label="{{monthShortNames + anyDay.leftDate.options.name | translate}} {{anyDay.leftDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL\' | translate}}">\n' +
    '		<header role="banner" class="month-header col-sm-12 text-center" aria-labelledby="calMonthLabel1">\n' +
    '			<button ng-hide="anyDay.isDisablePrev()" role="button" class="calendar-controls prev" ng-click="anyDay.prev()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_MONTH"></span>\n' +
    '			</button>\n' +
    '			<h3 id="calMonthLabel1" class="month-label" ng-class="{\'text-center\': singleView}">\n' +
    '				{{monthShortNames + anyDay.leftDate.options.name | translate}}\n' +
    '				{{anyDay.leftDate.options.periodNum}}\n' +
    '			</h3>\n' +
    '			<button ng-if="singleView" ng-hide="anyDay.isDisableNext()" role="button" class="calendar-controls next" ng-click="anyDay.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_MONTH"></span>\n' +
    '			</button>\n' +
    '		</header>\n' +
    '		<article role="article" class="col-sm-12" aria-label="{{monthShortNames + anyDay.leftDate.options.name | translate}} {{anyDay.leftDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_DAYS\' | translate}}">\n' +
    '			<table class="table">\n' +
    '				<thead>\n' +
    '				<tr>\n' +
    '					<th ng-repeat="day in dayNamesShortLeft track by $index" class="table-headers text-center" translate="{{dayShortNames + day}}"></th>\n' +
    '				</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '				<tr ng-repeat="tr in anyDay.calendarLeft">\n' +
    '					<td ng-repeat="td in tr track by $index" class="day text-right" ng-click="!td.disable && td.daysInCurrentMonth && anyDay.click(td)" ng-class="{\'start-date\': anyDay.isStartDate(td), \'end-date\': anyDay.isEndDate(td),\n' +
    '							\'no-end-date\': config.noEndDate, \'in-range\': anyDay.isInRange(td),\n' +
    '							\'disable\': td.disable, \'today\': td.today, \'otherday\': !td.daysInCurrentMonth}" day="{{td.data}}" title="{{td.title}}">\n' +
    '						<div class="div-day">\n' +
    '							<a class="calendar-date" ng-bind="td.day" title="{{td.title}}"></a>\n' +
    '						</div>\n' +
    '					</td>\n' +
    '				</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</article>\n' +
    '	</section>\n' +
    '	<!--RIGHT CALENDAR-->\n' +
    '	<section ng-if="!singleView" role="region" class="calendar-right row col-sm-6" aria-label="{{monthShortNames + anyDay.rightDate.options.name | translate}} {{anyDay.rightDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL\' | translate}}">\n' +
    '		<header role="banner" class="month-header col-sm-12 text-center" aria-labelledby="calMonthLabel2">\n' +
    '			<h3 id="calMonthLabel2" class="month-label">\n' +
    '				{{monthShortNames + anyDay.rightDate.options.name | translate}}\n' +
    '				{{anyDay.rightDate.options.periodNum}}\n' +
    '			</h3>\n' +
    '			<button ng-hide="anyDay.isDisableNext()" role="button" class="calendar-controls next" ng-click="anyDay.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_MONTH"></span>\n' +
    '			</button>\n' +
    '		</header>\n' +
    '		<article role="article" class="col-sm-12" aria-label="{{monthShortNames + anyDay.rightDate.options.name | translate}} {{anyDay.rightDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_DAYS\' | translate}}">\n' +
    '			<table class="table">\n' +
    '				<thead>\n' +
    '				<tr>\n' +
    '					<th ng-repeat="day in dayNamesShortRight track by $index" class="table-headers text-center" translate="{{dayShortNames + day}}"></th>\n' +
    '				</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '				<tr ng-repeat="tr in anyDay.calendarRight">\n' +
    '					<td ng-repeat="td in tr track by $index" class="day text-right" ng-click="!td.disable && td.daysInCurrentMonth && anyDay.click(td)" ng-class="{\'start-date\': anyDay.isStartDate(td), \'end-date\': anyDay.isEndDate(td),\n' +
    '							\'no-end-date\': config.noEndDate, \'in-range\': anyDay.isInRange(td),\n' +
    '							\'disable\': td.disable, \'today\': td.today, \'otherday\': !td.daysInCurrentMonth}" day="{{td.data}}" title="{{td.title}}">\n' +
    '						<div class="div-day">\n' +
    '							<a class="calendar-date" ng-bind="td.day" title="{{td.title}}"></a>\n' +
    '						</div>\n' +
    '					</td>\n' +
    '				</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</article>\n' +
    '	</section>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/day/day.html',
    '<section role="region" class="x1-calendar-core-day row text-center" aria-label="{{\'x1UiNgCalendarCore.ARIA.CAL_TYPE_DAY\' | translate}}">\n' +
    '	<!--CALENDAR HEADER-->\n' +
    '	<header role="banner" class="year-header" ng-class="{\'single-year\': singleView}" aria-labelledby="calYearLabel">\n' +
    '		<div class="year-control">\n' +
    '			<button ng-if="!calendarDay.isDisablePrevYear()" role="button" title="{{calendarDay.leftDate.year - 1}}" class="calendar-controls prev-year" ng-click="calendarDay.prevYear()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_YEAR"></span>\n' +
    '			</button>\n' +
    '			<h2 id="calYearLabel" class="year-label">{{calendarDay.leftDate.year}}</h2>\n' +
    '			<button ng-if="!calendarDay.isDisableNextYear()" role="button" title="{{calendarDay.leftDate.year + 1}}" class="calendar-controls next-year" ng-click="calendarDay.nextYear()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_YEAR"></span>\n' +
    '			</button>\n' +
    '		</div>\n' +
    '	</header>\n' +
    '	<!--LEFT CALENDAR-->\n' +
    '	<section role="region" class="calendar-left row col-sm-6" aria-label="{{monthShortNames + calendarDay.leftDate.options.name | translate}} {{calendarDay.leftDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL\' | translate}}">\n' +
    '		<header role="banner" class="month-header col-sm-12 text-center" aria-labelledby="calMonthLabel1">\n' +
    '			<button ng-hide="calendarDay.isDisablePrev()" role="button" class="calendar-controls prev" ng-click="calendarDay.prev()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_MONTH"></span>\n' +
    '			</button>\n' +
    '			<h3 id="calMonthLabel1" class="month-label" ng-class="{\'text-center\': singleView}">\n' +
    '				{{monthShortNames + calendarDay.leftDate.options.name | translate}}\n' +
    '				{{calendarDay.leftDate.options.periodNum}}\n' +
    '			</h3>\n' +
    '			<button ng-if="singleView" ng-hide="calendarDay.isDisableNext()" role="button" class="calendar-controls next" ng-click="calendarDay.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_MONTH"></span>\n' +
    '			</button>\n' +
    '		</header>\n' +
    '		<article role="article" class="col-sm-12" aria-label="{{monthShortNames + calendarDay.leftDate.options.name | translate}} {{calendarDay.leftDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_DAYS\' | translate}}">\n' +
    '			<table class="table">\n' +
    '				<thead>\n' +
    '				<tr>\n' +
    '					<th ng-repeat="day in dayNamesShortLeft track by $index" class="table-headers text-center" translate="{{dayShortNames + day}}"></th>\n' +
    '				</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '				<tr ng-repeat="tr in calendarDay.calendarLeft">\n' +
    '					<td ng-repeat="td in tr track by $index" class="day text-right" ng-click="!td.disable &&  td.daysInCurrentMonth && calendarDay.click(td)" ng-class="{\'selected\': calendarDay.isSelectedDay(td.day, td.month, td.year),\n' +
    '							\'disable\': td.disable, \'today\': td.today, \'otherday\': !td.daysInCurrentMonth}" day="{{td.data}}" title="{{td.title}}">\n' +
    '						<div class="div-day">\n' +
    '							<a class="calendar-date" ng-bind="td.day" title="{{td.title}}"></a>\n' +
    '						</div>\n' +
    '					</td>\n' +
    '				</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</article>\n' +
    '	</section>\n' +
    '	<!--RIGHT CALENDAR-->\n' +
    '	<section ng-if="!singleView" role="region" class="calendar-right row col-sm-6" aria-label="{{monthShortNames + calendarDay.rightDate.options.name | translate}} {{calendarDay.rightDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL\' | translate}}">\n' +
    '		<header role="banner" class="month-header col-sm-12 text-center" aria-labelledby="calMonthLabel2">\n' +
    '			<h3 id="calMonthLabel2" class="month-label">\n' +
    '				{{monthShortNames + calendarDay.rightDate.options.name | translate}}\n' +
    '				{{calendarDay.rightDate.options.periodNum}}\n' +
    '			</h3>\n' +
    '			<button ng-hide="calendarDay.isDisableNext()" role="button" class="calendar-controls next" ng-click="calendarDay.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_MONTH"></span>\n' +
    '			</button>\n' +
    '		</header>\n' +
    '		<article role="article" class="col-sm-12" aria-label="{{monthShortNames + calendarDay.rightDate.options.name | translate}} {{calendarDay.rightDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_DAYS\' | translate}}">\n' +
    '			<table class="table">\n' +
    '				<thead>\n' +
    '				<tr>\n' +
    '					<th ng-repeat="day in dayNamesShortRight track by $index" class="table-headers text-center" translate="{{dayShortNames + day}}"></th>\n' +
    '				</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '				<tr ng-repeat="tr in calendarDay.calendarRight">\n' +
    '					<td ng-repeat="td in tr track by $index" class="day text-right" ng-click="!td.disable && td.daysInCurrentMonth && calendarDay.click(td)" ng-class="{\'selected\': calendarDay.isSelectedDay(td.day, td.month, td.year),\n' +
    '							\'disable\': td.disable, \'today\': td.today, \'otherday\': !td.daysInCurrentMonth}" day="{{td.data}}" title="{{td.title}}">\n' +
    '						<div class="div-day">\n' +
    '							<a class="calendar-date" ng-bind="td.day" title="{{td.title}}"></a>\n' +
    '						</div>\n' +
    '					</td>\n' +
    '				</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</article>\n' +
    '	</section>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/month/month.html',
    '<section role="region" class="x1-calendar-core-month row text-center" aria-label="{{\'x1UiNgCalendarCore.ARIA.CAL_TYPE_MONTH\' | translate}}">\n' +
    '	<!--CALENDAR HEADER-->\n' +
    '	<header role="banner" class="year-header" aria-labelledby="calYearLabel">\n' +
    '		<div class="year-control">\n' +
    '			<button ng-if="!calendarMonth.isDisablePrev()" role="button" title="{{calendarMonth.activeYear - 1}}" class="calendar-controls prev-year" ng-click="calendarMonth.prev()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_YEAR"></span>\n' +
    '			</button>\n' +
    '			<h2 id="calYearLabel" class="year-label">{{calendarMonth.activeYear}}</h2>\n' +
    '			<button ng-if="!calendarMonth.isDisableNext()" role="button" title="{{calendarMonth.activeYear + 1}}" class="calendar-controls next-year" ng-click="calendarMonth.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_YEAR"></span>\n' +
    '			</button>\n' +
    '		</div>\n' +
    '	</header>\n' +
    '	<!--CALENDAR BODY-->\n' +
    '	<section role="region" class="month-wrapper col-sm-12" aria-label="{{calendarMonth.activeYear}} {{month.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_MONTHS\' | translate}}">\n' +
    '		<ul class="list-unstyled">\n' +
    '			<li ng-repeat="month in calendarMonth.months" class="col-sm-3">\n' +
    '				<h3 class="month-blocks item text-center" ng-class="{\'selected\': calendarMonth.isStartEndMonth($index, month),\n' +
    '						\'in-range\': calendarMonth.isActive($index, month),\n' +
    '						\'disable\': calendarMonth.isDisable($index, month)}" ng-click="!calendarMonth.isDisable($index, month) && calendarMonth.click($index, month)">\n' +
    '					{{monthShortNames + month.name | translate}}\n' +
    '					{{month.periodNum}}</h3>\n' +
    '			</li>\n' +
    '		</ul>\n' +
    '	</section>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/quarter/quarter.html',
    '<section role="region" class="x1-calendar-core-quarter row text-center" aria-label="{{\'x1UiNgCalendarCore.ARIA.CAL_TYPE_QUARTER\' | translate}}">\n' +
    '	<!--CALENDAR HEADER-->\n' +
    '	<header role="banner" class="year-header" aria-labelledby="calYearLabel">\n' +
    '		<div class="year-control">\n' +
    '			<button ng-if="!calendarQuarter.isDisablePrev()" role="button" class="calendar-controls prev-year" title="{{calendarQuarter.activeYear - 1}}" ng-class="{disable : calendarQuarter.isDisablePrev()}" ng-click="calendarQuarter.prev()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_YEAR"></span>\n' +
    '			</button>\n' +
    '			<h2 id="calYearLabel" class="year-label">{{calendarQuarter.activeYear}}</h2>\n' +
    '			<button ng-if="!calendarQuarter.isDisableNext()" role="button" class="calendar-controls next-year" title="{{calendarQuarter.activeYear + 1}}" ng-click="calendarQuarter.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_YEAR"></span>\n' +
    '			</button>\n' +
    '		</div>\n' +
    '	</header>\n' +
    '	<!--CALENDAR BODY-->\n' +
    '	<section role="region" class="col-sm-12" aria-label="{{calendarQuarter.activeYear}} {{\'x1UiNgCalendarCore.ARIA.CAL_QUARTERS\' | translate}}">\n' +
    '		<div ng-repeat="quarter in calendarQuarter.quarters" class="col-sm-6">\n' +
    '			<div class="quarter-blocks item text-center" ng-class="{\'selected\': calendarQuarter.isActive($index, quarter),\n' +
    '					\'in-range\': calendarQuarter.isInRange($index, quarter),\n' +
    '					\'disable\': calendarQuarter.isDisable($index, quarter)}" ng-click="!calendarQuarter.isDisable($index, quarter) && calendarQuarter.click($index, quarter)">\n' +
    '				<h3>{{quarterNames + quarter.name | translate}}</h3>\n' +
    '				<small>{{monthShortNames + quarter.subNameStart | translate}} - {{monthShortNames\n' +
    '					+ quarter.subNameEnd | translate}}</small>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</section>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/week/week.html',
    '<section role="region" class="x1-calendar-core-week row text-center" aria-label="{{\'x1UiNgCalendarCore.ARIA.CAL_TYPE_WEEK\' | translate}}">\n' +
    '	<!--CALENDAR HEADER-->\n' +
    '	<header role="banner" class="year-header" ng-class="{\'single-year\': singleView}" aria-labelledby="calYearLabel">\n' +
    '		<div class="year-control">\n' +
    '			<button ng-if="!calendarWeek.isDisablePrevYear()" role="button" title="{{calendarWeek.leftDate.year - 1}}" class="calendar-controls prev-year" ng-click="calendarWeek.prevYear()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_YEAR"></span>\n' +
    '			</button>\n' +
    '			<h2 id="calYearLabel" class="year-label">{{calendarWeek.leftDate.year}}</h2>\n' +
    '			<button ng-if="!calendarWeek.isDisableNextYear()" role="button" title="{{calendarWeek.leftDate.year + 1}}" class="calendar-controls next-year" ng-click="calendarWeek.nextYear()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_YEAR\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_YEAR"></span>\n' +
    '			</button>\n' +
    '		</div>\n' +
    '	</header>\n' +
    '	<!--LEFT CALENDAR-->\n' +
    '	<section role="region" class="calendar-left row col-sm-6" aria-label="{{monthShortNames + calendarWeek.leftDate.options.name | translate}} {{calendarWeek.leftDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL\' | translate}}">\n' +
    '		<header role="banner" class="month-header col-sm-12 text-center" aria-labelledby="calMonthLabel1">\n' +
    '			<button ng-hide="calendarWeek.isDisablePrev()" role="button" class="calendar-controls prev" ng-click="calendarWeek.prev()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_WEEK\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_WEEK"></span>\n' +
    '			</button>\n' +
    '			<h3 id="calMonthLabel1" class="month-label" ng-class="{\'text-center\': singleView}">\n' +
    '				{{monthShortNames + calendarWeek.leftDate.options.name | translate}}\n' +
    '				{{calendarWeek.leftDate.options.periodNum}}\n' +
    '			</h3>\n' +
    '			<button ng-if="singleView" ng-hide="calendarWeek.isDisableNext()" role="button" class="calendar-controls next" ng-click="calendarWeek.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_WEEK\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_WEEK"></span>\n' +
    '			</button>\n' +
    '		</header>\n' +
    '		<article role="article" class="col-sm-12" aria-label="{{monthShortNames + calendarWeek.leftDate.options.name | translate}} {{calendarWeek.leftDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_DAYS\' | translate}}">\n' +
    '			<table class="table">\n' +
    '				<thead>\n' +
    '				<tr>\n' +
    '					<th ng-repeat="day in dayNamesShortLeft track by $index" class="table-headers text-center" translate="{{dayShortNames + day}}"></th>\n' +
    '				</tr>\n' +
    '				</thead>\n' +
    '				<tr ng-repeat="tr in calendarWeek.calendarLeft" class="tr-week" ng-class="{selected: calendarWeek.isSelectedWeek(tr),\n' +
    '						hovered: calendarWeek.isHoveredWeek(tr)}" ng-mouseover="calendarWeek.addHover(tr)" ng-mouseleave="calendarWeek.removeHover()">\n' +
    '					<td ng-repeat="td in tr track by $index" class="text-right" ng-click="!td.disable && calendarWeek.click({data: td, firstDay: tr[0].data, type: \'left\'})" ng-class="{\'disable\': td.disable, \'today\': td.today,\n' +
    '							\'otherday\': !td.daysInCurrentMonth, \'max-day\': td.maxDate,\n' +
    '							\'min-day\': td.minDate, \'fiscal-week-hover\': calendarWeek.isFiscalWeekHover(td.fiscal),\n' +
    '							\'fiscal-week-end\': !config.multiSelection && td.fiscalEnd,\n' +
    '							\'fiscal-week-start\': !config.multiSelection && td.fiscalStart,\n' +
    '							\'fiscal-week-selected\': calendarWeek.isFiscalWeekSelected(td.fiscal),\n' +
    '							\'no-end-date\': config.noEndDate, \'week-no-end-date\': calendarWeek.checkNoEndDate(td.data),\n' +
    '							\'multiselection\': config.multiSelection, \'in-date-range\': calendarWeek.inMultiSelection(td.data)}" data-last-day="{{td.fiscalDateType}}" ng-mouseover="calendarWeek.addFiscalHover(td.fiscal)" ng-mouseleave="calendarWeek.removeFiscalHover()" day="{{td.data}}" title="{{td.title}}" data-fiscal="{{td.fiscal}}">\n' +
    '						<div class="div-day">\n' +
    '							<a class="calendar-date" ng-bind="td.day" title="{{td.title}}"></a>\n' +
    '						</div>\n' +
    '					</td>\n' +
    '				</tr>\n' +
    '			</table>\n' +
    '		</article>\n' +
    '	</section>\n' +
    '	<!--RIGHT CALENDAR-->\n' +
    '	<section ng-if="!singleView" role="region" class="calendar-right row col-sm-6" aria-label="{{monthShortNames + calendarWeek.rightDate.options.name | translate}} {{calendarWeek.rightDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL\' | translate}}">\n' +
    '		<header role="banner" class="month-header col-sm-12 text-center" aria-labelledby="calMonthLabel2">\n' +
    '			<h3 id="calMonthLabel2" class="month-label">\n' +
    '				{{monthShortNames + calendarWeek.rightDate.options.name | translate}}\n' +
    '				{{calendarWeek.rightDate.options.periodNum}}\n' +
    '			</h3>\n' +
    '			<button ng-hide="calendarWeek.isDisableNext()" role="button" class="calendar-controls next" ng-click="calendarWeek.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_MONTH\' | translate}}">\n' +
    '				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '				<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_MONTH"></span>\n' +
    '			</button>\n' +
    '		</header>\n' +
    '		<article role="article" class="col-sm-12" aria-label="{{monthShortNames + calendarWeek.rightDate.options.name | translate}} {{calendarWeek.rightDate.options.periodNum}} {{\'x1UiNgCalendarCore.ARIA.CAL_DAYS\' | translate}}">\n' +
    '			<table class="table">\n' +
    '				<thead>\n' +
    '				<tr>\n' +
    '					<th ng-repeat="day in dayNamesShortRight track by $index" class="table-headers text-center" translate="{{dayShortNames + day}}"></th>\n' +
    '				</tr>\n' +
    '				</thead>\n' +
    '				<tr class="tr-week" ng-repeat="tr in calendarWeek.calendarRight" ng-class="{selected: calendarWeek.isSelectedWeek(tr),\n' +
    '						hovered: calendarWeek.isHoveredWeek(tr)}" ng-mouseover="calendarWeek.addHover(tr)" ng-mouseleave="calendarWeek.removeHover()">\n' +
    '					<td ng-repeat="td in tr track by $index" class="text-right" ng-click="!td.disable && calendarWeek.click({data: td, firstDay: tr[0].data, type: \'right\'})" ng-class="{\'disable\': td.disable, \'today\': td.today, \'otherday\': !td.daysInCurrentMonth,\n' +
    '							\'max-day\': td.maxDate, \'min-day\': td.minDate,\n' +
    '							\'fiscal-week-end\': !config.multiSelection && td.fiscalEnd,\n' +
    '							\'fiscal-week-start\': !config.multiSelection && td.fiscalStart,\n' +
    '							\'fiscal-week-hover\': calendarWeek.isFiscalWeekHover(td.fiscal),\n' +
    '							\'fiscal-week-selected\': calendarWeek.isFiscalWeekSelected(td.fiscal),\n' +
    '							\'no-end-date\': config.noEndDate, \'multiselection\': config.multiSelection,\n' +
    '							\'week-no-end-date\': calendarWeek.checkNoEndDate(td.data),\n' +
    '							\'in-date-range\': calendarWeek.inMultiSelection(td.data)}" ng-mouseover="calendarWeek.addFiscalHover(td.fiscal, \'right\')" ng-mouseleave="calendarWeek.removeFiscalHover()" data-last-day="{{td.fiscalDateType}}" day="{{td.data}}" title="{{td.title}}" data-fiscal="{{td.fiscal}}">\n' +
    '						<div class="div-day">\n' +
    '							<a class="calendar-date" ng-bind="td.day" title="{{td.title}}"></a>\n' +
    '						</div>\n' +
    '					</td>\n' +
    '				</tr>\n' +
    '			</table>\n' +
    '		</article>\n' +
    '	</section>\n' +
    '</section>');
}]);
})();

(function(module) {
try {
  module = angular.module('x1.ui.calendar-core');
} catch (e) {
  module = angular.module('x1.ui.calendar-core', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('calendar-core/year/year.html',
    '<section role="region" class="x1-calendar-core-year row text-center" aria-label="{{\'x1UiNgCalendarCore.ARIA.CAL_TYPE_YEAR\' | translate}}">\n' +
    '	<!--CALENDAR HEADER-->\n' +
    '	<header role="banner" class="year-header" aria-labelledby="calYearLabel">\n' +
    '		<button ng-hide="calendarYear.isDisablePrev()" role="button" class="calendar-controls" ng-click="calendarYear.previous()" aria-label="{{\'x1UiNgCalendarCore.ARIA.PREV_YEAR\' | translate}}">\n' +
    '			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>\n' +
    '			<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.PREV_YEAR"></span>\n' +
    '		</button>\n' +
    '		<h2 id="calYearLabel" class="year-label">{{calendarYear.years[0]}} -\n' +
    '			{{calendarYear.years[calendarYear.years.length - 1]}}</h2>\n' +
    '		<button ng-hide="calendarYear.isDisableNext()" role="button" ng-click="calendarYear.next()" aria-label="{{\'x1UiNgCalendarCore.ARIA.NEXT_YEAR\' | translate}}">\n' +
    '			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>\n' +
    '			<span class="sr-only" translate="x1UiNgCalendarCore.ARIA.NEXT_YEAR"></span>\n' +
    '		</button>\n' +
    '	</header>\n' +
    '	<!--CALENDAR BODY-->\n' +
    '	<section role="region" class="col-sm-12" aria-label="{{calendarYear.years[0]}} - {{calendarYear.years[calendarYear.years.length - 1]}} {{\'x1UiNgCalendarCore.ARIA.CAL_YEARS\' | translate}}">\n' +
    '		<div ng-repeat="year in calendarYear.years" class="col-sm-3">\n' +
    '			<div class="year-blocks item text-center" ng-class="{\'selected\' : calendarYear.isSelected(year),\n' +
    '					\'in-range\': calendarYear.isInRange(year)}" ng-click="calendarYear.click(year)">\n' +
    '				<h3>{{year}}</h3>\n' +
    '				<span ng-show="calendarYear.isFiscal" class="fiscal-year-label" translate="x1UiNgCalendarCore.FISCAL_YEAR"></span>\n' +
    '			</div>\n' +
    '		</div>\n' +
    '	</section>\n' +
    '</section>');
}]);
})();
