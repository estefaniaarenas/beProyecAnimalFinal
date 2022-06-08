const mascotaCtrl = {};
const mascotaModels = require("../models/mascotas.models");
const usuariosModels= require('../models/usuarios.models')


mascotaCtrl.crearMascota = async (req, res) => {
  const { nombre,especie,sexo,raza,estadoDeEsterilizacion,estadoDeVacunacion,descripcionDeLaMascota,fechaDeNacimiento,user_id  } = req.body;
  const nuevaMascota = new mascotaModels({
        nombre,
        especie,
        sexo,
        raza,
        estadoDeEsterilizacion,
        estadoDeVacunacion,
        descripcionDeLaMascota,
        fechaDeNacimiento,
        idDelRescatista: user_id,
  });
   nuevaMascota.save()
     const {mascotasRegistradas} = await usuariosModels.findOne({_id:user_id});
     console.log(mascotasRegistradas);
    await usuariosModels.findByIdAndUpdate({_id:user_id},({mascotasRegistradas:mascotasRegistradas+1}))
    res.json({mensaje: "Tú mascota ha sido registrada"});
    
    
  // const respuesta = await nuevaMascota.save();
  // res.json({
  //   mensaje: "mascota creada",
  //   respuesta,
  // });
};
mascotaCtrl.listar = async (req, res) => {
  const respuesta = await mascotaModels.find();
  res.json(respuesta);
};
mascotaCtrl.actualizarMascota = async (req, res) => {
  const id = req.params.id;
  await mascotaModels.findByIdAndUpdate({ _id: id }, req.body);
  const respuesta = await mascotaModels.findById({ _id: id });
  res.json({
    mensaje: "Mascota actualizada",
    respuesta,
  });
};
mascotaCtrl.eliminarMascota = async (req, res) => {
  const id = req.params.id;
  await mascotaModels.findByIdAndRemove({ _id: id });
  res.json({
    mensaje: "Mascota eliminada",
  });
};
mascotaCtrl.buscarPorCoincidencia = async (req, res) => {
  const { especie } = req.params;
  const respuesta = await mascotaModels.find({
    especie: { $regex: "^" + especie, $options: "i" },
  });
  res.json(respuesta);
};
module.exports = mascotaCtrl;
