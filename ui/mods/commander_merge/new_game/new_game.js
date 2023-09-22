var bugCommanders = [
    "/pa/units/commanders/bug_commander/bug_commander.json"
   
];

var assimCommanders = [
    "/pa/units/assimilation/commanders/a_not_armalisk/a_not_armalisk.json",
    "/pa/units/assimilation/commanders/a_quad_donut_duke/a_quad_donut_duke.json"
]

var taoArmCommanders = ["/pa/units/commanders/arm_commander/arm_commander.json",]

var taoCoreCommanders = ["/pa/units/commanders/core_commander/core_commander.json",]

var legion = {};

legion.commanders = [
  "/pa/units/commanders/l_rockteeth/l_rockteeth.json",
  "/pa/units/commanders/l_overwatch/l_overwatch.json",
  "/pa/units/commanders/l_cyclops/l_cyclops.json",
  "/pa/units/commanders/l_wasushi/l_wasushi.json",
];


  
  //bugs commander picker colouring
  loadCSS(
    "coui://ui/mods/commander_merge/css/faction_commander_picker.css"
  );

  model.isTaoArm = function(commander) {

    return _.includes(taoArmCommanders, commander);
  };

  model.isTaoCore = function(commander) {

    return _.includes(taoCoreCommanders, commander);
  }

  model.isBugs = function (commander) {

    return _.includes(bugCommanders, commander);
  };

  model.isLegion = function (commander) {

    return _.includes(legion.commanders, commander);
  };

  model.isAssim = function (commander) {
    return _.includes(assimCommanders, commander);
  }

  model.isCustomFaction = function (commander) {
        return (model.isBugs(commander) || model.isLegion(commander) || model.isAssim(commander) || model.isTaoArm(commander) || model.isTaoCore(commander))
  }

   //Style Commander Picker
   $("#commander-picker .div-commander-picker-item.btn_std_ix").attr(
    "data-bind",
    "css: {bugsCommander: model.isBugs($data), legioncommander: model.isLegion($data), assimCommander: model.isAssim($data), coreCommander: model.isTaoCore($data), armCommander: model.isTaoArm($data)},  click: function () { model.setCommander($index()) }, click_sound: 'default', rollover_sound: 'default'"
  );
  $("#ai-commander-picker .div-commander-picker-item.btn_std_ix").attr(
    "data-bind",
    "css: {bugsCommander: model.isBugs($data), legioncommander: model.isLegion($data), assimCommander: model.isAssim($data), coreCommander: model.isTaoCore($data), armCommander: model.isTaoArm($data)}, click: function () { model.setAICommander(model.selectedAI(), $data) }, click_sound: 'default', rollover_sound: 'default'"
  );

  //Style Slot
  $(".slot-player").attr(
    "data-bind",
    "css: {armSlot: !$data.isEmpty() && model.isTaoArm($data.commander()),coreSlot: !$data.isEmpty() && model.isTaoCore($data.commander()),bugsSlot: !$data.isEmpty() && model.isBugs($data.commander()),assimSlot: !$data.isEmpty() && model.isAssim($data.commander()), mlaslot: !$data.isEmpty() && !model.isCustomFaction($data.commander()),legionslot: !$data.isEmpty() && model.isLegion($data.commander()), ready: isReady, loading: isLoading}"
  );

  _.defer(function () {
    model.localChatMessage(
      loc("Bug Faction"),
      loc("To play as the Bugs select one of the green Commanders.")
    );
  });