'use strict';


import {config} from "../../../config/config.js";
import app from "../app.module.js";

export default app.factory('GoogleApiService', ['$http', ($http) => {
    return {
        fonts: () => {
            return $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=' + config.googleApiKey);
        }
    };
}]);
