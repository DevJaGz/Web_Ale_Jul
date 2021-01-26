var slides_right = document.querySelector('#slider-items-right').children;
var prev_slide_right = document.querySelector('#prev-slide-right');
var next_slide_right = document.querySelector('#next-slide-right');
var total_slides_right = slides_right.length;
var index_right = 0;
let array_right = [0, 0];
let array_index_right = 0;

document.getElementById('slider-items-right').addEventListener('touchmove',(e)=>{

    if(array_index_right < array_right.length){
        array_right[array_index_right] = e.touches[0].pageX;
        array_index_right++;
    }
})

document.getElementById('slider-items-right').addEventListener('touchend',(e)=>{
    console.log("Touch", array_right)
    // console.log("Finish", next_array_right[0], next_array_right.slice(-1))
    if(array_right[0] < array_right.slice(-1)){
        next_right("prev");
    }
    else if(array_right[0] > array_right.slice(-1)){
        next_right("next");
    }else{
        console.log("Touch detection failed")
    }
    array_index_right = 0;
})

// console.log('Right:', slides_right)

prev_slide_right.onclick = function () {
    next_right("prev");
    // console.log('Right: Prev')
}
next_slide_right.onclick = function () {
    next_right("next");
    // console.log('Right: Next')
}

function next_right(direction){
    // console.log("Right:", index_right)
    if (direction == 'next'){
        index_right++;
        if(index_right==total_slides_right){
            index_right = 0;
        }
    }else{
        if(index_right==0){
            index_right= total_slides_right-1;
        }else{
            index_right--;
        }
    }
    for(i=0; i< total_slides_right; i++){
        slides_right[i].classList.remove('active-right');
    }
    slides_right[index_right].classList.add('active-right');

}




