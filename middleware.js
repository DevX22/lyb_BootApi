const { Wit, log } = require("node-wit");

const witClient = new Wit({
  accessToken:"2TS2B3LXJQWS5FQAPAELJA3V6HRFJPIY",
  logger: new log.Logger(log.DEBUG)
})

module.exports = async(msg) => {
  let response = await witClient.message(msg);
  let witTraits = [];
  let witIntents = [];
  let witEntities = [];

  for(let t in response["traits"]){
    witTraits.push(t);
  }

  witIntents = response["intents"].map(n=>n["name"]);

  for(let e in response.entities){
    let confi = response.entities[`${e}`][0]["confidence"];
    let nameE = response.entities[`${e}`][0]["name"];
    witEntities.push({name:`${nameE}`,confidence:confi});
  }
  witEntities.sort((o1,o2)=>{
    if(o1.confidence>o2.confidence){
      return -1;
    }else if(o1.confidence<o2.confidence){
      return 1;
    }else{
      return 0;
    }
  });
  if(JSON.stringify(response.entities)=='{}'){
    witEntities=[{name:"null"}]
  }
  return {
    "text":response.text,
    "traits":witTraits,
    "intents":witIntents,
    "entities":witEntities[0]["name"],
    "wit": response
  }
};