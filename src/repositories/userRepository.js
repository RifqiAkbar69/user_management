const { pool } = require("../config/dbconfig.js")

const find = () => {
    const queryCek = `select * from tbl_user `
    return pool.query(queryCek)
}

const createUser = (data) => {
    const queryReg = `insert into tbl_user (id,name,phone,address,created_by,created_at,password,email)
                      values ($1,$2,$3,$4,$5,now(),$6,$7)`
    return pool.query(queryReg, [
        data.id,
        data.name,
        data.phone,
        data.address,
        data.createdBy,
        data.password,
        data.email
    ])
}

const findUserByPhone = (phone) => {
    const queryCek = `select id,phone, email, password from tbl_user where phone = $1`
    return pool.query(queryCek, [phone])
}

const editUser = (data) => {
    const queryEdit = `update tbl_user 
                       set name = $1,
                       address = $2,
                       email = $3
                       where id = $4`

    return pool.query(queryEdit, [
        data.name,
        data.address,
        data.email,
        data.id,
    ])
}

const getUserById = (data) => {
    const queryGetUserById = `select id,name,phone,address,email
                              from tbl_user tu
                              where tu.id = $1`
    
    return pool.query(queryGetUserById, [
        data.id
    ])
}


module.exports = {
    find,
    createUser,
    findUserByPhone,
    editUser,
    getUserById
}
