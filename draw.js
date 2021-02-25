const platform1 = new Image()
platform1.src = 'img/sp/platform-left.png'
const platform2 = new Image()
platform2.src = 'img/sp/platform.png'
const platform3 = new Image()
platform3.src = 'img/sp/platform-right.png'
const platform4 = new Image()
platform4.src = 'img/sp/platform-up.png'
const platform5 = new Image()
platform5.src = 'img/sp/platform-wall-left-down.png'
const platform6 = new Image()
platform6.src = 'img/sp/platform-wall-right-down.png'
const platform7 = new Image()
platform7.src = 'img/sp/platform-wall-left-up.png'
const platform8 = new Image()
platform8.src = 'img/sp/platform-wall-right-up.png'
const platform9 = new Image()
platform9.src = 'img/sp/platform-wall.png'
const bg = new Image()
bg.src = 'img/bg.png'

const tree = new Image()
tree.src = 'img/sp/tree.png'
const pine = new Image()
pine.src = 'img/sp/pine.png'
const bush = new Image()
bush.src = 'img/sp/bush.png'
const playerImg = new Image()


const clear = ()=>{
    ctx.clearRect(0, 0, canv.width, canv.height)
}

const fieldDraw = ()=>{
    for(let y = 0; y< 19; y++){
        for(let x= 0; x< 50; x++){
            field[y][x].draw()
        }
    }
}

const playerDraw = ()=> {
    ctx.drawImage(playerImg, player.x, player.y)
}

const knifeDraw = ()=>{
    for(let i = 0; i< knifes.length; i++){      
        ctx.drawImage(bush, knifes[i].x, knifes[i].y)
    }

}

setInterval(() => {
    clear()

    fieldDraw()
    playerDraw()
    knifeDraw()

    scrollTo(player.x - screen.width/2,player.y - screen.height/2 + 100 )
}, 12);

