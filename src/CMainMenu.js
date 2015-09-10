var MainMenuLayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.addMenu();
        this.addLogo();

        return true;
    },

    addMenu: function () {
        var itemBegin = new cc.MenuItemLabel(new cc.LabelTTF("开始游戏","Arial-BoldMT",35),this.onBegin,this);
        itemBegin.setPosition(cc.p(GC.size.width/2, GC.size.height/2));
        var itemBest = new cc.MenuItemLabel(new cc.LabelTTF("最好成绩","Arial-BoldMT",35),this.onBest,this);
        itemBest.setPosition(cc.p(GC.size.width/2, GC.size.height/2-60));
        var itemAbout = new cc.MenuItemLabel(new cc.LabelTTF("关于","Arial-BoldMT",35),this.onAbout,this);
        itemAbout.setPosition(cc.p(GC.size.width/2, GC.size.height/2-120));

        var menu = new cc.Menu(itemBegin,itemBest,itemAbout);
        menu.setPosition(cc.p(0,0));
        this.addChild(menu);
    },

    addLogo:function()
    {
        var label = new cc.LabelTTF("别踩白块","Arial-BoldMT",50);
        label.setPosition(cc.p(GC.size.width/2,GC.size.height-200));
        label.setColor(cc.color(255,200,50,255));
        this.addChild(label);
    },

    onBegin:function()
    {
        cc.log("onBegin...");
        CAudio.playEffect(res.btnSound);
        cc.director.runScene(new CGameScene());
    },

    onAbout:function()
    {
        cc.log("onAbout...");
        CAudio.playEffect(res.btnSound);
        var about = new CAbout();
        cc.director.getRunningScene().addChild(about);
    },

    onBest:function()
    {
        CAudio.playEffect(res.btnSound);
        cc.log("onBest...");
    }
});

var MainMenuScene = cc.Scene.extend({
    
    onEnter: function () {
        this._super();
        cc.log("MainMenuScene:onEnter...");
        var layer = new MainMenuLayer();
        this.addChild(layer);
    },
    onExit:function()
    {
        this._super();
        cc.log("MainMenuScene:onExit...");
    }
});