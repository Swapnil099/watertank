let add_btn = document.getElementsByClassName("add-btn");
let empty_btn = document.getElementsByClassName("empty-btn");

let bufferWater = 0;
let pressStartTime = 0;
let pressEndTime = 0;

let tank1Water = 0;
let tank2Water = 0;
let tank3Water = 0;
let tank4Water = 0;

for (let i = 0; i < add_btn.length; i++) {
  add_btn[i].addEventListener("mousedown", function (event) {
    pressStartTime = Date.now();
    // const releaseEvent = new Event("mouseup");
    // add_btn[i].dispatchEvent(releaseEvent);
  });

  add_btn[i].addEventListener("mouseup", function (event, bufferWater) {
    pressEndTime = Date.now();
    let currBufferWater = updateDurationDisplay(bufferWater);
    fillTankById(event, currBufferWater);
  });
}

for (let i = 0; i < empty_btn.length; i++) {
  empty_btn[i].addEventListener("click", function (event) {
    if (event.target.id == "empty-tank-1") {
      let tankElement = document.getElementById("tank-1");
      tankElement.style.height = "0px";
      tank1Water = 0;
    } else if (event.target.id == "empty-tank-2") {
      let tankElement = document.getElementById("tank-2");
      tankElement.style.height = "0px";
      tank2Water = 0;
    } else if (event.target.id == "empty-tank-3") {
      let tankElement = document.getElementById("tank-3");
      tankElement.style.height = "0px";
      tank3Water = 0;
    } else if (event.target.id == "empty-tank-4") {
      let tankElement = document.getElementById("tank-4");
      tankElement.style.height = "0px";
      tank4Water = 0;
    }
  });
}

function fillTankById(event, bw) {
  console.log("added buffer : " + bw);
  const intervalId = setInterval(() => {
    if (event.target.id == "add-tank-1") {
      bw -= 25;
      tank1Water = addWaterInTankAndRemoveFromBufferWater(
        tank1Water,
        bw,
        intervalId,
        event
      );

      let tankElement = document.getElementById("tank-1");
      let currentHeight = window.getComputedStyle(tankElement).height;
      currentHeight = parseInt(currentHeight) + 7.5;
      document.getElementById("tank-1").style.height = currentHeight + "px";
    } else if (event.target.id == "add-tank-2") {
      tank2Water = addWaterInTankAndRemoveFromBufferWater(
        tank2Water,
        bw,
        intervalId,
        event
      );
      bw -= 25;

      let tankElement = document.getElementById("tank-2");
      let currentHeight = window.getComputedStyle(tankElement).height;
      currentHeight = parseInt(currentHeight) + 7.5;
      document.getElementById("tank-2").style.height = currentHeight + "px";
    } else if (event.target.id == "add-tank-3") {
      tank3Water = addWaterInTankAndRemoveFromBufferWater(
        tank3Water,
        bw,
        intervalId,
        event
      );
      bw -= 25;

      let tankElement = document.getElementById("tank-3");
      let currentHeight = window.getComputedStyle(tankElement).height;
      currentHeight = parseInt(currentHeight) + 7.5;
      document.getElementById("tank-3").style.height = currentHeight + "px";
    } else if (event.target.id == "add-tank-4") {
      tank4Water = addWaterInTankAndRemoveFromBufferWater(
        tank4Water,
        bw,
        intervalId,
        event
      );
      bw -= 25;

      let tankElement = document.getElementById("tank-4");
      let currentHeight = window.getComputedStyle(tankElement).height;
      currentHeight = parseInt(currentHeight) + 7.5;
      document.getElementById("tank-4").style.height = currentHeight + "px";
    }
  }, 100);
}

function addWaterInTankAndRemoveFromBufferWater(tank, bw, intervalId, event) {
  if (bw <= 0) {
    clearInterval(intervalId);
    return tank;
  } else if (tank == 1000) {
    clearInterval(intervalId);
    checkIfTankEmptyAndBwIsThere(event, bw);
    return tank;
  }
  return (tank += 25);
}

function checkIfTankEmptyAndBwIsThere(event, bw) {
  const intervalId = setInterval(() => {
    if (event.target.id == "add-tank-1" && tank1Water == 0) {
      fillTankById(event, bw);
      clearInterval(intervalId);
    } else if (event.target.id == "add-tank-2" && tank2Water == 0) {
      fillTankById(event, bw);
      clearInterval(intervalId);
    } else if (event.target.id == "add-tank-3" && tank3Water == 0) {
      fillTankById(event, bw);
      clearInterval(intervalId);
    } else if (event.target.id == "add-tank-4" && tank4Water == 0) {
      fillTankById(event, bw);
      clearInterval(intervalId);
    }
  }, 1000);
}

// for (let i = 0; i < add_btn.length; i++) {
//   add_btn[i].addEventListener("submit", function (event) {
//     if (event.target.id == "add-tank-1") {
//     } else if (event.target.id == "add-tank-2") {
//     } else if (event.target.id == "add-tank-3") {
//     } else if (event.target.id == "add-tank-4") {
//     }
//   });
// }

function updateDurationDisplay(bufferWater) {
  const duration = pressEndTime - pressStartTime;
  bufferWater = (duration / 1000) * 200;
  console.log("added in buffer : " + bufferWater);
  return bufferWater;
}
