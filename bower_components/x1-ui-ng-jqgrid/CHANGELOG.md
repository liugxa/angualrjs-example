# IBM Commerce UI jqGrid Changelog

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).


## [2.10.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.10.2) - 2016-09-14
### Fixed
- commerce-ui/x1-ui-ng-jqgrid#24 : form control accessibility violation in the pager


## [2.10.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.10.1) - 2016-09-13
### Fixed
- Removed unnecessary grid reload on resize stop which is causing performance issues when resizing


## [2.10.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.10.0) - 2016-09-09
### Added
- New gridOptions property "preventMultiFilter". When set to true, the option to "Add another filter" will not be shown.
- First pass at disabling filters. Setting the gridOptions property "disableFilters" to true will cause filter icons
and badges to display in gray. It does not yet actually disable the filters.


## [2.9.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.9.0) - 2016-09-06
### Added
- missing "use strict" to js files
- *x1-ui-ng-prism* to demos
- `ngAria` module as a dependency

### Changed
- synced up config files with *x1-ui-ng-seed*
- gulpfile task to correctly test specific js files against jshint
- synced up demo files with *x1-ui-ng-seed*

### Removed
- banner comment blocks from `src/` files
- banner comment blocks from `demo/` files

### Fixed
- some jshint errors
	- note: temporarily changed jshint guidelines to prevent the 10+ errors from breaking the build (refer to @todo comments in file)
- commerce-ui/x1-ui-ng-jqgrid#16
- commerce-ui/x1-ui-ng-jqgrid#18
- commerce-ui/x1-ui-ng-jqgrid#19


## [2.8.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.8.0) - 2016-09-02
### Added
- Provision for custom sort functionality by passing "naturalSort" parameter to the attribute "sortfunc".
- Provision for control "add another filter" at grid level by passing grid "option" attribute "allowFilterGrouping".
- Updated Documentation and demo for new features.

### Fixed
- RTC: 155147: x1-ui-ng-jqgrid: header should support negative number filtering
- RTC: 154263: x1-ui-ng-jqgrid: ENUMCSV column not sorting properly
- Date: Issue when user switch between ISO8601Short date and ShortDate.


## [2.7.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.7.0) - 2016-08-30
### Added
- Implemented searching for flat and tree grids


## [2.6.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.6.0) - 2016-08-17
### Added
- Events to clear all filters and clear all sorts

### Changed
- Attribute "useHorizontalScrollbar" reference changed to "x1HorizontalScroll"

### Fixed
- #10 Horizontal Scroll bar is missing on performing grid actions
- RTC: 153808: ng-switch on=" " syntax does not work when running the code inside platform (Classic stack environment)
- RTC: 153804: Enum filter is tightly coupled with the data set and does not handle blank value
- RTC: 153803: Boolean filter not working properly when the column data contains the same value
- RTC: 153410: angularjs grid filter function for date has issue
- RTC: 153806: Number filter throws error when filterMax is set to Infinity to work around the backspace issue


## [2.5.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.5.2) - 2016-18-10
### Fixed
- Levels of readiness configuration


## [2.5.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.5.1) - 2016-07-20
### Security
- Remove DOM reference for table on destroy to avoid memory leak.


## [2.5.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.5.0) - 2016-07-20
### Added
- "hideSlider" property added to options list for colModel. If set to "true" (or any non-falsy value), the slider
will not be displayed for number-type filters. This is useful when dealing with very large number ranges.


## [2.4.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.4.5) - 2016-07-19
### Fixed
- "Filter badge and filter icon are not applied properly"


## [2.4.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.4.4) - 2016-07-14
### Fixed
- "Total" label disappears when collapsing a tree node


## [2.4.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.4.3) - 2016-07-13
### Added
 - Support for Label customization in ENUM type filter dropdown via "filterOptions" in grid options
 - Support for Label customization & more boolean options (true/false, yes/no..) in Boolean filter dropdown via
    "filterOptions" in grid options
 - Updated demo to define filter options for ENUM & BOOLEAN filters for label customization


## [2.4.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.4.2) - 2016-07-13
### Fixed
- Removed code that disabled infinite scrolling for tree grid by default allowing users to configure it


## [2.4.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.4.1) - 2016-06-29
### Fixed
- There are only sub-columns displayed in the table in compare view


## [2.4.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.4.0) - 2016-06-24
### Added
- x1Filter support for Date, Enum, EnumCSV and Boolean filter types
- Demo for Date, Enum, EnumCSV and Boolean filter types

