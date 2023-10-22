"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolixApi = exports.ParamType = void 0;

var node_fetch_1 = require("node-fetch");
var crypto_1 = require("crypto");
var ParamType;
(function (ParamType) {
    ParamType["LoadConfiguration"] = "4";
})(ParamType = exports.ParamType || (exports.ParamType = {}));
var SolixApi = /** @class */ (function () {
    function SolixApi(options) {
        var _a;
        this.SERVER_PUBLIC_KEY = "04c5c00c4f8d1197cc7c3167c52bf7acb054d722f0ef08dcd7e0883236e0d72a3868d9750cb47fa4619248f3d83f0f662671dadc6e2d31c2f41db0161651c7c076";
        this.ecdh = (0, crypto_1.createECDH)("prime256v1");
        this.username = options.username;
        this.password = options.password;
        this.logger = (_a = options.logger) !== null && _a !== void 0 ? _a : console;
        this.country = options.country.toUpperCase();
        this.timezone = this.getTimezoneGMTString();
        this.ecdh.generateKeys();
    }
    SolixApi.prototype.md5 = function (s) {
        this.logger.log(s);
        return (0, crypto_1.createHash)("md5").update(Buffer.from(s)).digest("hex");
    };
    SolixApi.prototype.getTimezoneGMTString = function () {
        var tzo = -new Date().getTimezoneOffset();
        var dif = tzo >= 0 ? "+" : "-";
        return "GMT".concat(dif).concat(this.pad(tzo / 60), ":").concat(this.pad(tzo % 60));
    };
    SolixApi.prototype.pad = function (num) {
        var norm = Math.floor(Math.abs(num));
        return "".concat((norm < 10 ? "0" : "")).concat(norm);
    };
    SolixApi.prototype.encryptAPIData = function (data, key) {
        var cipher = (0, crypto_1.createCipheriv)("aes-256-cbc", key, key.slice(0, 16));
        return (cipher.update(data, "utf8", "base64") +
            cipher.final("base64"));
    };
    SolixApi.prototype.fetch = function (endpoint, data, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var urlBuilder, url;
            var _a;
            return __generator(this, function (_b) {
//                this.logger.log(JSON.stringify(data));
                urlBuilder = new URL(endpoint, "https://ankerpower-api-eu.anker.com");
                url = urlBuilder.href;
                return [2 /*return*/, (0, node_fetch_1.default)(url, {
                        method: "POST",
                        body: data != null ? JSON.stringify(data) : undefined,
                        headers: __assign((_a = {}, _a["Content-Type"] = "application/json", _a.Country = this.country, _a.Timezone = this.timezone, _a["Model-Type"] = "DESKTOP", _a["App-Name"] = "anker_power", _a["Os-Type"] = "android", _a), headers),
                    })];
            });
        });
    };
    SolixApi.prototype.withLogin = function (login) {
        var _a;
        var _this = this;
        var headers = (_a = {}, _a["X-Auth-Token"] = login.auth_token, _a["gtoken"] = this.md5(login.user_id), _a);
        var authFetch = function (endpoint, data) { return __awaiter(_this, void 0, Promise, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch(endpoint, data, headers)];
                    case 1:
                        response = _a.sent();
                        const fct = response.json;
                        response.json = function () {
                            if(this.status !== 200) {
                                this.text().then(function(b) {console.error('Remote Response Error',b);}); 
                            } else {
                                return fct.apply(response, arguments);
                            }
                        }
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        return {
            getRelateAndBindDevices: function () { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = {};
                    return [2 /*return*/, authFetch("/power_service/v1/app/get_relate_and_bind_devices", data)];
                });
            }); },
            getUserMqttInfo: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, authFetch("/app/devicemanage/get_user_mqtt_info")];
                });
            }); },
            siteHomepage: function () { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = {};
                    return [2 /*return*/, authFetch("/power_service/v1/site/get_site_homepage", data)];
                });
            }); },
            getHomeLoadChart: function (_a) {
                var siteId = _a.siteId, _b = _a.deviceSn, deviceSn = _b === void 0 ? "" : _b;
                return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_c) {
                        data = { site_id: siteId, device_sn: deviceSn };
                        return [2 /*return*/, authFetch("/power_service/v1/site/get_home_load_chart", data)];
                    });
                });
            },
            scenInfo: function (siteId) { return __awaiter(_this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    data = { site_id: siteId };
                    return [2 /*return*/, authFetch("/power_service/v1/site/get_scen_info", data)];
                });
            }); },
            energyAnalysis: function (_a) {
                var siteId = _a.siteId, deviceSn = _a.deviceSn, type = _a.type, _b = _a.startTime, startTime = _b === void 0 ? new Date() : _b, endTime = _a.endTime, _c = _a.deviceType, deviceType = _c === void 0 ? "solar_production" : _c;
                return __awaiter(_this, void 0, void 0, function () {
                    var startTimeString, endTimeString, data;
                    return __generator(this, function (_d) {
                        startTimeString = "".concat(startTime.getUTCFullYear(), "-").concat(this.pad(startTime.getUTCMonth()), "-").concat(this.pad(startTime.getUTCDate()));
                        endTimeString = endTime != null ? "".concat(endTime.getUTCFullYear(), "-").concat(endTime.getUTCMonth(), "-").concat(endTime.getUTCDate()) : "";
                        data = {
                            site_id: siteId,
                            device_sn: deviceSn,
                            type: type,
                            start_time: startTimeString,
                            device_type: deviceType,
                            end_time: endTimeString,
                        };
                        return [2 /*return*/, authFetch("/power_service/v1/site/energy_analysis", data)];
                    });
                });
            },
            getSiteDeviceParam: function (_a) {  
                var paramType = _a.paramType, siteId = _a.siteId;
                return __awaiter(_this, void 0, Promise, function () {
                    var data, response;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                data = { site_id: siteId, param_type: paramType };
                                return [4 /*yield*/, authFetch("/power_service/v1/site/get_site_device_param", data)];
                            case 1:
                                response = _b.sent();
                                if (response.data != null) {
                                    switch (paramType) {
                                        case ParamType.LoadConfiguration:
                                            return [2 /*return*/, __assign(__assign({}, response), { data: { param_data: JSON.parse(response.data.param_data) } })];
                                        default:
                                            return [2 /*return*/, response];
                                    }
                                }
                                return [2 /*return*/, response];
                        }
                    });
                });
            },
            setSiteDeviceParam: function (_a) {
                var paramType = _a.paramType, siteId = _a.siteId, _b = _a.cmd, cmd = _b === void 0 ? 17 : _b, // Unknown what this means but it's alway 17
                paramData = _a.paramData;
                return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_c) {
                        data = { site_id: siteId, param_type: paramType, cmd: cmd, param_data: paramData };
                        switch (paramType) {
                            case ParamType.LoadConfiguration:
                                data = __assign(__assign({}, data), { param_data: JSON.stringify(paramData) });
                                break;
                            default:
                            // Should be a string already
                        }
                        return [2 /*return*/, authFetch("/power_service/v1/site/set_site_device_param", data)];
                    });
                });
            },
        };
    };
    SolixApi.prototype.login = function () {
        return __awaiter(this, void 0, Promise, function () {
            var data, response, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        data = {
                            ab: this.country,
                            client_secret_info: {
                                public_key: this.ecdh.getPublicKey("hex"),
                            },
                            enc: 0,
                            email: this.username,
                            password: this.encryptAPIData(this.password, this.ecdh.computeSecret(Buffer.from(this.SERVER_PUBLIC_KEY, "hex"))),
                            time_zone: new Date().getTimezoneOffset() !== 0 ? -new Date().getTimezoneOffset() * 60 * 1000 : 0,
                            transaction: "".concat(new Date().getTime()),
                        };
                        return [4 /*yield*/, this.fetch("/passport/login", data)];
                    case 1:
                        response = _d.sent();
                        if (!(response.status === 200)) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _d.sent()];
                    case 3:
                        _a = Error.bind;
                        _c = (_b = "Login failed (".concat(response.status, "): ")).concat;
                        return [4 /*yield*/, response.text()];
                    case 4: throw new (_a.apply(Error, [void 0, _c.apply(_b, [_d.sent()])]))();
                }
            });
        });
    };
    return SolixApi;
}());
exports.SolixApi = SolixApi;

