// Target class (position and width)
class Target
{
  constructor(x, y, w, l, id)
  {
    this.x      = x;
    this.y      = y;
    this.width  = w;
    this.label  = l;
    this.id     = id;
  }
  
  // Checks if a mouse click took place
  // within the target
  clicked(mouse_x, mouse_y)
  {
    let withinX = mouse_x >= (this.x - (this.width*1.7)/2) && mouse_x <= (this.x +(this.width*1.7)/2);
    let withinY = mouse_y >= (this.y - this.width/4) && mouse_y <= (this.y + this.width/4);

    return withinX && withinY;
  }
  
  // Draws the target (i.e., a circle)
  // and its label
  draw()
  {
    // Draw target
    textAlign(CENTER);
    textFont("Arial", 18);
    if (this.label.slice(-1) == 'a' || this.label.slice(-1) == 'á') {
      fill(255, 128, 128); // Pastel Red
    } else if (this.label.slice(-1) == 'd') { 
      fill(128, 255, 128); // Pastel Green
    } else if (this.label.slice(-1) == 'e' || this.label.slice(-1) =='é') { 
      fill(128, 128, 255); // Pastel Blue
    } else if (this.label.slice(-1) == 'g') {    
      fill(255, 255, 128); // Pastel Yellow
    } else if (this.label.slice(-1) == 'h') {
      fill(200, 160, 255); // Pastel Purple
    } else if (this.label.slice(-1) == 'i') {
      fill(255, 179, 128); // Pastel Orange
    } else if (this.label.slice(-1) == 'k') {
      fill(255, 182, 193); // Pastel Pink
    } else if (this.label.slice(-1) == 'l') {            
      fill(128, 255, 213); // Pastel Turquoise
    } else if (this.label.slice(-1) == 'm') { 
      fill(230, 190, 255); // Pastel Lavender
    } else if (this.label.slice(-1) == 'n') {
      fill(170, 255, 195); // Pastel Mint Green
    } else if (this.label.slice(-1) == 'o') {
      fill(255, 218, 185); // Pastel Peach 
    } else if (this.label.slice(-1) == 'r') {
      fill(135, 206, 235); // Pastel Sky Blue
    } else if (this.label.slice(-1) == 's') {
      fill(190, 255, 170); // Pastel Lime
    } else if (this.label.slice(-1) == 't') {
      fill(244, 154, 194); // Pastel Magenta
    } else if (this.label.slice(-1) == 'u') {
      fill(255, 253, 208); // Pastel Cream
    } else if (this.label.slice(-1) == 'v') {
      fill(255, 160, 122); // Pastel Salmon
    } else if (this.label.slice(-1) == 'y') {
      fill(199, 150, 255); // Pastel Violet
    } else if (this.label.slice(-1) == 'z') {
      fill(150, 255, 255); // Pastel Teal
    }

      
    rectMode(CENTER);
    rect(this.x, this.y, this.width*1.7, this.width/2);
    rectMode(CORNER);
    
    // Draw label
    fill(color(0,0,0));
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    textFont("Arial", this.width/4);
    text(this.label, this.x, this.y);
  }
}