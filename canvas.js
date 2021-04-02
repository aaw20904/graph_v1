let Hystogram = (function () {
  let mapAccess = new WeakMap();
   let secM = {
     clearCanvas: function (settings) {
      /*get a context*/
      
      settings.canvasCtx.clearRect(0, 0, settings.limits.w, settings.limits.w);              
     },
       /*paint a scale on the Canvas-
       maxX - maximum value of argument (reserved for latest version)
       maxY - maximum value of the function*/
     paintScale: function (maxX, maxY, settings) {
       let offset = 0;
       /*all the size in pixels */
       let stepOfScale = settings.maxValY / 4;
       /*a step*/
       stepOfScale = stepOfScale / 4;
       let tmp = 0;   
       let tmpCoords = {};
       settings.canvasCtx.fillStyle = settings.fillStyle;
       settings.canvasCtx.font = (settings.limits.h * settings.fontOfScale).toString() + "px Arial";
          let startPoint = {};
          startPoint.x = (1 - settings.diagramArea) / 2;
          startPoint.y = (1 - settings.diagramArea) / 2;
          /*assign a concrete value*/
          startPoint.x *= settings.canvasCtx.canvas.clientWidth;
          startPoint.y *= settings.canvasCtx.canvas.clientHeight;
          settings.canvasCtx.strokeStyle = settings.colorAxis;
          settings.canvasCtx.lineWidth = 2;
          settings.canvasCtx.beginPath ();
          /*Y axis*/
          settings.moveToDekart(startPoint.x, startPoint.y, settings);
          settings.lineToDekart(startPoint.x + (settings.limits.w * settings.diagramArea) , startPoint.y, settings);
         
          /* X axis*/
          settings.moveToDekart(startPoint.x, startPoint.y, settings);
          settings.lineToDekart(startPoint.x, startPoint.y + (settings.limits.h * settings.diagramArea), settings);
          /*a vertical scale*/
          while (tmp < 4) {
            offset += (settings.diagramArea * settings.canvasCtx.canvas.clientHeight) / 4;
            settings.moveToDekart (startPoint.x * 0.9, startPoint.y + offset, settings);
              /*paint a text*/
            settings.textDekart (stepOfScale.toFixed(), (settings.limits.w * 0.02) ,startPoint.y + offset, settings.limits.w * ((1-settings.diagramArea)/2), settings);
            /*paint a short line-like a scale*/
            settings.moveToDekart (startPoint.x * 0.9, startPoint.y + offset, settings);
            settings.lineToDekart (startPoint.x, startPoint.y + offset, settings);
            tmp++;
            stepOfScale += stepOfScale;
          }
          settings.paintItem(1,50,"red",settings);
          settings.canvasCtx.stroke ();
     },

     /*update a private members */ 
    updateWindowLimits: function (settings) {
       /*save  window settings in a private settings object*/
       settings.limits.w = window.innerWidth;
       settings.limits.h = window.innerWidth * 0.66; 
        /*update - assign a new canvas size*/
        let canv =  document.getElementById(settings.nodeID);
        canv.width = settings.limits.w;
        canv.height = settings.limits.w * 0.66;
    },

    /*paint a one item in a canvas*/
    /*@order - means a order on a diagram
    rorExample: if countOfItems equals 10, THEN 
    the order can be in range from 1 to 10*/
    paintItem (order, parameter, color, settings) {
        settings.canvasCtx.fillStyle = color;
        let step = (settings.limits.w * settings.diagramArea) / settings.countOfItems;
        let hightRect = (parameter / settings.maxValY) * settings.limits.h;
        let startPoint = {};
          startPoint.x = (1 - settings.diagramArea) / 2;
          startPoint.y = (1 - settings.diagramArea) / 2;
          /*assign a concrete value in pixels to the start point*/
          startPoint.x *= settings.canvasCtx.canvas.clientWidth;
          startPoint.y *= settings.canvasCtx.canvas.clientHeight;
          settings.fillRectDekart(startPoint.x + (parameter * order), startPoint.y, step, hightRect);
          settings.canvasCtx.fillStyle = settings.color;
        },
    /*****settings of a Canvas view */
    /*in  general there are a ratio coeficients*/ 
       settings: {
         diagramArea: 0.8,
         nodeID:"canvas001",
         limits: {w:100, h:66},
         fontOfScale: 0.05,
         fillStyle:"blue",
         arrowSize: 1.0,
         countOfItems: 1,
         itemsFontSize: 0.02,
         maxValX:100, /*reserved for version in future*/
         maxValY:100,
         colorAxis: "darkblue",
              canvasCtx: null,
              /*transtate coords - zero[lower left corner]*/
              toDekart: function (x, y, settings) {
               let result = {};
               result.y = settings.limits.h - y;
                result.x = x;
               return result;
              },
               lineToDekart: function (x, y, settings) {
                settings.canvasCtx.lineTo(x, settings.limits.h - y); 
               },
               moveToDekart: function (x, y, settings) {
                 settings.canvasCtx.moveTo(x, settings.limits.h - y); 
               },
               fillRectDekart: function (x, y, w, h, settings) {
                 settings.canvasCtx.fillRect(x, settings.limits.h - y, w, h); 
               },
               textDekart: function (text, x, y, maxWidth, settings) {
                 settings.canvasCtx.fillText(text, x, settings.limits.h - y, maxWidth); 
               },
               fillRectDekart: function (x,y,w,h) {
                settings.canvasCtx.fillRect(x, settings.limits.h - y, w, h); 
               }
            }
       }

       class Hystogram {
         constructor (id) {
           let tmp;
           tmp = document.getElementById(id);
           secM.settings.canvasCtx = tmp.getContext("2d");
           secM.settings.nodeID = id;
          mapAccess.set(this, secM);
         }
         test () {
           let priv = mapAccess.get(this);
           priv.updateWindowLimits(priv.settings);
           priv.paintScale (0,0,priv.settings);
         }
       }
       return Hystogram;
    })();

    window.onload = function () {
       let q = new Hystogram("canvas001");
       q.test();   
    }