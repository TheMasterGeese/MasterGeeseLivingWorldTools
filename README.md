<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[version-shield]: https://img.shields.io/github/v/release/TheMasterGeese/MasterGeeseLivingWorldTools
[version-url]: https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/releases/latest
[forks-shield]: https://img.shields.io/github/forks/TheMasterGeese/MasterGeeseLivingWorldTools
[forks-url]: https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/network/members
[stars-shield]: https://img.shields.io/github/stars/TheMasterGeese/MasterGeeseLivingWorldTools
[stars-url]: https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/stargazers
[issues-shield]: https://img.shields.io/github/issues/TheMasterGeese/MasterGeeseLivingWorldTools
[issues-url]: https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/issues
[license-shield]: https://img.shields.io/github/license/TheMasterGeese/MasterGeeseLivingWorldTools
[license-url]: https://github.com/TheMasterGeese/MasterGeeseLivingWorldTools/blob/master/LICENSE.md
[last-updated-shield]: https://img.shields.io/github/last-commit/TheMasterGeese/MasterGeeseLivingWorldTools

# Master Geese's Living World Tools

This repository acts as both a template for new Living World modules and as a testing ground for new tools or improvements to the workflow of existing modules.

[![Version][version-shield]][version-url]
![Last Updated][last-updated-shield]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

