"use strict";

// Global variables that are set and used
// across the application
let gl;

var myCube = null;
var myCylinder = null;
var myCone = null;
var mySphere = null;

// GLSL programs
let globalProgram;

// VAOs for the objects

// textures
let stemTexture;
let tableTexture;
let sphereTexture;
let coneTexture;

// rotation
let curTexture = "globe";

var anglesReset = [30.0, 30.0, 0.0];
var cube_angles = [30.0, 30.0, 0.0];
var sphere_angles = [180.0, 180.0, 0.0];
var angles = sphere_angles;
var angleInc = 5.0;

//
// create shapes and VAOs for objects.
// Note that you will need to bindVAO separately for each object / program based
// upon the vertex attributes found in each program
//
function createShapes() {
  myCylinder = new Cylinder(19, 10);
  myCylinder.VAO = bindVAO(myCylinder, globalProgram);

  myCube = new Cube(4);
  myCube.VAO = bindVAO(myCube, globalProgram);

  mySphere = new Sphere(10, 15);
  mySphere.VAO = bindVAO(mySphere, globalProgram);

  myCone = new Cone(10, 13);
  myCone.VAO = bindVAO(myCone, globalProgram);
}

//
// Here you set up your camera position, orientation, and projection
// Remember that your projection and view matrices are sent to the vertex shader
// as uniforms, using whatever name you supply in the shaders
//
function setUpCamera(program) {
  gl.useProgram(program);

  // set up your projection

  // set up your view

  // let viewMatrix = glMatrix.mat4.create();
  // glMatrix.mat4.lookAt(viewMatrix, [0, 4, -13], [0, 0, 0], [0, 1, 0]);
  // gl.uniformMatrix4fv(program.uViewT, false, viewMatrix);

  // let projMatrix = glMatrix.mat4.create();
  // glMatrix.mat4.perspective(projMatrix, radians(60), 1, 0, null);
  // gl.uniformMatrix4fv(program.uProjT, false, projMatrix);
  // console.log("Camera  Space Initialized");

  let projMatrix = glMatrix.mat4.create();

  glMatrix.mat4.perspective(projMatrix, radians(90), 1, 0, null);

  gl.uniformMatrix4fv(program.phonguProjT, false, projMatrix);

  // set up your view
  // defaut is at (0,0,-5) looking at the origin
  let viewMatrix = glMatrix.mat4.create();
  glMatrix.mat4.lookAt(viewMatrix, [0, 6, -9], [0, 0, 0], [0, 1, 0]);
  gl.uniformMatrix4fv(program.phonguViewT, false, viewMatrix);
}

//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
// function setUpTextures() {
//   // flip Y for WebGL
//   // gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

//   // get some texture space from the gpu

//   // load the actual image
//   var worldImage = document.getElementById("");
//   worldImage.crossOrigin = "";

//   // bind the texture so we can perform operations on it

//   // load the texture data

//   // set texturing parameters
// }

function doLoad(theTexture, theImage) {
  gl.bindTexture(gl.TEXTURE_2D, theTexture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, theImage);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.bindTexture(gl.TEXTURE_2D, null);

  draw();
}

//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
//
function setUpTextures() {
  stemTexture = gl.createTexture();
  // gl.bindTexture(gl.TEXTURE_2D, newTexture);

  // loading the personalized image 1_earth_16k.jpg
  var im_age = new Image();
  im_age.src = "darkGray.jpg";

  im_age.crossOrigin = "";
  im_age.onload = () => {
    doLoad(stemTexture, im_age);
  };

  tableTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tableTexture);
    
    // loading the personalized image
    var newImage = new Image();
    newImage.src = 'darkWood.jpg';

    newImage.onload = () => {
        doLoad(tableTexture, newImage)
    };

    sphereTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
      
      // loading the personalized image
      var newnewImg = new Image();
      newnewImg.src = 'baseball.jpg';
  
      newnewImg.onload = () => {
          doLoad(sphereTexture, newnewImg)
      };

    coneTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, coneTexture);
      
      // loading the personalized image
      var ig = new Image();
      ig.src = 'offWhite.jpg';
  
      ig.onload = () => {
          doLoad(coneTexture, ig)
      };
}

