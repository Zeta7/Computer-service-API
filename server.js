const { App } = require('./App');
const { dataBase } = require('./utils/DataBase');

const { User } = require('./models/UserModel');
const { Repair } = require('./models/RepairModel');

//--------------------------------------------------------------------------//
dataBase
    .authenticate()
    .then(console.log('La base de datos se conecto correctamente'))
    .catch((error) => console.log(error));

// User.hasMany(Post, { foreignKey: 'userId' });
User.hasMany(Repair, { foreignKey: 'userId' });
Repair.belongsTo(User);

dataBase
    .sync()
    .then(console.log('se creo correctamente las tablas '))
    .catch((error) => console.log(error));
//--------------------------------------------------------------------------//

const PORT = process.env.PORT || 4000;
App.listen(PORT, () => {
    console.log('El servidor inicio correctamente');
});
