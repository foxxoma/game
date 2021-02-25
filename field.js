class FIELD {
    constructor(y, x){
        this.y = y*64,
        this.x = x*64,
        this.tree = false,
        this.bush = false,
        this.pine = false,
        this.contact = false

    }
    draw(){
        if(this.num === 1){
            ctx.drawImage(platform1, this.x, this.y)
        }
        if(this.num === 2){
            ctx.drawImage(platform2, this.x, this.y)
        }
        if(this.num === 3){
            ctx.drawImage(platform3, this.x, this.y)
        }
        if(this.num === 4){
            ctx.drawImage(platform4, this.x, this.y)
        }
        if(this.num === 5){
            ctx.drawImage(platform5, this.x, this.y)
        }
        if(this.num === 6){
            ctx.drawImage(platform6, this.x, this.y)
        }
        if(this.num === 7){
            ctx.drawImage(platform7, this.x, this.y)
        }
        if(this.num === 8){
            ctx.drawImage(platform8, this.x, this.y)
        }
        if(this.num === 9){
            ctx.drawImage(platform9, this.x, this.y)
        }
        

        if(this.tree){
            ctx.drawImage(tree, this.x, this.y-256)
        }
        if(this.pine){
            ctx.drawImage(pine, this.x, this.y-256)
        }
        if(this.bush){
            ctx.drawImage(bush, this.x, this.y-64)
        }
    }
}

const field = [];

const fieldStart = () =>{
    for(let y = 0; y< 19; y++){
        field[y] = []
        for(let x= 0; x< 50; x++){
            field[y][x] = new FIELD(y,x)
            field[y][x].num = 0;
        }
    }
    fieldCreate()

}



const spCreate = (x, y, len)=> {
    for(let i = 0; i< len; i++){
        if(i === 0){field[y][x+i].num = 1}
        else if(i === len - 1){
            field[y][x+i].num = 3
        }
        else {
            field[y][x+i].num = 2
        }
    }
}
const spCreatePlatform = (x, y, len)=> {
    for(let i = 0; i< len; i++){
        field[y][x+i].num = 2
    }
}

const spCreateWall = (x, y, len)=> {
    for(let i = 0; i< len; i++){
        field[y+i][x].num = 9
    }
}




