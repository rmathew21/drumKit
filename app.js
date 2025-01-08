// function playSound(e) {
//     const audio = document.querySelector(`audio[data-key="${e.code}"]`);
//     const key = document.querySelector(`.key[data-key="${e.code}"]`);
//     if(!audio) return; // stop the function from running all together
//     audio.currentTime = 0; // rewind to the start
//     audio.play();
//     key.classList.add('playing');
// }

// function removeTransition(e) {
//     if(e.propertyName !== 'transform') return; // skip it if it's not a transform
//     this.classList.remove('playing')
// }

// const keys = document.querySelectorAll('.key');
// keys.forEach(key => key.addEventListener('touchstart', playSound));
// keys.forEach(key => key.addEventListener('transitionend', removeTransition));
// window.addEventListener('keydown', playSound);

function playSound(e) {
    const code = e.code || e.target.closest('.key')?.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${code}"]`);
    const key = document.querySelector(`.key[data-key="${code}"]`);
    if (!audio) return; // stop if no audio is associated with the key
    audio.currentTime = 0; // rewind to the start
    audio.play();
    if (key) {
        key.classList.add('playing');
    }
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Skip if it's not a transform
    this.classList.remove('playing');
}

// Add event listeners for both keypress and touch
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('touchstart', e => {
        e.preventDefault();
        playSound({ target: key });
    });
});

// Event listener for keydown
window.addEventListener('keydown', playSound);