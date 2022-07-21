// const song = document.getElementById('song');
// let audio = new Audio('/audio/stand_by_me.mp3');
// audio.resume();
// audio.play();
window.addEventListener('storage', () => {
    suspendSong()
    iconsForSongSupend();
}, false)

localStorage.setItem('Sentinel',Math.random())
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var source = audioCtx.createBufferSource();
window.addEventListener('load', function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './audio/stand_by_me.mp3');
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function (r) {
        audioCtx.decodeAudioData(
                xhr.response, 
                function (buffer) {
                    source.buffer = buffer;
                    source.connect(audioCtx.destination);
                    source.loop = true;
                });
        // source.start(0);
        // audioCtx.suspend();
        source.loop = true;
    });
    xhr.send();
    this.setTimeout(() => {
        audioCtx.resume();
    },10)
});

if (isMobile()){
    document.addEventListener("visibilitychange", function() {
        if (document.hidden){
            suspendSong()
        }else{
            resumeSong()
        }
      }, false);
}


const modalSong = document.getElementById('modalSong');
const songControls = document.getElementById('songControls');
const volumUpIcon = document.getElementById('volumUpIcon');
const volumDownIcon = document.getElementById('volumDownIcon');

// window.addEventListener('load', function () {
//     this.setTimeout(()=> {
//         modalSong.classList.add('hide');
//     }, 5000)
// });

modalSong.addEventListener('click', (event) => {
    if(!event.target.closest(".modal-song-container") | event.target.matches('[data-action="no"]')) {
        closeModal();
        iconsForSongSupend();
    }else if (event.target.matches('[data-action="yes"]')){
        closeModal();
        startSong();
        resumeSong();
        iconsForSongResume();
    }
    
    event.stopPropagation();
})

songControls.addEventListener('click', (event) => {
    if(event.target.classList.contains('fa-volume-up')) {
        audioCtx.suspend();
        iconsForSongSupend();
    }else if (event.target.classList.contains('fa-volume-down')){
        audioCtx.resume();
        iconsForSongResume();
    }
    event.stopPropagation();
})

const closeModal = () => {
    modalSong.classList.add('hide');
}

const startSong = () => {
    source.start(0);
}

const resumeSong = () => {
    audioCtx.resume();
}

const suspendSong = () => {
    audioCtx.suspend();
}

const iconsForSongResume = () => {
    volumUpIcon.classList.remove('hide');
    volumDownIcon.classList.add('hide');
}

const iconsForSongSupend = () => {
    volumUpIcon.classList.add('hide');
    volumDownIcon.classList.remove('hide');
}

function isMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}