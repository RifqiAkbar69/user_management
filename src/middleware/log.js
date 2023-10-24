const logRequest = (req, res, next) => {
    console.log(req.method, req.url)
    console.log("ipaddress : " + req.ip );
    if (req.method == "GET") {
        console.log("query : " + req.query )
        console.log("path : " + req.params )
    }
    else if (req.method == "POST") {
        console.log("body : " + req.body )
    }

    next()
}

module.exports = logRequest
