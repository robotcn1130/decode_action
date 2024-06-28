//Fri Jun 28 2024 07:18:29 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("玩一玩竞猜抽奖");
const bdy_0x2303f5 = $.isNode() ? require("./jdCookie.js") : "",
  bdy_0x5a1ab9 = $.isNode() ? require("./sendNotify") : "",
  bdy_0x193645 = require("./function/dylans");
if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");
    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}
let bdy_0x3073e4 = [],
  bdy_0x514cb9 = "",
  bdy_0x15e420 = 0;
if ($.isNode()) {
  Object.keys(bdy_0x2303f5).forEach(_0x93d198 => {
    bdy_0x3073e4.push(bdy_0x2303f5[_0x93d198]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  bdy_0x3073e4 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x303a9a => _0x303a9a.cookie)].filter(_0x109971 => !!_0x109971);
}
$.helpId = [];
$.fullId = [];
!(async () => {
  if (!bdy_0x3073e4[0]) {
    const _0x45968d = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x45968d);
    return;
  }
  console.log("当前版本：20240615");
  console.log("赢得竞猜才获取抽奖次数");
  for (let _0x104818 = 0; _0x104818 < bdy_0x3073e4.length; _0x104818++) {
    bdy_0x514cb9 = bdy_0x3073e4[_0x104818];
    originCookie = bdy_0x3073e4[_0x104818];
    if (bdy_0x514cb9) {
      $.UserName = decodeURIComponent(bdy_0x514cb9.match(/pt_pin=([^; ]+)(?=;?)/) && bdy_0x514cb9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x104818 + 1;
      $.hotFlag = false;
      $.nickName = "";
      $.isLogin = true;
      $.outFlag = false;
      $.isban = false;
      $.hasRisk = false;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      bdy_0x2f01f0();
      await bdy_0x43a13e();
      if (!$.isLogin) {
        const _0x231b9e = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x231b9e);
        if ($.isNode()) {
          await bdy_0x5a1ab9.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await bdy_0x591c6c();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      if ($.outFlag) {
        break;
      }
    }
  }
})().catch(_0x2e4c94 => {
  return $.logErr(_0x2e4c94);
}).finally(() => {
  return $.done();
});
async function bdy_0x61da98() {
  for (let _0x17745f = 0; _0x17745f < bdy_0x3073e4.length; _0x17745f++) {
    bdy_0x514cb9 = bdy_0x3073e4[_0x17745f];
    if (bdy_0x514cb9) {
      $.UserName = decodeURIComponent(bdy_0x514cb9.match(/pt_pin=([^; ]+)(?=;?)/) && bdy_0x514cb9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x17745f + 1;
      console.log("\n-------开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "------\n");
      bdy_0x2f01f0();
      $.nonum = false;
      $.hphotflag = false;
      $.fullId.length != 0 && ($.helpId = $.helpId.filter(_0x210ac0 => !$.fullId.includes(_0x210ac0)), $.fullId = []);
      if ($.outFlag) {
        break;
      }
    }
  }
}
async function bdy_0x591c6c() {
  try {
    $.taskList = [];
    await bdy_0x3550b3("worldCupGuessHome");
    await $.wait(1000);
    if ($.homeinfo == "") {
      process.exit();
    }
    await bdy_0x3550b3("superLeagueHome");
    await $.wait(1000);
    if ($.remainTimes > 0) {
      for (let _0x43c7af of Array(parseInt($.remainTimes))) {
        await bdy_0x3550b3("superLeagueLottery");
        await $.wait(1000);
      }
    } else {
      console.log("无抽奖次数,去竞猜获取吧！");
    }
  } catch (_0x364ad3) {
    console.log(_0x364ad3);
  }
}
async function bdy_0x3550b3(_0x57dcd7, ..._0x1a0f75) {
  if ($.outFlag || $.isban) {
    return;
  }
  let _0x1250be = "",
    _0x1d44c3,
    _0x3a01a7,
    _0x2716ab = "post",
    _0x45ff42 = "https://api.m.jd.com/client.action",
    _0x34e827 = "signed_wh5";
  switch (_0x57dcd7) {
    case "wanyiwan_sign":
      const _0x3aef06 = {
        version: 1
      };
      _0x1250be = _0x3aef06;
      _0x1d44c3 = "d12dd";
      _0x3a01a7 = "wanyiwan_sign";
      break;
    case "wanyiwan_home":
      const _0x139853 = {
        outsite: 0,
        firstCall: 1,
        version: 1,
        lbsSwitch: true
      };
      _0x1250be = _0x139853;
      _0x1d44c3 = "c81ad";
      _0x3a01a7 = "wanyiwan_home";
      break;
    case "apTaskList":
      _0x45ff42 = "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22Fl1LmxG_f0poD7w1ycZqnw%22%7D&t=1715170975269&appid=activities_platform&client=android&clientVersion=6.24.0&loginType=2&loginWQBiz=wegame&h5st=null&build=22779&screen=393*873&networkType=wifi&eufv=1&cthr=1";
      _0x2716ab = "get";
      break;
    case "startTask":
      const _0x13aea2 = {
        itemId: $.itemId,
        taskType: $.taskType,
        assignmentId: $.encryptAssignmentId,
        actionType: 1,
        version: 1
      };
      _0x1250be = _0x13aea2;
      _0x1d44c3 = "89db2";
      _0x3a01a7 = "wanyiwan_do_task";
      break;
    case "endTask":
      const _0x334c42 = {
        itemId: $.itemId,
        taskType: $.taskType,
        assignmentId: $.encryptAssignmentId,
        actionType: 0,
        version: 1
      };
      _0x1250be = _0x334c42;
      _0x1d44c3 = "89db2";
      _0x3a01a7 = "wanyiwan_do_task";
      break;
    case "award":
      const _0x677676 = {
        taskType: $.taskType,
        assignmentId: $.encryptAssignmentId,
        version: 1
      };
      _0x1250be = _0x677676;
      _0x3a01a7 = "wanyiwan_task_receive_award";
      break;
    case "wanyiwan_assist":
      const _0x286c76 = {
        inviteCode: $.itemId,
        version: 1
      };
      _0x1250be = _0x286c76;
      _0x1d44c3 = "ba505";
      _0x3a01a7 = "wanyiwan_assist";
      break;
    case "turnHappyHome":
      _0x45ff42 = "https://api.m.jd.com/api";
      const _0x3b8310 = {
        linkId: "CDv-TaCmVcD0sxAI_HE2RQ"
      };
      _0x1250be = _0x3b8310;
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "turnHappyHome";
      break;
    case "turnHappyDouble":
      _0x45ff42 = "https://api.m.jd.com/api";
      _0x1250be = {
        linkId: "CDv-TaCmVcD0sxAI_HE2RQ",
        turnNum: parseInt(dbNum)
      };
      _0x1d44c3 = "614f1";
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "turnHappyDouble";
      break;
    case "turnHappyReceive":
      _0x45ff42 = "https://api.m.jd.com/api";
      const _0x45267f = {
        linkId: "CDv-TaCmVcD0sxAI_HE2RQ"
      };
      _0x1250be = _0x45267f;
      _0x1d44c3 = "25fac";
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "turnHappyReceive";
      break;
    case "worldCupGuessHome":
      _0x45ff42 = "https://api.m.jd.com/api";
      const _0x425d3e = {
        linkId: "Y-rvrlRieX6qg8YqJLwPKg"
      };
      _0x1250be = _0x425d3e;
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "worldCupGuessHome";
      break;
    case "worldCupGuessBet":
      _0x45ff42 = "https://api.m.jd.com/api";
      const _0x33f166 = {
        linkId: "Y-rvrlRieX6qg8YqJLwPKg",
        roundId: _0x1a0f75[0],
        actId: _0x1a0f75[1],
        bankId: _0x1a0f75[2],
        questionId: _0x1a0f75[3],
        userChoice: _0x1a0f75[4],
        bettingAmount: _0x1a0f75[5]
      };
      _0x1250be = _0x33f166;
      _0x1d44c3 = "45eb1";
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "worldCupGuessBet";
      break;
    case "superLeagueHome":
      _0x45ff42 = "https://api.m.jd.com/api";
      const _0x3a0820 = {
        linkId: "cA1G3upCCFbjyu75uxgxxg"
      };
      _0x1250be = _0x3a0820;
      _0x1d44c3 = "b7d17";
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "superLeagueHome";
      break;
    case "superLeagueLottery":
      _0x45ff42 = "https://api.m.jd.com/api";
      const _0x43867b = {
        linkId: "cA1G3upCCFbjyu75uxgxxg"
      };
      _0x1250be = _0x43867b;
      _0x1d44c3 = "60dc4";
      _0x34e827 = "activities_platform";
      _0x3a01a7 = "superLeagueLottery";
      break;
    default:
      console.log("错误" + _0x57dcd7);
  }
  if (_0x1d44c3) {
    let _0x440362 = {
      appId: _0x1d44c3,
      functionId: _0x3a01a7,
      body: _0x1250be,
      appid: _0x34e827,
      clientVersion: $.UA.split(";")[2],
      client: "ios",
      user: $.UserName,
      t: Date.now(),
      ua: $.UA
    };
    _0x1250be = await bdy_0x193645.getbody(_0x440362);
    if (!_0x1250be) {
      return;
    }
  } else {
    _0x1250be && (_0x1250be = "functionId=" + _0x3a01a7 + "&body=" + encodeURIComponent(JSON.stringify(_0x1250be)) + "&t=" + Date.now() + "&appid=" + _0x34e827 + "&client=ios&" + $.UA.split(";")[2] + "&cthr=1&networkType=wifi");
  }
  let _0x38470d = bdy_0x557b42(_0x45ff42, _0x1250be);
  return new Promise(async _0x29ac5c => {
    $["d" + _0x2716ab](_0x38470d, async (_0x2f9bb7, _0x23d4b1, _0x5b0283) => {
      try {
        if (_0x2f9bb7) {
          if (_0x23d4b1 && typeof _0x23d4b1.statusCode != "undefined") {
            if (_0x23d4b1.statusCode == 493) {
              if (bdy_0x15e420 < 6) {
                bdy_0x15e420++;
                await bdy_0x3550b3(_0x57dcd7);
                return;
              }
              console.log("ip可能被限制，过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log("" + $.toStr(_0x2f9bb7, _0x2f9bb7));
        } else {
          if (_0x5b0283.includes("doctype") && bdy_0x15e420 < 6) {
            bdy_0x15e420++;
            await bdy_0x3550b3(_0x57dcd7);
            return;
          }
          bdy_0x15e420 = 0;
          bdy_0x35e629(_0x57dcd7, _0x5b0283);
        }
      } catch (_0x3eb920) {
        console.log(_0x3eb920, _0x23d4b1);
      } finally {
        _0x29ac5c();
      }
    });
  });
}
function bdy_0x728285(_0x4ab919) {
  let _0x25eccc = "";
  switch (type) {
    case [_0x25eccc]:
      const _0x122ff3 = {
        ed: ed
      };
      _0xf1f6le = _0x122ff3;
      break;
    case [_0x25eccc]:
      const _0x49adf3 = {
        bd: bd
      };
      _0xf1f6lc = _0x49adf3;
      break;
    case [_0x25eccc]:
      const _0x27502a = {
        ed: ed
      };
      _0xf1f6lf = _0x27502a;
      break;
    case [_0x25eccc]:
      const _0x3dc273 = {
        ed: ed
      };
      _0xf1f6lg = _0x3dc273;
      break;
    case [_0x25eccc]:
      const _0x62f048 = {
        ed: ed
      };
      _0xf1f6lv = _0x62f048;
      break;
  }
}
async function bdy_0x35e629(_0x3f789d, _0x3d4898) {
  let _0x1bd329 = "";
  try {
    _0x1bd329 = JSON.parse(_0x3d4898);
  } catch (_0x12d11f) {
    console.log(_0x3f789d + " 执行任务异常");
  }
  try {
    switch (_0x3f789d) {
      case "award":
        _0x1bd329.code == 0 ? _0x1bd329.data.bizCode == 0 ? console.log("任务完成，获得" + _0x1bd329.data.result.rewardCount + "奖票 🎫") : console.log(_0x1bd329.data.bizMsg) : console.log(_0x1bd329.message);
        break;
      case "wanyiwan_sign":
        if (_0x1bd329.code == 0) {
          _0x1bd329.data.bizCode == 0 ? console.log("签到成功,获得" + _0x1bd329.data.result.getScore + "奖票 🎫") : console.log(_0x1bd329.data.bizMsg);
        } else {
          console.log(_0x1bd329.message);
        }
        break;
      case "wanyiwan_assist":
        if (_0x1bd329.code == 0) {
          if (_0x1bd329.data.bizCode == 0) {
            console.log("✔️ 助力成功");
            $.nonum = true;
          } else {
            if (_0x1bd329.data.bizMsg.includes("太多人") || _0x1bd329.data.bizMsg.includes("重复")) {
              console.log("❌", _0x1bd329.data.bizCode, _0x1bd329.data.bizMsg);
              $.nonum = true;
            } else {
              if (_0x1bd329.data.bizMsg.includes("已经完成")) {
                console.log("❌", _0x1bd329.data.bizCode, _0x1bd329.data.bizMsg);
                $.fullId.push($.itemId);
              } else {
                _0x1bd329.data.bizMsg.includes("火爆") ? (console.log("❌", _0x1bd329.data.bizCode, _0x1bd329.data.bizMsg), $.hphotflag = true) : console.log("❌", _0x1bd329.data.bizCode, _0x1bd329.data.bizMsg);
              }
            }
          }
        } else {
          console.log(_0x1bd329.message);
          _0x1bd329.message.includes("火爆") && ($.hphotflag = true);
        }
        break;
      case "wanyiwan_home":
        _0x1bd329.code == 0 ? _0x1bd329.data.bizCode == 0 ? (_0x1bd329.data.result.popWindows.length != 0 && console.log("获得新手奖励：", _0x1bd329.data.result.popWindows[0].getScore, "奖票 🎫"), console.log("当前奖票总量：" + _0x1bd329.data.result.score + " 🎫"), $.isLogin = _0x1bd329.data?.["result"]?.["isLogin"], $.taskList = _0x1bd329.data?.["result"]?.["taskBoard"] || [], $.signstatus = _0x1bd329.data?.["result"]?.["signBoard"]?.["status"] || 0) : console.log(_0x1bd329.data.bizMsg) : console.log(_0x1bd329.message);
        break;
      case "superLeagueHome":
        if (_0x1bd329.success) {
          $.remainTimes = _0x1bd329.data.remainTimes;
        } else {
          console.log(_0x1bd329.errMsg);
        }
        break;
      case "superLeagueLottery":
        if (_0x1bd329.success) {
          if (_0x1bd329.data.prizeConfigName) {
            if (_0x1bd329.data.prizeConfigName.includes("超市卡")) {
              console.log("----获得：" + _0x1bd329.data.prizeConfigName + " 🤑");
              _0x1bd329.data.prizeConfigName === "50元超市卡" && (message += "[账号" + $.index + $.UserName + "]获得：  " + _0x1bd329.data.prizeConfigName + "\n");
            } else {
              console.log("----获得：" + _0x1bd329.data.prizeConfigName + " " + _0x1bd329.data.codeDesc);
            }
          } else {
            console.log("----空气");
          }
        } else {
          console.log(_0x1bd329.errMsg);
        }
        break;
      case "turnHappyHome":
        _0x1bd329.success ? $.leftTime = _0x1bd329.data.leftTime : console.log(_0x1bd329.errMsg);
        break;
      case "turnHappyDouble":
        _0x1bd329.success ? _0x1bd329.data.rewardState == 1 ? (console.log("翻倍成功，获得 " + _0x1bd329.data.rewardValue + "奖票 🎫"), $.dbsuc = true) : console.log("叼了，翻倍失败！再接再厉！") : console.log(_0x1bd329.errMsg);
        break;
      case "worldCupGuessHome":
        _0x1bd329.success ? $.homeinfo = _0x1bd329.data || "" : console.log(_0x1bd329.errMsg);
        break;
      case "worldCupGuessBet":
        _0x1bd329.success ? console.log("竞猜成功！祝你好运") : console.log(_0x1bd329.errMsg);
        break;
      case "superRedBagDraw":
        if (_0x1bd329.success) {
          $.shakeLeftTime = _0x1bd329.data.shakeLeftTime;
          const {
            prizeDrawVo = ""
          } = _0x1bd329.data;
          if (prizeDrawVo) {
            switch (prizeDrawVo.prizeType) {
              case 24:
                console.log("获得：" + prizeDrawVo.amount + "票奖 🎫");
                $.sucdraw++;
                break;
              case 1:
                console.log("获得:" + prizeDrawVo.prizeConfigName);
                break;
              default:
                console.log(prizeDrawVo);
                break;
            }
          } else {
            console.log(_0x3d4898);
          }
        } else {
          console.log(_0x1bd329.errMsg);
        }
        break;
      case "startTask":
      case "turnHappyReceive":
      case "endTask":
        break;
      default:
        console.log(_0x3f789d + " -> " + _0x3d4898);
    }
    typeof _0x1bd329 == "object" && _0x1bd329.errorMessage && _0x1bd329.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x9aebce) {
    console.log(_0x3f789d + " " + _0x9aebce);
  }
}
function bdy_0x557b42(_0x1cacea, _0x1b1ec9) {
  let _0xf46bab = {
    Accept: "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    Origin: "https://pro.m.jd.com",
    Referer: "https://pro.m.jd.com/",
    Cookie: bdy_0x514cb9,
    "User-Agent": $.UA
  };
  const _0x2baa3c = {
    url: _0x1cacea,
    headers: _0xf46bab,
    timeout: 30000,
    ...(_0x1b1ec9 ? {
      body: _0x1b1ec9
    } : {})
  };
  return _0x2baa3c;
}
async function bdy_0x2f01f0() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + bdy_0x1e96a5(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function bdy_0x1e96a5(_0x239dd7) {
  _0x239dd7 = _0x239dd7 || 32;
  let _0x1cd5af = "abcdef0123456789",
    _0x94e98f = _0x1cd5af.length,
    _0x1f3616 = "";
  for (i = 0; i < _0x239dd7; i++) {
    _0x1f3616 += _0x1cd5af.charAt(Math.floor(Math.random() * _0x94e98f));
  }
  return _0x1f3616;
}
function bdy_0x5beede(_0x5d217b) {
  if (typeof _0x5d217b == "string") {
    try {
      return JSON.parse(_0x5d217b);
    } catch (_0x562cb9) {
      console.log(_0x562cb9);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function bdy_0xefde32() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x254b41 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    let _0x2599c2 = {
      venderId: "" + $.joinVenderId + "",
      shopId: "" + $.joinVenderId + "",
      bindByVerifyCodeFlag: 1,
      registerExtend: {},
      writeChildFlag: 0,
      channel: 406
    };
    $.shopactivityId == "" && delete _0x2599c2.activityId;
    let _0x212259 = {
      appId: "27004",
      fn: "bindWithVender",
      body: _0x2599c2,
      apid: "shopmember_m_jd_com",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: $.UA
    };
    _0x2599c2 = await dyy.getbody(_0x212259);
    const _0xe39ea2 = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: bdy_0x514cb9,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": $.UA
    };
    const _0x52e226 = {
      url: "https://api.m.jd.com/client.action?" + _0x2599c2 + "&uuid=88888",
      headers: _0xe39ea2,
      timeout: 30000
    };
    $.dget(_0x52e226, async (_0x183e5f, _0x94f454, _0xacd7f5) => {
      try {
        _0xacd7f5 = _0xacd7f5 && _0xacd7f5.match(/jsonp_.*?\((.*?)\);/) && _0xacd7f5.match(/jsonp_.*?\((.*?)\);/)[1] || _0xacd7f5;
        let _0x493c90 = $.toObj(_0xacd7f5, _0xacd7f5);
        if (_0x493c90 && typeof _0x493c90 == "object") {
          if (_0x493c90 && _0x493c90.success === true) {
            console.log("    " + _0x493c90.message);
            $.errorJoinShop = _0x493c90.message;
            if (_0x493c90.result && _0x493c90.result.giftInfo) {
              for (let _0x251965 of _0x493c90.result.giftInfo.giftList) {
                console.log("入会获得:" + _0x251965.discountString + _0x251965.prizeName + _0x251965.secondLineDesc);
              }
            }
          } else {
            _0x493c90 && typeof _0x493c90 == "object" && _0x493c90.message ? ($.errorJoinShop = _0x493c90.message, console.log("" + (_0x493c90.message || ""))) : console.log(_0xacd7f5);
          }
        } else {
          console.log(_0xacd7f5);
        }
      } catch (_0x25fb0b) {
        $.logErr(_0x25fb0b, _0x94f454);
      } finally {
        _0x254b41();
      }
    });
  });
}
async function bdy_0x3a3c20() {
  return new Promise(async _0x5045a8 => {
    let _0x2872aa = {
      venderId: $.joinVenderId,
      payUpShop: true,
      queryVersion: "10.5.2",
      appid: "ef79a",
      needSecurity: true,
      bizId: "shop_view_app",
      channel: 406
    };
    let _0x2aadc5 = {
      appId: "ef79a",
      fn: "getShopOpenCardInfo",
      body: _0x2872aa,
      apid: "jd_shop_member",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    _0x2872aa = await dyy.getbody(_0x2aadc5);
    const _0x3dd38b = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: bdy_0x514cb9,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    const _0xb5e23 = {
      url: "https://api.m.jd.com/client.action?" + _0x2872aa + "&uuid=88888",
      headers: _0x3dd38b,
      timeout: 60000
    };
    $.get(_0xb5e23, async (_0x512db0, _0xfbf8c, _0x5e80f1) => {
      try {
        _0x5e80f1 = _0x5e80f1 && _0x5e80f1.match(/jsonp_.*?\((.*?)\);/) && _0x5e80f1.match(/jsonp_.*?\((.*?)\);/)[1] || _0x5e80f1;
        let _0x51ab5e = $.toObj(_0x5e80f1, _0x5e80f1);
        _0x51ab5e && typeof _0x51ab5e == "object" ? _0x51ab5e && _0x51ab5e.success == true && (console.log("去加入 -> " + (_0x51ab5e.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x51ab5e.result[0].interestsRuleList && _0x51ab5e.result[0].interestsRuleList[0] && _0x51ab5e.result[0].interestsRuleList[0].interestsInfo && _0x51ab5e.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x5e80f1);
      } catch (_0x27323f) {
        $.logErr(_0x27323f, _0xfbf8c);
      } finally {
        _0x5045a8();
      }
    });
  });
}
function bdy_0x47c80a(_0x3ab4f7, _0x1dc434) {
  return Math.floor(Math.random() * (_0x1dc434 - _0x3ab4f7)) + _0x3ab4f7;
}
function bdy_0x13191a(_0x5caef7 = +new Date()) {
  var _0x31902f = new Date(_0x5caef7 + 28800000);
  return _0x31902f.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}
function bdy_0x43a13e() {
  return new Promise(_0x376b29 => {
    const _0x23a040 = {
      Cookie: bdy_0x514cb9,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x5d392d = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x23a040,
      timeout: 10000
    };
    $.get(_0x5d392d, (_0x48fb3d, _0x13d7a8, _0x29d268) => {
      try {
        if (_0x29d268) {
          _0x29d268 = JSON.parse(_0x29d268);
          if (!(_0x29d268.islogin === "1")) {
            _0x29d268.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x443ef3) {
        console.log(_0x443ef3);
      } finally {
        _0x376b29();
      }
    });
  });
}
function Env(o, t) {
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((r, i) => {
        s.call(this, t, (t, e, s) => {
          t ? i(t) : r(e);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.logLevels = {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
      };
      this.logLevelPrefixs = {
        debug: "[DEBUG] ",
        info: "[INFO] ",
        warn: "[WARN] ",
        error: "[ERROR] "
      };
      this.logLevel = "info";
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.encoding = "utf-8";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    getEnv() {
      return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0;
    }
    isNode() {
      return "Node.js" === this.getEnv();
    }
    isQuanX() {
      return "Quantumult X" === this.getEnv();
    }
    isSurge() {
      return "Surge" === this.getEnv();
    }
    isLoon() {
      return "Loon" === this.getEnv();
    }
    isShadowrocket() {
      return "Shadowrocket" === this.getEnv();
    }
    isStash() {
      return "Stash" === this.getEnv();
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null, ...s) {
      try {
        return JSON.stringify(t, ...s);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      if (this.getdata(t)) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(r => {
        this.get({
          url: t
        }, (t, e, s) => r(s));
      });
    }
    runScript(a, o) {
      return new Promise(r => {
        let t = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        t = t && t.replace(/\n/g, "").trim();
        var e = (e = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout")) ? +e : 20,
          [s, i] = (e = o && o.timeout ? o.timeout : e, t.split("@"));
        this.post({
          url: `http://${i}/v1/scripting/evaluate`,
          body: {
            script_text: a,
            mock_type: "cron",
            timeout: e
          },
          headers: {
            "X-Key": s,
            Accept: "*/*"
          },
          timeout: e
        }, (t, e, s) => r(s));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      this.fs = this.fs || require("fs");
      this.path = this.path || require("path");
      var t = this.path.resolve(this.dataFile),
        e = this.path.resolve(process.cwd(), this.dataFile),
        s = this.fs.existsSync(t),
        r = !s && this.fs.existsSync(e);
      if (!s && !r) {
        return {};
      }
      r = s ? t : e;
      try {
        return JSON.parse(this.fs.readFileSync(r));
      } catch (t) {
        return {};
      }
    }
    writedata() {
      var t, e, s, r, i;
      this.isNode() && (this.fs = this.fs || require("fs"), this.path = this.path || require("path"), t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), r = !(s = this.fs.existsSync(t)) && this.fs.existsSync(e), i = JSON.stringify(this.data), !s && r ? this.fs.writeFileSync(e, i) : this.fs.writeFileSync(t, i));
    }
    lodash_get(t, e, s) {
      let r = t;
      for (const t of e.replace(/\[(\d+)\]/g, ".$1").split(".")) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, r, e) {
      Object(t) === t && ((r = Array.isArray(r) ? r : r.toString().match(/[^.[\]]+/g) || []).slice(0, -1).reduce((t, e, s) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(r[s + 1]) >> 0 == +r[s + 1] ? [] : {}, t)[r[r.length - 1]] = e);
      return t;
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        var [, s, r] = /^@(.*?)\.(.*?)$/.exec(t);
        if (s = s ? this.getval(s) : "") {
          try {
            const t = JSON.parse(s);
            e = t ? this.lodash_get(t, r, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        var [, r, i] = /^@(.*?)\.(.*?)$/.exec(e),
          a = this.getval(r),
          a = r ? "null" === a ? null : a || "{}" : "{}";
        try {
          const e = JSON.parse(a);
          this.lodash_set(e, i, t);
          s = this.setval(JSON.stringify(e), r);
        } catch (e) {
          this.lodash_set(a = {}, i, t);
          s = this.setval(JSON.stringify(a), r);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.read(t);
        case "Quantumult X":
          return $prefs.valueForKey(t);
        case "Node.js":
          this.data = this.loaddata();
          return this.data[t];
        default:
          return this.data && this.data[t] || null;
      }
    }
    setval(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
          return $persistentStore.write(t, e);
        case "Quantumult X":
          return $prefs.setValueForKey(t, e);
        case "Node.js":
          this.data = this.loaddata();
          this.data[e] = t;
          this.writedata();
          return !0;
        default:
          return this.data && this.data[e] || null;
      }
    }
    initGotEnv(t) {
      this.got = this.got || require("got");
      this.cktough = this.cktough || require("tough-cookie");
      this.ckjar = this.ckjar || new this.cktough.CookieJar();
      t && (t.headers = t.headers || {}, t) && (t.headers = t.headers || {}, void 0 === t.headers.cookie) && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar);
    }
    tmout() {
      return new Promise((t, e) => {
        this.tmoutId = setTimeout(() => {
          this.prms.cancel();
          e({
            message: "timemout",
            response: ""
          });
        }, 50000);
      });
    }
    get(t, a = () => {}) {
      switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.get(t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            }, r, i);
          }, t => a(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          this.initGotEnv(t);
          this.prms = this.got(t).on("redirect", (t, e) => {
            try {
              var s;
              t.headers["set-cookie"] && ((s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString()) && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar);
            } catch (t) {
              this.logErr(t);
            }
          });
          Promise.race([this.prms, this.tmout()]).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            }, i);
            clearTimeout(this.tmoutId);
          }, t => {
            var {
              message: t,
              response: e
            } = t;
            clearTimeout(this.tmoutId);
            a(t, e, e && e.body);
          });
      }
    }
    post(t, a = () => {}) {
      var e = t.method ? t.method.toLocaleLowerCase() : "post";
      switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = {
        redirection: !1
      })), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        default:
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient[e](t, (t, e, s) => {
            !t && e && (e.body = s, e.statusCode = e.status || e.statusCode, e.status = e.statusCode);
            a(t, e, s);
          });
          break;
        case "Quantumult X":
          t.method = e;
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              body: r,
              bodyBytes: i
            }, r, i);
          }, t => a(t && t.error || "UndefinedError"));
          break;
        case "Node.js":
          this.initGotEnv(t);
          var {
            url: s,
            ...r
          } = t;
          this.prms = this.got[e](s, r);
          Promise.race([this.prms, this.tmout()]).then(t => {
            var {
              statusCode: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            } = t;
            a(null, {
              status: t,
              statusCode: e,
              headers: s,
              rawBody: r,
              body: i
            }, i);
            clearTimeout(this.tmoutId);
          }, t => {
            var {
              message: t,
              response: e
            } = t;
            clearTimeout(this.tmoutId);
            a(t, e, e && e.body);
          });
      }
    }
    time(t, e = null) {
      var s,
        r = {
          "M+": (e = e ? new Date(e) : new Date()).getMonth() + 1,
          "d+": e.getDate(),
          "H+": e.getHours(),
          "m+": e.getMinutes(),
          "s+": e.getSeconds(),
          "q+": Math.floor((e.getMonth() + 3) / 3),
          S: e.getMilliseconds()
        };
      for (s in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), r) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? r[s] : ("00" + r[s]).substr(("" + r[s]).length)));
      return t;
    }
    queryStr(e) {
      let s = "";
      for (const r in e) {
        let t = e[r];
        null != t && "" !== t && ("object" == typeof t && (t = JSON.stringify(t)), s += `${r}=${t}&`);
      }
      return s = s.substring(0, s.length - 1);
    }
    msg(t = o, e = "", s = "", r = {}) {
      var i,
        a = r => {
          const {
            $open: t,
            $copy: e,
            $media: i,
            $mediaMime: a
          } = r;
          switch (typeof r) {
            case void 0:
              return r;
            case "string":
              switch (this.getEnv()) {
                case "Surge":
                case "Stash":
                default:
                  return {
                    url: r
                  };
                case "Loon":
                case "Shadowrocket":
                  return r;
                case "Quantumult X":
                  return {
                    "open-url": r
                  };
                case "Node.js":
                  return;
              }
            case "object":
              switch (this.getEnv()) {
                case "Surge":
                case "Stash":
                case "Shadowrocket":
                default:
                  var o = {},
                    s = r.openUrl || r.url || r["open-url"] || t;
                  if (s && Object.assign(o, {
                    action: "open-url",
                    url: s
                  }), (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(o, {
                    action: "clipboard",
                    text: s
                  }), i) {
                    let t, e, s;
                    if (i.startsWith("http")) {
                      t = i;
                    } else {
                      if (i.startsWith("data:")) {
                        const [r] = i.split(";"),
                          [, a] = i.split(",");
                        e = a;
                        s = r.replace("data:", "");
                      } else {
                        e = i;
                        s = (t => {
                          var e,
                            s = {
                              JVBERi0: "application/pdf",
                              R0lGODdh: "image/gif",
                              R0lGODlh: "image/gif",
                              iVBORw0KGgo: "image/png",
                              "/9j/": "image/jpg"
                            };
                          for (e in s) if (0 === t.indexOf(e)) {
                            return s[e];
                          }
                          return null;
                        })(i);
                      }
                    }
                    Object.assign(o, {
                      "media-url": t,
                      "media-base64": e,
                      "media-base64-mime": a ?? s
                    });
                  }
                  Object.assign(o, {
                    "auto-dismiss": r["auto-dismiss"],
                    sound: r.sound
                  });
                  return o;
                case "Loon":
                  {
                    const e = {};
                    (s = r.openUrl || r.url || r["open-url"] || t) && Object.assign(e, {
                      openUrl: s
                    });
                    var n = r.mediaUrl || r["media-url"];
                    (n = i?.startsWith("http") ? i : n) && Object.assign(e, {
                      mediaUrl: n
                    });
                    console.log(JSON.stringify(e));
                    return e;
                  }
                case "Quantumult X":
                  {
                    const a = {};
                    (o = r["open-url"] || r.url || r.openUrl || t) && Object.assign(a, {
                      "open-url": o
                    });
                    n = r["media-url"] || r.mediaUrl;
                    (n = i?.startsWith("http") ? i : n) && Object.assign(a, {
                      "media-url": n
                    });
                    (s = r["update-pasteboard"] || r.updatePasteboard || e) && Object.assign(a, {
                      "update-pasteboard": s
                    });
                    console.log(JSON.stringify(a));
                    return a;
                  }
                case "Node.js":
                  return;
              }
            default:
              return;
          }
        };
      if (!this.isMute) {
        switch (this.getEnv()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
          default:
            $notification.post(t, e, s, a(r));
            break;
          case "Quantumult X":
            $notify(t, e, s, a(r));
            break;
          case "Node.js":
        }
      }
      this.isMuteLog || ((i = ["", "==============📣系统通知📣=============="]).push(t), e && i.push(e), s && i.push(s), console.log(i.join("\n")), this.logs = this.logs.concat(i));
    }
    debug(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.debug && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.debug + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    info(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.info && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.info + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    warn(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.warn && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.warn + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    error(...t) {
      this.logLevels[this.logLevel] <= this.logLevels.error && (0 < t.length && (this.logs = [...this.logs, ...t]), console.log("" + this.logLevelPrefixs.error + t.map(t => t ?? String(t)).join(this.logSeparator)));
    }
    log(...t) {
      0 < t.length && (this.logs = [...this.logs, ...t]);
      console.log(t.map(t => t ?? String(t)).join(this.logSeparator));
    }
    logErr(t, e) {
      switch (this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          this.log("", `❗️${this.name}, 错误!`, t);
          break;
        case "Node.js":
          this.log("", `❗️${this.name}, 错误!`, void 0 !== t.message ? t.message : t);
      }
    }
    wait(e) {
      return new Promise(t => setTimeout(t, e));
    }
    done(t = {}) {
      var e = (new Date().getTime() - this.startTime) / 1000;
      switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) {
        case "Surge":
        case "Loon":
        case "Stash":
        case "Shadowrocket":
        case "Quantumult X":
        default:
          $done(t);
          break;
        case "Node.js":
          process.exit(1);
      }
    }
  }(o, t);
}