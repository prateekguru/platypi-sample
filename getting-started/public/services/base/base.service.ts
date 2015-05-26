/// <reference path="../../_references.d.ts" />

import plat = require('platypus');

class BaseService {
    protected static _inject: any = {
        _http: plat.async.Http,
        _Promise: plat.async.IPromise,
        _utils: plat.Utils
    };

    protected _http: plat.async.Http;
    protected _Promise: plat.async.IPromise;
    protected _utils: plat.Utils;

    host: string = 'http://platypisamples.azurewebsites.net/gettingstarted/api';
    
    
    json(url: string, data?: any, method: string = 'GET'): plat.async.IThenable<any> {
    
        return this._http.json<models.IResponse>({
            method: method,
            url: url,
            data: data
        }).then((success) => {
            return success.response.data;
        }, (error) => {
            throw error.response.message;
        });
    }
}

export = BaseService;
