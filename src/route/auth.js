var express = require("express");
const router = express.Router()

// TODO :
// 1. buat endpoint untuk login (auth/login)
// - gunakan bcrypt verify untuk cek password 
// - jika berhasil login implementasi jwt (library jsonwebtoken)
// 2. buat endpoint untuk register (auth/register)
// - encrypt password menggunakan library bcrypt
// - validasi nomor telepon tidak pernah digunakan    

var authService = require ("../services/authService.js")

router.post('/register',authService.register)
router.post('/login',authService.login)

module.exports = router
