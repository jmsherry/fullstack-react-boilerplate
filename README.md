# Full-Stack Boilerplate

This boilerplate wires up mongodb, express and Create React App.

## Commands

`setup` - to run npm install on both client and server
`yarn dev` - starts the project in dev mode
`yarn start` - starts the project in production mode

## Caveats/Bugs/Features

- In development there is a double-rendering bug caused by React-transition-group (see <https://github.com/reactjs/react-transition-group/issues/429>)

- This app uses the spread operator when cloning things. I've included `cloneDeep` from `lodash`, which you can use instead if you're objects are deeper than 2 levels

- I think there's also a moment where the wrappers aren't passing the default values through to material-ui and that's why it complains about out-of-range values

## Heroku Branch

There is a Heroku branch which will allow you to succesfully deploy to heroku. You can push to heroku's master branch with the command `git push -f heroku heroku:master`
