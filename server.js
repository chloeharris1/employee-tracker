const {bannerPrompt} = require("./prompts/banner")
const prompts = require("./prompts/prompts")
const mysql = require('mysql2')



bannerPrompt()

prompts.start()