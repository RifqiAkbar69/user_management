const userRepository = require("../repositories/userRepository.js")
const roleRepository = require("../repositories/roleRepository.js")
const jwt = require("../middleware/jwt.js")
const uuId = require("uuid")
const bcrypt = require("bcrypt")
const joi = require("joi")
const utils = require("../utils/validation.js")


const schemaValidation = joi.object({
    name: joi.string()
        .min(3)
        .max(30)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .required(),
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    address: joi.string(),
    phone: joi.string()
        .min(6)
        .max(15)
        .required(),
})

const register = async (req, res) => {
    try {
        //todo validasi body request
        const { phone, name, address, email, password } = req.body
        const isValid = utils.validate(schemaValidation, req.body)
        if (!isValid) {
            return res.status(400).send({
                message: "Request tidak valid"
            })
        }

        //todo validasi nomor telepon
        const resUser = await userRepository.findUserByPhone(phone)
        if (resUser.rowCount > 0) {
            return res.status(404).send({
                message: "Nomor sudah ada!",
            })
        }

        //todo create user 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const params = {
            id: uuId.v4(),
            name: name,
            phone: phone,
            address: address,
            email: email,
            password: hash,
            createdBy: ""
        }
        await userRepository.createUser(params)
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Terjadi error"
        })
    }

    return res.status(200).send({
        message: "Sukses ditambahkan",
    })
}


const schemaValidationLogin = joi.object({
    phone: joi.string()
        .min(6)
        .max(15)
        .required(),
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .min(8)
        .required(),

})

const login = async (req, res) => {
    //todo validasi body request
    const { phone, password } = req.body
    const isValid = utils.validate(schemaValidationLogin, req.body)
    if (!isValid) {
        return res.status(400).send({
            message: "Request tidak valid"
        })
    }

    //todo cek phone dengan db
    const resUser = await userRepository.findUserByPhone(phone)
    if (resUser.rowCount == 0) {
        return res.status(404).send({
            message: "Nomor tidak terdaftar",
        })
    }

    //todo cek password dengan db
    const isPassValid = bcrypt.compareSync(password, resUser.rows[0].password);
    if (!isPassValid) {
        return res.status(401).send ({
            message: "Password salah"
        })
    }

    //todo generate jwttoken
    const reqRole = {
        id: resUser.rows[0].id
    }
    const resRole = await roleRepository.getRoleByUserId(reqRole)
    const token = await jwt.generateToken({
        id: resUser.rows[0].id,
        phone: phone,
        email: resUser.rows[0].email,
        role: resRole.rows
    })
    if (token == "") {
        return res.status(401).send({
            message: "token gagal"
        })
    }

    //set token jwt to header
    res.setHeader("jwt-token", token)

    return res.status(200).send({
        message: "Berhasil Login"
    })


}

module.exports = {
    login,
    register
}