### Fixed
- Updated CSS for dropdown width "initial" in grid-filter-popover
- Reported issues with boolean filter, Enum and add "moment" to .jshintrc predef array.

### Changed
- Added ng-switch to switch between filter types in grid-filter html
- Replaced else-if with switch case statement for sorttypes and filterControlTypes in grid-filter-controller


## [2.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.3.1) - 2016-06-25
### Fixed
- Levels of readiness for showcase


## [2.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.3.0) - 2016-06-23
### Fixed
- Removed direction property from gridDefaults as it does not normally need to be set. It can still be set manually if desired.

### Added
- filterType: "NONE" option for colModel. If using x1Filters, setting the filterType to "NONE" for a given column will prevent that column from having a filter icon or a filter modal associated with it


## [2.2.19](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.19) - 2016-06-23
### Fixed
- filter dropdown width so it doesn't create a scrollbar in the popover in some browsers


## [2.2.18](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.18) - 2016-06-10
### Fixed
- Adding back no wrap so that text doesn't wrap in grid row


## [2.2.17](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.17) - 2016-06-08
### Fixed
- Text overflow ellipsis should not be applied to the table cell since auto-resizing is enabled, this will not work in firefox as warned by free-jqgrid


## [2.2.16](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.16) - 2016-06-06
### Fixed
- Only trigger the window resize event for this component, instead of the global resize event


## [2.2.15](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.15) - 2016-06-06
### Fixed
- Further update to explain the role of the postCompileClassName when using custom directives as column formatters


## [2.2.14](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.14) - 2016-06-06
### Fixed
- IE11: Filter Icon on the report grid is hidden behind the Column title name


## [2.2.13](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.13) - 2016-06-03
### Fixed
- Updated the demo to make it easier to understand how to pass an Angular directive into a column model as a formatter


## [2.2.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.12) - 2016-06-03
### Fixed
- RTC-52941 Refactored code to add function call to reset total row label in loadComplete instead of having it in multiple places which in turn execute loadComplete anyways


## [2.2.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.11) - 2016-05-31
### Fixed
- RTC-52873 Filter popover select box incorrect size


## [2.2.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.10) - 2016-05-26
### Fixed
- RTC-48781 Grids smaller than their container must fill the remaining space on the right by extending the header, total row and pager


## [2.2.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.9) - 2016-05-20
### Fixed
- RTC-51829 Filter popover header moves along when we scroll
- RTC-51830 Filter popover content area scrolls to top when adding/removing filters
- RTC-51544 Filter popover not closing on clicking outside


## [2.2.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.8) - 2016-05-10
### Updated
- Translation files


## [2.2.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.7) - 2016-05-09
### Updated
- Translation files


## [2.2.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.6) - 2016-05-06
### Fixed
- RTC-51649 Hierarchy grid rows are large and not the same height as the headers


## [2.2.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.5) - 2016-05-06
### Fixed
- RTC-51649 Grid headers are large and not the same height as the rows


## [2.2.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.4) - 2016-05-03
### Fixed
- RTC-51479 Text "Total" disappears when changing grid size


## [2.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.3) - 2016-04-28
### Security
- Fixed some memory leaks that were cause by unreleased resources


## [2.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.2) - 2016-04-28
### Fixed
- RTC-51165 Manually resized column will now not revert back to auto-resize width when applying sorting or any other operation that triggers load complete


## [2.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.1) - 2016-04-27
### Fixed
- sortable icon for sortable: false


## [2.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.2.0) - 2016-04-21
### Added
- Callback function to validate column reordering
- RTC-50849 Event to change grid size to sm, md or lg


## [2.1.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.1.3) - 2016-04-19
### Fixed
- RTC-50818 Filter pop up disconnected from arrow


## [2.1.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.1.2) - 2016-04-19
### Fixed
- RTC-50670 Fix for issue where grid shrinks on load


## [2.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.1.1) - 2016-04-15
### Fixed
- Grid-filter-popover size and buttons


## [2.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.1.0) - 2016-04-15
### Added
- Updated to free-jqgrid version 4.13.2
- RTC-48334 Added auto-resizable feature for grid columns
- RTC-50328 Refactored scss code for different grid sizes sm, md, lg

