let voltageData = [];
let timeData = [];
let voltageChart;
let currentVoltage = 0;
let speedPercentage  = 50;
let animationFrameId = null

function drawLines() {
   // Drawing the circuit
  //SMPS to Parameter
  var smpsPositionXL = document.getElementById('powerButton').getBoundingClientRect().left + window.scrollX;
  var smpsPositionY = document.getElementById('powerButton').getBoundingClientRect().top + window.scrollY;
  var smpsPositionXR = document.getElementById('powerButton').getBoundingClientRect().right + window.scrollX;

  var spdtPositionXL = document.getElementById('switchCircuit-box').getBoundingClientRect().left + window.scrollX;
  var spdtPositionXR = document.getElementById('switchCircuit-box').getBoundingClientRect().right + window.scrollX;
  var spdtPositionY = document.getElementById('switchCircuit-box').getBoundingClientRect().bottom + window.scrollY - 20;

  var motorPositionX = document.getElementById('circuitMotor').getBoundingClientRect().left + window.scrollX + 105;
  var motorPositionYT = document.getElementById('circuitMotor').getBoundingClientRect().top + window.scrollY + 20;
  var motorPositionYB = document.getElementById('circuitMotor').getBoundingClientRect().bottom + window.scrollY + 10;

  var voltPositionX = document.getElementById('voltage-box').getBoundingClientRect().left + window.scrollX + 30;
  
  var lightPositionX = document.getElementById('lightImg').getBoundingClientRect().left + window.scrollX + 2;
  var lightPositionY = document.getElementById('lightImg').getBoundingClientRect().bottom + window.scrollX - 23;

  document.getElementById('neutralCircle').setAttribute('cx', smpsPositionXL);
  document.getElementById('neutralCircle').setAttribute('cy', smpsPositionY - 50);

  document.getElementById('liveCircle').setAttribute('cx', smpsPositionXR);
  document.getElementById('liveCircle').setAttribute('cy', smpsPositionY - 50);

  document.getElementById('mainLine1').setAttribute('x1', smpsPositionXL);
  document.getElementById('mainLine1').setAttribute('y1', smpsPositionY);
  document.getElementById('mainLine1').setAttribute('x2', smpsPositionXL);
  document.getElementById('mainLine1').setAttribute('y2', smpsPositionY - 43.5);

  document.getElementById('mainLine2').setAttribute('x1', smpsPositionXR);
  document.getElementById('mainLine2').setAttribute('y1', smpsPositionY);
  document.getElementById('mainLine2').setAttribute('x2', smpsPositionXR);
  document.getElementById('mainLine2').setAttribute('y2', smpsPositionY - 43.5);
  

  document.getElementById('smpsLine1').setAttribute('x1', smpsPositionXL);
  document.getElementById('smpsLine1').setAttribute('y1', smpsPositionY);
  document.getElementById('smpsLine1').setAttribute('x2', smpsPositionXL);
  document.getElementById('smpsLine1').setAttribute('y2', motorPositionYB);

  document.getElementById('smpsLine2').setAttribute('x1', smpsPositionXR);
  document.getElementById('smpsLine2').setAttribute('y1', smpsPositionY);
  document.getElementById('smpsLine2').setAttribute('x2', smpsPositionXR);
  document.getElementById('smpsLine2').setAttribute('y2', motorPositionYT);

  document.getElementById('powerLine1').setAttribute('x1', smpsPositionXR);
  document.getElementById('powerLine1').setAttribute('y1',spdtPositionY);
  document.getElementById('powerLine1').setAttribute('x2', spdtPositionXL);
  document.getElementById('powerLine1').setAttribute('y2', spdtPositionY);

  document.getElementById('powerLine2').setAttribute('x1', smpsPositionXL);
  document.getElementById('powerLine2').setAttribute('y1', motorPositionYB);
  document.getElementById('powerLine2').setAttribute('x2', lightPositionX + 15);
  document.getElementById('powerLine2').setAttribute('y2', motorPositionYB);

  document.getElementById('motorLine1').setAttribute('x1', motorPositionX);
  document.getElementById('motorLine1').setAttribute('y1', motorPositionYT);
  document.getElementById('motorLine1').setAttribute('x2', motorPositionX);
  document.getElementById('motorLine1').setAttribute('y2', spdtPositionY);

  document.getElementById('motorLine2').setAttribute('x1', motorPositionX);
  document.getElementById('motorLine2').setAttribute('y1', motorPositionYB + 1);
  document.getElementById('motorLine2').setAttribute('x2', motorPositionX);
  document.getElementById('motorLine2').setAttribute('y2', motorPositionYB-50);

  document.getElementById('voltLine1').setAttribute('x1', motorPositionX);
  document.getElementById('voltLine1').setAttribute('y1', motorPositionYT - 30);
  document.getElementById('voltLine1').setAttribute('x2', voltPositionX);
  document.getElementById('voltLine1').setAttribute('y2', motorPositionYT - 30);

  document.getElementById('voltLine2').setAttribute('x1', voltPositionX);
  document.getElementById('voltLine2').setAttribute('y1', motorPositionYT - 30);
  document.getElementById('voltLine2').setAttribute('x2', voltPositionX);
  document.getElementById('voltLine2').setAttribute('y2', motorPositionYB);

  document.getElementById('lightLine1').setAttribute('x1', spdtPositionXR);
  document.getElementById('lightLine1').setAttribute('y1', spdtPositionY);
  document.getElementById('lightLine1').setAttribute('x2', lightPositionX);
  document.getElementById('lightLine1').setAttribute('y2', spdtPositionY);

  document.getElementById('lightLine2').setAttribute('x1', lightPositionX);
  document.getElementById('lightLine2').setAttribute('y1', spdtPositionY);
  document.getElementById('lightLine2').setAttribute('x2', lightPositionX);
  document.getElementById('lightLine2').setAttribute('y2', lightPositionY);

  document.getElementById('lightLine3').setAttribute('x1', lightPositionX + 15);
  document.getElementById('lightLine3').setAttribute('y1', lightPositionY);
  document.getElementById('lightLine3').setAttribute('x2', lightPositionX + 15);
  document.getElementById('lightLine3').setAttribute('y2', motorPositionYB);

  document.getElementById('main-smpsN').setAttribute('x', smpsPositionXL - 5);
  document.getElementById('main-smpsN').setAttribute('y', smpsPositionY - 65);

  document.getElementById('main-smpsL').setAttribute('x', smpsPositionXR - 5);
  document.getElementById('main-smpsL').setAttribute('y', smpsPositionY - 65);

  document.getElementById('switchText1').setAttribute('x', spdtPositionXL - 50);
  document.getElementById('switchText1').setAttribute('y', spdtPositionY + 35);
  
  document.getElementById('switchText2').setAttribute('x', spdtPositionXR - 10);
  document.getElementById('switchText2').setAttribute('y', spdtPositionY + 35);

}

