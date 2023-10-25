const userRepository = require("../repositories/userRepository.js")
const roleRepository = require("../repositories/roleRepository.js")
const { use, param } = require("../route/auth.js")
const uuId = require("uuid")


const getAllUsers = async (req, res) => {
    try {
        const data = await userRepository.find()

        console.log(data.rows)
        res.status(200).send({
            items: data.rows,
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            error: "Terjadi Error"
        })

    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params
        //todo get user by id and get role
        const params = {
            id: id
        }
        const dataUserById = await userRepository.getUserById(params)
        if (dataUserById.rowCount == 0) {
            return res.status(201).send({
                message: " Data not found"
            })
        }
        const data = dataUserById.rows[0]
        data.role = []
        const getRoleByUserId = await roleRepository.getRoleByUserId(params)
        if (getRoleByUserId.rowCount > 0) {
            data.role = getRoleByUserId.rows
        }
        return res.status(200).send({
            message: "Berhasil Get User",
            data: data
        })
    }
    catch (error) {
        return res.status(500).send({
            error: "Terjadi Error"
        })
    }

}

const editRoleUser = async (req, res) => {
    try {
        const { name, address, email, role } = req.body
        const { id } = req.params

        //todo edit tbl_user
        const params = {
            name: name,
            address: address,
            email: email,
            id: id,
        }
        await userRepository.editUser(params)

        //todo insert to tbl_user_role
        for (let i = 0; i < role.length; i++) {
            const paramsRole = {
                idUserRole: uuId.v4(),
                idUser: id,
                roleId: role[i]
            }
            const resFindRole = await roleRepository.findRoleById(paramsRole)
            if (resFindRole.rowCount == 0) {
                return res.status(404).send({
                    message: "Id Role Salah"
                })
            }
            await roleRepository.insertUserRole(paramsRole)
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            error: "Terjadi Error"
        })
    }
    return res.status(200).send({
        message: "Berhasil Edit"
    })
}

module.exports = {
    getAllUsers,
    editRoleUser,
    getUserById
}


