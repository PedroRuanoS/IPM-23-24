// Bake-off #2 -- Seleção em Interfaces Densas
// IPM 2023-24, Período 3
// Entrega: até às 23h59, dois dias úteis antes do sexto lab (via Fenix)
// Bake-off: durante os laboratórios da semana de 18 de Março

// p5.js reference: https://p5js.org/reference/

// Database (CHANGE THESE!)
const GROUP_NUMBER        = 52;      // Add your group number here as an integer (e.g., 2, 3)
const RECORD_TO_FIREBASE  = true;  // Set to 'true' to record user results to Firebase

// Pixel density and setup variables (DO NOT CHANGE!)
let PPI, PPCM;
const NUM_OF_TRIALS       = 12;     // The numbers of trials (i.e., target selections) to be completed
let continue_button;
let legendas;                       // The item list from the "legendas" CSV

// Metrics (DO NOT CHANGE!)
let testStartTime, testEndTime;     // time between the start and end of one attempt (8 trials)
let hits 			      = 0;      // number of successful selections
let misses 			      = 0;      // number of missed selections (used to calculate accuracy)
let database;                       // Firebase DB  

// Study control parameters (DO NOT CHANGE!)
let draw_targets          = false;  // used to control what to show in draw()
let trials;                         // contains the order of targets that activate in the test
let current_trial         = 0;      // the current trial number (indexes into trials array above)
let attempt               = 0;      // users complete each test twice to account for practice (attemps 0 and 1)

// Target list and layout variables
let targets               = [];
const GRID_ROWS           = 8;      // We divide our 80 targets in a 8x10 grid
const GRID_COLUMNS        = 10;     // We divide our 80 targets in a 8x10 grid

// Setup variables
let sortedCities = [];
let cities = [];
let correctSound;    // Sound to play when answer is correct
let wrongSound;     //Sound to play when answer is wrong
let img;

//Flags for target placement
let a_flag = 0;
let d_flag = 0;
let e_flag = 0;
let g_flag = 0;
let h_flag = 0;
let i_flag = 0;
let k_flag = 0;
let l_flag = 0;
let m_flag = 0;
let n_flag = 0;
let o_flag = 0;
let r_flag = 0;
let s_flag = 0;
let t_flag = 0;
let u_flag = 0;
let v_flag = 0;
let y_flag = 0;
let z_flag = 0;

let A_y = 0;
let D_y = 0;
let E_y = 0;
let G_y = 0;
let H_y = 0;
let I_y = 0;
let K_y = 0;
let L_y = 0;
let M_y = 0;
let N_y = 0;
let O_y = 0;
let R_y = 0;
let S_y = 0;
let T_y = 0;
let U_y = 0;
let V_y = 0;
let Y_y = 0;
let Z_y = 0;
let frst_x = 0;
let scd_x = 0;

// Ensures important data is loaded before the program starts
function preload()
{
  // id,name,...
  legendas = loadTable('legendas.csv', 'csv', 'header');
  soundFormats('mp3', 'ogg');
  correctSound = loadSound('sounds/correct.mp3');
  wrongSound = loadSound('sounds/wrong.mp3');
  img = loadImage('example.png');
}

// Runs once at the start
function setup()
{
  for (let r = 0; r < legendas.getRowCount(); r++) 
  {
  cities.push(
  {
    city: legendas.getString(r, 'city'),
    id: parseInt(legendas.getString(r, 'id')) 
  });
  }

  // Sort the array based on the last letters of the cities
  cities.sort((a, b) => {
    // Get the last character of each city name
    const lastCharA = a.city[a.city.length - 1];
    const lastCharB = b.city[b.city.length - 1];
    
    // Compare the last characters to determine the order
    return lastCharA.localeCompare(lastCharB);
  });
  
  let index = 1;
  while (index < cities.length) {
    
    let citiesSlice = [];
    citiesSlice.push(cities[index - 1]);
    
    while(index < cities.length && (cities[index - 1].city.slice(-1) == cities[index].city.slice(-1) || cities[index].city.slice(-1) == 'á' || cities[index].city.slice(-1) == 'é')) {
      citiesSlice.push(cities[index]);
      index++;
    }
    
    citiesSlice.sort((a, b) => a.city.localeCompare(b.city));
    sortedCities = [...sortedCities,...citiesSlice];
    
    index++;
  }

  
  createCanvas(700, 500);    // window size in px before we go into fullScreen()
  frameRate(60);             // frame rate (DO NOT CHANGE!)
  
  randomizeTrials();         // randomize the trial order at the start of execution
  drawUserIDScreen(img);        // draws the user start-up screen (student ID and display size)
}

