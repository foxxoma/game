const fieldCreate = ()=>{
    //1-3
    spCreate(15,1,4)
    spCreate(4,2,4); spCreate(10,3,3); spCreate(23,3,4); spCreate(30,3,5)
    spCreate(38,3,9)
    spCreate(0,5,3); spCreate(48,6,2)
    spCreate(10,7,3); spCreate(38,7,5)
    spCreate(32,11,3)
    spCreate(15,12,7); spCreate(48,12,2)
    spCreate(43,13,4)
    //1
    field[7][4].num = 1
    field[10][23].num = 1
    field[14][30].num = 1
    field[15][4].num = 1
    field[18][0].num = 1
    //2
    spCreatePlatform(19,6,1); spCreatePlatform(23,6,3); spCreatePlatform(33,6,2)
    spCreatePlatform(5,7,3)
    spCreatePlatform(1,9,1); spCreatePlatform(27,9,2); spCreatePlatform(46,9,2)
    spCreatePlatform(24,10,2)
    spCreatePlatform(1,12,3)
    spCreatePlatform(7,14,1); spCreatePlatform(31,14,5)
    spCreatePlatform(5,15,1); spCreatePlatform(12,15,4)
    spCreatePlatform(24,16,8); spCreatePlatform(43,16,1); spCreatePlatform(47,16,1)
    spCreatePlatform(1,18,9); spCreatePlatform(18,18,5); spCreatePlatform(33,18,9); spCreatePlatform(45,18,1)
    //3
    field[6][20].num = 3; field[6][35].num = 3
    field[9][2].num = 3; field[9][29].num = 3; field[9][48].num = 3
    field[12][4].num = 3
    field[14][8].num = 3
    field[18][49].num = 3
    //4
    field[5][8].num = 4; field[5][18].num = 4; field[5][22].num = 4; field[5][26].num = 4; field[5][32].num = 4
    field[7][45].num = 4
    field[9][36].num = 4
    //5
    field[6][18].num = 5; field[6][22].num = 5; field[6][32].num = 5
    field[9][45].num = 5
    field[12][0].num = 5
    field[16][16].num = 5
    field[18][17].num = 5;field[18][32].num = 5;field[18][44].num = 5;field[18][48].num = 5;
    //6
    field[6][26].num = 6
    field[7][8].num = 6
    field[10][26].num = 6
    field[14][36].num = 6
    field[15][6].num = 6
    field[16][11].num = 6
    field[18][10].num = 6; field[18][23].num = 6; field[18][42].num = 6; field[18][46].num = 6
    //7
    field[9][0].num = 7; field[9][26].num = 7
    field[14][6].num = 7
    field[15][11].num = 7;
    field[16][10].num = 7; field[16][23].num = 7; field[16][42].num = 7; field[16][46].num = 7
    //8
    field[15][16].num = 8
    field[16][17].num = 8; field[16][32].num = 8; field[16][44].num = 8; field[16][48].num = 8
    //9
    spCreateWall(8,6,1)
    spCreateWall(45,8,1)
    spCreateWall(0,10,2); spCreateWall(36,10,4)
    spCreateWall(10,17,1); spCreateWall(17,17,1); spCreateWall(23,17,1); spCreateWall(32,17,1), spCreateWall(42,17,1); spCreateWall(44,17,1); spCreateWall(46,17,1); spCreateWall(48,17,1)
    //dec
    field[18][38].tree = true
    field[16][26].pine = true
    field[15][11].tree = true
    field[7][5].pine = true
    field[3][24].tree = true
    field[18][20].tree = true
    field[3][32].pine = true
    field[3][42].pine = true
    field[3][39].tree = true

    for(let y = 0; y< 19; y++){
        for(let x= 0; x< 50; x++){
            if(field[y][x].num > 0){
                field[y][x].contact = true
            }
            if(field[y][x].num === 2){
                let random = Math.floor(Math.random() * 3)
                if(random === 1){
                    field[y][x].bush = true
                }
            }
        }
    }
}

