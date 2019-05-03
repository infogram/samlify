"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var xmllint = require("node-xmllint");
var getValidatorModule = function () { return __awaiter(_this, void 0, void 0, function () {
    var schemaPath, xsd, schemaProto, schemaAssert, schemaXmldsig, schemaXenc;
    return __generator(this, function (_a) {
        schemaPath = function (schema) { return path.resolve(__dirname, "../schemas/" + schema); };
        xsd = 'saml-schema-protocol-2.0.xsd';
        schemaProto = fs.readFileSync(schemaPath(xsd), 'utf-8');
        schemaAssert = fs.readFileSync(schemaPath('saml-schema-assertion-2.0.xsd'), 'utf-8');
        schemaXmldsig = fs.readFileSync(schemaPath('xmldsig-core-schema.xsd'), 'utf-8');
        schemaXenc = fs.readFileSync(schemaPath('xenc-schema.xsd'), 'utf-8');
        // file fix for virtual filesystem of emscripten
        schemaProto = schemaProto.replace('saml-schema-assertion-2.0.xsd', 'file_0.xsd');
        schemaProto = schemaProto.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
        schemaAssert = schemaAssert.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
        schemaAssert = schemaAssert.replace('xenc-schema.xsd', 'file_2.xsd');
        schemaXenc = schemaXenc.replace('xmldsig-core-schema.xsd', 'file_1.xsd');
        return [2 /*return*/, {
                validate: function (xml) {
                    return new Promise(function (resolve, reject) {
                        var validationResult = xmllint.validateXML({
                            xml: xml,
                            schema: [schemaAssert, schemaXmldsig, schemaXenc, schemaProto]
                        });
                        if (!validationResult.errors) {
                            return resolve('SUCCESS_VALIDATE_XML');
                        }
                        console.error("this is not a valid saml response with errors: " + validationResult.errors);
                        return reject('ERR_EXCEPTION_VALIDATE_XML');
                    });
                }
            }];
    });
}); };
exports.getValidatorModule = getValidatorModule;
//# sourceMappingURL=schema-validator.js.map