import * as A1lib from "@alt1/base";
import * as Chatbox from "@alt1/chatbox";

import * as $ from "jquery";

//Enable "Add App" button for Alt1 Browser.
A1lib.identifyApp("appconfig.json");


require("!file-loader?name=[name].[ext]!./index.html");
require("!file-loader?name=[name].[ext]!./appconfig.json");

const appColor = A1lib.mixColor(0, 255, 0);

let reader = new Chatbox.default();
reader.readargs = {
  colors: [
    A1lib.mixColor(255, 255, 255), //Common Mats
    A1lib.mixColor(255, 128, 0), //Uncommon Mats
    A1lib.mixColor(255, 165, 0), //Scavenging comps
    A1lib.mixColor(255, 0, 0), //Rare Mats
  ]
};

//reader.find(); //Find the chat box.
//reader.read(); //Get the initial read, to not report on initial load.

function showSelectedChat(chat) {
  //Attempt to show a temporary rectangle around the chatbox.  skip if overlay is not enabled.
  try {
    alt1.overLayRect(
      appColor,
      chat.mainbox.rect.x,
      chat.mainbox.rect.y,
      chat.mainbox.rect.width,
      chat.mainbox.rect.height,
      2000,
      5
    );
  } catch { }
}

  
declare global {
    interface Navigator {
        msSaveBlob?: (blob: any, defaultName?: string) => boolean
    }
}

if (navigator.msSaveBlob) {
    // use navigator.msSaveBlob
}

//Find all visible chatboxes on screen
let findChat = setInterval(function () {
  if (reader.pos === null)
    reader.find();
  else {
    clearInterval(findChat);
    reader.pos.boxes.map((box, i) => {
      $(".chat").append(`<option value=${i}>Chat ${i}</option>`);
    });

    if (localStorage.ccChat) {
      reader.pos.mainbox = reader.pos.boxes[localStorage.ccChat];
    } else {
      //If multiple boxes are found, this will select the first, which should be the top-most chat box on the screen.
      reader.pos.mainbox = reader.pos.boxes[0];
    }
    showSelectedChat(reader.pos);
    setInterval(function () {
      readChatbox();
    }, 600);
  }
}, 1000);

var count, mats, index;
var actions = 0;

function readChatbox() {
  var opts = reader.read() || [];
  var chat = "";

  for (const a in opts) {
    chat += opts[a].text + " ";
  }

  var comps = chat.match(
    /\d+ x [\w-]+( \w+)?[^\d+:]|You receive \d+ [\w-]+( \w+)?[^\d+:]/g
  );
  if (comps != null && comps.length > -1) actions++;
  for (var x in comps) {
    count = Number(comps[x].match(/\d+/)); //1
    mats = comps[x].match(/[^You receive \d]\w+( \w+)?/)[0]; //Junk
    //if (!mats.match(/parts|components|Junk/)) mats += "s";
    if (compsList[mats]) {
      compsList[mats].qty += count; //add count to index of second list.
      tidyTable(mats);
    } else {
      console.warn("Invalid drop.  Ignoring.");
      continue;
    }
  }
}

function buildTable() {
  for (const x in compsList) {
       if (compsList[x].type === "rare") {
      $(".rare").append(
        `<tr data-name="${x}"><td>${
            x
        }</td><td class='qty'></td></tr>`
      );
    }
    if (compsList[x].type === "eggs") {
      $(".eggs").append(
        `<tr data-name="${x}"><td>${
            x
        }</td><td class='qty'></td></tr>`
      );
    }
    if (compsList[x].type === "common") {
      $(".common").append(
        `<tr data-name="${x}"><td>${
          x
        }</td><td class='qty'></td></tr>`
      );
    }
  }
}

function tidyTable(flashRow) {
  localStorage.mats = JSON.stringify(compsList);
  for (const x in compsList) {
    $(`[data-name='${x}'] > .qty`).text(compsList[x].qty);
    if (compsList[x].qty === 0) {
      $(`[data-name='${x}']`).hide();
    } else {
      $(`[data-name='${x}']`).show();
    }
  }
  $(`[data-name='${mats}']`)
    .css({ "background-color": "lime" })
    .animate(
      {
        backgroundColor: ("rgba(0, 0, 0, 0)"),   
      },
      500,
      function () {
        $(this).removeAttr("style");
      }
    );

  $(".actions").text(actions);
}


buildTable();
tidyTable(mats);

$(".edit").change(function () {
  if ($(this).is(":checked")) {
    if ($(".tracker").text() == "Stop") {
      $(".tracker").click();
    }
    $("tr:hidden").show();
    $(".qty")
      .attr("contenteditable", "true")
      .focus(function () {
        document.execCommand("selectAll", false, null);
      });
  } else {
    $(".qty").removeAttr("contenteditable");
    for (const x in compsList) {
      compsList[x].qty = parseInt($(`[data-name='${x}'] .qty`).text());
    }
    tidyTable(mats);
  }
});

$("button.tracker")
  .click(function () {
    if ($(this).html() == "Start") {
      console.log("Starting tracker");
     var tracking = setInterval(function () {
        readChatbox();
      }, 600);
      $(this).html("Stop");
    } else {
      console.log("Stopping tracker");
      $(this).html("Start");
      clearInterval(tracking);
    }
  })
  .click();


$("button.clear").click(function () {
  localStorage.removeItem("BGHdrops");
  for (const x in compsList) {
    compsList[x].qty = 0;
  }
  actions = 0;
  location.reload();
});

$(".toggleMenu").click(function () {
  $(".options").toggle();
});

$(".export").click(function () {
  var str = "DropName,Quantity\n"; // column headers
  for (const x in compsList) {
    str = str + x + "," + compsList[x].qty + "\n";
  }
  //return str;
  var blob = new Blob([str], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, "dropExport.csv");
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "dropExport.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});

$(".chat").change(function () {
  reader.pos.mainbox = reader.pos.boxes[$(this).val()as string];
  showSelectedChat(reader.pos);
  localStorage.setItem("ccChat", $(this).val()as string);
  $(this).val("");
});

