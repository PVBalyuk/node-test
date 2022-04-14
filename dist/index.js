"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get('/', function (req, res) {
    res.send('Hello 123 123');
});
app.listen(3000, function () { return console.log('server running at port'); });
//# sourceMappingURL=index.js.map