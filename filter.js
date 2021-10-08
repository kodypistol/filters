(function() {
  var vinvertbutton = null;

  function myBase() {
    var photo = document.getElementById('photo');
    var canvas = document.getElementById('mycanvas');
    var context = canvas.getContext('2d');

    // Get the CanvasPixelArray from the given coordinates and dimensions.
    x = 0;
    y = 0;
    width = canvas.width;
    height = canvas.height;

    var imgd = context.getImageData(x, y, width, height);
    var pix = imgd.data;


    console.log("height=" + height + ", width=" + width);

    var tr = new Array(width).fill().map(() => Array(height));
    var tg = new Array(width).fill().map(() => Array(height));
    var tb = new Array(width).fill().map(() => Array(height));
    var ta = new Array(width).fill().map(() => Array(height));

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
        tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
        tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
        ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
      }
    }


    for (var y = height/2; y < height; y++) {
      for (var x = 0; x < width; x++) {
        tr[x][y] = 0;
        tg[x][y] = 0;
        tb[x][y] = 255;
        ta[x][y] = 100;
      }
    }

    i = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

        var k = (ta[x][y] / 255);

        pix[i] = pix[i] + (tr[x][y] - pix[i]) * k;
        pix[i+1] = pix[i+1] + (tg[x][y] - pix[i+1]) * k;
        pix[i+2] = pix[i+2] + (tb[x][y] - pix[i+2]) * k;
        i = i + 4;
      }
    }

    context.putImageData(imgd, 0, 0);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  function myBinarisation(){

    var photo = document.getElementById('photo');
    var canvas = document.getElementById('mycanvas');
    var context = canvas.getContext('2d');

    x = 0;
    y = 0;
    width = canvas.width;
    height = canvas.height;

    var imgd = context.getImageData(x, y, width, height);
    var pix = imgd.data;

    var tr = new Array(width).fill().map(() => Array(height));
    var tg = new Array(width).fill().map(() => Array(height));
    var tb = new Array(width).fill().map(() => Array(height));
    var ta = new Array(width).fill().map(() => Array(height));

    // copie des valeurs
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
        tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
        tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
        ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
      }
    }

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        tr[x][y] = 0;
        tg[x][y] = 0;
        tb[x][y] = 255;
        ta[x][y] = 100;
      }
    }

    i = 0;
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
//imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3

        var gray = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;

        pix[i] = gray;
        pix[i+1] = gray;
        pix[i+2] = gray;

        if (gray > 128) {
          pix[i] = 255;
          pix[i+1] = 255;
          pix[i+2] = 255;
        } else {
          pix[i] = 0;
          pix[i+1] = 0;
          pix[i+2] = 0;
        }

        i = i + 4;
      }
    }
    context.putImageData(imgd, 0, 0);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

