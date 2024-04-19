const { userModel } = require("../models/users.model");



async function getUser (req, res) {
    userModel.find ()
    .then(userDoc =>{
        console.log('this is the user', userDoc)
        res.status(200).json(userDoc[0])
    })
    .catch(error => {
        console.log('Error while getting user', error)
        res.status(400).json(error)
    })
}

async function logUser (req, res) {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email usando Mongoose
        const user = await userModel.findOne({ email: email });
        console.log ('el usuario es:', user)

        if (!user) {
            // Si no se encuentra el usuario, devolver un error 404
            return res.status(404).json({ msg: 'User not found' });
        }

        console.log('Password provided:', password);
        console.log('Password stored:', user.password);

        // Verificar que la contraseña proporcionada coincida con la almacenada
        if (password !== user.password) {
            // Si la contraseña no coincide, devolver un error 403
            return res.status(403).json({ msg: 'Forbidden' });
            
        }

        // Si el email y la contraseña coinciden, devolver un mensaje de éxito
        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        // En caso de cualquier otro error, devolver un error 500
        console.log ('ha habido un error',error)
        res.status(500).json({ error: 'Error del servidor' });
    }
}

module.exports = {getUser, logUser}