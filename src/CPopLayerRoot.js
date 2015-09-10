var CPopLayerRoot = cc.LayerColor.extend({
   ctor:function()
   {
       this._super();
       this.setColor(GC.Black);
       this.setOpacity(128);
       cc.eventManager.addListener(
           {
               event:cc.EventListener.TOUCH_ONE_BY_ONE,
               swallowTouches:true,
               onTouchBegan: function (touch,event) {
                   return true;
               }

           },
           this
       );
   }

});