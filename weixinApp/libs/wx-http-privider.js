/*
    This file is part of web3.js.

    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/** @file httpprovider.js
 * @authors:
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 * @date 2015
 */

var errors = {
    InvalidNumberOfSolidityArgs: function () {
        return new Error('Invalid number of arguments to Solidity function');
    },
    InvalidNumberOfRPCParams: function () {
        return new Error('Invalid number of input parameters to RPC method');
    },
    InvalidConnection: function (host){
        return new Error('CONNECTION ERROR: Couldn\'t connect to node '+ host +'.');
    },
    InvalidProvider: function () {
        return new Error('Provider not set or invalid');
    },
    InvalidResponse: function (result){
        var message = !!result && !!result.error && !!result.error.message ? result.error.message : 'Invalid JSON RPC response: ' + JSON.stringify(result);
        return new Error(message);
    },
    ConnectionTimeout: function (ms){
        return new Error('CONNECTION TIMEOUT: timeout of ' + ms + ' ms achived');
    }
};

// workaround to use httpprovider in different envs

/**
 * WxHttpProvider should be used to send rpc calls over http
 */
var WxHttpProvider = function (host, timeout, user, password, headers) {
    this.host = host || 'http://localhost:8545';
    this.timeout = timeout || 0;
    this.user = user;
    this.password = password;
    this.headers = headers;
};

/**
 * Should be called to prepare new XMLHttpRequest
 *
 * @method prepareRequest
 * @param {Boolean} true if request should be async
 * @return {XMLHttpRequest} object
 */
WxHttpProvider.prototype.prepareRequest = function (async) {
    var request = {
        headers: {}
    };

    request.method = "POST";
    request.url = this.host;
    request.dataType = "text";
    request.responseType = "text";

    request.async = async;
    request.timeout = this.timeout;

    if (this.user && this.password) {
        var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
        request.headers['Authorization'] = auth;
    } 

    request.headers['Content-Type'] = 'application/json';

    if(this.headers) {
        this.headers.forEach(function(header) {
            request.headers[header.name] = header.value;
        });
    }

    return request;
};

/**
 * Should be called to make sync request
 *
 * @method send
 * @param {Object} payload
 * @return {Object} result
 */
WxHttpProvider.prototype.send = function (payload) {
    var opts = this.prepareRequest(false);

    var result;
    var error;

    opts.complete = function(data, statusCode, header) {
        result = data;
    };

    try {
        opts.data = JSON.stringify(payload);
    } catch (error) {
        throw errors.InvalidConnection(this.host);
    }

    var requestTask = wx.request(opts);

    // timeout config
    if (opts.timeout) {
        setTimeout(function(){
            requestTask.abort();
        }, opts.timeout);
    }

    return requestTask;
};

/**
 * Should be used to make async request
 *
 * @method sendAsync
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
 */
WxHttpProvider.prototype.sendAsync = function (payload, callback) {
    var opts = this.prepareRequest(false);

    opts.success = function(res) {
        var result = res.data;
        var error = null;

        try {
            result = JSON.parse(result);
        } catch (e) {
            error = errors.InvalidResponse(res.data);
        }

        callback(error, result);
    };

    opts.fail = function(err) {
        callback(err.errorMsg);
    };

    try {
        opts.data = JSON.stringify(payload);
    } catch (error) {
        throw errors.InvalidConnection(this.host);
    }

    var requestTask = wx.request(opts);

    // timeout config
    if (opts.timeout) {
        setTimeout(function(){
            requestTask.abort();
        }, opts.timeout);
    }

    return true;
};

/**
 * Synchronously tries to make Http request
 *
 * @method isConnected
 * @return {Boolean} returns true if request haven't failed. Otherwise false
 */
WxHttpProvider.prototype.isConnected = function () {
  try {
    this.send({
      id: 9999999999,
      jsonrpc: '2.0',
      method: 'net_listening',
      params: []
    });
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = WxHttpProvider;
