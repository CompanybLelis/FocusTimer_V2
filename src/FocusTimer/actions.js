import state from './state.js'
import * as timer from './timer.js'
import * as el from './elements.js'
import * as sounds from './sounds.js'

export function setRunning(){
  if(state.isRunning) return

  state.isRunning = true
  document.documentElement.classList.add('running')

  timer.countdown()
  sounds.buttonPressAudio.play()
}

export function setPause(){
  if(!state.isRunning) return

  state.isRunning = false
  document.documentElement.classList.remove('running')
 
  sounds.buttonPressAudio.play()
 }

export function reset(){
 state.isRunning = false
 document.documentElement.classList.remove('running')
 timer.updateDisplay()

 sounds.buttonPressAudio.play()
}

// General function to adjust time
export function adjustTime(minutesChange) {
  let time = parseInt(el.minutes.textContent, 10) + minutesChange;

  // Check if the new time is outside the valid range and return if it is
  if (time > 60 || time < 0) return
  
  state.minutes = time;
  state.seconds = 0;
  timer.updateDisplay();
  sounds.buttonPressAudio.play();
}

// Specific functions linked to buttons
export function plus5() {
  adjustTime(5);  // Increment by 5 minutes
}

export function minus5() {
  adjustTime(-5);  // Decrement by 5 minutes
}

export function toggleSound(sound) {
  const allSounds = ['playFlorest', 'playRain', 'playCoffeeShop', 'playFirePlace'];
  const currentSound = sounds[sound];
  const wasPlaying = state.isMute && !currentSound.paused; // Check if the current sound is playing

  // Pause all sounds and remove active class
  allSounds.forEach(s => {
    sounds[s].pause();
    document.querySelector(`[data-action="${s}"]`).classList.remove('active-song');
  });

  // If the current sound was not playing, play it and set active class
  if (!wasPlaying) {
    currentSound.play();
    document.querySelector(`[data-action="${sound}"]`).classList.add('active-song');
    state.isMute = true; // Update the mute state to reflect that a sound is playing
  } else {
    state.isMute = false; // Update the mute state to reflect no sound is playing
  }

  sounds.buttonPressAudio.play(); // Play button press sound regardless of the state
}

// Update individual sound functions to use the revised toggleSound
export function playFlorest() { toggleSound('playFlorest'); }
export function playRain() { toggleSound('playRain'); }
export function playCoffeeShop() { toggleSound('playCoffeeShop'); }
export function playFirePlace() { toggleSound('playFirePlace'); }