function setUpPhong(program, x, y, z, x1, y1, z1, x2, y2, z2, x3, y3, z3) {
  gl.useProgram(program);
  var aL = gl.getUniformLocation(program, "ambientLight");
  gl.uniform3fv(aL, [x, y, z]);
  var lC = gl.getUniformLocation(program, "lightColor");
  gl.uniform3fv(lC, [x1, y1, z1]);
  var lP = gl.getUniformLocation(program, "lightPosition");
  gl.uniform3fv(lP, [x2, y2, z2]);
  var bC = gl.getUniformLocation(program, "baseColor");
  gl.uniform3fv(bC, [x3, y3, z3]);
  var specHighlightColor = gl.getUniformLocation(program, "specHighlightColor");
  gl.uniform3fv(specHighlightColor, [1.5, 1.5, 1.5]);
  var ka = gl.getUniformLocation(program, "ka");
  gl.uniform1f(ka, 1);
  var ks = gl.getUniformLocation(program, "ks");
  gl.uniform1f(ks, 0.1);
  var kd = gl.getUniformLocation(program, "kd");
  gl.uniform1f(kd, 0.5);
  var ke = gl.getUniformLocation(program, "ke");
  gl.uniform1f(ke, 1);
}

//  This function draws all of the shapes required for your scene
function drawShapes(program) {
  gl.useProgram(program);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, stemTexture);
  
  drawTable();
  drawStem0();
  drawStem1();
  drawStem2();
  drawStem3();
  drawCone();
  drawBall();
  drawBase();

  function drawBall() {
    let sphereMatrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(sphereMatrix, sphereMatrix, [0.3, 0.3, 0.3]);
    glMatrix.mat4.translate(sphereMatrix, sphereMatrix, [0.7, 2, 0]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, sphereTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, sphereMatrix);
    gl.bindVertexArray(mySphere.VAO);
    gl.drawElements(gl.TRIANGLES, mySphere.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawBase() {
    let coneMatrix0 = glMatrix.mat4.create();
    glMatrix.mat4.translate(coneMatrix0, coneMatrix0, [-0.62, 0.73, 0]);
    glMatrix.mat4.rotateZ(coneMatrix0, coneMatrix0, radians(180));
    glMatrix.mat4.scale(coneMatrix0, coneMatrix0, [0.4, 0.035, 0.4]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, stemTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, coneMatrix0);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawCone() {
    let coneMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(coneMatrix, coneMatrix, [-0.33, 0.1, 0]);
    glMatrix.mat4.rotateZ(coneMatrix, coneMatrix, radians(100));
    glMatrix.mat4.scale(coneMatrix, coneMatrix, [0.5, 0.35, 0.5]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, coneTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, coneMatrix);
    gl.bindVertexArray(myCone.VAO);
    gl.drawElements(gl.TRIANGLES, myCone.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawStem3() {
    let cylinderMatrix3 = glMatrix.mat4.create();
    glMatrix.mat4.translate(cylinderMatrix3, cylinderMatrix3, [-0.54, 0.40, 0]);
    glMatrix.mat4.rotateZ(cylinderMatrix3, cylinderMatrix3, radians(-35));
    glMatrix.mat4.scale(cylinderMatrix3, cylinderMatrix3, [0.05, 0.4, 0.2]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, stemTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix3);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawStem2() {
    let cylinderMatrix1 = glMatrix.mat4.create();
    glMatrix.mat4.translate(cylinderMatrix1, cylinderMatrix1, [-0.54, 0.62, 0]);
    glMatrix.mat4.rotateZ(cylinderMatrix1, cylinderMatrix1, radians(50));
    glMatrix.mat4.scale(cylinderMatrix1, cylinderMatrix1, [0.05, 0.2, 0.2]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, stemTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix1);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);
  }
  
  function drawTable() {
    let cubeMatrix = glMatrix.mat4.create();
    glMatrix.mat4.scale(cubeMatrix, cubeMatrix, [1.8, 0.1, 1]);
    glMatrix.mat4.translate(cubeMatrix, cubeMatrix, [0, 8, 0]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, tableTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, cubeMatrix);
    gl.bindVertexArray(myCube.VAO);
    gl.drawElements(gl.TRIANGLES, myCube.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawStem0() {
    let cylinderMatrix0 = glMatrix.mat4.create();
    glMatrix.mat4.translate(cylinderMatrix0, cylinderMatrix0, [-0.7, 0.55, 0]);
    glMatrix.mat4.rotateZ(cylinderMatrix0, cylinderMatrix0, radians(-30));
    glMatrix.mat4.scale(cylinderMatrix0, cylinderMatrix0, [0.05, 0.35, 0.2]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, stemTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix0);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawStem1() {
    let cylinderMatrix = glMatrix.mat4.create();
    glMatrix.mat4.translate(cylinderMatrix, cylinderMatrix, [-0.63, 0.25, 0]);
    glMatrix.mat4.rotateZ(cylinderMatrix, cylinderMatrix, radians(40));
    glMatrix.mat4.scale(cylinderMatrix, cylinderMatrix, [0.05, 0.5, 0.2]);
    gl.uniform1i(program.uTextureValue, 1);
    gl.uniform3fv(program.uTheta, new Float32Array(angles));
    gl.activeTexture(gl.TEXTURE0 + 1);
    gl.bindTexture(gl.TEXTURE_2D, stemTexture);
    gl.uniform1i(program.uAbstractTexture, 1);
    gl.uniformMatrix4fv(program.uModelT, false, cylinderMatrix);
    gl.bindVertexArray(myCylinder.VAO);
    gl.drawElements(gl.TRIANGLES, myCylinder.indices.length, gl.UNSIGNED_SHORT, 0);
  }
}

function initPrograms() {
  const textureVertexShader = getShader("sphereMap-V");
  const textureFragmentShader = getShader("sphereMap-F");

  // Create a program
  let program = gl.createProgram();
  gl.attachShader(program, textureVertexShader);
  gl.attachShader(program, textureFragmentShader);

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Could not initialize shaders");
  }

  // Use this program instance
  gl.useProgram(program);

  program.uModelT = gl.getUniformLocation(program, "modelt");


  program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  program.aUV = gl.getAttribLocation(program, 'aUV');

  program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
  program.uAbstractTexture = gl.getUniformLocation(program,'abstractTexture');
  program.uTextureValue=gl.getUniformLocation(program,'textureValue');
  program.uTheta = gl.getUniformLocation (program, 'theta');

  return program;
}

//shader VAO
function bindVAO(shape, program) {
  var VAO = gl.createVertexArray();
  gl.bindVertexArray(VAO);

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aVertexPosition);
  gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, true, 0, 0);

  let uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aUV);
  gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
  let myIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);
  
  // Do cleanup
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    
    return VAO;
}


/////////////////////////////////////////////////////////////////////////////
//
//  You shouldn't have to edit anything below this line...but you can
//  if you find the need
//
/////////////////////////////////////////////////////////////////////////////

// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  console.log("GOT SHADER SCRIPT as", script);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else if (script.type === "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

//
// compiles, loads, links and returns a program (vertex/fragment shader pair)
//
// takes in the id of the vertex and fragment shaders (as given in the HTML file)
// and returns a program object.
//
// will return null if something went wrong
//
function initProgram(vertex_id, fragment_id) {
  const vertexShader = getShader(vertex_id);
  const fragmentShader = getShader(fragment_id);

  // Create a program
  let program = gl.createProgram();

  // Attach the shaders to this program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Could not initialize shaders");
    return null;
  }

  return program;
}

//
// We call draw to render to our canvas
//
function draw() {
  // Clear the scene
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);


  // draw your shapes
  drawShapes(globalProgram);

  // Clean
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

// Entry point to our application
function init() {
  // Retrieve the canvas
  const canvas = document.getElementById("webgl-canvas");
  if (!canvas) {
    console.error(`There is no canvas with id ${"webgl-canvas"} on this page.`);
    return null;
  }

  // deal with keypress
  window.addEventListener("keydown", gotKey, false);

  // Retrieve a WebGL context
  gl = canvas.getContext("webgl2");
  if (!gl) {
    console.error(`There is no WebGL 2.0 context`);
    return null;
  }

  // deal with keypress
  window.addEventListener("keydown", gotKey, false);

  // Set the clear color to be black
  gl.clearColor(0, 0, 0, 1);

  // some GL initialization
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  gl.cullFace(gl.BACK);
  gl.frontFace(gl.CCW);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.depthFunc(gl.LEQUAL);
  gl.clearDepth(1.0);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //Only for texture

  window.addEventListener('keydown', gotKey ,false);

  globalProgram = initPrograms();

  createShapes();

  setUpTextures();

  setUpCamera(globalProgram);

}
