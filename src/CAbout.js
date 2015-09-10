var CAbout = CPopLayerRoot.extend({
    _bgLayer:null,
    ctor:function()
    {
        this._super();
        this._bgLayer = new cc.LayerColor(GC.White,400,450);
        this._bgLayer.ignoreAnchorPointForPosition(false);
        this._bgLayer.setAnchorPoint(cc.p(0.5,0.5));
        this._bgLayer.setPosition(cc.p(GC.size.width/2,GC.size.height/2));
        this.addChild(this._bgLayer);
        this.initContent();
    },
    onEnter:function()
    {
        this._super();
        //动画
        this._bgLayer.setScale(0.1);
        var act = cc.scaleTo(0.3,1,1);
        this._bgLayer.runAction(act.easing(cc.easeSineIn()));
    },
    initContent:function()
    {
        var des = new cc.LabelTTF("使用cocos2d-x js 3.7开发！\n              --by xujw","Arial",26);
        des.setColor(GC.Black);
        des.setPosition(cc.p(this._bgLayer.getContentSize().width/2,this._bgLayer.getContentSize().height/2));
        this._bgLayer.addChild(des);


        //添加菜单
        var label = new cc.LabelTTF("关闭","Arial",36);
        label.setColor(GC.Black);
        var close = new cc.MenuItemLabel(label,this.onClose,this);
        close.setPosition(cc.p(this._bgLayer.getContentSize().width/2, 100));

        var menu = new cc.Menu(close);
        menu.setPosition(cc.p(0,0));
        this._bgLayer.addChild(menu);
    },
    onClose:function()
    {
        cc.audioEngine.playEffect(res.btnSound);
        this.removeFromParent();
    }
});