let form = document.querySelector("#settings");
let size = document.querySelector("#size");
let rowsCols = document.querySelector("#rowscols");
let complete = document.querySelector(".complete");
let reload = document.querySelector(".reload");

complete.style.display="none";
reload.style.display ="none";

let newMaze;
let path = [];

form.addEventListener("submit",mazeGen);//calls mazegen on keydown

document.addEventListener("keydown", play);//calls play on keydown

reload.addEventListener("click", () => {
    location.reload();//refreshes page 
  });




function mazeGen(event){

    event.preventDefault();

    if(size.value < 300 || size.value > 800){
        alert("Please enter size between 400 and 800");
    }

    else if(rowsCols.value < 10 || rowsCols.value > 60){
        alert("Please enter number of rows/columns between 20 and 60");
    }

    else if (rowsCols.value == "" || size.value == ""){
        return alert("Please enter all fields");
    }

    else{

    form.style.display = "none";
    newMaze = new maze(size.value, rowsCols.value , rowsCols.value);
    reload.style.display="block";
    newMaze.set();
    newMaze.draw();
    
    }
}

function play(event){

    if(!mazeComplete) return;
    key = event.key;
    row = current.rowNum;
    col = current.colNum;

    switch (key){
        case "ArrowUp":
            if(!current.walls.topWall){
                let next = newMaze.grid[row-1][col];
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                current.highlight(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
             }
            break;
        case "ArrowRight":
            if(!current.walls.rightWall){
                let next = newMaze.grid[row][col+1];
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                current.highlight(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
                
            }
            break;
        case "ArrowDown":
            if(!current.walls.bottomWall){
                let next = newMaze.grid[row+1][col];
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                current.highlight(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
                
            }
            break;
        case "ArrowLeft":
            if(!current.walls.leftWall){
                let next = newMaze.grid[row][col-1];
                path.push(next);
                current = next;
                newMaze.draw();
                displaypath();
                current.highlight(newMaze.rows, newMaze.columns);
                if (current.final){
                    
                    complete.style.display="block";
                }
                
            }
            break;
        

    }
   
        

}

function displaypath(){
    for (let i = 0; i < path.length; i++){
        path[i].highlight(newMaze.rows, newMaze.columns);
    }
}