// Runs every frame and redraws the screen
function draw()
{
  if (draw_targets && attempt < 2)
  {     
    // The user is interacting with the 6x3 target grid
    background(color(0,0,0));        // sets background to black
    
    // Print trial count at the top left-corner of the canvas
    textFont("Arial", 16);
    fill(color(255,255,255));
    textAlign(LEFT);
    text("Trial " + (current_trial + 1) + " of " + trials.length, 50, 20);

    // Draw all targets
	for (var i = 0; i < legendas.getRowCount(); i++) targets[i].draw();
    
    //Draw letters labels
    textFont("Arial", 45);
    fill(color(255,255,255));
    textAlign(RIGHT, TOP);
    fill(255, 128, 128); // Pastel Red
    text("A", frst_x, A_y+12);
    fill(128, 255, 128); // Pastel Green
    text("D", frst_x, D_y+12);
    fill(128, 128, 255); // Pastel Blue
    text("E", frst_x, E_y+12);
    fill(255, 255, 128); // Pastel Yellow
    text("G", frst_x, G_y+12);
    fill(200, 160, 255); // Pastel Purple
    text("H", frst_x, H_y+12);
    fill(255, 179, 128); // Pastel Orange
    text("I", frst_x, I_y+12);
    fill(255, 182, 193); // Pastel Pink
    text("K", frst_x, K_y+12);
    fill(128, 255, 213); // Pastel Turquoise
    text("L", frst_x, L_y+12);
    fill(230, 190, 255); // Pastel Lavender
    text("M", frst_x, M_y+12);
    fill(170, 255, 195); // Pastel Mint Green
    text("N", scd_x, N_y+12);
    fill(255, 218, 185); // Pastel Peach
    text("O", scd_x, O_y+12);
    fill(135, 206, 235); // Pastel Sky Blue
    text("R", scd_x, R_y+12);
    fill(190, 255, 170); // Pastel Lime
    text("S", scd_x, S_y+12);
    fill(244, 154, 194); // Pastel Magenta
    text("T", scd_x, T_y+12);
    fill(255, 253, 208); // Pastel Cream
    text("U", scd_x, U_y+12);
    fill(255, 160, 122); // Pastel Salmon
    text("V", scd_x, V_y+12);
    fill(199, 150, 255); // Pastel Violet
    text("Y", scd_x, Y_y+12);
    fill(150, 255, 255); // Pastel Teal
    text("Z", scd_x, Z_y+12);
    
    // Draws the target label to be selected in the current trial. We include 
    // a black rectangle behind the trial label for optimal contrast in case 
    // you change the background colour of the sketch (DO NOT CHANGE THESE!)
    fill(color(0,0,0));
    rect(0, height - 40, width, 40);
 
    textFont("Arial", 20); 
    fill(color(255,255,255)); 
    textAlign(CENTER); 
    text(legendas.getString(trials[current_trial],1), width/2, height - 20);
  }
}

