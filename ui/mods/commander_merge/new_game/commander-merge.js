var legionCommanders = [  "/pa/units/commanders/l_overwatch/l_overwatch.json",
"/pa/units/commanders/l_cyclops/l_cyclops.json",
"/pa/units/commanders/l_cataphract/l_cataphract.json",
"/pa/units/commanders/l_raptor/l_raptor.json",
"/pa/units/commanders/l_quad/l_quad.json",
"/pa/units/commanders/l_tank/l_tank.json"]
var bugCommanders = ["/pa/units/commanders/bug_commander/bug_commander.json"]

var replicateCommanders = ["/pa/units/commanders/replicate_commander_1/replicate_commander_1.json"]

var exileCommanders = ["/pa/units/commanders/exiles_blueberry/union_formidable.json",
  "/pa/units/commanders/exiles_maxim/exiles_maxim.json"
]

//matches mod identifiers with commanders to add to the list
var modCommanders = {
    "com.pa.ferretmaster.bugs": bugCommanders,
    "com.pa.ferretmaster.bugs-dev": bugCommanders,
    "com.pa.legion-expansion-server": legionCommanders,
    "com.pa.legion-expansion-server-dev": legionCommanders,
    "pa.mla.unit.replicate": replicateCommanders,
    "com.pa.nik.exiles":exileCommanders,
    "com.pa.nik.exiles_dev":exileCommanders,
    "com.pa.assimilation-expansion-server": ["/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json","/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json"],
    "com.pa.ferretmaster.scenario-server-local":["/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json","/pa/units/commanders/scenario_invincible_com/scenario_invincible_com.json"],
    "com.pa.ferretmaster.scenario-server":["/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json"]
}

commandersToRemove = [
"/pa/units/commanders/exiles_blueberry/union_formidable.json",
"/pa/units/commanders/replicate_commander_1/replicate_commander_1.json",
"/pa/units/commanders/bug_commander/bug_commander.json",
"/pa/units/commanders/l_overwatch/l_overwatch.json",
"/pa/units/commanders/l_cyclops/l_cyclops.json",
"/pa/units/commanders/l_cataphract/l_cataphract.json",
"/pa/units/commanders/l_raptor/l_raptor.json",
"/pa/units/commanders/l_quad/l_quad.json",
"/pa/units/commanders/l_tank/l_tank.json",
"/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json",
"/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json",
"/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json"
]

commanderImageMap = {
  "/pa/units/commanders/exiles_blueberry/union_formidable.json": "coui://pa/units/commanders/exiles_blueberry/profile_union_formidable.png",
  "/pa/units/commanders/replicate_commander_1/replicate_commander_1.json":"coui://pa/units/commanders/replicate_commander_1/profile_rep_1.png",
  "/pa/units/commanders/bug_commander/bug_commander.json":"coui://pa/units/commanders/bug_commander/profile_bug.png",
  "/pa/units/commanders/l_cataphract/l_cataphract.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_cataphract.png",
  "/pa/units/commanders/l_raptor/l_raptor.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_raptor.png",
  "/pa/units/commanders/l_quad/l_quad.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_quad.png",
  "/pa/units/commanders/l_tank/l_tank.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_tank.png",
  "/pa/units/commanders/l_overwatch/l_overwatch.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_overwatch.png",
  "/pa/units/commanders/l_cyclops/l_cyclops.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_cyclops.png", 
  "/pa/units/commanders/l_wasushi/l_wasushi.json":"coui://ui/main/shared/img/commanders/profiles/profile_l_wasushi.png",
  "/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json":"coui://ui/main/shared/img/commanders/profiles/profile_quad_not_armalisk.png",
  "/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json":"coui://ui/main/shared/img/commanders/profiles/profile_quad_donut_duke.png",
  "/pa/units/commanders/scenario_ai_invincible_com/scenario_ai_invincible_com.json":"coui://pa/units/commanders/scenario_ai_invincible_com/profile_bug.png"
}

_.defer(function () {
var modsPromise = api.mods.getMounted("server",true)// grabbing the list of mounted mods

modsPromise.then(function(result){ // setting which commanders to add
  var commandersToKeep = [];
  var bugsEnabled = false;
  for(modIndex in result){
    var modObject =  result[modIndex];
    if(modObject.identifier == "com.pa.ferretmaster.bugs" || modObject.identifier == "com.pa.ferretmaster.bugs-dev"){bugsEnabled = true}
    if(modCommanders[modObject.identifier] !== undefined){
      commandersToKeep = commandersToKeep.concat(modCommanders[modObject.identifier]);
    }
  }
  if(bugsEnabled){model.localChatMessage(loc("Bug Faction"),loc("To play as the Bugs select one of the green Commanders."))}
  commandersToRemove = _.difference(commandersToRemove,commandersToKeep);
  for(comIndex in commandersToRemove){
    var commanderImage = commanderImageMap[commandersToRemove[comIndex]];
  
    if(commanderImage !== undefined){

      _.delay(wipeCommanderFromList,500,commanderImage)

      
    }
  }

})

})
function wipeCommanderFromList(commanderImage){
  $('img[src="'+commanderImage+'"]').parent().remove()
}






