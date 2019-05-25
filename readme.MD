[![NPM version](https://img.shields.io/npm/v/micro-xhr.svg?style=flat)](https://www.npmjs.org/package/micro-xhr)
[![install size](https://packagephobia.now.sh/badge?p=micro-xhr)](https://packagephobia.now.sh/result?p=micro-xhr)
[![Build Status](https://travis-ci.com/kasvtv/micro-xhr.svg?branch=master)](https://travis-ci.com/kasvtv/micro-xhr)
[![Coverage Status](https://coveralls.io/repos/github/kasvtv/micro-xhr/badge.svg?branch=master)](https://coveralls.io/github/kasvtv/micro-xhr?branch=master)
[![Dependency Status](https://david-dm.org/dwyl/esta.svg)](https://david-dm.org/dwyl/esta)
[![Known Vulnerabilities](https://snyk.io/test/github/dwyl/hapi-auth-jwt2/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dwyl/hapi-auth-jwt2?targetFile=package.json)

# micro-xhr

A tiny barebones request library for browser environments. Performs only the most essential grunt work of calling XMLHttpRequest and returns a promise holding the future result. Further allows you to access the underlying XMLHttpRequest instance to perform lower level actions such as aborting the request.

Stringifies and parses JSON request payloads and responses automatically when required.

## Installation

```bash
npm install micro-xhr
```

## Usage

```js
const microXhr = require('micro-xhr');

const myRequest = microXhr({
    url: 'https://domain.com',
    method: 'post',
    headers: {
        'X-My-Custom-Header': 'My custom value'
    },
    data: {
        firstName: 'John',
        lastName: 'Doe'
    }
})

myRequest.then(response => {
    /* Do something with response.data, response.headers or response.status */
}).catch(response => {
    /* Do something with response.data, response.headers or response.status */
});

myRequest.xhr.abort(); // abort the request

```

## API: micro-xhr

### function({url, method, headers, data}) -> result

Perform an HTTP(S) request to the given url, with the given method, headers and data.

#### arguments
- **requestObject** *(Object)*
  - **url** *(string)*: URL to perform the request to
  - **method** *(string)*: HTTP method to use (defaults to GET)
  - **headers** *(Object)*: Headers to use, keys are case insensitive and `content-type` defaults to `application/json`
  - **data** *(any)*: Request payload to send. Automatically stringifies to JSON if the `content-type` header is set to `application/json`.

#### returns
- **Promise** *(Promise)*: Promise that once the request finalizes will resolve in case of an OK status and reject in all other cases.
  - **xhr** *(XmlHttpRequest)*: The underlying XMLHttpRequest

## API: micro-xhr/xhr

### function({url, method, headers, data}) -> result

The same as `micro-xhr`, except that the promise is always resolved. Called internally by `micro-xhr`
