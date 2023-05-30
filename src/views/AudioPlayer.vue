<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileSelect">
    <button @click="saveAudio">Save Audio</button>
    <audio-player
      :audio-list="audioUrlsOnMount"
      ref="audioPlayer"
      theme-color="#ff2929"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const fileInput = ref(null);
const audioUrls=ref([]);
const audioUrlsOnMount=ref([]);
// const audioPlayer=ref(null);
onMounted(() =>{
  const urls= localStorage.getItem("audioData")
  const parsedObject=JSON.parse(urls)
  audioUrlsOnMount.value= Object.values(parsedObject)
})
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const audioDataUrl = e.target.result;
      audioUrls.value.push(audioDataUrl)
      localStorage.setItem('audioData', JSON.stringify(audioUrls));
    };
    reader.readAsDataURL(file);
  }
}
function saveAudio() {
  const audioDataUrl = localStorage.getItem('audioData');
  const parsedObject=JSON.parse(audioDataUrl)
  audioUrlsOnMount.value= Object.values(parsedObject)
  if (audioDataUrl) {
    const parsedLinks= JSON.parse(audioDataUrl)
    const link = document.createElement('a');
    link.href = parsedLinks[0];
    link.download = 'audio.wav'; // Set desired file name and extension
    link.click();
  } else {
    console.log('No audio data saved.');
  }
}
</script>
<!-- <style scoped>
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
</style> -->







