let check = 0
let flipCheck = 0
const stopR = ()=>{
    if(check === 0){
        playerImg.src = 'img/stopR/1.png'
        check = 1
    }
    else{
        playerImg.src = 'img/stopR/2.png'
        check = 0
    }
}
const stopL = ()=>{
    if(check === 0){
        playerImg.src = 'img/stopL/1.png'
        check = 1
    }
    else{
        playerImg.src = 'img/stopL/2.png'
        check = 0
    }
}

const runL = ()=>{
    if(check === 0){
        playerImg.src = 'img/runL/1.png'
        check = 1
    }
    else{
        playerImg.src = 'img/runL/2.png'
        check = 0
    }
}

const runR = ()=>{
    if(check === 0){
        playerImg.src = 'img/runR/1.png'
        check = 1
    }
    else{
        playerImg.src = 'img/runR/2.png'
        check = 0
    }
}

const flipR = ()=>{
    if(flipCheck === 0){
        playerImg.src = 'img/flipR/1.png'
        flipCheck = 1
    }
    else if(flipCheck === 1){
        playerImg.src = 'img/flipR/2.png'
        flipCheck = 2
    }
    else if(flipCheck === 2){
        playerImg.src = 'img/flipR/3.png'
        flipCheck = 3
    }
    else if(flipCheck === 3){
        playerImg.src = 'img/flipR/4.png'
        flipCheck = 4
    }
    else if(flipCheck === 4){
        playerImg.src = 'img/flipR/5.png'
        flipCheck = 5
    }
    else if(flipCheck === 5){
        playerImg.src = 'img/flipR/6.png'
        flipCheck = 6
    }
    else if(flipCheck === 6){
        player.flip = false
        checkAnimations()
    }
}

const flipL = ()=>{
    if(flipCheck === 0){
        playerImg.src = 'img/flipL/1.png'
        flipCheck = 1
    }
    else if(flipCheck === 1){
        playerImg.src = 'img/flipL/2.png'
        flipCheck = 2
    }
    else if(flipCheck === 2){
        playerImg.src = 'img/flipL/3.png'
        flipCheck = 3
    }
    else if(flipCheck === 3){
        playerImg.src = 'img/flipL/4.png'
        flipCheck = 4
    }
    else if(flipCheck === 4){
        playerImg.src = 'img/flipL/5.png'
        flipCheck = 5
    }
    else if(flipCheck === 5){
        playerImg.src = 'img/flipL/6.png'
        flipCheck = 6
    }
    else if(flipCheck === 6){
        player.flip = false
        checkAnimations()
    }
}


const jerkAnimR = ()=>{
    playerImg.src = 'img/at/right.png'
}
const jerkAnimL = ()=>{
    playerImg.src = 'img/at/left.png'
}







const checkAnimations = ()=>{
    clearInterval(animation)
    animation = null

    if(player.jerk){
        if(player.dx > 0){
            jerkAnimR()
        }
        else if(player.dx < 0){
            jerkAnimL()
        }
    }
    else {
        if(player.flip){
            if(player.right){
                animation = setInterval(flipR, 70)
            }
            else if(player.left){
                animation = setInterval(flipL, 70)
            }
            else if(player.endPosit === 0){
                animation = setInterval(flipR, 70)
            }
            else if(player.endPosit === 1){
                animation = setInterval(flipL, 70)
            }
        }
        else{
            if(player.right || player.left){
                if(player.right){
                    animation = setInterval(runR, 130)
                }
                else if(player.left){
                    animation = setInterval(runL, 130)
                }
            }
            else if(!player.right && !player.left){
                if(player.endPosit === 0){
                    animation = setInterval(stopR, 300)
                }
                else if(player.endPosit === 1){
                    animation = setInterval(stopL, 300)
                }
            }
        }
    }

}


