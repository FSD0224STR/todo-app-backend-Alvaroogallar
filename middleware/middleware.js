const middlewarePatch = (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).json ({msg: "Missing parameter: id"})
    }
next ()
}

module.exports = { middlewarePatch}