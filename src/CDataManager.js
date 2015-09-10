var CDataManager =
{
    setScore: function (s)
    {
        var tmp = cc.sys.localStorage.getItem("bestScore");
        if(!tmp)
        {
            tmp = s.toFixed(3);
        }
        else if(s.toFixed(3) < parseFloat(tmp).toFixed(3))
        {
            tmp = s.toFixed(3);
        }
        cc.sys.localStorage.setItem("bestScore",tmp);
    },
    getScore:function()
    {
        var tmp = cc.sys.localStorage.getItem("bestScore");
        tmp = tmp?tmp:"暂无数据";
        return tmp+'"';
    }
};


