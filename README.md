# CurrencyConversion

This simple webpage performs a currency conversion using the JSON data from http://fixer.io

## Dependencies

* AngularJS
* Angular Material
* Grunt
* SASS
* NPM

## Installation

1. Please have the latest Node.JS and NPM (version 3.10.3 *important*) installed via [Node.Js](https://nodejs.org/en/download/)
2. Clone the repository to CurencyConversion folder.
3. Run 'npm install -g grunt-cli' to install the Grunt CLI to run tasks. (If error occurs, try 'npm cache clean' and rerun 'npm install -g grunt-cli')
4. Run 'npm install -g karma' to install and karma test runner.
5. Run 'npm install grunt' to install local grunt
6. Run 'npm install' within that folder using command line for windows, terminal for Mac and Linux. (Could take a while)
7. If you are on Linux or Mac, proceed to the next step. On Windows, please install Ruby with Gem such that we can use Sass. [Ruby](http://rubyinstaller.org/downloads/)
8. Run 'gem install sass' to install Sass
9. After everything is setup, simply run 'grunt' in the root folder. This will start a static web server via grunt task 'connect'. (If failed, delete your node_modules folder and run 'npm install' again)
10. Navigate to http://localhost:6789/ to view the webpage on a static web server (or open up index.html)
11. Navigate to http://localhost:6789/docs to view the documentations API

## Grunt Config

Grunt uses the following dependencies:

1. JsHint
2. Watch
3. Concat
4. Sass
5. Copy
6. Uglify
7. Clean
8. Connect
9. Ngdocs

These tasks will all be executed when 'grunt' is run.

## Implementation Details

This web page is designed using AngularJS following its MVC structure in which the controllers also acts as models.
Documentations are avaliable at http://localhost:6789/docs , generated using Ngdocs

### Directives

1. Currency Row
2. Currency Field
3. Currency Dropdown

### Controllers

1. Main Controller
2. Currency Row Controller
3. Currency Field Controller
4. Currency Dropdown Controller
5. Dialog Controller

### Services

1. Exchange Rate Service
2. Incremental Service

### Styling

1. Responsive design using media queries
2. Sass Mixins for simplifying future workflow
3. _constants.scss for a storage of constant values

### Events

1. Uses Angular's $on and $broadcast to emit and receive events
2. When a model was changed in the input and select tag, an event will be broadcasted.
3. Upon receiving of event details with $on, currency calcuation will be performed to update the model. (Observer pattern)
(HTTP request data is cached on page using angular's $http option to increase performance)

## Future To-Dos
1. Expand the number of currency rows to support more currencies.
2. Any changes made to any rows can cause other rows to change value.
3. Select the date of the currency rate you wish to view.
4. Add a backend server such as Node to allow html templates to be written in a separate file and used with templateUrl.
5. Add unit tests for each controller functionality

## Notes

1. UglifyJs does not seem to support ES5 syntax such as multi-line html notation '``' so I decided to keep the uglify task and resolved using classic javascript notation '+' because performance is more valued
2. Html view templates was not used because there was no backend server to link to different template URLs
3. Unit tests were setup but not completed yet using Karma and Jasmine framework, integrated in Grunt


## Author

* **Leo Liu** - *University of Waterloo*

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details