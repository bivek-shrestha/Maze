let m = document.querySelector(".maze")
let ctx = m.getContext("2d");
let current;
let final;
let mazeComplete = false;

class maze{
    constructor(size, rows, columns){
        this.size = size;//size in pixels 
        this.rows = rows; 
        this.columns = columns ;
        this.grid = [];
        this.stack = [];
        

    }
    
    set(){
        for (let r = 0; r < this.rows ; r++){
            let row = [];
            for (let c = 0; c<this.columns; c++){
                let cell = new Cell(r, c, this.grid, this.size);
                row.push(cell);
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];//cell objects current 
        this.grid[this.rows-1][this.columns-1].final=true;


    }
    draw(){
       m.width = this.size;
       m.height = this.size;
       m.style.background = 'black';
       current.visited = true;
       for (let r = 0; r < this.rows ; r++){
        for (let c = 0; c<this.columns; c++){
            let grid = this.grid;
            grid[r][c].displaycell(this.size, this.rows, this.columns);
        }
        
    }
    let next = current.findneighbors();

    if(next){

            next.visited = true;

            this.stack.push(current);
            
            current.highlight(this.rows, this.columns);

            current.removeWalls(current, next);

            current = next;

            

        }

       else if (this.stack.length>0){
            let prevCell = this.stack.pop();
            current = prevCell;
            current.highlight(this.rows, this.columns);

        }

        if (this.stack.length === 0){

            mazeComplete = true;
            return;
            
        }

       
       window.requestAnimationFrame(()=>{

           this.draw();

       });
    }
   

}
class Cell{
    constructor (rowNum , colNum ,mazeGrid , mazeSize){

        this.rowNum = rowNum;
        this.colNum = colNum;
        this.mazeGrid = mazeGrid;
        this.mazeSize = mazeSize;
        this.visited = false;
        this.final = false;
        this.walls = {
            topWall : true,
            rightWall : true,
            bottomWall : true,
            leftWall: true,

        };
    }
    drawTop(x, y, rows, columns, size ){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x+size/columns,y);
        ctx.stroke();
    }
    drawRight(x, y,rows, columns, size ){
        ctx.beginPath();
        ctx.moveTo(x+size/columns,y);
        ctx.lineTo(x+size/columns,y+size/rows);
        ctx.stroke();
    }
    drawBottom(x, y,rows, columns, size ){
        ctx.beginPath();
        ctx.moveTo(x+size/columns,y+size/rows);
        ctx.lineTo(x,y+size/rows);
        ctx.stroke();
    }
    drawLeft(x, y,rows, columns, size ){
        ctx.beginPath();
        ctx.moveTo(x,y+size/rows);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    displaycell(size, rows, columns){
        let x = this.colNum*(size/columns);
        let y = this.rowNum*(size/rows);
        ctx.strokeStyle='white';
        ctx.fillStyle = 'black';
        ctx.lineWidth = 5;
        if (this.walls.topWall) this.drawTop(x,y,rows, columns , size);
        if (this.walls.rightWall) this.drawRight(x,y,rows, columns , size);
        if (this.walls.leftWall) this.drawLeft(x,y,rows, columns , size);
        if (this.walls.bottomWall) this.drawBottom(x,y,rows, columns , size);
        if(this.visited){
            ctx.fillRect(x+2, y+2, size/columns-2, size/rows-2);

        }
        if(this.final){
            
            ctx.fillStyle = "rgb(83, 247, 43)";
            ctx.fillRect(x + 1, y + 1, size / columns - 2, size / rows - 2);

        }
        
    }
    findneighbors(){
        let row = this.rowNum;
        let col = this.colNum;
        let grid = this.mazeGrid;
        let neighbors =[];

        let top = row !== 0?grid[row-1][col]:undefined;
        let right = col !== (grid.length - 1)?grid[row][col+1]:undefined;
        let bottom = row !== (grid.length - 1)?grid[row+1][col]:undefined;
        let left = col !== 0?grid[row][col-1]:undefined;

        if (top && !top.visited) neighbors.push(top);
        if (right && !right.visited) neighbors.push(right);
        if (bottom && !bottom.visited) neighbors.push(bottom);
        if (left && !left.visited) neighbors.push(left);

        if (neighbors.length!==0 ){
            let random = Math.floor(Math.random()*neighbors.length);
            return neighbors[random];

        }
        else {
            return undefined;
        }
    }
    removeWalls(cell1, cell2){

        let dx = cell1.colNum - cell2.colNum;
        let dy = cell1.rowNum - cell2.rowNum;

        if(dx==1){
            cell1.walls.leftWall =false;
            cell2.walls.rightWall = false;
        }
        if(dx==-1){
            cell1.walls.rightWall =false;
            cell2.walls.leftWall= false;
        }
        if(dy==1){
            cell1.walls.topWall =false;
            cell2.walls.bottomWall = false;
        }
        if(dy==-1){
            cell1.walls.bottomWall =false;
            cell2.walls.topWall = false;
        }



    }
    highlight(rows, columns){

        let x = this.colNum*(this.mazeSize/columns);
        let y = this.rowNum*(this.mazeSize/rows);


        if(mazeComplete){

            ctx.fillStyle = 'blue';
            ctx.fillRect(x, y, this.mazeSize/columns-1, this.mazeSize/rows-1);

        }
    
        else{

            ctx.fillStyle = 'green';
            ctx.fillRect(x, y, this.mazeSize/columns-2, this.mazeSize/rows-2);

        }
    }

   
}

