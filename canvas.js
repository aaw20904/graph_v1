let Hystogram = (function () {
   let secM = {
     clearCanvas: function (settings) {
      /*get a context*/
      let ctx  = settings.getContext(settings.nodeID);
      ctx.clearRect(0, 0, settings.limits.w, settings.limits.w);              
     },
       /*paint a scale on the Canvas-
       maxX - maximum value of argument (reserved for latest version)
       maxY - maximum value of the function*/
     paintScale: function (maxX, maxY, settings) {
               
     },
     /*update a private members */ 
    updateWindowLimits: function (settings) {
       /*save  window settings in a private settings object*/
       settings.limits.w = window.clientWidth;
       settings.limits.h = window.clientHeight; 
      /*get a context*/
         let ctx  = settings.getContext(settings.nodeID);
        /*update - assign a new canvas size*/
         ctx.canvas.clientWidth = settings.limits.w;
         ctx.canvas.clientHeight = settings.limits.h;
    },
    /*****settings of a Canvas view */
       settings: {
          nodeID:"canvas001",
          limits: {w:100, h:66},
          fontOfScale: 0.1,
          arrowSize: 1.0,
          countOfItems: 1,
          itemsFontSize: 0.02,
          maxValX:100, /*reserved for version in future*/
          maxValY:100,
            getContext: (id)=>{
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
    }
})();