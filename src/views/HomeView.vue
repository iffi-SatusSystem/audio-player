<template>
  <div>
    {{ currentAudioName || audioList[0].name }}
    <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.url)"
      :before-play="handleBeforePlay"
      theme-color="#ff2929"
    />
    <!-- <input type="file" id="fileInput" onchange="handleFileSelect(event)">
    <audio id="audioPlayer" controls></audio> -->
    <!-- {{ window }} -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
    let currentAudioName=ref('');
    // let audioPlayer= document.getElementById("audioPlayer")
    const  audioList= ref([
        {
          name: 'audio1',
          url: "D:\recordings\recording_1685354012598"
        },
        // {
        //   name: 'audio2',
        //   url: 'https://www.0dutv.com/upload/dance/20200316/C719452E3C7834080007662021EA968E.mp3'
        // }
      ]);
      onMounted(() =>{
    console.log(window.location.pathname);
     });
//       const handleFileSelect= computed((event) =>{
//         let file = event.target.files[0];
//   let audioPlayer = ref(document.getElementById('audioPlayer'));
 
//   if (file) {
//     let  reader = new FileReader();
//     reader.onload = function(e) {
//       audioPlayer.src = e.target.result;
//       audioPlayer.play();
//     };
//    const file= reader.readAsDataURL(file);
//   }
//   return file
//  });

//  function handleFileSelect(event){
//   let file = event.target.files[0];
//   let audioPlayer = document.getElementById('audioPlayer');

//   if (file) {
//     let  reader = new FileReader();
//     reader.onload = function(e) {
//       audioPlayer.src = e.target.result;
//       audioPlayer.play();
//     };
//     reader.readAsDataURL(file);
//   }
//  };
// Or if you have a local file path
// function playLocalAudio(path) {
//   let audioPlayer = document.getElementById('audioPlayer');
//   audioPlayer.src = path;
//   audioPlayer.play();
// };

        
    // Something to do before playing
    function  handleBeforePlay(next) {
      // There are a few things you can do here...
      currentAudioName.value = audioList[ref.audioPlayer.currentPlayIndex].name

      next() // Start playing
    };
  
  
</script>
