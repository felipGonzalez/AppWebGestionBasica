const MessageError = {
    duplicate: "!Upss, ese rol ya esta registrado, intenta con otro nombre",
    dataInvalid: "Hay un problema con los datos ingresados",
    dataAdmin: "Los valores del admin estan por de",
    invalidEmail: "Tu usuario no esta registrado",
    invalidPassword: "Ups! Contraseña Incorrecta",
    userStatus: "Tu usuario esta desactivado. Contacta con tu administrador para mayor información",
    notDataRole: "No existen Roles registrados, Por favor agregue un rol en la opcion de Roles -> Nuevo",
    notDeleteUser: "No se puede eliminar el usuario debido a que esta asociado con otros registros"
}

const Actions = {
    initSession: "Inicio sesion",
    closeSession:"Cerro sesion",
    createUser:"crear usuario",
    updateUser:"editar usuario",
    deleteUser:"eliminar usuario",
    createRole:"crear rol",
    updateRole:"editar rol",
    deleteRole:"eliminar rol"    
}


module.exports = {MessageError, Actions};
