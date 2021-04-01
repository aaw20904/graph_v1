let Hystogram = (function () {
  let mapAccess = new WeakMap();
   let secM = {
     clearCanvas: function (settings) {
      /*get a context*/
      let ctx  = settings.getCtx(settings.nodeID);
      ctx.clearRect(0, 0, settings.limits.w, settings.limits.w);              
     },
       /*paint a scale on the Canvas-
       maxX - maximum value of argument (reserved for latest version)
       maxY - maximum value of the function*/
     paintScale: function (maxX, maxY, settings) {
       let offset = 0;
       let tmp =0;   
       let ctx = settings.getCtx(settings.nodeID);
          startPoint = {};
          startPoint.x = (1 - settings.diagramArea) / 2;
          startPoint.y = 1 - ((1- settings.diagramArea) / 2);
          /*assign a concrete value*/
          startPoint.x *= ctx.canvas.clientWidth;
          startPoint.y *= ctx.canvas.clientHeight;
          ctx.strokeStyle = settings.colorAxis;
          ctx.lineWidth = 2;
          ctx.beginPath ();
          /*Y axis*/
          ctx.moveTo (startPoint.x, startPoint.y);
          ctx.lineTo (startPoint.x, ((1 - settings.diagramArea)/2) * ctx.canvas.clientHeight);  
          /* X axis*/
          ctx.moveTo (startPoint.x, startPoint.y);
          ctx.lineTo ((settings.diagramArea * ctx.canvas.clientWidth) + startPoint.x, startPoint.y); 
          ctx.stroke();
          /*a vertical scale*/
          while (tmp < 4) {
            offset += (settings.diagramArea * ctx.canvas.clientHeight) / 4;
            ctx.moveTo (startPoint.x * 0.9, (((1 - settings.diagramArea)/2) * ctx.canvas.clientHeight) + offset);
            ctx.lineTo (startPoint.x, (((1 - settings.diagramArea)/2) * ctx.canvas.clientHeight) + offset);
            tmp++;
            ctx.stroke();
          }

     },
     /*update a private members */ 
    updateWindowLimits: function (settings) {
       /*save  window settings in a private settings object*/
       settings.limits.w = window.innerWidth;
       settings.limits.h = window.innerWidth * 0.66; 
      /*get a context*/
         let ctx  = settings.getCtx(settings.nodeID);
        /*update - assign a new canvas size*/
        let canv =  document.getElementById(settings.nodeID);
        canv.width = settings.limits.w;
        canv.height = settings.limits.w * 0.66;
    },
    /*****settings of a Canvas view */
    /*in  general there are a ratio coeficients*/ 
       settings: {
         diagramArea: 0.8,
         nodeID:"canvas001",
         limits: {w:100, h:66},
         fontOfScale: 0.1,
         arrowSize: 1.0,
         countOfItems: 1,
         itemsFontSize: 0.02,
         maxValX:100, /*reserved for version in future*/
         maxValY:100,
         colorAxis: "darkblue",
            getCtx: (id)=>{
              let node = document.getElementById(id);
              try{
                if(!node){
                  throw new Error('A CanvasID is wrong!');
                }
                return node.getContext("2d");
              }
                catch(z) {
                  console.log(z);
                  return null;
                }
              }

            }
       }

       class Hystogram {
         constructor (id) {
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