Based on [Dragon Flagon TS Automated Module template](https://github.com/flamewave000/fvtt-module-template) by flamewave000.
### Table of Contents

- [How to Use](#How-to-Use)
- [Folder Structure](#Folder-Structure)
- [Project Files](#Project-Files)
- [Module Manifest File](#Module-Manifest-File)
- [NPM Package File](#NPM-Package-File)
- [Changelog](#Changelog)
- [Contributing](#Contributing)
- [License](#License)

## How to Use

First, perform the necessary steps to set up your development environment under [CONTRIBUTING](CONTRIBUTING.md). If you are setting up
the development environment for a specific MG Living World module, that module's repository may have additional setup steps under its
own CONTRIBUTING.md file.

## Folder Structure

| Folder Name             | Description                                                  |
| ----------------------- | ------------------------------------------------------------ |
| `bundle/`               | Contains the final module.json and .zip files that are produced by your build. |
| `css/` (optional)       | The directory containing any CSS you might have. This is an optional directory as not every module is going to be editing HTML. If you exclude this, make sure to remove the `"styles": "{{css}}"` field from the `module.json` file. |
| `dist/` (generated)     | This will contain the compiled source code, templates, project files, styles, and manifest generated during the build process. These will be exported to the bundle/ directory during the build process, and this folder will be cleared out as a result. |
| `lang/`                 | The directory containing your localization strings files.    |
| `node_modules/` (generated) | Contains all of your installed npm packages required for development or for the module itself. Is excluded from the Github repository. |
| `src/`                  | The directory containing all of your `.js` and `.ts` code files. |
| `templates/` (optional) | The directory containing your Handlebars HTML template files. This is an optional directory. This is an optional directory as not every module is going to be editing HTML. |
| `tests/`                | The directory containing all of your test files. |
| `types/`                | Contains types that cannot be downloaded via npm, such as the PF2E system's types. |
| `worlds/`               | The directory containing all of your worlds. Includes at least one world for testing purposes.|

[top](#table-of-contents)

## Project Files

| File            | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `.env` (created)   | Contains all your environment variables, specific to your current dev environment. |
| `.eslintrc `    | Configuration file for ESLint. |
| `.gitignore`    | This is used to ignore files and folders you don't want to be included in the git repository. |
| `CHANGELOG.md`  | A Markdown file for describing the module's history of changes. |
| `CONTRIBUTING.md` | A Markdown file for describing how to contribute to this repository, as well as any guidance that applies to all MG Living World modules. |
| `css/samplecss.css` | Template for a css file to be included in a new module. |
| `docker-compose.yml`  | Configuration for docker to download the appropriate docker image and build the container. |
| `env-sample`  | Template for .env file to be renamed into .env when creating a new module or checking out this repository locally. |
| `gulpfile.js`   | Gulp File that contains the various build scripts used automating the module linting, testing, development, building, and packaging. |
| `lang/samplelang.json` | Template for an initial lang file in a new module. |
| `LICENSE`       | The Copyright License for your module. MG Living World modules use the MIT license.|
| `module.json`   | The FoundryVTT Module Manifest file that describes everything about your module. |
| `package-lock.json`  | Tracks the exact version of each package installed. Is included in the repo, to ensure 100% reproduction of the environment across machines. |
| `package.json`  | The NPM Package configuration. May contain additional build scripts. |
| `playwright.config.ts`  | Configuration for Playwright to test your module. |
| `README.md`     | Markdown file you can use to describe what your module is and how to use it. |
| `src/index.ts`  | Template for an initial typescript file in a new module. | 
| `tests/example.spec.ts` | Template for Integration tests in a new module. |
| `tests/TestEnvironmentSample.ts` | Template for TestEnvironment.ts file to be renamed into TestEnvironment.ts when creating a new module or checking out this repository locally. |
| `tsconfig.json` | TypeScript configuration. This defines the various settings used by the TypeScript transpiler. |

[top](#table-of-contents)


| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npx gulp`             | This is the basic Build command, it will execute all the steps below (except watch) in the order given. |
| `npx gulp lint`     | Lints your code, looking for code format/style/best practice improvements that can be made and applying any fixes that can be done automatically. If there are any errors, the build process stops after this step finishes executing. Continues execution if there are no findings or all findings are only warnings. |
| `npx gulp dev`     | Clears out the development directory, then build your module and copy it to your dev environment's modules/ folder. |
| `npx gulp outputTesWorld` | Copies the contents of worlds/testWorld into your foundrydata/Data/worlds/ folder. |
| `npx gulp test` | Spins up an instance of FoundryVTT in a docker container, then runs all integration tests against this container using playwright. When tests are complete, the container is removed. |
| `npx gulp watch` | Builds your module as the dev command does, but also keeps the process running, so that if any of the files that would be published via the dev command are changed, they will automatically be pushed to the corresponding dev directory.|
| `npx playwright test` | Runs integration tests without setting up/tearing down the docker container first. Also shows test-by-test output in the terminal where the npx gulp test command does not. |
| `docker-compose up -d` | Starts a docker container containing a running FoundryVTT server. If the image is not present on the local achine, or is out of date, the latest version will be downloaded before building it. |
| `docker-compose down` | Stops and removes the currently-running FoundryVTT container. |
| `npx eslint --fix ./src/**/*` | Runs eslint manually, without using gulp.

[top](#table-of-contents)


## Module Manifest File

The module manifest does not contain too much that needs to be updated. There are certain variables that will be available when building. The manifest runs through a compilation and is injected with data from the build process and output to the `dist/` directory along with everything else.

| Build Variables | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `{{name}}`      | The Module's package name. This will not be visible to users, but must be a unique name in the FoundryVTT module system.<br />*This value is defined in the `package.json`* |
| `{{title}}`     | The User facing name for the module.<br />*This value is defined in the `package.json`* |
| `{{version}}`   | The version of the module. This should follow the standardized [Semantic Versioning](https://semver.org).<br />*This value is defined in the `package.json`* |
| `{{sources}}`   | The `"{{sources}}"` portions(including the quotes) will be replaced with a JSON array of all source files found in the `src/` directory.<br />*This is assembled at build time.* |
| `{{css}}`       | The `"{{css}}"` portion (including the quotes) will be replaced with a JSON array of all styling files found in the `css/` directory.<br />*This is assembled at build time.* |

The `module.json` file contains sections that will need to be updated. These include:
| Property Name   | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `author`        | Your name should go here. |
| `url`           | The URL of your project should go here.
| `license`       | The path to your project's LICENSE file should go here.
| `manifest`      | The path to your module's latest package manifest (module.json file) should go here.
| `download`      | The path to the latest release of your project (in .zip format) should go here.
| `readme`        | The path to your project's README file should go here. |
| `changelog`     | The path to yout project's CHANGELOG file should go here. |

[top](#table-of-contents)

## NPM Package File

The NPM Package file is used by NPM to handle the project dependencies and to run the Gulp builder. There are a couple of things that need to be updated in this file for your new module.

| Property Name   | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `name`          | Update this to your unique package name (no spaces!) |
| `title`         | Update this with the displayed name. |
| `version`       | This is the [Semantic Version](https://semver.org/) of your module |
| `main`          | Main entry point into your module. Will be injected into manifest. You can also make it an array if you have more than one entry point that needs to run. |
| `description`   | The short description FoundryVTT shows in the Module Managers |
| `scripts`(optional) | This is where npm scripts are defined. Does not include npx or docker scripts. Not all modules will have this property. |
| `dependencies` (optional)  | These are the NPM dependencies used to compile the project. Not all modules will have dependencies. Note that dependencies on other FoundryVTT modules should be specified in the module.json file instead.|
| `devDependencies`  | These are the NPM dependencies used to build the project. |


[top](#table-of-contents)

## Changelog
See [CHANGELOG](CHANGELOG.md)
## Contributing
See [CONTRIBUTING](CONTRIBUTING.md)
## License
Distributed under the MIT License. See [LICENSE](LICENSE.md) for more information.