function myFlou(){
  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;

  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = 1; y < height - 1; y++) {
    for (var x = 1; x < width - 1; x++) {

            var averageR = (tr[x][y + 1] + tr[x + 1][y + 1] + tr[x - 1][y + 1] +
                            tr[x][y]     + tr[x + 1][y]     + tr[x - 1][y]     +
                            tr[x][y - 1] + tr[x + 1][y - 1] + tr[x - 1][y - 1])/9;

            var averageB = (tb[x][y + 1] + tb[x + 1][y + 1] + tb[x - 1][y + 1] +
                            tb[x][y] + tb[x + 1][y] + tb[x - 1][y] +
                            tb[x][y - 1] + tb[x + 1][y - 1] + tb[x - 1][y - 1])/9;

            var averageG = (tg[x][y + 1]+tg[x+1][y+1]+tg[x-1][y+1]+
                            tg[x][y]+tg[x+1][y]+tg[x-1][y]+
                            tg[x][y-1]+tg[x+1][y-1]+tg[x-1][y-1])/9;

            tr[x][y] = averageR;
            tb[x][y] = averageB;
            tg[x][y] = averageG;
    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myInvertColors(){

  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;

  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {

      tr[x][y] = 255 - tr[x][y];
      tg[x][y] = 255 - tg[x][y];
      tb[x][y] = 255 - tb[x][y];

    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myLuminosity(){

  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;

  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {

      var opacityValue = (ta[x][y] / 255);
      tr[x][y] = tr[x][y] + 20;
      tb[x][y] = tb[x][y] + 20;
      tg[x][y] = tg[x][y] + 20;

    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myNiveauxDeGris1Color(){

  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  // Get the CanvasPixelArray from the given coordinates and dimensions.
  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;


  console.log("height=" + height + ", width=" + width);

  // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
  // 1 tab 1D -> 4 tab 2D (r,g,b,a)
  // déclaration de 4 tableaux à 2 dim (de taille width * height)
  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }


// Nous stockons les valeurs r, g et b de la couleur que nous voulons détecter dans l'image.
// Ensuite, on lui applique une certainte tolérance t, pour pas que la détection soit "binaire"
  rr = 57;
  rg = 123;
  rb = 111;
  t = 80;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      
      //si je trouve un pixel beige alors je le peints en rouge sinon je calcule sa nuance de gris
      if( ((rr - t) < tr[x][y] && tr[x][y] < (rr + t)) &&
          ((rg - t) < tg[x][y] && tg[x][y] < (rg + t)) &&
          ((rb - t) < tb[x][y] && tb[x][y] < (rb + t)) ){
        tr[x][y] = 152;
        tg[x][y] = 112;
        tb[x][y] = 91;
      }else{
        var gray = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
        tr[x][y] = gray;
        tg[x][y] = gray;
        tb[x][y] = gray;
      }
    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  // Draw the ImageData at the given (x,y) coordinates.
  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myNiveauxDeGris(){

  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  // Get the CanvasPixelArray from the given coordinates and dimensions.
  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;


  console.log("height=" + height + ", width=" + width);

  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = height/2; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = 0;
      tg[x][y] = 0;
      tb[x][y] = 255;
      ta[x][y] = 100;
    }
  }

  i = 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var gray = (pix[i] + pix[i + 1] + pix[i + 2]) / 3;

      pix[i] = gray;
      pix[i+1] = gray;
      pix[i+2] = gray;

      i = i + 4;
    }
  }

  // Draw the ImageData at the given (x,y) coordinates.
  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myNoise(){
  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  // Get the CanvasPixelArray from the given coordinates and dimensions.
  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;


  console.log("height=" + height + ", width=" + width);

  // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
  // 1 tab 1D -> 4 tab 2D (r,g,b,a)
  // déclaration de 4 tableaux à 2 dim (de taille width * height)
  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {

      var noiseValue = 20;
      var noise = (Math.random()-0.5) * noiseValue;
      tr[x][y] += noise;
      tg[x][y] += noise;
      tb[x][y] += noise;


    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  // Draw the ImageData at the given (x,y) coordinates.
  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myPassageBleu(){
  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  // Get the CanvasPixelArray from the given coordinates and dimensions.
  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;


  console.log("height=" + height + ", width=" + width);

  // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
  // 1 tab 1D -> 4 tab 2D (r,g,b,a)
  // déclaration de 4 tableaux à 2 dim (de taille width * height)
  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {

      var opacityValue = (ta[x][y] / 255);
      tr[x][y] = 0;
      tb[x][y] = tb[x][y] * opacityValue;
      tg[x][y] = 0;

    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myPassageRouge(){
  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  // Get the CanvasPixelArray from the given coordinates and dimensions.
  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;


  console.log("height=" + height + ", width=" + width);

  // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
  // 1 tab 1D -> 4 tab 2D (r,g,b,a)
  // déclaration de 4 tableaux à 2 dim (de taille width * height)
  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }


  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {

      var opacityValue = (ta[x][y] / 255);
      tr[x][y] = tr[x][y] + (tr[x][y] - tr[x][y]) * opacityValue;
      tb[x][y] = 0;
      tg[x][y] = 0;

    }
  }
  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

function myPassageVert(){
  var photo = document.getElementById('photo');
  var canvas = document.getElementById('mycanvas');
  var context = canvas.getContext('2d');

  // Get the CanvasPixelArray from the given coordinates and dimensions.
  x = 0;
  y = 0;
  width = canvas.width;
  height = canvas.height;

  var imgd = context.getImageData(x, y, width, height);
  var pix = imgd.data;


  console.log("height=" + height + ", width=" + width);

  // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
  // 1 tab 1D -> 4 tab 2D (r,g,b,a)
  // déclaration de 4 tableaux à 2 dim (de taille width * height)
  var tr = new Array(width).fill().map(() => Array(height));
  var tg = new Array(width).fill().map(() => Array(height));
  var tb = new Array(width).fill().map(() => Array(height));
  var ta = new Array(width).fill().map(() => Array(height));

  // copie des valeurs
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
      tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
      tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
      ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
    }
  }

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {

      var opacityValue = (ta[x][y] / 255);
      tr[x][y] = 0;
      tb[x][y] = 0;
      tg[x][y] = tg[x][y] + (tg[x][y] - tg[x][y]) * opacityValue;

    }
  }

  i = 0;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      pix[x*4+y*(width*4)+0] = tr[x][y];
      pix[x*4+y*(width*4)+1] = tg[x][y];
      pix[x*4+y*(width*4)+2] = tb[x][y];
      pix[x*4+y*(width*4)+3] = ta[x][y];
      i = i + 4;
    }
  }

  // Draw the ImageData at the given (x,y) coordinates.
  context.putImageData(imgd, 0, 0);

  var data = canvas.toDataURL('image/png');
  photo.setAttribute('src', data);
}

  function afterload() {
    vbasebutton = document.getElementById('idbasebutton');
    vbinarisationbutton = document.getElementById('idbinarisationbutton');
    vflougaussienbutton = document.getElementById('idflougaussienbutton');
    vinvertcolorsbutton = document.getElementById('idinvertcolorsbutton');
    vluminositybutton = document.getElementById('idluminositybutton');
    vniveauxdegrisbutton = document.getElementById('idniveauxdegrisbutton');
    vniveauxgris1colorbutton = document.getElementById('idniveauxdegris1colorbutton');
    vnoisebutton = document.getElementById('idnoisebutton');
    vpassagebleubutton = document.getElementById('idpassagebleubutton');
    vpassagevertbutton = document.getElementById('idpassagevertbutton');
    vpassagerougebutton = document.getElementById('idpassagerougebutton');

    // ICI je fais le lien entre ma fonction myInert() et l'évenement click du bouton innvert
    vbasebutton.addEventListener('click', function(ev) {
      myBase();
    }, false);

    vbinarisationbutton.addEventListener('click', function(ev) {
      myBinarisation();
    }, false);

    vflougaussienbutton.addEventListener('click', function(ev) {
      myFlou();
    }, false);

    vinvertcolorsbutton.addEventListener('click', function(ev) {
      myInvertColors();
    }, false);

    vluminositybutton.addEventListener('click', function(ev) {
      myLuminosity();
    }, false);

    vniveauxdegrisbutton.addEventListener('click', function(ev) {
      myNiveauxDeGris();
    }, false);

    vniveauxgris1colorbutton.addEventListener('click', function(ev) {
      myNiveauxDeGris1Color();
    }, false);

    vnoisebutton.addEventListener('click', function(ev) {
      myNoise();
    }, false);

    vpassagebleubutton.addEventListener('click', function(ev) {
      myPassageBleu();
    }, false);

    vpassagerougebutton.addEventListener('click', function(ev) {
      myPassageRouge();
    }, false);

    vpassagevertbutton.addEventListener('click', function(ev) {
      myPassageVert();
    }, false);

  }
  window.addEventListener('load', afterload, false);
})();
