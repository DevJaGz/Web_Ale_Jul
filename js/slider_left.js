var slides = document.querySelector('#slider-items-left').children;
var prev_slide = document.querySelector('#prev-slide-left');
var next_slide = document.querySelector('#next-slide-left');
var total_slides = slides.length;
var index = 0;

let array_left = [0, 0];
let array_index_left = 0;

document.getElementById('slider-items-left').addEventListener('touchmove',(e)=>{

    if(array_index_left < array_left.length){
        array_left[array_index_left] = e.touches[0].pageX;
        array_index_left++;
    }
})

document.getElementById('slider-items-left').addEventListener('touchend',(e)=>{

    if(array_left[0] < array_left.slice(-1)){
        next_left("prev");
    }
    else if(array_left[0] > array_left.slice(-1)){
        next_left("next");
    }else{
        console.log("Touch detection failed")
    }
    array_index_left = 0;
})


// console.log('Left:', slides)
next_slide.onclick = function () {
    next_left("next");
    // console.log('left: Next')
}
prev_slide.onclick = function () {
    next_left("prev");
    // console.log('left: Prev')
}

function next_left(direction){
    // console.log("Left:", index)
    if (direction == 'next'){
        index++;
        if(index==total_slides){
            index=0;
        }
    }else{
        if(index==0){
            index= total_slides-1;
        }else{
            index--;
        }
    }
    for(i=0; i< total_slides; i++){
        slides[i].classList.remove('active-left');
    }
    slides[index].classList.add('active-left');

}