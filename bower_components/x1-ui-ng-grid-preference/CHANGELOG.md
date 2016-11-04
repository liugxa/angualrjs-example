# Grid Preference Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [0.9.2] - 2016-09-16
### Added
   - Attribute "gridview" in the demo config
   - "x1-ui-ng-jqgrid" dependency "angular-aria"
### Changed
   - "x1-ui-bootstrap" to version 3.6.1
   - "x1-ui-ng-jqgrid" to version 2.10.2
   - Changed "prism" to "x1.ui.prism" version 2.x 
### Fixed
    - CSS issues related to x1-ui-bootstrap version upgrade
    - Sonar technical debt

## [0.9.1] - 2016-08-29
### Fixed
   - RTC: 154911: Grid Preferences - Add a line separator between the company views and custom views
   - RTC: 154860: 16.4 TVT: [MKD]concatenated string for 'Edit' and 'Approved in Angular JS page
   - RTC: 154731: Grid Preference: filter function should support filtering negative numbers
   
## [0.9.0] - 2016-08-25
### Removed
   - x1-ui-ng-date-picker dependency
### Changed
   - Updated demo to display only one grid using grid preferences
   - CSS for settings tab
   - x1-ui-ng-jqgrid version update
### Fixed
   - RTC: 154894: Grid Preferences: After deleting a custom view, Displayed view should default to deleted view's parent
   - RTC: 154820: Non-sortable columns should not show in sort settings
   - RTC: 154752: Grid Preferences Component - Vertical Scrollbar in the View dropdown window covers the trash icon completely when shown
   - RTC: 153410: Grid Preferences Popover - Date filter format is incorrect
   - Code fix for Sonar technical debt
   
## [0.8.0] - 2016-08-18
### Added
   - Configuration options to customize Preference Dialog buttons and Header
### Changed
   - angular-sanitize version

## [0.7.0] - 2016-08-15
### Fixed
   - RTC: 153702: backspace does not work for grid preference column settings search field
   - RTC: 154194: Up/down arrow in input box of Number filter prevents user from using backspace and non-number text should not be allowed
   - CSS Fixes for column settings search field.
### Added
   - NumberFilter directive for number type filters
   - Date pattern sync with jqgrid date format
   - CSS changes for "form-control-feedback"
### Removed
   - Removed attribute "metaType", should use attribute "formatoptions" for optional parameters
## [0.6.4] - 2016-08-14
### Fixed
    - Jenkins build: update angular-sanitize lib
## [0.6.3] - 2016-08-05
### Fixed
    - RTC: 153808: ng-switch on=" " syntax does not work when running the code inside platform (Classic stack environment)
    - RTC: 153804: Enum filter is tightly coupled with the data set and does not handle blank value
    - RTC: 153803: Boolean filter not working properly when the column data contains the same value
    - RTC: 153410: angularjs grid filter function for date has issue
    - RTC: 153806: Number filter throws error when filterMax is set to Infinity to work around the backspace issue
### Removed
    - removed "gulp-nodemon" from npm
### Changed
    - changed usage of "gulp-jsoncombine" to "gulp-merge-json"
## [0.6.2] - 2016-07-27
### Fixed
    - RTC 152982: for column sorting/filtering, the second layer can not be saved in edit console
    - RTC 152639: Grid Preferences - UI should not allow user to add more sort criteria than specified in the view's maxSort property
### Added
    - "hideSlider" property in demo config json
    - "enumcsv" property in demo config json
    
## [0.6.1] - 2016-07-26
### Fixed
    - If hidden columns are not included in sort/filter sortdata, throws null pointer exception
    - Translation issues while save preference for Filters with filterOptions

## [0.6.0] - 2016-07-25
### Changed
    - Integrate x1-ng-jqgrid "x1Filters" with x1-ng-gridpreference
### Added
    - Filter types and filter operations from grid column header
    - Column resize can be saved 
    - EnumCSV filter
    - Boolean filter
## [0.5.0] - 2016-07-12 - Breaking changes
### Changed
    - Config changes: Column property "dataType" no longer supported, define "sorttype" instead
    - Updated dependency libraries
    - Updated Documentation
