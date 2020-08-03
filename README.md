The [Asset Workbench](https://effortlessmountain.github.io/ironsworn-asset-workbench/) is a tool for creating custom assets for the [Ironsworn Tabletop RPG](https://www.ironswornrpg.com/) (the base game is available for free!).

### Contributing
Thanks for lending a hand!
* Fork and create a pull request.
* Make sure all the tests pass (both unit and end to end tests).

### Technical to-do list:
* use Redux for state management.
* make site keyboard-navigable and generally accessible.
* make the HTML more semantic.
* investigate using a component library.
* consider using a style library.
* flesh out test coverage of components.
* revisit code organization.
* provide sane back button support (such as with a proper router).

### Developing
Run `npm install` to install dependencies, then `npm run start` to start a development server running at localhost:3000

### Running Tests

#### Unit Tests
`npm run test`

#### End to End (UI) Tests
`npm run cypress:open`

### Deploying
To deploy to the gh-pages branch of the repository using the `gh-pages` tool, run the following (requires access):

`npm run deploy`