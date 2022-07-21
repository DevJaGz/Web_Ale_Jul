// let audio = new Audio('/audio/stand_by_me.mp3');
const audio = document.getElementById('song')
audio.loop = true;

window.addEventListener('storage', () => {
    pauseSong();
    iconsForSongPause();
}, false)
localStorage.setItem('Sentinel',Math.random())

if (isMobile()){
    document.addEventListener("visibilitychange", function() {
        if (document.hidden){
            pauseSong()
        }else{
            playSong()
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
//     }, 10000)
// });

modalSong.addEventListener('click', (event) => {
    if(!event.target.closest(".modal-song-container") | event.target.matches('[data-action="no"]')) {
        closeModal();
        iconsForSongPause();
    }else if (event.target.matches('[data-action="yes"]')){
        closeModal();
        playSong();
        iconsForSongPlay();
    }
    
    event.stopPropagation();
})

songControls.addEventListener('click', (event) => {
    if(event.target.classList.contains('fa-volume-up')) {
        pauseSong();
        iconsForSongPause();
    }else if (event.target.classList.contains('fa-volume-down')){
        playSong();
        iconsForSongPlay();
    }
    event.stopPropagation();
})

const playSong = async () => {
    try {
        await audio.play();
    } catch (error) {
        console.error('Can not Play the song', error);
    }
}

const pauseSong = () => {
    try {
        audio.pause();
    } catch (error) {
        console.error('Can not Pause the song', error);
    }
}

const closeModal = () => {
    modalSong.classList.add('hide');
}

const iconsForSongPlay = () => {
    volumUpIcon.classList.remove('hide');
    volumDownIcon.classList.add('hide');
}

const iconsForSongPause = () => {
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