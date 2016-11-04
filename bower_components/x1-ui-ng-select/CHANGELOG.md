# Peretz Select Change Log

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.1.19](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.2.0) - 2016-08-01
### Fixed
- selection list to be sorted by either $index or user specified option field
- show displayName rather than name if available (accounting for alternate translations)

## [2.1.18](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.18) - 2016-07-12
### Fixed
- sorted lists alphabetically for segments.

## [2.1.17](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.17) - 2016-06-29
### Fixed
- Added titles for items in select tree

## [2.1.16](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.16) - 2016-06-28
### Fixed
- dropdown not disabled

## [2.1.15](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.15) - 2016-06-23
### Fixed
- Levels of readiness meta properties added to bower.json

## [2.1.14](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.14) - 2016-06-17
### Fixed
- Performance issues in Firefox
- Highlighting tree menu items on keypress

## [2.1.13](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.13) - 2016-06-15
### Fixed
- Bottom part of drop-down list can be outside visible area

## [2.1.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.12) - 2016-06-08
### Fixed
- Overlap functionality doesn't work

## [2.1.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.11) - 2016-06-07
### Added
- `LICENSE.md` file
- `.editorconfig` file
- Accessibility support
- `x1UiNgSelect.ARIA.listbox` to translations file
- `selected-label` class to `span` elements containing `selectedOption.name`
### Changed
- `package.json` to meet the standard devDependencies & acquire Gitlab url
- `gulpfile.js` to meet the standard format
- `README.md` to meet the new format
- demo files for global consistency and accessibility
- `line1.svg` to `demo-marketing-icon.svg`
### Fixed
- alignment of dropdown when instructional text is enabled

## [2.1.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/commits/2.1.10) - 2016-06-06
### Fixed
- Added one-time binding for ng-class on subnav-link items
- Added clearfix class to subnav anchor items

## [2.1.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.9) - 2016-06-03
### Fixed
- nested lists are not being closed on outside click

## [2.1.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.8) - 2016-06-02
### Fixed
- typing characters in drop-down does not activate list options

## [2.1.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.7) - 2016-05-31
### Fixed
- caret placement in Firefox

## [2.1.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.6) - 2016-05-27
### Fixed
- added more checks to prevent event bubbling

## [2.1.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.5) - 2016-05-26
### Fixed
- allow closure of dropdown list when submenu item is selected

## [2.1.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.4) - 2016-05-26
### Fixed
- disable select box if there is only one item in select list for multi-select

## [2.1.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.3) - 2016-05-24
### Fixed
- null pointer exception on setOverflow() method

## [2.1.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.2) - 2016-05-24
### Fixed
- selection option list should have name tooltip and ellipses if they are too long

## [2.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.1) - 2016-05-20
### Fixed
- selection box should not be disabled when the selection is exceeding the maximum selection.

## [2.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.1.0) - 2016-04-28
### Added
- lazyRender support back
### Changed
- moved instruction text outside of dropdown as a `.help-block`
- icon color on :active

## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/2.0.0) - 2016-04-26
### Added
- IBM Commerce Product Design Language 2.0
- `theme` attribute to `x1-select` directive
- translation variables
### Changed
- Tree view select is triggered by click *not* hover
- Demos & documentation to present updated features
### Removed
- `select.globals.scss`
- `info.tooltip.html` & x1-ui-ng-tooltip dependency

## [1.1.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.12) - 2016-04-21
### Updated
- borders and colors for additional Peretz 2.0 styles

## [1.1.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.11) - 2016-04-19
### Fixed
- Text overflow issue alongside with glyphicon

## [1.1.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.10) - 2016-04-12
### Fixed
- Peretz 2.0 styling for tree-select

## [1.1.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.9) - 2016-04-04
### Added
- expanding dropdown above selected option block
### Fixed
- dropdowm caret looks like it is disabled

## [1.1.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.8) - 2016-04-01
### Changed
- utils to version 1.0.1

## [1.1.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.7) - 2016-04-01
### Fixed
- selection box should not be shown if its length is equal to 1 for multi-select

## [1.1.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.6) - 2016-03-31
### Added
- minimumSelected option for multi-select

## [1.1.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.5) - 2016-03-24
### Fixed
- width of subList depends on available width

## [1.1.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.4) - 2016-03-13
### Added
- `x1-ui-ng-demo-generator` to demo/devDependencies1
### Changed
- Demo structure
### Removed
- Demo UX specification and blueprint to meet new Showcase integration

