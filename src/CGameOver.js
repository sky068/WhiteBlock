var CGameOver = CPopLayerRoot.extend({
    _bgLayer:null,
    ctor:function()
    {
        this._super();
        this._bgLayer = new cc.LayerColor(GC.White,500,550);
        this._bgLayer.ignoreAnchorPointForPosition(false);
        this._bgLayer.setAnchorPoint(cc.p(0.5,0.5));
        this._bgLayer.setPosition(cc.p(GC.size.width/2,GC.size.height/2));
        this.addChild(this._bgLayer);
        this.initContent();
    },
    onEnter: function ()
    {
        //动画
        this._super();
        this._bgLayer.setScale(0.1);
        var act = cc.scaleTo(0.3,1,1);
        this._bgLayer.runAction(act.easing(cc.easeSineIn()));
    },
    initContent:function()
    {
        var come = new cc.LabelTTF("再来一次吧!","Arial",30);
        come.setColor(GC.Black);
        come.setPosition(cc.p(this._bgLayer.getContentSize().width/2,this._bgLayer.getContentSize().height-50));
        this._bgLayer.addChild(come);

        var lose = new cc.LabelTTF("失败了!","Arial-BoldMT",80);
        lose.setColor(GC.Black);
        lose.setPosition(cc.p(this._bgLayer.getContentSize().width/2,this._bgLayer.getContentSize().height/2+50));
        this._bgLayer.addChild(lose);

        var score = CDataManager.getScore();
        var best = new cc.LabelTTF("历史最佳:"+score,"Arial",28);
        best.setColor(GC.Black);
        best.setPosition(cc.p(this._bgLayer.getContentSize().width/2,this._bgLayer.getContentSize().height/2-50));
        this._bgLayer.addChild(best);

        //添加菜单
        var label = new cc.LabelTTF("重新开始","Arial",36);
        label.setColor(GC.Black);
        var replay = new cc.MenuItemLabel(label,this.onReplay,this);
        replay.setPosition(cc.p(this._bgLayer.getContentSize().width/2, 100));

        var menu = new cc.Menu(replay);
        menu.setPosition(cc.p(0,0));
        this._bgLayer.addChild(menu);
    },
    onReplay:function()
    {
        cc.log("replay...");
        CAudio.playEffect(res.btnSound);
        cc.director.runScene(new CGameScene());
    }
});
