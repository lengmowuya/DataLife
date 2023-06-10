// import awardAudio from './../assets/audio/award.mp3'
export default {
    playAwardAudio(){
        let audioController = document.querySelector('#audioController');
        console.log(audioController);
        audioController.play();
    }
}