### Fixed
- RTC-50272 Fixed Sort and filter icons overlapping column title by default on load (won't happen on load anymore but will happen if column size is reduced manually)


## [2.0.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.6) - 2016-04-13
### Fixed
- Added missing x1Utils injection to GridFilterContentCtrl.


## [2.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.5) - 2016-04-12
### Fixed
- Added translations for hardcoded strings.


## [2.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.4) - 2016-04-08
### Fixed
- Updated css for compare report to Peretz 2.0 styles & Bower dependencies


## [2.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.3) - 2016-04-07
### Fixed
- Updated grid filter popover to Peretz 2.0 styles


## [2.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.2) - 2016-04-01
### Fixed
- Rows count for treeGrid


## [2.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.1) - 2016-03-31
### Fixed
- Since treeGrid is incompatible with infinte scrolling, disabling infinite scrolling when in treeGrid mode


## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/2.0.0) - 2016-03-29
### Added
- IBM Commerce Product Design Language 2.0

### Changed
- Bower dependencies to meet new look & feel


## [1.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/1.0.5) - 2016-03-28
### Added
- Numbers filter for input


## [1.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/1.0.4) - 2016-03-25
### Added
- Translation: Added 9 new languages


## [1.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/1.0.3) - 2016-03-18
### Fixed
- Added single quotes around jquery selector without which it fails when used with complex ids like for example: 'cme-metric--SESSIONS#A0.7710713734727288' used in compare dates


## [1.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/1.0.2) - 2016-03-12
### Changed
- updated demos for new showcase


## [1.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/1.0.1) - 2016-03-10
### Fixed
- remap event to be dispatch only when manually reordering columns


## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/1.0.0) - 2016-03-02
### changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment


## [0.12.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.7) - 2016-03-01
### Fixed
- set grid parent to overflow visible over hidden to get rid of weird scroll bar on edge cases


## [0.12.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.6) - 2016-02-24
### Added
- ng-sanitize to gulp

### Changed
- bower dependencies


## [0.12.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.5) - 2016-02-22
### Fixed
- filters resetting


## [0.12.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.4) - 2016-02-22
### Fixed
- filters and permutation applying


## [0.12.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.3) - 2016-02-22
### Fixed
- Issue with overlapping filter icon by sort icon


## [0.12.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.2) - 2016-02-20
### Fixed
- Issue where column reorder permutation from gridPreferences was not getting applied when grid options was being refreshed without a full reload of the grid


## [0.12.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.1) - 2016-02-20
### Fixed
- Issue where gridPreferences was getting overridden by default column sort option

### Removed
- Unused showFilterBar feature in favour of x1Filters feature


## [0.12.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.12.0) - 2016-02-19
### Added
- Event to emit column permutations whenever a column is reordered
- Event to emit filters whenever filters are added to the grid
- Ability to override default grid options by passing in a gridPreferences object which is nothing but the
user preferred sortorder, sortname, filters, column order and column widths


## [0.11.16](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.16) - 2016-02-11
### Added
- New option 'sortCol' contains a string with a name of column header, which need to be sorted on grid initialization


## [0.11.15](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.15) - 2016-02-09
### Fixed
- Perfomance problem(skipped dynamic grid reload using flag)


## [0.11.14](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.14) - 2016-02-04
### Fixed
- Table header is overlapped by next line (in IE 10)


## [0.11.13](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.13) - 2016-01-29
### Added
- Fixed the issues, related to overlapping filter and sort icons in table


## [0.11.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.12) - 2016-01-26
### Added
- Classes to inner table headers for spanned headers to decorate compare reports


## [0.11.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.11) - 2016-01-22
### Changed
- Updated bower dependencies
- Updated gulpfile variables


## [0.11.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.10) - 2016-01-20
### Fixed
- User is allowed to delete all filter conditions except the first one.


## [0.11.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.9) - 2016-01-18
### Fixed
- Total number of rows when filter is applied.


## [0.11.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.8) - 2016-01-04
### Fixed
- Resize issue with grid. Do not allow to resize grid when grid is hidden.


## [0.11.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.7) - 2015-12-23
### Fixed
- Style issues with tree grid


## [0.11.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.6) - 2015-12-22
### Fixed
- BPR headers issue, text overflow added to grid headings


## [0.11.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.5) - 2015-12-10
### Fixed
- Issue with wrong popover event names

### Changed
- Specifying the exact versions of the dependencies in bower.json, avoiding using "*" or "~1.0.1" to specify dependencies


## [0.11.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.4) - 2015-12-01
### Added
- Dynamic height of filter popover, depending on free space to the edge of the screen


## [0.11.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.3) - 2015-11-23
### Added
- Add hook to support advance filter.


## [0.11.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.2) - 2015-11-12
### Added
- Extended jqGrid to take precompiled angular directives


## [0.11.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.1) - 2015-11-11
### Added
- Event LOAD_COMPLETE once jqgrid completes loading


## [0.11.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.11.0) - 2015-11-10
### Added
- [RTC-202048](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202048) Accessibility support
- PrismJS to demo
- Updated demo documentation

### Changed
- Moved filter-content.* files from views/ to grid-filter/
- Renamed filter-content.* files to grid-filter.*
- Moved popover styles from grid.scss to grid-filter.scss


## [0.10.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.10.3) - 2015-11-03
### Added
- Support for dynamic height resizing


## [0.10.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.10.2) - 2015-10-30
### Fixed
- The absence of a scroll bar to observe all the filter fields


## [0.10.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.10.1) - 2015-10-29
### Added
- [RTC-44782](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/resource/itemName/com.ibm.team.workitem.WorkItem/44782)
-- Displayed condition "And" between filters since it was confusing otherwise
- Support for slider connect "blue bar" to be changed based on the operator selected while filtering


## [0.10.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.10.0) - 2015-10-23
### Added
- Support for slider in numeric column filtering (Please "bower install x1-ui-ng-slider")


## [0.9.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.9.1) - 2015-10-21
### Added
- New 'scrollableContainer' option added: set the CSS class name of element, scrolling of which affect the position of
the column filter popover


## [0.9.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.9.0) - 2015-10-20
###  Added
- Added support for multiple filters on a single column

### Fixed
- Blocking issues related to grid breaking while filtering


## [0.8.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.6) - 2015-10-17
###  Fixed
- UI mirroring issues


## [0.8.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.5) - 2015-10-16
###  Fixed
- [RTC-44154](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/resource/itemName/com.ibm.team.workitem.WorkItem/44154)
-- Filter dialog cutoff when opened on last column


## [0.8.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.4) - 2015-10-14
###  Fixed
- Added clearfix to resolve issues where total row or table body may not display in Firefox.


## [0.8.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.3) - 2015-10-07
###  Fixed
- [RTC-42917](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/resource/itemName/com.ibm.team.workitem.WorkItem/42917)
-- Total row header disappears when applying or removing filters


## [0.8.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.2) - 2015-10-07
###  Fixed
- [RTC-43854](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/resource/itemName/com.ibm.team.workitem.WorkItem/43854)
-- Support for percentage columns


## [0.8.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.1) - 2015-10-01
###  Added
- New option for horizontal scrolling - x1HorizontalScroll which will enable horizontal scrolling of grid with
respect to its parent element.


## [0.8.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.8.0) - 2015-09-30
###  Added
- Ability to set column filters as per Peretz design guidelines using the x1Filters property
- Two new additional dependencies - x1-ui-ng-popover (in turn depends on x1-ui-ng-tooltip) and x1-ui-ng-select must
be installed
- Do not include bower_components/free-jqgrid/css/ui.jgrid.(min).css anymore. We have copied these styles into the
component and will be part of x1-ui-ng-jqgrid.(min).css


## [0.7.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.7.5) - 2015-09-25
###  Fixed
- Proper unit-test exit code reporting for gulp task.


## [0.7.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.7.4) - 2015-09-25
### Added
- UI mirroring support


## [0.7.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.7.3) - 2015-09-02
### Fixed
- Total row not displaying for treegrids


## [0.7.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.7.2) - 2015-08-27
### Fixed
- Filter icons are grayed by default, colored when active, and return to gray when cleared


## [0.7.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.7.1) - 2015-08-26
### Added
- New 'searchAsYouType' option added: If set to true and with showFilterBar set to true, data in the grid will be
filtered as the user types without any need for them to click a button or hit the Enter key

### Fixed
- When the user clears a filter, the filter type icon will also be hidden to indicate that filter is no longer active


## [0.7.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.7.0) - 2015-08-19
### Added
- New 'cellSize' option added, with associated styling: 'sm', 'md', and 'lg' (default)


## [0.6.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.6.2) - 2015-08-04
### Added
- Initial support for tree view with Peretz styling.


## [0.6.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.6.1) - 2015-08-04
### Added
- Initial support for pivot tables. *DO NOT USE.* Not yet functional. API will change.

### Fixed
- When using totalRow, if there were no visible columns to update, grid component would crash.


## [0.6.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.6.0) - 2015-07-30
### Added
- Extended to support hierarchy reports.


## [0.5.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.5.2) - 2015-07-27
### Fixed
- Set free-jqgrid version to 4.9.0 as later versions introduced significant layout/styling changes


## [0.5.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.5.1) - 2015-07-27
### Fixed
- Typo in vendor src list prevented grid from building on Linux


## [0.5.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.5.0) - 2015-07-16
### Changed
- Changed the underlying library from jqgrid to free-jqgrid
- Removed several of the default options settings (including height: "auto") and provided new high-level flags to turn
 on and off features
- All events now include a gridId so that an upstream controller can determine which (of potentially multiple) grids
fired the event. The gridId is the id passed in on the scope to the grid directive initially.

### Added
- Added the option to scroll through records using a pager instead of the infinite (lazy-loading) scroller.
- Added the option to turn on a horizontal scrollbar. When this option is selected, columns respect their minimum
width and will not shrink below that size. Without the scrollbar, columns will shrink as much as necessary to squeeze
into the available space--even if they become unusable as a result.
- Added the option to turn on the search/filter row in the column headers. A search from the filter row will search
the entire data set (including rows not currently inserted into the DOM) and will filter down and display only the
matching results.
- Added bound events to automatically enable inline editing.
- Cell select events are now broadcast (down the scope) as well as emitted (up the scope) so that child components in
 the grid can receive them.
- Added the GRID_ROW_EDITED event which fires after a row is edited inline and

### Fixed
- Auto-sizing of columns to accurately reflect their content


## [0.4.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.4.1) - 2015-06-10
### Fixed
- Ensure the "Total" heading remains in the total row even if a numeric column is moved to the front of the table.


## [0.4.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.4.0) - 2015-05-27
### Changed
- Changed the top-level option "mode" to "display-mode" and changed the options it supports to "small" and "full".
If set to "small", the grid will display only the maxWidgetColumns number of columns (default 4) and hide all columns
 after that. When set (or changed) to "full" mode, the grid will unhide the columns it hid for "small" mode but leave
 any user-configured hidden columns hidden.


## [0.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.3.1) - 2015-05-26
### Added
- New top-level option "mode" which will limit the max number of columns to display if the grid is showing in
"widget" mode (with very limited screen real estate)
- New optional config option "maxWidgetColumns" --defaults to 4-- to limit how many columns show in a grid when in
"widget" display mode


## [0.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.3.0) - 2015-05-22
### Fixed
- RTC-39979: Ensure "Total" label stays at the head of the total row when reordering columns

### Added
- Support for translation via Angular-Translate


## [0.2.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.8) - 2015-05-18
### Changed
- RTC-39533: Provide additional space for sort icons to prevent overly "scrunched" column headers
- RTC-39665: Prevent sort icon from overlapping column header


## [0.2.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.7) - 2015-05-06
### Changed
- RTC-39199: Ensure fonts in UI match fonts in exported reports

### Fixed
- Update vendor.css file to match latest Peretz Bootstrap


## [0.2.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.6) - 2015-05-05
### Changed
- RTC-38999: Added column width logic so that text columns will generally be twice as wide as numeric ones


## [0.2.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.5) - 2015-05-05
### Changed
- RTC-38982: shrunk grid height to 30px
- RTC-39001: added ellipsis to table cells


## [0.2.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.4) - 2015-05-04
### Fixed
- Peretz RTC-187880: Emitting events for gridComplete, onCellSelect, onColSort. These can be seen in the first grid in
the showcase demo. First column is no longer sorted automatically. New flag sortFirstCol can be set to true to enable
 this again.

### Changed
- Refactored so that creating the totalRow doesn't overwrite a user-passed in function in options for gridComplete
- RTC-39006: Right-align is applied to header cells as well as to body cells
- RTC-38997: restyled Total row to match Peretz Style Guide updates


## [0.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.3) - 2015-04-13
### Added
- Support for infinite scrolling. Large datasets (50,000 rows) can be loaded into the grid with one
 server call and then sorted and viewed locally. By default, the grid will show only 100 rows at
 once and will keep only 200 rows inserted into the DOM. This should be more than the user can
 see at once anyway, so the value should be acceptable. But if you need to change it, set the
 rowNum property in the options object to a value other than 100. To turn off the "infinite scrolling" effect,
 pass in the option "scroll: 0"


## [0.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.2) - 2015-04-06
### Fixed
- Peretz RTC-188949 - Grid defaults overriding passed in options.


## [0.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.1) - 2015-03-31
### Fixed
- Peretz RTC-188630 - Grid defaults overriding passed in options.


## [0.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.2.0) - 2015-03-12
### Changed
- x1-ui-bootstrap version to 2.0.0.


## [0.1.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.1.8) - 2015-03-11
### Added
- jqGrid changelog.


## [0.1.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-jqgrid/tree/0.1.7) - 2015-03-09
### Added
- jqGrid component initiation.
