var CGameLayer = cc.Layer.extend({
   _bgLayer:null,
   _touchNum:0,
   _labelTime:null,
   _nowTime:0.00,
   ctor:function()
   {
       this._super();
       this.initTile();

       this._labelTime = new cc.LabelTTF("0.000"+'"',"Arial",36);
       this._labelTime.anchorY = 0;
       this._labelTime.setColor(GC.Red);
       this._labelTime.setPosition(GC.size.width/2,GC.size.height-50);
       this.addChild(this._labelTime);

       cc.eventManager.addListener({
           event:cc.EventListener.TOUCH_ONE_BY_ONE,
           swallowTouches:true,
           onTouchBegan:this.onTouchBegan,
           onTouchMoved:this.onTouchMoved,
           onTouchEnded:this.onTouchEnded
       },this);

       return true;
   },
   initTile:function()
   {
       this._bgLayer = new cc.Layer();
       this.addChild(this._bgLayer);
       //第一行 黄色提示
       for(var i = 0;i<4;i++)
       {
           var tile = new CTile(0,GC.Yellow);
           tile.setPosition(cc.p(2+(GC.tileW+1)*i,1));
           this._bgLayer.addChild(tile);
       }

       for(var i=1;i<=GC.MaxTileIndex;i++)
       {
           //每行随机一个为黑色 1
           var rand = Math.round(Math.random()*3);
           var tile = null;
           for(var j=0;j<4;j++)
           {
               if(j==rand)
               {
                   tile = new CTile(i,GC.Black);
                   //第一个提示开始
                   if(i==1)
                   {
                       var label = new cc.LabelTTF("开始游戏","Arial-BoldMT",26);
                       label.setPosition(cc.p(GC.tileW/2,GC.tileH/2));
                       tile.addChild(label);
                   }
               }
               else
               {
                   tile = new CTile(i);
               }
               tile.setPosition(cc.p(2+(GC.tileW+1)*j,1+(GC.tileH+1)*i));
               this._bgLayer.addChild(tile);
           }
       }
       //最后一屏绿色 结束
       this.addLastGreen();

   },

   addLastGreen:function()
   {
       var greenLayer = new cc.LayerColor(GC.Green,638,980);
       greenLayer.setAnchorPoint(cc.p(0,0));
       greenLayer.setName("greenLayer");
       greenLayer.setPosition(cc.p(1,1+(GC.tileH+1)*(GC.MaxTileIndex+1)));
       this._bgLayer.addChild(greenLayer);
   },

   subTileIndex:function()
   {
       for(var i = 0;i<this._bgLayer.getChildrenCount();i++)
       {
           var tile = this._bgLayer.getChildren()[i];
           if(tile.getName()=="greenLayer")
           {
               continue;
           }
           tile._lineNum -= 1;
           if(tile._lineNum < -1)
           {
               tile.removeFromParent();
           }
       }
   },

   startTime:function(dt)
   {
       this._nowTime += dt;
       var tmp = this._nowTime;
       tmp = tmp.toFixed(3);
       this._labelTime.setString(tmp+'"');
   },

   onTouchBegan:function(touch,event)
   {
       //cc.log("CGameLayer:touch begin");

       var self = event.getCurrentTarget();
       var pos = touch.getLocation();
       var bgLayer = self._bgLayer;
       pos = bgLayer.convertToNodeSpace(pos);

       //cc.log("x:" + pos.x.toFixed(2) + "\ny:" + pos.y.toFixed(2));
       for(var i = 0;i<self._bgLayer.getChildrenCount();i++)
       {
           var tile = self._bgLayer.getChildren()[i];
           var rec = tile.getBoundingBox();
           if(tile && cc.rectContainsPoint(rec,pos))
           {
               if(tile._lineNum!=1)
               {
                   break;
               }

               if(cc.colorEqual(tile._color,GC.Black))
               {
                   if(self._touchNum==0)
                   {
                       cc.log("开始游戏...");
                       self.schedule(self.startTime);
                   }

                   var musicName = "sound" +  GC.Music[self._touchNum] + ".mp3";
                   musicName = "res/Music/"+musicName;
                   CAudio.playEffect(musicName);
                   self._touchNum += 1;
                   tile.tintToGrey();
                   self.subTileIndex();
                   bgLayer.stopAllActions();
                   bgLayer.runAction(cc.moveBy(0.1,0,-(GC.tileH+1)));

                   if(self._touchNum == GC.MaxTileIndex)
                   {
                       cc.log("Success...touch num:"+self._touchNum);
                       CAudio.playEffect(res.soundSuccess);
                       self.unschedule(self.startTime);
                       bgLayer.stopAllActions();
                       bgLayer.runAction(cc.moveBy(0.2,0,-(GC.tileH+1)*2));
                       CDataManager.setScore(self._nowTime);
                       var suc = new CSuccess();
                       self.addChild(suc);
                   }
               }
               else
               {
                   CAudio.playEffect(res.soundError);
                   cc.log("GameOver...");
                   tile.blinkSelf();
                   self.unschedule(self.startTime);
                   var p = new CGameOver();
                   self.addChild(p);
               }
           }
       }

       return true;
   },

   onTouchMoved:function(touch,event)
   {
       //cc.log("CGameLayer:touch move");
       //var pos = touch.getLocation();
       //cc.log("x"+pos.x +"y:"+ pos.y);
   },

   onTouchEnded:function(touch,event)
   {
       //cc.log("CGameLayer:touch end");

   }

});

var CGameScene = cc.Scene.extend({
    ctor:function()
    {
        this._super();
        var layer = new CGameLayer();
        this.addChild(layer);
        cc.log("CGameScene:ctor()");
    },
    onEnter:function() {
        this._super();
        cc.log("CGameScene:onEnter()");

    }
});