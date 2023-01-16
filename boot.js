const Traits = require("./dict_trait/traits");

module.exports = async (rWit, indexChat) => {
  let bootRes = `Me encantaría entender más sobre "${rWit["text"]}"`;
  let resJson = {};
  let randomIndex = 0;
  let nameTrait = "";
  let countRes = 0;
  let LcTraits = await Traits();
  for(var i=0; rWit["traits"].length>i;i++){
    nameTrait = rWit["traits"][i];
    if(LcTraits[nameTrait]){
      for(let u=0; rWit["wit"]["traits"][nameTrait].length>u;u++){
        resJson = LcTraits[nameTrait][rWit["wit"]["traits"][nameTrait][u]["value"]];
        countRes = Object.keys(resJson).length;
        randomIndex = Math.floor(Math.random()* countRes);
      }
    }
  }
  if(countRes !== 0){
    if(indexChat===0&&nameTrait!=="trato_saludo_despido"){
      if(countRes===1){
        bootRes = `Hola, ${resJson['dialog0']}`;
      }else{
        bootRes = `Hola, ${resJson[`dialog${randomIndex}`]}`;
      }
    }else{
      if(countRes===1){
        bootRes = resJson['dialog0'];
      }else{
        bootRes = resJson[`dialog${randomIndex}`];
      }
    }
  }
  
  return bootRes;
}