document.addEventListener('DOMContentLoaded', () => {
  const powerButton = document.getElementById('powerButton');

  let isPowerOn = false;
  const knob = document.getElementById('knob');
  let isDragging = false;
  let startY = 0;
  let tireRotation = 0;
  let currentRotation = 0;
  const tire = document.getElementById('tire');

  function getRotationDegrees(yMove) {
    // Calculate rotation, with 1 pixel movement corresponding to 1 degree of rotation
    const degreesPerPixel = 180 / 100; // assuming 100 pixels movement for full range
    return yMove * degreesPerPixel;
  }

  function calculateRPM(knobPercentage) {
    return knobPercentage * 800 / 100; // At 100%, RPM is 300
  }

  function animateTire() {
    if (isPowerOn) {
      const degreesPerRPM = 360 / 60; // Each RPM is 360 degrees per minute, or 6 degrees per second
      const degreesPerFrame = calculateRPM(speedPercentage) * degreesPerRPM / 60; // Convert RPM to degrees per frame, assuming 60 fps
      tireRotation += degreesPerFrame;
      tireRotation = tireRotation % 360;
      tire.style.transform = `rotate(${tireRotation}deg)`;
      animationFrameId = requestAnimationFrame(animateTire);
    } else {
      cancelAnimationFrame(animationFrameId); // Stop the animation when power is off
    }
  }
  

  function updateKnob(value) {
    // Clamp the value to the range -90 to 90
    value = Math.max(-90, Math.min(90, value));
    // Apply rotation to the knob
    knob.style.transform = `rotate(${value}deg)`;
    // Convert the angle to a percentage and log it
    speedPercentage = (value + 90) / 180 * 100;
    console.log(`Knob value: ${speedPercentage.toFixed(2)}%`);
    updateStats();
  }

  function updateStats(){
    document.getElementById('knobPercentage').innerHTML = `${speedPercentage.toFixed(2)}%`;
  }

  function togglePower() {
    isPowerOn = !isPowerOn;
    powerButton.style.backgroundColor = isPowerOn ? 'red' : 'white';
    powerButton.style.color = isPowerOn ? 'white' : 'black';
    
    if (isPowerOn) {
      // Calculate RPM based on the current knob value
      const knobValue = (currentRotation + 90) / 180; // Convert knob rotation to percentage
      speedPercentage = knobValue * 100; // Convert to percentage
      animateTire(); // Start the tire animation with the current RPM
    } else {
      tireRotation = 0;
      tire.style.transform = 'none';
    }
  }

  knob.addEventListener('mousedown', event => {
    isDragging = true;
    startY = event.clientY;
    // Cancel any text selection
    document.body.style.userSelect = 'none';
    event.preventDefault(); // Prevent default drag behavior
  });

  document.addEventListener('mousemove', event => {
    if (isDragging) {
      const deltaY = event.clientY - startY;
      // Calculate the new rotation based on deltaY
      const newRotation = currentRotation - getRotationDegrees(deltaY);
      // Update the knob with the new rotation
      updateKnob(newRotation);
    }
  });

  document.addEventListener('mouseup', event => {
    if (isDragging) {
      // Finalize the rotation value
      const deltaY = event.clientY - startY;
      currentRotation -= getRotationDegrees(deltaY);
      currentRotation = Math.max(-90, Math.min(90, currentRotation)); // Clamp final rotation
      updateKnob(currentRotation); // Update for the last time
      isDragging = false;
      // Restore text selection
      document.body.style.userSelect = '';
    }
  });


  // Initialize the voltmeter with a value of 0 because the power is off
  const ctx = document.getElementById('voltageChart').getContext('2d');
  voltageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeData,
      datasets: [{
        label: 'Voltage',
        data: voltageData,
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'realtime',
          realtime: {
            duration: 20000,  // data in the past 20000 ms will be displayed
            refresh: 1000,    // on-screen refresh rate of 1000 ms
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      maintainAspectRatio: false
    }
  });

  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    timeData.push(now);
    voltageData.push(currentVoltage);
    voltageChart.update();
  }, 500);

  // Event listener for the power button
  powerButton.addEventListener('click', togglePower);
  window.addEventListener('load', () => {
    currentRotation = 0; // This is the default knob rotation angle
    speedPercentage = 50; // Default speed percentage when the app loads
    updateKnob(currentRotation);
    updateStats(); // Update the knob position based on the default value
  });
  drawLines();
});

window.addEventListener('resize', drawLines);