## [1.1.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.3) - 2016-03-11
### Fixed
- multi select logic

## [1.1.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.2) - 2016-03-10
### Fixed
- Instruction text shown logic

## [1.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.1) - 2016-03-04
### Fixed
- Instruction text should not be added to selected options list for multi select support

## [1.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.1.0) - 2016-03-04
### Added
- Arrows and instruction text and default to first element for multi select support

## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/1.0.0) - 2016-03-03
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [0.4.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.4.4) - 2016-03-02
### Fixed
- Firefox css issue for selected options

## [0.4.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.4.3) - 2016-02-23
### Added
- Opening/showing menu and sub-menu by pressing associated key on the keyboard

## [0.4.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.4.2) - 2016-02-10
### Added
- LazyRender feature

## [0.4.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.4.1) - 2016-02-08
### Added
- Overlapping functionality
### Fixed
- Bug with "click" events

## [0.4.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.4.0) - 2016-02-04
### Added
- Accessibility support
- PrismJS to demo
### Changed
- Updated bower dependencies
- Demo layout
- Gulp file structure

## [0.3.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.9) - 2016-01-20
### Fixed
- select tree can't be opened in IE10 and below, pointer-events isn't supported

## [0.3.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.8) - 2016-01-20
### Added
- Added track by $index into ng-repeat directives

## [0.3.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.7) - 2016-01-18
### Changed
- cursor icon on disabled state

## [0.3.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.6) - 2015-12-30
### Fixed
- Metric names are too short on report Chart in Firefox

## [0.3.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.5) - 2015-12-29
### Fixed
- Disabling x1-select in IE 10 and earlier versions

## [0.3.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.4) - 2015-12-24
### Changed
- When hovering over select cursor should be changed to finger pointer

## [0.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.3) - 2015-12-18
### Fixed
- Minor style issue with aligning boxes on Share Workspaces

## [0.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.2) - 2015-12-08
### Fixed
- issue with overflow: auto

## [0.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.1) - 2015-12-07
### Fixed
- issue with text truncation: ellipsis

## [0.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.3.0) - 2015-12-02
### Added
- iconUrl options to selectOptions object. Can provide an icon url.
- Had to alter styling of `.option-icon` class slightly to the following: `display: inline-block;`, `position: absolute`

## [0.2.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.7) - 2015-12-03
### Added
- overflow feature for flat select
### Optimized
- hover actionType for type: "tree"

## [0.2.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.6) - 2015-11-25
### Fixed
- Hiding remove icon for "single" select

## [0.2.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.5) - 2015-11-24
### Added
- Single select mode
### Fixed
- select items overlapping

## [0.2.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.4) - 2015-11-17
### Fixed
- Defect related to tree-view selected item
- Defect related to sharing workspaces

## [0.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.3) - 2015-11-04
### Fixed
- Defect related to hiding select options

## [0.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.2) - 2015-10-20
### Added
- Selection change function

## [0.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.1) - 2015-10-19
### Fixed
- Issues with options list highlighting improperly when the same data set is used for two select components on the
same page
- Minor styling issues

## [0.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.2.0) - 2015-10-08
### Added
- Size parameter to support 30px height and 40px height
- A global and mixin Scss file

### Fixed
- Some HTML semantics and styles

## [0.1.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.7) - 2015-09-24
### Fixed
- Include mirroring support in vendor.css

## [0.1.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.6) - 2015-09-21
### Added
- New type: tree

## [0.1.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.5) - 2015-09-14
### Fixed
- [RTC-43365](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/resource/itemName/com.ibm.team.workitem.WorkItem/43365)
-- Used custom blur event to close dropdown when clicked outside instead of ng-blur which does not work properly in
all scenarios

## [0.1.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.4) - 2015-09-14
### Fixed
- gulp task

## [0.1.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.3) - 2015-09-04
### Added
- Ng-blur
- Divider attribute to types of Options
- Styling changes to match peretz style guide for dropdown menu

## [0.1.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.2) - 2015-09-01
### Added
- UI mirroring support

## [0.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.1) - 2015-08-19
### Fixed
- Fixed option text padding issue when option icon is not set
- Removed overflow scroll for the options list since it is not required by design

## [0.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-select/tree/0.1.0) - 2015-05-20
### Added
- Created the select component that allows you to easily add a single or multi select component to your application.