// Print and save results at the end of 54 trials
function printAndSavePerformance()
{
  // DO NOT CHANGE THESE! 
  let accuracy			= parseFloat(hits * 100) / parseFloat(hits + misses);
  let test_time         = (testEndTime - testStartTime) / 1000;
  let time_per_target   = nf((test_time) / parseFloat(hits + misses), 0, 3);
  let penalty           = constrain((((parseFloat(95) - (parseFloat(hits * 100) / parseFloat(hits + misses))) * 0.2)), 0, 100);
  let target_w_penalty	= nf(((test_time) / parseFloat(hits + misses) + penalty), 0, 3);
  let timestamp         = day() + "/" + month() + "/" + year() + "  " + hour() + ":" + minute() + ":" + second();
  
  textFont("Arial", 18);
  background(color(0,0,0));   // clears screen
  fill(color(255,255,255));   // set text fill color to white
  textAlign(LEFT);
  text(timestamp, 10, 20);    // display time on screen (top-left corner)
  
  textAlign(CENTER);
  text("Attempt " + (attempt + 1) + " out of 2 completed!", width/2, 60); 
  text("Hits: " + hits, width/2, 100);
  text("Misses: " + misses, width/2, 120);
  text("Accuracy: " + accuracy + "%", width/2, 140);
  text("Total time taken: " + test_time + "s", width/2, 160);
  text("Average time per target: " + time_per_target + "s", width/2, 180);
  text("Average time for each target (+ penalty): " + target_w_penalty + "s", width/2, 220);

  // Saves results (DO NOT CHANGE!)
  let attempt_data = 
  {
        project_from:       GROUP_NUMBER,
        assessed_by:        student_ID,
        test_completed_by:  timestamp,
        attempt:            attempt,
        hits:               hits,
        misses:             misses,
        accuracy:           accuracy,
        attempt_duration:   test_time,
        time_per_target:    time_per_target,
        target_w_penalty:   target_w_penalty,
  }
  
  // Sends data to DB (DO NOT CHANGE!)
  if (RECORD_TO_FIREBASE)
  {
    // Access the Firebase DB
    if (attempt === 0)
    {
      firebase.initializeApp(firebaseConfig);
      database = firebase.database();
    }
    
    // Adds user performance results
    let db_ref = database.ref('G' + GROUP_NUMBER);
    db_ref.push(attempt_data);
  }
}

// Mouse button was pressed - lets test to see if hit was in the correct target
function mousePressed() 
{
  // Only look for mouse releases during the actual test
  // (i.e., during target selections)
  if (draw_targets)
  {
    for (var i = 0; i < legendas.getRowCount(); i++)
    {
      // Check if the user clicked over one of the targets
      if (targets[i].clicked(mouseX, mouseY)) 
      {
        // Checks if it was the correct target
        if (targets[i].id === trials[current_trial] + 1){
          correctSound.play();
          hits++;
        }
        else {
          wrongSound.play();
          misses++;
        }
        current_trial++;              // Move on to the next trial/target
        break;
      }
    }
    
    // Check if the user has completed all trials
    if (current_trial === NUM_OF_TRIALS)
    {
      testEndTime = millis();
      draw_targets = false;          // Stop showing targets and the user performance results
      printAndSavePerformance();     // Print the user's results on-screen and send these to the DB
      attempt++;                      
      
      // If there's an attempt to go create a button to start this
      if (attempt < 2)
      {
        continue_button = createButton('START 2ND ATTEMPT');
        continue_button.mouseReleased(continueTest);
        continue_button.position(width/2 - continue_button.size().width/2, height/2 - continue_button.size().height/2);
      }
    }
    // Check if this was the first selection in an attempt
    else if (current_trial === 1) testStartTime = millis(); 
  }
}

// Evoked after the user starts its second (and last) attempt
function continueTest()
{
  // Re-randomize the trial order
  randomizeTrials();
  
  // Resets performance variables
  hits = 0;
  misses = 0;
  
  current_trial = 0;
  continue_button.remove();
  
  // Shows the targets again
  draw_targets = true; 
}

