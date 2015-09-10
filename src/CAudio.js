var CAudio =
{
    flag: true,
    playEffect: function (ef, loop) {
        if (this.flag)
            return cc.audioEngine.playEffect(ef);
    },
    preloadMusic: function () {
        for (var i = 0; i < GC.Music.length; i++) {
            var musicName = "sound" + GC.Music[i] + ".mp3";
            musicName = "res/Music/" + musicName;
            cc.audioEngine.preloadEffect(musicName);
        }
    }
}
