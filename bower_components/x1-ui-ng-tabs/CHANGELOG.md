# IBM Commerce Product UI Tabs Changelog

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).

## [2.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.1.1) - 2016-08-29
### Fixed
- sanitize-text attribute displaying as text in tab.popover.html template

## [2.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.1.0) - 2016-08-09
### Added
- changed sanitize to new component and added to html files.

## [2.0.13](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.13) - 2016-07-14
### Added
- Ensure "x1.ui.tabs.select.init" is only fired after a user-initiated tab switch

## [2.0.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.11) - 2016-06-03
### Added
- Levels of readiness data in to `bower.json`
- Added `phantomjs-prebuilt` to dev dependencies

## [2.0.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.11) - 2016-06-03
### Fixed
- adding "amp;" to "&" symbol after sanitizing text

## [2.0.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.10) - 2016-05-12
### Added
- `ui.bootstrap.tabs` module dependency
- `ui.bootstrap.tpls` module dependency
- `ui.bootstrap.dropdown` module dependency
### Changed
- `package.json` to meet the standard devDependencies & acquire Gitlab url
- `gulpfile.js` to meet the standard format
- `README.md` to meet the new format
### Fixed
- Accessibility checkpoints: 2.1a, 2.4e, AA2.4.7
	- Keyboard support for tabs dropdown
### Removed
- `gulp.config.json` because variables are located in `gulpfile.js`

## [2.0.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.9) - 2016-05-01
### Added
- sanitize for invalid HTMLS

## [2.0.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.8) - 2016-04-27
### Added
- Added tab-id to each pane to enable customization of each tab

## [2.0.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.7) - 2016-04-11
### Fixed
- Removed unnecessary action tag, fixes an automation redirect issue while creating a workspace

## [2.0.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.6) - 2016-04-07
### Fixed
- RTC-50193 Fix prevents creating a workspace tab automatically without entering edit mode in the scenario where the tabs dropdown is open and the plus icon is clicked to create a workspace tab

## [2.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.5) - 2016-04-06
### Added
- RTC-49550 Exposing event to close all tabs (visible & hidden)

## [2.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.4) - 2016-04-06
### Fixed
- RTC-50165 Tab title edit box is not aligned properly

## [2.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.3) - 2016-03-28
### Added
- added parseHTML and sanitize to handle XSS and cyrillic symbols

## [2.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.2) - 2016-03-25
### Added
- Translation: added 9 new languages

## [2.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.1) - 2016-03-15
### Changed
- `x1-ui-ng-demo-generator` bower version

## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.0) - 2016-03-07
### Added
- IBM Commerce Product Design Language 2.0
### Changed
- Bower dependencies to meet new look & feel
### Removed
- Demo UX specification and blueprint to meet new Showcase integration
- Unnecessary popover HTML
### Fixed
- Double click bug for non-editable tabs

## [1.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/2.0.0) - 2016-03-03
### Changed
- porting build environment to Node LTS 4.3.1 which requires updating dependency packages.
- Please update your build environment, remove node_modules directory, run npm install && npm update before using this version

## [1.1.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.1.4) - 2016-03-02
### Fixed
- Suppress validation tooltip when entering edit mode

## [1.1.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.1.3) - 2016-02-19
### Fixed
- Extra spacing between tabs and content

