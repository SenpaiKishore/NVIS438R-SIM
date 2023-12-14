let voltageData = [];
let timeData = [];
let voltageChart;
let currentVoltage = 0;

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
  var motorPositionXL = document.getElementById('circuitMotor').getBoundingClientRect().left + window.scrollX + 50;
  var motorPositionXR = document.getElementById('circuitMotor').getBoundingClientRect().right + window.scrollX - 50;
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
  const progressBar = document.getElementById('progressBar');
  const lightButtons = document.querySelectorAll('.lightButton');

  let isPowerOn = false;
  let intervalId;
  let batteryLevel = 0; // Start with an empty battery

  const batteryDischargeRate = 0.5; // Percent per second
  const batteryChargeRate = 10; // Percent per second
  const maxBatteryLevel = 100;
  const voltageCoefficient = 12.2 / maxBatteryLevel; // To calculate voltage based on battery level


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


  function updateAmmeter() {
    const voltage = batteryLevel * voltageCoefficient;
    const lightsOn = document.querySelectorAll('.lightButton.active').length;
    
    // Calculate the total power consumed by the lights
    const totalPower = lightsOn * 21; // Assuming each light consumes 21W
    const current = voltage > 0 ? totalPower / voltage : 0; // Avoid division by zero
  }
  
  setInterval(() => {
    const now = new Date().toLocaleTimeString();
    timeData.push(now);
    voltageData.push(currentVoltage);
    voltageChart.update();
  }, 500); // 500 ms interval

  // Function to update the voltmeter based on the current battery level
  function updateVoltmeter() {
    currentVoltage = batteryLevel * voltageCoefficient;
    updateAmmeter(); // Update the ammeter at the same time
  }

  function updateStats() {
    const voltage = batteryLevel * voltageCoefficient;
    const lightsOn = document.querySelectorAll('.lightButton.active').length;
    const totalPower = lightsOn * 21; // Assuming each light consumes 21W
    const current = voltage > 0 ? totalPower / voltage : 0;
    
    const soc = batteryLevel; // Assuming SOC is directly proportional to battery level
    const dod = 100 - soc; // DOD is the complement of SOC 
  
  }
  

  // Function to update the battery level and progress bar
  function updateBatteryLevel(delta) {
    batteryLevel += delta;
    batteryLevel = Math.max(0, Math.min(maxBatteryLevel, batteryLevel)); // Keep battery level within bounds
    progressBar.style.width = `${batteryLevel}%`;
    updateVoltmeter();
    updateStats();
  }

  // Event listener for the power button
  powerButton.addEventListener('click', () => {
    isPowerOn = !isPowerOn;
    powerButton.style.backgroundColor = isPowerOn ? 'red' : 'white';
    powerButton.style.color = isPowerOn ? 'white' : 'red';
    document.getElementById("batteryStat").textContent = isPowerOn ? 'Battery Status: Charging' : 'Battery Status: Not Charging';
    managePowerState();
  });

  // Function to manage power state and battery charging/discharging
  function managePowerState() {
    clearInterval(intervalId); // Clear any existing interval

    if (isPowerOn) {
      intervalId = setInterval(() => {
        // Charge the battery if no lights are active
        updateBatteryLevel(batteryChargeRate / 10);
        // Check for battery full
        if (batteryLevel >= maxBatteryLevel) {
          batteryLevel = maxBatteryLevel;
          clearInterval(intervalId);
          alert('Battery charged to 100%');
        }
      }, 100); // Update 10 times per second
    } else {
      updateVoltmeter(); // Update voltmeter to 0 when power is off
    }
    updateStats();
  }

  // Function to manage light state and battery discharging
  function manageLightState() {
    clearInterval(intervalId); // Clear any existing interval

    intervalId = setInterval(() => {
        const lightsOn = document.querySelectorAll('.lightButton.active').length;
        if (lightsOn > 0) {
            updateBatteryLevel(-batteryDischargeRate * lightsOn / 10);
            document.getElementById("batteryStat").textContent = 'Battery Status: Discharging';
        } else if (isPowerOn) {
            updateBatteryLevel(batteryChargeRate / 10);
        } else{
          document.getElementById("batteryStat").textContent = 'Battery Status: Idle';
        } 
        // Check for battery empty
        if (batteryLevel <= 0) {
            batteryLevel = 0;
            clearInterval(intervalId);
            alert('Battery empty');
            lightButtons.forEach(button => button.classList.remove('active')); // Turn off all lights
        }
    }, 100); // Update 10 times per second

    updateAmmeter(); // Update the ammeter reading here
    updateStats();
  }

  lightButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        console.log("Light Clicked");
        // Toggle the 'active' class for the button
        const isLightOn = button.classList.toggle('active');

        // Select the corresponding image
        const lightImg = document.getElementById(`lightImg${index + 1}`);
      
        // Set the image source based on the button state
        if (lightImg) {
            lightImg.src = isLightOn ? 'lighton.png' : 'lightoff.png';
        }

        

        // Call manageLightState to handle light state change
        manageLightState();
    });
  });

  updateVoltmeter(); // Start with the voltmeter at 0V
  updateStats();
  drawLines();
});

window.addEventListener('resize', drawLines);
