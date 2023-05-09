const bcrypt = require('bcryptjs');
const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: 'Error en el servidor' });
  }
}

helpers.isAuthenticated = (req, res, next) => {
  const token = req.cookies['myAppToken'];
  console.log("este deberia ser el token", token);
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  } else {
    console.log(token);
  }
  next();
};

module.exports = helpers;