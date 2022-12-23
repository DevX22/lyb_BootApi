const Traits = require("./dict_trait/traits");

module.exports = async (rWit) => {
  let bootRes = "Disculpe aun no puedo procesar esa petición";
  let LcTraits = await Traits;
  for(var i=0; rWit["traits"].length>i;i++){
    let nameTrait = rWit["traits"][i];
    if(LcTraits[nameTrait]){
      for(let u=0; rWit["wit"]["traits"][nameTrait].length>u;u++){
        bootRes = LcTraits[nameTrait][rWit["wit"]["traits"][nameTrait][u]["value"]];
        console.log(bootRes);
      }
    }
  }
  return bootRes;
}