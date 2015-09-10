var CTile = cc.Sprite.extend({
    _lineNum:null,
    _color:null,
   ctor:function(line,color)
   {
       this._color= color = arguments[1]?arguments[1]:GC.White;

       this._super();
       this._lineNum = line;
       //cc.log("_lineNum:"+line);
       var conSize = cc.size(GC.tileW,GC.tileH);
       var rec = cc.rect(0,0,GC.tileW,GC.tileH);
       this.setColor(this._color);
       this.setContentSize(conSize);
       this.setTextureRect(rec);
       this.setAnchorPoint(cc.p(0,0));
       return true;
   },
   blinkSelf:function(call,callback)
   {
       var act = cc.tintTo(0.1,255,0,0);
       var act2 = cc.tintTo(0.1,255,255,255);
       var seq = cc.sequence(act,act2);
       this.stopAllActions();
       this.runAction(cc.repeat(seq,2));
   },
   tintToGrey:function()
   {
       var act = cc.tintTo(0.1,220,220,220);
       this.stopAllActions();
       this.runAction(act);
   }
});