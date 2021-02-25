let runInterval
let gravInterval
let isGround 
let jumpInterval
let jerkInterval




//////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('keydown', (e)=>{
    if(e.code == 'KeyA' && !player.left){
        player.right = false
        player.left = true
        checkAnimations()
        if(!runInterval){
            runInterval = setInterval(run, 10)
        }
    }

    if(e.code == 'KeyD' && !player.right){
        player.left = false
        player.right = true
        checkAnimations()
        if(!runInterval){
            runInterval = setInterval(run, 10)
        }
    }

    if(e.code == 'KeyW' && player.jump === 0 && player.isGround){
        player.jump++
        clearInterval(gravInterval)
        gravInterval = null
        player.gravSpeed = 0
        player.jumpSpeed = 9
        player.flip = true
        flipCheck = 0
        if(!jumpInterval){
            jumpInterval = setInterval(jump,10)
        }
        checkAnimations()
    }
    else if(e.code == 'KeyW' && (player.jump === 1 || player.jump === 0)){
        player.jump +=2
        clearInterval(gravInterval)
        gravInterval = null
        player.gravSpeed = 0
        player.jumpSpeed = 9
        if(!jumpInterval){
            jumpInterval = setInterval(jump,10)
        }
        checkAnimations()    
    }
})

document.addEventListener('keyup', (e)=>{
    if(e.code == 'KeyA'){
        player.left = false
        player.endPosit = 1
        checkAnimations()

    }
    if (e.code == 'KeyD'){
        player.right = false
        player.endPosit = 0
        checkAnimations()

    }




})
document.addEventListener('mousemove',(e)=>{
    player.mouseX =  e.pageX
    player.mouseY =  e.pageY
})
document.addEventListener('mousedown', (e)=>{
    if(player.reloadAt){
        player.reloadAt = false
        setTimeout(()=>{player.reloadAt=true},700)

        const newKnife = {}
        newKnife.speed = 17
        newKnife.x =player.x
        newKnife.y =player.y

        let vx = e.pageX - player.x
        let vy = e.pageY- player.y

        let dist = Math.sqrt(vx * vx + vy * vy);
        newKnife.dx = vx / dist;
        newKnife.dy = vy / dist;
            
        newKnife.dx *= newKnife.speed;
        newKnife.dy *= newKnife.speed;
        knifes.push(newKnife)
    }
})

document.addEventListener( "keydown", (e)=>{
    if(e.code ==='Space'){
        if(player.reloadJerk){
            player.reloadJerk = false
            setTimeout(()=>{player.reloadJerk = true},1500)
            player.jerk = true
            const speed = 15
            let vx = player.mouseX - player.x
            let vy = player.mouseY - player.y

            let dist = Math.sqrt(vx * vx + vy * vy);
            player.dx = vx / dist;
            player.dy = vy / dist;
                
            player.dx *= speed;
            player.dy *= speed;
            player.jerkLength = 15

            clearInterval(gravInterval)
            gravInterval = null


            if(!jerkInterval){
                jerkInterval = setInterval(jerk,10) 
            }
        }
    }
})
//////////////////////////////////////////////////////////////////////////////////////////

const run = ()=>{
    for(let i = 0; i< player.speed; i++){
        Wall()
        if(player.right && !player.wall){
            player.x += player.speed
        }
        else if (player.left && !player.wall){
        player.x += player.speed * -1 
        }
    }
}

const Ground = () => {
    player.isGround = false

    player.isGround = field.some((e)=>{
        return e.some((ev)=>{
            player.groundY = ev.y
            return (Math.abs(ev.y - 64 - player.y) < 10 && Math.abs(ev.x - player.x)< 60 && ev.contact && (ev.num === 1 || ev.num === 2 || ev.num === 3 ||ev.num === 4 || ev.num === 7 || ev.num === 8))
        })
    }) 
}

const Wall = ()=>{
    player.wall = false
    for(let y = 0; y< 19; y++){
        for(let x= 0; x< 50; x++){
            if(field[y][x].contact){
                if(player.right){
                    if(Math.abs(field[y][x].x - (player.x+55)) < 10 && Math.abs(field[y][x].y - player.y)< 58){
                        player.x = field[y][x].x - 60
                        player.wall = true
                    }
                }
                else if(player.left){
                    if(Math.abs((field[y][x].x + 55) - player.x) < 10 && Math.abs(field[y][x].y - player.y)< 58){
                        player.x = field[y][x].x + 60
                        player.wall = true 
                    }
                }
                else if(player.dx < 0){
                    if(Math.abs((field[y][x].x + 55) - player.x) < 10 && Math.abs(field[y][x].y - player.y)< 58){
                        player.x = field[y][x].x + 60
                        player.wall = true 
                    }
                }
                else if(player.dx > 0){
                    if(Math.abs(field[y][x].x - (player.x+55)) < 10 && Math.abs(field[y][x].y - player.y)< 58){
                        player.x = field[y][x].x - 60
                        player.wall = true
                    }
                }
                if(player.x < 3){
                    player.x = 4
                    player.wall = true
                }
                if(player.x + 60 > canv.width - 3){
                    player.x = canv.width-64
                    player.wall = true
                }
            }
        } 
    }

}
const Ceiling = () =>{
    player.ceiling = false

    player.ceiling = field.some((e)=>{
        return e.some((ev)=>{
            player.ceilingY = ev.y + 64
            return (Math.abs(ev.y + 64 - player.y) < 15 && Math.abs(ev.x - player.x)< 55 && ev.contact && (ev.num === 1 || ev.num === 2 || ev.num === 3 || ev.num === 5 || ev.num === 6))
        })
    }) 
    if(player.ceiling){
        player.y =  player.ceilingY
    }
}

const grav = () => {
        Ground()
        if(player.isGround){
            player.jump = 0
            player.gravSpeed = 0
            player.y = player.groundY-64
            return
        }

        if(player.gravSpeed < 12){player.gravSpeed += 0.3}
        player.y += player.gravSpeed
       

}

gravInterval = setInterval(grav,10)

const jump = () => {
    Ceiling()
    if(player.jumpSpeed > 0 && !player.ceiling){
        player.jumpSpeed -= 0.2
        player.y -= player.jumpSpeed
    }
    else if (!gravInterval){
        clearInterval(jumpInterval)
        jumpInterval = null
        checkAnimations()
        gravInterval = setInterval(grav,10)
    }       
    
}


const knifeFly = ()=>{
    if(knifes.length){
        for(let i = 0; i< knifes.length; i++){      
            knifes[i].x += knifes[i].dx
            knifes[i].y += knifes[i].dy
            if(knifes[i].x < -200 || knifes[i].x> canv.width+200 || knifes[i].y < -200 || knifes[i].y > canv.height+200 ||  field[Math.floor(knifes[i].y/64)][Math.floor(knifes[i].x/64)].contact ){
                knifes.splice(i, 1)
            }
        }
    }
}

setInterval(knifeFly,10) 

const jerk = (x, y)=>{
    if(!player.jerkLength <= 0){  
        for(let i = 0; i< 2; i++){
            Ceiling()
            Wall()
            if(!player.isGround || player.dy > 0){
                Ground()
                if(player.isGround){
                    player.jerkLength = 0 
                    return
                }
            }
            if(player.ceiling || player.wall){
                player.jerkLength = 0 
                return
            }
            player.x += player.dx
            player.y += player.dy
        }
        player.jerkLength --
        checkAnimations()
    }
    else{
        player.jerk = false
        checkAnimations()
        clearInterval(jerkInterval)
        jerkInterval = null
        if(!gravInterval){
            gravInterval = setInterval(grav,10)
        }
    }
}