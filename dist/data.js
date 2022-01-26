var compsList = {
  //rare
  "Superior long bone": {
    type: "rare",
    qty: 0,
  },
  "Tribal fin": {
    type: "rare",
    qty: 0,
  },
  "Volanic Fragments": {
    type: "rare",
    qty: 0,
  },
  "Dragon Mattock": {
    type: "rare",
    qty: 0,
  },
  //eggs
  "Arcane apoterrasaur (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Scimitops (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Bagrada rex (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Asciatops (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Corbicula rex (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Spicati apoterrasaur (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Oculi apoterrasaur (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Malletops (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  "Pavosaurus rex (unchecked)": {
    type: "eggs",
    qty: 0,
  },
  //common
  "Dinosaur bones": {
    type: "common",
    qty: 0,
  },
  "Damaged dinosaur hide": {
    type: "common",
    qty: 0,
  },
  "Dinosaur hide": {
    type: "common",
    qty: 0,
  },
  "Dinosaur scale": {
    type: "common",
    qty: 0,
  },
  "Raw arcane apoterrasaur meat": {
    type: "common",
    qty: 0,
  },
  "Raw scimitops meat": {
    type: "common",
    qty: 0,
  },
  "Raw bagrada rex meat": {
    type: "common",
    qty: 0,
  },
  "Raw asciatops meat": {
    type: "common",
    qty: 0,
  },
  "Raw corbicula rex meat": {
    type: "common",
    qty: 0,
  },
  "Raw spicati apoterrasaur meat": {
    type: "common",
    qty: 0,
  },
  "Raw malletops meat": {
    type: "common",
    qty: 0,
  },
  "Raw oculi apoterrasaur meat": {
    type: "common",
    qty: 0,
  },
  "Raw pavosaurus rex meat": {
    type: "common",
    qty: 0,
  },
  "Raw shark": {
    type: "common",
    qty: 0,
  },
  "Raw manta ray": {
    type: "common",
    qty: 0,
  },
  "Raw rocktail": {
    type: "common",
    qty: 0,
  },
  "Green dragonhide": {
    type: "common",
    qty: 0,
  },
  "Blue dragonhide": {
    type: "common",
    qty: 0,
  },
  "Red dragonhide": {
    type: "common",
    qty: 0,
  },
  "Black dragonhide": {
    type: "common",
    qty: 0,
  },
  "Large bladed adamant salvage": {
    type: "common",
    qty: 0,
  },
  "Grenwall spikes": {
    type: "common",
    qty: 0,
  },
 "Grimy Kwuarm": {
   type: "common",
   qty: 0,
 },
  "Grimy lantadyme": {
    type: "common",
    qty: 0,
  },
  "Grimy cadantine": {
    type: "common",
    qty: 0,
  },
  "Grimy dwarf weed": {
    type: "common",
    qty: 0,
  },
  "Grimy avantoe": {
    type: "common",
    qty: 0,
  },
  "Grimy irit": {
    type: "common",
    qty: 0,
  },
  "Grimy torstol": {
    type: "common",
    qty: 0,
  },
  "Uncut diamond": {
    type: "common",
    qty: 0,
  },
  "Raw manta ray": {
    type: "common",
    qty: 0,
  },
  "Uncut ruby": {
    type: "common",
    qty: 0,
  },
  "Uncut diamond": {
    type: "common",
    qty: 0,
  },
  "Uncut dragonstone": {
    type: "common",
    qty: 0,
  },
  "Pineapple seed": {
    type: "common",
    qty: 0,
  },
  "Papaya tree seed": {
    type: "common",
    qty: 0,
  },
  "Palm tree seed": {
    type: "common",
    qty: 0,
  },
  "Maple seed": {
    type: "common",
    qty: 0,
  },
  "Yew seed": {
    type: "common",
    qty: 0,
  },
  "Magic seed": {
    type: "common",
    qty: 0,
  },
  "Arbuck seed": {
    type: "common",
    qty: 0,
  },
  "Ciku seed": {
    type: "common",
    qty: 0,
  },
  "Lychee seed": {
    type: "common",
    qty: 0,
  },
  "Carambola seed": {
    type: "common",
    qty: 0,
  },
  "Guarana seed": {
    type: "common",
    qty: 0,
  },
  "Golden dragonfruit seed": {
    type: "common",
    qty: 0,
  },
  "Stinkshroom spore": {
    type: "common",
    qty: 0,
  },
 
};

if (localStorage.getItem("BGHdrops") != null) {
 tempList = JSON.parse(localStorage.BGHdrops);
 for (x in tempList) {
   if (!tempList[x] || !compsList[x]) {
     continue;
   } else {
     compsList[x].qty = tempList[x].qty;
   }
 }
}