// Creates and positions the UI targets
function createTargets(target_size, screen_width, screen_height)
{
  let y_coord = screen_height*0.03;
  let y_coord2 = screen_height*0.03;
  let space_between = target_size/2;
  let spc_betw_groups = height*0.075;
  
  // Set targets in a 8 x 10 grid
  for (var r = 0; r < GRID_ROWS; r++)
  {
    for (var c = 0; c < GRID_COLUMNS; c++)
    {
      
      // Find the appropriate label and ID for this target
      let legendas_index = c + GRID_COLUMNS * r;
      let target_id = sortedCities[legendas_index].id;
      let target_label = sortedCities[legendas_index].city;
      let last_char = target_label.slice(-1);
      
      let target_x = 40 + (screen_width*0.05 + target_size) * c + target_size/2;        // give it some margin from the left border
      let target_y = (screen_height*0.005 + target_size) * r + target_size/2;
      
      if (last_char == 'a' || last_char == 'á') {
        if (A_y == 0 || frst_x == 0){
          A_y = y_coord;
          frst_x = screen_width*0.075 - target_size/2;
        }
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * a_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord;
        if (a_flag == 3){  //reset flag if necessary
          a_flag = 0;
          y_coord += space_between;
        } else {
          a_flag++;
        }
      }
      
      if (last_char == 'd') {
        if (D_y == 0){
          D_y = y_coord + spc_betw_groups;
        }
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * d_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups;
        if (d_flag == 3){  //reset flag if necessary
          d_flag = 0;
          y_coord += space_between;
        } else {
          d_flag++;
        }
      }
      
      if (last_char == 'e' || last_char == 'é') {
        if (E_y == 0){
          E_y = y_coord + spc_betw_groups*2 - space_between;
        }
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * e_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*2 - space_between;
        if (e_flag == 3){  //reset flag if necessary
          e_flag = 0;
          y_coord += space_between;
        } else {
          e_flag++;
        }
      }
      
      if (last_char == 'g') {
        if (G_y == 0){
          G_y = y_coord + spc_betw_groups*3 - space_between*2;
        }        
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * g_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*3 - space_between*2;
        if (g_flag == 3){  //reset flag if necessary
          g_flag = 0;
          y_coord += space_between;
        } else {
          g_flag++;
        }
      }
      
      if (last_char == 'h') {
        if (H_y == 0){
          H_y = y_coord + spc_betw_groups*4 - space_between*3;
        }   
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * h_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*4 - space_between*3;
        if (h_flag == 3){  //reset flag if necessary
          h_flag = 0;
          y_coord += space_between;
        } else {
          h_flag++;
        }
      }
      
      if (last_char == 'i') {
        if (I_y == 0){
          I_y = y_coord + spc_betw_groups*5 - space_between*3;
        }   
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * i_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*5 - space_between*3;
        if (i_flag == 3){  //reset flag if necessary
          i_flag = 0;
          y_coord += space_between;
        } else {
          i_flag++;
        }
      }
      
      if (last_char == 'k') {
        if (K_y == 0){
          K_y = y_coord + spc_betw_groups*6 - space_between*3;
        }   
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * k_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*6 - space_between*3;
        if (k_flag == 3){  //reset flag if necessary
          k_flag = 0;
          y_coord += space_between;
        } else {
          k_flag++;
        }
      } 
      
      if (last_char == 'l') {
        if (L_y == 0){
          L_y = y_coord + spc_betw_groups*7 - space_between*4;
        }   
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * l_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*7 - space_between*4;
        if (l_flag == 3){  //reset flag if necessary
          l_flag = 0;
          y_coord += space_between;
        } else {
          l_flag++;
        }
      } 
      
      if (last_char == 'm') {
        if (M_y == 0){
          M_y = y_coord + spc_betw_groups*8 - space_between*4;
        }   
        target_x = screen_width*0.075 + (screen_width*0.04 + target_size) * m_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord + spc_betw_groups*8 - space_between*4;
        if (m_flag == 3){  //reset flag if necessary
          m_flag = 0;
          y_coord += space_between;
        } else {
          m_flag++;
        }
      } 
      
      if (last_char == 'n') {
        if (N_y == 0){
          N_y = y_coord2;
          scd_x = screen_width/2 + screen_width*0.075 - target_size/2;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * n_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2;
        if (n_flag == 3){  //reset flag if necessary
          n_flag = 0;
          y_coord2 += space_between;
        } else {
          n_flag++;
        }
      }
      
      if (last_char == 'o') {
        if (O_y == 0){
          O_y = y_coord2 + spc_betw_groups;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * o_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups;
        if (o_flag == 3){  //reset flag if necessary
          o_flag = 0;
          y_coord2 += space_between;
        } else {
          o_flag++;
        }
      }
      
      if (last_char == 'r') {
        if (R_y == 0){
          R_y = y_coord2 + spc_betw_groups*2;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * r_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*2;
        if (r_flag == 3){  //reset flag if necessary
          r_flag = 0;
          y_coord2 += space_between;
        } else {
          r_flag++;
        }
      }
        
      if (last_char == 's') {
        if (S_y == 0){
          S_y = y_coord2 + spc_betw_groups*3;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * s_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*3;
        if (s_flag == 3){  //reset flag if necessary
          s_flag = 0;
          y_coord2 += space_between;
        } else {
          s_flag++;
        }
      }
      
      if (last_char == 't') {
        if (T_y == 0){
          T_y = y_coord2 + spc_betw_groups*4;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * t_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*4;
        if (t_flag == 3){  //reset flag if necessary
          t_flag = 0;
          y_coord2 += space_between;
        } else {
          t_flag++;
        }
      }
      
      if (last_char == 'u') {
        if (U_y == 0){
          U_y = y_coord2 + spc_betw_groups*5 - space_between;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * u_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*5 - space_between;
        if (u_flag == 3){  //reset flag if necessary
          u_flag = 0;
          y_coord2 += space_between;
        } else {
          u_flag++;
        }
      }
      
      if (last_char == 'v') {
        if (V_y == 0){
          V_y = y_coord2 + spc_betw_groups*6 - space_between;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * v_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*6 - space_between;
        if (v_flag == 3){  //reset flag if necessary
          v_flag = 0;
          y_coord2 += space_between;
        } else {
          v_flag++;
        }
      }
      
      if (last_char == 'y') {
        if (Y_y == 0){
          Y_y = y_coord2 + spc_betw_groups*7 - space_between;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * y_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*7 - space_between;
        if (y_flag == 3){  //reset flag if necessary
          y_flag = 0;
          y_coord2 += space_between;
        } else {
          y_flag++;
        }
      }
      
      if (last_char == 'z') {
        if (Z_y == 0){
          Z_y = y_coord2 + spc_betw_groups*8 - space_between;
        }   
        target_x = screen_width/2 + screen_width*0.075 + (screen_width*0.04 + target_size) * z_flag + target_size/2;   // give it some margin from the left border
        target_y = y_coord2 + spc_betw_groups*8 - space_between;
        if (z_flag == 3){  //reset flag if necessary
          z_flag = 0;
          y_coord2 += space_between;
        } else {
          z_flag++;
        }
      }

      let target = new Target(target_x, target_y + 40, target_size, target_label, target_id);
      targets.push(target);
        
    }  
  }
}

// Is invoked when the canvas is resized (e.g., when we go fullscreen)
function windowResized() 
{
  if (fullscreen())
  {
    resizeCanvas(windowWidth, windowHeight);
    
    // DO NOT CHANGE THE NEXT THREE LINES!
    let display        = new Display({ diagonal: display_size }, window.screen);
    PPI                = display.ppi;                      // calculates pixels per inch
    PPCM               = PPI / 2.54;                       // calculates pixels per cm
  
    // Make your decisions in 'cm', so that targets have the same size for all participants
    // Below we find out out white space we can have between 2 cm targets
    let screen_width   = display.width * 2.54;             // screen width (will be converted to cm when passed to createTargets)
    let screen_height  = display.height * 2.54;            // screen height (will be converted to cm when passed to createTargets)
    let target_size    = 2;                                // sets the target size (will be converted to cm when passed to createTargets)
    
    // Creates and positions the UI targets according to the white space defined above (in cm!)
    // 80 represent some margins around the display (e.g., for text)
    createTargets(target_size * PPCM, screen_width*PPCM, screen_height*PPCM);

    // Starts drawing targets immediately after we go fullscreen
    draw_targets = true;
  }
}