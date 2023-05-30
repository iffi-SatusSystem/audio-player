<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileSelect">
    <button @click="saveAudio">Save Audio</button>
    <div class="audio-player">
    <audio  ref="audioPlayer" @timeupdate="updateProgressBar"  controlslist="play timeline volume download" controls="true">
      <source  :src="audioUrl" type="audio/wav"/>
    </audio>
    <!-- <div class="progress-bar">
      <div class="progress" :style="{ width: progressBarWidth }"></div>
    </div> -->
    <button @click="playPause" class="play-pause-button">{{ isPlaying ? 'Pause' : 'Play' }}</button>
  </div>
    <!-- <audio-player
      ref="audioPlayer"
      theme-color="#ff2929"
    /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const fileInput = ref(null);
let audioPlayer=ref(null);
const isPlaying = ref(false);
const progressBarWidth = ref('0%');
let audioUrl = 'audio.wav';
onMounted(() =>{
  audioPlayer.value = $refs.audioPlayer;
})
const playPause = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause();
  } else {
    audioPlayer.value.play();
  }
  isPlaying.value = !isPlaying.value;
};
const updateProgressBar = () => {
  const currentTime = audioPlayer.value.currentTime;
  const duration = audioPlayer.value.duration;
  progressBarWidth.value = `${(currentTime / duration) * 100}%`;
};

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // console.log(reader);
      const audioDataUrl = e.target.result;
      localStorage.setItem('audioData', audioDataUrl);
      audioPlayer.value.src = audioDataUrl;
      audioPlayer.value.play();
    };
    reader.readAsDataURL(file);
  }
}
function saveAudio() {
  const audioDataUrl = localStorage.getItem('audioData');
  if (audioDataUrl) {
    const link = document.createElement('a');
    link.href = audioDataUrl;
    link.download = 'audio.wav'; // Set desired file name and extension
    link.click();
    audioPlayer.value.src = audioDataUrl;
    audioUrl=audioDataUrl;
      audioPlayer.value.play();
  } else {
    console.log('No audio data saved.');
  }
}
</script>
<style scoped>
.audio-player {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.audio-player audio {
  width: 100%;
  margin-right: 10px;
  bottom: 0;
  position: absolute;
}

.audio-player .progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.audio-player .progress {
  height: 100%;
  background-color: #007bff;
}
.progress-bar {
  color: red;
  width: 200px;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  margin-right: 10px;
}

.progress {
  height: 100%;
  background-color: #007bff;
}
</style>







