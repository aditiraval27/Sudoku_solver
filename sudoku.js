//get a reference to the html holder element
const main = document.body.querySelector("main")
const butt=document.body.querySelector("button")

//iterate for every grid element
var inputIndex=0
for(var at = 0 ; at < 9 ; at++){
    
    var section = document.createElement("section")
    for(var i = 0 ; i < 9 ; i++) {
        var input = document.createElement("input")
        input.inputIndex=inputIndex
        inputIndex++
        section.append(input)
    }
    main.append(section)
}

//get onclick button to run when button is clicked
butt.addEventListener("click" , onclick)
function onclick() {
    //get the set values of all inputs
    var values = [],inputs=[...document.body.querySelectorAll("input")].sort((a,b)=>{
        if(a.inputIndex<b.inputIndex)
            return -1
        else if(a.inputIndex>b.inputIndex)
            return 1
    })
    for(var input of inputs ) {
        values.push(parseFloat(input.value) || 0)
    }
    console.log(values)
    
    solveGrid(values)

    console.log(values)

    for(var index in inputs ) {
        var input=inputs[index]
        input.value=values[index]
    }
}
/*
Solves a sudoku grid.
*/
function solveGrid(grid) {
    //Find the first 0/Blank present in our index.
    var blankIndex = grid.indexOf(0)
    if(blankIndex === -1) return grid //No blank value's index found, must be already solved.
  
    //Get the X, Y position data of our blank field.
    var [x, y] = indexToXY(blankIndex)
  
    //Add in values which are not allowed in this field.
    var usedValues = []
  
    //Add already used row values.
    for(var i = 0;i < 9;i++) usedValues.push(grid[xyToIndex(x, i)])
  
    //Add already used column values.
    for(var i = 0;i < 9;i++) usedValues.push(grid[xyToIndex(i, y)])
  
    //Don't use values already present in the 3x3 grid.
    for(var xSubGrid = x - x % 3;xSubGrid < x - x % 3 + 3; xSubGrid++) {
      for(var ySubGrid = y - y % 3;ySubGrid < y - y % 3 + 3; ySubGrid++) {
        usedValues.push(grid[xyToIndex(xSubGrid, ySubGrid)])
      }
    }
  
    //Get the earliest number from 1-9 which is not present in our usedValues array.
    for(var num = 1; num <= 9; num++) {
      if(usedValues.includes(num)) continue
      grid[blankIndex] = num
      
      //Solve the next possible blank field.
      //This will return true only if the grid is completely solved, otherwise it will set one more field & we will get null back & we will put a blank value in this place for back tracking.
      if(solveGrid(grid)) return grid
    }
  
  
    grid[blankIndex] = 0 //Reset the value to 0 for back tracking.
    return null //No solution found.
  }
  /*
Converts an index to an x and y coordinate.
*/
function indexToXY(index) {
    const x = index % 9
    const y = (index - x) / 9
    return [x, y]
  }
  
  
  
  /*
  Converts X, Y co-ords back to an index.
  */
  function xyToIndex(x, y) {
    return x + y * 9
  }







  