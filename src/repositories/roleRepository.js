const {pool} = require("../config/dbconfig.js")

const insertUserRole = (data) => {
    const queryInsertUserRole = `insert into tbl_user_role (id,user_id,role_id,created_on,created_by) 
                            values ($1,$2,$3,now(),1)`
    return pool.query(queryInsertUserRole, [
        data.idUserRole,
        data.idUser,
        data.roleId,
    ]) 
}

const findRoleById = (data) => {
    const cekDuplicateRole = `select id 
                              from tbl_role tr 
                              where tr.id = $1`
    return pool.query(cekDuplicateRole, [
        data.roleId
    ])
} 

const getRoleByUserId = (data) => {
    const getRoleByUserId = `select role_name as role
                        from tbl_role tr
                        join tbl_user_role tur on tr.id = tur.role_id 
                        where tur.user_id = $1`

    return pool.query(getRoleByUserId, [
        data.id
    ])
}

module.exports = {
    insertUserRole,
    findRoleById,
    getRoleByUserId
}