IBM Commerce UI jqGrid (v2.10.2)
======

## Synopsis
This component is built off of the [jqGrid](http://www.trirand.com/blog/) API wrapped in an 
Angular directive. It provides grid features like:

* lazy loading data
* resizing columns
* reordering columns
* sorting column data (ascending or descending)
* row selection

## Code Example
Compiling the code creates the `/dist` directory, which enables you to view the component demo in a browser.
1. Run `gulp` to compile the code. In WebStorm, run gulp in the terminal.
2. View the compiled code by opening `x1-ui-ng-{component}/dist/.../index.html` in a browser. In
WebStorm, right-click `x1-ui-ng-{component}/dist/.../index.html` and click "Open in Browser".

## Installation
- [Set up](http://x1showcase.emmlabs.ibm.com/#/developers/setup-all) Bower locally
- [Add components](http://x1showcase.emmlabs.ibm.com/#/developers/using-components) to your
application

## Tests
1. Run `gulp unit-test`
2. Run `gulp e2e-test`
3. View `x1-ui-ng-{component}/dist/.../index.html` in these browsers:
	* Internet Explorer 9 and later
	* Firefox (two most recent major versions)
	* Chrome (two most recent major versions)
	* iPad Safari browser (latest version)
	* Google Nexus 10 Android browser (latest version)

## Contributors
See `app/CONTRIBUTING.md`.

## License
See `app/LICENSE.md`.
