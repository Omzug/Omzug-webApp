include(PlayerConfig.playerPath + "ckplayer.js");
var _VideoOptions = {};
_VideoOptions.IsDashAvailable = false;
_VideoOptions.ckid = 'ckplayer_a1';
_VideoOptions.isRefresh = false;
_VideoOptions.RefreshNumber = 0;
_VideoOptions.ErrorTemplate = '可能由于服务器原因视频加载失败,<a href="javascript:RefreshVideo()">点击这里</a>重新加载!';
_VideoOptions.MaximunErrorReTry = 5;
_VideoOptions.ErrorMessage = {};
_VideoOptions.ErrorMessage.RetryFailed = '多次刷新视频无效,请联系客服!';
_VideoOptions.HlsPath = '';
_VideoOptions.CurrentTime = 1;
var GetPlayerID = function() {
  return CKobject.getObjectById(_VideoOptions.ckid);
}
function loadedHandler() {
  if (CKobject.getObjectById(_VideoOptions.ckid).getType() && HaveMobileAds()) {
    $(".HTML5-only").css({
      display: "block"
    });
    CKobject.getObjectById(_VideoOptions.ckid).videoPause();
    PlayAds(PlayerConfig.mobilePlayer.sl, PlayerConfig.mobilePlayer.sr, PlayerConfig.mobilePlayer.ste);
  }
  AddErrorEvent();
  addPlayListener();
}
function HaveMobileAds() {
  if (!PlayerConfig.mobilePlayer.sl || !PlayerConfig.mobilePlayer.sr || !PlayerConfig.mobilePlayer.ste) {
    return false;
  }
  return true;
}
function functionName(fun) {
  var ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
}
function AddEventHandler(name, eventHandler) {
  if (CKobject.getObjectById(_VideoOptions.ckid).getType()) {
    CKobject.getObjectById(_VideoOptions.ckid).addListener(name, eventHandler);
  } else {
    CKobject.getObjectById(_VideoOptions.ckid).addListener(name, functionName(eventHandler));
  }
}
function RemoveEventHandler(name, eventHandler) {
  if (CKobject.getObjectById(_VideoOptions.ckid).getType()) {
    CKobject.getObjectById(_VideoOptions.ckid).removeListener(name, eventHandler);
  } else {
    CKobject.getObjectById(_VideoOptions.ckid).removeListener(name, functionName(eventHandler));
  }
}
function MessageBox(message) {
  if (!_VideoOptions.TinyAvailable) {
    try {
      if (!TINY) {
        _VideoOptions.TinyAvailable = false;
      }
    } catch (err) {
      _VideoOptions.TinyAvailable = false;
    }
    _VideoOptions.TinyAvailable = true;
  }
  if (_VideoOptions.TinyAvailable && _VideoOptions.TinyAvailable == true) {
    TINY.box.show({
      html: message,
      animate: false,
      close: false,
      boxid: 'success',
      autohide: 5,
      top: -14,
      left: -17,
      mask: false
    });
  } else {
    console.log(message);
  }
}
function AddPlayPoint(time) {
  createObj(GetPlayerRecordKey(), time, 1, GetHostName());
}
function timeHandler(t) {
  var time = parseInt(t);
  if (time > -1 && time % 10 == 1 && time != _VideoOptions.CurrentTime) {
    _VideoOptions.CurrentTime = time;
    AddPlayPoint(time);
  }
}
function addTimeListener() {
  if (CKobject.getObjectById(_VideoOptions.ckid).getType()) {
    var vid = document.getElementById(_VideoOptions.ckid);
    vid.ontimeupdate = function() {
      timeHandler(vid.currentTime)
    }
    ;
  } else {
    CKobject.getObjectById(_VideoOptions.ckid).addListener('time', 'timeHandler');
  }
}
function addPlayListener() {
  if (!iOS())
    AddEventHandler('play', playHandler);
}
function playHandler() {
  removePlayListener();
  var playPoint = GetRecordPoint();
  if (playPoint && playPoint > 0) {
    CKobject.getObjectById(_VideoOptions.ckid).videoSeek(GetRecordPoint());
    MessageBox("将从上次播放的时间继续。")
  }
  addTimeListener();
}
function removePlayListener() {
  RemoveEventHandler('play', playHandler);
}
function GetPlayerRecordKey() {
  return "dn_" + PlayerConfig.lid + "_" + PlayerConfig.id
}
function GetRecordPoint() {
  var result = 0;
  var PlayerPointkey = GetPlayerRecordKey();
  try {
    result = readCookie(PlayerPointkey);
    if (result == null || result == '') {
      result = 0;
    }
  } catch (err) {
    result = 0;
  }
  return result
}
function clearPlayPoint() {
  AddPlayPoint(GetPlayerRecordKey(), '', -1, GetHostName());
}
function GetHostName() {
  var host = location.hostname;
  return host.indexOf('.') == 0 ? host.substring(1) : host;
}
function AddErrorEvent() {
  try {
    if (!TINY) {
      console.error("This plugin is based on tinybox 2");
      return false;
    }
  } catch (err) {
    console.error("This plugin is based on tinybox 2");
    return false;
  }
  CKobject.getObjectById(_VideoOptions.ckid).addListener('error', 'errorHandler');
}
function RefreshVideo() {
  if (!_VideoOptions.isRefresh) {
    _VideoOptions.isRefresh = true;
    ++_VideoOptions.RefreshNumber;
    TINY.box.hide();
    GetResource(myCallBack);
    if (_VideoOptions.RefreshNumber < _VideoOptions.MaximunErrorReTry) {
      _VideoOptions.isRefresh = false;
    } else {
      alert(_VideoOptions.ErrorMessage.RetryFailed);
      CKobject.getObjectById(_VideoOptions.ckid).removeListener('error', 'errorHandler');
      return;
    }
  }
}
function iOS() {
  var iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];
  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true;
      }
    }
  }
  return false;
}
function errorHandler(e) {
  if (!_VideoOptions.isRefresh) {
    TINY.box.show({
      html: _VideoOptions.ErrorTemplate,
      animate: false,
      close: false,
      boxid: 'error',
      top: 100,
      mask: false,
      closejs: function() {
        RefreshVideo();
      }
    });
  }
}
function GetFirstLevelHostName() {
  var hostname = location.hostname;
  return hostname.replace("www.", "");
}
function ckplayer_status(str) {
  if (str.length < 4 && parseInt(str) >= 0 && parseInt(str) <= 100) {
    PlayerConfig.nowvolume = parseInt(str);
  }
}
;function myCallBack(result) {
  var rmd = "?rmd=" + Math.random();
  var flashvars = {
    f: _VideoOptions.HlsPath == '' ? GetFlashVar() : PlayerConfig.playerPath + "m3u8.swf",
    a: _VideoOptions.HlsPath == '' ? GetFlashParameters() : _VideoOptions.HlsPath,
    c: 0,
    s: _VideoOptions.HlsPath == '' ? PlayerConfig.desktopPlayer.s : 4,
    p: 1,
    e: PlayerConfig.desktopPlayer.e || 0,
    b: 0,
    v: PlayerConfig.nowvolume,
    loaded: 'loadedHandler',
    h: 4
  };
  var params = {
    bgcolor: '#FFF',
    allowFullScreen: true,
    allowScriptAccess: 'always',
    wmode: "transparent"
  };
  var myvideo = GetServerFile(result)
  var video = [myvideo];
  CKobject.embed(PlayerConfig.playerPath + 'ckplayer.swf' + (PlayerConfig.useRandom || ''), 'a1', 'ckplayer_a1', PlayerConfig.width || '860', PlayerConfig.height || '483', PlayerConfig.useMobileFirst || false, flashvars, video, params);
}
function theCallBack(result) {
  var rmd = "?rmd=" + Math.random();
  var flashvars = {
    f: _VideoOptions.HlsPath == '' ? GetFlashVar() : PlayerConfig.playerPath + "m3u8.swf",
    a: _VideoOptions.HlsPath,
    loaded: 'loadedHandler',
    s: _VideoOptions.HlsPath == '' ? PlayerConfig.desktopPlayer.s : 4,
    b: 0,
    c: '0',
    a: _VideoOptions.HlsPath == '' ? GetFlashParameters() : _VideoOptions.HlsPath,
    i: PlayerConfig.mobilePlayer.i,
    l: PlayerConfig.desktopPlayer.l,
    r: PlayerConfig.desktopPlayer.r,
    t: PlayerConfig.desktopPlayer.t,
    e: PlayerConfig.desktopPlayer.e || 5,
    d: PlayerConfig.desktopPlayer.d,
    u: PlayerConfig.desktopPlayer.u,
    pub_fl: PlayerConfig.desktopPlayer.pub_fl,
    pub_it: PlayerConfig.desktopPlayer.pub_it,
    pub_io: PlayerConfig.desktopPlayer.pub_io,
    pub_link: PlayerConfig.desktopPlayer.pub_link,
    pub_surl: PlayerConfig.desktopPlayer.pub_surl,
    p: 1,
    h: 4
  }
  var params = {
    bgcolor: '#FFF',
    allowFullScreen: true,
    allowScriptAccess: 'always',
    wmode: "transparent"
  };
  var myvideo = GetServerFile(result);
  var video = [myvideo];
  CKobject.embed(PlayerConfig.playerPath + 'ckplayer.swf' + (PlayerConfig.useRandom || ''), 'a1', 'ckplayer_a1', PlayerConfig.width || '860', PlayerConfig.height || '483', PlayerConfig.useMobileFirst || false, flashvars, video, params);
}
;function GetFileExtension(fileName) {
  return (fileName = fileName.substr(1 + fileName.lastIndexOf("/")).split('?')[0]).substr(fileName.lastIndexOf("."))
}
function GetServerFile(fileName) {
  var extension = GetFileExtension(fileName);
  switch (extension) {
    case ".mp4":
      return fileName + "->" + "video/mp4";
    case ".m3u8":
      return fileName + "->" + "application/x-mpegURL";
  }
  return "";
}
function GetFlashParameters() {
  if (PlayerConfig.desktopPlayer.s == 3) {
    return PlayerConfig.desktopPlayer.a + PlayerConfig.id;
  }
  return '';
}
function GetFlashVar() {
  if (PlayerConfig.desktopPlayer.s == 2) {
    return PlayerConfig.prefix + PlayerConfig.desktopPlayer.method + PlayerConfig.id
  }
  if (PlayerConfig.desktopPlayer.s == 3) {
    return PlayerConfig.playerPath + PlayerConfig.desktopPlayer.method
  }
  return null ;
}
function GetResource(callback, hlspath) {
  createObj("_uid", PlayerConfig.key, 1);
  if (hlspath) {
    _VideoOptions.HlsPath = hlspath;
  }
  if ($("#a1").attr("data-type")) {
    _VideoOptions.IsDashAvailable = true;
  }
  if (PlayerConfig.mobilePlayer.directrender) {
    callback(PlayerConfig.prefix + PlayerConfig.mobilePlayer.method + PlayerConfig.id + PlayerConfig.mobilePlayer.parameters);
  } else {
    $.ajax({
      type: 'post',
      url: PlayerConfig.prefix + PlayerConfig.mobilePlayer.method + PlayerConfig.id + PlayerConfig.mobilePlayer.parameters,
      data: {
        key: PlayerConfig.key
      },
      async: true,
      success: function(result) {
        switch (result) {
          case "-1":
            alert("请求不合法，如果多部影片出现该问题，请联系客服。");
            return;
          case "-2":
            alert("请求不合法，如果多部影片出现该问题，请联系客服。");
            return;
          case "-3":
            alert("请求的方式不对。");
            return;
          case "-4":
            alert("您未开启Cookie，或您的访问已过期，请尝试刷新页面。");
            return;
        }
        callback(result);
      },
      error: function(request, status, error) {
        var message = "服务器错误，请稍候重试";
        alert(message);
      }
    });
  }
}
;function playerstop() {
  clearPlayPoint();
  $.ajax({
    type: 'get',
    url: PlayerConfig.prefix + 'Getnext.aspx?id=' + PlayerConfig.id + "&lid=" + PlayerConfig.lid + "&isk=" + PlayerConfig.isk,
    async: true,
    success: function(result) {
      if (result != "") {
        var key_hash = Cty.enc.Utf8.parse('11387990');
        var iv = Cty.enc.Utf8.parse('10111213');
        var decrypted = Cty.DES.decrypt(result, key_hash, {
          iv: iv
        }).toString(Cty.enc.Utf8);
        var first = decrypted.split("<>");
        if (first.length == 4) {
          CKobject.getObjectById(_VideoOptions.ckid).newAddress('{f->' + first[1] + '}{s->0}{html5->' + GetServerFile(first[3]) + '}');
        } else if (first.length == 5) {
          CKobject.getObjectById(_VideoOptions.ckid).newAddress('{f->' + PlayerConfig.playerPath + "m3u8.swf" + '}{a->' + first[4] + '}{s->4}{html5->' + GetServerFile(first[3]) + '}');
        }
        if (first.length >= 4) {
          PlayerConfig.id = first[0];
          var text = $("#bfy_title").text();
          $("#bfy_title").text(text.substring(0, text.lastIndexOf('-') + 1) + first[2]);
        }
      }
    },
    error: function() {}
  });
}
function createObj(name, value, days, domain) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/;domain=" + domain || GetFirstLevelHostName();
}
function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ')
      c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null ;
}
function CheckStatus() {
  $.ajax({
    type: 'get',
    url: '/test.aspx?id=' + Math.random(),
    async: true,
    success: function(result) {
      if (result != "1") {
        location.replace('/zhanghaoLogin.aspx');
      }
    }
  })
}
function include(src) {
  HTMLCode = '<script language="javascript" src="' + src + '"></script>';
  document.write(HTMLCode);
}
function PlayAds(l, r, t) {
  var ads_list = l.split('|');
  var link_list = r.split('|');
  var sec_list = t.split('|');
  var total_sec = 0;
  for (var i = 0; i < ads_list.length; i++) {
    if (ads_list[i].indexOf("swf") > 0) {
      ads_list.splice(i, 1);
      link_list.splice(i, 1);
      sec_list.splice(i, 1);
      i--;
    } else {
      total_sec += parseInt(sec_list[i]);
    }
  }
  callAdd(ads_list, link_list, sec_list);
  var total_sec2 = total_sec;
  var itr = setInterval(function() {
    var second = $(".second");
    second.text(total_sec2--);
  }, 980);
  setTimeout(function() {
    $(".ads-control").remove();
    var second = $(".second");
    clearInterval(itr);
    second.text("");
  }, total_sec * 1020);
}
function callAdd(img, link, sec) {
  if (img.length > 0) {
    var content = $(".mobile-only");
    var secd = parseInt(sec[0]);
    var time = parseInt(secd) * 980;
    $(content).html('<a href="' + link[0] + '" target="_blank"><img src="' + img[0] + '" /></a>');
    img.splice(0, 1);
    link.splice(0, 1);
    sec.splice(0, 1);
    setTimeout(function() {
      callAdd(img, link, sec);
    }, time);
  }
}
function replace_last_comma_with_and(x, exetend) {
  var pos = x.lastIndexOf('.');
  return x.substring(0, pos) + '.' + exetend;
}
