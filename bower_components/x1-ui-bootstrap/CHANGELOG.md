# IBM Commerce UI Bootstrap Changelog

All notable changes to this project will be documented in this file. This project adheres to
[Semantic Versioning](http://semver.org/) and [Keep a CHANGELOG](http://keepachangelog.com/).


## [3.6.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.6.1) - 2016-09-09
### Fixed
- removed "app" from "ignore" property in `bower.json`


## [3.6.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.6.0) - 2016-09-06
### Added
- switches directory, switches partial, switches.variables partial
	- `.switch` for css-only UI switches (similar to `.radio` and `.checkbox`)
	- `.switch-inline`, `.switch-sm`, `switch-bg-dark` (similar to `.radio-` and `.checkbox-` counterparts)
- added config files:
	- `.editorconfig`
	- `CONTRIBUTING.md`
	- `LICENSE.md`

### Changed
- `.dropdown-menu` minimum width from 238px to 175px
- single & split button dropdowns horizontal padding from 20px to 10px
- `.input-lg` horizontal padding from 10px to 20px
- `$stroke` from `$gray50` to `$gray10`
- `$table-border-color` from `$gray10-50` to `$stroke`
- updated config files from _x1-ui-ng-seed_:
	- `.gitignore`
	- `bower.json`
	- `package.json`
	- `README.md`
	- `sonar-project.properties`


## [3.5.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.5.2) - 2016-08-16
### Fixed
- Bootstrap Docs `h1[id]` style block with override
- updated `gulpfile.js` to load `app/demo/bootstrap-docs/docs.scss` first for the `demoSass` blob
- `.navbar` text alignment
- `.navbar` icon colors on all states (default, hover, active)


## [3.5.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.5.1) - 2016-08-15
### Fixed
- `.navbar-brand` font weights
- `.navbar-toggle` positioning


## [3.5.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.5.0) - 2016-08-12
### Added
- `x1-ui-ng-prism` component to demos
- `.btn-gray` as an extended class for `.btn-secondary`
- woff2 format for ux1 glyph font: `ux1-glyphicons.woff2`
- lots of new glyph icons
- font family variables
- font weight variables
- updated styling of `<label>`
	- "Helvetica Neue Medium for IBM" font
	- font weight medium
	- color `$gray80`
- `.radio-sm` and `.checkbox-sm` control sizing
- "Helvetica Neue Bold for IBM" to `.badge`
- `.btn-badge.btn-secondary` styling
- `$purple60-10` variable

### Changed
- replaced code snippets with `x1-prism` component
- moved contents of `scaffolding.mixins.scss` to `type.mixins.scss`
- `.form-group` margin bottom from 30px to 20px
- `.btn-badge.btn-default` styles
- `.breadcrumb` font sizing

### Fixed
- pager border on hover/focus (:not selector stopped working for some reason)
- `.navbar` styles

### Removed
- `prism` directory from demo
- `scaffolding.mixins.scss`
- underline from selected/active pagination


## [3.4.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.4.1) - 2016-07-28
### Changed
- `Helvetica Roman, Helivetica, Arial, sans-serif` font reference: [#4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/issues/4)

### Fixed
- text overflow on alert banners: [#2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/issues/2)


## [3.4.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.4.0) - 2016-07-27
### Added
- `cursor: not-allowed` to disabled checkboxes/radios
- `.list-group-item-heading` & `.list-group-item-text` styles
- horizontal form support
- built in close icon styles for `.modal`
- built in `.navbar` styles
- built in arrow support for `.popover` styles
- added support for all bootstrap `.nav` types
- `.progress` and `.progress-bar` styles
- `.table-striped` and `caption` support for Business Partners
- `bannerify` task to gulp

### Changed
- added class dependency to `.btn-glyphicon`: needs to be paired with `.btn-default`, `
.btn-primary`, or `.btn-secondary`
- `.form-control-feedback` glyphicon font size to 16px
- `.alert` banner glyphicon font size to 30px
- `.alert` banner close icon color/hover
- background color and text color of `.btn.btn-default.btn-badge`
- `.list-group-item` badge color
- `.breadcrumb > .active` style from underline to bold
- pagination arrows from `&laquo;` to `.glyphicon-chevron-*`
- checkbox and radio margins
- form input and textarea padding
- updated styles for `.label`
- updated demos: badges, buttons, check-boxes, pagination, radio-buttons
- updated `package.json` dependencies
- updated `gulpfile.js`

### Fixed
- margin bug caused by consecutive `.btn-block` elements
- `.btn` specificity on the following classes: `.btn-link`, `.btn-link-light`, `.btn-sm`, `
.btn-md`, `.btn-lg`
- border-radius of `.btn-group-vertical` buttons
- split border for primary buttons
- at this point, I'm just going to say.. I fixed a lot of button bugs -__-
- `.dropdown-toggle:focus` bug

### Removed
- hard coded bold weight from first child of breadcrumbs


## [3.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.3.3) - 2016-06-21
### Added
- "main" property to `package.json`


## [3.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.3.2) - 2016-05-17
### Changed
- updated `README.md`
- updated `package.json`
- updated `bower.json`

### Fixed
- glyphicon 404 error


## [3.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.3.1) - 2016-05-11
### Changed
- Removes hardcoded path and filename values for glyphicon, replacing with variables


## [3.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.3.0) - 2016-05-10
### Changed
- updated navbar styles to meet latest spec


## [3.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.2.1) - 2016-05-05
### Changed
- updated input group button add-on styles


## [3.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.2.0) - 2016-04-28
### Added
- styles for form validation states

### Changed
- moved glyphicon mixins into its own file
- `.help-block` styling to meet latest spec


## [3.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.1.0) - 2016-04-25
### Added
- size options to .dropdown-menu
- scrollable dropdown at max height

### Changed
- removed border from .dropdown-menu

### Fixed
- dropdown styling to meet latest spec
- button menu styling to meet latest spec


## [3.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.0.4) - 2016-04-14
### Changed
- standard $stroke value to $gray50


## [3.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.0.3) - 2016-04-07
### Fixed
- Button siblings margin


## [3.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.0.2) - 2016-04-05
### Fixed
- Checkbox & radio button colors
- Input vertical padding

### Removed
- Colors demo


## [3.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.0.1) - 2016-03-18
### Changed
- Colors demo

### Fixed
- Table border bug
- Button group border radius bug


## [3.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/3.0.0) - 2016-03-11
### Added
- close/
- list-group/
- pager/
- badges/
- popovers/
- tooltip/
- progress-bars/
- pagination/
- breadcrumbs/
- IBM fonts

### Changed
- bootstrap v3.3.4 to v3.3.6
- btn-white is now a decorator class (used to style buttons on dark backgrounds i.e. btn btn-primary btn-white)
- primary brand colors
- button styles
- radio/check button styles
- typography
- mixins directory structure

### Deprecated
- .btn-special class
- $brand-primary2
- $brand-primary-20
- $com-teal1
- $com-teal2
- $com-teal1-20
- $com-teal1-10

### Removed
- appended !default to all `variables/variables.scss`


## [2.16.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.16.0) - 2016-02-04
### Added
- Glyphicons: glyphicon-minimize-window & glyphicon-maximize-window


## [2.15.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.15.3) - 2016-01-26
### Changed
- Modal animation to slide 20px to center


## [2.15.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.15.2) - 2016-01-26
### Changed
- Modal animation to fade only (no sliding)


## [2.15.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.15.1) - 2016-01-25
### Fixed
- Modal title alignment in header


## [2.15.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.15.0) - 2016-01-15
### Added
- Glyphicons
	- glyphicon-compare


## [2.14.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.14.0) - 2016-01-06
### Added
- Glyphicons
	- glyphicon-view-chart
	- glyphicon-view-combo


## [2.13.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.13.1) - 2015-12-09
### Changed
- Added search input focus styles
- Updated search input demo code


## [2.13.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.13.0) - 2015-11-24
### Changed
- Search input HTML structure to support accessibility
- Moved the incorrect combobox demo code to buttons


## [2.12.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.12.0) - 2015-11-19
### Added
- [RTC-202052](https://emmrtcapp03.emmlabs.ibm.com:9443/ccm/web/projects/ExperienceOne%20Peretz#action=com.ibm.team.workitem.viewWorkItem&id=202052) - Accessibility support for modal
	- Focus style for modal close button
- Glyphicons
	- glyphicon-workspaces
	- glyphicon-run
	- glyphicon-accessibility
	- glyphicon-flag-empty
	- glyphicon-flag-fill
	- glyphicon-tag-repeat
	- glyphicon-tag-select


## [2.11.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.11.0) - 2015-11-11
### Changed
- Changed banner alert message styles to match the Peretz design


## [2.10.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.10.0) - 2015-10-23
### Added
- Glyphicons
	- glyphicon-view-tree
	- glyphicon-view-list
	- glyphicon-forum
	- glyphicon-payment-creditcard
	- glyphicon-chevron-down-double
	- glyphicon-chevron-up-double
- Glyph stack styles
- PrismJS to demo directory

### Changed
- text color styles


## [2.9.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.9.1) - 2015-10-19
### Fixed
- Misplaced items in login for RTL mode
- Bidirectional issues for search modal


## [2.9.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.7.1) - 2015-10-08
### Added
- Base text direction support


## [2.8.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.8.0) - 2015-10-08
### Added
- Glyph variables from v2.7.0
### Changed
- Swapped values of .glyphicon-or & .glyphicon-and


## [2.7.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.7.1) - 2015-10-07
### Changed
- Iconography demo layout


## [2.7.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.7.0) - 2015-10-02
### Added
- 30 new glyphicons
### Removed
- Glyph version mapping tab from demo


## [2.6.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.6.0) - 2015-09-30
### Added
- Global glyph variables: %glyphicon, %glyphicon-xs, %glyphicon-sm, %glyphicon-md, %glyphicon-lg
- Glyph class: .glyphicon-xs

### Changed
- Navbar styles to meet the latest spec
- (Navbar) Dropdown styles to meet the latest spec


## [2.5.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.6) - 2015-09-15
### Fixed
- rb-integration dependency, correctly added to devDependencies and using bower registry


## [2.5.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.5) - 2015-09-15
### Fixed
- Angular resolution error
- Demo modular error


## [2.5.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.4) - 2015-09-08
### Fixed
- Styles for combination buttons with glyphicons


## [2.5.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.3) - 2015-08-29
### Added
- UI mirroring support


## [2.5.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.2) - 2015-08-26
### Changed
- Changed left & right padding on input[type="search"] from 20px to 10px
- Updated search input icon positioning from 20px to 10px


## [2.5.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.1) - 2015-08-11
### Changed
- $brand-primary-10 value from $com-teal1-20 to $com-teal1-10


## [2.5.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.5.0) - 2015-08-06
### Added
- Glyphicon classes:
	- glyphicon-star-empty
	- glyphicon-star


## [2.4.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.4.1) - 2015-06-09
### Fixed
- Removed .modal-backdrop redundant code to fix positioning


## [2.4.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.4.0) - 2015-06-08
### Added
- Contextual modal styles in _modals/modals.scss_
- Modal variables in _variables/variables.scss_
	- $modal-xl
- Modal mixin "com-context-modal" in _mixins/mixins.scss_

### Changed
- Modal styles in _modals/modals.scss_
	- Modal sizes
- Modal variables in _variables/variables.scss_
	- $stroke
	- $modal-inner-padding
	- $modal-title-line-height
	- $modal-md
	- $modal-sm


## [2.3.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.3.4) - 2015-06-05
### Fixed
- Added zindex to .modal-backdrop to allow .modal to display on top


## [2.3.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.3.3) - 2015-06-04
### Fixed
- [Defect 37918](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37918): Removed max-width .container and .container-fluid


## [2.3.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.3.2) - 2015-06-03
### Fixed
- [Defect 40260](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=40260): Checkboxes and radio buttons to allow required tooltip to stay visible


## [2.3.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.3.1) - 2015-06-02
### Fixed
- Added focus styles to checkboxes and radio buttons


## [2.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.3.0) - 2015-06-02
### Added
- Glyphicon classes:
	- glyphicon-world
	- glyphicon-people-one-add
	- glyphicon-people-group
- Checkbox and radio button styles


## [2.2.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.2.1) - 2015-05-14
### Fixed
- glyphicon-close class usage to glyphicon-remove


## [2.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.2.0) - 2015-05-13
### Added
- Glyphicon classes:
	- glyphicon-history
	- glyphicon-poeple-two


## [2.1.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.1.1) - 2015-05-08
### Fixed
- glyphicon-info-sign class name


## [2.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.1.0) - 2015-05-06
### Added
- UX1 Glyphicons fonts:
	- glyphicon-arrow-right
	- glyphicon-arrow-left
	- glyphicon-arrow-up
	- glyphicon-arrow-down
	- glyphicon-import
- _glyph.variables.scss_ to allow developers to use the font icons through css

### Removed
- Glyphicon classes from v0.1.0


## [2.0.12](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.12) - 2015-05-06
### Fixed
- [Defect 39216](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=39216)


## [2.0.11](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.11) - 2015-05-04
### Added
- Bootstrap 3.3.4 Sass package
- _grid.scss_ to update peretz grid patterns

### Removed
- Bootstrap 3.3.2 Sass package


## [2.0.10](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.10) - 2015-04-03
### Changed
- Nav tabs a tag height to be fixed.


## [2.0.9](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.9) - 2015-04-03
### Changed
- Outline from focus state of all elements to none.


## [2.0.8](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.8) - 2015-04-01
### Fixed
- [Defect 37984](https://emmrtcapp11.emmlabs.ibm.com:9447/ccm/web/projects/ExperienceOne%20Customer%20Analytics#action=com.ibm.team.workitem.viewWorkItem&id=37984)
-- Nav tabs line height value in _variables.scss_.


## [2.0.7](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.7) - 2015-03-31
### Added
- Truncating text to tabs in _navs.scss_.


## [2.0.6](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.6) - 2015-03-30
### Fixed
- Fixed form related style bugs in _forms.scss_.
- Fixed button outline, height, and borders in _buttons.scss_.
- Fixed typography spacing in _type.scss_.


## [2.0.5](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.5) - 2015-03-26
### Changed
- Updated _forms.scss_ with new form styles.
- Updated _input-groups.scss_ with new input styles.
- Updated _variables.scss_ with edited and new form variable values.


## [2.0.4](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.4) - 2015-03-24
### Changed
- Updated _modals.scss_ with new modal styles.
- Updated _variables.scss_ with edited modal variable values.


## [2.0.3](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.3) - 2015-03-19
### Changed
- Updated _navs.scss_ with new nav tab styles.
- Updated _buttons.scss_ with updated sizes.
- Updated _type.scss_ with edited styles.
- Updated _mixins.scss_ with custom functions.


## [2.0.2](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.2) - 2015-03-19
### Changed
- Updated _navs.scss_ with new nav tab styles.
- Updated _buttons.scss_ with updated colors.
- Updated _variables.scss_ with edited colors names.


## [2.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.1) - 2015-03-12
### Changed
- Updated _navbar.scss_ to latest Peretz specifications.


## [2.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/2.0.0) - 2015-03-12
### Removed
- Old color variables: _color-variables.scss_


## [1.3.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/1.3.0) - 2015-03-11
### Changed
/app/src
    bootstrap/_scaffoldind.scss
    buttons/_buttons.scss
    dropdown/_dropdown.scss
    modals/_modals.scss
    navs/_navs.scss
    scaffolding/_scaffolding.scss
    variables/_variables.scss
    x1-ui-bootstrap.scss


## [1.2.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/1.2.0) - 2015-02-20
### Added
- Bootstrap's 3.3.2 JavaScript files: _bootstrap.js_ and _bootstrap.min.js_


## [1.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/1.1.0) - 2015-02-20
### Added
- UX1 Glyphicons fonts:
	- glyphicon-fast-forward
	- glyphicon-fast-backward
	- glyphicon-triangle-right
	- glyphicon-triangle-left
	- glyphicon-chevron-left-double
	- glyphicon-chevron-right-double
	- glyphicon-edit


## [1.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/1.0.1) - 2015-02-18
### Changed
- "link2" class hover and focus color


## [1.0.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/1.0.0) - 2015-02-05
### Added
- Bootstrap 3.3.2 Sass package
- _ibm-colors.scss_ to update IBM Design Language color palette

### Changed
- Updated component styles to latest Peretz style guide

### Removed
- Bootstrap 2.0.0 Sass package


## [0.1.0](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/0.1.0) - 2014-09-22
### Added
- _bower.json_ and _package.json_ to initialize package.


## [0.0.1](https://gitlabhost.rtp.raleigh.ibm.com/commerce-ui/x1-ui-bootstrap/tree/0.0.1) - 2014-09-21
### Added
- _README.md_ and _.gitignore_ to initialize repository.
