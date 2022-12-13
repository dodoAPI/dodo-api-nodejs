# dodoAPI Node.js Library
## Installation

Install the package with:

```sh
npm install dodo-api --save
```

## Usage

<!-- prettier-ignore -->
```js
const { dodoAPI } = require('dodo-api');

const users = new dodoAPI({
    account: '{YOUR_ACCOUNT_NAME}',
    api: '{YOUR_API_NAME}',
    ...
})

// Add entity
users.add({
    name: 'John',
    family: 'Doe',
    ...
})
.then(res => ...)
.catch(err => ...);

// Edit entity
users.edit('123456789', {
    name: 'John',
    family: 'Smith',
    ...
})
.then(res => ...)
.catch(err => ...);

// Get entity by Id
users.getById('123456789')
.then(res => ...)
.catch(err => ...);

// Get paged entity list
users.getList({...})
.then(res => ...)
.catch(err => ...);

// Delete entity
users.getList('123456789')
.then(res => ...)
.catch(err => ...);

```
