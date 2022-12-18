# dodoAPI Node.js Library
A lightweight, Promise-based wrapper for dodoAPI. 

# Installation

## Prerequisites
A dodoAPI account, [sign up for free](https://dodoapi.com?source=dodo-api-nodejs) to create REST APIs in seconds and to start using them immediately. No server setup. No deployments.

## Install Package
The following recommended installation requires [npm](https://npmjs.org/).

```sh
npm install dodo-api --save
```

# Usage
## Configuration
In order to start calling APIs you need to instantiate dodoAPI with a Configuration object, which depending on your API auth type, could be:

### No auth configuration
```js
const configuration = {
    account: '{YOUR_ACCOUNT_NAME}',
    api: '{YOUR_API_NAME}'
}
```

### Basic auth configuration
```js
const configuration = {
    account: '{YOUR_ACCOUNT_NAME}',
    api: '{YOUR_API_NAME}',
    authType: 'BASIC',
    basicAuthData: {
        username: '{BASIC AUTH USERNAME}',
        password: '{BASIC AUTH PASSWORD}'
    }
}
```

### Key auth configuration (key in the header)
```js
const configuration = {
    account: '{YOUR_ACCOUNT_NAME}',
    api: '{YOUR_API_NAME}',
    authType: 'KEY',
    keyAuthData: {
        key: '{KEY AUTH KEY NAME}',
        value: '{KEY AUTH KEY VALUE}'
    }
}

```
### Key auth configuration (key in the query)
```js
const configuration = {
    account: '{YOUR_ACCOUNT_NAME}',
    api: '{YOUR_API_NAME}',
    authType: 'KEY',
    keyAuthData: {
        key: '{KEY AUTH KEY NAME}',
        value: '{KEY AUTH KEY VALUE}',
        keyAuthType: 'QUERY'
    }
}

```
## Calling the APIs
Once you have your configuration object you can use it to instantiate dodoAPI and start calling the APIs 

```js
const dodoAPI = require('dodo-api');
const entityService = new dodoAPI(configuration);
```

### Add new entity
To add a new entity you can call the add function and pass it an object with all the columns you have added while creating your API.
```js
const addedEntity = await entityService.add({
    name: 'John',
    family: 'Doe',
    ...
});
```

### Edit an entity
To edit a new entity you can call the edit function and pass it the id of your entity and an object with all the columns you have added while creating your API.
```js
const editedEntity = await entityService.edit('123456789', {
    name: 'John',
    family: 'Smith',
    ...
});
```

### Get an entity by Id
To get an entity by id you can call the getById function and pass it the id of your entity.
```js
const singleEntity = await entityService.getById('123456789');
```

### Get paged entity list
To get a paged list of entities you can call the getList function and pass it optional options object to page/filter/sort the result.
```js
const options = {
  /**
   * The sort column. Default '_id'
   */
  sortBy: '_id',
  /**
   * The sort order. Options asc / desc. Default asc
   */
  sortOrder: 'asc',
  /**
   * The requested page number starting from 1. Options [1, 2, ... n]. Default 1
   */
  pagerPage: 1,
  /**
   * The number of records per request. Max 1. Min 50. Default 25
   */
  pagerSize: 25,
  /**
   * The search column. If not provided search is performed in all columns
   */
  searchBy: 'name',
  /**
   * The search operator. Options like / equal / notequal / in / notin
   */
  searchOperator: 'like',
  /**
   * The search value. If search operator is in or notin values are separated by comma (,)
   */
  searchValues: 'test'
};

const pagedEntityList = await entityService.getList(options);
```

### Delete an entity
To delete an entity you can call the delete function and pass it the id of your entity.
```js
await entityService.delete('123456789');
```

### Call function API
To call an function API you can call the func function and pass it the parameters you have added while creating your API
```js
const funcService = new dodoAPI(configuration);
const funcResult = await funcService.func({
    param1: 'string',
    param2: 0,
    param3: true,
    ...
});
```

# Example
Putting it all together, here is what you need to do to get an entity by id from 'test' api in 'demo' account if it requires no authentication:
```js
const dodoAPI = require('dodo-api');

const configuration = {
    account: 'demo',
    api: 'test'
}

const entityService = new dodoAPI(configuration);
const singleEntity = await entityService.getById('123456789');
```
