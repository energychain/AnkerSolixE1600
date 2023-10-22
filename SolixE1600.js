const API = require("./SolixAPI.js");

class SolixE1600 {

    /**
     * Initializes a new instance of the constructor function.
     *
     * @param {Object} config - The configuration object for the constructor.
     * @param {string} config.country - The country code. (optional)
     * @param {string} config.username - The username. (mandatory)
     * @param {string} config.password - The password. (mandatory)
     * @param {Object} config.logger - The logger object. (optional)
     * @throws {Error} Throws an error if username is not provided.
     * @throws {Error} Throws an error if password is not provided.
     */
    constructor(config) {
      if((typeof config.country == 'undefined') || (config.country == null)) {
        config.country = 'DE';
      }
      if((typeof config.username == 'undefined') || (config.password == null)) {
        throw new Error("No username provided");
      }
      if((typeof config.password == 'undefined') || (config.password == null)) {
        throw new Error("No password provided");
      }
      if(typeof config.logger == 'undefined') {
        config.logger = null;
      }
      this.config = config;
      this.api = new API.SolixApi(config);
    }
  
    /**
     * Initializes the instance
     *
     * @return {void}
     */
    async _init() {
        if((typeof this.loginCredentials == 'undefined')||(this.loginCredentials == null)) {
            this.loginCredentials = (await this.api.login()).data;
        }
        if(typeof this.apiSession == 'undefined') {
            try {
                this.apiSession = this.api.withLogin(this.loginCredentials);
            } catch(e) {
                throw new Error("Login failed");
            }
        }
        return;
    }

    /**
     * Retrieves the site ID for a given site.
     *
     * @param {string|number} site - The site ID or name.
     * @return {string} The site ID.
     */
    async _getSiteId(site) {
        await this._init();
        const sites = await this.getSites();
        if(typeof site == 'string') {
            for(let i=0;i<sites.length;i++) {
                if(site[i].site_id == site) {
                    site = i;
                    break;
                }
            }
        } 
        let site_idx = site;
        if((typeof site_idx == 'undefined')||(site_idx==null)||(isNaN(site_idx))) {
            site_idx = 0;
        }

        if(sites.length < site_idx+1) {
            throw new Error("site out of range. Expected < "+(sites.length-1)+" or valid site_id");
        }
        return sites[site_idx].site_id;
    }

    /**
     * Retrieves the session configuration.
     *
     * @return {Object} The session configuration.
     */
    getSessionConfiguration() {
      return this.config;
    }
  
    /**
     * Retrieves the list of sites.
     *
     * @return {Array} The list of sites.
     */
    async getSites() {
       const sites = await this.getSitehomepage();
       return sites.site_list;
    }
    
    /**
     * Retrieves the site homepage from the API.
     *
     * @return {Promise} A Promise that resolves to the site homepage (account overview) data.
     */
    async getSitehomepage() {
        await this._init();
        const sites = await this.apiSession.siteHomepage();
        return sites.data;
     }

    /**
     * Retrieves the schedule for the specified site.
     * sample: `{"ranges":[{"id":0,"start_time":"00:00","end_time":"01:00","turn_on":false,"appliance_loads":[{"id":0,"name":"Benutzerdefiniert","power":200,"number":1}]},{"id":0,"start_time":"01:00","end_time":"02:00","turn_on":true,"appliance_loads":[{"id":0,"name":"Benutzerdefiniert","power":350,"number":1}]},{"id":0,"start_time":"02:00","end_time":"24:00","turn_on":false,"appliance_loads":[{"id":0,"name":"Benutzerdefiniert","power":200,"number":1}]}],"min_load":150,"max_load":800,"step":50}`
     *
     * @param {string} site - The site identifier or site index. If not provided, the first site is used.
     * @return {Promise<any>} - The schedule data.
     */
    async getSchedule(site) {
        const device = {
            siteId:await this._getSiteId(site),
            paramType:"4"
        }

        const deviceParams = await this.apiSession.getSiteDeviceParam(device);
        return deviceParams.data.param_data;
    }
  
    /**
     * Sets the schedule for a specific site.
     * sample: `{"ranges":[{"id":0,"start_time":"00:00","end_time":"01:00","turn_on":false,"appliance_loads":[{"id":0,"name":"Benutzerdefiniert","power":200,"number":1}]},{"id":0,"start_time":"01:00","end_time":"02:00","turn_on":true,"appliance_loads":[{"id":0,"name":"Benutzerdefiniert","power":350,"number":1}]},{"id":0,"start_time":"02:00","end_time":"24:00","turn_on":false,"appliance_loads":[{"id":0,"name":"Benutzerdefiniert","power":200,"number":1}]}],"min_load":150,"max_load":800,"step":50}`
     * 
     * @param {Object} schedule - The schedule to set.
     * @param {string} site - The site for which the schedule should be set. If not provided, the first site is used.
     * @return {Promise<any>} - A promise that resolves with the response from setting the schedule.
     */
    async setSchedule(schedule, site) {
        const deviceN = {
            siteId:await this._getSiteId(site),
            paramType:"4",
            cmd: 17,
            paramData:schedule
        }
        const setResponse = await this.apiSession.setSiteDeviceParam(deviceN);
        return setResponse;
    }
  }
  
  module.exports = SolixE1600;