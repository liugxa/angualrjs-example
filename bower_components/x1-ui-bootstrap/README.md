IBM Commerce UI Bootstrap (v3.6.1)
======

_Note: This component includes Bootstrap v3.3.4 Sass Package [http://getbootstrap.com](http://getbootstrap.com)_

## Synopsis
[IBM Commerce Product UI Bootstrap](http://x1showcase.emmlabs.ibm.com) is the ultimate framework
which applies the look & feel defined in the IBM Commerce Product Design Guide by mapping and
extending Twitter Bootstrap.

## Code Example
Compiling the code creates the `/dist` directory, which enables you to view the component demo in a browser.

1. Run `gulp` to compile the code. In WebStorm, run gulp in the terminal.
2. View the compiled code by opening `x1-ui-bootstrap/dist/.../index.html` in a browser. In
WebStorm, right-click `x1-ui-bootstrap/dist/.../index.html` and click "Open in Browser".

## Installation
If you want to use X1 UI Bootstrap in your project, create a bower registry file called _.bowerrc_
in your project root and add this config to it to point to our private bower registry.

	{
		"registry": "http://x1showcase.emmlabs.ibm.com:5678"
	}

Execute this command in your project root to install X1 UI Bootstrap.

	bower install x1-ui-bootstrap

Include one of the paths below in your index file. Remember, you don't have to include Twitter Bootstrap in this case.

- bower_components/x1-ui-bootstrap/dist/x1-ui-bootstrap.css
- bower_components/x1-ui-bootstrap/dist/x1-ui-bootstrap.min.css

In order to access the demo pages locally open
*http://localhost/{your-project-name}/bower_components/x1-ui-bootstrap/dist/demo/#/css*
assuming you have your project in the root directory of your favorite HTTP server.

### Optional
You can also import `x1-ui-sass-tools.scss` in your Sass files to get access to Peretz Bootstrap
and Core Bootstrap colors, variables, and mixins.

	@import "bower_components/x1-ui-bootstrap/app/src/x1-ui-sass-tools";

To access [Bootstrap's JavaScript Components](http://getbootstrap.com/javascript/), include one
of the paths below in your index file.

- bower_components/x1-ui-bootstrap/app/src/bootstrap/bootstrap.js
- bower_components/x1-ui-bootstrap/app/src/bootstrap/bootstrap.min.js

## Contributors
- [Step 1](http://x1showcase.emmlabs.ibm.com/#/developers/setup-all): set up Bower
- [Step 2](http://x1showcase.emmlabs.ibm.com/#/developers/contrib-setup): set up Git
- [How to](http://x1showcase.emmlabs.ibm.com/#/developers/modifying-components) modify components
- Follow these [code guidelines](http://x1showcase.emmlabs.ibm.com/#/developers/coding-guidelines)
- Follow this [governance process](http://x1showcase.emmlabs.ibm.com/#/developers/governance) to
successfully contribute your work
- Issue tracking is managed through [Gitlab](https://gitlabhost.rtp.raleigh.ibm.com/groups/commerce-ui/issues)
- Join our [Slack community](https://peretz.slack.com/) for updates and troubleshooting

## License
Licensed Materials - Property of IBM (C) Copyright IBM Corporation 2016. U.S. Government Users
Restricted Rights: Use, duplication or disclosure restricted by GSA ADP Schedule Contract with
IBM Corp.