### Added
    - Localization support for Enum filter labels which shows in filter section dropdown
    - Support for all JQgrid sorttype properties
### Removed
    - Config changes: AG-Grid Column property "headerName" changed to internal property, no longer need to define in config json

## [0.4.2] - 2016-07-06
###Fixed
-  Defect 151940: Grouped columns shown under dropdown in the Filter Setting of Grid Preferences not translated
    
## [0.4.1] - 2016-07-05
###Fixed
-  Sonar test issues
    - Blocker - 1; Major - 6;

## [0.4.0] - 2016-06-22
###Fixed
-  Bug: 150525: Grid Preference component's custom view shows wrong columns in grouped column
-  date picker CSS alignment issues in settings Tab

### Added
- x1UiNgDatePicker locale
- demo for x1Filters support
- sorttype field property for columns in demo config json
- handle colNames for prefConfig (bug fix)
- editorconfig fields

### Removed
- hasGroupedColumn from demo config json

###Changed
- update x1-date-picker version-2.1.0
- update x1-jqgrid version-2.2.18
- update x1-select version-2.1.12
- date-picker - single view for date type selector
- refactored demo js and html and config json
- updated documentation
- config json - hasGroupedColumn property changed to use useGroupedHeaders property
- editorconfig authoring

## [0.3.0] - 2016-06-06
###Fixed
-  issue #8 - Pull in seed repo
-  issue with moment().utc
-  date picker CSS alignment issue in filter settings tab

### Added
-  separated demo examples into demo/examples
-  index.rtl.html
-  separated documentation to grid-preference doc.html

### Removed
- l10n: removed unwanted l10n files

###Changed
- changed constants module name "x1UiGridpreferenceDefaults" to "x1.ui.gridpreference.constant" adherence with x1-seed
- changed contoller name "PreferenceCtrl" to "x1GridPreferenceCtrl"
- changed factory name "preferenceFactory" to "x1GridPreferenceFactory"
- modified bower.json to separate core libraries and dev dependencies
- modified gulpfile.js adherence with x1-seed
- update dependency x1-ui-bootstrap
- update dependency x1-ui-ng-jqgrid
- update dependency x1-ui-ng-modal
- update dependency x1-ui-ng-popover
- update dependency x1-ui-ng-select

## [0.2.5] - 2016-06-02
###Fixed
- 149457: View switch event is needed by application

###Changed
- updated documentation
- CSS change for column settings nav button alignment

## [0.2.4] - 2016-05-27
### Changed

- added empty renderInitFn() & renderCompleteFn() to override x1-ui-ng-tabs tab switch error
- CSS Changes for component specific class overrides
- Added toolTips for longer view names
- Added translations from x1-ui-ng-popover

- Bug fixes:
    - RTC: 149470: Row data cannot be populated if the data set contains column index as the key and it is different than the name
        - (Demo Config) updated property name in Config json
    - RTC: 149393: Custom view's parentViewId should not be the parent's own view ID if its parent is also a custom view
        - (Demo Config) added property parentViewId to ViewList.json
    - RTC: 148988: GridPreference component Deleteview method needs to include deletedViewId
        - (Demo Service) added property deleteViewId


## [0.2.3] - 2016-05-24
### Changed
- updated bower dependency component version to the latest
- updated ui-bootstrap styles
    - fixed CSS issues with new bootstrap changes
- changed ui-select to x1-ui-select
- config changes:
    - removed unwanted config files
    - added x1-ui-jqgrid properties for underline jqgrid implementation
    - changes to use client side data
- enhancement fixes (requester markdown):
    - pass parentViewId to the service when create new views
    - pass deletedViewId to the service when view is been deleted
- removed unwanted server dependencies from the project


## [0.2.2]
## Changed
- removed weird unit-test task in gulpfile and left comments (fixes build status bug)

## [0.2.1] - 2016-05-19
### Changed
- updated dev dependencies for build env

## [0.2.0] - 2016-05-19
### Removed
- dist directory
- .idea directory

### Added
- .gitignore file
- CHANGELOG.md

### Changed
- updated README file to match format of other Commerce UI Components
- changed repo url in package.json
- removed post-install script in package.json

