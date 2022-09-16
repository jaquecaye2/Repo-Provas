"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validateSchema_1 = require("../middlewares/validateSchema");
const userSchema_1 = __importDefault(require("../schemas/userSchema"));
const router = (0, express_1.Router)();
router.post("/signup", (0, validateSchema_1.validateSchema)(userSchema_1.default), authController_1.signup);
router.post("/signin", (0, validateSchema_1.validateSchema)(userSchema_1.default), authController_1.signin);
exports.default = router;
