# Peretz Searchbar (v2.0.3)

The Peretz Searchbar component provides a consistent way to point users in the right direction when
		using your application. Pass in a message to display and the direction you want to point the user towards and
		the searchbar component will take care of the rest. Put an ng-show condition on the searchbar directive (or an
		ng-if condition on its container) to make the searchbar disappear when you are done with it.

## Installation Instructions:
If you want to use Searchbar in your project, create a bower registry file called .bowerrc in
your project root and add this config to it to point to our private bower registry.

	{
		"registry": "http://x1showcase.emmlabs.ibm.com:5678"
	}

Execute this command in your project root to install Searchbar.

	bower install x1-ui-ng-searchbar

Include the following paths in your index file:

* bower_components/x1-ui-ng-searchbar/dist/x1-ui-ng-searchbar.css or x1-ui-ng-searchbar.min.css
* bower_components/x1-ui-ng-searchbar/dist/x1-ui-ng-searchbar.js or x1-ui-ng-searchbar.min.js

In order to access the demo pages locally open
http://localhost/your-project-name/bower_components/x1-ui-ng-searchbar/dist/demo/#/searchbar
assuming you have your project in the root directory of your favorite HTTP server.

You can also access the demo pages at [X1 Showcase (Development)](http://dev.x1showcase.emmlabs
.ibm.com) to see how to leverage Searchbar.

## Contribution Instructions:
If you are interested in contributing to this project:

1. Fork the x1-ui-ng-searchbar repository
2. Make changes to your fork, commit and push the changes to your fork
3. Submit a pull request from your fork to the master branch of x1-ui-ng-searchbar (2 approvals mandatory to merge)

### Build commands:

In order to build and watch files as you modify, run:

	gulp

In order to build files, run:

	gulp build

In order to clean your build, run:

    gulp clean


### Approval Guidelines:
1. Make sure you update the demo pages in the app/demo folder whenever you change the app/src files
