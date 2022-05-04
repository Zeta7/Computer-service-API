const { dataBase } = require('./utils/DataBase');
const { App } = require('./App');

//--------------------------------------------------------------------------//
dataBase
    .authenticate()
    .then(console.log('La base de datos se conecto correctamente'))
    .catch((error) => console.log(error));

dataBase
    .sync()
    .then(console.log('se creo correctamente las tablas '))
    .catch((error) => console.log(error));
//--------------------------------------------------------------------------//

const PORT = 6000;
App.listen(PORT, () => {
    console.log('El servidor inicio correctamente');
});
