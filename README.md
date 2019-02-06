# nhs-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### PJMD added to DEBUG in VSCode
```
npm run inspect
``` 
(though not sure VUE_CLI_BABEL_TRANSPILE_MODULES=true  and VUE_CLI_BABEL_TARGET_NODE=node are necessary)
Which is in package.json:
  "scripts": {
...
    "inspect": "VUE_CLI_BABEL_TRANSPILE_MODULES=true VUE_CLI_BABEL_TARGET_NODE=node  node --inspect-brk ./node_modules/jest/bin/jest.js --no-cache --runInBand"
  }

Added as well a launch.json configuration nhs-ui/.vscode
        {
            "name": "Debug Jest Tests",
            "type": "node",
            "request": "launch",
            "runtimeArgs": [
              "--inspect-brk",
              "${workspaceRoot}/node_modules/.bin/jest",
              "--runInBand"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "port": 9229
        }

**In order to fix the issue:**
({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import "core-js/modules/es6.array.iterator" SyntaxError: Unexpected string

I added to:
```
launch.config:
```
I think 1. made the difference
1.            "env": {
                "VUE_CLI_BABEL_TARGET_NODE": "true",
                "VUE_CLI_BABEL_TRANSPILE_MODULES": "true"
            },

2.          "runtimeArgs": [
              "--no-cache"
            ],
```
jest.config.js:
```
1. cache: false

**To be able to debug only one file at a time**
I added to *launch.json* configuration: "program": "${file}"

###Testing a Vuex store ###
 See: https://vue-test-utils.vuejs.org/guides/using-with-vuex.html

1. Because it's a bit convoluted, it's better to separate actions, mutations from the store so they can be tested separately. The probleme is that the state must be injected (see mutations.spec.js and sore.spec.js)
2. Export the store a simple object not a Vuex object otherwise problems will be looming.
3. In main.js, use(Vuex) and in the Vue instance pass it a new Vuex(store plain object)