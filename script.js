
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}


function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}


function handleRangeUpdate() {
  video[this.name] = this.value;
}


function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}


function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}


function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}


video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
