
var gl; var index = 0;
var points;

var vPosition, vPosition2;
var bufferId, bufferId2;
var program;

var vertices = new Float32Array([-1, -0.5, 0, -0.5, -0.5, 0.5]);
var vertices2 = new Float32Array([-0.5, 0.5, 0, -0.5, 0.5, 0.5]);

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    
    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices2, gl.STATIC_DRAW );
        /**/

    render();
    
    canvas.addEventListener("click",function(){
        ++index;
        switch (index%3){
            case 0: // Rhombus
                console.log("Successfully got to case 0");
                vertices = new Float32Array([-1, -0.5, 0, -0.5, -0.5, 0.5]);
                vertices2 = new Float32Array([-0.5, 0.5, 0, -0.5, 0.5, 0.5]);
                prep();
                render();
                break;
            case 1: // Triangle
                console.log("Successfully got to case 1");
                vertices = new Float32Array([ -0.5, -0.5, 0, 0.5,  0.5, -0.5]); 
                program = initShaders( gl, "vertex-shader", "fragment-shader" );
                prep();
                render();
                break;
            case 2:  // Square
                console.log("Successfully got to case 2");
                vertices = new Float32Array([ -0.5, -0.5, -0.5,  0.5, 0.5, 0.5 ]);
                vertices2 = new Float32Array([-0.5, -0.5, 0.5, 0.5, 0.5, -0.5]);
                prep();
                render();
                break;
             /**/   
        }
        
    
});

};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    
    if(!(index%3 === 1)){
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
        vPosition2 = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition2, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition2 );
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }
}

function prep(){
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );


    bufferId2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId2 );
    gl.bufferData( gl.ARRAY_BUFFER,vertices2, gl.STATIC_DRAW );
}