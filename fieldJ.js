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
    Field.coordinates[7][4].num = 1
    Field.coordinates[10][23].num = 1
    Field.coordinates[14][30].num = 1
    Field.coordinates[15][4].num = 1
    Field.coordinates[18][0].num = 1
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
    Field.coordinates[6][20].num = 3; Field.coordinates[6][35].num = 3
    Field.coordinates[9][2].num = 3; Field.coordinates[9][29].num = 3; Field.coordinates[9][48].num = 3
    Field.coordinates[12][4].num = 3
    Field.coordinates[14][8].num = 3
    Field.coordinates[18][49].num = 3
    //4
    Field.coordinates[5][8].num = 4; Field.coordinates[5][18].num = 4; Field.coordinates[5][22].num = 4; Field.coordinates[5][26].num = 4; Field.coordinates[5][32].num = 4
    Field.coordinates[7][45].num = 4
    Field.coordinates[9][36].num = 4
    //5
    Field.coordinates[6][18].num = 5; Field.coordinates[6][22].num = 5; Field.coordinates[6][32].num = 5
    Field.coordinates[9][45].num = 5
    Field.coordinates[12][0].num = 5
    Field.coordinates[16][16].num = 5
    Field.coordinates[18][17].num = 5;Field.coordinates[18][32].num = 5;Field.coordinates[18][44].num = 5;Field.coordinates[18][48].num = 5;
    //6
    Field.coordinates[6][26].num = 6
    Field.coordinates[7][8].num = 6
    Field.coordinates[10][26].num = 6
    Field.coordinates[14][36].num = 6
    Field.coordinates[15][6].num = 6
    Field.coordinates[16][11].num = 6
    Field.coordinates[18][10].num = 6; Field.coordinates[18][23].num = 6; Field.coordinates[18][42].num = 6; Field.coordinates[18][46].num = 6
    //7
    Field.coordinates[9][0].num = 7; Field.coordinates[9][26].num = 7
    Field.coordinates[14][6].num = 7
    Field.coordinates[15][11].num = 7;
    Field.coordinates[16][10].num = 7; Field.coordinates[16][23].num = 7; Field.coordinates[16][42].num = 7; Field.coordinates[16][46].num = 7
    //8
    Field.coordinates[15][16].num = 8
    Field.coordinates[16][17].num = 8; Field.coordinates[16][32].num = 8; Field.coordinates[16][44].num = 8; Field.coordinates[16][48].num = 8
    //9
    spCreateWall(8,6,1)
    spCreateWall(45,8,1)
    spCreateWall(0,10,2); spCreateWall(36,10,4)
    spCreateWall(10,17,1); spCreateWall(17,17,1); spCreateWall(23,17,1); spCreateWall(32,17,1), spCreateWall(42,17,1); spCreateWall(44,17,1); spCreateWall(46,17,1); spCreateWall(48,17,1)
    //dec
    Field.coordinates[18][38].tree = true
    Field.coordinates[16][26].pine = true
    Field.coordinates[15][11].tree = true
    Field.coordinates[7][5].pine = true
    Field.coordinates[3][24].tree = true
    Field.coordinates[18][20].tree = true
    Field.coordinates[3][32].pine = true
    Field.coordinates[3][42].pine = true
    Field.coordinates[3][39].tree = true

    for(let y = 0; y< 19; y++){
        for(let x= 0; x< 50; x++){
            if(Field.coordinates[y][x].num > 0){
                Field.coordinates[y][x].contact = true
            }
            if(Field.coordinates[y][x].num === 2){
                let random = Math.floor(Math.random() * 3)
                if(random === 1){
                    Field.coordinates[y][x].bush = true
                }
            }
        }
    }
    
}

