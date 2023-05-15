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

helpers.gradeSel = async (grade) => {
  if (grade === '1') {
    const sgrade = 'first';
    return sgrade;
  } else if (grade === '2') {
    const sgrade = 'second';
    return sgrade;
  } else if (grade === '3') {
    const sgrade = 'third';
    return sgrade;
  }
}

helpers.schoolSel = async (id, school, fname, lname, grade, group, cicle) => {
  let sduser;
  if (school === 'school_01') {
    const sgrade = await helpers.gradeSel(grade);
    sduser = await process.env.DB_SCH01 + '.' + sgrade;
  } else if (school === 'school_02') {
    const sgrade = await helpers.gradeSel(grade);
    sduser = await process.env.DB_SCH02 + '.' + sgrade;
  } else {
    return res.status(500).json({ message: 'Error en el servidor' });
  }
  const suser = {
    id,
    fname,
    lname,
    grade,
    group,
    cicle
  }
  
  return [sduser, suser];
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