## [1.1.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.1.2) - 2016-02-16
### Fixed
- Accessibility Checkpoint 1.3a: tab heading fix (dependent on x1-ui-bootstrap#2.16.1)

## [1.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.1.1) - 2016-02-01
### Fixed
- Issue with tab behavior in Safari

## [1.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.1.0) - 2016-02-01
### Fixed
- Boolean values should not be taken as strings, fixes the problem of being able to close tabs even when closable is set to false.
Warning: For example, if you are using closable={{isClosable}} then it should be changed to closable="isClosable".
Make similar changes to responsive, creatable and editable.

## [1.0.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.7) - 2016-01-21
### Added
- Demo class
- Bower dependencies to demo documentation
### Changed
- Info button position from left side to right side of the tab

## [1.0.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.6) - 2015-12-23
### Fixed
- HTML tags in heading

## [1.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.5) - 2015-12-23
### Added
- Second parameter (boolean) to the event "TabsConstant.EVENTS.closeComplete that defines if tab was closed on "destroy" event

## [1.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.4) - 2015-12-08
### Fixed
- Console error after closing workspace tabs
### Changed
- Design of tabs icon from question marks to info

## [1.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.3) - 2015-12-04
### Fixed
- Issue with default tab selection and info popover

## [1.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.2) - 2015-12-02
### Fixed
- Issues with workspaces

## [1.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.1) - 2015-11-11
### Fixed
- Possibility of XSS through tab heading

## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/1.0.0) - 2015-09-30
### Added
- [RTC-202046](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202046) Accessibility support
- x1-tabset directive scope variables
	- tabPosition default: "top"
- x1-tab directive scope variables
	- lazyLoad
### Changed
- Tabs constant events
- renamed info-popover.html to tab.popover.html
- renamed lazy.tab.html to tab.lazy.html
- x1-tabset directive scope variables
	- renamed closing to closable
	- renamed adding to creatable
	- renamed resizable to responsive
- x1-tab directive scope variables
	- renamed info to hasInfo
### Deprecated
- x1-tabset directive scope variables
	- newContent
	- tabsTitle
	- lazyLoad

## [0.3.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.7) - 2015-10-09
### Added
- added tab-id to each pane for improved testability and external styling

## [0.3.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.6) - 2015-09-25
### Added
- added code editor to demo page

## [0.3.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.5) - 2015-09-25
### Fixed
- Include mirroring support in vendor.css
- Fix some css issues

## [0.3.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.4) - 2015-09-24
### Fixed
- Wrong alignment "Information summary" hint window

## [0.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.3) - 2015-09-01
### Added
- UI mirroring support

## [0.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.2) - 2015-07-09
### Fixed
- Added missing translations to the info popover

## [0.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.1) - 2015-06-29
### Fixed
- Double border underneath tab list items

## [0.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.3.0) - 2015-05-11
### Added
- Internationalization support using angular-translate
- Ability to specify max number of characters for tab titles in edit mode
### Fixed
- [RTC-39424] (https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=39424)
-- Fixed overlapping of tabs with the menu items on the top right

## [0.2.14](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.14) - 2015-05-06
### Changed
- Updated to x1-ui-bootstrap#2.1.0.

## [0.2.13](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2
.13) - 2015-05-05
### Fixed
- [RTC-39371] (https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=39371)
-- When there are hidden panes in the dropdown clicking on + to add a tab will now add the tab to the front of the list.

## [0.2.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2
.12) - 2015-05-05
### Fixed
- [RTC-38924] (https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=38924)
-- Clicking on a workspace item from the left navigation now always brings the related tab to the
left most position and selects it. Before, this wouldn't work if it was in the overflow dropdown.

## [0.2.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.11) - 2015-05-04
### Fixed
- [RTC-39207](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=39207)
-- When a workspace is created or its title is edited the focus will now get set properly in the title text box.

## [0.2.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.10) - 2015-04-20
### Fixed
- [RTC-38662](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=38662)
-- Fixed issue where a workspace is opened with two tabs selected

## [0.2.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.9) - 2015-04-09
### Fixed
- [RTC-37993](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37993)
-- Hide info popover null value

## [0.2.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.8) - 2015-04-07
### Added
- listener for tabs resize
### Fixed
- lazy load for tabs with ng-repeat

## [0.2.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.7) - 2015-04-03
### Changed
- Drop down position
- Drop down background color on toggle.

## [0.2.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.6) - 2015-04-02
### Fixed
- [Defect 37993](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37993)
-- Null description in info popover.

## [0.2.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.5) - 2015-04-02
### Fixed
- [Defect 37994](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37994)
-- Info popover word wrap.
- [Defect 37989](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37989)
-- Copy text and styling for info popover

## [0.2.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.4) - 2015-04-01
### Fixed
- [Defect 37984](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37984)
-- Styling bug for tabs with info icon and close icon

## [0.2.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.3) - 2015-04-01
### Added
- Close functionality to tab drop down list
### Changed
- Styling to match latest Peretz blueprints

## [0.2.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.2) - 2015-03-26
### Changed
- Fixed position of check mark in tab title edit
- Emitting tabSelected event on tab selection

## [0.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.1) - 2015-03-13
### Changed
- Fixed position of info popover

## [0.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.2.0) - 2015-03-12
### Changed
- Updated to x1-ui-bootstrap#2.0.0.

## [0.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-ng-tabs/tree/0.1.0) - 2015-03-11
### Added
- Created the Peretz Tabs component which allows you to create tabbed views.
