Cords = {}

var database

var ColorInput

var ChooseColorText

var CurrentCordNumber

var Drawing_ref

function setup() {
  database = firebase.database();

  var canvas = createCanvas(displayWidth, 400);

  Drawing_ref = database.ref('drawings')

  canvas.parent('canvascontainer')

  var ClearButton = createButton('Clear canvas');
  ClearButton.position(displayWidth/2, 200);

  ColorInput = createInput("red")
  ColorInput.position(displayWidth/2, 400)

  var ChooseColorText = createElement("h2")
  ChooseColorText.html("Choose a color below!")
  ChooseColorText.position(displayWidth/2 - 30, 350);

  StrokeSizeInput = createInput("8")
  StrokeSizeInput.position(displayWidth/2 - 400, 400)

  var StrokeSizeText = createElement("h2")
  StrokeSizeText.html("Choose a stroke size below!")
  StrokeSizeText.position(displayWidth/2 - 450  , 350);

  ClearButton.mousePressed(
    function()
    {

      clear()

      database.ref("/").update({
        drawings: null
      })

      Cords = {}
    }
  )

  Drawing_ref.on("value", function(data)

  {
    var Positons = data.val()

    for (var pos in Positons)
    {
      if (Cords[pos] == undefined) // to reduce lag and memory leaks
      {
        Cords[pos] = Positons[pos]
      }
    }

  })
}

function draw()
{

  for (var i in Cords)
  {
    push()
    stroke(Cords[i].color)
    strokeWeight(Cords[i].strokeSize)
    line(Cords[i].x, Cords[i].y, Cords[i].x + 10, Cords[i].y)
    pop()
  }

 //console.log(Cords.length)
  
}


function mouseDragged() 
{ 
 strokeWeight(10);

 //StoreCordLine(Cords, mouseX, mouseX, mouseY)

 var CordDetails = {
   x: mouseX,
   y: mouseY,
  color: ColorInput.value(),
  strokeSize: StrokeSizeInput.value()
 }

 Drawing_ref.push(CordDetails)
 //line(mouseX, mouseY, mouseX + 10, mouseY); // double lines for smooth


}
