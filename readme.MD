[![NPM version](https://img.shields.io/npm/v/micro-xhr.svg?style=flat)](https://www.npmjs.org/package/micro-xhr)
[![Size](https://badgen.net/bundlephobia/minzip/micro-xhr)](https://bundlephobia.com/result?p=micro-xhr)
[![Build Status](https://travis-ci.com/kasvtv/micro-xhr.svg?branch=master)](https://travis-ci.com/kasvtv/micro-xhr)
[![Coverage Status](https://coveralls.io/repos/github/kasvtv/micro-xhr/badge.svg?branch=master)](https://coveralls.io/github/kasvtv/micro-xhr?branch=master)
[![Dependency Status](https://david-dm.org/kasvtv/micro-xhr.svg)](https://david-dm.org/kasvtv/micro-xhr)
[![Known Vulnerabilities](https://snyk.io/test/github/kasvtv/micro-xhr/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kasvtv/micro-xhr?targetFile=package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# micro-xhr

A tiny barebones request library for browser environments. Performs only the most essential grunt work of calling XMLHttpRequest and returns a promise holding the future result. Further allows you to access the underlying XMLHttpRequest instance to perform lower level actions such as aborting the request.

Stringifies and parses JSON request payloads and responses automatically when required.

## Installation

```bash
npm install micro-xhr
```

## Usage

```js
const xhr = require('micro-xhr');

const myRequest = xhr({
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

# API: micro-xhr

### function({url, method, headers, data}) -> result

Perform an HTTP(S) request to the given url, with the given method, headers and data.

#### arguments
- **requestObject** *(Object)*
  - `url` *(string)*: URL to perform the request to
  - `method` *(string)*: HTTP method to use (defaults to GET)
  - `headers` *(Object)*: Headers to use, keys are case insensitive and `content-type` defaults to `application/json`
  - `data` *(any)*: Request payload to send. Automatically stringifies to JSON if the `content-type` header contains `application/json`.

#### returns
- *(Promise)*: Resolves when the request finalizes, except in case of a non-2XX status or on parse errors
  - ***- resolves to*** (*Object*) ***-*** 
    - `status` (*int*): The received status code
    - `headers` (*Object*): Received headers, all keys are lowercase
    - `data` (*string | any*): Received response body, auto-parses JSON, else returns a string
  - ***- or rejects to*** (*Object*) ***-*** 
    - `status` (*int*): The received status code, 0 if request failed
    - `headers` (*Object*): Received headers, all keys are lowercase
    - `data` (*string | any*)?: Received response body, auto-parses JSON, else returns a string
    - `error` (*Error*)?: Returned instead of `data` an exception occurs during parsing
        - `rawBody` (*string*): Unparsed response body
  - `xhr` *(XmlHttpRequest)*: The underlying XMLHttpRequest

# API: micro-xhr/xhr

### function({url, method, headers, data}) -> result

The same as `micro-xhr`, except that the promise still resolves on a non-2XX status. Called internally by `micro-xhr`
