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
     paintScale: function (maxX, maxY, privM) {
       let settings = privM.settings;
       let offset = 0;
       let scaleVal = 0;
       /*all the size in pixels */
       let stepOfScale = settings.maxValY / 4;
       let tmp = 0;   
    
       settings.canvasCtx.fillStyle = settings.fillStyle;
       settings.canvasCtx.font = (settings.limits.h * settings.fontOfScale).toString() + "px Arial";
          let startPoint = {};
          startPoint.x = (1 - settings.diagramArea) / 2;
          startPoint.y = (1 - settings.diagramArea) / 2;
          /*assign a concrete value*/
          startPoint.x *= settings.limits.w;
          startPoint.y *= settings.limits.h;
          /*round*/
          startPoint.x |= 0;
          startPoint.y |= 0;
          settings.canvasCtx.strokeStyle = settings.colorAxis;
          settings.canvasCtx.lineWidth = 2;
          settings.canvasCtx.beginPath ();
          /*Y axis*/
          privM.moveToDekart(startPoint.x, startPoint.y, settings);
          privM.lineToDekart(startPoint.x + (settings.limits.w * settings.diagramArea) , startPoint.y, settings);
         
          /* X axis*/
          privM.moveToDekart(startPoint.x, startPoint.y, settings);
          privM.lineToDekart(startPoint.x, startPoint.y + (settings.limits.h * settings.diagramArea), settings);
          scaleVal = stepOfScale;
          /*a vertical scale*/
          while (tmp < 4) {
            offset += (settings.diagramArea * settings.limits.h) / 4;
            privM.moveToDekart (startPoint.x * 0.9, startPoint.y + offset, settings);
              /*paint a text*/
            privM.textDekart (scaleVal.toFixed(), (settings.limits.w * 0.02) ,startPoint.y + offset, settings.limits.w * ((1-settings.diagramArea)/2), settings);
            /*paint a short line-like a scale*/
            privM.moveToDekart (startPoint.x * 0.9, startPoint.y + offset, settings);
            privM.lineToDekart (startPoint.x, startPoint.y + offset, settings);
            tmp++;
            scaleVal += stepOfScale;
          }
          settings.countOfItems = 4;

       //   privM.paintItem(0,50,"red","@",privM);
          settings.canvasCtx.stroke ();
     },

     /*update a private members */ 
    updateWindowLimits: function (settings) {
      console.log(this.settings);
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
    the order can be in range from 0 to 10*/
    paintItem (order, parameter, color, letter, privM) {
      
        let settings = privM.settings;
        settings.canvasCtx.fillStyle = color;
        let step = (settings.limits.w * settings.diagramArea) / settings.countOfItems;
        let hightRect = (parameter / settings.maxValY) * (settings.limits.h  * settings.diagramArea);
        let startPoint = {};
          startPoint.x = (1 - settings.diagramArea) / 2;
          startPoint.y = (1 - settings.diagramArea) / 2;
          /*assign a concrete value in pixels to the start point*/
          startPoint.x *= settings.limits.w;
          startPoint.y *= settings.limits.h;
          privM.fillRectDekart(startPoint.x + (step * order), startPoint.y, step, hightRect, privM);
          /*paint the letter*/
          let letterHeigh  = settings.limits.h * 0.05;
          let letterY = startPoint.y - (settings.limits.h * 0.08);
          let letterX = (startPoint.x + (step * order)) + (step / 2); 
          privM.textDekart(letter, letterX, letterY, step, settings );
          settings.canvasCtx.fillStyle = settings.color;
        },
        /*paint functins - LOWER LEFT corner equals ZERO*/
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
          fillRectDekart: function (x,y,w,h,privM) {
           privM.settings.canvasCtx.fillRect(x, privM.settings.limits.h - (y + h), w, h); 
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
         colorTable:null,
             
            }
       }

       class Hystogram {
         constructor (id) {
           let tmp;
           tmp = document.getElementById(id);
           secM.settings.canvasCtx = tmp.getContext("2d");
           secM.settings.nodeID = id;
          mapAccess.set(this, secM);
          secM.settings.colorTable = new Set();
          secM.settings.colorTable.add({color:'black', letter:"A"});
          secM.settings.colorTable.add({color:'red',letter:"B"});
          secM.settings.colorTable.add({color:'orange',letter:"C"});
          secM.settings.colorTable.add({color:'yellow',letter:"D"});
          secM.settings.colorTable.add({color:'green',letter:"E"});
          secM.settings.colorTable.add({color:'blue',letter:"F"});
          secM.settings.colorTable.add({color:'indigo',letter:"G"});
          secM.settings.colorTable.add({color:'violet',letter:"H"});
          secM.settings.colorTable.add({color:'black', letter:"I"});
          secM.settings.colorTable.add({color:'red',letter:"J"});

         }
       
         updateCanvasView(){
          let priv = mapAccess.get(this);
          priv.updateWindowLimits(priv.settings);
          priv.clearCanvas(priv.settings);

         }

         paintHystogram (dataSet, maxValue) {
            let privM = mapAccess.get(this);
            privM.paintScale(0,0,privM);
            /*max value of the function*/
            privM.settings.maxValY = maxValue;
            /*number of counts*/
            privM.settings.countOfItems = dataSet.size;
            let count = 0;
            let propIter = privM.settings.colorTable.entries();
            let dataIter = dataSet.values();
            let dataResult = dataIter.next();
            let propResult  = propIter.next(); 
            privM.settings.canvasCtx.beginPath();
            while (!dataResult.done) {
              privM.paintItem(count, dataResult.value, propResult.value[0].color, propResult.value[0].letter, privM);
              dataResult = dataIter.next();
              propResult  = propIter.next();
              count++;
            }
            privM.settings.canvasCtx.stroke();

         }
       }
       return Hystogram;
    })();

    window.onload = function () {
       let q = new Hystogram("canvas001");
      
       let base = new Set();
       base.add(25);
       base.add(50)
       base.add(75)
       base.add(99);
       base.add(51);
       base.add(27);
       q.updateCanvasView();
       q.paintHystogram(base, 100);
       window.addEventListener("resize",()=>{
        q.updateCanvasView();
        q.paintHystogram(base, 100);
       },false);
    }