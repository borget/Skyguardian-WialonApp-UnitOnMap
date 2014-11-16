(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.application":"wialon.Application","qx.debug":false,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.debug.io":false,"qx.debug.ui.queue":false,"qx.optimization.basecalls":true,"qx.optimization.comments":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.revision":"","qx.theme":"qx.theme.Modern","qx.version":"3.0.1"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"script"},"qx":{"resourceUri":"resource","sourceUri":"script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"},"wialon":{"resourceUri":"resource","sourceUri":"script"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null};
qx.$$locales = {"C":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:wialon.55c7ddd185c8.js"]}},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : false,

  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      euri = euri.replace("../", "");
euri = euri.replace("source", "");
if (euri.substr(0, 1) != "/")
	euri = "/" + euri;
euri = "/wsdk" + euri;
if (typeof wialonSDKExternalUrl != "undefined")
	euri = wialonSDKExternalUrl + euri;
      uris.push(euri);
    }
    return uris;
  }
};

var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
    loadScript(item,  function() {
      if (isWebkit) {
        // force async, else Safari fails with a "maximum recursion depth exceeded"
        window.setTimeout(function() {
          loadScriptList(list, callback);
        }, 0);
      } else {
        loadScriptList(list, callback);
      }
    });
  }
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function ()
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true;
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{},"resources":{},"translations":{"C":{}}};

(function(){

  var b = ".prototype",c = "function",d = "Boolean",e = "Error",f = "Object.keys requires an object as argument.",g = "constructor",h = "warn",j = "default",k = "hasOwnProperty",m = "string",n = "Object",o = "toLocaleString",p = "error",q = "toString",r = "qx.debug",s = "()",t = "RegExp",u = "String",v = "info",w = "BROKEN_IE",x = "isPrototypeOf",y = "Date",z = "",A = "qx.Bootstrap",B = "Function",C = "]",D = "Class",E = "Array",F = "[Class ",G = "valueOf",H = "Number",I = "debug",J = "ES5",K = ".",L = "propertyIsEnumerable",M = "object";
  if(!window.qx){

    window.qx = {
    };
  };
  qx.Bootstrap = {
    genericToString : function(){

      return F + this.classname + C;
    },
    createNamespace : function(name, N){

      var Q = name.split(K);
      var P = Q[0];
      var parent = this.__a && this.__a[P] ? this.__a : window;
      for(var i = 0,O = Q.length - 1;i < O;i++,P = Q[i]){

        if(!parent[P]){

          parent = parent[P] = {
          };
        } else {

          parent = parent[P];
        };
      };
      parent[P] = N;
      return P;
    },
    setDisplayName : function(S, R, name){

      S.displayName = R + K + name + s;
    },
    setDisplayNames : function(U, T){

      for(var name in U){

        var V = U[name];
        if(V instanceof Function){

          V.displayName = T + K + name + s;
        };
      };
    },
    base : function(W, X){

      {
      };
      if(arguments.length === 1){

        return W.callee.base.call(this);
      } else {

        return W.callee.base.apply(this, Array.prototype.slice.call(arguments, 1));
      };
    },
    define : function(name, bj){

      if(!bj){

        var bj = {
          statics : {
          }
        };
      };
      var bf;
      var bb = null;
      qx.Bootstrap.setDisplayNames(bj.statics, name);
      if(bj.members || bj.extend){

        qx.Bootstrap.setDisplayNames(bj.members, name + b);
        bf = bj.construct || new Function;
        if(bj.extend){

          this.extendClass(bf, bf, bj.extend, name, bd);
        };
        var ba = bj.statics || {
        };
        for(var i = 0,bc = qx.Bootstrap.keys(ba),l = bc.length;i < l;i++){

          var Y = bc[i];
          bf[Y] = ba[Y];
        };
        bb = bf.prototype;
        bb.base = qx.Bootstrap.base;
        var bh = bj.members || {
        };
        var Y,bg;
        for(var i = 0,bc = qx.Bootstrap.keys(bh),l = bc.length;i < l;i++){

          Y = bc[i];
          bg = bh[Y];
          if(bg instanceof Function && bb[Y]){

            bg.base = bb[Y];
          };
          bb[Y] = bg;
        };
      } else {

        bf = bj.statics || {
        };
        if(qx.Bootstrap.$$registry && qx.Bootstrap.$$registry[name]){

          var bi = qx.Bootstrap.$$registry[name];
          if(this.keys(bf).length !== 0){

            if(bj.defer){

              bj.defer(bf, bb);
            };
            for(var be in bf){

              bi[be] = bf[be];
            };
            return;
          };
        };
      };
      bf.$$type = D;
      if(!bf.hasOwnProperty(q)){

        bf.toString = this.genericToString;
      };
      var bd = name ? this.createNamespace(name, bf) : z;
      bf.name = bf.classname = name;
      bf.basename = bd;
      if(bj.defer){

        bj.defer(bf, bb);
      };
      qx.Bootstrap.$$registry[name] = bf;
      return bf;
    }
  };
  qx.Bootstrap.define(A, {
    statics : {
      __a : null,
      LOADSTART : qx.$$start || new Date(),
      DEBUG : (function(){

        var bk = true;
        if(qx.$$environment && qx.$$environment[r] === false){

          bk = false;
        };
        return bk;
      })(),
      getEnvironmentSetting : function(bl){

        if(qx.$$environment){

          return qx.$$environment[bl];
        };
      },
      setEnvironmentSetting : function(bm, bn){

        if(!qx.$$environment){

          qx.$$environment = {
          };
        };
        if(qx.$$environment[bm] === undefined){

          qx.$$environment[bm] = bn;
        };
      },
      createNamespace : qx.Bootstrap.createNamespace,
      setRoot : function(bo){

        this.__a = bo;
      },
      base : qx.Bootstrap.base,
      define : qx.Bootstrap.define,
      setDisplayName : qx.Bootstrap.setDisplayName,
      setDisplayNames : qx.Bootstrap.setDisplayNames,
      genericToString : qx.Bootstrap.genericToString,
      extendClass : function(clazz, construct, superClass, name, basename){

        var superproto = superClass.prototype;
        var helper = new Function();
        helper.prototype = superproto;
        var proto = new helper();
        clazz.prototype = proto;
        proto.name = proto.classname = name;
        proto.basename = basename;
        construct.base = superClass;
        clazz.superclass = superClass;
        construct.self = clazz.constructor = proto.constructor = clazz;
      },
      getByName : function(name){

        return qx.Bootstrap.$$registry[name];
      },
      $$registry : {
      },
      objectGetLength : function(bp){

        return qx.Bootstrap.keys(bp).length;
      },
      objectMergeWith : function(br, bq, bt){

        if(bt === undefined){

          bt = true;
        };
        for(var bs in bq){

          if(bt || br[bs] === undefined){

            br[bs] = bq[bs];
          };
        };
        return br;
      },
      __b : [x, k, o, q, G, L, g],
      keys : ({
        "ES5" : Object.keys,
        "BROKEN_IE" : function(bu){

          if(bu === null || (typeof bu != M && typeof bu != c)){

            throw new TypeError(f);
          };
          var bv = [];
          var bx = Object.prototype.hasOwnProperty;
          for(var by in bu){

            if(bx.call(bu, by)){

              bv.push(by);
            };
          };
          var bw = qx.Bootstrap.__b;
          for(var i = 0,a = bw,l = a.length;i < l;i++){

            if(bx.call(bu, a[i])){

              bv.push(a[i]);
            };
          };
          return bv;
        },
        "default" : function(bz){

          if(bz === null || (typeof bz != M && typeof bz != c)){

            throw new TypeError(f);
          };
          var bA = [];
          var bB = Object.prototype.hasOwnProperty;
          for(var bC in bz){

            if(bB.call(bz, bC)){

              bA.push(bC);
            };
          };
          return bA;
        }
      })[typeof (Object.keys) == c ? J : (function(){

        for(var bD in {
          toString : 1
        }){

          return bD;
        };
      })() !== q ? w : j],
      __c : {
        "[object String]" : u,
        "[object Array]" : E,
        "[object Object]" : n,
        "[object RegExp]" : t,
        "[object Number]" : H,
        "[object Boolean]" : d,
        "[object Date]" : y,
        "[object Function]" : B,
        "[object Error]" : e
      },
      bind : function(bF, self, bG){

        var bE = Array.prototype.slice.call(arguments, 2, arguments.length);
        return function(){

          var bH = Array.prototype.slice.call(arguments, 0, arguments.length);
          return bF.apply(self, bE.concat(bH));
        };
      },
      firstUp : function(bI){

        return bI.charAt(0).toUpperCase() + bI.substr(1);
      },
      firstLow : function(bJ){

        return bJ.charAt(0).toLowerCase() + bJ.substr(1);
      },
      getClass : function(bL){

        var bK = Object.prototype.toString.call(bL);
        return (qx.Bootstrap.__c[bK] || bK.slice(8, -1));
      },
      isString : function(bM){

        return (bM !== null && (typeof bM === m || qx.Bootstrap.getClass(bM) == u || bM instanceof String || (!!bM && !!bM.$$isString)));
      },
      isArray : function(bN){

        return (bN !== null && (bN instanceof Array || (bN && qx.data && qx.data.IListData && qx.util.OOUtil.hasInterface(bN.constructor, qx.data.IListData)) || qx.Bootstrap.getClass(bN) == E || (!!bN && !!bN.$$isArray)));
      },
      isObject : function(bO){

        return (bO !== undefined && bO !== null && qx.Bootstrap.getClass(bO) == n);
      },
      isFunction : function(bP){

        return qx.Bootstrap.getClass(bP) == B;
      },
      $$logs : [],
      debug : function(bR, bQ){

        qx.Bootstrap.$$logs.push([I, arguments]);
      },
      info : function(bT, bS){

        qx.Bootstrap.$$logs.push([v, arguments]);
      },
      warn : function(bV, bU){

        qx.Bootstrap.$$logs.push([h, arguments]);
      },
      error : function(bX, bW){

        qx.Bootstrap.$$logs.push([p, arguments]);
      },
      trace : function(bY){
      }
    }
  });
})();
(function(){

  var a = "qx.util.OOUtil";
  qx.Bootstrap.define(a, {
    statics : {
      classIsDefined : function(name){

        return qx.Bootstrap.getByName(name) !== undefined;
      },
      getPropertyDefinition : function(b, name){

        while(b){

          if(b.$$properties && b.$$properties[name]){

            return b.$$properties[name];
          };
          b = b.superclass;
        };
        return null;
      },
      hasProperty : function(c, name){

        return !!qx.util.OOUtil.getPropertyDefinition(c, name);
      },
      getEventType : function(d, name){

        var d = d.constructor;
        while(d.superclass){

          if(d.$$events && d.$$events[name] !== undefined){

            return d.$$events[name];
          };
          d = d.superclass;
        };
        return null;
      },
      supportsEvent : function(e, name){

        return !!qx.util.OOUtil.getEventType(e, name);
      },
      getByInterface : function(h, f){

        var g,i,l;
        while(h){

          if(h.$$implements){

            g = h.$$flatImplements;
            for(i = 0,l = g.length;i < l;i++){

              if(g[i] === f){

                return h;
              };
            };
          };
          h = h.superclass;
        };
        return null;
      },
      hasInterface : function(k, j){

        return !!qx.util.OOUtil.getByInterface(k, j);
      },
      getMixins : function(n){

        var m = [];
        while(n){

          if(n.$$includes){

            m.push.apply(m, n.$$flatIncludes);
          };
          n = n.superclass;
        };
        return m;
      }
    }
  });
})();
(function(){

  var a = "qx.bom.client.Xml.getSelectSingleNode",b = "qx.bom.client.Stylesheet.getInsertRule",c = "qx.bom.client.Html.getDataset",d = "qx.bom.client.PhoneGap.getPhoneGap",e = "qx.bom.client.EcmaScript.getArrayReduce",f = "qx.core.Environment for a list of predefined keys.",g = '] found, and no default ("default") given',h = "qx.bom.client.Html.getAudioAif",j = "qx.bom.client.CssTransform.get3D",k = "qx.bom.client.EcmaScript.getArrayLastIndexOf",l = " is not a valid key. Please see the API-doc of ",m = ' type)',n = "qx.bom.client.EcmaScript.getArrayForEach",o = "qx.bom.client.Xml.getAttributeNS",p = "qx.bom.client.Stylesheet.getRemoveImport",q = "qx.bom.client.Css.getUserModify",r = "qx.bom.client.Css.getBoxShadow",s = "qx.bom.client.Html.getXul",t = "qx.bom.client.Plugin.getWindowsMedia",u = ":",v = "qx.blankpage",w = "qx.bom.client.Html.getVideo",x = "qx.bom.client.Device.getName",y = "qx.bom.client.Event.getTouch",z = "qx.optimization.strings",A = "qx.debug.property.level",B = "qx.bom.client.EcmaScript.getArrayFilter",C = "qx.bom.client.EcmaScript.getStringTrim",D = "qx.optimization.variables",E = "qx.bom.client.EcmaScript.getStackTrace",F = "qx.bom.client.EcmaScript.getDateNow",G = "qx.bom.client.EcmaScript.getArrayEvery",H = "qx.bom.client.Xml.getImplementation",I = "qx.bom.client.Html.getConsole",J = "qx.bom.client.Engine.getVersion",K = "qx.bom.client.Device.getType",L = "qx.bom.client.Plugin.getQuicktime",M = "qx.bom.client.Html.getNaturalDimensions",N = "qx.bom.client.Xml.getSelectNodes",O = "qx.bom.client.Xml.getElementsByTagNameNS",P = "qx.nativeScrollBars",Q = "qx.bom.client.Html.getDataUrl",R = "qx.bom.client.Flash.isAvailable",S = "qx.bom.client.Html.getCanvas",T = "qx.dyntheme",U = "qx.bom.client.Device.getPixelRatio",V = "qx.bom.client.Css.getBoxModel",W = "qx.bom.client.Plugin.getSilverlight",X = "qx/static/blank.html",Y = "qx.bom.client.EcmaScript.getArrayMap",ej = "qx.bom.client.Css.getUserSelect",ee = "qx.bom.client.Css.getRadialGradient",ek = "module.property",eg = "qx.bom.client.Plugin.getWindowsMediaVersion",eh = "qx.bom.client.Stylesheet.getCreateStyleSheet",ed = 'No match for variant "',ei = "qx.bom.client.Locale.getLocale",eo = "module.events",ep = "qx.bom.client.Plugin.getSkype",eq = "module.databinding",er = "qx.bom.client.Html.getFileReader",el = "qx.bom.client.Css.getBorderImage",em = "qx.bom.client.Stylesheet.getDeleteRule",ef = "qx.bom.client.EcmaScript.getErrorToString",en = "qx.bom.client.Plugin.getDivXVersion",ev = "qx.bom.client.Scroll.scrollBarOverlayed",eX = "qx.bom.client.Plugin.getPdfVersion",ew = "qx.bom.client.Xml.getCreateNode",ex = "qx.bom.client.Css.getAlphaImageLoaderNeeded",es = "qx.bom.client.Css.getLinearGradient",et = "qx.bom.client.Transport.getXmlHttpRequest",fY = "qx.bom.client.Css.getBorderImageSyntax",eu = "qx.bom.client.Html.getClassList",ey = "qx.bom.client.Event.getHelp",ez = "qx.optimization.comments",eA = "qx.bom.client.Locale.getVariant",eF = "qx.bom.client.Css.getBoxSizing",eG = "qx.bom.client.OperatingSystem.getName",eH = "module.logger",eB = "qx.mobile.emulatetouch",eC = "qx.bom.client.Html.getAudioWav",eD = "qx.bom.client.Browser.getName",eE = "qx.bom.client.Css.getInlineBlock",eL = "qx.bom.client.Plugin.getPdf",eM = "please use 'css.pointerevents' instead.",eN = "qx.dynlocale",eO = "qx.bom.client.Device.getTouch",eI = "The environment key 'event.pointer' is deprecated, ",eJ = "qx.emulatemouse",ga = '" (',eK = "qx.bom.client.Html.getAudio",eS = "qx.core.Environment",eT = "qx.bom.client.EcmaScript.getFunctionBind",ge = "qx.bom.client.CssTransform.getSupport",eU = "qx.bom.client.Html.getTextContent",eP = "qx.bom.client.Css.getPlaceholder",eQ = "qx.bom.client.Css.getFloat",gc = "default",eR = ' in variants [',eV = "false",eW = "qx.bom.client.Css.getFilterGradient",fj = "qx.bom.client.Html.getHistoryState",fi = "qxenv",fh = "qx.bom.client.Html.getSessionStorage",fn = "qx.bom.client.Html.getAudioAu",fm = "qx.bom.client.Css.getOpacity",fl = "qx.bom.client.Css.getFilterTextShadow",fk = "qx.bom.client.Html.getVml",fc = "qx.bom.client.Transport.getMaxConcurrentRequestCount",fb = "qx.bom.client.Event.getHashChange",fa = "qx.bom.client.Css.getRgba",eY = "qx.bom.client.Css.getBorderRadius",fg = "qx.bom.client.EcmaScript.getArraySome",ff = "qx.bom.client.Transport.getSsl",fe = "qx.bom.client.Html.getWebWorker",fd = "qx.bom.client.Json.getJson",fu = "qx.bom.client.Browser.getQuirksMode",ft = "qx.debug.dispose",fs = "qx.bom.client.Css.getTextOverflow",fr = "qx.bom.client.EcmaScript.getArrayIndexOf",fy = "qx.bom.client.Xml.getQualifiedItem",fx = "qx.bom.client.Html.getVideoOgg",fw = "&",fv = "qx.bom.client.EcmaScript.getArrayReduceRight",fq = "qx.bom.client.Engine.getMsPointer",fp = "qx.bom.client.Browser.getDocumentMode",fo = "qx.allowUrlVariants",fJ = "qx.debug.ui.queue",fI = "|",fH = "qx.bom.client.Html.getContains",fN = "qx.bom.client.Plugin.getActiveX",fM = ".",fL = "qx.bom.client.Xml.getDomProperties",fK = "qx.bom.client.CssAnimation.getSupport",fC = "qx.debug.databinding",fB = "qx.optimization.basecalls",fA = "qx.bom.client.Browser.getVersion",fz = "qx.bom.client.Css.getUserSelectNone",fG = "true",fF = "qx.bom.client.Html.getSvg",fE = "qx.bom.client.EcmaScript.getObjectKeys",fD = "qx.bom.client.Plugin.getDivX",fT = "qx.bom.client.Runtime.getName",fS = "qx.bom.client.Html.getLocalStorage",fR = "css.pointerevents",fQ = "qx.allowUrlSettings",fX = "qx.bom.client.Flash.getStrictSecurityModel",fW = "qx.aspects",fV = "qx.debug",fU = "qx.bom.client.Css.getPointerEvents",fP = "qx.dynamicmousewheel",fO = "qx.bom.client.Html.getAudioMp3",dO = "qx.bom.client.Engine.getName",dN = "qx.bom.client.Html.getUserDataStorage",gf = "qx.bom.client.Plugin.getGears",dL = "qx.bom.client.Plugin.getQuicktimeVersion",dM = "qx.bom.client.Html.getAudioOgg",dK = "event.pointer",gd = "qx.bom.client.Css.getTextShadow",dI = "qx.bom.client.Plugin.getSilverlightVersion",dJ = "qx.bom.client.Html.getCompareDocumentPosition",dH = "qx.bom.client.Flash.getExpressInstall",gb = "qx.bom.client.Html.getSelection",dF = "qx.bom.client.OperatingSystem.getVersion",dG = "qx.bom.client.Html.getXPath",dE = "qx.bom.client.Html.getGeoLocation",dX = "qx.optimization.privates",dY = "qx.bom.client.Scroll.getNativeScroll",dV = "qx.bom.client.Css.getAppearance",dW = "qx.bom.client.CssTransition.getSupport",dT = "qx.bom.client.Stylesheet.getAddImport",dU = "qx.optimization.variants",dS = "qx.bom.client.Html.getVideoWebm",dD = "qx.bom.client.Flash.getVersion",dQ = "qx.bom.client.CssAnimation.getRequestAnimationFrame",dR = "qx.bom.client.Css.getLegacyWebkitGradient",dP = "qx.bom.client.PhoneGap.getNotification",ec = "qx.bom.client.Html.getVideoH264",ea = "qx.bom.client.Xml.getCreateElementNS",eb = "qx.bom.client.Xml.getDomParser";
  qx.Bootstrap.define(eS, {
    statics : {
      _checks : {
      },
      _asyncChecks : {
      },
      __d : {
      },
      _checksMap : {
        "engine.version" : J,
        "engine.name" : dO,
        "browser.name" : eD,
        "browser.version" : fA,
        "browser.documentmode" : fp,
        "browser.quirksmode" : fu,
        "runtime.name" : fT,
        "device.name" : x,
        "device.type" : K,
        "device.pixelRatio" : U,
        "device.touch" : eO,
        "locale" : ei,
        "locale.variant" : eA,
        "os.name" : eG,
        "os.version" : dF,
        "os.scrollBarOverlayed" : ev,
        "plugin.gears" : gf,
        "plugin.activex" : fN,
        "plugin.skype" : ep,
        "plugin.quicktime" : L,
        "plugin.quicktime.version" : dL,
        "plugin.windowsmedia" : t,
        "plugin.windowsmedia.version" : eg,
        "plugin.divx" : fD,
        "plugin.divx.version" : en,
        "plugin.silverlight" : W,
        "plugin.silverlight.version" : dI,
        "plugin.flash" : R,
        "plugin.flash.version" : dD,
        "plugin.flash.express" : dH,
        "plugin.flash.strictsecurity" : fX,
        "plugin.pdf" : eL,
        "plugin.pdf.version" : eX,
        "io.maxrequests" : fc,
        "io.ssl" : ff,
        "io.xhr" : et,
        "event.touch" : y,
        "event.mspointer" : fq,
        "event.help" : ey,
        "event.hashchange" : fb,
        "ecmascript.error.stacktrace" : E,
        "ecmascript.array.indexof" : fr,
        "ecmascript.array.lastindexof" : k,
        "ecmascript.array.foreach" : n,
        "ecmascript.array.filter" : B,
        "ecmascript.array.map" : Y,
        "ecmascript.array.some" : fg,
        "ecmascript.array.every" : G,
        "ecmascript.array.reduce" : e,
        "ecmascript.array.reduceright" : fv,
        "ecmascript.function.bind" : eT,
        "ecmascript.object.keys" : fE,
        "ecmascript.date.now" : F,
        "ecmascript.error.toString" : ef,
        "ecmascript.string.trim" : C,
        "html.webworker" : fe,
        "html.filereader" : er,
        "html.geolocation" : dE,
        "html.audio" : eK,
        "html.audio.ogg" : dM,
        "html.audio.mp3" : fO,
        "html.audio.wav" : eC,
        "html.audio.au" : fn,
        "html.audio.aif" : h,
        "html.video" : w,
        "html.video.ogg" : fx,
        "html.video.h264" : ec,
        "html.video.webm" : dS,
        "html.storage.local" : fS,
        "html.storage.session" : fh,
        "html.storage.userdata" : dN,
        "html.classlist" : eu,
        "html.xpath" : dG,
        "html.xul" : s,
        "html.canvas" : S,
        "html.svg" : fF,
        "html.vml" : fk,
        "html.dataset" : c,
        "html.dataurl" : Q,
        "html.console" : I,
        "html.stylesheet.createstylesheet" : eh,
        "html.stylesheet.insertrule" : b,
        "html.stylesheet.deleterule" : em,
        "html.stylesheet.addimport" : dT,
        "html.stylesheet.removeimport" : p,
        "html.element.contains" : fH,
        "html.element.compareDocumentPosition" : dJ,
        "html.element.textcontent" : eU,
        "html.image.naturaldimensions" : M,
        "html.history.state" : fj,
        "html.selection" : gb,
        "json" : fd,
        "css.textoverflow" : fs,
        "css.placeholder" : eP,
        "css.borderradius" : eY,
        "css.borderimage" : el,
        "css.borderimage.standardsyntax" : fY,
        "css.boxshadow" : r,
        "css.gradient.linear" : es,
        "css.gradient.filter" : eW,
        "css.gradient.radial" : ee,
        "css.gradient.legacywebkit" : dR,
        "css.boxmodel" : V,
        "css.rgba" : fa,
        "css.userselect" : ej,
        "css.userselect.none" : fz,
        "css.usermodify" : q,
        "css.appearance" : dV,
        "css.float" : eQ,
        "css.boxsizing" : eF,
        "css.animation" : fK,
        "css.animation.requestframe" : dQ,
        "css.transform" : ge,
        "css.transform.3d" : j,
        "css.transition" : dW,
        "css.inlineblock" : eE,
        "css.opacity" : fm,
        "css.textShadow" : gd,
        "css.textShadow.filter" : fl,
        "css.alphaimageloaderneeded" : ex,
        "css.pointerevents" : fU,
        "phonegap" : d,
        "phonegap.notification" : dP,
        "xml.implementation" : H,
        "xml.domparser" : eb,
        "xml.selectsinglenode" : a,
        "xml.selectnodes" : N,
        "xml.getelementsbytagnamens" : O,
        "xml.domproperties" : fL,
        "xml.attributens" : o,
        "xml.createnode" : ew,
        "xml.getqualifieditem" : fy,
        "xml.createelementns" : ea,
        "qx.mobile.nativescroll" : dY
      },
      get : function(gj){

        if(qx.Bootstrap.DEBUG){

          if(gj === dK){

            gj = fR;
            qx.Bootstrap.warn(eI + eM);
          };
        };
        if(this.__d[gj] != undefined){

          return this.__d[gj];
        };
        var gl = this._checks[gj];
        if(gl){

          var gh = gl();
          this.__d[gj] = gh;
          return gh;
        };
        var gg = this._getClassNameFromEnvKey(gj);
        if(gg[0] != undefined){

          var gk = gg[0];
          var gi = gg[1];
          var gh = gk[gi]();
          this.__d[gj] = gh;
          return gh;
        };
        if(qx.Bootstrap.DEBUG){

          qx.Bootstrap.warn(gj + l + f);
          qx.Bootstrap.trace(this);
        };
      },
      _getClassNameFromEnvKey : function(gq){

        var gs = this._checksMap;
        if(gs[gq] != undefined){

          var gn = gs[gq];
          var gr = gn.lastIndexOf(fM);
          if(gr > -1){

            var gp = gn.slice(0, gr);
            var gm = gn.slice(gr + 1);
            var go = qx.Bootstrap.getByName(gp);
            if(go != undefined){

              return [go, gm];
            };
          };
        };
        return [undefined, undefined];
      },
      getAsync : function(gu, gx, self){

        var gy = this;
        if(this.__d[gu] != undefined){

          window.setTimeout(function(){

            gx.call(self, gy.__d[gu]);
          }, 0);
          return;
        };
        var gv = this._asyncChecks[gu];
        if(gv){

          gv(function(gA){

            gy.__d[gu] = gA;
            gx.call(self, gA);
          });
          return;
        };
        var gt = this._getClassNameFromEnvKey(gu);
        if(gt[0] != undefined){

          var gw = gt[0];
          var gz = gt[1];
          gw[gz](function(gB){

            gy.__d[gu] = gB;
            gx.call(self, gB);
          });
          return;
        };
        if(qx.Bootstrap.DEBUG){

          qx.Bootstrap.warn(gu + l + f);
          qx.Bootstrap.trace(this);
        };
      },
      select : function(gD, gC){

        return this.__e(this.get(gD), gC);
      },
      selectAsync : function(gF, gE, self){

        this.getAsync(gF, function(gG){

          var gH = this.__e(gF, gE);
          gH.call(self, gG);
        }, this);
      },
      __e : function(gL, gK){

        var gJ = gK[gL];
        if(gK.hasOwnProperty(gL)){

          return gJ;
        };
        for(var gM in gK){

          if(gM.indexOf(fI) != -1){

            var gI = gM.split(fI);
            for(var i = 0;i < gI.length;i++){

              if(gI[i] == gL){

                return gK[gM];
              };
            };
          };
        };
        if(gK[gc] !== undefined){

          return gK[gc];
        };
        if(qx.Bootstrap.DEBUG){

          throw new Error(ed + gL + ga + (typeof gL) + m + eR + qx.Bootstrap.keys(gK) + g);
        };
      },
      filter : function(gN){

        var gP = [];
        for(var gO in gN){

          if(this.get(gO)){

            gP.push(gN[gO]);
          };
        };
        return gP;
      },
      invalidateCacheKey : function(gQ){

        delete this.__d[gQ];
      },
      add : function(gS, gR){

        if(this._checks[gS] == undefined){

          if(gR instanceof Function){

            this._checks[gS] = gR;
          } else {

            this._checks[gS] = this.__h(gR);
          };
        };
      },
      addAsync : function(gU, gT){

        if(this._checks[gU] == undefined){

          this._asyncChecks[gU] = gT;
        };
      },
      getChecks : function(){

        return this._checks;
      },
      getAsyncChecks : function(){

        return this._asyncChecks;
      },
      _initDefaultQxValues : function(){

        this.add(fG, function(){

          return true;
        });
        this.add(fQ, function(){

          return false;
        });
        this.add(fo, function(){

          return false;
        });
        this.add(A, function(){

          return 0;
        });
        this.add(fV, function(){

          return true;
        });
        this.add(fJ, function(){

          return true;
        });
        this.add(fW, function(){

          return false;
        });
        this.add(eN, function(){

          return true;
        });
        this.add(T, function(){

          return true;
        });
        this.add(eB, function(){

          return false;
        });
        this.add(eJ, function(){

          return false;
        });
        this.add(v, function(){

          return X;
        });
        this.add(fP, function(){

          return true;
        });
        this.add(fC, function(){

          return false;
        });
        this.add(ft, function(){

          return false;
        });
        this.add(fB, function(){

          return false;
        });
        this.add(ez, function(){

          return false;
        });
        this.add(dX, function(){

          return false;
        });
        this.add(z, function(){

          return false;
        });
        this.add(D, function(){

          return false;
        });
        this.add(dU, function(){

          return false;
        });
        this.add(eq, function(){

          return true;
        });
        this.add(eH, function(){

          return true;
        });
        this.add(ek, function(){

          return true;
        });
        this.add(eo, function(){

          return true;
        });
        this.add(P, function(){

          return false;
        });
      },
      __f : function(){

        if(qx && qx.$$environment){

          for(var gV in qx.$$environment){

            var gW = qx.$$environment[gV];
            this._checks[gV] = this.__h(gW);
          };
        };
      },
      __g : function(){

        if(window.document && window.document.location){

          var gX = window.document.location.search.slice(1).split(fw);
          for(var i = 0;i < gX.length;i++){

            var hb = gX[i].split(u);
            if(hb.length != 3 || hb[0] != fi){

              continue;
            };
            var gY = hb[1];
            var ha = decodeURIComponent(hb[2]);
            if(ha == fG){

              ha = true;
            } else if(ha == eV){

              ha = false;
            } else if(/^(\d|\.)+$/.test(ha)){

              ha = parseFloat(ha);
            };;
            this._checks[gY] = this.__h(ha);
          };
        };
      },
      __h : function(hc){

        return qx.Bootstrap.bind(function(hd){

          return hd;
        }, null, hc);
      }
    },
    defer : function(he){

      he._initDefaultQxValues();
      he.__f();
      if(he.get(fQ) === true){

        he.__g();
      };
    }
  });
})();
(function(){

  var a = "ecmascript.array.lastindexof",b = "function",c = "stack",d = "ecmascript.array.map",f = "ecmascript.date.now",g = "ecmascript.array.reduce",h = "e",i = "qx.bom.client.EcmaScript",j = "ecmascript.object.keys",k = "ecmascript.error.stacktrace",l = "ecmascript.string.trim",m = "ecmascript.array.indexof",n = "stacktrace",o = "ecmascript.error.toString",p = "[object Error]",q = "ecmascript.array.foreach",r = "ecmascript.function.bind",s = "ecmascript.array.reduceright",t = "ecmascript.array.some",u = "ecmascript.array.filter",v = "ecmascript.array.every";
  qx.Bootstrap.define(i, {
    statics : {
      getStackTrace : function(){

        var w;
        var e = new Error(h);
        w = e.stack ? c : e.stacktrace ? n : null;
        if(!w){

          try{

            throw e;
          } catch(x) {

            e = x;
          };
        };
        return e.stacktrace ? n : e.stack ? c : null;
      },
      getArrayIndexOf : function(){

        return !!Array.prototype.indexOf;
      },
      getArrayLastIndexOf : function(){

        return !!Array.prototype.lastIndexOf;
      },
      getArrayForEach : function(){

        return !!Array.prototype.forEach;
      },
      getArrayFilter : function(){

        return !!Array.prototype.filter;
      },
      getArrayMap : function(){

        return !!Array.prototype.map;
      },
      getArraySome : function(){

        return !!Array.prototype.some;
      },
      getArrayEvery : function(){

        return !!Array.prototype.every;
      },
      getArrayReduce : function(){

        return !!Array.prototype.reduce;
      },
      getArrayReduceRight : function(){

        return !!Array.prototype.reduceRight;
      },
      getErrorToString : function(){

        return typeof Error.prototype.toString == b && Error.prototype.toString() !== p;
      },
      getFunctionBind : function(){

        return typeof Function.prototype.bind === b;
      },
      getObjectKeys : function(){

        return !!Object.keys;
      },
      getDateNow : function(){

        return !!Date.now;
      },
      getStringTrim : function(){

        return typeof String.prototype.trim === b;
      }
    },
    defer : function(y){

      qx.core.Environment.add(m, y.getArrayIndexOf);
      qx.core.Environment.add(a, y.getArrayLastIndexOf);
      qx.core.Environment.add(q, y.getArrayForEach);
      qx.core.Environment.add(u, y.getArrayFilter);
      qx.core.Environment.add(d, y.getArrayMap);
      qx.core.Environment.add(t, y.getArraySome);
      qx.core.Environment.add(v, y.getArrayEvery);
      qx.core.Environment.add(g, y.getArrayReduce);
      qx.core.Environment.add(s, y.getArrayReduceRight);
      qx.core.Environment.add(f, y.getDateNow);
      qx.core.Environment.add(o, y.getErrorToString);
      qx.core.Environment.add(k, y.getStackTrace);
      qx.core.Environment.add(r, y.getFunctionBind);
      qx.core.Environment.add(j, y.getObjectKeys);
      qx.core.Environment.add(l, y.getStringTrim);
    }
  });
})();
(function(){

  var a = "function",b = "ecmascript.array.lastindexof",c = "ecmascript.array.map",d = "ecmascript.array.filter",e = "Length is 0 and no second argument given",f = "qx.lang.normalize.Array",g = "ecmascript.array.indexof",h = "First argument is not callable",j = "ecmascript.array.reduce",k = "ecmascript.array.foreach",m = "ecmascript.array.reduceright",n = "ecmascript.array.some",o = "ecmascript.array.every";
  qx.Bootstrap.define(f, {
    defer : function(){

      if(!qx.core.Environment.get(g)){

        Array.prototype.indexOf = function(p, q){

          if(q == null){

            q = 0;
          } else if(q < 0){

            q = Math.max(0, this.length + q);
          };
          for(var i = q;i < this.length;i++){

            if(this[i] === p){

              return i;
            };
          };
          return -1;
        };
      };
      if(!qx.core.Environment.get(b)){

        Array.prototype.lastIndexOf = function(r, s){

          if(s == null){

            s = this.length - 1;
          } else if(s < 0){

            s = Math.max(0, this.length + s);
          };
          for(var i = s;i >= 0;i--){

            if(this[i] === r){

              return i;
            };
          };
          return -1;
        };
      };
      if(!qx.core.Environment.get(k)){

        Array.prototype.forEach = function(t, u){

          var l = this.length;
          for(var i = 0;i < l;i++){

            var v = this[i];
            if(v !== undefined){

              t.call(u || window, v, i, this);
            };
          };
        };
      };
      if(!qx.core.Environment.get(d)){

        Array.prototype.filter = function(z, w){

          var x = [];
          var l = this.length;
          for(var i = 0;i < l;i++){

            var y = this[i];
            if(y !== undefined){

              if(z.call(w || window, y, i, this)){

                x.push(this[i]);
              };
            };
          };
          return x;
        };
      };
      if(!qx.core.Environment.get(c)){

        Array.prototype.map = function(D, A){

          var B = [];
          var l = this.length;
          for(var i = 0;i < l;i++){

            var C = this[i];
            if(C !== undefined){

              B[i] = D.call(A || window, C, i, this);
            };
          };
          return B;
        };
      };
      if(!qx.core.Environment.get(n)){

        Array.prototype.some = function(E, F){

          var l = this.length;
          for(var i = 0;i < l;i++){

            var G = this[i];
            if(G !== undefined){

              if(E.call(F || window, G, i, this)){

                return true;
              };
            };
          };
          return false;
        };
      };
      if(!qx.core.Environment.get(o)){

        Array.prototype.every = function(H, I){

          var l = this.length;
          for(var i = 0;i < l;i++){

            var J = this[i];
            if(J !== undefined){

              if(!H.call(I || window, J, i, this)){

                return false;
              };
            };
          };
          return true;
        };
      };
      if(!qx.core.Environment.get(j)){

        Array.prototype.reduce = function(K, L){

          if(typeof K !== a){

            throw new TypeError(h);
          };
          if(L === undefined && this.length === 0){

            throw new TypeError(e);
          };
          var M = L === undefined ? this[0] : L;
          for(var i = L === undefined ? 1 : 0;i < this.length;i++){

            if(i in this){

              M = K.call(undefined, M, this[i], i, this);
            };
          };
          return M;
        };
      };
      if(!qx.core.Environment.get(m)){

        Array.prototype.reduceRight = function(N, O){

          if(typeof N !== a){

            throw new TypeError(h);
          };
          if(O === undefined && this.length === 0){

            throw new TypeError(e);
          };
          var P = O === undefined ? this[this.length - 1] : O;
          for(var i = O === undefined ? this.length - 2 : this.length - 1;i >= 0;i--){

            if(i in this){

              P = N.call(undefined, P, this[i], i, this);
            };
          };
          return P;
        };
      };
    }
  });
})();
(function(){

  var a = "qx.Mixin",b = ".prototype",c = "]",d = 'Conflict between mixin "',e = "constructor",f = "Array",g = '"!',h = '" and "',j = "destruct",k = '" in property "',m = "Mixin",n = '" in member "',o = "[Mixin ";
  qx.Bootstrap.define(a, {
    statics : {
      define : function(name, q){

        if(q){

          if(q.include && !(qx.Bootstrap.getClass(q.include) === f)){

            q.include = [q.include];
          };
          {
          };
          var r = q.statics ? q.statics : {
          };
          qx.Bootstrap.setDisplayNames(r, name);
          for(var p in r){

            if(r[p] instanceof Function){

              r[p].$$mixin = r;
            };
          };
          if(q.construct){

            r.$$constructor = q.construct;
            qx.Bootstrap.setDisplayName(q.construct, name, e);
          };
          if(q.include){

            r.$$includes = q.include;
          };
          if(q.properties){

            r.$$properties = q.properties;
          };
          if(q.members){

            r.$$members = q.members;
            qx.Bootstrap.setDisplayNames(q.members, name + b);
          };
          for(var p in r.$$members){

            if(r.$$members[p] instanceof Function){

              r.$$members[p].$$mixin = r;
            };
          };
          if(q.events){

            r.$$events = q.events;
          };
          if(q.destruct){

            r.$$destructor = q.destruct;
            qx.Bootstrap.setDisplayName(q.destruct, name, j);
          };
        } else {

          var r = {
          };
        };
        r.$$type = m;
        r.name = name;
        r.toString = this.genericToString;
        r.basename = qx.Bootstrap.createNamespace(name, r);
        this.$$registry[name] = r;
        return r;
      },
      checkCompatibility : function(t){

        var u = this.flatten(t);
        var v = u.length;
        if(v < 2){

          return true;
        };
        var w = {
        };
        var x = {
        };
        var z = {
        };
        var y;
        for(var i = 0;i < v;i++){

          y = u[i];
          for(var s in y.events){

            if(z[s]){

              throw new Error(d + y.name + h + z[s] + n + s + g);
            };
            z[s] = y.name;
          };
          for(var s in y.properties){

            if(w[s]){

              throw new Error(d + y.name + h + w[s] + k + s + g);
            };
            w[s] = y.name;
          };
          for(var s in y.members){

            if(x[s]){

              throw new Error(d + y.name + h + x[s] + n + s + g);
            };
            x[s] = y.name;
          };
        };
        return true;
      },
      isCompatible : function(B, C){

        var A = qx.util.OOUtil.getMixins(C);
        A.push(B);
        return qx.Mixin.checkCompatibility(A);
      },
      getByName : function(name){

        return this.$$registry[name];
      },
      isDefined : function(name){

        return this.getByName(name) !== undefined;
      },
      getTotalNumber : function(){

        return qx.Bootstrap.objectGetLength(this.$$registry);
      },
      flatten : function(D){

        if(!D){

          return [];
        };
        var E = D.concat();
        for(var i = 0,l = D.length;i < l;i++){

          if(D[i].$$includes){

            E.push.apply(E, this.flatten(D[i].$$includes));
          };
        };
        return E;
      },
      genericToString : function(){

        return o + this.name + c;
      },
      $$registry : {
      },
      __i : null,
      __j : function(name, F){
      }
    }
  });
})();
(function(){

  var a = "",b = ".png",c = "wialon.item.MPoi",d = "?b=",e = "/",f = "undefined",g = "string",h = "resource/upload_poi_image",i = "/avl_poi_image/";
  qx.Mixin.define(c, {
    members : {
      getPoiImageUrl : function(j, k){

        if(typeof k == f || !k)k = 32;
        if(j.icon)return wialon.core.Session.getInstance().getBaseUrl() + j.icon + d + k;
        return wialon.core.Session.getInstance().getBaseUrl() + i + this.getId() + e + j.id + e + k + e + j.i + b;
      },
      setPoiImage : function(m, l, n){

        if(typeof l == g)return wialon.core.Uploader.getInstance().uploadFiles([], h, {
          fileUrl : l,
          itemId : this.getId(),
          poiId : m.id
        }, n, true); else if(l === null || l === undefined)return wialon.core.Uploader.getInstance().uploadFiles([], h, {
          fileUrl : a,
          itemId : this.getId(),
          poiId : m.id
        }, n, true);;
        return wialon.core.Uploader.getInstance().uploadFiles([l], h, {
          itemId : this.getId(),
          poiId : m.id
        }, n, true);
      }
    }
  });
})();
(function(){

  var a = '',b = "ecmascript.string.trim",c = "qx.lang.normalize.String";
  qx.Bootstrap.define(c, {
    defer : function(){

      if(!qx.core.Environment.get(b)){

        String.prototype.trim = function(d){

          return this.replace(/^\s+|\s+$/g, a);
        };
      };
    }
  });
})();
(function(){

  var a = "ecmascript.object.keys",b = "qx.lang.normalize.Object";
  qx.Bootstrap.define(b, {
    defer : function(){

      if(!qx.core.Environment.get(a)){

        Object.keys = qx.Bootstrap.keys;
      };
    }
  });
})();
(function(){

  var a = "qx.lang.normalize.Function",b = "ecmascript.function.bind",c = "function",d = "Function.prototype.bind called on incompatible ";
  qx.Bootstrap.define(a, {
    defer : function(){

      if(!qx.core.Environment.get(b)){

        var e = Array.prototype.slice;
        Function.prototype.bind = function(i){

          var h = this;
          if(typeof h != c){

            throw new TypeError(d + h);
          };
          var f = e.call(arguments, 1);
          var g = function(){

            if(this instanceof g){

              var F = function(){
              };
              F.prototype = h.prototype;
              var self = new F;
              var j = h.apply(self, f.concat(e.call(arguments)));
              if(Object(j) === j){

                return j;
              };
              return self;
            } else {

              return h.apply(i, f.concat(e.call(arguments)));
            };
          };
          return g;
        };
      };
    }
  });
})();
(function(){

  var a = "",b = "qx.lang.normalize.Error",c = ": ",d = "Error",e = "ecmascript.error.toString";
  qx.Bootstrap.define(b, {
    defer : function(){

      if(!qx.core.Environment.get(e)){

        Error.prototype.toString = function(){

          var name = this.name || d;
          var f = this.message || a;
          if(name === a && f === a){

            return d;
          };
          if(name === a){

            return f;
          };
          if(f === a){

            return name;
          };
          return name + c + f;
        };
      };
    }
  });
})();
(function(){

  var a = "qx.lang.normalize.Date",b = "ecmascript.date.now";
  qx.Bootstrap.define(a, {
    defer : function(){

      if(!qx.core.Environment.get(b)){

        Date.now = function(){

          return +new Date();
        };
      };
    }
  });
})();
(function(){

  var b = '!==inherit){',c = 'qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',d = 'value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',e = "set",f = ';',g = "resetThemed",h = 'value !== null && value.nodeType === 9 && value.documentElement',j = '===value)return value;',k = 'value !== null && value.$$type === "Mixin"',m = 'return init;',n = 'var init=this.',o = 'value !== null && value.nodeType === 1 && value.attributes',p = "var parent = this.getLayoutParent();",q = "Error in property ",r = 'var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',s = "property",t = "();",u = '.validate.call(this, value);',v = 'qx.core.Assert.assertInstance(value, Date, msg) || true',w = 'else{',x = "if (!parent) return;",y = " in method ",z = 'qx.core.Assert.assertInstance(value, Error, msg) || true',A = '=computed;',B = 'Undefined value is not allowed!',C = '(backup);',D = 'else ',E = '=true;',F = 'if(old===undefined)old=this.',G = 'if(computed===inherit){',H = 'old=computed=this.',I = "inherit",J = 'if(this.',K = 'return this.',L = 'else if(this.',M = 'Is invalid!',N = 'if(value===undefined)prop.error(this,2,"',O = '", "',P = 'var computed, old=this.',Q = 'else if(computed===undefined)',R = 'delete this.',S = "resetRuntime",T = "': ",U = " of class ",V = 'value !== null && value.nodeType !== undefined',W = '===undefined)return;',X = 'value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',Y = "reset",ba = "string",bb = "')){",bc = "module.events",bd = "return this.",be = 'qx.core.Assert.assertPositiveInteger(value, msg) || true',bf = 'else this.',bg = 'value=this.',bh = '","',bi = 'if(init==qx.core.Property.$$inherit)init=null;',bj = "get",bk = 'value !== null && value.$$type === "Interface"',bl = 'var inherit=prop.$$inherit;',bm = "', qx.event.type.Data, [computed, old]",bn = "var value = parent.",bo = "$$useinit_",bp = 'computed=undefined;delete this.',bq = "(value);",br = 'this.',bs = 'Requires exactly one argument!',bt = '",value);',bu = 'computed=value;',bv = '}else{',bw = "$$runtime_",bx = "setThemed",by = ';}',bz = '(value);',bA = "$$user_",bB = '!==undefined)',bC = '){',bD = 'qx.core.Assert.assertArray(value, msg) || true',bE = 'if(computed===undefined||computed===inherit){',bF = ";",bG = 'qx.core.Assert.assertPositiveNumber(value, msg) || true',bH = ".prototype",bI = "Boolean",bJ = ")}",bK = "(a[",bL = '(computed, old, "',bM = "setRuntime",bN = 'return value;',bO = "this.",bP = 'if(init==qx.core.Property.$$inherit)throw new Error("Inheritable property ',bQ = "if(reg.hasListener(this, '",bR = 'Does not allow any arguments!',bS = ')a[i].',bT = "()",bU = "var a=arguments[0] instanceof Array?arguments[0]:arguments;",bV = '.$$properties.',bW = 'value !== null && value.$$type === "Theme"',bX = 'old=this.',bY = "var reg=qx.event.Registration;",ca = "())",cb = '=value;',cc = 'return null;',cd = 'qx.core.Assert.assertObject(value, msg) || true',ce = '");',cf = 'if(old===computed)return value;',cg = 'qx.core.Assert.assertString(value, msg) || true',ch = 'if(old===undefined)old=null;',ci = 'var pa=this.getLayoutParent();if(pa)computed=pa.',cj = "if (value===undefined) value = parent.",ck = 'value !== null && value.$$type === "Class"',cl = 'qx.core.Assert.assertFunction(value, msg) || true',cm = '!==undefined&&',cn = 'var computed, old;',co = 'var backup=computed;',cp = ".",cq = '}',cr = "object",cs = "$$init_",ct = "$$theme_",cu = '!==undefined){',cv = 'if(computed===undefined)computed=null;',cw = "Unknown reason: ",cx = "init",cy = 'qx.core.Assert.assertMap(value, msg) || true',cz = "qx.aspects",cA = 'qx.core.Assert.assertNumber(value, msg) || true',cB = 'if((computed===undefined||computed===inherit)&&',cC = "reg.fireEvent(this, '",cD = 'Null value is not allowed!',cE = 'qx.core.Assert.assertInteger(value, msg) || true',cF = "value",cG = "shorthand",cH = 'computed=this.',cI = 'qx.core.Assert.assertInstance(value, RegExp, msg) || true',cJ = 'value !== null && value.type !== undefined',cK = 'value !== null && value.document',cL = "",cM = 'throw new Error("Property ',cN = "(!this.",cO = 'qx.core.Assert.assertBoolean(value, msg) || true',cP = 'if(a[i].',cQ = ' of an instance of ',cR = "toggle",cS = "refresh",cT = "$$inherit_",cU = 'var prop=qx.core.Property;',cV = "boolean",cW = " with incoming value '",cX = "a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",cY = 'if(computed===undefined||computed==inherit)computed=null;',da = "qx.core.Property",db = "is",dc = ' is not (yet) ready!");',dd = "]);",de = 'Could not change or apply init value after constructing phase!';
  qx.Bootstrap.define(da, {
    statics : {
      __k : function(){

        if(qx.core.Environment.get(bc)){

          qx.event.type.Data;
          qx.event.dispatch.Direct;
        };
      },
      __l : {
        "Boolean" : cO,
        "String" : cg,
        "Number" : cA,
        "Integer" : cE,
        "PositiveNumber" : bG,
        "PositiveInteger" : be,
        "Error" : z,
        "RegExp" : cI,
        "Object" : cd,
        "Array" : bD,
        "Map" : cy,
        "Function" : cl,
        "Date" : v,
        "Node" : V,
        "Element" : o,
        "Document" : h,
        "Window" : cK,
        "Event" : cJ,
        "Class" : ck,
        "Mixin" : k,
        "Interface" : bk,
        "Theme" : bW,
        "Color" : c,
        "Decorator" : X,
        "Font" : d
      },
      __m : {
        "Node" : true,
        "Element" : true,
        "Document" : true,
        "Window" : true,
        "Event" : true
      },
      $$inherit : I,
      $$store : {
        runtime : {
        },
        user : {
        },
        theme : {
        },
        inherit : {
        },
        init : {
        },
        useinit : {
        }
      },
      $$method : {
        get : {
        },
        set : {
        },
        reset : {
        },
        init : {
        },
        refresh : {
        },
        setRuntime : {
        },
        resetRuntime : {
        },
        setThemed : {
        },
        resetThemed : {
        }
      },
      $$allowedKeys : {
        name : ba,
        dereference : cV,
        inheritable : cV,
        nullable : cV,
        themeable : cV,
        refine : cV,
        init : null,
        apply : ba,
        event : ba,
        check : null,
        transform : ba,
        deferredInit : cV,
        validate : null
      },
      $$allowedGroupKeys : {
        name : ba,
        group : cr,
        mode : ba,
        themeable : cV
      },
      $$inheritable : {
      },
      __n : function(dh){

        var df = this.__o(dh);
        if(!df.length){

          var dg = function(){
          };
        } else {

          dg = this.__p(df);
        };
        dh.prototype.$$refreshInheritables = dg;
      },
      __o : function(di){

        var dj = [];
        while(di){

          var dk = di.$$properties;
          if(dk){

            for(var name in this.$$inheritable){

              if(dk[name] && dk[name].inheritable){

                dj.push(name);
              };
            };
          };
          di = di.superclass;
        };
        return dj;
      },
      __p : function(inheritables){

        var inherit = this.$$store.inherit;
        var init = this.$$store.init;
        var refresh = this.$$method.refresh;
        var code = [p, x];
        for(var i = 0,l = inheritables.length;i < l;i++){

          var name = inheritables[i];
          code.push(bn, inherit[name], bF, cj, init[name], bF, bO, refresh[name], bq);
        };
        return new Function(code.join(cL));
      },
      attachRefreshInheritables : function(dl){

        dl.prototype.$$refreshInheritables = function(){

          qx.core.Property.__n(dl);
          return this.$$refreshInheritables();
        };
      },
      attachMethods : function(dn, name, dm){

        dm.group ? this.__q(dn, dm, name) : this.__r(dn, dm, name);
      },
      __q : function(clazz, config, name){

        var upname = qx.Bootstrap.firstUp(name);
        var members = clazz.prototype;
        var themeable = config.themeable === true;
        {
        };
        var setter = [];
        var resetter = [];
        if(themeable){

          var styler = [];
          var unstyler = [];
        };
        var argHandler = bU;
        setter.push(argHandler);
        if(themeable){

          styler.push(argHandler);
        };
        if(config.mode == cG){

          var shorthand = cX;
          setter.push(shorthand);
          if(themeable){

            styler.push(shorthand);
          };
        };
        for(var i = 0,a = config.group,l = a.length;i < l;i++){

          {
          };
          setter.push(bO, this.$$method.set[a[i]], bK, i, dd);
          resetter.push(bO, this.$$method.reset[a[i]], t);
          if(themeable){

            {
            };
            styler.push(bO, this.$$method.setThemed[a[i]], bK, i, dd);
            unstyler.push(bO, this.$$method.resetThemed[a[i]], t);
          };
        };
        this.$$method.set[name] = e + upname;
        members[this.$$method.set[name]] = new Function(setter.join(cL));
        this.$$method.reset[name] = Y + upname;
        members[this.$$method.reset[name]] = new Function(resetter.join(cL));
        if(themeable){

          this.$$method.setThemed[name] = bx + upname;
          members[this.$$method.setThemed[name]] = new Function(styler.join(cL));
          this.$$method.resetThemed[name] = g + upname;
          members[this.$$method.resetThemed[name]] = new Function(unstyler.join(cL));
        };
      },
      __r : function(clazz, config, name){

        var upname = qx.Bootstrap.firstUp(name);
        var members = clazz.prototype;
        {
        };
        if(config.dereference === undefined && typeof config.check === ba){

          config.dereference = this.__s(config.check);
        };
        var method = this.$$method;
        var store = this.$$store;
        store.runtime[name] = bw + name;
        store.user[name] = bA + name;
        store.theme[name] = ct + name;
        store.init[name] = cs + name;
        store.inherit[name] = cT + name;
        store.useinit[name] = bo + name;
        method.get[name] = bj + upname;
        members[method.get[name]] = function(){

          return qx.core.Property.executeOptimizedGetter(this, clazz, name, bj);
        };
        method.set[name] = e + upname;
        members[method.set[name]] = function(dp){

          return qx.core.Property.executeOptimizedSetter(this, clazz, name, e, arguments);
        };
        method.reset[name] = Y + upname;
        members[method.reset[name]] = function(){

          return qx.core.Property.executeOptimizedSetter(this, clazz, name, Y);
        };
        if(config.inheritable || config.apply || config.event || config.deferredInit){

          method.init[name] = cx + upname;
          members[method.init[name]] = function(dq){

            return qx.core.Property.executeOptimizedSetter(this, clazz, name, cx, arguments);
          };
          {
          };
        };
        if(config.inheritable){

          method.refresh[name] = cS + upname;
          members[method.refresh[name]] = function(dr){

            return qx.core.Property.executeOptimizedSetter(this, clazz, name, cS, arguments);
          };
          {
          };
        };
        method.setRuntime[name] = bM + upname;
        members[method.setRuntime[name]] = function(ds){

          return qx.core.Property.executeOptimizedSetter(this, clazz, name, bM, arguments);
        };
        method.resetRuntime[name] = S + upname;
        members[method.resetRuntime[name]] = function(){

          return qx.core.Property.executeOptimizedSetter(this, clazz, name, S);
        };
        if(config.themeable){

          method.setThemed[name] = bx + upname;
          members[method.setThemed[name]] = function(dt){

            return qx.core.Property.executeOptimizedSetter(this, clazz, name, bx, arguments);
          };
          method.resetThemed[name] = g + upname;
          members[method.resetThemed[name]] = function(){

            return qx.core.Property.executeOptimizedSetter(this, clazz, name, g);
          };
          {
          };
        };
        if(config.check === bI){

          members[cR + upname] = new Function(bd + method.set[name] + cN + method.get[name] + ca);
          members[db + upname] = new Function(bd + method.get[name] + bT);
          {
          };
        };
        {
        };
      },
      __s : function(du){

        return !!this.__m[du];
      },
      __t : {
        '0' : de,
        '1' : bs,
        '2' : B,
        '3' : bR,
        '4' : cD,
        '5' : M
      },
      error : function(dv, dB, dA, dw, dx){

        var dy = dv.constructor.classname;
        var dz = q + dA + U + dy + y + this.$$method[dw][dA] + cW + dx + T;
        throw new Error(dz + (this.__t[dB] || cw + dB));
      },
      __u : function(instance, members, name, variant, code, args){

        var store = this.$$method[variant][name];
        {

          members[store] = new Function(cF, code.join(cL));
        };
        if(qx.core.Environment.get(cz)){

          members[store] = qx.core.Aspect.wrap(instance.classname + cp + store, members[store], s);
        };
        qx.Bootstrap.setDisplayName(members[store], instance.classname + bH, store);
        if(args === undefined){

          return instance[store]();
        } else {

          return instance[store](args[0]);
        };
      },
      executeOptimizedGetter : function(dF, dE, name, dD){

        var dH = dE.$$properties[name];
        var dG = dE.prototype;
        var dC = [];
        var dI = this.$$store;
        dC.push(J, dI.runtime[name], bB);
        dC.push(K, dI.runtime[name], f);
        if(dH.inheritable){

          dC.push(L, dI.inherit[name], bB);
          dC.push(K, dI.inherit[name], f);
          dC.push(D);
        };
        dC.push(J, dI.user[name], bB);
        dC.push(K, dI.user[name], f);
        if(dH.themeable){

          dC.push(L, dI.theme[name], bB);
          dC.push(K, dI.theme[name], f);
        };
        if(dH.deferredInit && dH.init === undefined){

          dC.push(L, dI.init[name], bB);
          dC.push(K, dI.init[name], f);
        };
        dC.push(D);
        if(dH.init !== undefined){

          if(dH.inheritable){

            dC.push(n, dI.init[name], f);
            if(dH.nullable){

              dC.push(bi);
            } else if(dH.init !== undefined){

              dC.push(K, dI.init[name], f);
            } else {

              dC.push(bP, name, cQ, dE.classname, dc);
            };
            dC.push(m);
          } else {

            dC.push(K, dI.init[name], f);
          };
        } else if(dH.inheritable || dH.nullable){

          dC.push(cc);
        } else {

          dC.push(cM, name, cQ, dE.classname, dc);
        };
        return this.__u(dF, dG, name, dD, dC);
      },
      executeOptimizedSetter : function(dP, dO, name, dN, dM){

        var dR = dO.$$properties[name];
        var dQ = dO.prototype;
        var dK = [];
        var dJ = dN === e || dN === bx || dN === bM || (dN === cx && dR.init === undefined);
        var dL = dR.apply || dR.event || dR.inheritable;
        var dS = this.__v(dN, name);
        this.__w(dK, dR, name, dN, dJ);
        if(dJ){

          this.__x(dK, dO, dR, name);
        };
        if(dL){

          this.__y(dK, dJ, dS, dN);
        };
        if(dR.inheritable){

          dK.push(bl);
        };
        {
        };
        if(!dL){

          this.__A(dK, name, dN, dJ);
        } else {

          this.__B(dK, dR, name, dN, dJ);
        };
        if(dR.inheritable){

          this.__C(dK, dR, name, dN);
        } else if(dL){

          this.__D(dK, dR, name, dN);
        };
        if(dL){

          this.__E(dK, dR, name, dN);
          if(dR.inheritable && dQ._getChildren){

            this.__F(dK, name);
          };
        };
        if(dJ){

          dK.push(bN);
        };
        return this.__u(dP, dQ, name, dN, dK, dM);
      },
      __v : function(dT, name){

        if(dT === bM || dT === S){

          var dU = this.$$store.runtime[name];
        } else if(dT === bx || dT === g){

          dU = this.$$store.theme[name];
        } else if(dT === cx){

          dU = this.$$store.init[name];
        } else {

          dU = this.$$store.user[name];
        };;
        return dU;
      },
      __w : function(dX, dV, name, dY, dW){

        {

          if(!dV.nullable || dV.check || dV.inheritable){

            dX.push(cU);
          };
          if(dY === e){

            dX.push(N, name, bh, dY, bt);
          };
        };
      },
      __x : function(ea, ec, eb, name){

        if(eb.transform){

          ea.push(bg, eb.transform, bz);
        };
        if(eb.validate){

          if(typeof eb.validate === ba){

            ea.push(br, eb.validate, bz);
          } else if(eb.validate instanceof Function){

            ea.push(ec.classname, bV, name);
            ea.push(u);
          };
        };
      },
      __y : function(ee, ed, eg, ef){

        var eh = (ef === Y || ef === g || ef === S);
        if(ed){

          ee.push(J, eg, j);
        } else if(eh){

          ee.push(J, eg, W);
        };
      },
      __z : undefined,
      __A : function(ej, name, ek, ei){

        if(ek === bM){

          ej.push(br, this.$$store.runtime[name], cb);
        } else if(ek === S){

          ej.push(J, this.$$store.runtime[name], bB);
          ej.push(R, this.$$store.runtime[name], f);
        } else if(ek === e){

          ej.push(br, this.$$store.user[name], cb);
        } else if(ek === Y){

          ej.push(J, this.$$store.user[name], bB);
          ej.push(R, this.$$store.user[name], f);
        } else if(ek === bx){

          ej.push(br, this.$$store.theme[name], cb);
        } else if(ek === g){

          ej.push(J, this.$$store.theme[name], bB);
          ej.push(R, this.$$store.theme[name], f);
        } else if(ek === cx && ei){

          ej.push(br, this.$$store.init[name], cb);
        };;;;;;
      },
      __B : function(en, el, name, eo, em){

        if(el.inheritable){

          en.push(P, this.$$store.inherit[name], f);
        } else {

          en.push(cn);
        };
        en.push(J, this.$$store.runtime[name], cu);
        if(eo === bM){

          en.push(cH, this.$$store.runtime[name], cb);
        } else if(eo === S){

          en.push(R, this.$$store.runtime[name], f);
          en.push(J, this.$$store.user[name], bB);
          en.push(cH, this.$$store.user[name], f);
          en.push(L, this.$$store.theme[name], bB);
          en.push(cH, this.$$store.theme[name], f);
          en.push(L, this.$$store.init[name], cu);
          en.push(cH, this.$$store.init[name], f);
          en.push(br, this.$$store.useinit[name], E);
          en.push(cq);
        } else {

          en.push(H, this.$$store.runtime[name], f);
          if(eo === e){

            en.push(br, this.$$store.user[name], cb);
          } else if(eo === Y){

            en.push(R, this.$$store.user[name], f);
          } else if(eo === bx){

            en.push(br, this.$$store.theme[name], cb);
          } else if(eo === g){

            en.push(R, this.$$store.theme[name], f);
          } else if(eo === cx && em){

            en.push(br, this.$$store.init[name], cb);
          };;;;
        };
        en.push(cq);
        en.push(L, this.$$store.user[name], cu);
        if(eo === e){

          if(!el.inheritable){

            en.push(bX, this.$$store.user[name], f);
          };
          en.push(cH, this.$$store.user[name], cb);
        } else if(eo === Y){

          if(!el.inheritable){

            en.push(bX, this.$$store.user[name], f);
          };
          en.push(R, this.$$store.user[name], f);
          en.push(J, this.$$store.runtime[name], bB);
          en.push(cH, this.$$store.runtime[name], f);
          en.push(J, this.$$store.theme[name], bB);
          en.push(cH, this.$$store.theme[name], f);
          en.push(L, this.$$store.init[name], cu);
          en.push(cH, this.$$store.init[name], f);
          en.push(br, this.$$store.useinit[name], E);
          en.push(cq);
        } else {

          if(eo === bM){

            en.push(cH, this.$$store.runtime[name], cb);
          } else if(el.inheritable){

            en.push(cH, this.$$store.user[name], f);
          } else {

            en.push(H, this.$$store.user[name], f);
          };
          if(eo === bx){

            en.push(br, this.$$store.theme[name], cb);
          } else if(eo === g){

            en.push(R, this.$$store.theme[name], f);
          } else if(eo === cx && em){

            en.push(br, this.$$store.init[name], cb);
          };;
        };
        en.push(cq);
        if(el.themeable){

          en.push(L, this.$$store.theme[name], cu);
          if(!el.inheritable){

            en.push(bX, this.$$store.theme[name], f);
          };
          if(eo === bM){

            en.push(cH, this.$$store.runtime[name], cb);
          } else if(eo === e){

            en.push(cH, this.$$store.user[name], cb);
          } else if(eo === bx){

            en.push(cH, this.$$store.theme[name], cb);
          } else if(eo === g){

            en.push(R, this.$$store.theme[name], f);
            en.push(J, this.$$store.init[name], cu);
            en.push(cH, this.$$store.init[name], f);
            en.push(br, this.$$store.useinit[name], E);
            en.push(cq);
          } else if(eo === cx){

            if(em){

              en.push(br, this.$$store.init[name], cb);
            };
            en.push(cH, this.$$store.theme[name], f);
          } else if(eo === cS){

            en.push(cH, this.$$store.theme[name], f);
          };;;;;
          en.push(cq);
        };
        en.push(L, this.$$store.useinit[name], bC);
        if(!el.inheritable){

          en.push(bX, this.$$store.init[name], f);
        };
        if(eo === cx){

          if(em){

            en.push(cH, this.$$store.init[name], cb);
          } else {

            en.push(cH, this.$$store.init[name], f);
          };
        } else if(eo === e || eo === bM || eo === bx || eo === cS){

          en.push(R, this.$$store.useinit[name], f);
          if(eo === bM){

            en.push(cH, this.$$store.runtime[name], cb);
          } else if(eo === e){

            en.push(cH, this.$$store.user[name], cb);
          } else if(eo === bx){

            en.push(cH, this.$$store.theme[name], cb);
          } else if(eo === cS){

            en.push(cH, this.$$store.init[name], f);
          };;;
        };
        en.push(cq);
        if(eo === e || eo === bM || eo === bx || eo === cx){

          en.push(w);
          if(eo === bM){

            en.push(cH, this.$$store.runtime[name], cb);
          } else if(eo === e){

            en.push(cH, this.$$store.user[name], cb);
          } else if(eo === bx){

            en.push(cH, this.$$store.theme[name], cb);
          } else if(eo === cx){

            if(em){

              en.push(cH, this.$$store.init[name], cb);
            } else {

              en.push(cH, this.$$store.init[name], f);
            };
            en.push(br, this.$$store.useinit[name], E);
          };;;
          en.push(cq);
        };
      },
      __C : function(eq, ep, name, er){

        eq.push(bE);
        if(er === cS){

          eq.push(bu);
        } else {

          eq.push(ci, this.$$store.inherit[name], f);
        };
        eq.push(cB);
        eq.push(br, this.$$store.init[name], cm);
        eq.push(br, this.$$store.init[name], b);
        eq.push(cH, this.$$store.init[name], f);
        eq.push(br, this.$$store.useinit[name], E);
        eq.push(bv);
        eq.push(R, this.$$store.useinit[name], by);
        eq.push(cq);
        eq.push(cf);
        eq.push(G);
        eq.push(bp, this.$$store.inherit[name], f);
        eq.push(cq);
        eq.push(Q);
        eq.push(R, this.$$store.inherit[name], f);
        eq.push(bf, this.$$store.inherit[name], A);
        eq.push(co);
        if(ep.init !== undefined && er !== cx){

          eq.push(F, this.$$store.init[name], bF);
        } else {

          eq.push(ch);
        };
        eq.push(cY);
      },
      __D : function(et, es, name, eu){

        if(eu !== e && eu !== bM && eu !== bx){

          et.push(cv);
        };
        et.push(cf);
        if(es.init !== undefined && eu !== cx){

          et.push(F, this.$$store.init[name], bF);
        } else {

          et.push(ch);
        };
      },
      __E : function(ew, ev, name, ex){

        if(ev.apply){

          ew.push(br, ev.apply, bL, name, O, ex, ce);
        };
        if(ev.event){

          ew.push(bY, bQ, ev.event, bb, cC, ev.event, bm, bJ);
        };
      },
      __F : function(ey, name){

        ey.push(r);
        ey.push(cP, this.$$method.refresh[name], bS, this.$$method.refresh[name], C);
        ey.push(cq);
      }
    }
  });
})();
(function(){

  var a = "qx.data.MBinding";
  qx.Mixin.define(a, {
    members : {
      bind : function(b, e, c, d){

        return qx.data.SingleValueBinding.bind(this, b, e, c, d);
      },
      removeBinding : function(f){

        qx.data.SingleValueBinding.removeBindingFromObject(this, f);
      },
      removeAllBindings : function(){

        qx.data.SingleValueBinding.removeAllBindingsForObject(this);
      },
      getBindings : function(){

        return qx.data.SingleValueBinding.getAllBindingsForObject(this);
      }
    }
  });
})();
(function(){

  var a = "qx.core.Aspect",b = "before",c = "*",d = "static";
  qx.Bootstrap.define(a, {
    statics : {
      __G : [],
      wrap : function(h, l, j){

        var m = [];
        var e = [];
        var k = this.__G;
        var g;
        for(var i = 0;i < k.length;i++){

          g = k[i];
          if((g.type == null || j == g.type || g.type == c) && (g.name == null || h.match(g.name))){

            g.pos == -1 ? m.push(g.fcn) : e.push(g.fcn);
          };
        };
        if(m.length === 0 && e.length === 0){

          return l;
        };
        var f = function(){

          for(var i = 0;i < m.length;i++){

            m[i].call(this, h, l, j, arguments);
          };
          var n = l.apply(this, arguments);
          for(var i = 0;i < e.length;i++){

            e[i].call(this, h, l, j, arguments, n);
          };
          return n;
        };
        if(j !== d){

          f.self = l.self;
          f.base = l.base;
        };
        l.wrapper = f;
        f.original = l;
        return f;
      },
      addAdvice : function(q, o, p, name){

        this.__G.push({
          fcn : q,
          pos : o === b ? -1 : 1,
          type : p,
          name : name
        });
      }
    }
  });
})();
(function(){

  var a = 'Implementation of method "',b = '"',c = "function",d = '" is not supported by Class "',e = "Boolean",f = "qx.Interface",g = 'The event "',h = '" required by interface "',j = '" is missing in class "',k = '"!',m = 'The property "',n = "Interface",o = "toggle",p = "]",q = "[Interface ",r = "is",s = "Array",t = 'Implementation of member "';
  qx.Bootstrap.define(f, {
    statics : {
      define : function(name, v){

        if(v){

          if(v.extend && !(qx.Bootstrap.getClass(v.extend) === s)){

            v.extend = [v.extend];
          };
          {
          };
          var u = v.statics ? v.statics : {
          };
          if(v.extend){

            u.$$extends = v.extend;
          };
          if(v.properties){

            u.$$properties = v.properties;
          };
          if(v.members){

            u.$$members = v.members;
          };
          if(v.events){

            u.$$events = v.events;
          };
        } else {

          var u = {
          };
        };
        u.$$type = n;
        u.name = name;
        u.toString = this.genericToString;
        u.basename = qx.Bootstrap.createNamespace(name, u);
        qx.Interface.$$registry[name] = u;
        return u;
      },
      getByName : function(name){

        return this.$$registry[name];
      },
      isDefined : function(name){

        return this.getByName(name) !== undefined;
      },
      getTotalNumber : function(){

        return qx.Bootstrap.objectGetLength(this.$$registry);
      },
      flatten : function(x){

        if(!x){

          return [];
        };
        var w = x.concat();
        for(var i = 0,l = x.length;i < l;i++){

          if(x[i].$$extends){

            w.push.apply(w, this.flatten(x[i].$$extends));
          };
        };
        return w;
      },
      __H : function(B, C, y, F, D){

        var z = y.$$members;
        if(z){

          for(var E in z){

            if(qx.Bootstrap.isFunction(z[E])){

              var H = this.__I(C, E);
              var A = H || qx.Bootstrap.isFunction(B[E]);
              if(!A){

                if(D){

                  throw new Error(a + E + j + C.classname + h + y.name + b);
                } else {

                  return false;
                };
              };
              var G = F === true && !H && !qx.util.OOUtil.hasInterface(C, y);
              if(G){

                B[E] = this.__L(y, B[E], E, z[E]);
              };
            } else {

              if(typeof B[E] === undefined){

                if(typeof B[E] !== c){

                  if(D){

                    throw new Error(t + E + j + C.classname + h + y.name + b);
                  } else {

                    return false;
                  };
                };
              };
            };
          };
        };
        if(!D){

          return true;
        };
      },
      __I : function(L, I){

        var N = I.match(/^(is|toggle|get|set|reset)(.*)$/);
        if(!N){

          return false;
        };
        var K = qx.Bootstrap.firstLow(N[2]);
        var M = qx.util.OOUtil.getPropertyDefinition(L, K);
        if(!M){

          return false;
        };
        var J = N[0] == r || N[0] == o;
        if(J){

          return qx.util.OOUtil.getPropertyDefinition(L, K).check == e;
        };
        return true;
      },
      __J : function(R, O, P){

        if(O.$$properties){

          for(var Q in O.$$properties){

            if(!qx.util.OOUtil.getPropertyDefinition(R, Q)){

              if(P){

                throw new Error(m + Q + d + R.classname + k);
              } else {

                return false;
              };
            };
          };
        };
        if(!P){

          return true;
        };
      },
      __K : function(V, S, T){

        if(S.$$events){

          for(var U in S.$$events){

            if(!qx.util.OOUtil.supportsEvent(V, U)){

              if(T){

                throw new Error(g + U + d + V.classname + k);
              } else {

                return false;
              };
            };
          };
        };
        if(!T){

          return true;
        };
      },
      assertObject : function(Y, W){

        var ba = Y.constructor;
        this.__H(Y, ba, W, false, true);
        this.__J(ba, W, true);
        this.__K(ba, W, true);
        var X = W.$$extends;
        if(X){

          for(var i = 0,l = X.length;i < l;i++){

            this.assertObject(Y, X[i]);
          };
        };
      },
      assert : function(bd, bb, be){

        this.__H(bd.prototype, bd, bb, be, true);
        this.__J(bd, bb, true);
        this.__K(bd, bb, true);
        var bc = bb.$$extends;
        if(bc){

          for(var i = 0,l = bc.length;i < l;i++){

            this.assert(bd, bc[i], be);
          };
        };
      },
      objectImplements : function(bh, bf){

        var bi = bh.constructor;
        if(!this.__H(bh, bi, bf) || !this.__J(bi, bf) || !this.__K(bi, bf)){

          return false;
        };
        var bg = bf.$$extends;
        if(bg){

          for(var i = 0,l = bg.length;i < l;i++){

            if(!this.objectImplements(bh, bg[i])){

              return false;
            };
          };
        };
        return true;
      },
      classImplements : function(bl, bj){

        if(!this.__H(bl.prototype, bl, bj) || !this.__J(bl, bj) || !this.__K(bl, bj)){

          return false;
        };
        var bk = bj.$$extends;
        if(bk){

          for(var i = 0,l = bk.length;i < l;i++){

            if(!this.has(bl, bk[i])){

              return false;
            };
          };
        };
        return true;
      },
      genericToString : function(){

        return q + this.name + p;
      },
      $$registry : {
      },
      __L : function(bo, bn, bp, bm){
      },
      __i : null,
      __j : function(name, bq){
      }
    }
  });
})();
(function(){

  var b = ".prototype",c = "$$init_",d = "constructor",e = "Property module disabled.",f = "extend",g = "module.property",h = "singleton",j = "qx.event.type.Data",k = "module.events",m = "qx.aspects",n = "toString",o = 'extend',p = "Array",q = "static",r = "",s = "Events module not enabled.",t = "]",u = "Class",v = "qx.Class",w = '"extend" parameter is null or undefined',x = "[Class ",y = "destructor",z = "destruct",A = ".",B = "member";
  qx.Bootstrap.define(v, {
    statics : {
      __M : qx.core.Environment.get(g) ? qx.core.Property : null,
      define : function(name, F){

        if(!F){

          F = {
          };
        };
        if(F.include && !(qx.Bootstrap.getClass(F.include) === p)){

          F.include = [F.include];
        };
        if(F.implement && !(qx.Bootstrap.getClass(F.implement) === p)){

          F.implement = [F.implement];
        };
        var C = false;
        if(!F.hasOwnProperty(f) && !F.type){

          F.type = q;
          C = true;
        };
        {
        };
        var D = this.__P(name, F.type, F.extend, F.statics, F.construct, F.destruct, F.include);
        if(F.extend){

          if(F.properties){

            this.__R(D, F.properties, true);
          };
          if(F.members){

            this.__T(D, F.members, true, true, false);
          };
          if(F.events){

            this.__Q(D, F.events, true);
          };
          if(F.include){

            for(var i = 0,l = F.include.length;i < l;i++){

              this.__X(D, F.include[i], false);
            };
          };
        } else if(F.hasOwnProperty(o) && false){

          throw new Error(w);
        };
        if(F.environment){

          for(var E in F.environment){

            qx.core.Environment.add(E, F.environment[E]);
          };
        };
        if(F.implement){

          for(var i = 0,l = F.implement.length;i < l;i++){

            this.__V(D, F.implement[i]);
          };
        };
        {
        };
        if(F.defer){

          F.defer.self = D;
          F.defer(D, D.prototype, {
            add : function(name, G){

              var H = {
              };
              H[name] = G;
              qx.Class.__R(D, H, true);
            }
          });
        };
        return D;
      },
      undefine : function(name){

        delete this.$$registry[name];
        var K = name.split(A);
        var J = [window];
        for(var i = 0;i < K.length;i++){

          J.push(J[i][K[i]]);
        };
        for(var i = J.length - 1;i >= 1;i--){

          var I = J[i];
          var parent = J[i - 1];
          if(qx.Bootstrap.isFunction(I) || qx.Bootstrap.objectGetLength(I) === 0){

            delete parent[K[i - 1]];
          } else {

            break;
          };
        };
      },
      isDefined : qx.util.OOUtil.classIsDefined,
      getTotalNumber : function(){

        return qx.Bootstrap.objectGetLength(this.$$registry);
      },
      getByName : qx.Bootstrap.getByName,
      include : function(M, L){

        {
        };
        qx.Class.__X(M, L, false);
      },
      patch : function(O, N){

        {
        };
        qx.Class.__X(O, N, true);
      },
      isSubClassOf : function(Q, P){

        if(!Q){

          return false;
        };
        if(Q == P){

          return true;
        };
        if(Q.prototype instanceof P){

          return true;
        };
        return false;
      },
      getPropertyDefinition : qx.util.OOUtil.getPropertyDefinition,
      getProperties : function(S){

        var R = [];
        while(S){

          if(S.$$properties){

            R.push.apply(R, Object.keys(S.$$properties));
          };
          S = S.superclass;
        };
        return R;
      },
      getByProperty : function(T, name){

        while(T){

          if(T.$$properties && T.$$properties[name]){

            return T;
          };
          T = T.superclass;
        };
        return null;
      },
      hasProperty : qx.util.OOUtil.hasProperty,
      getEventType : qx.util.OOUtil.getEventType,
      supportsEvent : qx.util.OOUtil.supportsEvent,
      hasOwnMixin : function(V, U){

        return V.$$includes && V.$$includes.indexOf(U) !== -1;
      },
      getByMixin : function(Y, X){

        var W,i,l;
        while(Y){

          if(Y.$$includes){

            W = Y.$$flatIncludes;
            for(i = 0,l = W.length;i < l;i++){

              if(W[i] === X){

                return Y;
              };
            };
          };
          Y = Y.superclass;
        };
        return null;
      },
      getMixins : qx.util.OOUtil.getMixins,
      hasMixin : function(bb, ba){

        return !!this.getByMixin(bb, ba);
      },
      hasOwnInterface : function(bd, bc){

        return bd.$$implements && bd.$$implements.indexOf(bc) !== -1;
      },
      getByInterface : qx.util.OOUtil.getByInterface,
      getInterfaces : function(bf){

        var be = [];
        while(bf){

          if(bf.$$implements){

            be.push.apply(be, bf.$$flatImplements);
          };
          bf = bf.superclass;
        };
        return be;
      },
      hasInterface : qx.util.OOUtil.hasInterface,
      implementsInterface : function(bh, bg){

        var bi = bh.constructor;
        if(this.hasInterface(bi, bg)){

          return true;
        };
        if(qx.Interface.objectImplements(bh, bg)){

          return true;
        };
        if(qx.Interface.classImplements(bi, bg)){

          return true;
        };
        return false;
      },
      getInstance : function(){

        if(!this.$$instance){

          this.$$allowconstruct = true;
          this.$$instance = new this();
          delete this.$$allowconstruct;
        };
        return this.$$instance;
      },
      genericToString : function(){

        return x + this.classname + t;
      },
      $$registry : qx.Bootstrap.$$registry,
      __i : null,
      __N : null,
      __j : function(name, bj){
      },
      __O : function(bk){
      },
      __P : function(name, bu, bt, bl, br, bp, bo){

        var bq;
        if(!bt && qx.core.Environment.get(m) == false){

          bq = bl || {
          };
          qx.Bootstrap.setDisplayNames(bq, name);
        } else {

          bq = {
          };
          if(bt){

            if(!br){

              br = this.__Y();
            };
            if(this.__bb(bt, bo)){

              bq = this.__bc(br, name, bu);
            } else {

              bq = br;
            };
            if(bu === h){

              bq.getInstance = this.getInstance;
            };
            qx.Bootstrap.setDisplayName(br, name, d);
          };
          if(bl){

            qx.Bootstrap.setDisplayNames(bl, name);
            var bs;
            for(var i = 0,a = Object.keys(bl),l = a.length;i < l;i++){

              bs = a[i];
              var bm = bl[bs];
              if(qx.core.Environment.get(m)){

                if(bm instanceof Function){

                  bm = qx.core.Aspect.wrap(name + A + bs, bm, q);
                };
                bq[bs] = bm;
              } else {

                bq[bs] = bm;
              };
            };
          };
        };
        var bn = name ? qx.Bootstrap.createNamespace(name, bq) : r;
        bq.name = bq.classname = name;
        bq.basename = bn;
        bq.$$type = u;
        if(bu){

          bq.$$classtype = bu;
        };
        if(!bq.hasOwnProperty(n)){

          bq.toString = this.genericToString;
        };
        if(bt){

          qx.Bootstrap.extendClass(bq, br, bt, name, bn);
          if(bp){

            if(qx.core.Environment.get(m)){

              bp = qx.core.Aspect.wrap(name, bp, y);
            };
            bq.$$destructor = bp;
            qx.Bootstrap.setDisplayName(bp, name, z);
          };
        };
        this.$$registry[name] = bq;
        return bq;
      },
      __Q : function(bv, bw, by){

        {

          var bx,bx;
        };
        if(bv.$$events){

          for(var bx in bw){

            bv.$$events[bx] = bw[bx];
          };
        } else {

          bv.$$events = bw;
        };
      },
      __R : function(bA, bD, bB){

        if(!qx.core.Environment.get(g)){

          throw new Error(e);
        };
        var bC;
        if(bB === undefined){

          bB = false;
        };
        var bz = bA.prototype;
        for(var name in bD){

          bC = bD[name];
          {
          };
          bC.name = name;
          if(!bC.refine){

            if(bA.$$properties === undefined){

              bA.$$properties = {
              };
            };
            bA.$$properties[name] = bC;
          };
          if(bC.init !== undefined){

            bA.prototype[c + name] = bC.init;
          };
          if(bC.event !== undefined){

            if(!qx.core.Environment.get(k)){

              throw new Error(s);
            };
            var event = {
            };
            event[bC.event] = j;
            this.__Q(bA, event, bB);
          };
          if(bC.inheritable){

            this.__M.$$inheritable[name] = true;
            if(!bz.$$refreshInheritables){

              this.__M.attachRefreshInheritables(bA);
            };
          };
          if(!bC.refine){

            this.__M.attachMethods(bA, name, bC);
          };
        };
      },
      __S : null,
      __T : function(bL, bE, bG, bI, bK){

        var bF = bL.prototype;
        var bJ,bH;
        qx.Bootstrap.setDisplayNames(bE, bL.classname + b);
        for(var i = 0,a = Object.keys(bE),l = a.length;i < l;i++){

          bJ = a[i];
          bH = bE[bJ];
          {
          };
          if(bI !== false && bH instanceof Function && bH.$$type == null){

            if(bK == true){

              bH = this.__U(bH, bF[bJ]);
            } else {

              if(bF[bJ]){

                bH.base = bF[bJ];
              };
              bH.self = bL;
            };
            if(qx.core.Environment.get(m)){

              bH = qx.core.Aspect.wrap(bL.classname + A + bJ, bH, B);
            };
          };
          bF[bJ] = bH;
        };
      },
      __U : function(bM, bN){

        if(bN){

          return function(){

            var bP = bM.base;
            bM.base = bN;
            var bO = bM.apply(this, arguments);
            bM.base = bP;
            return bO;
          };
        } else {

          return bM;
        };
      },
      __V : function(bS, bQ){

        {
        };
        var bR = qx.Interface.flatten([bQ]);
        if(bS.$$implements){

          bS.$$implements.push(bQ);
          bS.$$flatImplements.push.apply(bS.$$flatImplements, bR);
        } else {

          bS.$$implements = [bQ];
          bS.$$flatImplements = bR;
        };
      },
      __W : function(bU){

        var name = bU.classname;
        var bT = this.__bc(bU, name, bU.$$classtype);
        for(var i = 0,a = Object.keys(bU),l = a.length;i < l;i++){

          bV = a[i];
          bT[bV] = bU[bV];
        };
        bT.prototype = bU.prototype;
        var bX = bU.prototype;
        for(var i = 0,a = Object.keys(bX),l = a.length;i < l;i++){

          bV = a[i];
          var bY = bX[bV];
          if(bY && bY.self == bU){

            bY.self = bT;
          };
        };
        for(var bV in this.$$registry){

          var bW = this.$$registry[bV];
          if(!bW){

            continue;
          };
          if(bW.base == bU){

            bW.base = bT;
          };
          if(bW.superclass == bU){

            bW.superclass = bT;
          };
          if(bW.$$original){

            if(bW.$$original.base == bU){

              bW.$$original.base = bT;
            };
            if(bW.$$original.superclass == bU){

              bW.$$original.superclass = bT;
            };
          };
        };
        qx.Bootstrap.createNamespace(name, bT);
        this.$$registry[name] = bT;
        return bT;
      },
      __X : function(cf, cd, cc){

        {
        };
        if(this.hasMixin(cf, cd)){

          return;
        };
        var ca = cf.$$original;
        if(cd.$$constructor && !ca){

          cf = this.__W(cf);
        };
        var cb = qx.Mixin.flatten([cd]);
        var ce;
        for(var i = 0,l = cb.length;i < l;i++){

          ce = cb[i];
          if(ce.$$events){

            this.__Q(cf, ce.$$events, cc);
          };
          if(ce.$$properties){

            this.__R(cf, ce.$$properties, cc);
          };
          if(ce.$$members){

            this.__T(cf, ce.$$members, cc, cc, cc);
          };
        };
        if(cf.$$includes){

          cf.$$includes.push(cd);
          cf.$$flatIncludes.push.apply(cf.$$flatIncludes, cb);
        } else {

          cf.$$includes = [cd];
          cf.$$flatIncludes = cb;
        };
      },
      __Y : function(){

        function cg(){

          cg.base.apply(this, arguments);
        };
        return cg;
      },
      __ba : function(){

        return function(){
        };
      },
      __bb : function(ci, ch){

        {
        };
        if(ci && ci.$$includes){

          var cj = ci.$$flatIncludes;
          for(var i = 0,l = cj.length;i < l;i++){

            if(cj[i].$$constructor){

              return true;
            };
          };
        };
        if(ch){

          var ck = qx.Mixin.flatten(ch);
          for(var i = 0,l = ck.length;i < l;i++){

            if(ck[i].$$constructor){

              return true;
            };
          };
        };
        return false;
      },
      __bc : function(cm, name, cl){

        var co = function(){

          var cr = co;
          {
          };
          var cp = cr.$$original.apply(this, arguments);
          if(cr.$$includes){

            var cq = cr.$$flatIncludes;
            for(var i = 0,l = cq.length;i < l;i++){

              if(cq[i].$$constructor){

                cq[i].$$constructor.apply(this, arguments);
              };
            };
          };
          {
          };
          return cp;
        };
        if(qx.core.Environment.get(m)){

          var cn = qx.core.Aspect.wrap(name, co, d);
          co.$$original = cm;
          co.constructor = cn;
          co = cn;
        };
        co.$$original = cm;
        cm.wrapper = co;
        return co;
      }
    },
    defer : function(){

      if(qx.core.Environment.get(m)){

        for(var cs in qx.Bootstrap.$$registry){

          var ct = qx.Bootstrap.$$registry[cs];
          for(var cu in ct){

            if(ct[cu] instanceof Function){

              ct[cu] = qx.core.Aspect.wrap(cs + A + cu, ct[cu], q);
            };
          };
        };
      };
    }
  });
})();
(function(){

  var a = ". Error message: ",b = "Boolean",c = "set",d = "deepBinding",f = ") to the object '",g = "item",h = "Please use only one array at a time: ",k = "Integer",l = "reset",m = " of object ",n = "qx.data.SingleValueBinding",p = "Binding property ",q = "Failed so set value ",r = "change",s = "Binding could not be found!",t = "get",u = "^",v = " does not work.",w = "String",x = "Binding from '",y = "",z = "PositiveNumber",A = "]",B = "[",C = ".",D = "PositiveInteger",E = 'No number or \'last\' value hast been given in an array binding: ',F = "' (",G = " on ",H = "Binding does not exist!",I = "Number",J = ").",K = "Date",L = " not possible: No event available. ",M = "last";
  qx.Class.define(n, {
    statics : {
      __bd : {
      },
      bind : function(Q, be, bc, S, bb){

        var bf = this.__bf(Q, be, bc, S, bb);
        var U = be.split(C);
        var P = this.__bl(U);
        var Y = [];
        var T = [];
        var V = [];
        var ba = [];
        var R = Q;
        try{

          for(var i = 0;i < U.length;i++){

            if(P[i] !== y){

              ba.push(r);
            } else {

              ba.push(this.__bg(R, U[i]));
            };
            Y[i] = R;
            if(i == U.length - 1){

              if(P[i] !== y){

                var bh = P[i] === M ? R.length - 1 : P[i];
                var O = R.getItem(bh);
                this.__bk(O, bc, S, bb, Q);
                V[i] = this.__bm(R, ba[i], bc, S, bb, P[i]);
              } else {

                if(U[i] != null && R[t + qx.lang.String.firstUp(U[i])] != null){

                  var O = R[t + qx.lang.String.firstUp(U[i])]();
                  this.__bk(O, bc, S, bb, Q);
                };
                V[i] = this.__bm(R, ba[i], bc, S, bb);
              };
            } else {

              var N = {
                index : i,
                propertyNames : U,
                sources : Y,
                listenerIds : V,
                arrayIndexValues : P,
                targetObject : bc,
                targetPropertyChain : S,
                options : bb,
                listeners : T
              };
              var X = qx.lang.Function.bind(this.__be, this, N);
              T.push(X);
              V[i] = R.addListener(ba[i], X);
            };
            if(R[t + qx.lang.String.firstUp(U[i])] == null){

              R = null;
            } else if(P[i] !== y){

              R = R[t + qx.lang.String.firstUp(U[i])](P[i]);
            } else {

              R = R[t + qx.lang.String.firstUp(U[i])]();
            };
            if(!R){

              break;
            };
          };
        } catch(bi) {

          for(var i = 0;i < Y.length;i++){

            if(Y[i] && V[i]){

              Y[i].removeListenerById(V[i]);
            };
          };
          var W = bf.targets;
          var bd = bf.listenerIds;
          for(var i = 0;i < W.length;i++){

            if(W[i] && bd[i]){

              W[i].removeListenerById(bd[i]);
            };
          };
          throw bi;
        };
        var bg = {
          type : d,
          listenerIds : V,
          sources : Y,
          targetListenerIds : bf.listenerIds,
          targets : bf.targets
        };
        this.__bn(bg, Q, be, bc, S);
        return bg;
      },
      __be : function(bp){

        if(bp.options && bp.options.onUpdate){

          bp.options.onUpdate(bp.sources[bp.index], bp.targetObject);
        };
        for(var j = bp.index + 1;j < bp.propertyNames.length;j++){

          var bn = bp.sources[j];
          bp.sources[j] = null;
          if(!bn){

            continue;
          };
          bn.removeListenerById(bp.listenerIds[j]);
        };
        var bn = bp.sources[bp.index];
        for(var j = bp.index + 1;j < bp.propertyNames.length;j++){

          if(bp.arrayIndexValues[j - 1] !== y){

            bn = bn[t + qx.lang.String.firstUp(bp.propertyNames[j - 1])](bp.arrayIndexValues[j - 1]);
          } else {

            bn = bn[t + qx.lang.String.firstUp(bp.propertyNames[j - 1])]();
          };
          bp.sources[j] = bn;
          if(!bn){

            if(bp.options && bp.options.converter){

              var bj = false;
              if(bp.options.ignoreConverter){

                var bq = bp.propertyNames.slice(0, j).join(C);
                var bo = bq.match(new RegExp(u + bp.options.ignoreConverter));
                bj = bo ? bo.length > 0 : false;
              };
              var br = null;
              if(!bj){

                br = bp.options.converter();
              };
              this.__bi(bp.targetObject, bp.targetPropertyChain, br);
            } else {

              this.__bh(bp.targetObject, bp.targetPropertyChain);
            };
            break;
          };
          if(j == bp.propertyNames.length - 1){

            if(qx.Class.implementsInterface(bn, qx.data.IListData)){

              var bs = bp.arrayIndexValues[j] === M ? bn.length - 1 : bp.arrayIndexValues[j];
              var bk = bn.getItem(bs);
              this.__bk(bk, bp.targetObject, bp.targetPropertyChain, bp.options, bp.sources[bp.index]);
              bp.listenerIds[j] = this.__bm(bn, r, bp.targetObject, bp.targetPropertyChain, bp.options, bp.arrayIndexValues[j]);
            } else {

              if(bp.propertyNames[j] != null && bn[t + qx.lang.String.firstUp(bp.propertyNames[j])] != null){

                var bk = bn[t + qx.lang.String.firstUp(bp.propertyNames[j])]();
                this.__bk(bk, bp.targetObject, bp.targetPropertyChain, bp.options, bp.sources[bp.index]);
              };
              var bl = this.__bg(bn, bp.propertyNames[j]);
              bp.listenerIds[j] = this.__bm(bn, bl, bp.targetObject, bp.targetPropertyChain, bp.options);
            };
          } else {

            if(bp.listeners[j] == null){

              var bm = qx.lang.Function.bind(this.__be, this, bp);
              bp.listeners.push(bm);
            };
            if(qx.Class.implementsInterface(bn, qx.data.IListData)){

              var bl = r;
            } else {

              var bl = this.__bg(bn, bp.propertyNames[j]);
            };
            bp.listenerIds[j] = bn.addListener(bl, bp.listeners[j]);
          };
        };
      },
      __bf : function(bu, bC, bG, by, bA){

        var bx = by.split(C);
        var bv = this.__bl(bx);
        var bF = [];
        var bE = [];
        var bz = [];
        var bD = [];
        var bw = bG;
        for(var i = 0;i < bx.length - 1;i++){

          if(bv[i] !== y){

            bD.push(r);
          } else {

            try{

              bD.push(this.__bg(bw, bx[i]));
            } catch(e) {

              break;
            };
          };
          bF[i] = bw;
          var bB = function(){

            for(var j = i + 1;j < bx.length - 1;j++){

              var bJ = bF[j];
              bF[j] = null;
              if(!bJ){

                continue;
              };
              bJ.removeListenerById(bz[j]);
            };
            var bJ = bF[i];
            for(var j = i + 1;j < bx.length - 1;j++){

              var bH = qx.lang.String.firstUp(bx[j - 1]);
              if(bv[j - 1] !== y){

                var bK = bv[j - 1] === M ? bJ.getLength() - 1 : bv[j - 1];
                bJ = bJ[t + bH](bK);
              } else {

                bJ = bJ[t + bH]();
              };
              bF[j] = bJ;
              if(bE[j] == null){

                bE.push(bB);
              };
              if(qx.Class.implementsInterface(bJ, qx.data.IListData)){

                var bI = r;
              } else {

                try{

                  var bI = qx.data.SingleValueBinding.__bg(bJ, bx[j]);
                } catch(e) {

                  break;
                };
              };
              bz[j] = bJ.addListener(bI, bE[j]);
            };
            qx.data.SingleValueBinding.updateTarget(bu, bC, bG, by, bA);
          };
          bE.push(bB);
          bz[i] = bw.addListener(bD[i], bB);
          var bt = qx.lang.String.firstUp(bx[i]);
          if(bw[t + bt] == null){

            bw = null;
          } else if(bv[i] !== y){

            bw = bw[t + bt](bv[i]);
          } else {

            bw = bw[t + bt]();
          };
          if(!bw){

            break;
          };
        };
        return {
          listenerIds : bz,
          targets : bF
        };
      },
      updateTarget : function(bL, bO, bQ, bM, bP){

        var bN = this.resolvePropertyChain(bL, bO);
        bN = qx.data.SingleValueBinding.__bo(bN, bQ, bM, bP, bL);
        this.__bi(bQ, bM, bN);
      },
      resolvePropertyChain : function(o, bU){

        var bT = this.__bj(o, bU);
        var bV;
        if(bT != null){

          var bX = bU.substring(bU.lastIndexOf(C) + 1, bU.length);
          if(bX.charAt(bX.length - 1) == A){

            var bR = bX.substring(bX.lastIndexOf(B) + 1, bX.length - 1);
            var bS = bX.substring(0, bX.lastIndexOf(B));
            var bW = bT[t + qx.lang.String.firstUp(bS)]();
            if(bR == M){

              bR = bW.length - 1;
            };
            if(bW != null){

              bV = bW.getItem(bR);
            };
          } else {

            bV = bT[t + qx.lang.String.firstUp(bX)]();
          };
        };
        return bV;
      },
      __bg : function(ca, cb){

        var bY = this.__bp(ca, cb);
        if(bY == null){

          if(qx.Class.supportsEvent(ca.constructor, cb)){

            bY = cb;
          } else if(qx.Class.supportsEvent(ca.constructor, r + qx.lang.String.firstUp(cb))){

            bY = r + qx.lang.String.firstUp(cb);
          } else {

            throw new qx.core.AssertionError(p + cb + m + ca + L);
          };
        };
        return bY;
      },
      __bh : function(ce, cc){

        var cd = this.__bj(ce, cc);
        if(cd != null){

          var cf = cc.substring(cc.lastIndexOf(C) + 1, cc.length);
          if(cf.charAt(cf.length - 1) == A){

            this.__bi(ce, cc, null);
            return;
          };
          if(cd[l + qx.lang.String.firstUp(cf)] != undefined){

            cd[l + qx.lang.String.firstUp(cf)]();
          } else {

            cd[c + qx.lang.String.firstUp(cf)](null);
          };
        };
      },
      __bi : function(cm, ci, cj){

        var ch = this.__bj(cm, ci);
        if(ch != null){

          var cn = ci.substring(ci.lastIndexOf(C) + 1, ci.length);
          if(cn.charAt(cn.length - 1) == A){

            var cg = cn.substring(cn.lastIndexOf(B) + 1, cn.length - 1);
            var ck = cn.substring(0, cn.lastIndexOf(B));
            var cl = cm;
            if(!qx.Class.implementsInterface(cl, qx.data.IListData)){

              cl = ch[t + qx.lang.String.firstUp(ck)]();
            };
            if(cg == M){

              cg = cl.length - 1;
            };
            if(cl != null){

              cl.setItem(cg, cj);
            };
          } else {

            ch[c + qx.lang.String.firstUp(cn)](cj);
          };
        };
      },
      __bj : function(ct, cq){

        var cs = cq.split(C);
        var cp = ct;
        for(var i = 0;i < cs.length - 1;i++){

          try{

            var cr = cs[i];
            if(cr.indexOf(A) == cr.length - 1){

              var co = cr.substring(cr.indexOf(B) + 1, cr.length - 1);
              cr = cr.substring(0, cr.indexOf(B));
            };
            if(cr != y){

              cp = cp[t + qx.lang.String.firstUp(cr)]();
            };
            if(co != null){

              if(co == M){

                co = cp.length - 1;
              };
              cp = cp.getItem(co);
              co = null;
            };
          } catch(cu) {

            return null;
          };
        };
        return cp;
      },
      __bk : function(cz, cv, cx, cy, cw){

        cz = this.__bo(cz, cv, cx, cy, cw);
        if(cz === undefined){

          this.__bh(cv, cx);
        };
        if(cz !== undefined){

          try{

            this.__bi(cv, cx, cz);
            if(cy && cy.onUpdate){

              cy.onUpdate(cw, cv, cz);
            };
          } catch(e) {

            if(!(e instanceof qx.core.ValidationError)){

              throw e;
            };
            if(cy && cy.onSetFail){

              cy.onSetFail(e);
            } else {

              qx.log.Logger.warn(q + cz + G + cv + a + e);
            };
          };
        };
      },
      __bl : function(cA){

        var cB = [];
        for(var i = 0;i < cA.length;i++){

          var name = cA[i];
          if(qx.lang.String.endsWith(name, A)){

            var cC = name.substring(name.indexOf(B) + 1, name.indexOf(A));
            if(name.indexOf(A) != name.length - 1){

              throw new Error(h + name + v);
            };
            if(cC !== M){

              if(cC == y || isNaN(parseInt(cC, 10))){

                throw new Error(E + name + v);
              };
            };
            if(name.indexOf(B) != 0){

              cA[i] = name.substring(0, name.indexOf(B));
              cB[i] = y;
              cB[i + 1] = cC;
              cA.splice(i + 1, 0, g);
              i++;
            } else {

              cB[i] = cC;
              cA.splice(i, 1, g);
            };
          } else {

            cB[i] = y;
          };
        };
        return cB;
      },
      __bm : function(cD, cG, cL, cJ, cH, cF){

        {

          var cE;
        };
        var cI = function(cO, e){

          if(cO !== y){

            if(cO === M){

              cO = cD.length - 1;
            };
            var cP = cD.getItem(cO);
            if(cP === undefined){

              qx.data.SingleValueBinding.__bh(cL, cJ);
            };
            var cN = e.getData().start;
            var cM = e.getData().end;
            if(cO < cN || cO > cM){

              return;
            };
          } else {

            var cP = e.getData();
          };
          {
          };
          cP = qx.data.SingleValueBinding.__bo(cP, cL, cJ, cH, cD);
          {
          };
          try{

            if(cP !== undefined){

              qx.data.SingleValueBinding.__bi(cL, cJ, cP);
            } else {

              qx.data.SingleValueBinding.__bh(cL, cJ);
            };
            if(cH && cH.onUpdate){

              cH.onUpdate(cD, cL, cP);
            };
          } catch(cQ) {

            if(!(cQ instanceof qx.core.ValidationError)){

              throw cQ;
            };
            if(cH && cH.onSetFail){

              cH.onSetFail(cQ);
            } else {

              qx.log.Logger.warn(q + cP + G + cL + a + cQ);
            };
          };
        };
        if(!cF){

          cF = y;
        };
        cI = qx.lang.Function.bind(cI, cD, cF);
        var cK = cD.addListener(cG, cI);
        return cK;
      },
      __bn : function(cV, cR, cU, cS, cT){

        if(this.__bd[cR.toHashCode()] === undefined){

          this.__bd[cR.toHashCode()] = [];
        };
        this.__bd[cR.toHashCode()].push([cV, cR, cU, cS, cT]);
      },
      __bo : function(da, df, cY, db, cW){

        if(db && db.converter){

          var dc;
          if(df.getModel){

            dc = df.getModel();
          };
          return db.converter(da, dc, cW, df);
        } else {

          var cX = this.__bj(df, cY);
          var dg = cY.substring(cY.lastIndexOf(C) + 1, cY.length);
          if(cX == null){

            return da;
          };
          var dd = qx.Class.getPropertyDefinition(cX.constructor, dg);
          var de = dd == null ? y : dd.check;
          return this.__bq(da, de);
        };
      },
      __bp : function(dh, dj){

        var di = qx.Class.getPropertyDefinition(dh.constructor, dj);
        if(di == null){

          return null;
        };
        return di.event;
      },
      __bq : function(dm, dl){

        var dk = qx.lang.Type.getClass(dm);
        if((dk == I || dk == w) && (dl == k || dl == D)){

          dm = parseInt(dm, 10);
        };
        if((dk == b || dk == I || dk == K) && dl == w){

          dm = dm + y;
        };
        if((dk == I || dk == w) && (dl == I || dl == z)){

          dm = parseFloat(dm);
        };
        return dm;
      },
      removeBindingFromObject : function(dn, dq){

        if(dq.type == d){

          for(var i = 0;i < dq.sources.length;i++){

            if(dq.sources[i]){

              dq.sources[i].removeListenerById(dq.listenerIds[i]);
            };
          };
          for(var i = 0;i < dq.targets.length;i++){

            if(dq.targets[i]){

              dq.targets[i].removeListenerById(dq.targetListenerIds[i]);
            };
          };
        } else {

          dn.removeListenerById(dq);
        };
        var dp = this.__bd[dn.toHashCode()];
        if(dp != undefined){

          for(var i = 0;i < dp.length;i++){

            if(dp[i][0] == dq){

              qx.lang.Array.remove(dp, dp[i]);
              return;
            };
          };
        };
        throw new Error(s);
      },
      removeAllBindingsForObject : function(ds){

        {
        };
        var dr = this.__bd[ds.toHashCode()];
        if(dr != undefined){

          for(var i = dr.length - 1;i >= 0;i--){

            this.removeBindingFromObject(ds, dr[i][0]);
          };
        };
      },
      getAllBindingsForObject : function(dt){

        if(this.__bd[dt.toHashCode()] === undefined){

          this.__bd[dt.toHashCode()] = [];
        };
        return this.__bd[dt.toHashCode()];
      },
      removeAllBindings : function(){

        for(var dv in this.__bd){

          var du = qx.core.ObjectRegistry.fromHashCode(dv);
          if(du == null){

            delete this.__bd[dv];
            continue;
          };
          this.removeAllBindingsForObject(du);
        };
        this.__bd = {
        };
      },
      getAllBindings : function(){

        return this.__bd;
      },
      showBindingInLog : function(dx, dz){

        var dy;
        for(var i = 0;i < this.__bd[dx.toHashCode()].length;i++){

          if(this.__bd[dx.toHashCode()][i][0] == dz){

            dy = this.__bd[dx.toHashCode()][i];
            break;
          };
        };
        if(dy === undefined){

          var dw = H;
        } else {

          var dw = x + dy[1] + F + dy[2] + f + dy[3] + F + dy[4] + J;
        };
        qx.log.Logger.debug(dw);
      },
      showAllBindingsInLog : function(){

        for(var dB in this.__bd){

          var dA = qx.core.ObjectRegistry.fromHashCode(dB);
          for(var i = 0;i < this.__bd[dB].length;i++){

            this.showBindingInLog(dA, this.__bd[dB][i][0]);
          };
        };
      }
    }
  });
})();
(function(){

  var a = "qx.util.RingBuffer";
  qx.Class.define(a, {
    extend : Object,
    construct : function(b){

      this.setMaxEntries(b || 50);
    },
    members : {
      __br : 0,
      __bs : 0,
      __bt : false,
      __bu : 0,
      __bv : null,
      __bw : null,
      setMaxEntries : function(c){

        this.__bw = c;
        this.clear();
      },
      getMaxEntries : function(){

        return this.__bw;
      },
      addEntry : function(d){

        this.__bv[this.__br] = d;
        this.__br = this.__bx(this.__br, 1);
        var e = this.getMaxEntries();
        if(this.__bs < e){

          this.__bs++;
        };
        if(this.__bt && (this.__bu < e)){

          this.__bu++;
        };
      },
      mark : function(){

        this.__bt = true;
        this.__bu = 0;
      },
      clearMark : function(){

        this.__bt = false;
      },
      getAllEntries : function(){

        return this.getEntries(this.getMaxEntries(), false);
      },
      getEntries : function(f, j){

        if(f > this.__bs){

          f = this.__bs;
        };
        if(j && this.__bt && (f > this.__bu)){

          f = this.__bu;
        };
        if(f > 0){

          var h = this.__bx(this.__br, -1);
          var g = this.__bx(h, -f + 1);
          var i;
          if(g <= h){

            i = this.__bv.slice(g, h + 1);
          } else {

            i = this.__bv.slice(g, this.__bs).concat(this.__bv.slice(0, h + 1));
          };
        } else {

          i = [];
        };
        return i;
      },
      clear : function(){

        this.__bv = new Array(this.getMaxEntries());
        this.__bs = 0;
        this.__bu = 0;
        this.__br = 0;
      },
      __bx : function(n, l){

        var k = this.getMaxEntries();
        var m = (n + l) % k;
        if(m < 0){

          m += k;
        };
        return m;
      }
    }
  });
})();
(function(){

  var a = "qx.log.appender.RingBuffer";
  qx.Class.define(a, {
    extend : qx.util.RingBuffer,
    construct : function(b){

      this.setMaxMessages(b || 50);
    },
    members : {
      setMaxMessages : function(c){

        this.setMaxEntries(c);
      },
      getMaxMessages : function(){

        return this.getMaxEntries();
      },
      process : function(d){

        this.addEntry(d);
      },
      getAllLogEvents : function(){

        return this.getAllEntries();
      },
      retrieveLogEvents : function(e, f){

        return this.getEntries(e, f);
      },
      clearHistory : function(){

        this.clear();
      }
    }
  });
})();
(function(){

  var a = "qx.lang.Type",b = "Error",c = "RegExp",d = "Date",e = "Number",f = "Boolean";
  qx.Bootstrap.define(a, {
    statics : {
      getClass : qx.Bootstrap.getClass,
      isString : qx.Bootstrap.isString,
      isArray : qx.Bootstrap.isArray,
      isObject : qx.Bootstrap.isObject,
      isFunction : qx.Bootstrap.isFunction,
      isRegExp : function(g){

        return this.getClass(g) == c;
      },
      isNumber : function(h){

        return (h !== null && (this.getClass(h) == e || h instanceof Number));
      },
      isBoolean : function(i){

        return (i !== null && (this.getClass(i) == f || i instanceof Boolean));
      },
      isDate : function(j){

        return (j !== null && (this.getClass(j) == d || j instanceof Date));
      },
      isError : function(k){

        return (k !== null && (this.getClass(k) == b || k instanceof Error));
      }
    }
  });
})();
(function(){

  var a = "mshtml",b = "engine.name",c = "[object Array]",d = "qx.lang.Array",e = "Cannot clean-up map entry doneObjects[",f = "]",g = "qx",h = "number",j = "][",k = "string";
  qx.Bootstrap.define(d, {
    statics : {
      cast : function(m, o, p){

        if(m.constructor === o){

          return m;
        };
        if(qx.data && qx.data.IListData){

          if(qx.Class && qx.Class.hasInterface(m, qx.data.IListData)){

            var m = m.toArray();
          };
        };
        var n = new o;
        if((qx.core.Environment.get(b) == a)){

          if(m.item){

            for(var i = p || 0,l = m.length;i < l;i++){

              n.push(m[i]);
            };
            return n;
          };
        };
        if(Object.prototype.toString.call(m) === c && p == null){

          n.push.apply(n, m);
        } else {

          n.push.apply(n, Array.prototype.slice.call(m, p || 0));
        };
        return n;
      },
      fromArguments : function(q, r){

        return Array.prototype.slice.call(q, r || 0);
      },
      fromCollection : function(t){

        if((qx.core.Environment.get(b) == a)){

          if(t.item){

            var s = [];
            for(var i = 0,l = t.length;i < l;i++){

              s[i] = t[i];
            };
            return s;
          };
        };
        return Array.prototype.slice.call(t, 0);
      },
      fromShortHand : function(u){

        var w = u.length;
        var v = qx.lang.Array.clone(u);
        switch(w){case 1:
        v[1] = v[2] = v[3] = v[0];
        break;case 2:
        v[2] = v[0];case 3:
        v[3] = v[1];};
        return v;
      },
      clone : function(x){

        return x.concat();
      },
      insertAt : function(y, z, i){

        y.splice(i, 0, z);
        return y;
      },
      insertBefore : function(A, C, B){

        var i = A.indexOf(B);
        if(i == -1){

          A.push(C);
        } else {

          A.splice(i, 0, C);
        };
        return A;
      },
      insertAfter : function(D, F, E){

        var i = D.indexOf(E);
        if(i == -1 || i == (D.length - 1)){

          D.push(F);
        } else {

          D.splice(i + 1, 0, F);
        };
        return D;
      },
      removeAt : function(G, i){

        return G.splice(i, 1)[0];
      },
      removeAll : function(H){

        H.length = 0;
        return this;
      },
      append : function(J, I){

        {
        };
        Array.prototype.push.apply(J, I);
        return J;
      },
      exclude : function(M, L){

        {
        };
        for(var i = 0,N = L.length,K;i < N;i++){

          K = M.indexOf(L[i]);
          if(K != -1){

            M.splice(K, 1);
          };
        };
        return M;
      },
      remove : function(O, P){

        var i = O.indexOf(P);
        if(i != -1){

          O.splice(i, 1);
          return P;
        };
      },
      contains : function(Q, R){

        return Q.indexOf(R) !== -1;
      },
      equals : function(T, S){

        var length = T.length;
        if(length !== S.length){

          return false;
        };
        for(var i = 0;i < length;i++){

          if(T[i] !== S[i]){

            return false;
          };
        };
        return true;
      },
      sum : function(U){

        var V = 0;
        for(var i = 0,l = U.length;i < l;i++){

          V += U[i];
        };
        return V;
      },
      max : function(W){

        {
        };
        var i,Y = W.length,X = W[0];
        for(i = 1;i < Y;i++){

          if(W[i] > X){

            X = W[i];
          };
        };
        return X === undefined ? null : X;
      },
      min : function(ba){

        {
        };
        var i,bc = ba.length,bb = ba[0];
        for(i = 1;i < bc;i++){

          if(ba[i] < bb){

            bb = ba[i];
          };
        };
        return bb === undefined ? null : bb;
      },
      unique : function(bf){

        var bp = [],be = {
        },bi = {
        },bk = {
        };
        var bj,bd = 0;
        var bn = g + Date.now();
        var bg = false,bl = false,bo = false;
        for(var i = 0,bm = bf.length;i < bm;i++){

          bj = bf[i];
          if(bj === null){

            if(!bg){

              bg = true;
              bp.push(bj);
            };
          } else if(bj === undefined){
          } else if(bj === false){

            if(!bl){

              bl = true;
              bp.push(bj);
            };
          } else if(bj === true){

            if(!bo){

              bo = true;
              bp.push(bj);
            };
          } else if(typeof bj === k){

            if(!be[bj]){

              be[bj] = 1;
              bp.push(bj);
            };
          } else if(typeof bj === h){

            if(!bi[bj]){

              bi[bj] = 1;
              bp.push(bj);
            };
          } else {

            var bh = bj[bn];
            if(bh == null){

              bh = bj[bn] = bd++;
            };
            if(!bk[bh]){

              bk[bh] = bj;
              bp.push(bj);
            };
          };;;;;
        };
        for(var bh in bk){

          try{

            delete bk[bh][bn];
          } catch(bq) {

            try{

              bk[bh][bn] = null;
            } catch(br) {

              throw new Error(e + bh + j + bn + f);
            };
          };
        };
        return bp;
      }
    }
  });
})();
(function(){

  var a = " != ",b = "qx.core.Object",c = "Expected value to be an array but found ",d = "' (rgb(",f = ") was fired.",g = "Expected value to be an integer >= 0 but found ",h = "' to be not equal with '",j = "' to '",k = "Expected object '",m = "Called assertTrue with '",n = "Expected value to be a map but found ",o = "The function did not raise an exception!",p = "Expected value to be undefined but found ",q = "Expected value to be a DOM element but found  '",r = "Expected value to be a regular expression but found ",s = "' to implement the interface '",t = "Expected value to be null but found ",u = "Invalid argument 'type'",v = "Called assert with 'false'",w = "Assertion error! ",x = "'",y = "null",z = "' but found '",A = "'undefined'",B = ",",C = "' must must be a key of the map '",D = "Expected '",E = "The String '",F = "Expected value to be a string but found ",G = "Event (",H = "Expected value to be the CSS color '",I = "!",J = "Expected value not to be undefined but found undefined!",K = "qx.util.ColorUtil",L = ": ",M = "The raised exception does not have the expected type! ",N = ") not fired.",O = "'!",P = "qx.core.Assert",Q = "",R = "Expected value to be typeof object but found ",S = "' but found ",T = "' (identical) but found '",U = "' must have any of the values defined in the array '",V = "Expected value to be a number but found ",W = "Called assertFalse with '",X = "qx.ui.core.Widget",Y = "]",bJ = "Expected value to be a qooxdoo object but found ",bK = "' arguments.",bL = "Expected value '%1' to be in the range '%2'..'%3'!",bF = "Array[",bG = "' does not match the regular expression '",bH = "' to be not identical with '",bI = "Expected [",bP = "' arguments but found '",bQ = "', which cannot be converted to a CSS color!",bR = ", ",cg = "qx.core.AssertionError",bM = "Expected value to be a boolean but found ",bN = "Expected value not to be null but found null!",bO = "))!",bD = "Expected value to be a qooxdoo widget but found ",bU = "The value '",bE = "Expected value to be typeof '",bV = "\n Stack trace: \n",bW = "Expected value to be typeof function but found ",cb = "Expected value to be an integer but found ",bS = "Called fail().",cf = "The parameter 're' must be a string or a regular expression.",bT = ")), but found value '",bX = "qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",bY = "Expected value to be a number >= 0 but found ",ca = "Expected value to be instanceof '",cc = "], but found [",cd = "Wrong number of arguments given. Expected '",ce = "object";
  qx.Class.define(P, {
    statics : {
      __by : true,
      __bz : function(ch, ci){

        var cm = Q;
        for(var i = 1,l = arguments.length;i < l;i++){

          cm = cm + this.__bA(arguments[i] === undefined ? A : arguments[i]);
        };
        var cl = Q;
        if(cm){

          cl = ch + L + cm;
        } else {

          cl = ch;
        };
        var ck = w + cl;
        if(qx.Class.isDefined(cg)){

          var cj = new qx.core.AssertionError(ch, cm);
          if(this.__by){

            qx.Bootstrap.error(ck + bV + cj.getStackTrace());
          };
          throw cj;
        } else {

          if(this.__by){

            qx.Bootstrap.error(ck);
          };
          throw new Error(ck);
        };
      },
      __bA : function(co){

        var cn;
        if(co === null){

          cn = y;
        } else if(qx.lang.Type.isArray(co) && co.length > 10){

          cn = bF + co.length + Y;
        } else if((co instanceof Object) && (co.toString == null)){

          cn = qx.lang.Json.stringify(co, null, 2);
        } else {

          try{

            cn = co.toString();
          } catch(e) {

            cn = Q;
          };
        };;
        return cn;
      },
      assert : function(cq, cp){

        cq == true || this.__bz(cp || Q, v);
      },
      fail : function(cr, cs){

        var ct = cs ? Q : bS;
        this.__bz(cr || Q, ct);
      },
      assertTrue : function(cv, cu){

        (cv === true) || this.__bz(cu || Q, m, cv, x);
      },
      assertFalse : function(cx, cw){

        (cx === false) || this.__bz(cw || Q, W, cx, x);
      },
      assertEquals : function(cy, cz, cA){

        cy == cz || this.__bz(cA || Q, D, cy, z, cz, O);
      },
      assertNotEquals : function(cB, cC, cD){

        cB != cC || this.__bz(cD || Q, D, cB, h, cC, O);
      },
      assertIdentical : function(cE, cF, cG){

        cE === cF || this.__bz(cG || Q, D, cE, T, cF, O);
      },
      assertNotIdentical : function(cH, cI, cJ){

        cH !== cI || this.__bz(cJ || Q, D, cH, bH, cI, O);
      },
      assertNotUndefined : function(cL, cK){

        cL !== undefined || this.__bz(cK || Q, J);
      },
      assertUndefined : function(cN, cM){

        cN === undefined || this.__bz(cM || Q, p, cN, I);
      },
      assertNotNull : function(cP, cO){

        cP !== null || this.__bz(cO || Q, bN);
      },
      assertNull : function(cR, cQ){

        cR === null || this.__bz(cQ || Q, t, cR, I);
      },
      assertJsonEquals : function(cS, cT, cU){

        this.assertEquals(qx.lang.Json.stringify(cS), qx.lang.Json.stringify(cT), cU);
      },
      assertMatch : function(cX, cW, cV){

        this.assertString(cX);
        this.assert(qx.lang.Type.isRegExp(cW) || qx.lang.Type.isString(cW), cf);
        cX.search(cW) >= 0 || this.__bz(cV || Q, E, cX, bG, cW.toString(), O);
      },
      assertArgumentsCount : function(db, dc, dd, cY){

        var da = db.length;
        (da >= dc && da <= dd) || this.__bz(cY || Q, cd, dc, j, dd, bP, da, bK);
      },
      assertEventFired : function(de, event, dh, di, dj){

        var df = false;
        var dg = function(e){

          if(di){

            di.call(de, e);
          };
          df = true;
        };
        var dk;
        try{

          dk = de.addListener(event, dg, de);
          dh.call(de);
        } catch(dl) {

          throw dl;
        }finally{

          try{

            de.removeListenerById(dk);
          } catch(dm) {
          };
        };
        df === true || this.__bz(dj || Q, G, event, N);
      },
      assertEventNotFired : function(dn, event, dr, ds){

        var dp = false;
        var dq = function(e){

          dp = true;
        };
        var dt = dn.addListener(event, dq, dn);
        dr.call();
        dp === false || this.__bz(ds || Q, G, event, f);
        dn.removeListenerById(dt);
      },
      assertException : function(dx, dw, dv, du){

        var dw = dw || Error;
        var dy;
        try{

          this.__by = false;
          dx();
        } catch(dz) {

          dy = dz;
        }finally{

          this.__by = true;
        };
        if(dy == null){

          this.__bz(du || Q, o);
        };
        dy instanceof dw || this.__bz(du || Q, M, dw, a, dy);
        if(dv){

          this.assertMatch(dy.toString(), dv, du);
        };
      },
      assertInArray : function(dC, dB, dA){

        dB.indexOf(dC) !== -1 || this.__bz(dA || Q, bU, dC, U, dB, x);
      },
      assertArrayEquals : function(dD, dE, dF){

        this.assertArray(dD, dF);
        this.assertArray(dE, dF);
        dF = dF || bI + dD.join(bR) + cc + dE.join(bR) + Y;
        if(dD.length !== dE.length){

          this.fail(dF, true);
        };
        for(var i = 0;i < dD.length;i++){

          if(dD[i] !== dE[i]){

            this.fail(dF, true);
          };
        };
      },
      assertKeyInMap : function(dI, dH, dG){

        dH[dI] !== undefined || this.__bz(dG || Q, bU, dI, C, dH, x);
      },
      assertFunction : function(dK, dJ){

        qx.lang.Type.isFunction(dK) || this.__bz(dJ || Q, bW, dK, I);
      },
      assertString : function(dM, dL){

        qx.lang.Type.isString(dM) || this.__bz(dL || Q, F, dM, I);
      },
      assertBoolean : function(dO, dN){

        qx.lang.Type.isBoolean(dO) || this.__bz(dN || Q, bM, dO, I);
      },
      assertNumber : function(dQ, dP){

        (qx.lang.Type.isNumber(dQ) && isFinite(dQ)) || this.__bz(dP || Q, V, dQ, I);
      },
      assertPositiveNumber : function(dS, dR){

        (qx.lang.Type.isNumber(dS) && isFinite(dS) && dS >= 0) || this.__bz(dR || Q, bY, dS, I);
      },
      assertInteger : function(dU, dT){

        (qx.lang.Type.isNumber(dU) && isFinite(dU) && dU % 1 === 0) || this.__bz(dT || Q, cb, dU, I);
      },
      assertPositiveInteger : function(dX, dV){

        var dW = (qx.lang.Type.isNumber(dX) && isFinite(dX) && dX % 1 === 0 && dX >= 0);
        dW || this.__bz(dV || Q, g, dX, I);
      },
      assertInRange : function(eb, ec, ea, dY){

        (eb >= ec && eb <= ea) || this.__bz(dY || Q, qx.lang.String.format(bL, [eb, ec, ea]));
      },
      assertObject : function(ee, ed){

        var ef = ee !== null && (qx.lang.Type.isObject(ee) || typeof ee === ce);
        ef || this.__bz(ed || Q, R, (ee), I);
      },
      assertArray : function(eh, eg){

        qx.lang.Type.isArray(eh) || this.__bz(eg || Q, c, eh, I);
      },
      assertMap : function(ej, ei){

        qx.lang.Type.isObject(ej) || this.__bz(ei || Q, n, ej, I);
      },
      assertRegExp : function(el, ek){

        qx.lang.Type.isRegExp(el) || this.__bz(ek || Q, r, el, I);
      },
      assertType : function(eo, en, em){

        this.assertString(en, u);
        typeof (eo) === en || this.__bz(em || Q, bE, en, S, eo, I);
      },
      assertInstance : function(er, es, ep){

        var eq = es.classname || es + Q;
        er instanceof es || this.__bz(ep || Q, ca, eq, S, er, I);
      },
      assertInterface : function(ev, eu, et){

        qx.Class.implementsInterface(ev, eu) || this.__bz(et || Q, k, ev, s, eu, O);
      },
      assertCssColor : function(eC, ez, eB){

        var ew = qx.Class.getByName(K);
        if(!ew){

          throw new Error(bX);
        };
        var ey = ew.stringToRgb(eC);
        try{

          var eA = ew.stringToRgb(ez);
        } catch(eE) {

          this.__bz(eB || Q, H, eC, d, ey.join(B), bT, ez, bQ);
        };
        var eD = ey[0] == eA[0] && ey[1] == eA[1] && ey[2] == eA[2];
        eD || this.__bz(eB || Q, H, ey, d, ey.join(B), bT, ez, d, eA.join(B), bO);
      },
      assertElement : function(eG, eF){

        !!(eG && eG.nodeType === 1) || this.__bz(eF || Q, q, eG, O);
      },
      assertQxObject : function(eI, eH){

        this.__bB(eI, b) || this.__bz(eH || Q, bJ, eI, I);
      },
      assertQxWidget : function(eK, eJ){

        this.__bB(eK, X) || this.__bz(eJ || Q, bD, eK, I);
      },
      __bB : function(eM, eL){

        if(!eM){

          return false;
        };
        var eN = eM.constructor;
        while(eN){

          if(eN.classname === eL){

            return true;
          };
          eN = eN.superclass;
        };
        return false;
      }
    }
  });
})();
(function(){

  var a = "-",b = "]",c = '\\u',d = "undefined",e = "",f = '\\$1',g = "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",h = "\\\\",j = '-',k = "g",l = "\\\"",m = "qx.lang.String",n = "(^|[^",o = "0",p = "%",q = '"',r = ' ',s = '\n',t = "])[";
  qx.Bootstrap.define(m, {
    statics : {
      __bC : g,
      __bD : null,
      __bE : {
      },
      camelCase : function(v){

        var u = this.__bE[v];
        if(!u){

          u = v.replace(/\-([a-z])/g, function(x, w){

            return w.toUpperCase();
          });
          if(v.indexOf(a) >= 0){

            this.__bE[v] = u;
          };
        };
        return u;
      },
      hyphenate : function(z){

        var y = this.__bE[z];
        if(!y){

          y = z.replace(/[A-Z]/g, function(A){

            return (j + A.charAt(0).toLowerCase());
          });
          if(z.indexOf(a) == -1){

            this.__bE[z] = y;
          };
        };
        return y;
      },
      capitalize : function(C){

        if(this.__bD === null){

          var B = c;
          this.__bD = new RegExp(n + this.__bC.replace(/[0-9A-F]{4}/g, function(D){

            return B + D;
          }) + t + this.__bC.replace(/[0-9A-F]{4}/g, function(E){

            return B + E;
          }) + b, k);
        };
        return C.replace(this.__bD, function(F){

          return F.toUpperCase();
        });
      },
      clean : function(G){

        return G.replace(/\s+/g, r).trim();
      },
      trimLeft : function(H){

        return H.replace(/^\s+/, e);
      },
      trimRight : function(I){

        return I.replace(/\s+$/, e);
      },
      startsWith : function(K, J){

        return K.indexOf(J) === 0;
      },
      endsWith : function(M, L){

        return M.substring(M.length - L.length, M.length) === L;
      },
      repeat : function(N, O){

        return N.length > 0 ? new Array(O + 1).join(N) : e;
      },
      pad : function(Q, length, P){

        var R = length - Q.length;
        if(R > 0){

          if(typeof P === d){

            P = o;
          };
          return this.repeat(P, R) + Q;
        } else {

          return Q;
        };
      },
      firstUp : qx.Bootstrap.firstUp,
      firstLow : qx.Bootstrap.firstLow,
      contains : function(T, S){

        return T.indexOf(S) != -1;
      },
      format : function(U, V){

        var W = U;
        var i = V.length;
        while(i--){

          W = W.replace(new RegExp(p + (i + 1), k), V[i] + e);
        };
        return W;
      },
      escapeRegexpChars : function(X){

        return X.replace(/([.*+?^${}()|[\]\/\\])/g, f);
      },
      toArray : function(Y){

        return Y.split(/\B|\b/g);
      },
      stripTags : function(ba){

        return ba.replace(/<\/?[^>]+>/gi, e);
      },
      stripScripts : function(bd, bc){

        var be = e;
        var bb = bd.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){

          be += arguments[1] + s;
          return e;
        });
        if(bc === true){

          qx.lang.Function.globalEval(be);
        };
        return bb;
      },
      quote : function(bf){

        return q + bf.replace(/\\/g, h).replace(/\"/g, l) + q;
      }
    }
  });
})();
(function(){

  var a = 'anonymous()',b = "()",c = "qx.globalErrorHandling",d = "qx.lang.Function",e = ".",f = ".prototype.",g = ".constructor()";
  qx.Bootstrap.define(d, {
    statics : {
      getCaller : function(h){

        return h.caller ? h.caller.callee : h.callee.caller;
      },
      getName : function(i){

        if(i.displayName){

          return i.displayName;
        };
        if(i.$$original || i.wrapper || i.classname){

          return i.classname + g;
        };
        if(i.$$mixin){

          for(var j in i.$$mixin.$$members){

            if(i.$$mixin.$$members[j] == i){

              return i.$$mixin.name + f + j + b;
            };
          };
          for(var j in i.$$mixin){

            if(i.$$mixin[j] == i){

              return i.$$mixin.name + e + j + b;
            };
          };
        };
        if(i.self){

          var l = i.self.constructor;
          if(l){

            for(var j in l.prototype){

              if(l.prototype[j] == i){

                return l.classname + f + j + b;
              };
            };
            for(var j in l){

              if(l[j] == i){

                return l.classname + e + j + b;
              };
            };
          };
        };
        var k = i.toString().match(/function\s*(\w*)\s*\(.*/);
        if(k && k.length >= 1 && k[1]){

          return k[1] + b;
        };
        return a;
      },
      globalEval : function(data){

        if(window.execScript){

          return window.execScript(data);
        } else {

          return eval.call(window, data);
        };
      },
      create : function(n, m){

        {
        };
        if(!m){

          return n;
        };
        if(!(m.self || m.args || m.delay != null || m.periodical != null || m.attempt)){

          return n;
        };
        return function(event){

          {
          };
          var p = qx.lang.Array.fromArguments(arguments);
          if(m.args){

            p = m.args.concat(p);
          };
          if(m.delay || m.periodical){

            var o = function(){

              return n.apply(m.self || this, p);
            };
            if(qx.core.Environment.get(c)){

              o = qx.event.GlobalError.observeMethod(o);
            };
            if(m.delay){

              return window.setTimeout(o, m.delay);
            };
            if(m.periodical){

              return window.setInterval(o, m.periodical);
            };
          } else if(m.attempt){

            var q = false;
            try{

              q = n.apply(m.self || this, p);
            } catch(r) {
            };
            return q;
          } else {

            return n.apply(m.self || this, p);
          };
        };
      },
      bind : function(s, self, t){

        return this.create(s, {
          self : self,
          args : arguments.length > 2 ? qx.lang.Array.fromArguments(arguments, 2) : null
        });
      },
      curry : function(u, v){

        return this.create(u, {
          args : arguments.length > 1 ? qx.lang.Array.fromArguments(arguments, 1) : null
        });
      },
      listener : function(x, self, y){

        if(arguments.length < 3){

          return function(event){

            return x.call(self || this, event || window.event);
          };
        } else {

          var w = qx.lang.Array.fromArguments(arguments, 2);
          return function(event){

            var z = [event || window.event];
            z.push.apply(z, w);
            x.apply(self || this, z);
          };
        };
      },
      attempt : function(A, self, B){

        return this.create(A, {
          self : self,
          attempt : true,
          args : arguments.length > 2 ? qx.lang.Array.fromArguments(arguments, 2) : null
        })();
      },
      delay : function(D, C, self, E){

        return this.create(D, {
          delay : C,
          self : self,
          args : arguments.length > 3 ? qx.lang.Array.fromArguments(arguments, 3) : null
        })();
      },
      periodical : function(G, F, self, H){

        return this.create(G, {
          periodical : F,
          self : self,
          args : arguments.length > 3 ? qx.lang.Array.fromArguments(arguments, 3) : null
        })();
      }
    }
  });
})();
(function(){

  var a = "qx.globalErrorHandling",b = "qx.event.GlobalError";
  qx.Bootstrap.define(b, {
    statics : {
      __bF : null,
      __bG : null,
      __bH : null,
      __bI : function(){

        if(qx.core && qx.core.Environment){

          return qx.core.Environment.get(a);
        } else {

          return !!qx.Bootstrap.getEnvironmentSetting(a);
        };
      },
      setErrorHandler : function(c, d){

        this.__bF = c || null;
        this.__bH = d || window;
        if(this.__bI()){

          if(c && window.onerror){

            var e = qx.Bootstrap.bind(this.__bJ, this);
            if(this.__bG == null){

              this.__bG = window.onerror;
            };
            var self = this;
            window.onerror = function(f, g, h){

              self.__bG(f, g, h);
              e(f, g, h);
            };
          };
          if(c && !window.onerror){

            window.onerror = qx.Bootstrap.bind(this.__bJ, this);
          };
          if(this.__bF == null){

            if(this.__bG != null){

              window.onerror = this.__bG;
              this.__bG = null;
            } else {

              window.onerror = null;
            };
          };
        };
      },
      __bJ : function(i, j, k){

        if(this.__bF){

          this.handleError(new qx.core.WindowError(i, j, k));
        };
      },
      observeMethod : function(l){

        if(this.__bI()){

          var self = this;
          return function(){

            if(!self.__bF){

              return l.apply(this, arguments);
            };
            try{

              return l.apply(this, arguments);
            } catch(m) {

              self.handleError(new qx.core.GlobalError(m, arguments));
            };
          };
        } else {

          return l;
        };
      },
      handleError : function(n){

        if(this.__bF){

          this.__bF.call(this.__bH, n);
        };
      }
    },
    defer : function(o){

      if(qx.core && qx.core.Environment){

        qx.core.Environment.add(a, true);
      } else {

        qx.Bootstrap.setEnvironmentSetting(a, true);
      };
      o.setErrorHandler(null, null);
    }
  });
})();
(function(){

  var a = "",b = "qx.core.WindowError";
  qx.Bootstrap.define(b, {
    extend : Error,
    construct : function(c, e, f){

      var d = Error.call(this, c);
      if(d.stack){

        this.stack = d.stack;
      };
      if(d.stacktrace){

        this.stacktrace = d.stacktrace;
      };
      this.__bK = c;
      this.__bL = e || a;
      this.__bM = f === undefined ? -1 : f;
    },
    members : {
      __bK : null,
      __bL : null,
      __bM : null,
      toString : function(){

        return this.__bK;
      },
      getUri : function(){

        return this.__bL;
      },
      getLineNumber : function(){

        return this.__bM;
      }
    }
  });
})();
(function(){

  var a = "GlobalError: ",b = "qx.core.GlobalError";
  qx.Bootstrap.define(b, {
    extend : Error,
    construct : function(e, c){

      if(qx.Bootstrap.DEBUG){

        qx.core.Assert.assertNotUndefined(e);
      };
      this.__bK = a + (e && e.message ? e.message : e);
      var d = Error.call(this, this.__bK);
      if(d.stack){

        this.stack = d.stack;
      };
      if(d.stacktrace){

        this.stacktrace = d.stacktrace;
      };
      this.__bN = c;
      this.__bO = e;
    },
    members : {
      __bO : null,
      __bN : null,
      __bK : null,
      toString : function(){

        return this.__bK;
      },
      getArguments : function(){

        return this.__bN;
      },
      getSourceException : function(){

        return this.__bO;
      }
    },
    destruct : function(){

      this.__bO = null;
      this.__bN = null;
      this.__bK = null;
    }
  });
})();
(function(){

  var a = ": ",b = "qx.type.BaseError",c = "",d = "error";
  qx.Class.define(b, {
    extend : Error,
    construct : function(e, f){

      var g = Error.call(this, f);
      if(g.stack){

        this.stack = g.stack;
      };
      if(g.stacktrace){

        this.stacktrace = g.stacktrace;
      };
      this.__bP = e || c;
      this.message = f || qx.type.BaseError.DEFAULTMESSAGE;
    },
    statics : {
      DEFAULTMESSAGE : d
    },
    members : {
      __bQ : null,
      __bP : null,
      message : null,
      getComment : function(){

        return this.__bP;
      },
      toString : function(){

        return this.__bP + (this.message ? a + this.message : c);
      }
    }
  });
})();
(function(){

  var b = ': ',d = 'String',e = '',f = 'Boolean',g = '\\\\',h = 'object',l = '\\f',m = ']',o = '\\t',p = 'function',q = '{\n',r = '[]',s = "qx.lang.JsonImpl",t = 'Z',u = ',',w = '\\n',x = 'Object',y = '{}',z = '"',A = '@',B = '.',C = '(',D = 'Array',E = 'T',F = ':',G = '\\r',H = '{',I = 'JSON.parse',J = ' ',K = '\n',L = '\\u',M = ',\n',N = '0000',O = 'null',P = 'string',Q = "Cannot stringify a recursive object.",R = '0',S = '-',T = '[',U = 'Number',V = ')',W = '[\n',X = '\\"',Y = '\\b',ba = '}';
  qx.Bootstrap.define(s, {
    extend : Object,
    construct : function(){

      this.stringify = qx.lang.Function.bind(this.stringify, this);
      this.parse = qx.lang.Function.bind(this.parse, this);
    },
    members : {
      __bR : null,
      __bS : null,
      __bT : null,
      __bU : null,
      stringify : function(bc, bb, bd){

        this.__bR = e;
        this.__bS = e;
        this.__bU = [];
        if(qx.lang.Type.isNumber(bd)){

          var bd = Math.min(10, Math.floor(bd));
          for(var i = 0;i < bd;i += 1){

            this.__bS += J;
          };
        } else if(qx.lang.Type.isString(bd)){

          if(bd.length > 10){

            bd = bd.slice(0, 10);
          };
          this.__bS = bd;
        };
        if(bb && (qx.lang.Type.isFunction(bb) || qx.lang.Type.isArray(bb))){

          this.__bT = bb;
        } else {

          this.__bT = null;
        };
        return this.__bV(e, {
          '' : bc
        });
      },
      __bV : function(bi, bj){

        var bg = this.__bR,be,bh = bj[bi];
        if(bh && qx.lang.Type.isFunction(bh.toJSON)){

          bh = bh.toJSON(bi);
        } else if(qx.lang.Type.isDate(bh)){

          bh = this.dateToJSON(bh);
        };
        if(typeof this.__bT === p){

          bh = this.__bT.call(bj, bi, bh);
        };
        if(bh === null){

          return O;
        };
        if(bh === undefined){

          return undefined;
        };
        switch(qx.lang.Type.getClass(bh)){case d:
        return this.__bW(bh);case U:
        return isFinite(bh) ? String(bh) : O;case f:
        return String(bh);case D:
        this.__bR += this.__bS;
        be = [];
        if(this.__bU.indexOf(bh) !== -1){

          throw new TypeError(Q);
        };
        this.__bU.push(bh);
        var length = bh.length;
        for(var i = 0;i < length;i += 1){

          be[i] = this.__bV(i, bh) || O;
        };
        this.__bU.pop();
        if(be.length === 0){

          var bf = r;
        } else if(this.__bR){

          bf = W + this.__bR + be.join(M + this.__bR) + K + bg + m;
        } else {

          bf = T + be.join(u) + m;
        };
        this.__bR = bg;
        return bf;case x:
        this.__bR += this.__bS;
        be = [];
        if(this.__bU.indexOf(bh) !== -1){

          throw new TypeError(Q);
        };
        this.__bU.push(bh);
        if(this.__bT && typeof this.__bT === h){

          var length = this.__bT.length;
          for(var i = 0;i < length;i += 1){

            var k = this.__bT[i];
            if(typeof k === P){

              var v = this.__bV(k, bh);
              if(v){

                be.push(this.__bW(k) + (this.__bR ? b : F) + v);
              };
            };
          };
        } else {

          for(var k in bh){

            if(Object.hasOwnProperty.call(bh, k)){

              var v = this.__bV(k, bh);
              if(v){

                be.push(this.__bW(k) + (this.__bR ? b : F) + v);
              };
            };
          };
        };
        this.__bU.pop();
        if(be.length === 0){

          var bf = y;
        } else if(this.__bR){

          bf = q + this.__bR + be.join(M + this.__bR) + K + bg + ba;
        } else {

          bf = H + be.join(u) + ba;
        };
        this.__bR = bg;
        return bf;};
      },
      dateToJSON : function(bk){

        var bl = function(n){

          return n < 10 ? R + n : n;
        };
        var bm = function(n){

          var bn = bl(n);
          return n < 100 ? R + bn : bn;
        };
        return isFinite(bk.valueOf()) ? bk.getUTCFullYear() + S + bl(bk.getUTCMonth() + 1) + S + bl(bk.getUTCDate()) + E + bl(bk.getUTCHours()) + F + bl(bk.getUTCMinutes()) + F + bl(bk.getUTCSeconds()) + B + bm(bk.getUTCMilliseconds()) + t : null;
      },
      __bW : function(bp){

        var bo = {
          '\b' : Y,
          '\t' : o,
          '\n' : w,
          '\f' : l,
          '\r' : G,
          '"' : X,
          '\\' : g
        };
        var bq = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        bq.lastIndex = 0;
        if(bq.test(bp)){

          return z + bp.replace(bq, function(a){

            var c = bo[a];
            return typeof c === P ? c : L + (N + a.charCodeAt(0).toString(16)).slice(-4);
          }) + z;
        } else {

          return z + bp + z;
        };
      },
      parse : function(text, reviver){

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        cx.lastIndex = 0;
        if(cx.test(text)){

          text = text.replace(cx, function(a){

            return L + (N + a.charCodeAt(0).toString(16)).slice(-4);
          });
        };
        if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, A).replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, m).replace(/(?:^|:|,)(?:\s*\[)+/g, e))){

          var j = eval(C + text + V);
          return typeof reviver === p ? this.__bX({
            '' : j
          }, e, reviver) : j;
        };
        throw new SyntaxError(I);
      },
      __bX : function(bu, bt, bs){

        var br = bu[bt];
        if(br && typeof br === h){

          for(var k in br){

            if(Object.hasOwnProperty.call(br, k)){

              var v = this.__bX(br, k, bs);
              if(v !== undefined){

                br[k] = v;
              } else {

                delete br[k];
              };
            };
          };
        };
        return bs.call(bu, bt, br);
      }
    }
  });
})();
(function(){

  var a = "anonymous",b = "...",c = "qx.dev.StackTrace",d = "",e = "\n",f = "?",g = "/source/class/",h = "Error created at",j = "ecmascript.error.stacktrace",k = "Backtrace:",l = "stack",m = ":",n = ".",o = "function",p = "prototype",q = "stacktrace";
  qx.Bootstrap.define(c, {
    statics : {
      FILENAME_TO_CLASSNAME : null,
      FORMAT_STACKTRACE : null,
      getStackTrace : function(){

        var t = [];
        try{

          throw new Error();
        } catch(G) {

          if(qx.dev.StackTrace.hasEnvironmentCheck && qx.core.Environment.get(j)){

            var y = qx.dev.StackTrace.getStackTraceFromError(G);
            var B = qx.dev.StackTrace.getStackTraceFromCaller(arguments);
            qx.lang.Array.removeAt(y, 0);
            t = B.length > y.length ? B : y;
            for(var i = 0;i < Math.min(B.length, y.length);i++){

              var w = B[i];
              if(w.indexOf(a) >= 0){

                continue;
              };
              var s = null;
              var C = w.split(n);
              var v = /(.*?)\(/.exec(C[C.length - 1]);
              if(v && v.length == 2){

                s = v[1];
                C.pop();
              };
              if(C[C.length - 1] == p){

                C.pop();
              };
              var E = C.join(n);
              var u = y[i];
              var F = u.split(m);
              var A = F[0];
              var z = F[1];
              var r;
              if(F[2]){

                r = F[2];
              };
              var x = null;
              if(qx.Class.getByName(A)){

                x = A;
              } else {

                x = E;
              };
              var D = x;
              if(s){

                D += n + s;
              };
              D += m + z;
              if(r){

                D += m + r;
              };
              t[i] = D;
            };
          } else {

            t = this.getStackTraceFromCaller(arguments);
          };
        };
        return t;
      },
      getStackTraceFromCaller : function(K){

        var J = [];
        var M = qx.lang.Function.getCaller(K);
        var H = {
        };
        while(M){

          var L = qx.lang.Function.getName(M);
          J.push(L);
          try{

            M = M.caller;
          } catch(N) {

            break;
          };
          if(!M){

            break;
          };
          var I = qx.core.ObjectRegistry.toHashCode(M);
          if(H[I]){

            J.push(b);
            break;
          };
          H[I] = M;
        };
        return J;
      },
      getStackTraceFromError : function(bd){

        var T = [];
        var R,S,ba,Q,P,bf,bb;
        var bc = qx.dev.StackTrace.hasEnvironmentCheck ? qx.core.Environment.get(j) : null;
        if(bc === l){

          if(!bd.stack){

            return T;
          };
          R = /@(.+):(\d+)$/gm;
          while((S = R.exec(bd.stack)) != null){

            bb = S[1];
            Q = S[2];
            ba = this.__bY(bb);
            T.push(ba + m + Q);
          };
          if(T.length > 0){

            return this.__cb(T);
          };
          R = /at (.*)/gm;
          var be = /\((.*?)(:[^\/].*)\)/;
          var Y = /(.*?)(:[^\/].*)/;
          while((S = R.exec(bd.stack)) != null){

            var X = be.exec(S[1]);
            if(!X){

              X = Y.exec(S[1]);
            };
            if(X){

              ba = this.__bY(X[1]);
              T.push(ba + X[2]);
            } else {

              T.push(S[1]);
            };
          };
        } else if(bc === q){

          var U = bd.stacktrace;
          if(!U){

            return T;
          };
          if(U.indexOf(h) >= 0){

            U = U.split(h)[0];
          };
          R = /line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;
          while((S = R.exec(U)) != null){

            Q = S[1];
            P = S[2];
            bb = S[3];
            ba = this.__bY(bb);
            T.push(ba + m + Q + m + P);
          };
          if(T.length > 0){

            return this.__cb(T);
          };
          R = /Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;
          while((S = R.exec(U)) != null){

            Q = S[1];
            bb = S[2];
            ba = this.__bY(bb);
            T.push(ba + m + Q);
          };
        } else if(bd.message && bd.message.indexOf(k) >= 0){

          var W = bd.message.split(k)[1].trim();
          var V = W.split(e);
          for(var i = 0;i < V.length;i++){

            var O = V[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);
            if(O && O.length >= 2){

              Q = O[1];
              bf = this.__bY(O[2]);
              T.push(bf + m + Q);
            };
          };
        } else if(bd.sourceURL && bd.line){

          T.push(this.__bY(bd.sourceURL) + m + bd.line);
        };;;
        return this.__cb(T);
      },
      __bY : function(bh){

        if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME == o){

          var bg = qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bh);
          {
          };
          return bg;
        };
        return qx.dev.StackTrace.__ca(bh);
      },
      __ca : function(bk){

        var bl = g;
        var bi = bk.indexOf(bl);
        var bm = bk.indexOf(f);
        if(bm >= 0){

          bk = bk.substring(0, bm);
        };
        var bj = (bi == -1) ? bk : bk.substring(bi + bl.length).replace(/\//g, n).replace(/\.js$/, d);
        return bj;
      },
      __cb : function(bn){

        if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE == o){

          bn = qx.dev.StackTrace.FORMAT_STACKTRACE(bn);
          {
          };
        };
        return bn;
      }
    },
    defer : function(bo){

      bo.hasEnvironmentCheck = qx.bom.client.EcmaScript && qx.bom.client.EcmaScript.getStackTrace;
    }
  });
})();
(function(){

  var c = "-",d = "",e = "qx.core.ObjectRegistry",f = "Disposed ",g = "$$hash",h = "-0",j = " objects",k = "Could not dispose object ",m = ": ";
  qx.Bootstrap.define(e, {
    statics : {
      inShutDown : false,
      __G : {
      },
      __cc : 0,
      __cd : [],
      __ce : d,
      __cf : {
      },
      register : function(n){

        var q = this.__G;
        if(!q){

          return;
        };
        var p = n.$$hash;
        if(p == null){

          var o = this.__cd;
          if(o.length > 0 && true){

            p = o.pop();
          } else {

            p = (this.__cc++) + this.__ce;
          };
          n.$$hash = p;
          {
          };
        };
        {
        };
        q[p] = n;
      },
      unregister : function(r){

        var s = r.$$hash;
        if(s == null){

          return;
        };
        var t = this.__G;
        if(t && t[s]){

          delete t[s];
          this.__cd.push(s);
        };
        try{

          delete r.$$hash;
        } catch(u) {

          if(r.removeAttribute){

            r.removeAttribute(g);
          };
        };
      },
      toHashCode : function(v){

        {
        };
        var x = v.$$hash;
        if(x != null){

          return x;
        };
        var w = this.__cd;
        if(w.length > 0){

          x = w.pop();
        } else {

          x = (this.__cc++) + this.__ce;
        };
        return v.$$hash = x;
      },
      clearHashCode : function(y){

        {
        };
        var z = y.$$hash;
        if(z != null){

          this.__cd.push(z);
          try{

            delete y.$$hash;
          } catch(A) {

            if(y.removeAttribute){

              y.removeAttribute(g);
            };
          };
        };
      },
      fromHashCode : function(B){

        return this.__G[B] || null;
      },
      shutdown : function(){

        this.inShutDown = true;
        var D = this.__G;
        var F = [];
        for(var C in D){

          F.push(C);
        };
        F.sort(function(a, b){

          return parseInt(b, 10) - parseInt(a, 10);
        });
        var E,i = 0,l = F.length;
        while(true){

          try{

            for(;i < l;i++){

              C = F[i];
              E = D[C];
              if(E && E.dispose){

                E.dispose();
              };
            };
          } catch(G) {

            qx.Bootstrap.error(this, k + E.toString() + m + G, G);
            if(i !== l){

              i++;
              continue;
            };
          };
          break;
        };
        qx.Bootstrap.debug(this, f + l + j);
        delete this.__G;
      },
      getRegistry : function(){

        return this.__G;
      },
      getNextHash : function(){

        return this.__cc;
      },
      getPostId : function(){

        return this.__ce;
      },
      getStackTraces : function(){

        return this.__cf;
      }
    },
    defer : function(H){

      if(window && window.top){

        var frames = window.top.frames;
        for(var i = 0;i < frames.length;i++){

          if(frames[i] === window){

            H.__ce = c + (i + 1);
            return;
          };
        };
      };
      H.__ce = h;
    }
  });
})();
(function(){

  var a = "qx.core.AssertionError";
  qx.Class.define(a, {
    extend : qx.type.BaseError,
    construct : function(b, c){

      qx.type.BaseError.call(this, b, c);
      this.__cg = qx.dev.StackTrace.getStackTrace();
    },
    members : {
      __cg : null,
      getStackTrace : function(){

        return this.__cg;
      }
    }
  });
})();
(function(){

  var a = "prop",b = "qx.bom.client.Json",c = "repl",d = "JSON",e = '{"x":1}',f = "json",g = "val";
  qx.Bootstrap.define(b, {
    statics : {
      getJson : function(){

        return (qx.Bootstrap.getClass(window.JSON) == d && JSON.parse(e).x === 1 && JSON.stringify({
          "prop" : g
        }, function(k, v){

          return k === a ? c : v;
        }).indexOf(c) > 0);
      }
    },
    defer : function(h){

      qx.core.Environment.add(f, h.getJson);
    }
  });
})();
(function(){

  var a = "qx.lang.Json",b = "json";
  qx.Bootstrap.define(a, {
    statics : {
      JSON : qx.core.Environment.get(b) ? window.JSON : new qx.lang.JsonImpl(),
      stringify : null,
      parse : null
    },
    defer : function(c){

      c.stringify = c.JSON.stringify;
      c.parse = c.JSON.parse;
    }
  });
})();
(function(){

  var a = "[object Opera]",b = "function",c = "[^\\.0-9]",d = "4.0",e = "gecko",f = "1.9.0.0",g = "Version/",h = "9.0",i = "8.0",j = "Gecko",k = "Maple",l = "AppleWebKit/",m = "Trident",n = "Unsupported client: ",o = "",p = "opera",q = "engine.version",r = "! Assumed gecko version 1.9.0.0 (Firefox 3.0).",s = "mshtml",t = "engine.name",u = "webkit",v = "5.0",w = ".",x = "qx.bom.client.Engine";
  qx.Bootstrap.define(x, {
    statics : {
      getVersion : function(){

        var A = window.navigator.userAgent;
        var B = o;
        if(qx.bom.client.Engine.__ch()){

          if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){

            if(A.indexOf(g) != -1){

              var D = A.match(/Version\/(\d+)\.(\d+)/);
              B = D[1] + w + D[2].charAt(0) + w + D[2].substring(1, D[2].length);
            } else {

              B = RegExp.$1 + w + RegExp.$2;
              if(RegExp.$3 != o){

                B += w + RegExp.$3;
              };
            };
          };
        } else if(qx.bom.client.Engine.__ci()){

          if(/AppleWebKit\/([^ ]+)/.test(A)){

            B = RegExp.$1;
            var C = RegExp(c).exec(B);
            if(C){

              B = B.slice(0, C.index);
            };
          };
        } else if(qx.bom.client.Engine.__ck() || qx.bom.client.Engine.__cj()){

          if(/rv\:([^\);]+)(\)|;)/.test(A)){

            B = RegExp.$1;
          };
        } else if(qx.bom.client.Engine.__cl()){

          var z = /Trident\/([^\);]+)(\)|;)/.test(A);
          if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){

            B = RegExp.$1;
            if(B < 8 && z){

              if(RegExp.$1 == d){

                B = i;
              } else if(RegExp.$1 == v){

                B = h;
              };
            };
          } else if(z){

            var D = /\brv\:(\d+?\.\d+?)\b/.exec(A);
            if(D){

              B = D[1];
            };
          };
        } else {

          var y = window.qxFail;
          if(y && typeof y === b){

            B = y().FULLVERSION;
          } else {

            B = f;
            qx.Bootstrap.warn(n + A + r);
          };
        };;;
        return B;
      },
      getName : function(){

        var name;
        if(qx.bom.client.Engine.__ch()){

          name = p;
        } else if(qx.bom.client.Engine.__ci()){

          name = u;
        } else if(qx.bom.client.Engine.__ck() || qx.bom.client.Engine.__cj()){

          name = e;
        } else if(qx.bom.client.Engine.__cl()){

          name = s;
        } else {

          var E = window.qxFail;
          if(E && typeof E === b){

            name = E().NAME;
          } else {

            name = e;
            qx.Bootstrap.warn(n + window.navigator.userAgent + r);
          };
        };;;
        return name;
      },
      __ch : function(){

        return window.opera && Object.prototype.toString.call(window.opera) == a;
      },
      __ci : function(){

        return window.navigator.userAgent.indexOf(l) != -1;
      },
      __cj : function(){

        return window.navigator.userAgent.indexOf(k) != -1;
      },
      __ck : function(){

        return window.controllers && window.navigator.product === j && window.navigator.userAgent.indexOf(k) == -1 && window.navigator.userAgent.indexOf(m) == -1;
      },
      __cl : function(){

        return window.navigator.cpuClass && (/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent) || /Trident\/\d+?\.\d+?/.test(window.navigator.userAgent));
      }
    },
    defer : function(F){

      qx.core.Environment.add(q, F.getVersion);
      qx.core.Environment.add(t, F.getName);
    }
  });
})();
(function(){

  var a = "qx.log.Logger",b = "[",c = "...(+",d = "array",e = ")",f = "info",g = "node",h = "instance",j = "string",k = "null",m = "error",n = "#",o = "class",p = ": ",q = "warn",r = "document",s = "{...(",t = "",u = "number",v = "stringify",w = "]",x = "date",y = "unknown",z = "function",A = "text[",B = "[...(",C = "boolean",D = "\n",E = ")}",F = "debug",G = ")]",H = "map",I = "undefined",J = "object";
  qx.Class.define(a, {
    statics : {
      __cm : F,
      setLevel : function(K){

        this.__cm = K;
      },
      getLevel : function(){

        return this.__cm;
      },
      setTreshold : function(L){

        this.__cp.setMaxMessages(L);
      },
      getTreshold : function(){

        return this.__cp.getMaxMessages();
      },
      __cn : {
      },
      __co : 0,
      register : function(P){

        if(P.$$id){

          return;
        };
        var M = this.__co++;
        this.__cn[M] = P;
        P.$$id = M;
        var N = this.__cq;
        var O = this.__cp.getAllLogEvents();
        for(var i = 0,l = O.length;i < l;i++){

          if(N[O[i].level] >= N[this.__cm]){

            P.process(O[i]);
          };
        };
      },
      unregister : function(Q){

        var R = Q.$$id;
        if(R == null){

          return;
        };
        delete this.__cn[R];
        delete Q.$$id;
      },
      debug : function(T, S){

        qx.log.Logger.__cr(F, arguments);
      },
      info : function(V, U){

        qx.log.Logger.__cr(f, arguments);
      },
      warn : function(X, W){

        qx.log.Logger.__cr(q, arguments);
      },
      error : function(ba, Y){

        qx.log.Logger.__cr(m, arguments);
      },
      trace : function(bb){

        var bc = qx.dev.StackTrace.getStackTrace();
        qx.log.Logger.__cr(f, [(typeof bb !== I ? [bb].concat(bc) : bc).join(D)]);
      },
      deprecatedMethodWarning : function(bf, bd){

        {

          var be;
        };
      },
      deprecatedClassWarning : function(bi, bg){

        {

          var bh;
        };
      },
      deprecatedEventWarning : function(bl, event, bj){

        {

          var bk;
        };
      },
      deprecatedMixinWarning : function(bn, bm){

        {

          var bo;
        };
      },
      deprecatedConstantWarning : function(bs, bq, bp){

        {

          var self,br;
        };
      },
      deprecateMethodOverriding : function(bv, bu, bw, bt){

        {

          var bx;
        };
      },
      clear : function(){

        this.__cp.clearHistory();
      },
      __cp : new qx.log.appender.RingBuffer(50),
      __cq : {
        debug : 0,
        info : 1,
        warn : 2,
        error : 3
      },
      __cr : function(bz, bB){

        var bE = this.__cq;
        if(bE[bz] < bE[this.__cm]){

          return;
        };
        var by = bB.length < 2 ? null : bB[0];
        var bD = by ? 1 : 0;
        var bA = [];
        for(var i = bD,l = bB.length;i < l;i++){

          bA.push(this.__ct(bB[i], true));
        };
        var bF = new Date;
        var bG = {
          time : bF,
          offset : bF - qx.Bootstrap.LOADSTART,
          level : bz,
          items : bA,
          win : window
        };
        if(by){

          if(by.$$hash !== undefined){

            bG.object = by.$$hash;
          } else if(by.$$type){

            bG.clazz = by;
          };
        };
        this.__cp.process(bG);
        var bC = this.__cn;
        for(var bH in bC){

          bC[bH].process(bG);
        };
      },
      __cs : function(bJ){

        if(bJ === undefined){

          return I;
        } else if(bJ === null){

          return k;
        };
        if(bJ.$$type){

          return o;
        };
        var bI = typeof bJ;
        if(bI === z || bI == j || bI === u || bI === C){

          return bI;
        } else if(bI === J){

          if(bJ.nodeType){

            return g;
          } else if(bJ instanceof Error || (bJ.name && bJ.message)){

            return m;
          } else if(bJ.classname){

            return h;
          } else if(bJ instanceof Array){

            return d;
          } else if(bJ instanceof Date){

            return x;
          } else {

            return H;
          };;;;
        };
        if(bJ.toString){

          return v;
        };
        return y;
      },
      __ct : function(bP, bO){

        var bS = this.__cs(bP);
        var bM = y;
        var bL = [];
        switch(bS){case k:case I:
        bM = bS;
        break;case j:case u:case C:case x:
        bM = bP;
        break;case g:
        if(bP.nodeType === 9){

          bM = r;
        } else if(bP.nodeType === 3){

          bM = A + bP.nodeValue + w;
        } else if(bP.nodeType === 1){

          bM = bP.nodeName.toLowerCase();
          if(bP.id){

            bM += n + bP.id;
          };
        } else {

          bM = g;
        };;
        break;case z:
        bM = qx.lang.Function.getName(bP) || bS;
        break;case h:
        bM = bP.basename + b + bP.$$hash + w;
        break;case o:case v:
        bM = bP.toString();
        break;case m:
        bL = qx.dev.StackTrace.getStackTraceFromError(bP);
        bM = (bP.basename ? bP.basename + p : t) + bP.toString();
        break;case d:
        if(bO){

          bM = [];
          for(var i = 0,l = bP.length;i < l;i++){

            if(bM.length > 20){

              bM.push(c + (l - i) + e);
              break;
            };
            bM.push(this.__ct(bP[i], false));
          };
        } else {

          bM = B + bP.length + G;
        };
        break;case H:
        if(bO){

          var bK;
          var bR = [];
          for(var bQ in bP){

            bR.push(bQ);
          };
          bR.sort();
          bM = [];
          for(var i = 0,l = bR.length;i < l;i++){

            if(bM.length > 20){

              bM.push(c + (l - i) + e);
              break;
            };
            bQ = bR[i];
            bK = this.__ct(bP[bQ], false);
            bK.key = bQ;
            bM.push(bK);
          };
        } else {

          var bN = 0;
          for(var bQ in bP){

            bN++;
          };
          bM = s + bN + E;
        };
        break;};
        return {
          type : bS,
          text : bM,
          trace : bL
        };
      }
    },
    defer : function(bT){

      var bU = qx.Bootstrap.$$logs;
      for(var i = 0;i < bU.length;i++){

        bT.__cr(bU[i][0], bU[i][1]);
      };
      qx.Bootstrap.debug = bT.debug;
      qx.Bootstrap.info = bT.info;
      qx.Bootstrap.warn = bT.warn;
      qx.Bootstrap.error = bT.error;
      qx.Bootstrap.trace = bT.trace;
    }
  });
})();
(function(){

  var a = "qx.event.type.Data",b = "qx.event.type.Event",c = "qx.data.IListData";
  qx.Interface.define(c, {
    events : {
      "change" : a,
      "changeLength" : b
    },
    members : {
      getItem : function(d){
      },
      setItem : function(e, f){
      },
      splice : function(g, h, i){
      },
      contains : function(j){
      },
      getLength : function(){
      },
      toArray : function(){
      }
    }
  });
})();
(function(){

  var a = "qx.core.ValidationError";
  qx.Class.define(a, {
    extend : qx.type.BaseError
  });
})();
(function(){

  var a = "qx.core.MProperty",b = "get",c = "reset",d = "No such property: ",e = "set";
  qx.Mixin.define(a, {
    members : {
      set : function(g, h){

        var f = qx.core.Property.$$method.set;
        if(qx.Bootstrap.isString(g)){

          if(!this[f[g]]){

            if(this[e + qx.Bootstrap.firstUp(g)] != undefined){

              this[e + qx.Bootstrap.firstUp(g)](h);
              return this;
            };
            throw new Error(d + g);
          };
          return this[f[g]](h);
        } else {

          for(var i in g){

            if(!this[f[i]]){

              if(this[e + qx.Bootstrap.firstUp(i)] != undefined){

                this[e + qx.Bootstrap.firstUp(i)](g[i]);
                continue;
              };
              throw new Error(d + i);
            };
            this[f[i]](g[i]);
          };
          return this;
        };
      },
      get : function(k){

        var j = qx.core.Property.$$method.get;
        if(!this[j[k]]){

          if(this[b + qx.Bootstrap.firstUp(k)] != undefined){

            return this[b + qx.Bootstrap.firstUp(k)]();
          };
          throw new Error(d + k);
        };
        return this[j[k]]();
      },
      reset : function(m){

        var l = qx.core.Property.$$method.reset;
        if(!this[l[m]]){

          if(this[c + qx.Bootstrap.firstUp(m)] != undefined){

            this[c + qx.Bootstrap.firstUp(m)]();
            return;
          };
          throw new Error(d + m);
        };
        this[l[m]]();
      }
    }
  });
})();
(function(){

  var a = "info",b = "debug",c = "warn",d = "qx.core.MLogging",e = "error";
  qx.Mixin.define(d, {
    members : {
      __cu : qx.log.Logger,
      debug : function(f){

        this.__cv(b, arguments);
      },
      info : function(g){

        this.__cv(a, arguments);
      },
      warn : function(h){

        this.__cv(c, arguments);
      },
      error : function(i){

        this.__cv(e, arguments);
      },
      trace : function(){

        this.__cu.trace(this);
      },
      __cv : function(j, l){

        var k = qx.lang.Array.fromArguments(l);
        k.unshift(this);
        this.__cu[j].apply(this.__cu, k);
      }
    }
  });
})();
(function(){

  var a = "HTMLEvents",b = "engine.name",c = "",d = "qx.bom.Event",f = "return;",g = "function",h = "mouseover",j = "transitionend",k = "gecko",m = "css.transition",n = "on",o = "undefined",p = "end-event";
  qx.Bootstrap.define(d, {
    statics : {
      addNativeListener : function(t, s, q, r){

        if(t.addEventListener){

          t.addEventListener(s, q, !!r);
        } else if(t.attachEvent){

          t.attachEvent(n + s, q);
        } else if(typeof t[n + s] != o){

          t[n + s] = q;
        } else {

          {
          };
        };;
      },
      removeNativeListener : function(x, w, u, v){

        if(x.removeEventListener){

          x.removeEventListener(w, u, !!v);
        } else if(x.detachEvent){

          try{

            x.detachEvent(n + w, u);
          } catch(e) {

            if(e.number !== -2146828218){

              throw e;
            };
          };
        } else if(typeof x[n + w] != o){

          x[n + w] = null;
        } else {

          {
          };
        };;
      },
      getTarget : function(e){

        return e.target || e.srcElement;
      },
      getRelatedTarget : function(e){

        if(e.relatedTarget !== undefined){

          if((qx.core.Environment.get(b) == k)){

            try{

              e.relatedTarget && e.relatedTarget.nodeType;
            } catch(y) {

              return null;
            };
          };
          return e.relatedTarget;
        } else if(e.fromElement !== undefined && e.type === h){

          return e.fromElement;
        } else if(e.toElement !== undefined){

          return e.toElement;
        } else {

          return null;
        };;
      },
      preventDefault : function(e){

        if(e.preventDefault){

          e.preventDefault();
        } else {

          try{

            e.keyCode = 0;
          } catch(z) {
          };
          e.returnValue = false;
        };
      },
      stopPropagation : function(e){

        if(e.stopPropagation){

          e.stopPropagation();
        } else {

          e.cancelBubble = true;
        };
      },
      fire : function(C, A){

        if(document.createEvent){

          var B = document.createEvent(a);
          B.initEvent(A, true, true);
          return !C.dispatchEvent(B);
        } else {

          var B = document.createEventObject();
          return C.fireEvent(n + A, B);
        };
      },
      supportsEvent : function(H, G){

        if(H != window && G.toLowerCase().indexOf(j) != -1){

          var F = qx.core.Environment.get(m);
          return (F && F[p] == G);
        };
        var D = n + G.toLowerCase();
        var E = (D in H);
        if(!E){

          E = typeof H[D] == g;
          if(!E && H.setAttribute){

            H.setAttribute(D, f);
            E = typeof H[D] == g;
            H.removeAttribute(D);
          };
        };
        return E;
      },
      getEventName : function(I, L){

        var J = [c].concat(qx.bom.Style.VENDOR_PREFIXES);
        for(var i = 0,l = J.length;i < l;i++){

          var K = J[i].toLowerCase();
          if(qx.bom.Event.supportsEvent(I, K + L)){

            return K ? K + qx.lang.String.firstUp(L) : L;
          };
        };
        return null;
      }
    }
  });
})();
(function(){

  var a = "qx.bom.client.CssTransition",b = "E",c = "transitionEnd",d = "e",e = "nd",f = "transition",g = "css.transition",h = "Trans";
  qx.Bootstrap.define(a, {
    statics : {
      getTransitionName : function(){

        return qx.bom.Style.getPropertyName(f);
      },
      getSupport : function(){

        var name = qx.bom.client.CssTransition.getTransitionName();
        if(!name){

          return null;
        };
        var i = qx.bom.Event.getEventName(window, c);
        i = i == c ? i.toLowerCase() : i;
        if(!i){

          i = name + (name.indexOf(h) > 0 ? b : d) + e;
        };
        return {
          name : name,
          "end-event" : i
        };
      }
    },
    defer : function(j){

      qx.core.Environment.add(g, j.getSupport);
    }
  });
})();
(function(){

  var a = "-",b = "qx.bom.Style",c = "",d = '-',e = "Webkit",f = "ms",g = "Moz",h = "O",j = "string",k = "Khtml";
  qx.Bootstrap.define(b, {
    statics : {
      VENDOR_PREFIXES : [e, g, h, f, k],
      __cw : {
      },
      getPropertyName : function(o){

        var m = document.documentElement.style;
        if(m[o] !== undefined){

          return o;
        };
        for(var i = 0,l = this.VENDOR_PREFIXES.length;i < l;i++){

          var n = this.VENDOR_PREFIXES[i] + qx.lang.String.firstUp(o);
          if(m[n] !== undefined){

            return n;
          };
        };
        return null;
      },
      getCssName : function(p){

        var q = this.__cw[p];
        if(!q){

          q = p.replace(/[A-Z]/g, function(r){

            return (d + r.charAt(0).toLowerCase());
          });
          if((/^ms/.test(q))){

            q = a + q;
          };
          this.__cw[p] = q;
        };
        return q;
      },
      getAppliedStyle : function(w, u, v, t){

        var s = (t !== false) ? [null].concat(this.VENDOR_PREFIXES) : [null];
        for(var i = 0,l = s.length;i < l;i++){

          var x = s[i] ? a + s[i].toLowerCase() + a + v : v;
          try{

            w.style[u] = x;
            if(typeof w.style[u] == j && w.style[u] !== c){

              return x;
            };
          } catch(y) {
          };
        };
        return null;
      }
    }
  });
})();
(function(){

  var a = "UNKNOWN_",b = "|bubble",c = "",d = "_",e = "c",f = "|",g = "unload",h = "|capture",j = "DOM_",k = "__cB",m = "WIN_",n = "QX_",o = "qx.event.Manager",p = "capture",q = "__cC",r = "DOCUMENT_";
  qx.Class.define(o, {
    extend : Object,
    construct : function(s, t){

      this.__cx = s;
      this.__cy = qx.core.ObjectRegistry.toHashCode(s);
      this.__cz = t;
      if(s.qx !== qx){

        var self = this;
        qx.bom.Event.addNativeListener(s, g, qx.event.GlobalError.observeMethod(function(){

          qx.bom.Event.removeNativeListener(s, g, arguments.callee);
          self.dispose();
        }));
      };
      this.__cA = {
      };
      this.__cB = {
      };
      this.__cC = {
      };
      this.__cD = {
      };
    },
    statics : {
      __cE : 0,
      getNextUniqueId : function(){

        return (this.__cE++) + c;
      }
    },
    members : {
      __cz : null,
      __cA : null,
      __cC : null,
      __cF : null,
      __cB : null,
      __cD : null,
      __cx : null,
      __cy : null,
      getWindow : function(){

        return this.__cx;
      },
      getWindowId : function(){

        return this.__cy;
      },
      getHandler : function(v){

        var u = this.__cB[v.classname];
        if(u){

          return u;
        };
        return this.__cB[v.classname] = new v(this);
      },
      getDispatcher : function(x){

        var w = this.__cC[x.classname];
        if(w){

          return w;
        };
        return this.__cC[x.classname] = new x(this, this.__cz);
      },
      getListeners : function(z, D, y){

        var B = z.$$hash || qx.core.ObjectRegistry.toHashCode(z);
        var E = this.__cA[B];
        if(!E){

          return null;
        };
        var C = D + (y ? h : b);
        var A = E[C];
        return A ? A.concat() : null;
      },
      getAllListeners : function(){

        return this.__cA;
      },
      serializeListeners : function(G){

        var K = G.$$hash || qx.core.ObjectRegistry.toHashCode(G);
        var O = this.__cA[K];
        var J = [];
        if(O){

          var H,N,F,I,L;
          for(var M in O){

            H = M.indexOf(f);
            N = M.substring(0, H);
            F = M.charAt(H + 1) == e;
            I = O[M];
            for(var i = 0,l = I.length;i < l;i++){

              L = I[i];
              J.push({
                self : L.context,
                handler : L.handler,
                type : N,
                capture : F
              });
            };
          };
        };
        return J;
      },
      toggleAttachedEvents : function(R, Q){

        var U = R.$$hash || qx.core.ObjectRegistry.toHashCode(R);
        var X = this.__cA[U];
        if(X){

          var S,W,P,T;
          for(var V in X){

            S = V.indexOf(f);
            W = V.substring(0, S);
            P = V.charCodeAt(S + 1) === 99;
            T = X[V];
            if(Q){

              this.__cG(R, W, P);
            } else {

              this.__cH(R, W, P);
            };
          };
        };
      },
      hasListener : function(ba, be, Y){

        {
        };
        var bc = ba.$$hash || qx.core.ObjectRegistry.toHashCode(ba);
        var bf = this.__cA[bc];
        if(!bf){

          return false;
        };
        var bd = be + (Y ? h : b);
        var bb = bf[bd];
        return !!(bb && bb.length > 0);
      },
      importListeners : function(bg, bi){

        {
        };
        var bm = bg.$$hash || qx.core.ObjectRegistry.toHashCode(bg);
        var bo = this.__cA[bm] = {
        };
        var bk = qx.event.Manager;
        for(var bh in bi){

          var bl = bi[bh];
          var bn = bl.type + (bl.capture ? h : b);
          var bj = bo[bn];
          if(!bj){

            bj = bo[bn] = [];
            this.__cG(bg, bl.type, bl.capture);
          };
          bj.push({
            handler : bl.listener,
            context : bl.self,
            unique : bl.unique || (bk.__cE++) + c
          });
        };
      },
      addListener : function(br, by, bt, self, bp){

        {

          var bv;
        };
        var bq = br.$$hash || qx.core.ObjectRegistry.toHashCode(br);
        var bz = this.__cA[bq];
        if(!bz){

          bz = this.__cA[bq] = {
          };
        };
        var bu = by + (bp ? h : b);
        var bs = bz[bu];
        if(!bs){

          bs = bz[bu] = [];
        };
        if(bs.length === 0){

          this.__cG(br, by, bp);
        };
        var bx = (qx.event.Manager.__cE++) + c;
        var bw = {
          handler : bt,
          context : self,
          unique : bx
        };
        bs.push(bw);
        return bu + f + bx;
      },
      findHandler : function(bE, bN){

        var bL = false,bD = false,bO = false,bA = false;
        var bK;
        if(bE.nodeType === 1){

          bL = true;
          bK = j + bE.tagName.toLowerCase() + d + bN;
        } else if(bE.nodeType === 9){

          bA = true;
          bK = r + bN;
        } else if(bE == this.__cx){

          bD = true;
          bK = m + bN;
        } else if(bE.classname){

          bO = true;
          bK = n + bE.classname + d + bN;
        } else {

          bK = a + bE + d + bN;
        };;;
        var bC = this.__cD;
        if(bC[bK]){

          return bC[bK];
        };
        var bJ = this.__cz.getHandlers();
        var bF = qx.event.IEventHandler;
        var bH,bI,bG,bB;
        for(var i = 0,l = bJ.length;i < l;i++){

          bH = bJ[i];
          bG = bH.SUPPORTED_TYPES;
          if(bG && !bG[bN]){

            continue;
          };
          bB = bH.TARGET_CHECK;
          if(bB){

            var bM = false;
            if(bL && ((bB & bF.TARGET_DOMNODE) != 0)){

              bM = true;
            } else if(bD && ((bB & bF.TARGET_WINDOW) != 0)){

              bM = true;
            } else if(bO && ((bB & bF.TARGET_OBJECT) != 0)){

              bM = true;
            } else if(bA && ((bB & bF.TARGET_DOCUMENT) != 0)){

              bM = true;
            };;;
            if(!bM){

              continue;
            };
          };
          bI = this.getHandler(bJ[i]);
          if(bH.IGNORE_CAN_HANDLE || bI.canHandleEvent(bE, bN)){

            bC[bK] = bI;
            return bI;
          };
        };
        return null;
      },
      __cG : function(bS, bR, bP){

        var bQ = this.findHandler(bS, bR);
        if(bQ){

          bQ.registerEvent(bS, bR, bP);
          return;
        };
        {
        };
      },
      removeListener : function(bV, cc, bX, self, bT){

        {

          var ca;
        };
        var bU = bV.$$hash || qx.core.ObjectRegistry.toHashCode(bV);
        var cd = this.__cA[bU];
        if(!cd){

          return false;
        };
        var bY = cc + (bT ? h : b);
        var bW = cd[bY];
        if(!bW){

          return false;
        };
        var cb;
        for(var i = 0,l = bW.length;i < l;i++){

          cb = bW[i];
          if(cb.handler === bX && cb.context === self){

            qx.lang.Array.removeAt(bW, i);
            if(bW.length == 0){

              this.__cH(bV, cc, bT);
            };
            return true;
          };
        };
        return false;
      },
      removeListenerById : function(cg, co){

        {

          var ck;
        };
        var ci = co.split(f);
        var cn = ci[0];
        var ce = ci[1].charCodeAt(0) == 99;
        var cm = ci[2];
        var cf = cg.$$hash || qx.core.ObjectRegistry.toHashCode(cg);
        var cp = this.__cA[cf];
        if(!cp){

          return false;
        };
        var cj = cn + (ce ? h : b);
        var ch = cp[cj];
        if(!ch){

          return false;
        };
        var cl;
        for(var i = 0,l = ch.length;i < l;i++){

          cl = ch[i];
          if(cl.unique === cm){

            qx.lang.Array.removeAt(ch, i);
            if(ch.length == 0){

              this.__cH(cg, cn, ce);
            };
            return true;
          };
        };
        return false;
      },
      removeAllListeners : function(cr){

        var ct = cr.$$hash || qx.core.ObjectRegistry.toHashCode(cr);
        var cw = this.__cA[ct];
        if(!cw){

          return false;
        };
        var cs,cv,cq;
        for(var cu in cw){

          if(cw[cu].length > 0){

            cs = cu.split(f);
            cv = cs[0];
            cq = cs[1] === p;
            this.__cH(cr, cv, cq);
          };
        };
        delete this.__cA[ct];
        return true;
      },
      deleteAllListeners : function(cx){

        delete this.__cA[cx];
      },
      __cH : function(cB, cA, cy){

        var cz = this.findHandler(cB, cA);
        if(cz){

          cz.unregisterEvent(cB, cA, cy);
          return;
        };
        {
        };
      },
      dispatchEvent : function(cD, event){

        {

          var cH;
        };
        var cI = event.getType();
        if(!event.getBubbles() && !this.hasListener(cD, cI)){

          qx.event.Pool.getInstance().poolObject(event);
          return true;
        };
        if(!event.getTarget()){

          event.setTarget(cD);
        };
        var cG = this.__cz.getDispatchers();
        var cF;
        var cC = false;
        for(var i = 0,l = cG.length;i < l;i++){

          cF = this.getDispatcher(cG[i]);
          if(cF.canDispatchEvent(cD, event, cI)){

            cF.dispatchEvent(cD, event, cI);
            cC = true;
            break;
          };
        };
        if(!cC){

          {
          };
          return true;
        };
        var cE = event.getDefaultPrevented();
        qx.event.Pool.getInstance().poolObject(event);
        return !cE;
      },
      dispose : function(){

        this.__cz.removeManager(this);
        qx.util.DisposeUtil.disposeMap(this, k);
        qx.util.DisposeUtil.disposeMap(this, q);
        this.__cA = this.__cx = this.__cF = null;
        this.__cz = this.__cD = null;
      }
    }
  });
})();
(function(){

  var a = " is a singleton! Please use disposeSingleton instead.",b = "undefined",c = "qx.util.DisposeUtil",d = " of object: ",e = "!",f = " has non disposable entries: ",g = "The map field: ",h = "The array field: ",j = "The object stored in key ",k = "Has no disposable object under key: ";
  qx.Class.define(c, {
    statics : {
      disposeObjects : function(n, m, o){

        var name;
        for(var i = 0,l = m.length;i < l;i++){

          name = m[i];
          if(n[name] == null || !n.hasOwnProperty(name)){

            continue;
          };
          if(!qx.core.ObjectRegistry.inShutDown){

            if(n[name].dispose){

              if(!o && n[name].constructor.$$instance){

                throw new Error(j + name + a);
              } else {

                n[name].dispose();
              };
            } else {

              throw new Error(k + name + e);
            };
          };
          n[name] = null;
        };
      },
      disposeArray : function(q, p){

        var r = q[p];
        if(!r){

          return;
        };
        if(qx.core.ObjectRegistry.inShutDown){

          q[p] = null;
          return;
        };
        try{

          var s;
          for(var i = r.length - 1;i >= 0;i--){

            s = r[i];
            if(s){

              s.dispose();
            };
          };
        } catch(t) {

          throw new Error(h + p + d + q + f + t);
        };
        r.length = 0;
        q[p] = null;
      },
      disposeMap : function(v, u){

        var w = v[u];
        if(!w){

          return;
        };
        if(qx.core.ObjectRegistry.inShutDown){

          v[u] = null;
          return;
        };
        try{

          var y;
          for(var x in w){

            y = w[x];
            if(w.hasOwnProperty(x) && y){

              y.dispose();
            };
          };
        } catch(z) {

          throw new Error(g + u + d + v + f + z);
        };
        v[u] = null;
      },
      disposeTriggeredBy : function(A, C){

        var B = C.dispose;
        C.dispose = function(){

          B.call(C);
          A.dispose();
        };
      },
      destroyContainer : function(E){

        {
        };
        var D = [];
        this._collectContainerChildren(E, D);
        var F = D.length;
        for(var i = F - 1;i >= 0;i--){

          D[i].destroy();
        };
        E.destroy();
      },
      _collectContainerChildren : function(I, H){

        var J = I.getChildren();
        for(var i = 0;i < J.length;i++){

          var G = J[i];
          H.push(G);
          if(this.__cI(G)){

            this._collectContainerChildren(G, H);
          };
        };
      },
      __cI : function(L){

        var K = [qx.ui.container.Composite, qx.ui.container.Scroll, qx.ui.container.SlideBar, qx.ui.container.Stack];
        for(var i = 0,l = K.length;i < l;i++){

          if(typeof K[i] !== b && qx.Class.isSubClassOf(L.constructor, K[i])){

            return true;
          };
        };
        return false;
      }
    }
  });
})();
(function(){

  var b = "qx.dom.Node",c = "";
  qx.Bootstrap.define(b, {
    statics : {
      ELEMENT : 1,
      ATTRIBUTE : 2,
      TEXT : 3,
      CDATA_SECTION : 4,
      ENTITY_REFERENCE : 5,
      ENTITY : 6,
      PROCESSING_INSTRUCTION : 7,
      COMMENT : 8,
      DOCUMENT : 9,
      DOCUMENT_TYPE : 10,
      DOCUMENT_FRAGMENT : 11,
      NOTATION : 12,
      getDocument : function(d){

        return d.nodeType === this.DOCUMENT ? d : d.ownerDocument || d.document;
      },
      getWindow : function(e){

        if(e.nodeType == null){

          return e;
        };
        if(e.nodeType !== this.DOCUMENT){

          e = e.ownerDocument;
        };
        return e.defaultView || e.parentWindow;
      },
      getDocumentElement : function(f){

        return this.getDocument(f).documentElement;
      },
      getBodyElement : function(g){

        return this.getDocument(g).body;
      },
      isNode : function(h){

        return !!(h && h.nodeType != null);
      },
      isElement : function(j){

        return !!(j && j.nodeType === this.ELEMENT);
      },
      isDocument : function(k){

        return !!(k && k.nodeType === this.DOCUMENT);
      },
      isText : function(l){

        return !!(l && l.nodeType === this.TEXT);
      },
      isWindow : function(m){

        return !!(m && m.history && m.location && m.document);
      },
      isNodeName : function(n, o){

        if(!o || !n || !n.nodeName){

          return false;
        };
        return o.toLowerCase() == qx.dom.Node.getName(n);
      },
      getName : function(p){

        if(!p || !p.nodeName){

          return null;
        };
        return p.nodeName.toLowerCase();
      },
      getText : function(q){

        if(!q || !q.nodeType){

          return null;
        };
        switch(q.nodeType){case 1:
        var i,a = [],r = q.childNodes,length = r.length;
        for(i = 0;i < length;i++){

          a[i] = this.getText(r[i]);
        };
        return a.join(c);case 2:case 3:case 4:
        return q.nodeValue;};
        return null;
      },
      isBlockNode : function(s){

        if(!qx.dom.Node.isElement(s)){

          return false;
        };
        s = qx.dom.Node.getName(s);
        return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(s);
      }
    }
  });
})();
(function(){

  var c = "qx.event.Registration";
  qx.Class.define(c, {
    statics : {
      __cJ : {
      },
      getManager : function(f){

        if(f == null){

          {
          };
          f = window;
        } else if(f.nodeType){

          f = qx.dom.Node.getWindow(f);
        } else if(!qx.dom.Node.isWindow(f)){

          f = window;
        };;
        var e = f.$$hash || qx.core.ObjectRegistry.toHashCode(f);
        var d = this.__cJ[e];
        if(!d){

          d = new qx.event.Manager(f, this);
          this.__cJ[e] = d;
        };
        return d;
      },
      removeManager : function(g){

        var h = g.getWindowId();
        delete this.__cJ[h];
      },
      addListener : function(l, k, i, self, j){

        return this.getManager(l).addListener(l, k, i, self, j);
      },
      removeListener : function(p, o, m, self, n){

        return this.getManager(p).removeListener(p, o, m, self, n);
      },
      removeListenerById : function(q, r){

        return this.getManager(q).removeListenerById(q, r);
      },
      removeAllListeners : function(s){

        return this.getManager(s).removeAllListeners(s);
      },
      deleteAllListeners : function(u){

        var t = u.$$hash;
        if(t){

          this.getManager(u).deleteAllListeners(t);
        };
      },
      hasListener : function(x, w, v){

        return this.getManager(x).hasListener(x, w, v);
      },
      serializeListeners : function(y){

        return this.getManager(y).serializeListeners(y);
      },
      createEvent : function(B, C, A){

        {
        };
        if(C == null){

          C = qx.event.type.Event;
        };
        var z = qx.event.Pool.getInstance().getObject(C);
        A ? z.init.apply(z, A) : z.init();
        if(B){

          z.setType(B);
        };
        return z;
      },
      dispatchEvent : function(D, event){

        return this.getManager(D).dispatchEvent(D, event);
      },
      fireEvent : function(E, F, H, G){

        {

          var I;
        };
        var J = this.createEvent(F, H || null, G);
        return this.getManager(E).dispatchEvent(E, J);
      },
      fireNonBubblingEvent : function(K, P, N, M){

        {
        };
        var O = this.getManager(K);
        if(!O.hasListener(K, P, false)){

          return true;
        };
        var L = this.createEvent(P, N || null, M);
        return O.dispatchEvent(K, L);
      },
      PRIORITY_FIRST : -32000,
      PRIORITY_NORMAL : 0,
      PRIORITY_LAST : 32000,
      __cB : [],
      addHandler : function(Q){

        {
        };
        this.__cB.push(Q);
        this.__cB.sort(function(a, b){

          return a.PRIORITY - b.PRIORITY;
        });
      },
      getHandlers : function(){

        return this.__cB;
      },
      __cC : [],
      addDispatcher : function(S, R){

        {
        };
        this.__cC.push(S);
        this.__cC.sort(function(a, b){

          return a.PRIORITY - b.PRIORITY;
        });
      },
      getDispatchers : function(){

        return this.__cC;
      }
    }
  });
})();
(function(){

  var a = "qx.core.MEvent";
  qx.Mixin.define(a, {
    members : {
      __cK : qx.event.Registration,
      addListener : function(d, b, self, c){

        if(!this.$$disposed){

          return this.__cK.addListener(this, d, b, self, c);
        };
        return null;
      },
      addListenerOnce : function(h, f, self, g){

        var i = function(e){

          this.removeListener(h, f, this, g);
          f.call(self || this, e);
        };
        f.$$wrapped_callback = i;
        return this.addListener(h, i, this, g);
      },
      removeListener : function(l, j, self, k){

        if(!this.$$disposed){

          if(j.$$wrapped_callback){

            var m = j.$$wrapped_callback;
            delete j.$$wrapped_callback;
            j = m;
          };
          return this.__cK.removeListener(this, l, j, self, k);
        };
        return false;
      },
      removeListenerById : function(n){

        if(!this.$$disposed){

          return this.__cK.removeListenerById(this, n);
        };
        return false;
      },
      hasListener : function(p, o){

        return this.__cK.hasListener(this, p, o);
      },
      dispatchEvent : function(q){

        if(!this.$$disposed){

          return this.__cK.dispatchEvent(this, q);
        };
        return true;
      },
      fireEvent : function(s, t, r){

        if(!this.$$disposed){

          return this.__cK.fireEvent(this, s, t, r);
        };
        return true;
      },
      fireNonBubblingEvent : function(v, w, u){

        if(!this.$$disposed){

          return this.__cK.fireNonBubblingEvent(this, v, w, u);
        };
        return true;
      },
      fireDataEvent : function(z, A, x, y){

        if(!this.$$disposed){

          if(x === undefined){

            x = null;
          };
          return this.__cK.fireNonBubblingEvent(this, z, qx.event.type.Data, [A, x, !!y]);
        };
        return true;
      }
    }
  });
})();
(function(){

  var a = "qx.core.MAssert";
  qx.Mixin.define(a, {
    members : {
      assert : function(c, b){

        qx.core.Assert.assert(c, b);
      },
      fail : function(d, e){

        qx.core.Assert.fail(d, e);
      },
      assertTrue : function(g, f){

        qx.core.Assert.assertTrue(g, f);
      },
      assertFalse : function(i, h){

        qx.core.Assert.assertFalse(i, h);
      },
      assertEquals : function(j, k, l){

        qx.core.Assert.assertEquals(j, k, l);
      },
      assertNotEquals : function(m, n, o){

        qx.core.Assert.assertNotEquals(m, n, o);
      },
      assertIdentical : function(p, q, r){

        qx.core.Assert.assertIdentical(p, q, r);
      },
      assertNotIdentical : function(s, t, u){

        qx.core.Assert.assertNotIdentical(s, t, u);
      },
      assertNotUndefined : function(w, v){

        qx.core.Assert.assertNotUndefined(w, v);
      },
      assertUndefined : function(y, x){

        qx.core.Assert.assertUndefined(y, x);
      },
      assertNotNull : function(A, z){

        qx.core.Assert.assertNotNull(A, z);
      },
      assertNull : function(C, B){

        qx.core.Assert.assertNull(C, B);
      },
      assertJsonEquals : function(D, E, F){

        qx.core.Assert.assertJsonEquals(D, E, F);
      },
      assertMatch : function(I, H, G){

        qx.core.Assert.assertMatch(I, H, G);
      },
      assertArgumentsCount : function(L, K, M, J){

        qx.core.Assert.assertArgumentsCount(L, K, M, J);
      },
      assertEventFired : function(P, event, Q, N, O){

        qx.core.Assert.assertEventFired(P, event, Q, N, O);
      },
      assertEventNotFired : function(T, event, R, S){

        qx.core.Assert.assertEventNotFired(T, event, R, S);
      },
      assertException : function(V, W, X, U){

        qx.core.Assert.assertException(V, W, X, U);
      },
      assertInArray : function(bb, ba, Y){

        qx.core.Assert.assertInArray(bb, ba, Y);
      },
      assertArrayEquals : function(bc, bd, be){

        qx.core.Assert.assertArrayEquals(bc, bd, be);
      },
      assertKeyInMap : function(bh, bg, bf){

        qx.core.Assert.assertKeyInMap(bh, bg, bf);
      },
      assertFunction : function(bj, bi){

        qx.core.Assert.assertFunction(bj, bi);
      },
      assertString : function(bl, bk){

        qx.core.Assert.assertString(bl, bk);
      },
      assertBoolean : function(bn, bm){

        qx.core.Assert.assertBoolean(bn, bm);
      },
      assertNumber : function(bp, bo){

        qx.core.Assert.assertNumber(bp, bo);
      },
      assertPositiveNumber : function(br, bq){

        qx.core.Assert.assertPositiveNumber(br, bq);
      },
      assertInteger : function(bt, bs){

        qx.core.Assert.assertInteger(bt, bs);
      },
      assertPositiveInteger : function(bv, bu){

        qx.core.Assert.assertPositiveInteger(bv, bu);
      },
      assertInRange : function(by, bz, bx, bw){

        qx.core.Assert.assertInRange(by, bz, bx, bw);
      },
      assertObject : function(bB, bA){

        qx.core.Assert.assertObject(bB, bA);
      },
      assertArray : function(bD, bC){

        qx.core.Assert.assertArray(bD, bC);
      },
      assertMap : function(bF, bE){

        qx.core.Assert.assertMap(bF, bE);
      },
      assertRegExp : function(bH, bG){

        qx.core.Assert.assertRegExp(bH, bG);
      },
      assertType : function(bK, bJ, bI){

        qx.core.Assert.assertType(bK, bJ, bI);
      },
      assertInstance : function(bM, bN, bL){

        qx.core.Assert.assertInstance(bM, bN, bL);
      },
      assertInterface : function(bQ, bP, bO){

        qx.core.Assert.assertInterface(bQ, bP, bO);
      },
      assertCssColor : function(bR, bT, bS){

        qx.core.Assert.assertCssColor(bR, bT, bS);
      },
      assertElement : function(bV, bU){

        qx.core.Assert.assertElement(bV, bU);
      },
      assertQxObject : function(bX, bW){

        qx.core.Assert.assertQxObject(bX, bW);
      },
      assertQxWidget : function(ca, bY){

        qx.core.Assert.assertQxWidget(ca, bY);
      }
    }
  });
})();
(function(){

  var a = "module.events",b = "Cloning only possible with properties.",c = "qx.core.Object",d = "module.property",e = "]",f = "[",g = "Object";
  qx.Class.define(c, {
    extend : Object,
    include : qx.core.Environment.filter({
      "module.databinding" : qx.data.MBinding,
      "module.logger" : qx.core.MLogging,
      "module.events" : qx.core.MEvent,
      "module.property" : qx.core.MProperty
    }),
    construct : function(){

      qx.core.ObjectRegistry.register(this);
    },
    statics : {
      $$type : g
    },
    members : {
      __M : qx.core.Environment.get(d) ? qx.core.Property : null,
      toHashCode : function(){

        return this.$$hash;
      },
      toString : function(){

        return this.classname + f + this.$$hash + e;
      },
      base : function(h, j){

        {
        };
        if(arguments.length === 1){

          return h.callee.base.call(this);
        } else {

          return h.callee.base.apply(this, Array.prototype.slice.call(arguments, 1));
        };
      },
      self : function(k){

        return k.callee.self;
      },
      clone : function(){

        if(!qx.core.Environment.get(d)){

          throw new Error(b);
        };
        var n = this.constructor;
        var m = new n;
        var p = qx.Class.getProperties(n);
        var o = this.__M.$$store.user;
        var q = this.__M.$$method.set;
        var name;
        for(var i = 0,l = p.length;i < l;i++){

          name = p[i];
          if(this.hasOwnProperty(o[name])){

            m[q[name]](this[o[name]]);
          };
        };
        return m;
      },
      __cL : null,
      setUserData : function(r, s){

        if(!this.__cL){

          this.__cL = {
          };
        };
        this.__cL[r] = s;
      },
      getUserData : function(u){

        if(!this.__cL){

          return null;
        };
        var t = this.__cL[u];
        return t === undefined ? null : t;
      },
      isDisposed : function(){

        return this.$$disposed || false;
      },
      dispose : function(){

        if(this.$$disposed){

          return;
        };
        this.$$disposed = true;
        this.$$instance = null;
        this.$$allowconstruct = null;
        {
        };
        var x = this.constructor;
        var v;
        while(x.superclass){

          if(x.$$destructor){

            x.$$destructor.call(this);
          };
          if(x.$$includes){

            v = x.$$flatIncludes;
            for(var i = 0,l = v.length;i < l;i++){

              if(v[i].$$destructor){

                v[i].$$destructor.call(this);
              };
            };
          };
          x = x.superclass;
        };
        {

          var y,w;
        };
      },
      _disposeObjects : function(z){

        qx.util.DisposeUtil.disposeObjects(this, arguments);
      },
      _disposeSingletonObjects : function(A){

        qx.util.DisposeUtil.disposeObjects(this, arguments, true);
      },
      _disposeArray : function(B){

        qx.util.DisposeUtil.disposeArray(this, B);
      },
      _disposeMap : function(C){

        qx.util.DisposeUtil.disposeMap(this, C);
      }
    },
    environment : {
      "qx.debug.dispose.level" : 0
    },
    destruct : function(){

      if(qx.core.Environment.get(a)){

        if(!qx.core.ObjectRegistry.inShutDown){

          qx.event.Registration.removeAllListeners(this);
        } else {

          qx.event.Registration.deleteAllListeners(this);
        };
      };
      qx.core.ObjectRegistry.unregister(this);
      this.__cL = null;
      if(qx.core.Environment.get(d)){

        var F = this.constructor;
        var J;
        var K = this.__M.$$store;
        var H = K.user;
        var I = K.theme;
        var D = K.inherit;
        var G = K.useinit;
        var E = K.init;
        while(F){

          J = F.$$properties;
          if(J){

            for(var name in J){

              if(J[name].dereference){

                this[H[name]] = this[I[name]] = this[D[name]] = this[G[name]] = this[E[name]] = undefined;
              };
            };
          };
          F = F.superclass;
        };
      };
    }
  });
})();
(function(){

  var a = "qx.event.type.Event";
  qx.Class.define(a, {
    extend : qx.core.Object,
    statics : {
      CAPTURING_PHASE : 1,
      AT_TARGET : 2,
      BUBBLING_PHASE : 3
    },
    members : {
      init : function(c, b){

        {
        };
        this._type = null;
        this._target = null;
        this._currentTarget = null;
        this._relatedTarget = null;
        this._originalTarget = null;
        this._stopPropagation = false;
        this._preventDefault = false;
        this._bubbles = !!c;
        this._cancelable = !!b;
        this._timeStamp = (new Date()).getTime();
        this._eventPhase = null;
        return this;
      },
      clone : function(d){

        if(d){

          var e = d;
        } else {

          var e = qx.event.Pool.getInstance().getObject(this.constructor);
        };
        e._type = this._type;
        e._target = this._target;
        e._currentTarget = this._currentTarget;
        e._relatedTarget = this._relatedTarget;
        e._originalTarget = this._originalTarget;
        e._stopPropagation = this._stopPropagation;
        e._bubbles = this._bubbles;
        e._preventDefault = this._preventDefault;
        e._cancelable = this._cancelable;
        return e;
      },
      stop : function(){

        if(this._bubbles){

          this.stopPropagation();
        };
        if(this._cancelable){

          this.preventDefault();
        };
      },
      stopPropagation : function(){

        {
        };
        this._stopPropagation = true;
      },
      getPropagationStopped : function(){

        return !!this._stopPropagation;
      },
      preventDefault : function(){

        {
        };
        this._preventDefault = true;
      },
      getDefaultPrevented : function(){

        return !!this._preventDefault;
      },
      getType : function(){

        return this._type;
      },
      setType : function(f){

        this._type = f;
      },
      getEventPhase : function(){

        return this._eventPhase;
      },
      setEventPhase : function(g){

        this._eventPhase = g;
      },
      getTimeStamp : function(){

        return this._timeStamp;
      },
      getTarget : function(){

        return this._target;
      },
      setTarget : function(h){

        this._target = h;
      },
      getCurrentTarget : function(){

        return this._currentTarget || this._target;
      },
      setCurrentTarget : function(i){

        this._currentTarget = i;
      },
      getRelatedTarget : function(){

        return this._relatedTarget;
      },
      setRelatedTarget : function(j){

        this._relatedTarget = j;
      },
      getOriginalTarget : function(){

        return this._originalTarget;
      },
      setOriginalTarget : function(k){

        this._originalTarget = k;
      },
      getBubbles : function(){

        return this._bubbles;
      },
      setBubbles : function(l){

        this._bubbles = l;
      },
      isCancelable : function(){

        return this._cancelable;
      },
      setCancelable : function(m){

        this._cancelable = m;
      }
    },
    destruct : function(){

      this._target = this._currentTarget = this._relatedTarget = this._originalTarget = null;
    }
  });
})();
(function(){

  var a = "qx.util.ObjectPool",b = "Class needs to be defined!",c = "Object is already pooled: ",d = "Integer";
  qx.Class.define(a, {
    extend : qx.core.Object,
    construct : function(e){

      qx.core.Object.call(this);
      this.__cM = {
      };
      if(e != null){

        this.setSize(e);
      };
    },
    properties : {
      size : {
        check : d,
        init : Infinity
      }
    },
    members : {
      __cM : null,
      getObject : function(h){

        if(this.$$disposed){

          return new h;
        };
        if(!h){

          throw new Error(b);
        };
        var f = null;
        var g = this.__cM[h.classname];
        if(g){

          f = g.pop();
        };
        if(f){

          f.$$pooled = false;
        } else {

          f = new h;
        };
        return f;
      },
      poolObject : function(k){

        if(!this.__cM){

          return;
        };
        var j = k.classname;
        var m = this.__cM[j];
        if(k.$$pooled){

          throw new Error(c + k);
        };
        if(!m){

          this.__cM[j] = m = [];
        };
        if(m.length > this.getSize()){

          if(k.destroy){

            k.destroy();
          } else {

            k.dispose();
          };
          return;
        };
        k.$$pooled = true;
        m.push(k);
      }
    },
    destruct : function(){

      var p = this.__cM;
      var n,o,i,l;
      for(n in p){

        o = p[n];
        for(i = 0,l = o.length;i < l;i++){

          o[i].dispose();
        };
      };
      delete this.__cM;
    }
  });
})();
(function(){

  var a = "singleton",b = "qx.event.Pool";
  qx.Class.define(b, {
    extend : qx.util.ObjectPool,
    type : a,
    construct : function(){

      qx.util.ObjectPool.call(this, 30);
    }
  });
})();
(function(){

  var a = "qx.event.type.Data";
  qx.Class.define(a, {
    extend : qx.event.type.Event,
    members : {
      __cN : null,
      __cO : null,
      init : function(c, d, b){

        qx.event.type.Event.prototype.init.call(this, false, b);
        this.__cN = c;
        this.__cO = d;
        return this;
      },
      clone : function(e){

        var f = qx.event.type.Event.prototype.clone.call(this, e);
        f.__cN = this.__cN;
        f.__cO = this.__cO;
        return f;
      },
      getData : function(){

        return this.__cN;
      },
      getOldData : function(){

        return this.__cO;
      }
    },
    destruct : function(){

      this.__cN = this.__cO = null;
    }
  });
})();
(function(){

  var a = "qx.event.IEventHandler";
  qx.Interface.define(a, {
    statics : {
      TARGET_DOMNODE : 1,
      TARGET_WINDOW : 2,
      TARGET_OBJECT : 4,
      TARGET_DOCUMENT : 8
    },
    members : {
      canHandleEvent : function(c, b){
      },
      registerEvent : function(f, e, d){
      },
      unregisterEvent : function(i, h, g){
      }
    }
  });
})();
(function(){

  var a = "qx.event.handler.Object";
  qx.Class.define(a, {
    extend : qx.core.Object,
    implement : qx.event.IEventHandler,
    statics : {
      PRIORITY : qx.event.Registration.PRIORITY_LAST,
      SUPPORTED_TYPES : null,
      TARGET_CHECK : qx.event.IEventHandler.TARGET_OBJECT,
      IGNORE_CAN_HANDLE : false
    },
    members : {
      canHandleEvent : function(c, b){

        return qx.Class.supportsEvent(c.constructor, b);
      },
      registerEvent : function(f, e, d){
      },
      unregisterEvent : function(i, h, g){
      }
    },
    defer : function(j){

      qx.event.Registration.addHandler(j);
    }
  });
})();
(function(){

  var a = "qx.event.IEventDispatcher";
  qx.Interface.define(a, {
    members : {
      canDispatchEvent : function(c, event, b){

        this.assertInstance(event, qx.event.type.Event);
        this.assertString(b);
      },
      dispatchEvent : function(e, event, d){

        this.assertInstance(event, qx.event.type.Event);
        this.assertString(d);
      }
    }
  });
})();
(function(){

  var a = "qx.event.dispatch.Direct";
  qx.Class.define(a, {
    extend : qx.core.Object,
    implement : qx.event.IEventDispatcher,
    construct : function(b){

      this._manager = b;
    },
    statics : {
      PRIORITY : qx.event.Registration.PRIORITY_LAST
    },
    members : {
      canDispatchEvent : function(d, event, c){

        return !event.getBubbles();
      },
      dispatchEvent : function(e, event, k){

        {

          var j,f;
        };
        event.setEventPhase(qx.event.type.Event.AT_TARGET);
        var g = this._manager.getListeners(e, k, false);
        if(g){

          for(var i = 0,l = g.length;i < l;i++){

            var h = g[i].context || e;
            {
            };
            g[i].handler.call(h, event);
          };
        };
      }
    },
    defer : function(m){

      qx.event.Registration.addDispatcher(m);
    }
  });
})();
(function(){

  var a = "unit/update_sensor",b = "resource/update_poi",c = "unitSensors",d = "adminField",e = "resource/update_drivers_group",f = "wialon events error: ",g = "render",h = "u",j = "item/delete_item",k = "singleton",l = "resourcePois",m = "aflds",n = "item/update_admin_field",o = "&svc=file/get&params=",p = "serverUpdated",q = "core/check_items_billing",r = "resource/get_job_data",s = "qx.event.type.Event",t = "//",u = "resource/get_poi_data",v = "routeRounds",w = "report/get_report_data",x = "file/list",y = "//geocode-maps.wialon.com/",z = "report",A = "unitFuelSettings",B = "route/get_round_data",C = "flds",D = "userNotification",E = "si",F = "core/get_hw_types",G = "core/search_item",H = "=",I = "core/create_resource",J = "core/create_user",K = "firmware",L = "customField",M = "core/create_unit",N = "; ",O = "*.png",P = "usnf",Q = "unitCommandDefinitions",R = "userNotifications",S = "itemAdminFields",T = "routeSchedules",U = "core/login",V = "route/update_round",W = "geocode",X = "core/create_auth_hash",Y = "poi",cV = "core/update_data_flags",cW = "serviceInterval",cX = "core/create_retranslator",cR = "resourceReports",cS = "core/reset_password_perform",cT = "core/create_route",cU = "unitReportSettings",dd = "sensor",de = "qx.event.type.Data",df = "search",dg = "//search-maps.wialon.com/",cY = "resource/update_zone",da = "/avl_evts",db = "zone",dc = "round",dk = "rr",dM = "core/create_unit_group",eJ = "unf",dl = "core/get_account_data",dh = "//render-maps.wialon.com/",di = "fileUploaded",eF = "resourceDrivers",dj = "commandDefinition",dm = "library/",dn = "unitServiceIntervals",dp = "report/update_report",du = "resource/update_job",dv = "rs",dw = "zl",dq = "en",dr = "unitEventRegistrar",ds = 'undefined',dt = "user/update_user_notification",dA = "d",dB = "trlrs",dC = "user/send_sms",dD = "core/get_hw_cmds",dx = "route/update_schedule",dy = "lang",eG = "m",dz = "resource/update_trailers_group",dH = "report/get_report_tables",dI = "resourceAccounts",eI = "trailer",dJ = "notification",dE = "unit/update_command_definition",dF = "itemIcon",eH = "schedule",dG = "__db",dK = "drvrs",dL = "driver",dX = "core/search_items",dW = "core/duplicate",dV = "trlrsgr",ec = "user/send_push_message",eb = "trailersGroup",ea = "object",dY = "itemCustomFields",dQ = "resource/update_notification",dP = "wialon.core.Session",dO = "featuresUpdated",dN = "item/update_custom_field",dU = "unit/update_service_interval",dT = "invalidSession",dS = "drvrsgr",dR = "resourceJobs",ej = "core/use_auth_hash",ei = "resourceTrailers",eh = "__dc",eg = "resourceTrailerGroups",en = "core/logout",em = "driversGroup",el = "resourceNotifications",ek = "__cU",ef = "job",ee = "resource/update_trailer",ed = "core/reset_password_request",ey = "resource/get_notification_data",ex = "ujb",ew = "unitMessagesFilter",eC = "cml",eB = "unitTripDetector",eA = "",ez = "__cX",er = "resource/get_zone_data",eq = "resourceZones",ep = "rep",eo = "sens",ev = "itemDeleted",eu = "/wialon/ajax.html?sid=",et = "resource/update_driver",es = "resourceDriverGroups",eE = "file/read",eD = "undefined";
  qx.Class.define(dP, {
    extend : qx.core.Object,
    type : k,
    construct : function(){

      qx.core.Object.call(this);
      this.__cP = {
      };
      this.__cQ = {
      };
      this._libraries = {
      };
    },
    members : {
      __cR : 0,
      __cS : eA,
      __cT : 0,
      __cU : null,
      __cV : 0,
      __cW : null,
      __cX : null,
      __cY : null,
      __cP : null,
      __cQ : null,
      _libraries : null,
      __da : eA,
      __db : null,
      __dc : null,
      __dd : eA,
      __de : false,
      __df : eA,
      __dg : eA,
      __dh : eA,
      __di : [],
      __vV : null,
      __vW : eA,
      initSession : function(eM, eL, eK, eP, eN){

        if(this.__cR)return false;
        wialon.item.Item.registerProperties();
        wialon.item.User.registerProperties();
        wialon.item.Unit.registerProperties();
        wialon.item.Resource.registerProperties();
        wialon.item.UnitGroup.registerProperties();
        wialon.item.Retranslator.registerProperties();
        wialon.item.Route.registerProperties();
        this.__dd = eM;
        if(typeof eL != eD)this.__df = eL;
        if(typeof eK != eD && !isNaN(parseInt(eK))){

          var eO = parseInt(eK);
          if(eO & 0x800)this.__de = true;
        };
        if(typeof eP != eD)this.__dh = eP;
        this.__db = new wialon.render.Renderer;
        this.__dc = new wialon.core.MessagesLoader;
        this.__cR = 1;
        if(eN)this.__vW = eN;
        return true;
      },
      isInitialized : function(){

        return this.__cR;
      },
      getVersion : function(){

        return this.__vW;
      },
      getAuthUser : function(){

        return this.__da;
      },
      login : function(eT, eR, eS, eQ){

        eQ = wialon.util.Helper.wrapCallback(eQ);
        if(this.__cU || !this.__cR){

          eQ(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(U, {
          user : eT,
          password : eR,
          operateAs : eS,
          loginHash : this.__dg,
          appName : this.__df,
          checkService : this.__dh
        }, qx.lang.Function.bind(this.__dp, this, eQ));
      },
      loginAuthHash : function(eV, eU){

        eU = wialon.util.Helper.wrapCallback(eU);
        if(this.__cU || !this.__cR){

          eU(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(ej, {
          authHash : eV
        }, qx.lang.Function.bind(this.__dp, this, eU));
      },
      duplicate : function(eY, fa, eW, eX){

        eX = wialon.util.Helper.wrapCallback(eX);
        if(this.__cU || !this.__cR){

          eX(2);
          return;
        };
        this.__cS = eY;
        return wialon.core.Remote.getInstance().remoteCall(dW, {
          operateAs : fa,
          continueCurrentSession : eW
        }, qx.lang.Function.bind(this.__dp, this, eX));
      },
      logout : function(fb){

        fb = wialon.util.Helper.wrapCallback(fb);
        if(!this.__cU){

          fb(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(en, null, qx.lang.Function.bind(function(fc, fd){

          if(fc){

            fb(fc);
            return;
          };
          this.__dl();
          fb(0);
        }, this));
      },
      createAuthHash : function(fe){

        fe = wialon.util.Helper.wrapCallback(fe);
        if(!this.__cU){

          fe(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(X, {
        }, fe);
      },
      updateDataFlags : function(fg, ff){

        ff = wialon.util.Helper.wrapCallback(ff);
        if(!this.__cU || typeof fg != ea){

          ff(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(cV, {
          spec : fg
        }, qx.lang.Function.bind(this.__dq, this, ff));
      },
      searchItems : function(fl, fk, fh, fj, fi, fm, fn){

        fm = wialon.util.Helper.wrapCallback(fm);
        if(!this.__cU || typeof fl != ea){

          fm(2, null);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(dX, {
          spec : fl,
          force : fk ? 1 : 0,
          flags : fh,
          from : fj,
          to : fi
        }, qx.lang.Function.bind(this.__dr, this, fm), fn);
      },
      searchItem : function(fq, fo, fp){

        fp = wialon.util.Helper.wrapCallback(fp);
        if(!this.__cU){

          fp(2, null);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(G, {
          id : fq,
          flags : fo
        }, qx.lang.Function.bind(this.__ds, this, fp));
      },
      loadLibrary : function(fr){

        if(typeof this._libraries[fr] != eD)return true;
        if(fr == R)wialon.item.PluginsManager.bindPropItem(wialon.item.User, P, D, dt); else if(fr == dY)wialon.item.PluginsManager.bindPropItem(wialon.item.Item, C, L, dN); else if(fr == S)wialon.item.PluginsManager.bindPropItem(wialon.item.Item, m, d, n); else if(fr == dF){

          qx.Class.include(wialon.item.Unit, wialon.item.MIcon);
          qx.Class.include(wialon.item.UnitGroup, wialon.item.MIcon);
        } else if(fr == Q)wialon.item.PluginsManager.bindPropItem(wialon.item.Unit, eC, dj, dE); else if(fr == c){

          wialon.item.PluginsManager.bindPropItem(wialon.item.Unit, eo, dd, a);
          qx.Class.include(wialon.item.Unit, wialon.item.MUnitSensor);
        } else if(fr == dn)wialon.item.PluginsManager.bindPropItem(wialon.item.Unit, E, cW, dU); else if(fr == eB)qx.Class.include(wialon.item.Unit, wialon.item.MUnitTripDetector); else if(fr == ew)qx.Class.include(wialon.item.Unit, wialon.item.MUnitMessagesFilter); else if(fr == dr)qx.Class.include(wialon.item.Unit, wialon.item.MUnitEventRegistrar); else if(fr == cU)qx.Class.include(wialon.item.Unit, wialon.item.MUnitReportSettings); else if(fr == A)qx.Class.include(wialon.item.Unit, wialon.item.MUnitFuelSettings); else if(fr == el)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, eJ, dJ, dQ, ey); else if(fr == dR)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, ex, ef, du, r); else if(fr == eq){

          qx.Class.include(wialon.item.Resource, wialon.item.MZone);
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, dw, db, cY, er);
        } else if(fr == l){

          qx.Class.include(wialon.item.Resource, wialon.item.MPoi);
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, Y, Y, b, u);
        } else if(fr == eF){

          qx.Class.include(wialon.item.Resource, wialon.item.MDriver);
          wialon.item.MDriver.registerDriverProperties();
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, dK, dL, et);
        } else if(fr == es){

          qx.Class.include(wialon.item.Resource, wialon.item.MDriver);
          wialon.item.MDriver.registerDriverProperties();
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, dS, em, e);
        } else if(fr == ei){

          qx.Class.include(wialon.item.Resource, wialon.item.MDriver);
          wialon.item.MDriver.registerDriverProperties();
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, dB, eI, ee);
        } else if(fr == eg){

          qx.Class.include(wialon.item.Resource, wialon.item.MDriver);
          wialon.item.MDriver.registerDriverProperties();
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, dV, eb, dz);
        } else if(fr == dI)qx.Class.include(wialon.item.Resource, wialon.item.MAccount); else if(fr == cR){

          qx.Class.include(wialon.item.Resource, wialon.item.MReport);
          wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, ep, z, dp, w);
        } else if(fr == v)wialon.item.PluginsManager.bindPropItem(wialon.item.Route, dk, dc, V, B); else if(fr == T)wialon.item.PluginsManager.bindPropItem(wialon.item.Route, dv, eH, dx); else return false;;;;;;;;;;;;;;;;;;;;;;;;
        this._libraries[fr] = 1;
        return true;
      },
      getHwTypes : function(fs, ft, fu){

        if(arguments.length > 2){

          var fu = wialon.util.Helper.wrapCallback(arguments[2]);
          if(!this.__cU){

            fu(2);
            return;
          };
          return wialon.core.Remote.getInstance().remoteCall(F, {
            filterType : arguments[0],
            filterValue : arguments[1]
          }, fu);
        };
        var fu = wialon.util.Helper.wrapCallback(arguments[0]);
        if(!this.__cU){

          fu(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(F, {
        }, fu);
      },
      getHwCommands : function(fv, fw, fx){

        fx = wialon.util.Helper.wrapCallback(fx);
        if(!this.__cU){

          fx(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(dD, {
          deviceTypeId : fv,
          unitId : fw
        }, fx);
      },
      createUnit : function(fB, name, fz, fy, fA){

        fA = wialon.util.Helper.wrapCallback(fA);
        if(!this.__cU){

          fA(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(M, {
          creatorId : fB.getId(),
          name : name,
          hwTypeId : fz,
          dataFlags : fy
        }, qx.lang.Function.bind(this.__ds, this, fA));
      },
      createUser : function(fF, name, fE, fC, fD){

        fD = wialon.util.Helper.wrapCallback(fD);
        if(!this.__cU){

          fD(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(J, {
          creatorId : fF.getId(),
          name : name,
          password : fE,
          dataFlags : fC
        }, qx.lang.Function.bind(this.__ds, this, fD));
      },
      createUnitGroup : function(fI, name, fG, fH){

        fH = wialon.util.Helper.wrapCallback(fH);
        if(!this.__cU){

          fH(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(dM, {
          creatorId : fI.getId(),
          name : name,
          dataFlags : fG
        }, qx.lang.Function.bind(this.__ds, this, fH));
      },
      createRetranslator : function(fM, name, fL, fJ, fK){

        fK = wialon.util.Helper.wrapCallback(fK);
        if(!this.__cU){

          fK(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(cX, {
          creatorId : fM.getId(),
          name : name,
          config : fL,
          dataFlags : fJ
        }, qx.lang.Function.bind(this.__ds, this, fK));
      },
      createRoute : function(fP, name, fN, fO){

        fO = wialon.util.Helper.wrapCallback(fO);
        if(!this.__cU){

          fO(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(cT, {
          creatorId : fP.getId(),
          name : name,
          dataFlags : fN
        }, qx.lang.Function.bind(this.__ds, this, fO));
      },
      createResource : function(fS, name, fQ, fR){

        fR = wialon.util.Helper.wrapCallback(fR);
        if(!this.__cU){

          fR(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(I, {
          creatorId : fS.getId(),
          name : name,
          dataFlags : fQ
        }, qx.lang.Function.bind(this.__ds, this, fR));
      },
      deleteItem : function(fT, fU){

        fU = wialon.util.Helper.wrapCallback(fU);
        return wialon.core.Remote.getInstance().remoteCall(j, {
          itemId : fT.getId()
        }, qx.lang.Function.bind(this.__dt, this, fU, fT.getId()));
      },
      updateItem : function(fW, fX){

        if(!fW || !fX)return;
        for(var fV in fX){

          var fY = this.__cP[fV];
          if(typeof fY != eD)fY(fW, fX[fV]);
        };
      },
      getIconsLibrary : function(gb, ga){

        wialon.core.Remote.getInstance().remoteCall(x, {
          itemId : 0,
          storageType : 1,
          path : dm + gb,
          mask : O,
          recursive : false,
          fullPath : true
        }, wialon.util.Helper.wrapCallback(ga));
      },
      getFirmwareLibrary : function(gd, gc){

        wialon.core.Remote.getInstance().remoteCall(x, {
          itemId : 0,
          storageType : 1,
          path : K,
          mask : gd,
          recursive : true,
          fullPath : true
        }, wialon.util.Helper.wrapCallback(gc));
      },
      getLibraryFile : function(ge){

        var gf = {
          itemId : 0,
          storageType : 1,
          path : ge
        };
        return wialon.core.Session.getInstance().getBaseUrl() + eu + wialon.core.Session.getInstance().getId() + o + wialon.util.Json.stringify(gf);
      },
      readLibraryFile : function(gg, gh){

        wialon.core.Remote.getInstance().remoteCall(eE, {
          itemId : 0,
          storageType : 1,
          path : gg
        }, wialon.util.Helper.wrapCallback(gh));
      },
      resetPasswordRequest : function(gp, go, gl, gn, gk){

        gk = wialon.util.Helper.wrapCallback(gk);
        if(!this.__cR){

          gk(2);
          return;
        };
        var gj = document.cookie.split(N);
        var gi = dq;
        for(var i = 0;i < gj.length;i++){

          var gm = gj[i].split(H);
          if(gm.length == 2 && gm[0] == dy){

            gi = gm[1];
            break;
          };
        };
        return wialon.core.Remote.getInstance().remoteCall(ed, {
          user : gp,
          email : go,
          emailFrom : gl,
          url : gn,
          lang : gi
        }, gk);
      },
      resetPasswordPerform : function(gs, gr, gq){

        gq = wialon.util.Helper.wrapCallback(gq);
        if(!this.__cR){

          gq(2);
          return;
        };
        return wialon.core.Remote.getInstance().remoteCall(cS, {
          user : gs,
          code : gr
        }, gq);
      },
      sendSms : function(gu, gv, gt){

        return wialon.core.Remote.getInstance().remoteCall(dC, {
          phoneNumber : gu,
          smsText : gv
        }, wialon.util.Helper.wrapCallback(gt));
      },
      sendPushMessage : function(gy, gw, gz, gx){

        return wialon.core.Remote.getInstance().remoteCall(ec, {
          message : gy,
          url : gw,
          params : gz
        }, wialon.util.Helper.wrapCallback(gx));
      },
      getAccountData : function(gB, gA){

        return wialon.core.Remote.getInstance().remoteCall(dl, {
          type : gB ? 2 : 1
        }, wialon.util.Helper.wrapCallback(gA));
      },
      checkItemsBilling : function(gC, gD, gE, gF){

        return wialon.core.Remote.getInstance().remoteCall(q, {
          items : gC,
          serviceName : gD,
          accessFlags : gE
        }, wialon.util.Helper.wrapCallback(gF));
      },
      getReportTables : function(gG){

        return wialon.core.Remote.getInstance().remoteCall(dH, {
        }, wialon.util.Helper.wrapCallback(gG));
      },
      setLoginHash : function(gH){

        this.__dg = gH;
      },
      getCurrUser : function(){

        return this.__cU;
      },
      getServerTime : function(){

        return this.__cV;
      },
      getItem : function(gI){

        if(!this.__cX)return null;
        var gJ = this.__cX[parseInt(gI)];
        if(typeof gJ != ds)return gJ;
        return null;
      },
      getItems : function(gM){

        if(!this.__cX || !this.__cY)return null;
        if(typeof gM == eD || gM == eA){

          var gL = new Array;
          for(var gK in this.__cX)gL.push(this.__cX[gK]);
          return gL;
        } else {

          var gN = this.__cY[gM];
          if(typeof gN != eD)return gN;
        };
        return (new Array);
      },
      registerConstructor : function(gO, gP){

        if(typeof this.__cQ[gO] != eD)return;
        this.__cQ[gO] = gP;
      },
      registerProperty : function(gQ, gR){

        if(typeof this.__cP[gQ] != eD)return;
        this.__cP[gQ] = gR;
      },
      getBaseUrl : function(){

        return this.__dd;
      },
      getBaseGisUrl : function(gS){

        if(!this.__de && this.__dd != eA){

          var gT = this.__dd.split(t);
          if(gT.length >= 2){

            if(gS == g)return gT[0] + dh + gT[1]; else if(gS == df)return gT[0] + dg + gT[1]; else if(gS == W)return gT[0] + y + gT[1];;;
          };
        };
        return this.__dd;
      },
      getId : function(){

        return this.__cS;
      },
      getRenderer : function(){

        return this.__db;
      },
      getMessagesLoader : function(){

        return this.__dc;
      },
      getFeatures : function(){

        return this.__vV;
      },
      checkFeature : function(gU){

        if(!this.__vV || typeof this.__vV.svcs == eD)return 0;
        if(typeof this.__vV.svcs[gU] == eD){

          if(this.__vV.unlim == 1)return 1;
          return 0;
        };
        var gV = this.__vV.svcs[gU];
        if(gV == 1)return 1; else if(gV == 0)return -1;;
        return 0;
      },
      __dj : function(){

        if(!this.__cS || !this.__cT)return;
        wialon.core.Remote.getInstance().ajaxRequest(da, {
          sid : this.__cS
        }, qx.lang.Function.bind(this.__dk, this, this.__cS), 60);
      },
      __dk : function(ha, gW, gY){

        if(gW != 0){

          if(gW == 1){

            if(this.__dl(ha))this.fireEvent(dT);
          } else if(this.__cT)qx.lang.Function.delay(this.__dj, this.__cT * 1000, this);;
          return;
        };
        try{

          this.__cV = gY.tm;
          for(var i = 0;i < gY.events.length;i++){

            var hb = gY.events[i];
            if(hb.i > 0){

              var gX = this.getItem(hb.i);
              if(gX && typeof gX != eD){

                if(hb.t == h)this.updateItem(gX, hb.d); else if(hb.t == eG)gX.handleMessage(hb.d); else if(hb.t == dA)this._onItemDeleted(gX);;;
              } else this.__di.push(hb);
            } else if(hb.i == -1)this.fireDataEvent(di, hb.d, null); else if(hb.i == -2){

              if(this.__dl(ha))this.fireEvent(dT);
            } else if(hb.i == -3){

              this.__vV = hb.d;
              this.fireEvent(dO);
            };;;
          };
        } catch(hc) {

          this.error(f + hc.message);
        };
        if(this.__cT)qx.lang.Function.delay(this.__dj, this.__cT * 1000, this);
        this.fireEvent(p);
      },
      parseSessionData : function(hd){

        if(!hd || this.__cU)return false;
        this.__cS = hd.eid;
        this.__cT = 2;
        this.__cV = hd.tm;
        this.__da = hd.au;
        this.__cW = {
        };
        for(var he in hd.classes)this.__cW[hd.classes[he]] = he;
        this.__cX = {
        };
        this.__cY = {
        };
        this.__cU = this.__dm(hd.user, wialon.item.User.defaultDataFlags());
        this.__dn(this.__cU);
        if(typeof hd.features != eD)this.__vV = hd.features;
        if(this.__cT)qx.lang.Function.delay(this.__dj, this.__cT * 1000, this);
        return true;
      },
      __dl : function(hf){

        if(hf && hf != this.__cS)return false;
        this.__cR = 0;
        this.__cS = eA;
        this.__cU = null;
        this.__cV;
        this.__cX = null;
        this.__cY = null;
        this.__cT = 0;
        this.__db = null;
        this.__dc = null;
        this.__dd = eA;
        this.__de = false;
        this.__cP = {
        };
        this.__cQ = {
        };
        this.__da = eA;
        this._libraries = {
        };
        this._disposeMap(ez);
        this._disposeObjects(ek);
        this.__cW = null;
        this.__vV = null;
        return true;
      },
      __dm : function(hi, hh){

        if(!hi || !hh)return null;
        hi.tp = this.__cW[hi.cls];
        if(typeof hi.tp == eD)return null;
        var hg;
        var hj = this.__cQ[hi.tp];
        if(typeof hj == eD)return null;
        hg = new hj(hi, hh);
        this.updateItem(hg, hi);
        if(hg && this.__di && this.__di.length){

          for(var i = 0;i < this.__di.length;i++){

            if(typeof this.__di[i] == ea && hg.getId() == this.__di[i].i){

              this.updateItem(hg, this.__di[i].d);
              delete this.__di[i];
              break;
            };
          };
        };
        return hg;
      },
      __dn : function(hk){

        if(!hk || !this.__cX)return;
        this.__cX[hk.getId()] = hk;
        var hl = this.__cY[hk.getType()];
        if(typeof hl == eD){

          this.__cY[hk.getType()] = new Array;
          hl = this.__cY[hk.getType()];
        };
        hl.push(hk);
      },
      __do : function(hm){

        if(!hm)return;
        if(typeof this.__cX[hm.getId()] != eD)delete this.__cX[hm.getId()];
        var hn = this.__cY[hm.getType()];
        if(typeof hn != eD)qx.lang.Array.remove(hn, hm);
        hm.dispose();
      },
      _onItemDeleted : function(ho){

        if(!ho)return;
        ho.fireEvent(ev);
        this.__do(ho);
      },
      __dp : function(hp, hq, hr){

        if(hq || !hr){

          hp(hq);
          return;
        };
        if(this.parseSessionData(hr))hp(0); else hp(6);
      },
      __dq : function(hv, ht, hy){

        if(ht || !hy){

          hv(ht);
          return;
        };
        for(var i = 0;i < hy.length;i++){

          var hw = hy[i].f;
          var hs = hy[i].i;
          var hu = hy[i].d;
          var hx = this.__cX[hs];
          if(typeof hx == eD && hw != 0 && hu){

            var hx = this.__dm(hu, hw);
            if(hx)this.__dn(hx);
          } else {

            if(hw == 0)this.__do(hx); else {

              if(typeof hx == eD)return;
              if(hu)this.updateItem(hx, hu);
              hx.setDataFlags(hw);
            };
          };
          hu = null;
        };
        hv(0);
      },
      __dr : function(hA, hz, hD){

        if(hz || !hD){

          hA(hz, null);
          return;
        };
        var hB = {
          searchSpec : hD.searchSpec,
          dataFlags : hD.dataFlags,
          totalItemsCount : hD.totalItemsCount,
          indexFrom : hD.indexFrom,
          indexTo : hD.indexTo,
          items : []
        };
        for(var i = 0;i < hD.items.length;i++){

          var hC = this.__dm(hD.items[i], hD.dataFlags);
          if(hC)hB.items.push(hC);
        };
        hA(0, hB);
        return hB;
      },
      __ds : function(hE, hF, hG){

        if(hF || !hG){

          hE(hF, null);
          return;
        };
        var hH = this.__dm(hG.item, hG.flags);
        hE((hH === null ? 6 : 0), hH);
        return hH;
      },
      __dt : function(hM, hI, hK, hL){

        if(!hK){

          var hJ = this.getItem(hI);
          if(hJ){

            hJ.fireEvent(ev);
            this.__do(hJ);
          };
        };
        hM(hK);
      }
    },
    destruct : function(){

      this.__dl();
      this._disposeObjects(ek, dG, eh);
    },
    events : {
      "serverUpdated" : s,
      "invalidSession" : s,
      "fileUploaded" : de,
      "featuresUpdated" : s
    }
  });
})();
(function(){

  var a = "prp",b = "qx.event.type.Data",c = "file/mkdir",d = "item/add_log_record",e = "mu",f = "Integer",g = "string",h = "delete_item",i = "Object",j = "prpu",k = "bact",l = "custom_msg",m = "&svc=file/get&params=",n = "qx.event.type.Event",o = "nm",p = "item/update_custom_property",q = "changeUserAccess",r = "update_name",s = "item/check_accessors",t = "changeDataFlags",u = "",v = "changeMeasureUnits",w = "number",x = "file/write",y = "item/update_name",z = "file/list",A = "uacl",B = "file/read",C = "file/put",D = "changeCustomProperty",E = "messageRegistered",F = "file/rm",G = "wialon.item.Item",H = "item/update_measure_units",I = "changeName",J = "/wialon/ajax.html?sid=",K = "crt",L = "String",M = "undefined",N = "update_access";
  qx.Class.define(G, {
    extend : qx.core.Object,
    construct : function(P, O){

      qx.core.Object.call(this);
      this.setDataFlags(O);
      this._id = P.id;
      this._type = P.tp;
    },
    properties : {
      dataFlags : {
        init : null,
        check : f,
        event : t
      },
      name : {
        init : null,
        check : L,
        event : I
      },
      measureUnits : {
        init : 0,
        check : f,
        event : v
      },
      userAccess : {
        init : null,
        check : f,
        event : q
      },
      customProps : {
        init : null,
        check : i
      },
      creatorId : {
        init : null,
        check : f
      },
      accountId : {
        init : null,
        check : f
      }
    },
    members : {
      _id : 0,
      _type : u,
      getId : function(){

        return this._id;
      },
      getType : function(){

        return this._type;
      },
      getCustomProperty : function(R, S){

        var Q = this.getCustomProps();
        if(Q){

          var T = Q[R];
          if(typeof T != M)return T;
        };
        if(typeof S != M)return S;
        return u;
      },
      setCustomProperty : function(V, U){

        var X = this.getCustomProps();
        if(X){

          var W = X[V];
          if(typeof W == M)W = u;
          if(U != u)X[V] = U; else if(W != u)delete X[V];;
          if(U != W)this.fireDataEvent(D, {
            n : V,
            v : U
          }, {
            n : V,
            v : W
          });
        };
      },
      getAccessors : function(ba, Y){

        return wialon.core.Remote.getInstance().remoteCall(s, {
          itemId : this.getId(),
          direct : ba
        }, wialon.util.Helper.wrapCallback(Y));
      },
      handleMessage : function(bb){

        this.fireDataEvent(E, bb, null);
      },
      updateCustomProperty : function(be, bd, bc){

        return wialon.core.Remote.getInstance().remoteCall(p, {
          itemId : this.getId(),
          name : be,
          value : (typeof bd == g || typeof bd == w) ? bd : u
        }, qx.lang.Function.bind(this.__du, this, wialon.util.Helper.wrapCallback(bc)));
      },
      updateMeasureUnits : function(bh, bg, bf){

        return wialon.core.Remote.getInstance().remoteCall(H, {
          itemId : this.getId(),
          type : bh,
          flags : bg
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(bf)));
      },
      updateName : function(name, bi){

        return wialon.core.Remote.getInstance().remoteCall(y, {
          itemId : this.getId(),
          name : name
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(bi)));
      },
      addLogRecord : function(bj, bl, bm, bk){

        return wialon.core.Remote.getInstance().remoteCall(d, {
          itemId : this.getId(),
          action : bj,
          newValue : bl || u,
          oldValue : bm || u
        }, wialon.util.Helper.wrapCallback(bk));
      },
      fileGet : function(bn, bo){

        var bp = {
          itemId : this.getId(),
          storageType : bn,
          path : bo
        };
        return wialon.core.Session.getInstance().getBaseUrl() + J + wialon.core.Session.getInstance().getId() + m + encodeURIComponent(wialon.util.Json.stringify(bp));
      },
      fileList : function(br, bu, bs, bq, bv, bt){

        wialon.core.Remote.getInstance().remoteCall(z, {
          itemId : this.getId(),
          storageType : br,
          path : bu,
          mask : bs,
          recursive : bq,
          fullPath : bv
        }, wialon.util.Helper.wrapCallback(bt));
      },
      fileRm : function(bw, bx, by){

        wialon.core.Remote.getInstance().remoteCall(F, {
          itemId : this.getId(),
          storageType : bw,
          path : bx
        }, wialon.util.Helper.wrapCallback(by));
      },
      fileMkdir : function(bz, bA, bB){

        wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          storageType : bz,
          path : bA
        }, wialon.util.Helper.wrapCallback(bB));
      },
      filePut : function(bE, bI, bD, bC, bH, bF){

        var bG = {
        };
        bG.itemId = this.getId();
        bG.storageType = bE;
        bG.path = bI;
        bG.writeType = bC;
        wialon.core.Uploader.getInstance().uploadFiles([bD], C, bG, bF, true, bH);
      },
      fileRead : function(bJ, bM, bL, bK){

        wialon.core.Remote.getInstance().remoteCall(B, {
          itemId : this.getId(),
          storageType : bJ,
          contentType : bL,
          path : bM
        }, wialon.util.Helper.wrapCallback(bK));
      },
      fileWrite : function(bP, bR, content, bO, bN, bQ){

        wialon.core.Remote.getInstance().remoteCall(x, {
          itemId : this.getId(),
          storageType : bP,
          path : bR,
          writeType : bO,
          contentType : bN,
          content : content
        }, wialon.util.Helper.wrapCallback(bQ));
      },
      __du : function(bS, bT, bU){

        if(bT == 0 && bU)this.setCustomProperty(bU.n, bU.v);
        bS(bT);
      },
      _onUpdateProperties : function(bV, bW, bX){

        if(bW == 0 && bX)wialon.core.Session.getInstance().updateItem(this, bX);
        bV(bW);
      }
    },
    statics : {
      dataFlag : {
        base : 0x00000001,
        customProps : 0x00000002,
        billingProps : 0x00000004,
        customFields : 0x00000008,
        image : 0x00000010,
        messages : 0x00000020,
        guid : 0x00000040,
        adminFields : 0x00000080
      },
      accessFlag : {
        view : 0x1,
        viewProperties : 0x2,
        setAcl : 0x4,
        deleteItem : 0x8,
        editName : 0x10,
        viewCFields : 0x20,
        editCFields : 0x40,
        editOther : 0x80,
        editImage : 0x100,
        execReports : 0x200,
        editSubItems : 0x400,
        manageLog : 0x800,
        viewAFields : 0x1000,
        editAFields : 0x2000,
        viewFile : 0x4000,
        editFile : 0x8000
      },
      messageFlag : {
        typeMask : 0xFF00,
        typeUnitData : 0x0000,
        typeUnitSMS : 0x0100,
        typeUnitCmd : 0x0200,
        typeUnitEvent : 0x0600,
        typeUserLog : 0x0400,
        typeNotification : 0x0300,
        typeBalance : 0x0500,
        typeAgroCultivation : 0x0700,
        typeDriverSMS : 0x0900,
        typeLogRecord : 0x1000,
        typeOther : 0xFF00
      },
      measureUnitsType : {
        si : 0x00,
        us : 0x01,
        im : 0x02
      },
      measureUnitsFlag : {
        setMeasureUnits : 0x00,
        convertMeasureUnits : 0x01
      },
      logMessageAction : {
        itemCustomMessage : l,
        itemUpdatedName : r,
        itemUpdatedUserAccess : N,
        itemDeleted : h
      },
      fileStorageType : {
        publicType : 1,
        protectedType : 2
      },
      fileWriteType : {
        overwrite : 0,
        append : 1,
        skip : 2
      },
      fileContentType : {
        plainText : 0,
        hexString : 1,
        base64 : 2
      },
      registerProperties : function(){

        var bY = wialon.core.Session.getInstance();
        bY.registerProperty(o, this.remoteUpdateName);
        bY.registerProperty(e, this.remoteUpdateMeasureUnits);
        bY.registerProperty(A, this.remoteUpdateUserAccess);
        bY.registerProperty(a, this.remoteUpdateCustomProps);
        bY.registerProperty(j, this.remoteUpdateCustomProp);
        bY.registerProperty(K, this.remoteUpdateCreatorId);
        bY.registerProperty(k, this.remoteUpdateAccountId);
      },
      remoteUpdateName : function(ca, cb){

        ca.setName(cb);
      },
      remoteUpdateMeasureUnits : function(cc, cd){

        cc.setMeasureUnits(cd);
      },
      remoteUpdateUserAccess : function(ce, cf){

        ce.setUserAccess(cf);
      },
      remoteUpdateCustomProps : function(cg, ch){

        cg.setCustomProps(ch);
      },
      remoteUpdateCustomProp : function(ci, ck){

        for(var cj in ck){

          ci.setCustomProperty(cj, ck[cj]);
        };
      },
      remoteUpdateCreatorId : function(cl, cm){

        cl.setCreatorId(cm);
      },
      remoteUpdateAccountId : function(cn, co){

        cn.setAccountId(co);
      }
    },
    events : {
      "changeName" : b,
      "changeDataFlags" : b,
      "changeUserAccess" : b,
      "changeCustomProperty" : b,
      "itemDeleted" : n,
      "messageRegistered" : b
    }
  });
})();
(function(){

  var a = "/wialon/post.html?2",b = "geocode",c = "singleton",d = "wialon.core.Remote",e = "error",f = "/gis_post?1",g = "abort",h = "&sid=",j = "success",k = "search",l = ":",m = "core/batch",n = "",o = "/gis_geocode",p = "sdk",q = "/wialon/post.html?1",r = "/wialon/post.html",s = "/gis_search",t = "//",u = "statusError",v = "/gis_post?2",w = "/wialon/ajax.html?svc=",x = "timeout",y = "undefined",z = "object";
  qx.Class.define(d, {
    extend : qx.core.Object,
    type : c,
    construct : function(){

      qx.core.Object.call(this);
      this._req = {
      };
      this._req[p] = new wialon.core.PostMessage(this.createFullUrl(wialon.core.Session.getInstance().getBaseUrl()) + r, 0);
      if(wialon.core.Session.getInstance().getBaseGisUrl(k) != n)this._req[k] = new wialon.core.PostMessage(this.createFullUrl(wialon.core.Session.getInstance().getBaseGisUrl(k)) + f, 1); else this._req[k] = new wialon.core.PostMessage(this.createFullUrl() + q, 1);
      if(wialon.core.Session.getInstance().getBaseGisUrl(b) != n)this._req[b] = new wialon.core.PostMessage(this.createFullUrl(wialon.core.Session.getInstance().getBaseGisUrl(b)) + v, 1); else this._req[b] = new wialon.core.PostMessage(this.createFullUrl() + a, 1);
    },
    members : {
      __dv : null,
      __dw : [],
      __dx : n,
      __vU : 30,
      remoteCall : function(C, E, D, F){

        D = wialon.util.Helper.wrapCallback(D);
        if(typeof F == y)F = this.__vU;
        if(this.__dv)this.__dv.push({
          svc : C,
          params : E ? E : {
          },
          callback : D,
          timeout : F
        }); else {

          var A = w + C + h + wialon.core.Session.getInstance().getId();
          var B = {
            params : {
            }
          };
          if(E)B = {
            params : E
          };
          return this.ajaxRequest(A, B, D, F, C);
        };
      },
      replaceSender : function(G, H){

        this._req[G] = H;
      },
      startBatch : function(I){

        if(this.__dv)return 0;
        if(I)this.__dx = I;
        this.__dv = new Array;
        return 1;
      },
      finishBatch : function(J, O, P){

        J = wialon.util.Helper.wrapCallback(J);
        if(!this.__dv){

          J(2, 2);
          return;
        };
        this.__dw.push(J);
        if(this.__dx && O != this.__dx){

          this.__dw.push(J);
          return;
        };
        J = wialon.util.Helper.wrapCallback(this.__dw);
        if(!this.__dv.length){

          this.__dx = n;
          this.__dw = [];
          this.__dv = null;
          J(0, 0);
          return;
        };
        if(!P)P = 0;
        var M = 0;
        var N = [];
        var K = [];
        for(var i = 0;i < this.__dv.length;i++){

          var L = this.__dv[i];
          N.push({
            svc : L.svc,
            params : L.params
          });
          K.push(L.callback);
          if(L.timeout > M)M = L.timeout;
        };
        this.__dv = null;
        this.__dx = n;
        this.__dw = [];
        this.remoteCall(m, {
          params : N,
          flags : P
        }, qx.lang.Function.bind(this.__dB, this, J, K), M);
      },
      ajaxRequest : function(R, T, S, U, Q){

        var V = p;
        if(R.match(o))V = b; else if(R.match(s))V = k;;
        if(this._req[V].supportAsync())this._req[V].send(R, T, qx.lang.Function.bind(this.__dy, this, S), qx.lang.Function.bind(this.__dz, this, S), U, {
        }); else {

          T.svc = Q;
          return this.__dy(S, wialon.util.Json.parse(this._req[V].send(wialon.util.Json.stringify(T))));
        };
      },
      jsonRequest : function(W, bb, ba, bc, bd){

        var Y = new qx.io.request.Jsonp(W);
        var X = null;
        Y.setCache(false);
        if(bd)Y.setCallbackName(bd);
        Y.setTimeout(bc * 1000);
        if(bb){

          if(typeof bb == z)Y.setRequestData(bb); else Y.setRequestData({
            params : bb
          });
        };
        if(ba){

          Y.addListener(j, qx.lang.Function.bind(this.__dA, this, ba, Y));
          X = qx.lang.Function.bind(this.__dz, this, ba, Y);
          Y.addListener(e, X);
          Y.addListener(g, X);
          Y.addListener(x, X);
          Y.addListener(u, X);
        };
        Y.send();
        Y = null;
        X = null;
      },
      setBaseUrl : function(be){

        this.__dd = be;
      },
      setTimeout : function(bf){

        this.__vU = bf;
      },
      createFullUrl : function(bg){

        if(typeof document == y)return bg;
        return bg ? bg : document.location.protocol + t + document.location.hostname + (document.location.port.length ? l + document.location.port : n);
      },
      __dy : function(bh, bi){

        return this.__dC(bi, bh);
      },
      __dz : function(bj, bk){

        bj(5, null);
      },
      __dA : function(bl, bm){

        this.__dC(bm.getResponse(), bl);
      },
      __dB : function(bo, bq, bn, bp){

        if(bn == 0 && (!bp || !bq || bq.length != bp.length))bn = 3;
        if(bn){

          for(var i = 0;i < bq.length;i++)bq[i] ? bq[i](bn) : null;
          bo(bn, bn);
          return;
        };
        var bu = 0;
        var bt = [];
        var bs = 0;
        var br = [];
        for(var i = 0;i < bp.length;i++){

          br.push(this.__dC(bp[i], bq[i]));
          if(bp[i])bu = bp[i];
          bt.push(bp[i]);
          if(typeof bp[i].error != y)bs++;
        };
        bo(bn, bu, bs, bt);
        return br;
      },
      __dC : function(bw, bv){

        if(bw && typeof bw.error != y && bw.error != 0)return bv(bw.error, null); else if(bw)return bv(0, bw); else return bv(3, null);;
      }
    },
    statics : {
      BatchFlag : {
        breakFailure : 0x01
      }
    }
  });
})();
(function(){

  var a = "&",b = "&sid=",c = "",d = "onmessage",e = "none",f = "{id: 0, source:'",g = "src",h = "onload",j = "message",k = "wialon.core.PostMessage",l = "=",m = "load",o = "iframe",p = "sid",q = "'}",r = "object";
  qx.Class.define(k, {
    extend : qx.core.Object,
    construct : function(s, t){

      qx.core.Object.call(this);
      this._url = s;
      this._id = this._url;
      this._io = null;
      this._callbacks = {
      };
    },
    members : {
      send : function(w, y, v, A, z){

        if(!this._io){

          this._io = document.createElement(o);
          this._io.style.display = e;
          if(window.attachEvent)this._io.attachEvent(h, qx.lang.Function.bind(this.__dE, this)); else this._io.addEventListener(m, qx.lang.Function.bind(this.__dE, this), false);
          this._io.setAttribute(g, this._url);
          document.body.appendChild(this._io);
          if(window.addEventListener)window.addEventListener(j, qx.lang.Function.bind(this.__dD, this), false); else window.attachEvent(d, qx.lang.Function.bind(this.__dD, this));
        };
        var B = {
          id : ++this._counter,
          url : w,
          params : this.__dG(y),
          source : this._id
        };
        var x = this._io.contentWindow;
        if(x){

          var u = wialon.util.Json.stringify(B);
          this._callbacks[this._counter] = [v, A, u, 0, z];
          if(z)this._callbacks[this._counter].push(setTimeout(qx.lang.Function.bind(this.__dF, this, this._counter), z * 1000));
          if(this._frameReady)x.postMessage(u, this._url); else this._requests.push(u);
        } else A();
      },
      supportAsync : function(){

        return true;
      },
      _url : c,
      _io : null,
      _id : 0,
      _callbacks : {
      },
      _requests : [],
      _frameReady : false,
      _timeout : 0,
      _counter : 0,
      __dD : function(event){

        var D = wialon.util.Json.parse(event.data);
        if(D.source != this._id)return;
        if(!D.id){

          this._frameReady = true;
          this.__dE();
          return;
        };
        var C = this._callbacks[D.id];
        if(C){

          if(D && D.text && D.text.error && D.text.error == 1003 && C[3] < 3){

            C[3]++;
            if(C[4] && C[5]){

              clearTimeout(C[5]);
              C[5] = setTimeout(qx.lang.Function.bind(this.__dF, this, this._counter), C[4] * 1000);
            };
            if(this._io.contentWindow){

              setTimeout(qx.lang.Function.bind(function(E){

                this._io.contentWindow.postMessage(E, this._url);
              }, this, C[2]), Math.random() * 1000);
              return;
            };
          };
          if(C[D.error])C[D.error](D.text);
          if(C[4] && C[5])clearTimeout(C[5]);
          delete this._callbacks[D.id];
        };
      },
      __dE : function(){

        if(!this._frameReady){

          this._io.contentWindow.postMessage(f + this._id + q, this._url);
          return;
        };
        for(var i = 0;i < this._requests.length;i++)this._io.contentWindow.postMessage(this._requests[i], this._url);
        this._requests = [];
      },
      __dF : function(G){

        var F = this._callbacks[G];
        if(F){

          if(F[1])F[1]();
          delete this._callbacks[G];
        };
      },
      __dG : function(J){

        var H = [];
        var I = false;
        if(typeof J == r){

          for(var n in J){

            if(typeof J[n] == r)H.push(n + l + encodeURIComponent(wialon.util.Json.stringify(J[n]))); else H.push(n + l + encodeURIComponent(J[n]));
            if(n == p)I = true;
          };
          return H.join(a) + (!I ? b + wialon.core.Session.getInstance().getId() : c);
        };
        return !I ? b + wialon.core.Session.getInstance().getId() : c;
      }
    }
  });
})();
(function(){

  var d = '\\u00',g = "array",h = '',j = '\\\\',k = '\\f',m = ']',n = "static",o = "wialon.util.Json",p = '"',q = "null",r = '\\"',s = ',',t = '(',u = ':',w = "",y = '\\t',z = "number",A = '\\r',B = '{',C = 'null',D = 'string',E = '\\b',F = '[',G = ')',H = '\\n',I = '}';
  qx.Class.define(o, {
    type : n,
    statics : {
      stringify : function(J){

        var f = null;
        if(isNaN(J))f = this.__dH[typeof J]; else if(J instanceof Array)f = this.__dH[g]; else f = this.__dH[z];;
        if(f)return f.apply(this, [J]);
        return w;
      },
      parse : function(json, safe){

        if(safe === undefined)safe = false;
        if(safe && !/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json))return undefined;
        if(!json || json == w)return {
        };
        var res = null;
        try{

          res = eval(t + json + G);
        } catch(e) {

          try{

            res = eval(p + json + p);
          } catch(K) {

            return null;
          };
        };
        return res;
      },
      compareObjects : function(L, M){

        if((L == null && M != null) || (M == null && L != null))return false;
        return this.stringify(L) == this.stringify(M);
      },
      __dH : {
        'array' : function(x){

          var a = [F],b,f,i,l = x.length,v;
          for(i = 0;i < l;i += 1){

            v = x[i];
            f = this.__dH[typeof v];
            if(f){

              v = f.apply(this, [v]);
              if(typeof v == D){

                if(b){

                  a[a.length] = s;
                };
                a[a.length] = v;
                b = true;
              };
            };
          };
          a[a.length] = m;
          return a.join(h);
        },
        'boolean' : function(x){

          return String(x);
        },
        'null' : function(x){

          return q;
        },
        'number' : function(x){

          return isFinite(x) ? String(x) : C;
        },
        'object' : function(x){

          if(x){

            if(x instanceof Array){

              return this.__dH.array.apply(this, [x]);
            };
            var a = [B],b,f,i,v;
            for(i in x){

              v = x[i];
              f = this.__dH[typeof v];
              if(f){

                v = f.apply(this, [v]);
                if(typeof v == D){

                  if(b){

                    a[a.length] = s;
                  };
                  a.push(this.__dH.string.apply(this, [i]), u, v);
                  b = true;
                };
              };
            };
            a[a.length] = I;
            return a.join(h);
          };
          return C;
        },
        'string' : function(x){

          if(/["\\\x00-\x1f]/.test(x)){

            x = x.replace(/([\x00-\x1f\\"])/g, function(a, b){

              var N = {
                '\b' : E,
                '\t' : y,
                '\n' : H,
                '\f' : k,
                '\r' : A,
                '"' : r,
                '\\' : j
              };
              var c = N[b];
              if(c){

                return c;
              };
              c = b.charCodeAt();
              return d + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            });
          };
          return p + x + p;
        }
      }
    }
  });
})();
(function(){

  var e = "function",f = "\\+",g = "\\)",h = "static",j = '^',l = "resource/get_zones_by_point",m = "\\^",n = "\\[",o = "wialon.util.Helper",p = "*",q = "\\]",s = "\\.",t = '$',u = "\\(",v = "\\{",w = "\\\\",y = "\\}",z = "?",A = ".*",B = "\\$",C = ".",D = "undefined";
  qx.Class.define(o, {
    type : h,
    statics : {
      filterItems : function(E, F){

        if(!E)return null;
        var G = new Array;
        for(var i = 0;i < E.length;i++){

          var H = E[i];
          if(!H || wialon.util.Number.and(H.getUserAccess(), F) != F)continue;
          G.push(H);
        };
        return G;
      },
      searchObject : function(J, I, L){

        if(!J || !I || !L)return null;
        for(var K in J){

          if(typeof J[K][I] == D || J[K][I] != L)continue;
          return J[K];
        };
        return null;
      },
      sortItems : function(M, N){

        if(!M)return null;
        if(typeof N != e)N = function(a){

          return a.getName();
        };
        var O = function(a, b){

          var R = function(S){

            return S.match(/\d+|\D+/g);
          };
          var P = R(N(a).toLowerCase());
          var Q = R(N(b).toLowerCase());
          if(!P || !Q || !P.length || !Q.length){

            if(!P || !P.length)return -1;
            if(!Q || !Q.length)return 1;
            return 0;
          };
          for(var x = 0;P[x] && Q[x];x++){

            if(P[x] !== Q[x]){

              var c = Number(P[x]),d = Number(Q[x]);
              if(c == P[x] && d == Q[x])return c - d; else return (P[x] > Q[x]) ? 1 : -1;
            };
          };
          return P.length - Q.length;
        };
        return M.sort(O);
      },
      getZonesInPoint : function(U, T){

        return wialon.core.Remote.getInstance().remoteCall(l, {
          spec : U
        }, wialon.util.Helper.wrapCallback(T));
      },
      wildcardCompare : function(ba, Y, V){

        if(ba == null || Y == null)return null;
        if(V && Y.indexOf(p) == -1 && Y.indexOf(z) == -1)Y = p + Y + p;
        var X = Y.toLowerCase();
        X = X.replace(/\\/g, w);
        X = X.replace(/\./g, s);
        X = X.replace(/\?/g, C);
        X = X.replace(/\*/g, A);
        X = X.replace(/\^/g, m);
        X = X.replace(/\$/g, B);
        X = X.replace(/\+/g, f);
        X = X.replace(/\(/g, u);
        X = X.replace(/\)/g, g);
        X = X.replace(/\[/g, n);
        X = X.replace(/\]/g, q);
        X = X.replace(/\{/g, v);
        X = X.replace(/\}/g, y);
        var W = ba.toLowerCase().match(new RegExp(j + X + t));
        return W != null ? true : false;
      },
      wrapCallback : function(bc){

        return typeof bc == e ? bc : qx.lang.Function.bind(this.__bF, this, bc);
      },
      countProps : function(be){

        var bd = 0;
        for(var k in be){

          if(be.hasOwnProperty(k)){

            bd++;
          };
        };
        return bd;
      },
      objectsEqual : function(bf, bg){

        if(typeof (bf) !== typeof (bg)){

          return false;
        };
        if(typeof (bf) === e){

          return bf.toString() === bg.toString();
        };
        if(bf instanceof Object && bg instanceof Object){

          if(this.countProps(bf) !== this.countProps(bg)){

            return false;
          };
          var r = true;
          for(var k in bf){

            r = this.objectsEqual(bf[k], bg[k]);
            if(!r){

              return false;
            };
          };
          return true;
        } else {

          return bf === bg;
        };
      },
      __bF : function(){

        if(!arguments.length)return arguments;
        var bi = Array.prototype.slice.call(arguments, 1);
        var bh = arguments[0];
        if(!bh)return bi;
        if(!(bh instanceof Array))bh = [bh];
        for(var i = 0;i < bh.length;i++)bh[i].apply(this, bi);
        return bi;
      }
    }
  });
})();
(function(){

  var a = "number",b = "wialon.util.Number",c = "static",d = "string";
  qx.Class.define(b, {
    type : c,
    statics : {
      or : function(g){

        var f = this.__dI();
        for(var i = 0;i < arguments.length;i++){

          var e = this.__dI(arguments[i]);
          f[0] = (f[0] | e[0]) >>> 0;
          f[1] = (f[1] | e[1]) >>> 0;
        };
        return f[0] * 0x100000000 + f[1];
      },
      xor : function(k){

        var j = this.__dI();
        for(var i = 0;i < arguments.length;i++){

          var h = this.__dI(arguments[i]);
          j[0] = (j[0] ^ h[0]) >>> 0;
          j[1] = (j[1] ^ h[1]) >>> 0;
        };
        return j[0] * 0x100000000 + j[1];
      },
      and : function(n){

        var m = [0xFFFFFFFF, 0xFFFFFFFF];
        for(var i = 0;i < arguments.length;i++){

          var l = this.__dI(arguments[i]);
          m[0] = (m[0] & l[0]) >>> 0;
          m[1] = (m[1] & l[1]) >>> 0;
        };
        return m[0] * 0x100000000 + m[1];
      },
      not : function(o){

        var p = this.__dI(o);
        p[0] = ((~p[0]) & 0x1FFFFF) >>> 0;
        p[1] = (~p[1]) >>> 0;
        return p[0] * 0x100000000 + p[1];
      },
      exclude : function(s){

        if(!arguments.length)return 0;
        var r = this.__dI(arguments[0]);
        for(var i = 1;i < arguments.length;i++){

          var q = this.__dI(this.not(arguments[i]));
          r[0] = (r[0] & q[0]) >>> 0;
          r[1] = (r[1] & q[1]) >>> 0;
        };
        return r[0] * 0x100000000 + r[1];
      },
      umax : function(){

        return 0x1FFFFFFFFFFFFF;
      },
      __dI : function(u){

        var v = [0, 0];
        if(typeof u == a){

          if(u == -1)return [0x1FFFFF, 0xFFFFFFFF];
          u = u.toString(16);
        };
        if(typeof u == d && u.length && u.length <= 16){

          var t = [0, 0];
          for(var i = u.length;i > 0;i--)v[u.length - i < 8 ? 1 : 0] |= parseInt(u[i - 1], 16) << (((u.length - i) * 4) % 32);
        };
        v[0] = v[0] >>> 0;
        v[1] = v[1] >>> 0;
        return v;
      }
    }
  });
})();
(function(){

  var a = "loadEnd",b = "qx.io.request.AbstractRequest",c = "changePhase",d = "GET",f = "sent",g = "qx.event.type.Data",h = "qx.io.request.authentication.IAuthentication",i = "error",j = "fail",k = "loading",l = "load",m = "qx.event.type.Event",n = "abort",o = "success",p = "String",q = "",r = "opened",s = "POST",t = "statusError",u = "readyStateChange",v = "Abstract method call",w = "abstract",x = "unsent",y = "changeResponse",z = "Number",A = "Content-Type",B = "timeout",C = "undefined";
  qx.Class.define(b, {
    type : w,
    extend : qx.core.Object,
    construct : function(D){

      qx.core.Object.call(this);
      if(D !== undefined){

        this.setUrl(D);
      };
      this.__dJ = {
      };
      var E = this._transport = this._createTransport();
      this._setPhase(x);
      this.__dK = qx.lang.Function.bind(this._onReadyStateChange, this);
      this.__dL = qx.lang.Function.bind(this._onLoad, this);
      this.__dM = qx.lang.Function.bind(this._onLoadEnd, this);
      this.__dN = qx.lang.Function.bind(this._onAbort, this);
      this.__dO = qx.lang.Function.bind(this._onTimeout, this);
      this.__dP = qx.lang.Function.bind(this._onError, this);
      E.onreadystatechange = this.__dK;
      E.onload = this.__dL;
      E.onloadend = this.__dM;
      E.onabort = this.__dN;
      E.ontimeout = this.__dO;
      E.onerror = this.__dP;
    },
    events : {
      "readyStateChange" : m,
      "success" : m,
      "load" : m,
      "loadEnd" : m,
      "abort" : m,
      "timeout" : m,
      "error" : m,
      "statusError" : m,
      "fail" : m,
      "changeResponse" : g,
      "changePhase" : g
    },
    properties : {
      url : {
        check : p
      },
      timeout : {
        check : z,
        nullable : true,
        init : 0
      },
      requestData : {
        check : function(F){

          return qx.lang.Type.isString(F) || qx.Class.isSubClassOf(F.constructor, qx.core.Object) || qx.lang.Type.isObject(F);
        },
        nullable : true
      },
      authentication : {
        check : h,
        nullable : true
      }
    },
    members : {
      __dK : null,
      __dL : null,
      __dM : null,
      __dN : null,
      __dO : null,
      __dP : null,
      __dQ : null,
      __dR : null,
      __dS : null,
      __dJ : null,
      __dT : null,
      _transport : null,
      _createTransport : function(){

        throw new Error(v);
      },
      _getConfiguredUrl : function(){
      },
      _getConfiguredRequestHeaders : function(){
      },
      _getParsedResponse : function(){

        throw new Error(v);
      },
      _getMethod : function(){

        return d;
      },
      _isAsync : function(){

        return true;
      },
      send : function(){

        var K = this._transport,G,J,H,I;
        G = this._getConfiguredUrl();
        if(/\#/.test(G)){

          G = G.replace(/\#.*/, q);
        };
        K.timeout = this.getTimeout();
        J = this._getMethod();
        H = this._isAsync();
        {
        };
        K.open(J, G, H);
        this._setPhase(r);
        I = this._serializeData(this.getRequestData());
        this._setRequestHeaders();
        {
        };
        J == d ? K.send() : K.send(I);
        this._setPhase(f);
      },
      abort : function(){

        {
        };
        this.__dR = true;
        this.__dS = n;
        this._transport.abort();
      },
      _setRequestHeaders : function(){

        var M = this._transport,L = this._getAllRequestHeaders();
        for(var N in L){

          M.setRequestHeader(N, L[N]);
        };
      },
      _getAllRequestHeaders : function(){

        var O = {
        };
        qx.lang.Object.mergeWith(O, this._getConfiguredRequestHeaders());
        qx.lang.Object.mergeWith(O, this.__dU());
        qx.lang.Object.mergeWith(O, this.__dT);
        qx.lang.Object.mergeWith(O, this.__dJ);
        return O;
      },
      __dU : function(){

        var Q = this.getAuthentication(),P = {
        };
        if(Q){

          Q.getAuthHeaders().forEach(function(R){

            P[R.key] = R.value;
          });
          return P;
        };
      },
      setRequestHeader : function(S, T){

        this.__dJ[S] = T;
      },
      getRequestHeader : function(U){

        return this.__dJ[U];
      },
      removeRequestHeader : function(V){

        if(this.__dJ[V]){

          delete this.__dJ[V];
        };
      },
      getTransport : function(){

        return this._transport;
      },
      getReadyState : function(){

        return this._transport.readyState;
      },
      getPhase : function(){

        return this.__dS;
      },
      getStatus : function(){

        return this._transport.status;
      },
      getStatusText : function(){

        return this._transport.statusText;
      },
      getResponseText : function(){

        return this._transport.responseText;
      },
      getAllResponseHeaders : function(){

        return this._transport.getAllResponseHeaders();
      },
      getResponseHeader : function(W){

        return this._transport.getResponseHeader(W);
      },
      getResponseContentType : function(){

        return this.getResponseHeader(A);
      },
      isDone : function(){

        return this.getReadyState() === 4;
      },
      getResponse : function(){

        return this.__dQ;
      },
      _setResponse : function(Y){

        var X = Y;
        if(this.__dQ !== Y){

          this.__dQ = Y;
          this.fireEvent(y, qx.event.type.Data, [this.__dQ, X]);
        };
      },
      _onReadyStateChange : function(){

        var ba = this.getReadyState();
        {
        };
        this.fireEvent(u);
        if(this.__dR){

          return;
        };
        if(ba === 3){

          this._setPhase(k);
        };
        if(this.isDone()){

          this.__dV();
        };
      },
      __dV : function(){

        {
        };
        this._setPhase(l);
        if(qx.util.Request.isSuccessful(this.getStatus())){

          {
          };
          this._setResponse(this._getParsedResponse());
          this._fireStatefulEvent(o);
        } else {

          try{

            this._setResponse(this._getParsedResponse());
          } catch(e) {
          };
          if(this.getStatus() !== 0){

            this._fireStatefulEvent(t);
            this.fireEvent(j);
          };
        };
      },
      _onLoad : function(){

        this.fireEvent(l);
      },
      _onLoadEnd : function(){

        this.fireEvent(a);
      },
      _onAbort : function(){

        this._fireStatefulEvent(n);
      },
      _onTimeout : function(){

        this._fireStatefulEvent(B);
        this.fireEvent(j);
      },
      _onError : function(){

        this.fireEvent(i);
        this.fireEvent(j);
      },
      _fireStatefulEvent : function(bb){

        {
        };
        this._setPhase(bb);
        this.fireEvent(bb);
      },
      _setPhase : function(bc){

        var bd = this.__dS;
        {
        };
        this.__dS = bc;
        this.fireDataEvent(c, bc, bd);
      },
      _serializeData : function(bg){

        var be = typeof this.getMethod !== C && this.getMethod() == s,bf = /application\/.*\+?json/.test(this.getRequestHeader(A));
        if(!bg){

          return null;
        };
        if(qx.lang.Type.isString(bg)){

          return bg;
        };
        if(qx.Class.isSubClassOf(bg.constructor, qx.core.Object)){

          return qx.util.Serializer.toUriParameter(bg);
        };
        if(bf && (qx.lang.Type.isObject(bg) || qx.lang.Type.isArray(bg))){

          return qx.lang.Json.stringify(bg);
        };
        if(qx.lang.Type.isObject(bg)){

          return qx.util.Uri.toParameter(bg, be);
        };
      }
    },
    environment : {
      "qx.debug.io" : false
    },
    destruct : function(){

      var bi = this._transport,bh = function(){
      };
      if(this._transport){

        bi.onreadystatechange = bi.onload = bi.onloadend = bi.onabort = bi.ontimeout = bi.onerror = bh;
        bi.dispose();
      };
    }
  });
})();
(function(){

  var a = "file",b = "+",c = "strict",d = "anchor",e = "div",f = "query",g = "source",h = "password",j = "host",k = "protocol",l = "user",n = "directory",p = "loose",q = "relative",r = "queryKey",s = "qx.util.Uri",t = "",u = "path",v = "authority",w = '">0</a>',x = "&",y = "port",z = '<a href="',A = "userInfo",B = "?",C = "=";
  qx.Bootstrap.define(s, {
    statics : {
      parseUri : function(F, E){

        var G = {
          key : [g, k, v, A, l, h, j, y, q, u, n, a, f, d],
          q : {
            name : r,
            parser : /(?:^|&)([^&=]*)=?([^&]*)/g
          },
          parser : {
            strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
            loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
          }
        };
        var o = G,m = G.parser[E ? c : p].exec(F),D = {
        },i = 14;
        while(i--){

          D[o.key[i]] = m[i] || t;
        };
        D[o.q.name] = {
        };
        D[o.key[12]].replace(o.q.parser, function(I, J, H){

          if(J){

            D[o.q.name][J] = H;
          };
        });
        return D;
      },
      appendParamsToUrl : function(K, L){

        if(L === undefined){

          return K;
        };
        {
        };
        if(qx.lang.Type.isObject(L)){

          L = qx.util.Uri.toParameter(L);
        };
        if(!L){

          return K;
        };
        return K += /\?/.test(K) ? x + L : B + L;
      },
      toParameter : function(M, Q){

        var P,O = [];
        for(P in M){

          if(M.hasOwnProperty(P)){

            var N = M[P];
            if(N instanceof Array){

              for(var i = 0;i < N.length;i++){

                this.__dW(P, N[i], O, Q);
              };
            } else {

              this.__dW(P, N, O, Q);
            };
          };
        };
        return O.join(x);
      },
      __dW : function(U, V, T, S){

        var R = window.encodeURIComponent;
        if(S){

          T.push(R(U).replace(/%20/g, b) + C + R(V).replace(/%20/g, b));
        } else {

          T.push(R(U) + C + R(V));
        };
      },
      getAbsolute : function(X){

        var W = document.createElement(e);
        W.innerHTML = z + X + w;
        return W.firstChild.href;
      }
    }
  });
})();
(function(){

  var a = "qx.util.Serializer",b = '\\\\',c = '\\f',d = '"',e = "null",f = '\\"',g = "}",h = "get",j = "{",k = '\\r',l = "",m = '\\t',n = "]",o = "Class",p = "Interface",q = "[",r = "Mixin",s = '":',t = "&",u = '\\b',v = "=",w = '\\n',x = ",";
  qx.Class.define(a, {
    statics : {
      toUriParameter : function(z, C, y){

        var E = l;
        var B = qx.util.PropertyUtil.getAllProperties(z.constructor);
        for(var name in B){

          if(B[name].group != undefined){

            continue;
          };
          var A = z[h + qx.lang.String.firstUp(name)]();
          if(qx.lang.Type.isArray(A)){

            var D = qx.data && qx.data.IListData && qx.Class.hasInterface(A && A.constructor, qx.data.IListData);
            for(var i = 0;i < A.length;i++){

              var F = D ? A.getItem(i) : A[i];
              E += this.__dX(name, F, C);
            };
          } else if(qx.lang.Type.isDate(A) && y != null){

            E += this.__dX(name, y.format(A), C);
          } else {

            E += this.__dX(name, A, C);
          };
        };
        return E.substring(0, E.length - 1);
      },
      __dX : function(name, I, G){

        if(I && I.$$type == o){

          I = I.classname;
        };
        if(I && (I.$$type == p || I.$$type == r)){

          I = I.name;
        };
        if(I instanceof qx.core.Object && G != null){

          var H = encodeURIComponent(G(I));
          if(H === undefined){

            var H = encodeURIComponent(I);
          };
        } else {

          var H = encodeURIComponent(I);
        };
        return encodeURIComponent(name) + v + H + t;
      },
      toNativeObject : function(L, N, K){

        var O;
        if(L == null){

          return null;
        };
        if(qx.data && qx.data.IListData && qx.Class.hasInterface(L.constructor, qx.data.IListData)){

          O = [];
          for(var i = 0;i < L.getLength();i++){

            O.push(qx.util.Serializer.toNativeObject(L.getItem(i), N, K));
          };
          return O;
        };
        if(qx.lang.Type.isArray(L)){

          O = [];
          for(var i = 0;i < L.length;i++){

            O.push(qx.util.Serializer.toNativeObject(L[i], N, K));
          };
          return O;
        };
        if(L.$$type == o){

          return L.classname;
        };
        if(L.$$type == p || L.$$type == r){

          return L.name;
        };
        if(L instanceof qx.core.Object){

          if(N != null){

            var J = N(L);
            if(J != undefined){

              return J;
            };
          };
          O = {
          };
          var Q = qx.util.PropertyUtil.getAllProperties(L.constructor);
          for(var name in Q){

            if(Q[name].group != undefined){

              continue;
            };
            var M = L[h + qx.lang.String.firstUp(name)]();
            O[name] = qx.util.Serializer.toNativeObject(M, N, K);
          };
          return O;
        };
        if(qx.lang.Type.isDate(L) && K != null){

          return K.format(L);
        };
        if(qx.locale && qx.locale.LocalizedString && L instanceof qx.locale.LocalizedString){

          return L.toString();
        };
        if(qx.lang.Type.isObject(L)){

          O = {
          };
          for(var P in L){

            O[P] = qx.util.Serializer.toNativeObject(L[P], N, K);
          };
          return O;
        };
        return L;
      },
      toJson : function(T, V, S){

        var W = l;
        if(T == null){

          return e;
        };
        if(qx.data && qx.data.IListData && qx.Class.hasInterface(T.constructor, qx.data.IListData)){

          W += q;
          for(var i = 0;i < T.getLength();i++){

            W += qx.util.Serializer.toJson(T.getItem(i), V, S) + x;
          };
          if(W != q){

            W = W.substring(0, W.length - 1);
          };
          return W + n;
        };
        if(qx.lang.Type.isArray(T)){

          W += q;
          for(var i = 0;i < T.length;i++){

            W += qx.util.Serializer.toJson(T[i], V, S) + x;
          };
          if(W != q){

            W = W.substring(0, W.length - 1);
          };
          return W + n;
        };
        if(T.$$type == o){

          return d + T.classname + d;
        };
        if(T.$$type == p || T.$$type == r){

          return d + T.name + d;
        };
        if(T instanceof qx.core.Object){

          if(V != null){

            var R = V(T);
            if(R != undefined){

              return d + R + d;
            };
          };
          W += j;
          var Y = qx.util.PropertyUtil.getAllProperties(T.constructor);
          for(var name in Y){

            if(Y[name].group != undefined){

              continue;
            };
            var U = T[h + qx.lang.String.firstUp(name)]();
            W += d + name + s + qx.util.Serializer.toJson(U, V, S) + x;
          };
          if(W != j){

            W = W.substring(0, W.length - 1);
          };
          return W + g;
        };
        if(qx.locale && qx.locale.LocalizedString && T instanceof qx.locale.LocalizedString){

          T = T.toString();
        };
        if(qx.lang.Type.isDate(T) && S != null){

          return d + S.format(T) + d;
        };
        if(qx.lang.Type.isObject(T)){

          W += j;
          for(var X in T){

            W += d + X + s + qx.util.Serializer.toJson(T[X], V, S) + x;
          };
          if(W != j){

            W = W.substring(0, W.length - 1);
          };
          return W + g;
        };
        if(qx.lang.Type.isString(T)){

          T = T.replace(/([\\])/g, b);
          T = T.replace(/(["])/g, f);
          T = T.replace(/([\r])/g, k);
          T = T.replace(/([\f])/g, c);
          T = T.replace(/([\n])/g, w);
          T = T.replace(/([\t])/g, m);
          T = T.replace(/([\b])/g, u);
          return d + T + d;
        };
        if(qx.lang.Type.isDate(T) || qx.lang.Type.isRegExp(T)){

          return d + T + d;
        };
        return T + l;
      }
    }
  });
})();
(function(){

  var a = "$$theme_",b = "$$user_",c = "qx.util.PropertyUtil",d = "$$init_";
  qx.Class.define(c, {
    statics : {
      getProperties : function(e){

        return e.$$properties;
      },
      getAllProperties : function(j){

        var g = {
        };
        var f = j;
        while(f != qx.core.Object){

          var i = this.getProperties(f);
          for(var h in i){

            g[h] = i[h];
          };
          f = f.superclass;
        };
        return g;
      },
      getUserValue : function(l, k){

        return l[b + k];
      },
      setUserValue : function(n, m, o){

        n[b + m] = o;
      },
      deleteUserValue : function(q, p){

        delete (q[b + p]);
      },
      getInitValue : function(s, r){

        return s[d + r];
      },
      setInitValue : function(u, t, v){

        u[d + t] = v;
      },
      deleteInitValue : function(x, w){

        delete (x[d + w]);
      },
      getThemeValue : function(z, y){

        return z[a + y];
      },
      setThemeValue : function(B, A, C){

        B[a + A] = C;
      },
      deleteThemeValue : function(E, D){

        delete (E[a + D]);
      },
      setThemed : function(H, G, I){

        var F = qx.core.Property.$$method.setThemed;
        H[F[G]](I);
      },
      resetThemed : function(K, J){

        var L = qx.core.Property.$$method.resetThemed;
        K[L[J]]();
      }
    }
  });
})();
(function(){

  var a = "HEAD",b = "CONNECT",c = "OPTIONS",d = "PUT",e = "GET",f = "PATCH",g = "//",h = "DELETE",i = "POST",j = "TRACE",k = "qx.util.Request";
  qx.Bootstrap.define(k, {
    statics : {
      isCrossDomain : function(l){

        var n = qx.util.Uri.parseUri(l),location = window.location;
        if(!location){

          return false;
        };
        var m = location.protocol;
        if(!(l.indexOf(g) !== -1)){

          return false;
        };
        if(m.substr(0, m.length - 1) == n.protocol && location.host === n.host && location.port === n.port){

          return false;
        };
        return true;
      },
      isSuccessful : function(status){

        return (status >= 200 && status < 300 || status === 304);
      },
      isMethod : function(p){

        var o = [e, i, d, h, a, c, j, b, f];
        return (o.indexOf(p) !== -1) ? true : false;
      },
      methodAllowsRequestBody : function(q){

        return !((/^(GET|HEAD)$/).test(q));
      }
    }
  });
})();
(function(){

  var a = "qx.lang.Object";
  qx.Bootstrap.define(a, {
    statics : {
      empty : function(b){

        {
        };
        for(var c in b){

          if(b.hasOwnProperty(c)){

            delete b[c];
          };
        };
      },
      isEmpty : function(d){

        {
        };
        for(var e in d){

          return false;
        };
        return true;
      },
      getLength : qx.Bootstrap.objectGetLength,
      getValues : function(g){

        {
        };
        var h = [];
        var f = Object.keys(g);
        for(var i = 0,l = f.length;i < l;i++){

          h.push(g[f[i]]);
        };
        return h;
      },
      mergeWith : qx.Bootstrap.objectMergeWith,
      clone : function(j, n){

        if(qx.lang.Type.isObject(j)){

          var k = {
          };
          for(var m in j){

            if(n){

              k[m] = qx.lang.Object.clone(j[m], n);
            } else {

              k[m] = j[m];
            };
          };
          return k;
        } else if(qx.lang.Type.isArray(j)){

          var k = [];
          for(var i = 0;i < j.length;i++){

            if(n){

              k[i] = qx.lang.Object.clone(j[i]);
            } else {

              k[i] = j[i];
            };
          };
          return k;
        };
        return j;
      },
      invert : function(o){

        {
        };
        var p = {
        };
        for(var q in o){

          p[o[q].toString()] = q;
        };
        return p;
      },
      getKeyFromValue : function(r, s){

        {
        };
        for(var t in r){

          if(r.hasOwnProperty(t) && r[t] === s){

            return t;
          };
        };
        return null;
      },
      contains : function(u, v){

        {
        };
        return this.getKeyFromValue(u, v) !== null;
      },
      fromArray : function(w){

        {
        };
        var x = {
        };
        for(var i = 0,l = w.length;i < l;i++){

          {
          };
          x[w[i].toString()] = true;
        };
        return x;
      }
    }
  });
})();
(function(){

  var a = "qx.io.request.Jsonp",b = "qx.event.type.Event",c = "Boolean";
  qx.Class.define(a, {
    extend : qx.io.request.AbstractRequest,
    events : {
      "success" : b,
      "load" : b,
      "statusError" : b
    },
    properties : {
      cache : {
        check : c,
        init : true
      }
    },
    members : {
      _createTransport : function(){

        return new qx.bom.request.Jsonp();
      },
      _getConfiguredUrl : function(){

        var d = this.getUrl(),e;
        if(this.getRequestData()){

          e = this._serializeData(this.getRequestData());
          d = qx.util.Uri.appendParamsToUrl(d, e);
        };
        if(!this.getCache()){

          d = qx.util.Uri.appendParamsToUrl(d, {
            nocache : new Date().valueOf()
          });
        };
        return d;
      },
      _getParsedResponse : function(){

        return this._transport.responseJson;
      },
      setCallbackParam : function(f){

        this._transport.setCallbackParam(f);
      },
      setCallbackName : function(name){

        this._transport.setCallbackName(name);
      }
    }
  });
})();
(function(){

  var a = "url: ",b = "qx.debug.io",c = "qx.bom.request.Script",d = "Invalid state",e = "head",f = "error",g = "loadend",h = "qx.debug",i = "script",j = "load",k = "Unknown response headers",l = "browser.documentmode",m = "abort",n = "",o = "Received native readyState: loaded",p = "readystatechange",q = "Response header cannot be determined for ",r = "requests made with script transport.",s = "opera",t = "unknown",u = "Open native request with ",v = "Response headers cannot be determined for",w = "mshtml",x = "engine.name",y = "Detected error",z = "Send native request",A = "on",B = "timeout",C = "Unknown environment key at this phase",D = "Received native load";
  qx.Bootstrap.define(c, {
    construct : function(){

      this.__eh();
      this.__dY = qx.Bootstrap.bind(this._onNativeLoad, this);
      this.__ea = qx.Bootstrap.bind(this._onNativeError, this);
      this.__dO = qx.Bootstrap.bind(this._onTimeout, this);
      this.__eb = document.head || document.getElementsByTagName(e)[0] || document.documentElement;
      this._emitter = new qx.event.Emitter();
      this.timeout = this.__ej() ? 0 : 15000;
    },
    events : {
      "readystatechange" : c,
      "error" : c,
      "loadend" : c,
      "timeout" : c,
      "abort" : c,
      "load" : c
    },
    members : {
      readyState : null,
      status : null,
      statusText : null,
      timeout : null,
      __ec : null,
      on : function(name, E, F){

        this._emitter.on(name, E, F);
        return this;
      },
      open : function(H, G){

        if(this.__ef){

          return;
        };
        this.__eh();
        this.__dR = null;
        this.__ed = G;
        if(this.__em(b)){

          qx.Bootstrap.debug(qx.bom.request.Script, u + a + G);
        };
        this._readyStateChange(1);
      },
      setRequestHeader : function(I, J){

        if(this.__ef){

          return null;
        };
        var K = {
        };
        if(this.readyState !== 1){

          throw new Error(d);
        };
        K[I] = J;
        this.__ed = qx.util.Uri.appendParamsToUrl(this.__ed, K);
        return this;
      },
      send : function(){

        if(this.__ef){

          return null;
        };
        var M = this.__ek(),L = this.__eb,N = this;
        if(this.timeout > 0){

          this.__ee = window.setTimeout(this.__dO, this.timeout);
        };
        if(this.__em(b)){

          qx.Bootstrap.debug(qx.bom.request.Script, z);
        };
        L.insertBefore(M, L.firstChild);
        window.setTimeout(function(){

          N._readyStateChange(2);
          N._readyStateChange(3);
        });
        return this;
      },
      abort : function(){

        if(this.__ef){

          return null;
        };
        this.__dR = true;
        this.__el();
        this._emit(m);
        return this;
      },
      _emit : function(event){

        this[A + event]();
        this._emitter.emit(event, this);
      },
      onreadystatechange : function(){
      },
      onload : function(){
      },
      onloadend : function(){
      },
      onerror : function(){
      },
      onabort : function(){
      },
      ontimeout : function(){
      },
      getResponseHeader : function(O){

        if(this.__ef){

          return null;
        };
        if(this.__em(h)){

          qx.Bootstrap.debug(q + r);
        };
        return t;
      },
      getAllResponseHeaders : function(){

        if(this.__ef){

          return null;
        };
        if(this.__em(h)){

          qx.Bootstrap.debug(v + r);
        };
        return k;
      },
      setDetermineSuccess : function(P){

        this.__ec = P;
      },
      dispose : function(){

        var Q = this.__eg;
        if(!this.__ef){

          if(Q){

            Q.onload = Q.onreadystatechange = null;
            this.__el();
          };
          if(this.__ee){

            window.clearTimeout(this.__ee);
          };
          this.__ef = true;
        };
      },
      isDisposed : function(){

        return !!this.__ef;
      },
      _getUrl : function(){

        return this.__ed;
      },
      _getScriptElement : function(){

        return this.__eg;
      },
      _onTimeout : function(){

        this.__ei();
        if(!this.__ej()){

          this._emit(f);
        };
        this._emit(B);
        if(!this.__ej()){

          this._emit(g);
        };
      },
      _onNativeLoad : function(){

        var S = this.__eg,R = this.__ec,T = this;
        if(this.__dR){

          return;
        };
        if(this.__em(x) === w && this.__em(l) < 9){

          if(!(/loaded|complete/).test(S.readyState)){

            return;
          } else {

            if(this.__em(b)){

              qx.Bootstrap.debug(qx.bom.request.Script, o);
            };
          };
        };
        if(this.__em(b)){

          qx.Bootstrap.debug(qx.bom.request.Script, D);
        };
        if(R){

          if(!this.status){

            this.status = R() ? 200 : 500;
          };
        };
        if(this.status === 500){

          if(this.__em(b)){

            qx.Bootstrap.debug(qx.bom.request.Script, y);
          };
        };
        if(this.__ee){

          window.clearTimeout(this.__ee);
        };
        window.setTimeout(function(){

          T._success();
          T._readyStateChange(4);
          T._emit(j);
          T._emit(g);
        });
      },
      _onNativeError : function(){

        this.__ei();
        this._emit(f);
        this._emit(g);
      },
      __eg : null,
      __eb : null,
      __ed : n,
      __dY : null,
      __ea : null,
      __dO : null,
      __ee : null,
      __dR : null,
      __ef : null,
      __eh : function(){

        this.readyState = 0;
        this.status = 0;
        this.statusText = n;
      },
      _readyStateChange : function(U){

        this.readyState = U;
        this._emit(p);
      },
      _success : function(){

        this.__el();
        this.readyState = 4;
        if(!this.status){

          this.status = 200;
        };
        this.statusText = n + this.status;
      },
      __ei : function(){

        this.__el();
        this.readyState = 4;
        this.status = 0;
        this.statusText = null;
      },
      __ej : function(){

        var W = this.__em(x) === w && this.__em(l) < 9;
        var V = this.__em(x) === s;
        return !(W || V);
      },
      __ek : function(){

        var X = this.__eg = document.createElement(i);
        X.src = this.__ed;
        X.onerror = this.__ea;
        X.onload = this.__dY;
        if(this.__em(x) === w && this.__em(l) < 9){

          X.onreadystatechange = this.__dY;
        };
        return X;
      },
      __el : function(){

        var Y = this.__eg;
        if(Y && Y.parentNode){

          this.__eb.removeChild(Y);
        };
      },
      __em : function(ba){

        if(qx && qx.core && qx.core.Environment){

          return qx.core.Environment.get(ba);
        } else {

          if(ba === x){

            return qx.bom.client.Engine.getName();
          };
          if(ba === l){

            return qx.bom.client.Browser.getDocumentMode();
          };
          if(ba == b){

            return false;
          };
          throw new Error(C);
        };
      }
    },
    defer : function(){

      if(qx && qx.core && qx.core.Environment){

        qx.core.Environment.add(b, false);
      };
    }
  });
})();
(function(){

  var a = "qx.event.Emitter",b = "*";
  qx.Bootstrap.define(a, {
    extend : Object,
    statics : {
      __en : []
    },
    members : {
      __eo : null,
      __ep : null,
      on : function(name, c, d){

        var e = qx.event.Emitter.__en.length;
        this.__eq(name).push({
          listener : c,
          ctx : d,
          id : e
        });
        qx.event.Emitter.__en.push({
          name : name,
          listener : c,
          ctx : d
        });
        return e;
      },
      once : function(name, f, g){

        var h = qx.event.Emitter.__en.length;
        this.__eq(name).push({
          listener : f,
          ctx : g,
          once : true,
          id : h
        });
        qx.event.Emitter.__en.push({
          name : name,
          listener : f,
          ctx : g
        });
        return h;
      },
      off : function(name, l, j){

        var k = this.__eq(name);
        for(var i = k.length - 1;i >= 0;i--){

          var m = k[i];
          if(m.listener == l && m.ctx == j){

            k.splice(i, 1);
            qx.event.Emitter.__en[m.id] = null;
            return m.id;
          };
        };
        return null;
      },
      offById : function(o){

        var n = qx.event.Emitter.__en[o];
        if(n){

          this.off(n.name, n.listener, n.ctx);
        };
        return null;
      },
      addListener : function(name, p, q){

        return this.on(name, p, q);
      },
      addListenerOnce : function(name, r, s){

        return this.once(name, r, s);
      },
      removeListener : function(name, t, u){

        this.off(name, t, u);
      },
      removeListenerById : function(v){

        this.offById(v);
      },
      emit : function(name, y){

        var x = this.__eq(name);
        for(var i = 0;i < x.length;i++){

          var w = x[i];
          w.listener.call(w.ctx, y);
          if(w.once){

            x.splice(i, 1);
            i--;
          };
        };
        x = this.__eq(b);
        for(var i = x.length - 1;i >= 0;i--){

          var w = x[i];
          w.listener.call(w.ctx, y);
        };
      },
      getListeners : function(){

        return this.__eo;
      },
      __eq : function(name){

        if(this.__eo == null){

          this.__eo = {
          };
        };
        if(this.__eo[name] == null){

          this.__eo[name] = [];
        };
        return this.__eo[name];
      }
    }
  });
})();
(function(){

  var a = "rim_tabletos",b = "10.1",c = "Darwin",d = "10.3",e = "os.version",f = "10.7",g = "2003",h = ")",i = "iPhone",j = "android",k = "unix",l = "ce",m = "7",n = "SymbianOS",o = "10.5",p = "os.name",q = "10.9",r = "|",s = "MacPPC",t = "95",u = "iPod",v = "10.8",w = "\.",x = "Win64",y = "linux",z = "me",A = "10.2",B = "Macintosh",C = "Android",D = "Windows",E = "98",F = "ios",G = "vista",H = "8",I = "blackberry",J = "2000",K = "8.1",L = "(",M = "",N = "win",O = "Linux",P = "10.6",Q = "BSD",R = "10.0",S = "10.4",T = "Mac OS X",U = "iPad",V = "X11",W = "xp",X = "symbian",Y = "qx.bom.client.OperatingSystem",bo = "g",bp = "Win32",bq = "osx",bk = "webOS",bl = "RIM Tablet OS",bm = "BlackBerry",bn = "nt4",br = ".",bs = "MacIntel",bt = "webos";
  qx.Bootstrap.define(Y, {
    statics : {
      getName : function(){

        if(!navigator){

          return M;
        };
        var bu = navigator.platform || M;
        var bv = navigator.userAgent || M;
        if(bu.indexOf(D) != -1 || bu.indexOf(bp) != -1 || bu.indexOf(x) != -1){

          return N;
        } else if(bu.indexOf(B) != -1 || bu.indexOf(s) != -1 || bu.indexOf(bs) != -1 || bu.indexOf(T) != -1){

          return bq;
        } else if(bv.indexOf(bl) != -1){

          return a;
        } else if(bv.indexOf(bk) != -1){

          return bt;
        } else if(bu.indexOf(u) != -1 || bu.indexOf(i) != -1 || bu.indexOf(U) != -1){

          return F;
        } else if(bv.indexOf(C) != -1){

          return j;
        } else if(bu.indexOf(O) != -1){

          return y;
        } else if(bu.indexOf(V) != -1 || bu.indexOf(Q) != -1 || bu.indexOf(c) != -1){

          return k;
        } else if(bu.indexOf(n) != -1){

          return X;
        } else if(bu.indexOf(bm) != -1){

          return I;
        };;;;;;;;;
        return M;
      },
      __er : {
        "Windows NT 6.3" : K,
        "Windows NT 6.2" : H,
        "Windows NT 6.1" : m,
        "Windows NT 6.0" : G,
        "Windows NT 5.2" : g,
        "Windows NT 5.1" : W,
        "Windows NT 5.0" : J,
        "Windows 2000" : J,
        "Windows NT 4.0" : bn,
        "Win 9x 4.90" : z,
        "Windows CE" : l,
        "Windows 98" : E,
        "Win98" : E,
        "Windows 95" : t,
        "Win95" : t,
        "Mac OS X 10_9" : q,
        "Mac OS X 10.9" : q,
        "Mac OS X 10_8" : v,
        "Mac OS X 10.8" : v,
        "Mac OS X 10_7" : f,
        "Mac OS X 10.7" : f,
        "Mac OS X 10_6" : P,
        "Mac OS X 10.6" : P,
        "Mac OS X 10_5" : o,
        "Mac OS X 10.5" : o,
        "Mac OS X 10_4" : S,
        "Mac OS X 10.4" : S,
        "Mac OS X 10_3" : d,
        "Mac OS X 10.3" : d,
        "Mac OS X 10_2" : A,
        "Mac OS X 10.2" : A,
        "Mac OS X 10_1" : b,
        "Mac OS X 10.1" : b,
        "Mac OS X 10_0" : R,
        "Mac OS X 10.0" : R
      },
      getVersion : function(){

        var bw = qx.bom.client.OperatingSystem.__es(navigator.userAgent);
        if(bw == null){

          bw = qx.bom.client.OperatingSystem.__et(navigator.userAgent);
        };
        if(bw != null){

          return bw;
        } else {

          return M;
        };
      },
      __es : function(bx){

        var bA = [];
        for(var bz in qx.bom.client.OperatingSystem.__er){

          bA.push(bz);
        };
        var bB = new RegExp(L + bA.join(r).replace(/\./g, w) + h, bo);
        var by = bB.exec(bx);
        if(by && by[1]){

          return qx.bom.client.OperatingSystem.__er[by[1]];
        };
        return null;
      },
      __et : function(bF){

        var bG = bF.indexOf(C) != -1;
        var bC = bF.match(/(iPad|iPhone|iPod)/i) ? true : false;
        if(bG){

          var bE = new RegExp(/ Android (\d+(?:\.\d+)+)/i);
          var bH = bE.exec(bF);
          if(bH && bH[1]){

            return bH[1];
          };
        } else if(bC){

          var bI = new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)\s+/);
          var bD = bI.exec(bF);
          if(bD && bD[2] && bD[3]){

            return bD[2] + br + bD[3];
          };
        };
        return null;
      }
    },
    defer : function(bJ){

      qx.core.Environment.add(p, bJ.getName);
      qx.core.Environment.add(e, bJ.getVersion);
    }
  });
})();
(function(){

  var a = "CSS1Compat",b = "msie",c = "android",d = "operamini",e = "gecko",f = "maple",g = "browser.quirksmode",h = "browser.name",i = "trident",j = "mobile chrome",k = ")(/| )([0-9]+\.[0-9])",l = "iemobile",m = "prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",n = "IEMobile|Maxthon|MSIE|Trident",o = "opera mobi",p = "Mobile Safari",q = "Maple",r = "operamobile",s = "ie",t = "mobile safari",u = "AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|OmniWeb|Maxthon|Pre|PhantomJS|Mobile Safari|Safari",v = "qx.bom.client.Browser",w = "(Maple )([0-9]+\.[0-9]+\.[0-9]*)",x = "",y = "opera mini",z = "(",A = "browser.version",B = "opera",C = "ce",D = "mshtml",E = "Opera Mini|Opera Mobi|Opera",F = "webkit",G = "browser.documentmode",H = "5.0",I = "Mobile/";
  qx.Bootstrap.define(v, {
    statics : {
      getName : function(){

        var L = navigator.userAgent;
        var M = new RegExp(z + qx.bom.client.Browser.__eu + k);
        var K = L.match(M);
        if(!K){

          return x;
        };
        var name = K[1].toLowerCase();
        var J = qx.bom.client.Engine.getName();
        if(J === F){

          if(name === c){

            name = j;
          } else if(L.indexOf(p) !== -1 || L.indexOf(I) !== -1){

            name = t;
          };
        } else if(J === D){

          if(name === b || name === i){

            name = s;
            if(qx.bom.client.OperatingSystem.getVersion() === C){

              name = l;
            };
          };
        } else if(J === B){

          if(name === o){

            name = r;
          } else if(name === y){

            name = d;
          };
        } else if(J === e){

          if(L.indexOf(q) !== -1){

            name = f;
          };
        };;;
        return name;
      },
      getVersion : function(){

        var P = navigator.userAgent;
        var Q = new RegExp(z + qx.bom.client.Browser.__eu + k);
        var N = P.match(Q);
        if(!N){

          return x;
        };
        var name = N[1].toLowerCase();
        var O = N[3];
        if(P.match(/Version(\/| )([0-9]+\.[0-9])/)){

          O = RegExp.$2;
        };
        if(qx.bom.client.Engine.getName() == D){

          O = qx.bom.client.Engine.getVersion();
          if(name === b && qx.bom.client.OperatingSystem.getVersion() == C){

            O = H;
          };
        };
        if(qx.bom.client.Browser.getName() == f){

          Q = new RegExp(w);
          N = P.match(Q);
          if(!N){

            return x;
          };
          O = N[2];
        };
        return O;
      },
      getDocumentMode : function(){

        if(document.documentMode){

          return document.documentMode;
        };
        return 0;
      },
      getQuirksMode : function(){

        if(qx.bom.client.Engine.getName() == D && parseFloat(qx.bom.client.Engine.getVersion()) >= 8){

          return qx.bom.client.Engine.DOCUMENT_MODE === 5;
        } else {

          return document.compatMode !== a;
        };
      },
      __eu : {
        "webkit" : u,
        "gecko" : m,
        "mshtml" : n,
        "opera" : E
      }[qx.bom.client.Engine.getName()]
    },
    defer : function(R){

      qx.core.Environment.add(h, R.getName),qx.core.Environment.add(A, R.getVersion),qx.core.Environment.add(G, R.getDocumentMode),qx.core.Environment.add(g, R.getQuirksMode);
    }
  });
})();
(function(){

  var a = "qx.bom.request.Jsonp",b = "callback",c = "open",d = "dispose",e = "",f = "_onNativeLoad",g = "qx",h = ".callback",i = "qx.bom.request.Jsonp.";
  qx.Bootstrap.define(a, {
    extend : qx.bom.request.Script,
    construct : function(){

      qx.bom.request.Script.apply(this);
      this.__eD();
    },
    members : {
      responseJson : null,
      __co : null,
      __ev : null,
      __ew : null,
      __ex : null,
      __ey : null,
      __ez : null,
      __ef : null,
      __eA : e,
      open : function(o, k){

        if(this.__ef){

          return;
        };
        var m = {
        },l,n,j = this;
        this.responseJson = null;
        this.__ex = false;
        l = this.__ev || b;
        n = this.__ew || this.__eA + i + this.__co + h;
        if(!this.__ew){

          this.constructor[this.__co] = this;
        } else {

          if(!window[this.__ew]){

            this.__ey = true;
            window[this.__ew] = function(p){

              j.callback(p);
            };
          } else {

            {
            };
          };
        };
        {
        };
        m[l] = n;
        this.__ez = k = qx.util.Uri.appendParamsToUrl(k, m);
        this.__eC(c, [o, k]);
      },
      callback : function(q){

        if(this.__ef){

          return;
        };
        this.__ex = true;
        {
        };
        this.responseJson = q;
        this.constructor[this.__co] = undefined;
        this.__eB();
      },
      setCallbackParam : function(r){

        this.__ev = r;
        return this;
      },
      setCallbackName : function(name){

        this.__ew = name;
        return this;
      },
      setPrefix : function(s){

        this.__eA = s;
      },
      getGeneratedUrl : function(){

        return this.__ez;
      },
      dispose : function(){

        this.__eB();
        this.__eC(d);
      },
      _onNativeLoad : function(){

        this.status = this.__ex ? 200 : 500;
        this.__eC(f);
      },
      __eB : function(){

        if(this.__ey && window[this.__ew]){

          window[this.__ew] = undefined;
          this.__ey = false;
        };
      },
      __eC : function(u, t){

        qx.bom.request.Script.prototype[u].apply(this, t || []);
      },
      __eD : function(){

        this.__co = g + (new Date().valueOf()) + (e + Math.random()).substring(2, 5);
      }
    }
  });
})();
(function(){

  var a = "function",b = "wialon.core.Uploader",c = "<",d = "singleton",e = "eventHash",g = "action",h = ">",j = "fileUploaded",k = "onload",l = "multipart/form-data",m = "load",n = "hidden",o = "enctype",p = "target",q = "name",r = "",s = "&sid=",t = "input",u = "method",v = "form",w = "POST",x = "params",y = "none",z = "jUploadFrame",A = "iframe",B = "/wialon/ajax.html?svc=",C = "jUploadForm",D = "undefined",E = "id",F = "hash",G = "object";
  qx.Class.define(b, {
    extend : qx.core.Object,
    type : d,
    members : {
      __eE : null,
      __eF : {
      },
      __eG : 1024 * 1024 * 64,
      uploadFiles : function(I, O, R, Q, T, J){

        Q = wialon.util.Helper.wrapCallback(Q);
        if(!(I instanceof Array))return Q(4);
        var X = (new Date()).getTime();
        var P = C + X;
        var W = z + X;
        var M = wialon.core.Session.getInstance().getBaseUrl() + B + O + s + wialon.core.Session.getInstance().getId();
        var L = document.createElement(v);
        if(!R)R = {
        };
        R[e] = P;
        var U = document.createElement(t);
        U.name = x;
        U.type = n;
        U.value = (wialon.util.Json.stringify(R).replace(/&lt;/g, c).replace(/&gt;/g, h));
        L.appendChild(U);
        var U = document.createElement(t);
        U.name = e;
        U.type = n;
        U.value = P;
        L.appendChild(U);
        var K = document.createElement(A);
        L.setAttribute(g, M);
        L.setAttribute(u, w);
        L.setAttribute(q, P);
        L.setAttribute(E, P);
        L.setAttribute(o, l);
        L.style.display = y;
        var V = 0;
        for(var i = 0;i < I.length;i++){

          var S = I[i];
          var H = document.getElementById(S.id);
          var ba = 0;
          if(H && typeof H.files == G && H.files.length){

            var f = H.files[0];
            ba = typeof f.fileSize != D ? f.fileSize : (typeof f.size != D ? f.size : 0);
          };
          S.parentNode.insertBefore(S.cloneNode(true), S);
          S.setAttribute(E, r);
          L.appendChild(S);
          V += ba;
        };
        document.body.appendChild(L);
        K.setAttribute(E, W);
        K.setAttribute(q, W);
        K.style.display = y;
        document.body.appendChild(K);
        var N = qx.lang.Function.bind(this.__eH, this, {
          callback : Q,
          io : K,
          form : L,
          phase : 0
        });
        if(V > this.__eG){

          N();
          return;
        };
        if(!T){

          if(window.attachEvent)K.attachEvent(k, N); else K.addEventListener(m, N, false);
        } else {

          if(!this.__eE)this.__eE = wialon.core.Session.getInstance().addListener(j, this.__eI, this);
          this.__eF[P] = N;
        };
        L.setAttribute(p, W);
        L.submit();
        if(J && T){

          var Y = qx.lang.Function.bind(function(){

            if(typeof this.__eF[P] == a)this.__eF[P]();
          }, this);
          setTimeout(Y, J * 1000);
        };
        return true;
      },
      __eH : function(bb, event){

        bb.io.parentNode.removeChild(bb.io);
        bb.form.parentNode.removeChild(bb.form);
        bb.io = null;
        bb.form = null;
        if(event && typeof event.result == G)bb.callback(event.result.svc_error, null); else bb.callback(event ? 0 : 6, (event && typeof event.preventDefault == a) ? null : event);
      },
      __eI : function(event){

        var bd = event.getData();
        if(!bd || typeof bd[F] == D)return;
        var bc = this.__eF[bd[F]];
        if(!bc)return;
        bc(bd);
        delete this.__eF[bd[F]];
      }
    }
  });
})();
(function(){

  var a = "user/update_password",b = "delete_user_notify",c = "user/update_hosts_mask",d = "Integer",e = "update_user_pass",f = "qx.event.type.Data",g = "wialon.item.User",h = "user/update_item_access",i = "user/get_locale",j = "user",k = "hm",l = "update_hosts_mask",m = "update_user_flags",n = "create_user",o = "String",p = "user/update_locale",q = "changeHostsMask",r = "user/get_items_access",s = "create_user_notify",t = "changeUserFlags",u = "fl",v = "user/update_user_flags";
  qx.Class.define(g, {
    extend : wialon.item.Item,
    properties : {
      userFlags : {
        init : null,
        check : d,
        event : t
      },
      hostsMask : {
        init : null,
        check : o,
        event : q
      }
    },
    members : {
      getItemsAccess : function(x, w, y){

        return wialon.core.Remote.getInstance().remoteCall(r, {
          userId : this.getId(),
          directAccess : x,
          itemSuperclass : w
        }, wialon.util.Helper.wrapCallback(y));
      },
      updateItemAccess : function(z, A, B){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          userId : this.getId(),
          itemId : z.getId(),
          accessMask : A
        }, wialon.util.Helper.wrapCallback(B));
      },
      updateUserFlags : function(E, D, C){

        return wialon.core.Remote.getInstance().remoteCall(v, {
          userId : this.getId(),
          flags : E,
          flagsMask : D
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(C)));
      },
      updateHostsMask : function(G, F){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          userId : this.getId(),
          hostsMask : G
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(F)));
      },
      getLocale : function(H){

        return wialon.core.Remote.getInstance().remoteCall(i, {
          userId : this.getId()
        }, wialon.util.Helper.wrapCallback(H));
      },
      updateLocale : function(I, J){

        return wialon.core.Remote.getInstance().remoteCall(p, {
          userId : this.getId(),
          locale : I
        }, wialon.util.Helper.wrapCallback(J));
      },
      updatePassword : function(M, L, K){

        return wialon.core.Remote.getInstance().remoteCall(a, {
          userId : this.getId(),
          oldPassword : M,
          newPassword : L
        }, wialon.util.Helper.wrapCallback(K));
      }
    },
    statics : {
      dataFlag : {
        flags : 0x00000100,
        notifications : 0x00000200,
        connSettings : 0x00000400
      },
      accessFlag : {
        setItemsAccess : 0x100000,
        operateAs : 0x200000,
        editUserFlags : 0x400000
      },
      defaultDataFlags : function(){

        return wialon.item.Item.dataFlag.base | wialon.item.Item.dataFlag.customProps | wialon.item.Item.dataFlag.billingProps | wialon.item.User.dataFlag.flags;
      },
      userFlag : {
        isDisabled : 0x00000001,
        cantChangePassword : 0x00000002,
        canCreateItems : 0x00000004,
        isReadonly : 0x00000010,
        canSendSMS : 0x00000020
      },
      logMessageAction : {
        userCreated : n,
        userUpdatedHostsMask : l,
        userUpdatedPassword : e,
        userUpdatedFlags : m,
        userCreatedNotification : s,
        userDeletedNotification : b
      },
      registerProperties : function(){

        var N = wialon.core.Session.getInstance();
        N.registerConstructor(j, wialon.item.User);
        N.registerProperty(u, this.remoteUpdateUserFlags);
        N.registerProperty(k, this.remoteUpdateHostsMask);
      },
      remoteUpdateUserFlags : function(O, P){

        O.setUserFlags(P);
      },
      remoteUpdateHostsMask : function(Q, R){

        Q.setHostsMask(R);
      }
    },
    events : {
      "changeUserFlags" : f,
      "changeHostsMask" : f
    }
  });
})();
(function(){

  var a = "download_file",b = "set",c = "cneh",d = "update_unit_phone",e = "changeAccessPassword",f = "update_unit_uid",g = "qx.event.type.Data",h = "check_config",i = "changeDeviceTypeId",j = "changeMessageParams",k = "changeDriverCode",l = "pos",m = "unit/update_traffic_counter",n = "update_unit_trip_cfg",o = "update_alias",p = "unit/update_mileage_counter",q = "update_msgs_filter_cfg",r = "update_unit_milcounter",s = "delete_unit_msg",t = "unit/update_calc_flags",u = "bind_unit_trailer",v = "delete_alias",w = "unit/update_eh_counter",x = "&time=",y = "changeUniqueId2",z = "changeLastMessage",A = "unbind_unit_driver",B = "hw",C = "update_unit_calcflags",D = "ud",E = "get",F = "&msgIndex=",G = "psw",H = "update_unit_phone2",I = "cfl",J = "uid2",K = "avl_unit",L = "ph",M = "import_unit_msgs",N = "uid",O = "unit/exec_cmd",P = "update_unit_bytecounter",Q = "create_alias",R = "lmsg",S = "changePhoneNumber2",T = "changeMileageCounter",U = "&svc=unit/update_hw_params&params=",V = "unit/update_access_password",W = "function",X = "delete_service_interval",Y = "changeTrafficCounter",ce = "wialon.item.Unit",cf = "changePhoneNumber",cg = "Object",ca = "changeNetConn",cb = "unit/update_unique_id2",cc = "update_unit_report_cfg",cd = "/avl_msg_photo.jpeg?sid=",cl = "update_unit_pass",cm = "cmds",cn = "ph2",co = "changeUniqueId",ch = "changeCalcFlags",ci = "unbind_unit_trailer",cj = "unit/update_device_type",ck = "unit/update_phone",cs = "bind_unit_driver",cR = "update_unit_hw",cS = "prms",ct = "account/change_account",cp = "object",cq = "changeEngineHoursCounter",cU = "unit/update_phone2",cr = "cnkb",cu = "update_unit_ehcounter",cv = "update_sensor",cw = "Integer",cA = "changePosition",cV = "update_unit_fuel_cfg",cB = "update_unit_uid2",cx = "Array",cy = "String",cT = "netconn",cz = "",cF = "update_service_interval",cG = "cnm",cH = "changeCommands",cI = "v1311",cC = "create_sensor",cD = "drv",cW = "unit/get_command_definition_data",cE = "unit/update_hw_params",cM = "update_unit_hw_config",cN = "delete_sensor",cY = "/adfurl",cO = "create_service_interval",cJ = "/wialon/ajax.html?sid=",cK = "import_unit_cfg",cX = "&unitIndex=",cL = "delete_unit_msgs",cP = "create_unit",cQ = "undefined";
  qx.Class.define(ce, {
    extend : wialon.item.Item,
    properties : {
      uniqueId : {
        init : null,
        check : cy,
        event : co
      },
      uniqueId2 : {
        init : null,
        check : cy,
        event : y
      },
      deviceTypeId : {
        init : null,
        check : cw,
        event : i
      },
      phoneNumber : {
        init : null,
        check : cy,
        event : cf
      },
      phoneNumber2 : {
        init : null,
        check : cy,
        event : S
      },
      accessPassword : {
        init : null,
        check : cy,
        event : e
      },
      commands : {
        init : null,
        check : cx,
        event : cH
      },
      position : {
        init : null,
        check : cg,
        event : cA,
        nullable : true
      },
      lastMessage : {
        init : null,
        check : cg,
        event : z,
        nullable : true
      },
      prevMessage : {
        init : null,
        check : cg,
        nullable : true
      },
      driverCode : {
        init : null,
        check : cy,
        event : k
      },
      calcFlags : {
        init : null,
        check : cw,
        event : ch
      },
      mileageCounter : {
        init : null,
        check : cw,
        event : T
      },
      engineHoursCounter : {
        init : null,
        check : cw,
        event : cq
      },
      trafficCounter : {
        init : null,
        check : cw,
        event : Y
      },
      messageParams : {
        init : null,
        check : cg,
        event : j,
        nullable : true
      },
      netConn : {
        init : 0,
        check : cw,
        event : ca
      }
    },
    members : {
      remoteCommand : function(db, da, dc, df, de, dd){

        if(de && typeof de == W){

          dd = de;
          de = 0;
        };
        return wialon.core.Remote.getInstance().remoteCall(O, {
          itemId : this.getId(),
          commandName : db,
          linkType : da,
          param : dc,
          timeout : df,
          flags : de
        }, wialon.util.Helper.wrapCallback(dd));
      },
      remoteCommandDefinitions : function(dh, dg){

        return wialon.core.Remote.getInstance().remoteCall(cW, {
          itemId : this.getId(),
          col : dh.commands
        }, wialon.util.Helper.wrapCallback(dg));
      },
      updateDeviceSettings : function(dk, dj, di){

        return wialon.core.Remote.getInstance().remoteCall(cj, {
          itemId : this.getId(),
          deviceTypeId : dk,
          uniqueId : dj
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(di)));
      },
      updateUniqueId2 : function(dl, dm){

        return wialon.core.Remote.getInstance().remoteCall(cb, {
          itemId : this.getId(),
          uniqueId2 : dl
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(dm)));
      },
      updatePhoneNumber : function(dp, dn){

        return wialon.core.Remote.getInstance().remoteCall(ck, {
          itemId : this.getId(),
          phoneNumber : dp
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(dn)));
      },
      updatePhoneNumber2 : function(dr, dq){

        return wialon.core.Remote.getInstance().remoteCall(cU, {
          itemId : this.getId(),
          phoneNumber : dr
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(dq)));
      },
      updateAccessPassword : function(dt, ds){

        return wialon.core.Remote.getInstance().remoteCall(V, {
          itemId : this.getId(),
          accessPassword : dt
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(ds)));
      },
      updateMileageCounter : function(dv, du){

        return wialon.core.Remote.getInstance().remoteCall(p, {
          itemId : this.getId(),
          newValue : dv
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(du)));
      },
      updateEngineHoursCounter : function(dx, dw){

        return wialon.core.Remote.getInstance().remoteCall(w, {
          itemId : this.getId(),
          newValue : dx
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(dw)));
      },
      updateTrafficCounter : function(dz, dA, dy){

        return wialon.core.Remote.getInstance().remoteCall(m, {
          itemId : this.getId(),
          newValue : dz,
          regReset : dA || 0
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(dy)));
      },
      updateCalcFlags : function(dC, dB){

        return wialon.core.Remote.getInstance().remoteCall(t, {
          itemId : this.getId(),
          newValue : dC
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(dB)));
      },
      changeAccount : function(dE, dD){

        return wialon.core.Remote.getInstance().remoteCall(ct, {
          itemId : this.getId(),
          resourceId : dE.resourceId
        }, wialon.util.Helper.wrapCallback(dD));
      },
      handleMessage : function(dG){

        if(dG && dG.tp == D){

          var dF = this.getLastMessage();
          if(!dF || dF.t < dG.t){

            if(!dF){

              this.setLastMessage(dG);
              this.setPrevMessage(dF);
            } else {

              var dJ = qx.lang.Object.clone(dG);
              if(dG.p)dJ.p = qx.lang.Object.clone(dG.p);
              if(wialon.core.Session.getInstance().getVersion() == cI){

                qx.lang.Object.mergeWith(dJ, dF, 0);
                if(dF.p)qx.lang.Object.mergeWith(dJ.p, dF.p, 0);
              };
              if(!dJ.pos)dJ.pos = dF.pos;
              this.setLastMessage(dJ);
              this.setPrevMessage(dF);
            };
          };
          if(dG.pos){

            var dI = this.getPosition();
            if(!dI || dI.t < dG.t){

              var dH = qx.lang.Object.clone(dG.pos);
              dH.t = dG.t;
              this.setPosition(dH);
            };
          };
        };
        wialon.item.Item.prototype.handleMessage.call(this, dG);
      },
      getMessageImageUrl : function(dM, dK, dL){

        if(!dL)dL = cz;
        return wialon.core.Session.getInstance().getBaseUrl() + cY + dL + cd + wialon.core.Session.getInstance().getId() + x + dM + cX + this.getId() + F + dK;
      },
      downloadHwParamFile : function(dO, dP, dN){

        return wialon.core.Session.getInstance().getBaseUrl() + cJ + wialon.core.Session.getInstance().getId() + U + qx.lang.Json.stringify({
          itemId : this.getId(),
          hwId : dO,
          fileId : dP,
          action : a
        });
      },
      updateHwParams : function(dR, dS, dQ, dT){

        if(dQ && dQ.length && (typeof dS.full_data != cQ && !dS.full_data))wialon.core.Uploader.getInstance().uploadFiles(dQ, cE, {
          itemId : this.getId(),
          hwId : dR,
          params_data : dS,
          action : b
        }, wialon.util.Helper.wrapCallback(dT), true, 30000); else return wialon.core.Remote.getInstance().remoteCall(cE, {
          itemId : this.getId(),
          hwId : dR,
          params_data : dS,
          action : b
        }, wialon.util.Helper.wrapCallback(dT));
      }
    },
    statics : {
      dataFlag : {
        restricted : 0x00000100,
        commands : 0x00000200,
        lastMessage : 0x00000400,
        driverCode : 0x00000800,
        sensors : 0x00001000,
        counters : 0x00002000,
        routeControl : 0x00004000,
        maintenance : 0x00008000,
        log : 0x00010000,
        reportSettings : 0x00020000,
        other : 0x00040000,
        commandAliases : 0x00080000,
        messageParams : 0x00100000,
        netConn : 0x00200000
      },
      accessFlag : {
        editDevice : 0x100000,
        editSensors : 0x200000,
        editCounters : 0x400000,
        deleteMessages : 0x800000,
        executeCommands : 0x1000000,
        registerEvents : 0x2000000,
        viewRoutes : 0x4000000,
        editRoutes : 0x8000000,
        viewServiceIntervals : 0x10000000,
        editServiceIntervals : 0x20000000,
        importMessages : 0x40000000,
        exportMessages : 0x80000000,
        viewCmdAliases : 0x400000000,
        editCmdAliases : 0x800000000,
        viewEvents : 0x1000000000,
        editEvents : 0x2000000000,
        editReportSettings : 0x4000000000,
        monitorState : 0x8000000000
      },
      calcFlag : {
        mileageMask : 0xF,
        mileageGps : 0x0,
        mileageAbsOdometer : 0x1,
        mileageRelOdometer : 0x2,
        mileageGpsIgn : 0x3,
        engineHoursMask : 0xF0,
        engineHoursIgn : 0x10,
        engineHoursAbs : 0x20,
        engineHoursRel : 0x40,
        mileageAuto : 0x100,
        engineHoursAuto : 0x200,
        trafficAuto : 0x400
      },
      dataMessageFlag : {
        position : 0x1,
        inputs : 0x2,
        outputs : 0x4,
        alarm : 0x10,
        driverCode : 0x20,
        imported : 0x40
      },
      eventMessageFlag : {
        typeMask : 0x0F,
        typeSimple : 0x0,
        typeViolation : 0x1,
        typeMaintenance : 0x2,
        typeRouteControl : 0x4,
        typeDrivingInfo : 0x8,
        maintenanceMask : 0x0,
        maintenanceService : 0x10,
        maintenanceFilling : 0x20
      },
      execCmdFlag : {
        primaryPhone : 0x01,
        secondaryPhone : 0x02
      },
      logMessageAction : {
        unitCreated : cP,
        unitUpdatedPassword : cl,
        unitUpdatedPhone : d,
        unitUpdatedPhone2 : H,
        unitUpdatedCalcFlags : C,
        unitChangeMilageCounter : r,
        unitChangeByteCounter : P,
        unitChangeEngineHoursCounter : cu,
        unitUpdatedUniqueId : f,
        unitUpdatedUniqueId2 : cB,
        unitUpdatedHwType : cR,
        unitUpdatedHwConfig : cM,
        unitUpdatedFuelConsumptionSettings : cV,
        unitUpdatedTripDetectorSettings : n,
        unitCreatedSensor : cC,
        unitUpdatedSensor : cv,
        unitDeletedSensor : cN,
        unitCreatedCommandAlias : Q,
        unitUpdatedCommandAlias : o,
        unitDeletedCommandAlias : v,
        unitCreatedServiceInterval : cO,
        unitUpdatedServiceInterval : cF,
        unitDeletedServiceInterval : X,
        unitSettingsImported : cK,
        unitMessagesImported : M,
        unitMessageDeleted : s,
        unitMessagesDeleted : cL,
        unitDriverBinded : cs,
        unitDriverUnbinded : A,
        unitTrailerBinded : u,
        unitTrailerUnbinded : ci,
        unitReportSettingsUpdated : cc,
        unitMessagesFilterSettingsUpdated : q
      },
      registerProperties : function(){

        var dU = wialon.core.Session.getInstance();
        dU.registerConstructor(K, wialon.item.Unit);
        dU.registerProperty(N, this.remoteUpdateUniqueId);
        dU.registerProperty(J, this.remoteUpdateUniqueId2);
        dU.registerProperty(B, this.remoteUpdateDeviceTypeId);
        dU.registerProperty(L, this.remoteUpdatePhoneNumber);
        dU.registerProperty(cn, this.remoteUpdatePhoneNumber2);
        dU.registerProperty(G, this.remoteUpdateAccessPassword);
        dU.registerProperty(cm, this.remoteUpdateCommands);
        dU.registerProperty(l, this.remoteUpdatePosition);
        dU.registerProperty(R, this.remoteUpdateLastMessage);
        dU.registerProperty(cD, this.remoteUpdateDriverCode);
        dU.registerProperty(I, this.remoteUpdateCalcFlags);
        dU.registerProperty(cG, this.remoteUpdateMileageCounter);
        dU.registerProperty(c, this.remoteUpdateEngineHoursCounter);
        dU.registerProperty(cr, this.remoteUpdateTrafficCounter);
        dU.registerProperty(cS, this.remoteUpdateMessageParams);
        dU.registerProperty(cT, this.remoteUpdateNetConn);
        wialon.item.MIcon.registerIconProperties();
      },
      remoteUpdateUniqueId : function(dV, dW){

        dV.setUniqueId(dW);
      },
      remoteUpdateUniqueId2 : function(dX, dY){

        dX.setUniqueId2(dY);
      },
      remoteUpdateDeviceTypeId : function(ea, eb){

        ea.setDeviceTypeId(eb);
      },
      remoteUpdatePhoneNumber : function(ec, ed){

        ec.setPhoneNumber(ed);
      },
      remoteUpdatePhoneNumber2 : function(ee, ef){

        ee.setPhoneNumber2(ef);
      },
      remoteUpdateAccessPassword : function(eg, eh){

        eg.setAccessPassword(eh);
      },
      remoteUpdateCommands : function(ei, ej){

        ei.setCommands(ej);
      },
      remoteUpdatePosition : function(ek, el){

        ek.setPosition(el);
      },
      remoteUpdateLastMessage : function(em, en){

        em.setLastMessage(en);
      },
      remoteUpdateDriverCode : function(eo, ep){

        eo.setDriverCode(ep);
      },
      remoteUpdateCalcFlags : function(eq, er){

        eq.setCalcFlags(er);
      },
      remoteUpdateMileageCounter : function(es, et){

        es.setMileageCounter(et);
      },
      remoteUpdateEngineHoursCounter : function(eu, ev){

        eu.setEngineHoursCounter(ev);
      },
      remoteUpdateTrafficCounter : function(ew, ex){

        ew.setTrafficCounter(ex);
      },
      remoteUpdateMessageParams : function(ez, eB){

        if(typeof eB != cp)return;
        var ey = ez.getMessageParams();
        if(!ey)ey = {
        }; else ey = qx.lang.Object.clone(ey);
        for(var eA in eB){

          if(typeof eB[eA] == cp)ey[eA] = eB[eA]; else if(typeof ey[eA] == cp)ey[eA].at = eB[eA];;
        };
        ez.setMessageParams(ey);
      },
      remoteUpdateNetConn : function(eC, eD){

        eC.setNetConn(eD);
      },
      checkHwConfig : function(eF, eE){

        return wialon.core.Remote.getInstance().remoteCall(cE, {
          hwId : eF,
          action : h
        }, wialon.util.Helper.wrapCallback(eE));
      },
      getHwParams : function(eJ, eI, eH, eG){

        return wialon.core.Remote.getInstance().remoteCall(cE, {
          itemId : eJ,
          hwId : eI,
          fullData : eH ? 1 : 0,
          action : E
        }, wialon.util.Helper.wrapCallback(eG));
      }
    },
    events : {
      "changeUniqueId" : g,
      "changeUniqueId2" : g,
      "changeDeviceTypeId" : g,
      "changePhoneNumber" : g,
      "changePhoneNumber2" : g,
      "changeAccessPassword" : g,
      "changeCommands" : g,
      "changePosition" : g,
      "changeLastMessage" : g,
      "changeDriverCode" : g,
      "changeCalcFlags" : g,
      "changeMileageCounter" : g,
      "changeEngineHoursCounter" : g,
      "changeTrafficCounter" : g,
      "changeMessageParams" : g,
      "changeNetConn" : g
    }
  });
})();
(function(){

  var a = "ugi",b = "undefined",c = "wialon.item.MIcon",d = "qx.event.type.Data",e = "number",f = "changeIconUri",g = ".png",h = "string",i = "changeIcon",j = "?b=",k = "unit/upload_image",l = "/avl_item_image/",m = "/",n = "Integer",o = "String",p = "unit/update_image",q = "uri";
  qx.Mixin.define(c, {
    properties : {
      iconCookie : {
        init : null,
        check : n,
        event : i
      },
      iconUri : {
        init : null,
        check : o,
        event : f
      }
    },
    members : {
      getIconUrl : function(s){

        if(typeof s == b || !s)s = 32;
        var r = this.getIconUri();
        if(r)return wialon.core.Session.getInstance().getBaseUrl() + r + j + s;
        return wialon.core.Session.getInstance().getBaseUrl() + l + this.getId() + m + s + m + this.getIconCookie() + g;
      },
      updateIcon : function(t, u){

        if(typeof t == h)return wialon.core.Uploader.getInstance().uploadFiles([], k, {
          fileUrl : t,
          itemId : this.getId()
        }, u, true); else if(typeof t == e)return wialon.core.Remote.getInstance().remoteCall(p, {
          itemId : this.getId(),
          oldItemId : t
        }, u);;
        return wialon.core.Uploader.getInstance().uploadFiles([t], k, {
          itemId : this.getId()
        }, u, true);
      },
      updateIconLibrary : function(w, v, x){

        wialon.core.Remote.getInstance().remoteCall(p, {
          itemId : this.getId(),
          libId : w,
          path : v
        }, x);
      }
    },
    statics : {
      registerIconProperties : function(){

        var y = wialon.core.Session.getInstance();
        y.registerProperty(a, this.remoteUpdateIconCookie);
        y.registerProperty(q, this.remoteUpdateIconUri);
      },
      remoteUpdateIconCookie : function(z, A){

        z.setIconCookie(A);
      },
      remoteUpdateIconUri : function(B, C){

        B.setIconUri(C);
      }
    },
    events : {
      "changeIcon" : d,
      "changeIconUri" : d
    }
  });
})();
(function(){

  var a = "create_resource",b = "import_zones",c = "delete_notify",d = "create_driver",e = "update_driver",f = "switch_job",g = "update_driver_units",h = "avl_resource",i = "update_zone",j = "create_drivers_group",k = "delete_drivers_group",l = "update_report",m = "delete_driver",n = "create_zone",o = "delete_zone",p = "update_poi",q = "delete_job",r = "update_notify",s = "wialon.item.Resource",t = "create_notify",u = "update_drivers_group",v = "delete_report",w = "delete_poi",x = "switch_notify",y = "create_report",z = "update_job",A = "import_pois",B = "create_job",C = "create_poi";
  qx.Class.define(s, {
    extend : wialon.item.Item,
    statics : {
      dataFlag : {
        drivers : 0x00000100,
        jobs : 0x00000200,
        notifications : 0x00000400,
        poi : 0x00000800,
        zones : 0x00001000,
        reports : 0x00002000,
        agro : 0x01000000,
        driverUnits : 0x00004000,
        driverGroups : 0x00008000,
        trailers : 0x00010000,
        trailerGroups : 0x00020000,
        trailerUnits : 0x00040000
      },
      accessFlag : {
        viewNotifications : 0x100000,
        editNotifications : 0x200000,
        viewPoi : 0x400000,
        editPoi : 0x800000,
        viewZones : 0x1000000,
        editZones : 0x2000000,
        viewJobs : 0x4000000,
        editJobs : 0x8000000,
        viewReports : 0x10000000,
        editReports : 0x20000000,
        viewDrivers : 0x40000000,
        editDrivers : 0x80000000,
        manageAccount : 0x100000000,
        agroEditCultivations : 0x10000000000,
        agroView : 0x20000000000,
        agroEdit : 0x40000000000,
        viewDriverGroups : 0x40000000,
        editDriverGroups : 0x80000000,
        viewDriverUnits : 0x40000000,
        editDriverUnits : 0x80000000,
        viewTrailers : 0x100000000000,
        editTrailers : 0x200000000000,
        viewTrailerGroups : 0x100000000000,
        editTrailerGroups : 0x200000000000,
        viewTrailerUnits : 0x100000000000,
        editTrailerUnits : 0x200000000000
      },
      logMessageAction : {
        resourceCreated : a,
        resourceCreatedZone : n,
        resourceUpdatedZone : i,
        resourceDeletedZone : o,
        resourceCreatedPoi : C,
        resourceUpdatedPoi : p,
        resourceDeletedPoi : w,
        resourceCreatedJob : B,
        resourceSwitchedJob : f,
        resourceUpdatedJob : z,
        resourceDeletedJob : q,
        resourceCreatedNotification : t,
        resourceSwitchedNotification : x,
        resourceUpdatedNotification : r,
        resourceDeletedNotification : c,
        resourceCreatedDriver : d,
        resourceUpdatedDriver : e,
        resourceDeletedDriver : m,
        resourceCreatedDriversGroup : j,
        resourceUpdatedDriversGroup : u,
        resourceDeletedDriversGroup : k,
        resourceUpdatedDriverUnits : g,
        resourceCreatedReport : y,
        resourceUpdatedReport : l,
        resourceDeletedReport : v,
        resourceImportedPois : A,
        resourceImportedZones : b
      },
      registerProperties : function(){

        var D = wialon.core.Session.getInstance();
        D.registerConstructor(h, wialon.item.Resource);
      }
    }
  });
})();
(function(){

  var a = "create_group",b = "Array",c = "u",d = "wialon.item.UnitGroup",e = "avl_unit",f = "avl_unit_group",g = "units_group",h = "qx.event.type.Data",i = "changeUnits",j = "unit_group/update_units";
  qx.Class.define(d, {
    extend : wialon.item.Item,
    properties : {
      units : {
        init : null,
        check : b,
        event : i
      }
    },
    members : {
      updateUnits : function(k, l){

        return wialon.core.Remote.getInstance().remoteCall(j, {
          itemId : this.getId(),
          units : k
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(l)));
      }
    },
    statics : {
      registerProperties : function(){

        var m = wialon.core.Session.getInstance();
        m.registerConstructor(f, wialon.item.UnitGroup);
        m.registerProperty(c, this.remoteUpdateUnits);
        wialon.item.MIcon.registerIconProperties();
      },
      logMessageAction : {
        unitGroupCreated : a,
        unitGroupUnitsUpdated : g
      },
      remoteUpdateUnits : function(n, p){

        var o = n.getUnits();
        if(o && wialon.util.Json.compareObjects(p, o))return;
        n.setUnits(p);
      },
      checkUnit : function(q, s){

        if(!q || q.getType() != f || !s || s.getType() != e)return false;
        var r = q.getUnits();
        var t = s.getId();
        return (r.indexOf(t) != -1 ? true : false);
      }
    },
    events : {
      "changeUnits" : h
    }
  });
})();
(function(){

  var a = "changeConfig",b = "update_retranslator",c = "retranslator/update_units",d = "units_retranslator",e = "Boolean",f = "changeOperating",g = "create_retranslator",h = "changeStopTime",i = "changeUnits",j = "avl_retranslator",k = "retranslator/update_config",l = "rtru",m = "qx.event.type.Data",n = "switch_retranslator",o = "retranslator/update_operating",p = "rtro",q = "rtrst",r = "rtrc",s = "Integer",t = "wialon.item.Retranslator",u = "Object";
  qx.Class.define(t, {
    extend : wialon.item.Item,
    properties : {
      operating : {
        init : null,
        check : e,
        event : f
      },
      stopTime : {
        init : null,
        check : s,
        event : h
      },
      config : {
        init : null,
        check : u,
        event : a
      },
      units : {
        init : null,
        check : u,
        event : i
      }
    },
    members : {
      updateOperating : function(w, v){

        return wialon.core.Remote.getInstance().remoteCall(o, {
          itemId : this.getId(),
          operate : w
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(v)));
      },
      updateOperatingWithTimeout : function(B, z, A, x){

        var y;
        if(A)y = z; else y = wialon.core.Session.getInstance().getServerTime() + z;
        return wialon.core.Remote.getInstance().remoteCall(o, {
          itemId : this.getId(),
          operate : B,
          stopTime : y
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(x)));
      },
      updateConfig : function(D, C){

        return wialon.core.Remote.getInstance().remoteCall(k, {
          itemId : this.getId(),
          config : D
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(C)));
      },
      updateUnits : function(E, F){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          units : E
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(F)));
      }
    },
    statics : {
      dataFlag : {
        state : 0x00000100,
        units : 0x00000200
      },
      accessFlag : {
        editSettings : 0x100000,
        editUnits : 0x200000
      },
      logMessageAction : {
        retranslatorCreated : g,
        retranslatorUpdated : b,
        retranslatorUnitsUpdated : d,
        retranslatorSwitched : n
      },
      registerProperties : function(){

        var G = wialon.core.Session.getInstance();
        G.registerConstructor(j, wialon.item.Retranslator);
        G.registerProperty(p, this.remoteUpdateOperating);
        G.registerProperty(q, this.remoteUpdateStopTime);
        G.registerProperty(r, this.remoteUpdateConfig);
        G.registerProperty(l, this.remoteUpdateUnits);
      },
      remoteUpdateOperating : function(H, I){

        H.setOperating(I ? true : false);
      },
      remoteUpdateStopTime : function(J, K){

        J.setStopTime(K);
      },
      remoteUpdateConfig : function(L, M){

        L.setConfig(M ? M : {
        });
      },
      remoteUpdateUnits : function(N, P){

        var O = N.getUnits();
        if(O && wialon.util.Json.compareObjects(P, O))return;
        N.setUnits(P);
      }
    },
    events : {
      "changeOperating" : m,
      "changeStopTime" : m,
      "changeConfig" : m,
      "changeUnits" : m
    }
  });
})();
(function(){

  var a = "create_schedule",b = "update_route_points",c = "rpts",d = "route/get_schedule_time",e = "update_round",f = "Object",g = "update_route_cfg",h = "delete_round",i = "Array",j = "route/load_rounds",k = "update_schedule",l = "wialon.item.Route",m = "qx.event.type.Data",n = "delete_schedule",o = "create_route",p = "route/get_all_rounds",q = "changeConfig",r = "changeCheckPoints",s = "route/update_checkpoints",t = "rcfg",u = "create_round",v = "route/update_config",w = "avl_route";
  qx.Class.define(l, {
    extend : wialon.item.Item,
    properties : {
      config : {
        init : null,
        check : f,
        nullable : true,
        event : q
      },
      checkPoints : {
        init : null,
        check : i,
        event : r
      }
    },
    members : {
      updateConfig : function(y, x){

        return wialon.core.Remote.getInstance().remoteCall(v, {
          itemId : this.getId(),
          config : y
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(x)));
      },
      getNextRoundTime : function(A, B, C, z){

        return wialon.core.Remote.getInstance().remoteCall(d, {
          itemId : this.getId(),
          scheduleId : A,
          timeFrom : B,
          timeTo : C
        }, wialon.util.Helper.wrapCallback(z));
      },
      loadRoundsHistory : function(E, F, D, G){

        return wialon.core.Remote.getInstance().remoteCall(j, {
          itemId : this.getId(),
          timeFrom : E,
          timeTo : F,
          fullJson : D
        }, wialon.util.Helper.wrapCallback(G));
      },
      updateCheckPoints : function(I, H){

        return wialon.core.Remote.getInstance().remoteCall(s, {
          itemId : this.getId(),
          checkPoints : I
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(H)));
      },
      getRouteRounds : function(K, L, J, M){

        return wialon.core.Remote.getInstance().remoteCall(p, {
          itemId : this.getId(),
          timeFrom : K,
          timeTo : L,
          fullJson : J
        }, wialon.util.Helper.wrapCallback(M));
      }
    },
    statics : {
      dataFlag : {
        config : 0x00000100,
        checkPoints : 0x00000200,
        schedules : 0x00000400,
        rounds : 0x00000800
      },
      accessFlag : {
        editSettings : 0x100000
      },
      states : {
        stateInactive : 0x010000,
        stateFinshed : 0x020000,
        stateCheckingArrive : 0x040000,
        stateCheckingDeparture : 0x080000,
        stateTimeLate : 0x200000,
        stateTimeEarly : 0x400000,
        stateDisabled : 0x800000,
        stateAborted : 0x0100000,
        eventControlStarted : 0x1,
        eventControlFinished : 0x2,
        eventControlAborted : 0x4,
        eventPointArrived : 0x8,
        eventPointSkipped : 0x10,
        eventPointDepartured : 0x20,
        eventControlLate : 0x40,
        eventControlEarly : 0x80,
        eventControlInTime : 0x100
      },
      routePointFlag : {
        simple : 0x1,
        geozone : 0x2,
        unit : 0x4
      },
      scheduleFlag : {
        relative : 0x1,
        relativeDaily : 0x2,
        absolute : 0x4
      },
      roundFlag : {
        autoDelete : 0x2,
        allowSkipPoints : 0x10,
        generateEvents : 0x20,
        arbituaryPoints : 0x40
      },
      logMessageAction : {
        routeCreated : o,
        routeUpdatedPoints : b,
        routeUpdatedConfiguration : g,
        routeCreatedRound : u,
        routeUpdatedRound : e,
        routeDeletedRound : h,
        routeCreatedSchedule : a,
        routeUpdatedSchedule : k,
        routeDeletedSchedule : n
      },
      registerProperties : function(){

        var N = wialon.core.Session.getInstance();
        N.registerConstructor(w, wialon.item.Route);
        N.registerProperty(c, this.remoteUpdateCheckPoints);
        N.registerProperty(t, this.remoteUpdateConfig);
      },
      remoteUpdateCheckPoints : function(O, P){

        O.setCheckPoints(P);
      },
      remoteUpdateConfig : function(Q, R){

        Q.setConfig(R);
      }
    },
    events : {
      "changeCheckPoints" : m,
      "changeConfig" : m
    }
  });
})();
(function(){

  var a = "render/create_poi_layer",b = "function",c = ".png",d = "report",e = "wialon.render.Renderer",f = "__eP",g = "render/remove_all_layers",h = "Integer",j = "Object",k = "qx.event.type.Event",l = "render/create_messages_layer",m = "/",n = "render/remove_layer",o = "",p = "__eJ",q = "number",r = "_",s = "/avl_hittest_pos",t = "render/set_locale",u = "/adfurl",v = "render/enable_layer",w = "changeVersion",A = "render/create_zones_layer",B = "/avl_render/",C = "undefined",D = "object";
  qx.Class.define(e, {
    extend : qx.core.Object,
    construct : function(){

      qx.core.Object.call(this);
      this.__eJ = new Array;
    },
    properties : {
      version : {
        init : 0,
        check : h,
        event : w
      },
      reportResult : {
        init : null,
        check : j,
        nullable : true,
        apply : f
      }
    },
    members : {
      __eJ : null,
      getLayers : function(){

        return this.__eJ;
      },
      getReportLayer : function(){

        for(var i = 0;i < this.__eJ.length;i++)if(this.__eJ[i].getName().substr(0, 6) == d)return this.__eJ[i];;
        return null;
      },
      getTileUrl : function(x, y, z){

        return wialon.core.Session.getInstance().getBaseUrl() + u + this.getVersion() + B + x + r + y + r + (17 - z) + m + wialon.core.Session.getInstance().getId() + c;
      },
      setLocale : function(J, E, F, G){

        var H = 0;
        var I = o;
        if(F && typeof F == b){

          G = F;
        } else if(F && typeof F == q){

          H = F;
        } else if(F && typeof F == D){

          H = F.flags;
          I = F.formatDate;
        };;
        return wialon.core.Remote.getInstance().remoteCall(t, {
          tzOffset : J,
          language : E,
          flags : H,
          formatDate : I
        }, wialon.util.Helper.wrapCallback(G));
      },
      createMessagesLayer : function(L, K){

        return wialon.core.Remote.getInstance().remoteCall(l, L, qx.lang.Function.bind(this.__eK, this, wialon.util.Helper.wrapCallback(K)));
      },
      createPoiLayer : function(N, O, P, M){

        for(var i = this.__eJ.length - 1;i >= 0;i--){

          if(this.__eJ[i].getName() == N){

            this.__eJ[i].dispose();
            qx.lang.Array.remove(this.__eJ, this.__eJ[i]);
          };
        };
        return wialon.core.Remote.getInstance().remoteCall(a, {
          layerName : N,
          pois : O,
          flags : P
        }, qx.lang.Function.bind(this.__eL, this, wialon.util.Helper.wrapCallback(M)));
      },
      createZonesLayer : function(R, Q, S, T){

        for(var i = this.__eJ.length - 1;i >= 0;i--){

          if(this.__eJ[i].getName() == R){

            this.__eJ[i].dispose();
            qx.lang.Array.remove(this.__eJ, this.__eJ[i]);
          };
        };
        return wialon.core.Remote.getInstance().remoteCall(A, {
          layerName : R,
          zones : Q,
          flags : S
        }, qx.lang.Function.bind(this.__eL, this, wialon.util.Helper.wrapCallback(T)));
      },
      removeLayer : function(V, U){

        return wialon.core.Remote.getInstance().remoteCall(n, {
          layerName : V.getName()
        }, qx.lang.Function.bind(this.__eM, this, wialon.util.Helper.wrapCallback(U), V));
      },
      enableLayer : function(X, Y, W){

        return wialon.core.Remote.getInstance().remoteCall(v, {
          layerName : X.getName(),
          enable : Y ? 1 : 0
        }, qx.lang.Function.bind(this.__eO, this, wialon.util.Helper.wrapCallback(W), X));
      },
      removeAllLayers : function(ba){

        return wialon.core.Remote.getInstance().remoteCall(g, {
        }, qx.lang.Function.bind(this.__eN, this, wialon.util.Helper.wrapCallback(ba)));
      },
      hitTest : function(bf, bc, bb, be, bh, bg, bd){

        var bi = 0;
        if(typeof bg == b)bd = bg; else if(typeof bg == q)bi = bg;;
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseUrl() + s, {
          sid : wialon.core.Session.getInstance().getId(),
          lat : bf,
          flags : bi,
          lon : bc,
          scale : bb,
          radius : be,
          layerName : o + bh
        }, wialon.util.Helper.wrapCallback(bd), 60);
      },
      __eK : function(bj, bl, bm){

        var bk = null;
        if(bl == 0 && bm){

          if(typeof bm.name != C){

            bk = new wialon.render.MessagesLayer(bm);
            this.__eJ.push(bk);
          };
          this.setVersion(this.getVersion() + 1);
        };
        bj(bl, bk);
      },
      __eL : function(bn, bp, bq){

        var bo = null;
        if(bp == 0 && bq){

          if(typeof bq.name != C){

            bo = new wialon.render.Layer(bq);
            this.__eJ.push(bo);
          };
          this.setVersion(this.getVersion() + 1);
        };
        bn(bp, bo);
      },
      __eM : function(br, bs, bt, bu){

        if(bt){

          br(bt);
          return;
        };
        qx.lang.Array.remove(this.__eJ, bs);
        bs.dispose();
        this.setVersion(this.getVersion() + 1);
        br(bt);
      },
      __eN : function(bv, bw, bx){

        if(bw){

          bv(bw);
          return;
        };
        if(this.__eJ.length){

          for(var i = 0;i < this.__eJ.length;i++)this.__eJ[i].dispose();
          qx.lang.Array.removeAll(this.__eJ);
          this.setVersion(this.getVersion() + 1);
        };
        bv(bw);
      },
      __eO : function(by, bz, bA, bC){

        if(bA){

          by(bA);
          return;
        };
        var bB = bC.enabled ? true : false;
        if(bB != bz.getEnabled()){

          bz.setEnabled(bB);
          this.setVersion(this.getVersion() + 1);
        };
        by(bA);
      },
      __eP : function(bD){

        var bE = false;
        for(var i = 0;i < this.__eJ.length;i++)if(this.__eJ[i].getName().substr(0, 6) == d){

          this.__eJ.splice(i, 1);
          bE = true;
          break;
        };
        if(bD){

          var bG = bD.getLayerData();
          if(bG){

            var bF = bG.units ? new wialon.render.MessagesLayer(bG) : new wialon.render.Layer(bG);
            this.__eJ.push(bF);
            bD.setLayer(bF);
            bE = true;
          };
        };
        if(bE)this.setVersion(this.getVersion() + 1);
      }
    },
    statics : {
      PoiFlag : {
        renderLabels : 0x01,
        enableGroups : 0x02
      },
      Hittest : {
        full : 0x01
      },
      ZonesFlag : {
        renderLabels : 0x01
      },
      MarkerFlag : {
        grouping : 0x0001,
        numbering : 0x0002,
        events : 0x0004,
        fillings : 0x0008,
        images : 0x0010,
        parkings : 0x0020,
        speedings : 0x0040,
        stops : 0x0080,
        thefts : 0x0100,
        usUnits : 0x0200,
        imUnits : 0x0400
      },
      OptionalFlag : {
        usMetrics : 0x01,
        imMetrics : 0x02
      }
    },
    destruct : function(){

      this._disposeArray(p);
    },
    events : {
      "changeVersion" : k
    }
  });
})();
(function(){

  var a = "wialon.render.Layer",b = "Boolean";
  qx.Class.define(a, {
    extend : qx.core.Object,
    construct : function(c){

      qx.core.Object.call(this, c);
      this._data = c;
    },
    properties : {
      enabled : {
        init : true,
        check : b
      }
    },
    members : {
      _data : null,
      getName : function(){

        return this._data.name;
      },
      getBounds : function(){

        return this._data.bounds;
      }
    }
  });
})();
(function(){

  var a = "&msgIndex=",b = "/adfurl",c = "/avl_hittest_time",d = "",e = "number",f = "&layerName=",g = "&unitIndex=",h = "/avl_msg_photo.jpeg?sid=",i = "wialon.render.MessagesLayer",j = "render/delete_message",k = "render/get_messages";
  qx.Class.define(i, {
    extend : wialon.render.Layer,
    members : {
      getUnitsCount : function(){

        return this._data.units ? this._data.units.length : 0;
      },
      getUnitId : function(l){

        if(typeof l != e)return this._data.units[0].id;
        return this._data.units[l >= 0 ? l : 0].id;
      },
      getMaxSpeed : function(m){

        if(typeof m != e)return this._data.units[0].max_speed;
        return this._data.units[m >= 0 ? m : 0].max_speed;
      },
      getMileage : function(n){

        if(typeof n != e)return this._data.units[0].mileage;
        return this._data.units[n >= 0 ? n : 0].mileage;
      },
      getMessagesCount : function(o){

        if(typeof o != e)return this._data.units[0].msgs.count;
        return this._data.units[o >= 0 ? o : 0].msgs.count;
      },
      getFirstPoint : function(p){

        if(typeof p != e)return this._data.units[0].msgs.first;
        return this._data.units[p >= 0 ? p : 0].msgs.first;
      },
      getLastPoint : function(q){

        if(typeof q != e)return this._data.units[0].msgs.last;
        return this._data.units[q >= 0 ? q : 0].msgs.last;
      },
      getMessageImageUrl : function(t, r, s){

        if(!s)s = d;
        return wialon.core.Session.getInstance().getBaseUrl() + b + s + h + wialon.core.Session.getInstance().getId() + f + this.getName() + g + t + a + r;
      },
      getMessages : function(x, w, u, v){

        return wialon.core.Remote.getInstance().remoteCall(k, {
          layerName : this.getName(),
          indexFrom : w,
          indexTo : u,
          unitId : this.getUnitId(x)
        }, wialon.util.Helper.wrapCallback(v));
      },
      deleteMessage : function(A, z, y){

        return wialon.core.Remote.getInstance().remoteCall(j, {
          layerName : this.getName(),
          msgIndex : z,
          unitId : this.getUnitId(A)
        }, wialon.util.Helper.wrapCallback(y));
      },
      hitTest : function(D, E, C, B){

        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseUrl() + c, {
          sid : wialon.core.Session.getInstance().getId(),
          unitId : this.getUnitId(D),
          layerName : this.getName(),
          time : E,
          revert : C ? true : false
        }, wialon.util.Helper.wrapCallback(B), 60);
      }
    },
    statics : {
    }
  });
})();
(function(){

  var a = "messages/delete_message",b = "wialon.core.MessagesLoader",c = "messages/load_last",d = "messages/unload",e = "messages/get_messages",f = "messages/get_messages_bin",g = "messages/load_interval";
  qx.Class.define(b, {
    extend : qx.core.Object,
    members : {
      loadInterval : function(h, i, k, m, j, n, l){

        return wialon.core.Remote.getInstance().remoteCall(g, {
          itemId : h,
          timeFrom : i,
          timeTo : k,
          flags : m,
          flagsMask : j,
          loadCount : n
        }, wialon.util.Helper.wrapCallback(l));
      },
      loadLast : function(o, u, q, s, p, t, r){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : o,
          lastTime : u,
          lastCount : q,
          flags : s,
          flagsMask : p,
          loadCount : t
        }, wialon.util.Helper.wrapCallback(r));
      },
      unload : function(v){

        return wialon.core.Remote.getInstance().remoteCall(d, {
        }, wialon.util.Helper.wrapCallback(v));
      },
      getMessages : function(y, w, x){

        return wialon.core.Remote.getInstance().remoteCall(e, {
          indexFrom : y,
          indexTo : w
        }, wialon.util.Helper.wrapCallback(x));
      },
      deleteMessage : function(A, z){

        return wialon.core.Remote.getInstance().remoteCall(a, {
          msgIndex : A
        }, wialon.util.Helper.wrapCallback(z));
      },
      getMessagesBin : function(B, C, E, G, D, H, F){

        return wialon.core.Remote.getInstance().remoteCall(f, {
          itemId : B,
          timeFrom : C,
          timeTo : E,
          flags : G,
          flagsMask : D,
          loadCount : H
        }, wialon.util.Helper.wrapCallback(F));
      }
    }
  });
})();
(function(){

  var a = "get",b = "Data",c = "undefined",d = "wialon.item.PluginsManager",e = "update",f = "wialon.item.M",g = "create",h = "set",j = "delete",k = "function",l = "mixinDef = wialon.item.M",m = "static",n = "modify",o = "remoteUpdate",p = "u",q = "object",r = "qx.event.type.Data",s = "remoteCreate",t = "string",u = "s",v = "Object";
  qx.Class.define(d, {
    type : m,
    statics : {
      bindPropItem : function(clazz, propName, itemName, ajaxPath, extAjaxPath){

        var itemNameUCase = itemName.substr(0, 1).toUpperCase() + itemName.substr(1);
        var multName = itemNameUCase + u;
        var mixinBody = {
          members : {
          },
          properties : {
          },
          statics : {
          },
          events : {
          }
        };
        mixinBody.events[e + itemNameUCase] = r;
        mixinBody.properties[itemName + u] = {
          init : null,
          check : v
        };
        mixinBody.members[a + itemNameUCase] = function(y){

          var x = this[a + multName]();
          if(!x)return null;
          var w = x[y];
          if(typeof w == c)return null;
          return w;
        };
        mixinBody.members[n + multName] = function(C, z, E){

          var A = this[a + multName]();
          var B = false;
          if(C && typeof C == q){

            B = C.skipFlag;
            C = wialon.util.Helper.wrapCallback(C.callback);
          } else {

            C = wialon.util.Helper.wrapCallback(C);
          };
          var D = null;
          if(z == 0 && A && E instanceof Array && E.length == 2){

            var G = E[0];
            D = E[1];
            var F = A[G];
            if(typeof F == c)F = null;
            if(D != null)A[G] = D; else if(F && !B)delete A[G];;
            if(!B && wialon.util.Json.stringify(D) != wialon.util.Json.stringify(F))this.fireDataEvent(e + itemNameUCase, D, F);
          };
          C(z, D);
        };
        if(ajaxPath && ajaxPath.length){

          mixinBody.members[g + itemNameUCase] = function(J, H, I){

            H = wialon.util.Helper.wrapCallback(H);
            if(J){

              J = qx.lang.Object.clone(J);
              J.itemId = this.getId();
              J.id = 0;
              J.callMode = g;
            };
            if(I)wialon.core.Uploader.getInstance().uploadFiles([I], ajaxPath, J, qx.lang.Function.bind(this[n + multName], this, H), true, 60); else return wialon.core.Remote.getInstance().remoteCall(ajaxPath, J, qx.lang.Function.bind(this[n + multName], this, H));
          };
          mixinBody.members[e + itemNameUCase] = function(N, L, K, M){

            L = wialon.util.Helper.wrapCallback(L);
            if(N){

              N = qx.lang.Object.clone(N);
              N.itemId = this.getId();
              N.callMode = typeof K == t ? K : e;
            };
            if(M)wialon.core.Uploader.getInstance().uploadFiles([M], ajaxPath, N, qx.lang.Function.bind(this[n + multName], this, L), true, 60); else return wialon.core.Remote.getInstance().remoteCall(ajaxPath, N, qx.lang.Function.bind(this[n + multName], this, L));
          };
          mixinBody.members[j + itemNameUCase] = function(Q, O, P){

            if(typeof P == c)P = false;
            O = wialon.util.Helper.wrapCallback(O);
            return wialon.core.Remote.getInstance().remoteCall(ajaxPath, {
              itemId : this.getId(),
              id : Q,
              callMode : j
            }, qx.lang.Function.bind(this[n + multName], this, {
              callback : O,
              skipFlag : P
            }));
          };
        };
        if(extAjaxPath && extAjaxPath.length){

          mixinBody.members[a + multName + b] = function(T, S, R){

            if(S && typeof S == k){

              R = S;
              S = 0;
            };
            R = wialon.util.Helper.wrapCallback(R);
            var U = {
              itemId : this.getId(),
              col : []
            };
            for(var i = 0;i < T.length;i++){

              if(typeof T[i].id == c)U.col.push(T[i]); else U.col.push(T[i].id);
            };
            U.flags = S;
            return wialon.core.Remote.getInstance().remoteCall(extAjaxPath, U, R);
          };
        };
        mixinBody.statics[s + itemNameUCase] = function(V, W){

          V[h + multName](W);
        };
        mixinBody.statics[o + itemNameUCase] = function(X, Y){

          X[n + multName](null, 0, Y);
        };
        var session = wialon.core.Session.getInstance();
        session.registerProperty(propName, qx.lang.Function.bind(mixinBody.statics[s + itemNameUCase], mixinBody));
        session.registerProperty(propName + p, qx.lang.Function.bind(mixinBody.statics[o + itemNameUCase], mixinBody));
        var mixinDef = null;
        eval(l + multName);
        if(qx.Class.hasMixin(clazz, mixinDef))return;
        var propMixin = qx.Mixin.define(f + multName, mixinBody);
        qx.Class.include(clazz, propMixin);
      }
    }
  });
})();
(function(){

  var a = "const0",b = "sats",c = "lon",d = '_',e = "speed",f = "string",g = '^',h = ']',j = "altitude",k = '(',l = ":",m = '*',n = '.',o = "time",p = "lat",q = '|',r = "",s = ':',t = "n",u = "const",v = "wialon.item.MUnitSensor",w = ' ',x = "out",y = "unit/calc_last_message",z = "course",A = '#',B = '/',C = '-',D = "unit/calc_sensors",E = '[',F = "in",G = ')',H = "undefined",I = '+';
  qx.Mixin.define(v, {
    members : {
      calculateSensorValue : function(J, K, L){

        if(!J)return wialon.item.MUnitSensor.invalidValue;
        if(typeof K == H || !K)K = null;
        if(typeof L == H || !L)L = null;
        return this.__eR(J, K, L, null);
      },
      remoteCalculateLastMessage : function(N, M){

        if(!N || !(N instanceof Array))N = [];
        return wialon.core.Remote.getInstance().remoteCall(y, {
          sensors : N,
          unitId : this.getId()
        }, wialon.util.Helper.wrapCallback(M));
      },
      remoteCalculateMsgs : function(S, R, O, Q, P){

        return wialon.core.Remote.getInstance().remoteCall(D, {
          source : S,
          unitId : this.getId(),
          indexFrom : R,
          indexTo : O,
          sensorId : Q
        }, wialon.util.Helper.wrapCallback(P));
      },
      remoteCalculateFilteredMsgs : function(V, U, T, X, Y, W){

        return wialon.core.Remote.getInstance().remoteCall(D, {
          source : V,
          unitId : this.getId(),
          indexFrom : U,
          indexTo : T,
          sensorId : X,
          width : Y
        }, wialon.util.Helper.wrapCallback(W));
      },
      getValue : function(ba, bb){

        if(!ba)return wialon.item.MUnitSensor.invalidValue;
        return this.__eS(ba.p, bb);
      },
      __eQ : {
      },
      __eR : function(bi, bj, bc, bh){

        if(!bi)return wialon.item.MUnitSensor.invalidValue;
        var be = false;
        var bg = bi.id;
        if(bh){

          if(bh[bg])return wialon.item.MUnitSensor.invalidValue;
        } else {

          bh = new Object;
          be = true;
        };
        bh[bg] = 1;
        var bd = this.__eU(bi, bj, bc, bh);
        if(typeof (bd) == f)return bd;
        if(bd != wialon.item.MUnitSensor.invalidValue)bd = this.__eT(bi, bd);
        if(bi.vs && bi.vt){

          var bf = this.getSensor(bi.vs);
          if(!bf){

            delete bh[bg];
            return wialon.item.MUnitSensor.invalidValue;
          };
          var bk = this.__eR(bf, bj, bc, bh);
          if(bd != wialon.item.MUnitSensor.invalidValue && bk != wialon.item.MUnitSensor.invalidValue){

            if(bi.vt == wialon.item.MUnitSensor.validation.logicalAnd){

              if(bd && bk)bd = 1; else bd = 0;
            } else if(bi.vt == wialon.item.MUnitSensor.validation.noneZero){

              if(!bk){

                delete bh[bg];
                bd = wialon.item.MUnitSensor.invalidValue;
              };
            } else if(bi.vt == wialon.item.MUnitSensor.validation.mathAnd){

              bd = Math.ceil(bk) & Math.ceil(bd);
            } else if(bi.vt == wialon.item.MUnitSensor.validation.logicalOr){

              if(bd || bk)bd = 1;
            } else if(bi.vt == wialon.item.MUnitSensor.validation.mathOr){

              bd = Math.ceil(bk) | Math.ceil(bd);
            } else if(bi.vt == wialon.item.MUnitSensor.validation.summarize)bd += bk; else if(bi.vt == wialon.item.MUnitSensor.validation.subtructValidator)bd -= bk; else if(bi.vt == wialon.item.MUnitSensor.validation.subtructValue)bd = bk - bd; else if(bi.vt == wialon.item.MUnitSensor.validation.multiply)bd *= bk; else if(bi.vt == wialon.item.MUnitSensor.validation.divideValidator){

              if(bk)bd /= bk; else bd = wialon.item.MUnitSensor.invalidValue;
            } else if(bi.vt == wialon.item.MUnitSensor.validation.divideValue){

              if(bd)bd = bk / bd; else bd = wialon.item.MUnitSensor.invalidValue;
            };;;;;;;;;;
          } else if(bi.vt == wialon.item.MUnitSensor.validation.replaceOnError){

            if(bd == wialon.item.MUnitSensor.invalidValue)bd = bk;
          } else bd = wialon.item.MUnitSensor.invalidValue;;
        };
        delete bh[bg];
        return bd;
      },
      __eS : function(bo, br){

        if(!br)return wialon.item.MUnitSensor.invalidValue;
        var bn = wialon.item.MUnitSensor.invalidValue;
        var bp = br.p;
        var bl = bo.split(l);
        if(bp && typeof bp[bl[0]] != H)bn = bp[bl[0]]; else if(bo == e){

          if(!br.pos)return wialon.item.MUnitSensor.invalidValue;
          bn = br.pos.s;
        } else if(bo == b){

          if(!br.pos)return wialon.item.MUnitSensor.invalidValue;
          bn = br.pos.sc;
        } else if(bo == j){

          if(!br.pos)return wialon.item.MUnitSensor.invalidValue;
          bn = br.pos.z;
        } else if(bo == z){

          if(!br.pos)return wialon.item.MUnitSensor.invalidValue;
          bn = br.pos.c;
        } else if(bo == p){

          if(!br.pos)return wialon.item.MUnitSensor.invalidValue;
          bn = br.pos.y;
        } else if(bo == c){

          if(!br.pos)return wialon.item.MUnitSensor.invalidValue;
          bn = br.pos.x;
        } else if(bo.substr(0, 2) == F){

          if(!(br.f & 0x2))return wialon.item.MUnitSensor.invalidValue;
          var bm = parseInt(bo.substr(2));
          if(bm < 1 || bm > 32 || isNaN(bm))return this.__eT(br.i);
          var bq = 1 << (bm - 1);
          bn = (br.i & bq) ? 1 : 0;
        } else if(bo.substr(0, 3) == x){

          if(!(br.f & 0x4))return wialon.item.MUnitSensor.invalidValue;
          var bm = parseInt(bo.substr(3));
          if(bm < 1 || bm > 32 || isNaN(bm))return this.__eT(br.o);
          var bq = 1 << (bm - 1);
          bn = (br.o & bq) ? 1 : 0;
        } else if(bo.substr(0, 5) == u){

          bn = parseFloat(bo.substr(5));
        } else if(bo.substr(0, 4) == o){

          bn = br.t;
        };;;;;;;;;;
        if(bl.length > 1 && bn != wialon.item.MUnitSensor.invalidValue){

          var bs = parseInt(bn);
          bn = (bs & (1 << (bl[1] - 1))) ? 1 : 0;
        };
        return bn;
      },
      __eT : function(bu, bt){

        if(!bu || isNaN(bt))return wialon.item.MUnitSensor.invalidValue;
        var bv = bt;
        for(var i = 0;i < bu.tbl.length;i++){

          if(i != 0 && bu.tbl[i].x > bt)return bv;
          bv = parseFloat(bu.tbl[i].a) * parseFloat(bt) + parseFloat(bu.tbl[i].b);
        };
        return bv;
      },
      __eU : function(bB, bD, bz, bA){

        if(!bB || typeof bB.p != f || !bB.p.length)return wialon.item.MUnitSensor.invalidValue;
        var by = this.__eQ[bB.p];
        if(typeof by == H){

          by = this.__eV(bB.p);
          if(!by.length)return wialon.item.MUnitSensor.invalidValue;
          this.__eQ[bB.p] = by;
        };
        var bC = [];
        var bw = 0;
        for(var i = 0;i < by.length;i++){

          var bx = by[i];
          var bE = bC.length;
          if(bx[0] == m && bE > 1){

            if((wialon.item.MUnitSensor.invalidValue == bC[bE - 2]) || (wialon.item.MUnitSensor.invalidValue == bC[bE - 1]))bC[bE - 2] = wialon.item.MUnitSensor.invalidValue; else bC[bE - 2] = bC[bE - 2] * bC[bE - 1];
            bC.pop();
          } else if(bx[0] == B && bE > 1){

            if((wialon.item.MUnitSensor.invalidValue == bC[bE - 2]) || (wialon.item.MUnitSensor.invalidValue == bC[bE - 1]) || (bC[bE - 1] == 0))bC[bE - 2] = wialon.item.MUnitSensor.invalidValue; else bC[bE - 2] = bC[bE - 2] / bC[bE - 1];
            bC.pop();
          } else if(bx[0] == I && bE > 1){

            if((wialon.item.MUnitSensor.invalidValue == bC[bE - 2]) || (wialon.item.MUnitSensor.invalidValue == bC[bE - 1]))bC[bE - 2] = wialon.item.MUnitSensor.invalidValue; else bC[bE - 2] = bC[bE - 2] + bC[bE - 1];
            bC.pop();
          } else if(bx[0] == C){

            if(bE > 1){

              if((wialon.item.MUnitSensor.invalidValue == bC[bE - 2]) || (wialon.item.MUnitSensor.invalidValue == bC[bE - 1]))bC[bE - 2] = wialon.item.MUnitSensor.invalidValue; else bC[bE - 2] = bC[bE - 2] - bC[bE - 1];
              bC.pop();
            } else if(bE == 1)bC[bE - 1] = -bC[bE - 1];;
          } else if(bx[0] == g && bE > 1){

            if((wialon.item.MUnitSensor.invalidValue == bC[bE - 2]) || (wialon.item.MUnitSensor.invalidValue == bC[bE - 1]))bC[bE - 2] = wialon.item.MUnitSensor.invalidValue; else bC[bE - 2] = Math.pow(bC[bE - 2], bC[bE - 1]);
            bC.pop();
          } else if(bx[0] == q && bE > 1){

            if(wialon.item.MUnitSensor.invalidValue == bC[bE - 2])bC[bE - 2] = bC[bE - 1];
            bC.pop();
          } else {

            if(bx[0] == E){

              var bB = wialon.util.Helper.searchObject(this.getSensors(), t, bx.slice(1));
              if(!bB){

                bC.push(wialon.item.MUnitSensor.invalidValue);
                continue;
              };
              bw = this.__eR(bB, bD, bz, bA);
              bC.push(bw);
            } else {

              bw = wialon.item.MUnitSensor.invalidValue;
              if(bx[0] == A)bw = this.__eS(bx.slice(1), bz); else bw = this.__eS(bx, bD);
              if(typeof (bw) == f)return bw;
              bC.push(bw);
            };
          };;;;;
        };
        return bC.length == 1 ? bC[0] : wialon.item.MUnitSensor.invalidValue;
      },
      __eV : function(bM){

        var bI = bM.length;
        var bP = r;
        var bN = [];
        var bJ = [];
        var bQ = 0;
        var bL = false;
        var bR = false;
        for(var i = 0;i < bI;i++){

          if(bM[i] == w){

            if(!bQ)continue;
          } else if(bM[i] == E)bL = true; else if(bM[i] == h)bL = false;;;
          var bO = bM[i].charCodeAt(0);
          var bH = (bO > 47 && bO < 58) || (bO > 64 && bO < 91) || (bO > 96 && bO < 123);
          if(bL || bH || bM[i] == d || bM[i] == A || bM[i] == n || bM[i] == s || (bM[i] == C && bP == u)){

            bP += bM[i];
            bQ++;
            if(i < bI - 1)continue;
          };
          if(bQ > 1 && this.__eW(bP) == -1){

            bR = false;
            bJ.push(bP);
          };
          bP = bM[i];
          var bG = this.__eW(bP);
          if(bG != -1){

            if(bM[i] == C && bR)bJ.push(a);
            if(bM[i] == k)bR = true; else bR = false;
            if(bN.length){

              if(bM[i] == k)bN.push(bP); else if(bM[i] == G){

                while(bN.length){

                  var bK = bN[bN.length - 1];
                  bN.pop();
                  if(bK[0] != k)bJ.push(bK); else break;
                };
              } else {

                while(bN.length){

                  var bK = bN[bN.length - 1];
                  var bF = this.__eW(bK);
                  if(bF >= bG){

                    if(bK[0] != k && bK[0] != G)bJ.push(bN[bN.length - 1]);
                    bN.pop();
                  } else break;
                };
                bN.push(bP);
              };
            } else bN.push(bP);
          };
          bP = r;
          bQ = 0;
        };
        while(bN.length){

          var bK = bN[bN.length - 1];
          if(bK[0] != G && bK[0] != k)bJ.push(bK);
          bN.pop();
        };
        if(!bJ.length)bJ.push(bM);
        return bJ;
      },
      __eW : function(bS){

        if(bS == r)return -1;
        switch(bS[0]){case q:
        return 5;case g:
        return 4;case m:case B:
        return 3;case C:case I:
        return 2;case G:
        return 1;case k:
        return 0;};
        return -1;
      }
    },
    statics : {
      invalidValue : -348201.3876,
      validation : {
        logicalAnd : 0x01,
        logicalOr : 0x02,
        mathAnd : 0x03,
        mathOr : 0x04,
        summarize : 0x05,
        subtructValidator : 0x06,
        subtructValue : 0x07,
        multiply : 0x08,
        divideValidator : 0x09,
        divideValue : 0x0A,
        noneZero : 0x0B,
        replaceOnError : 0x0C
      }
    }
  });
})();
(function(){

  var a = "wialon.item.MUnitTripDetector",b = "unit/get_trip_detector",c = "unit/get_trips",d = "unit/update_trip_detector";
  qx.Mixin.define(a, {
    members : {
      getTripDetector : function(e){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(e));
      },
      getTrips : function(g, i, h, f){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          timeFrom : g,
          timeTo : i,
          msgsSource : h
        }, wialon.util.Helper.wrapCallback(f));
      },
      updateTripDetector : function(r, n, k, o, l, m, j, q, p){

        return wialon.core.Remote.getInstance().remoteCall(d, {
          itemId : this.getId(),
          type : r,
          gpsCorrection : n,
          minSat : k,
          minMovingSpeed : o,
          minStayTime : l,
          maxMessagesDistance : m,
          minTripTime : j,
          minTripDistance : q
        }, wialon.util.Helper.wrapCallback(p));
      }
    },
    statics : {
      tripDetectionType : {
        gpsSpeed : 1,
        gpsPosition : 2,
        ignitionSensor : 3,
        mileageSensorAbsolute : 4,
        mileageSensorRelative : 5
      }
    }
  });
})();
(function(){

  var a = "wialon.item.MUnitMessagesFilter",b = "unit/get_messages_filter",c = "unit/update_messages_filter";
  qx.Mixin.define(a, {
    members : {
      getMessagesFilter : function(d){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(d));
      },
      updateMessagesFilter : function(h, g, j, e, f, i){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          enabled : h,
          skipInvalid : g,
          minSats : j,
          maxHdop : e,
          maxSpeed : f
        }, wialon.util.Helper.wrapCallback(i));
      }
    }
  });
})();
(function(){

  var a = "unit/registry_maintenance_event",b = "wialon.item.MUnitEventRegistrar",c = "unit/registry_status_event",d = "unit/registry_insurance_event",e = "unit/registry_custom_event",f = "unit/registry_fuel_filling_event";
  qx.Mixin.define(b, {
    members : {
      registryStatusEvent : function(g, j, i, h){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          date : g,
          description : j,
          params : i,
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(h));
      },
      registryInsuranceEvent : function(m, l, n, k){

        return wialon.core.Remote.getInstance().remoteCall(d, {
          type : l,
          case_num : n,
          description : m,
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(k));
      },
      registryCustomEvent : function(r, o, x, y, q, p){

        return wialon.core.Remote.getInstance().remoteCall(e, {
          date : r,
          x : x,
          y : y,
          description : o,
          violation : q,
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(p));
      },
      registryFuelFillingEvent : function(t, u, x, y, location, v, z, s, w){

        return wialon.core.Remote.getInstance().remoteCall(f, {
          date : t,
          volume : v,
          cost : z,
          location : location,
          deviation : s,
          x : x,
          y : y,
          description : u,
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(w));
      },
      registryMaintenanceEvent : function(C, D, x, y, location, A, H, G, B, I, E, F){

        return wialon.core.Remote.getInstance().remoteCall(a, {
          date : C,
          info : A,
          duration : H,
          cost : G,
          location : location,
          x : x,
          y : y,
          description : D,
          mileage : B,
          eh : I,
          done_svcs : E,
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(F));
      }
    }
  });
})();
(function(){

  var a = "wialon.item.MUnitReportSettings",b = "unit/get_report_settings",c = "unit/update_report_settings";
  qx.Mixin.define(a, {
    members : {
      getReportSettings : function(d){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(d));
      },
      updateReportSettings : function(f, e){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          params : f
        }, wialon.util.Helper.wrapCallback(e));
      }
    }
  });
})();
(function(){

  var a = "unit/update_fuel_rates_params",b = "unit/update_fuel_math_params",c = "unit/update_fuel_impulse_params",d = "wialon.item.MUnitFuelSettings",e = "unit/update_fuel_calc_types",f = "unit/get_fuel_settings",g = "unit/update_fuel_level_params",h = "object";
  qx.Mixin.define(d, {
    members : {
      getFuelSettings : function(i){

        return wialon.core.Remote.getInstance().remoteCall(f, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(i));
      },
      updateFuelCalcTypes : function(k, j){

        return wialon.core.Remote.getInstance().remoteCall(e, {
          itemId : this.getId(),
          calcTypes : k
        }, wialon.util.Helper.wrapCallback(j));
      },
      updateFuelLevelParams : function(n, m){

        var l = {
        };
        if(n && typeof n == h){

          l = n;
        } else if(arguments.length > 2){

          l.flags = arguments[0];
          l.ignoreStayTimeout = arguments[1];
          l.minFillingVolume = arguments[2];
          l.minTheftTimeout = arguments[3];
          l.minTheftVolume = arguments[4];
          l.filterQuality = arguments[5];
          if(arguments.length > 7){

            l.fillingsJoinInterval = arguments[6];
            l.theftsJoinInterval = arguments[7];
            m = arguments[8];
          } else {

            l.fillingsJoinInterval = 300;
            l.theftsJoinInterval = 300;
            m = arguments[6];
          };
        };
        return wialon.core.Remote.getInstance().remoteCall(g, {
          itemId : this.getId(),
          flags : l.flags,
          ignoreStayTimeout : l.ignoreStayTimeout,
          minFillingVolume : l.minFillingVolume,
          minTheftTimeout : l.minTheftTimeout,
          minTheftVolume : l.minTheftVolume,
          filterQuality : l.filterQuality,
          fillingsJoinInterval : l.fillingsJoinInterval,
          theftsJoinInterval : l.theftsJoinInterval,
          extraFillingTimeout : l.extraFillingTimeout
        }, wialon.util.Helper.wrapCallback(m));
      },
      updateFuelConsMath : function(o, r, p, s, q){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : this.getId(),
          idling : o,
          urban : r,
          suburban : p,
          loadCoef : s
        }, wialon.util.Helper.wrapCallback(q));
      },
      updateFuelConsRates : function(t, v, u, x, w, z, B, A, y){

        return wialon.core.Remote.getInstance().remoteCall(a, {
          itemId : this.getId(),
          idlingSummer : t,
          idlingWinter : v,
          consSummer : u,
          consWinter : x,
          winterMonthFrom : w,
          winterDayFrom : z,
          winterMonthTo : B,
          winterDayTo : A
        }, wialon.util.Helper.wrapCallback(y));
      },
      updateFuelConsImpulse : function(C, D, E){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          maxImpulses : C,
          skipZero : D
        }, wialon.util.Helper.wrapCallback(E));
      }
    },
    statics : {
      fuelCalcType : {
        math : 0x01,
        levelSensors : 0x02,
        levelSensorsMath : 0x04,
        absConsSensors : 0x08,
        impConsSensors : 0x10,
        instConsSensors : 0x20,
        rates : 0x40
      },
      fuelLevelFlag : {
        mergeSensors : 0x01,
        smoothData : 0x02,
        splitConsSensors : 0x04,
        requireStay : 0x08,
        calcByTime : 0x10,
        calcFillingsByRaw : 0x40,
        calcTheftsByRaw : 0x80,
        detectTheftsInMotion : 0x100,
        calcFillingsByTime : 0x200,
        calcTheftsByTime : 0x400,
        calcConsumptionByTime : 0x800
      }
    }
  });
})();
(function(){

  var a = "wialon.item.MZone";
  qx.Mixin.define(a, {
    members : {
    },
    statics : {
      flags : {
        area : 0x00000001,
        perimeter : 0x00000002,
        boundary : 0x00000004,
        points : 0x00000008,
        base : 0x000000010
      }
    }
  });
})();
(function(){

  var a = "resource/cleanup_driver_interval",b = "changeDriverUnits",c = "wialon.item.MDriver",d = ".png",e = "/1/",f = "/2/",g = "changeTrailerUnits",h = "resource/get_driver_bindings",i = "Array",j = "resource/update_trailer_units",k = "resource/upload_trailer_image",l = "/",m = "qx.event.type.Data",n = "resource/upload_driver_image",o = "number",p = "resource/bind_unit_driver",q = "trlrun",r = "resource/cleanup_trailer_interval",s = "resource/get_trailer_bindings",t = "resource/bind_unit_trailer",u = "/avl_driver_image/",v = "resource/update_driver_units",w = "undefined",x = "drvrun",y = "object";
  qx.Mixin.define(c, {
    construct : function(){

      var z = wialon.core.Session.getInstance();
      z.registerProperty(x, qx.lang.Function.bind(function(A, B){

        A.setDriverUnits(B);
      }, this));
      z.registerProperty(q, qx.lang.Function.bind(function(C, D){

        C.setTrailerUnits(D);
      }, this));
    },
    properties : {
      driverUnits : {
        init : null,
        check : i,
        event : b
      },
      trailerUnits : {
        init : null,
        check : i,
        event : g
      }
    },
    members : {
      updateDriverUnits : function(E, F){

        return wialon.core.Remote.getInstance().remoteCall(v, {
          itemId : this.getId(),
          units : E
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(F)));
      },
      updateTrailerUnits : function(G, H){

        return wialon.core.Remote.getInstance().remoteCall(j, {
          itemId : this.getId(),
          units : G
        }, qx.lang.Function.bind(this._onUpdateProperties, this, wialon.util.Helper.wrapCallback(H)));
      },
      getDriverImageUrl : function(I, J){

        if(typeof J == w || !J)J = 32;
        return wialon.core.Session.getInstance().getBaseUrl() + u + this.getId() + l + I.id + l + J + e + I.ck + d;
      },
      getTrailerImageUrl : function(K, L){

        if(typeof L == w || !L)L = 32;
        return wialon.core.Session.getInstance().getBaseUrl() + u + this.getId() + l + K.id + l + L + f + K.ck + d;
      },
      setDriverImage : function(N, M, O){

        if(typeof M == y && typeof M.resId == o && typeof M.drvId == o)return wialon.core.Remote.getInstance().remoteCall(n, {
          itemId : this.getId(),
          driverId : N.id,
          oldItemId : M.resId,
          oldDrvId : M.drvId
        }, O);
        return wialon.core.Uploader.getInstance().uploadFiles([M], n, {
          itemId : this.getId(),
          driverId : N.id
        }, O);
      },
      setTrailerImage : function(Q, P, R){

        if(typeof P == y && typeof P.resId == o && typeof P.trId == o)return wialon.core.Remote.getInstance().remoteCall(k, {
          itemId : this.getId(),
          trailerId : Q.id,
          oldItemId : P.resId,
          oldTrId : P.trId
        }, R);
        return wialon.core.Uploader.getInstance().uploadFiles([P], k, {
          itemId : this.getId(),
          trailerId : Q.id
        }, R);
      },
      bindDriverToUnit : function(U, Y, X, W, V){

        var S = 0;
        var T = 0;
        if(U)S = U.id;
        if(Y)T = Y.getId();
        return wialon.core.Remote.getInstance().remoteCall(p, {
          resourceId : this.getId(),
          driverId : S,
          time : X,
          unitId : T,
          mode : W
        }, wialon.util.Helper.wrapCallback(V));
      },
      bindTrailerToUnit : function(bg, bd, ba, be, bc){

        var bb = 0;
        var bf = 0;
        if(bg)bb = bg.id;
        if(bd)bf = bd.getId();
        return wialon.core.Remote.getInstance().remoteCall(t, {
          resourceId : this.getId(),
          trailerId : bb,
          time : ba,
          unitId : bf,
          mode : be
        }, wialon.util.Helper.wrapCallback(bc));
      },
      cleanupDriverInterval : function(bj, bi, bk, bl){

        var bh = 0;
        if(bj)bh = bj.id;
        return wialon.core.Remote.getInstance().remoteCall(a, {
          resourceId : this.getId(),
          driverId : bh,
          timeFrom : bi,
          timeTo : bk
        }, wialon.util.Helper.wrapCallback(bl));
      },
      cleanupTrailerInterval : function(bp, bo, bq, bm){

        var bn = 0;
        if(bp)bn = bp.id;
        return wialon.core.Remote.getInstance().remoteCall(r, {
          resourceId : this.getId(),
          trailerId : bn,
          timeFrom : bo,
          timeTo : bq
        }, wialon.util.Helper.wrapCallback(bm));
      },
      getDriverBindings : function(bx, bt, br, bu, bv){

        var bs = 0;
        var bw = 0;
        if(bt)bs = bt.id;
        if(bx)bw = bx.getId();
        return wialon.core.Remote.getInstance().remoteCall(h, {
          resourceId : this.getId(),
          unitId : bw,
          driverId : bs,
          timeFrom : br,
          timeTo : bu
        }, wialon.util.Helper.wrapCallback(bv));
      },
      getTrailerBindings : function(bE, bC, by, bA, bB){

        var bz = 0;
        var bD = 0;
        if(bC)bz = bC.id;
        if(bE)bD = bE.getId();
        return wialon.core.Remote.getInstance().remoteCall(s, {
          resourceId : this.getId(),
          unitId : bD,
          trailerId : bz,
          timeFrom : by,
          timeTo : bA
        }, wialon.util.Helper.wrapCallback(bB));
      }
    },
    statics : {
      registerDriverProperties : function(){

        var bF = wialon.core.Session.getInstance();
        bF.registerProperty(x, this.remoteUpdateDriverUnits);
        bF.registerProperty(q, this.remoteUpdateTrailerUnits);
      },
      remoteUpdateDriverUnits : function(bG, bH){

        bG.setDriverUnits(bH);
      },
      remoteUpdateTrailerUnits : function(bI, bJ){

        bI.setTrailerUnits(bJ);
      },
      flags : {
        driver : 0x01,
        trailer : 0x02,
        assignmentRestriction : 0x04
      }
    },
    events : {
      "changeDriverUnits" : m,
      "changeTrailerUnits" : m
    }
  });
})();
(function(){

  var a = "create_account",b = "account/enable_account",c = "account/update_sub_plans",d = "account/get_account_history",e = "update_account_min_days",f = "account/get_billing_plans",g = "account/update_dealer_rights",h = "account/create_account",i = "account/update_min_days",j = "switch_account",k = "update_account_history_period",l = "account/update_flags",m = "account/do_payment",n = "wialon.item.MAccount",o = "update_account_flags",p = "number",q = "create_account_service",r = "account/delete_account",s = "update_dealer_rights",t = "update_account_service",u = "account/update_plan",v = "update_account_plan",w = "account/update_history_period",x = "delete_account_service",y = "account/get_account_data",z = "update_account_subplans",A = "account/update_billing_plan",B = "account/update_billing_service",C = "object";
  qx.Mixin.define(n, {
    members : {
      getAccountData : function(D){

        return wialon.core.Remote.getInstance().remoteCall(y, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(D));
      },
      getAccountHistory : function(G, F, E){

        return wialon.core.Remote.getInstance().remoteCall(d, {
          itemId : this.getId(),
          days : G,
          tz : F
        }, wialon.util.Helper.wrapCallback(E));
      },
      updateDealerRights : function(I, H){

        return wialon.core.Remote.getInstance().remoteCall(g, {
          itemId : this.getId(),
          enable : I
        }, wialon.util.Helper.wrapCallback(H));
      },
      updatePlan : function(K, J){

        return wialon.core.Remote.getInstance().remoteCall(u, {
          itemId : this.getId(),
          plan : K
        }, wialon.util.Helper.wrapCallback(J));
      },
      updateFlags : function(M, L){

        var N = {
        };
        if(M && typeof M == C)N = M; else if(typeof M == p)N.flags = M;;
        return wialon.core.Remote.getInstance().remoteCall(l, {
          itemId : this.getId(),
          flags : N.flags,
          blockBalance : N.blockBalance,
          denyBalance : N.denyBalance
        }, wialon.util.Helper.wrapCallback(L));
      },
      updateMinDays : function(P, O){

        return wialon.core.Remote.getInstance().remoteCall(i, {
          itemId : this.getId(),
          minDays : P
        }, wialon.util.Helper.wrapCallback(O));
      },
      updateHistoryPeriod : function(R, Q){

        return wialon.core.Remote.getInstance().remoteCall(w, {
          itemId : this.getId(),
          historyPeriod : R
        }, wialon.util.Helper.wrapCallback(Q));
      },
      updateBillingService : function(name, T, V, U, S){

        return wialon.core.Remote.getInstance().remoteCall(B, {
          itemId : this.getId(),
          name : name,
          type : T,
          intervalType : V,
          costTable : U
        }, wialon.util.Helper.wrapCallback(S));
      },
      enableAccount : function(X, W){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : this.getId(),
          enable : X
        }, wialon.util.Helper.wrapCallback(W));
      },
      updateSubPlans : function(ba, Y){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          plans : ba
        }, wialon.util.Helper.wrapCallback(Y));
      },
      doPayment : function(bc, bd, be, bb){

        return wialon.core.Remote.getInstance().remoteCall(m, {
          itemId : this.getId(),
          balanceUpdate : bc,
          daysUpdate : bd,
          description : be
        }, wialon.util.Helper.wrapCallback(bb));
      },
      createAccount : function(bg, bf){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          itemId : this.getId(),
          plan : bg
        }, wialon.util.Helper.wrapCallback(bf));
      },
      deleteAccount : function(bh){

        return wialon.core.Remote.getInstance().remoteCall(r, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(bh));
      },
      getBillingPlans : function(bi){

        return wialon.core.Remote.getInstance().remoteCall(f, {
        }, wialon.util.Helper.wrapCallback(bi));
      },
      updateBillingPlan : function(bj, bk, bl){

        bl = wialon.util.Helper.wrapCallback(bl);
        return wialon.core.Remote.getInstance().remoteCall(A, {
          callMode : bj,
          plan : bk
        }, bl);
      }
    },
    statics : {
      billingPlanFlag : {
        blockAccount : 0x1,
        denyServices : 0x2,
        allowUnknownServices : 0x4,
        restrictDeviceListedOnly : 0x8,
        restrictDeviceNotListedOnly : 0x10,
        subtractDays : 0x20,
        overridePlanFlags : 0x40
      },
      billingIntervalType : {
        none : 0,
        hourly : 1,
        daily : 2,
        weekly : 3,
        monthly : 4
      },
      billingServiceType : {
        onDemand : 1,
        periodic : 2
      },
      logMessageAction : {
        accountCreated : a,
        accountSwitched : j,
        accountUpdateDealerRights : s,
        accountUpdateFlags : o,
        accountUpdateMinDays : e,
        accountUpdatedHistoryPeriod : k,
        accountUpdatePlan : v,
        accountUpdateSubplans : z,
        accountCreatedService : q,
        accountUpdatedService : t,
        accountDeletedService : x
      }
    }
  });
})();
(function(){

  var a = "report/cleanup_result",b = "report/exec_report",c = "wialon.item.MReport";
  qx.Mixin.define(c, {
    members : {
      execReport : function(i, h, d, f, g){

        var e = null;
        if(!i.id)e = i;
        return wialon.core.Remote.getInstance().remoteCall(b, {
          reportResourceId : this.getId(),
          reportTemplateId : i.id,
          reportTemplate : e,
          reportObjectId : h,
          reportObjectSecId : d,
          interval : f
        }, qx.lang.Function.bind(this.__eX, this, wialon.util.Helper.wrapCallback(g)), 180);
      },
      cleanupResult : function(j){

        return wialon.core.Remote.getInstance().remoteCall(a, {
        }, qx.lang.Function.bind(this.__eY, this, wialon.util.Helper.wrapCallback(j)));
      },
      __eX : function(l, m, k){

        var n = null;
        if(m == 0 && k){

          n = new wialon.report.ReportResult(k);
          var o = wialon.core.Session.getInstance().getRenderer();
          if(o)o.setReportResult(n);
        };
        l(m, n);
      },
      __eY : function(p, q, r){

        var s = wialon.core.Session.getInstance().getRenderer();
        if(s)s.setReportResult(null);
        p(q);
      }
    },
    statics : {
      intervalFlag : {
        absolute : 0x00,
        useCurrentTime : 0x01,
        prevHour : 0x40,
        prevDay : 0x02,
        prevWeek : 0x04,
        prevMonth : 0x08,
        prevYear : 0x10,
        currTimeAndPrev : 0x20,
        weekDayMask : 0x700
      },
      tableFlag : {
      },
      columnFlag : {
      }
    }
  });
})();
(function(){

  var a = "report/get_result_subrows",b = "&svc=report/export_result&params=",c = "&svc=report/get_result_photo&params=",d = "/wialon/ajax.html?sid=",e = "report/select_result_rows",f = "wialon.report.ReportResult",g = "&svc=report/get_result_map&params=",h = "report/get_result_rows",i = "report/hittest_chart",j = "&svc=report/get_result_chart&params=",k = "report/render_json",l = "Object";
  qx.Class.define(f, {
    extend : qx.core.Object,
    construct : function(m){

      qx.core.Object.call(this, m);
      this._data = m;
    },
    properties : {
      layer : {
        init : null,
        check : l,
        nullable : true
      }
    },
    members : {
      _data : null,
      getTables : function(){

        return this._data.reportResult.tables;
      },
      isRendered : function(){

        return this._data.reportResult.msgsRendered;
      },
      isEmpty : function(){

        var n = 0,o = 0,p = 0;
        if(this._data.reportResult.tables)n = this._data.reportResult.tables.length;
        if(this._data.reportResult.stats)o = this._data.reportResult.stats.length;
        if(this._data.reportResult.attachments)p = this._data.reportResult.attachments.length;
        if(!n && !o && !p)return true;
        return false;
      },
      getTableRows : function(s, t, q, r){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          tableIndex : s,
          indexFrom : t,
          indexTo : q
        }, wialon.util.Helper.wrapCallback(r));
      },
      getRowDetail : function(w, u, v){

        return wialon.core.Remote.getInstance().remoteCall(a, {
          tableIndex : w,
          rowIndex : u
        }, wialon.util.Helper.wrapCallback(v));
      },
      selectRows : function(y, z, x){

        return wialon.core.Remote.getInstance().remoteCall(e, {
          tableIndex : y,
          config : z
        }, wialon.util.Helper.wrapCallback(x));
      },
      renderJSON : function(B, A, E, D, F, C){

        return wialon.core.Remote.getInstance().remoteCall(k, {
          attachmentIndex : B,
          width : A,
          useCrop : E,
          cropBegin : D,
          cropEnd : F
        }, wialon.util.Helper.wrapCallback(C));
      },
      getMessages : function(J, G, H){

        H = wialon.util.Helper.wrapCallback(H);
        var I = this.getLayer();
        if(I && I instanceof wialon.render.MessagesLayer)I.getMessages(0, J, G, H); else H(3);
      },
      getStatistics : function(){

        return this._data.reportResult.stats;
      },
      getAttachments : function(){

        return this._data.reportResult.attachments;
      },
      getChartUrl : function(M, Q, K, N, R, O, S, L){

        var P = {
          reportResourceId : this._data.reportResourceId,
          attachmentIndex : M,
          action : Q,
          width : K,
          height : N,
          autoScaleY : R,
          pixelFrom : O,
          pixelTo : S,
          flags : L,
          rnd : (new Date).getTime()
        };
        return wialon.core.Session.getInstance().getBaseUrl() + d + wialon.core.Session.getInstance().getId() + j + encodeURIComponent(wialon.util.Json.stringify(P));
      },
      hitTestChart : function(V, T, W, U){

        return wialon.core.Remote.getInstance().remoteCall(i, {
          attachmentIndex : V,
          datasetIndex : T,
          pixelX : W
        }, wialon.util.Helper.wrapCallback(U));
      },
      getExportUrl : function(ba, Y){

        var X = qx.lang.Object.clone(Y);
        X.format = ba;
        return wialon.core.Session.getInstance().getBaseUrl() + d + wialon.core.Session.getInstance().getId() + b + encodeURIComponent(wialon.util.Json.stringify(X));
      },
      getMapUrl : function(bb, bd){

        var bc = {
          width : bb,
          height : bd,
          rnd : (new Date).getTime()
        };
        return wialon.core.Session.getInstance().getBaseUrl() + d + wialon.core.Session.getInstance().getId() + g + encodeURIComponent(wialon.util.Json.stringify(bc));
      },
      getPhotoUrl : function(bg, be){

        var bf = {
          attachmentIndex : bg,
          border : be,
          rnd : (new Date).getTime()
        };
        return wialon.core.Session.getInstance().getBaseUrl() + d + wialon.core.Session.getInstance().getId() + c + encodeURIComponent(wialon.util.Json.stringify(bf));
      },
      getLayerData : function(){

        return this._data.reportLayer;
      }
    },
    statics : {
      chartFlag : {
        headerTop : 0x01,
        headerBottom : 0x02,
        headerNone : 0x04,
        axisUpDown : 0x40,
        axisDownUp : 0x80,
        legendTop : 0x100,
        legendBottom : 0x200,
        legendLeft : 0x400,
        legendShowAlways : 0x1000
      },
      exportFormat : {
        html : 0x1,
        pdf : 0x2,
        xls : 0x4,
        xlsx : 0x8,
        xml : 0x10,
        csv : 0x20
      }
    }
  });
})();
(function(){

  var a = "apps/list",b = "apps/update",c = "apps/delete",d = "apps/check_top_service",e = "apps/create",f = "wialon.util.Apps",g = "static";
  qx.Class.define(f, {
    type : g,
    statics : {
      createApplication : function(name, o, i, l, n, m, j, h, k){

        k = wialon.util.Helper.wrapCallback(k);
        return wialon.core.Remote.getInstance().remoteCall(e, {
          name : name,
          description : o,
          url : i,
          flags : l,
          langs : n,
          sortOrder : m,
          requiredServicesList : j,
          billingPlans : h
        }, k);
      },
      updateApplication : function(x, name, q, r, u, w, v, s, p, t){

        t = wialon.util.Helper.wrapCallback(t);
        return wialon.core.Remote.getInstance().remoteCall(b, {
          id : x,
          name : name,
          description : q,
          url : r,
          flags : u,
          langs : w,
          sortOrder : v,
          requiredServicesList : s,
          billingPlans : p
        }, t);
      },
      deleteApplication : function(z, y){

        y = wialon.util.Helper.wrapCallback(y);
        return wialon.core.Remote.getInstance().remoteCall(c, {
          id : z
        }, y);
      },
      getApplications : function(C, A, B){

        B = wialon.util.Helper.wrapCallback(B);
        return wialon.core.Remote.getInstance().remoteCall(a, {
          manageMode : C,
          filterLang : A
        }, B);
      },
      remoteCheckTopService : function(D){

        D = wialon.util.Helper.wrapCallback(D);
        return wialon.core.Remote.getInstance().remoteCall(d, {
        }, D);
      },
      urlFlags : {
        sid : 0x00000001,
        user : 0x00000002,
        baseUrl : 0x00000004,
        hostUrl : 0x00000008,
        lang : 0x00000010,
        authHash : 0x00000020
      },
      appTypes : {
        reportsServer : 0x00010000
      }
    }
  });
})();
(function(){

  var a = "update_agro_machine",b = "plots",c = "agro/update_machine",d = "delete_agro_crop",e = "create_agro_machine",f = "agroUnit",g = "crop",h = "agro/update_plot_group",i = "agro/get_plot_data",j = "plotGroup",k = "create_agro_equip",l = "aplt",m = "machine",n = "delete_agro_cul_type",o = "delete_agro_machine",p = "update_agro_plot_group",q = "delete_agro_equip",r = "cultivationType",s = "acltt",t = "delete_agro_msg",u = "create_agro_plot_group",v = "plot",w = "agro/update_equipment",x = "wialon.agro.MAgro",y = "update_agro_crop",z = "amch",A = "update_agro_unit_cfg",B = "equipment",C = "update_agro_fuel",D = "cultivationTypes",E = "machines",F = "delete_agro_plot",G = "agro/update_crop",H = "apltg",I = "equipments",J = "plotGroups",K = "delete_agro_plot_group",L = "create_agro_cul_type",M = "import_agro_plots",N = "agro/update_plot",O = "agro/update_cultivation_type",P = "aequ",Q = "create_agro_crop",R = "fuelRates",S = "create_agro_plot",T = "update_agro_plot",U = "update_agro_props",V = "crops",W = "update_agro_equip",X = "update_agro_cul_type",Y = "undefined",bb = "aclt";
  qx.Mixin.define(x, {
    members : {
      loadAgroLibrary : function(bc){

        if(!this._libraries)return false;
        if(typeof this._libraries[bc] != Y)return true;
        if(bc == b)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, l, v, N, i); else if(bc == J)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, H, j, h); else if(bc == E)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, z, m, c); else if(bc == I)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, P, B, w); else if(bc == D)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, s, r, O); else if(bc == V)wialon.item.PluginsManager.bindPropItem(wialon.item.Resource, bb, g, G); else if(bc == R)qx.Class.include(wialon.item.Resource, wialon.agro.MFuelRates); else if(bc == f)qx.Class.include(wialon.item.Unit, wialon.agro.MAgroUnit); else return false;;;;;;;;
        this._libraries[bc] = 1;
        return true;
      },
      logMessageAction : {
        agroCreatedCrop : Q,
        agroUpdatedCrop : y,
        agroDeletedCrop : d,
        agroCreatedCultivationType : L,
        agroUpdatedCultivationType : X,
        agroDeletedCultivationType : n,
        agroCreatedEquipment : k,
        agroUpdatedEquipment : W,
        agroDeletedEquipment : q,
        agroCreatedMachine : e,
        agroUpdatedMachine : a,
        agroDeletedMachine : o,
        agroCreatedPlot : S,
        agroUpdatedPlot : T,
        agroDeletedPlot : F,
        agroCreatedPlotGroup : u,
        agroUpdatedPlotGroup : p,
        agroDeletedPlotGroup : K,
        agroDeletedMessage : t,
        agroUpdatedProperties : U,
        agroUpdatedUnitSettings : A,
        agroUpdatedFuelRates : C,
        agroImportedAgroPlots : M
      }
    }
  });
})();
(function(){

  var a = "wialon.agro.MFuelRates",b = "agro/get_fuel_rates",c = "agro/update_fuel_rates";
  qx.Mixin.define(a, {
    members : {
      getFuelRates : function(d){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(d));
      },
      updateFuelRates : function(f, e){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId(),
          rates : f
        }, wialon.util.Helper.wrapCallback(e));
      }
    }
  });
})();
(function(){

  var a = "agro/update_agro_props",b = "wialon.agro.MAgroUnit",c = "agro/get_agro_props";
  qx.Mixin.define(b, {
    members : {
      getAgroProps : function(d){

        return wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(d));
      },
      updateAgroProps : function(f, e){

        return wialon.core.Remote.getInstance().remoteCall(a, {
          itemId : this.getId(),
          props : f
        }, wialon.util.Helper.wrapCallback(e));
      }
    }
  });
})();
(function(){

  var a = "Integer",b = "wialon.util.MDataFlagsHelper",c = "*",d = "",e = "id",f = "type",g = "col",h = "itemCreated",k = "qx.event.type.Event",l = "undefined",m = "string",n = "object";
  qx.Mixin.define(b, {
    members : {
      properties : {
        newItemsCheckingTimeout : {
          init : 600,
          check : a
        }
      },
      startBatch : function(){

        if(this.__dv)return 0;
        this.__dv = new Array;
        return 1;
      },
      finishBatch : function(o){

        o = wialon.util.Helper.wrapCallback(o);
        if(!this.__dv){

          o(2);
          return;
        };
        if(!this.__dv.length){

          this.__dv = null;
          o(0);
          return;
        };
        this.__fe(this.__dv);
        this.__dv = null;
      },
      addItems : function(p, s, q){

        q = wialon.util.Helper.wrapCallback(q);
        if(typeof s != n)return q(2);
        var r = {
          owner : p,
          spec : s,
          callback : q,
          mode : 1
        };
        if(this.__dv)this.__dv.push(r); else this.__fe([r]);
      },
      removeItems : function(t, w, u){

        u = wialon.util.Helper.wrapCallback(u);
        if(typeof w != n)return u(2);
        var v = {
          owner : t,
          spec : w,
          callback : u,
          mode : 2
        };
        if(this.__dv)this.__dv.push(v); else this.__fe([v]);
      },
      getItemsByOwner : function(B, y){

        if(typeof B != m || !B.length)return [];
        var x = [];
        for(var C in this.__fb){

          var A = false;
          var z = wialon.core.Session.getInstance().getItem(C);
          if(!z)continue;
          if(y && y != z.getType())continue;
          if(this.__fb[C][B])x.push(z);
        };
        return x;
      },
      getItemDataFlags : function(D, E){

        if(typeof D != m || !D.length)return 0;
        var F = this.__fb[E];
        if(!F || !F[D])return 0;
        return F[D];
      },
      getItemByOwner : function(G, H){

        if(typeof G != m || !G.length)return null;
        var I = this.__fb[H];
        if(!I || !I[G])return null;
        return wialon.core.Session.getInstance().getItem(H);
      },
      startItemsCreationChecking : function(J){

        if(typeof this.__fc[J] != l)return;
        this.__fc[J] = {
        };
        this.findNewItems(J, true);
      },
      finishItemsCreationChecking : function(K){

        if(typeof this.__fc[K] == l)return;
        delete this.__fc[K];
      },
      findNewItems : function(N, O){

        clearTimeout(this.__fa);
        this.__fa = null;
        wialon.core.Remote.getInstance().startBatch();
        for(var M in this.__fc){

          if(N && N != M)continue;
          var L = qx.lang.Function.bind(function(U, R, V){

            if(R)return;
            var T = [];
            var S = [];
            for(var i = 0;i < V.items.length;i++){

              if(this.__fc[U.itemsType][V.items[i].getId()])continue;
              this.__fc[U.itemsType][V.items[i].getId()] = 1;
              T.push({
                type : e,
                data : V.items[i].getId(),
                flags : 0,
                mode : 0
              });
              T.push({
                type : e,
                data : V.items[i].getId(),
                flags : wialon.item.Item.dataFlag.base,
                mode : 1
              });
              S.push(V.items[i].getId());
            };
            if(!U.skipEvent && S.length > 0){

              wialon.core.Session.getInstance().updateDataFlags(T, qx.lang.Function.bind(function(ba, Y){

                if(Y)return;
                var X = [];
                for(var i = 0;i < ba.length;i++){

                  var bb = wialon.core.Session.getInstance().getItem(ba[i]);
                  if(!bb)continue;
                  X.push(bb);
                };
                wialon.core.Session.getInstance().fireDataEvent(h, X, null);
              }, this, S));
            };
            var P = 0;
            for(var W in this.__fc[U.itemsType])P++;
            if(P > V.items.length){

              for(var W in this.__fc[U.itemsType]){

                var Q = 0;
                for(var i = 0;i < V.items.length;i++){

                  if(V.items[i].getId() == W){

                    Q = W;
                    break;
                  };
                };
                if(Q)continue;
                delete this.__fc[U.itemsType][W];
                this._onItemDeleted(this.getItem(W));
              };
            };
          }, this, {
            itemsType : M,
            skipEvent : O ? 1 : 0
          });
          wialon.core.Session.getInstance().searchItems({
            itemsType : M,
            propName : c,
            propValueMask : c,
            sortType : d
          }, 1, wialon.item.Item.dataFlag.base, 0, 0xFFFFFFFF, L);
        };
        wialon.core.Remote.getInstance().finishBatch(qx.lang.Function.bind(function(){

          if(!this.__fa)this.__fa = setTimeout(qx.lang.Function.bind(this.findNewItems, this), this.__fd * 1000);
        }, this));
      },
      __fb : {
      },
      __dv : null,
      __fa : null,
      __fc : {
      },
      __fd : 600,
      __fe : function(bm){

        if(!bm instanceof Array)return;
        wialon.core.Remote.getInstance().startBatch();
        for(var i = 0;i < bm.length;i++){

          var bf = bm[i];
          if(typeof bf != n)continue;
          bf.spec.mode = bf.mode;
          if(bf.mode == 1){

            var bd = qx.lang.Function.bind(this.__ff, this, bf);
            wialon.core.Session.getInstance().updateDataFlags([bf.spec], bd);
          } else if(bf.mode == 2){

            var bg = [];
            if(bf.spec.type == e)bg.push(bf.spec.data); else if(bf.spec.type == g)bg = bg.concat(bf.spec.data); else if(bf.spec.type == f){

              for(var bn in this.__fb){

                var bi = wialon.core.Session.getInstance().getItem(bn);
                if(bi && bi.getType() == bf.spec.data)bg.push(bn);
              };
            };;
            if(!bg.length)continue;
            var bc = {
            };
            var bk = bf.spec.flags;
            for(var i = 0;i < bg.length;i++){

              var be = this.__fb[bg[i]];
              if(!be)continue;
              if(!be[bf.owner])continue;
              for(var j = 0;j < 64;j++){

                var bj = (1 << j);
                if(!(bk & bj) || !(be[bf.owner] & bj))continue;
                be[bf.owner] ^= bj;
                var bh = true;
                for(var bl in be)if(be.hasOwnProperty(bl) && (be[bl] & bj)){

                  bh = false;
                  break;
                };
                if(bh){

                  if(typeof bc[bg[i]] == l)bc[bg[i]] = {
                    type : e,
                    data : bg[i],
                    flags : 0,
                    mode : 2
                  };
                  bc[bg[i]].flags |= bj;
                };
              };
            };
            for(var bn in bc)if(bc.hasOwnProperty(bn))wialon.core.Session.getInstance().updateDataFlags([bc[bn]]);;
            if(bf.callback)bf.callback();
          };
        };
        wialon.core.Remote.getInstance().finishBatch();
      },
      __ff : function(bq, bo){

        var bs = (new Date()).getTime();
        if(!bq)return;
        if(bo)return bq.callback ? bq.callback() : null;
        var br = [];
        if(bq.spec.type == e)br.push(bq.spec.data); else if(bq.spec.type == g)br = br.concat(bq.spec.data); else if(bq.spec.type == f){

          var bp = wialon.core.Session.getInstance().getItems(bq.spec.data);
          for(var i = 0;i < bp.length;i++)br.push(bp[i].getId());
        };;
        for(var i = 0;i < br.length;i++){

          var bt = br[i];
          if(!this.__fb[bt])this.__fb[bt] = {
          };
          if(!this.__fb[bt][bq.owner])this.__fb[bt][bq.owner] = 0;
          this.__fb[bt][bq.owner] |= bq.spec.flags;
        };
        return bq.callback ? bq.callback() : null;
      }
    },
    events : {
      "itemCreated" : k
    }
  });
})();
(function(){

  var a = "file/write_file",b = "&svc=file/get_file&params=",c = "file/list_files",d = "/wialon/ajax.html?sid=",e = "wialon.util.File",f = "{}",g = "file/read_file",h = "file/put_file",i = "file/rm",j = "files",k = "static",l = "error";
  qx.Class.define(e, {
    type : k,
    statics : {
      fileStorageType : {
        publicType : 1,
        protectedType : 2
      },
      getFileURL : function(m, n, o){

        var p = {
          itemId : m,
          path : n,
          flags : o
        };
        return wialon.core.Session.getInstance().getBaseUrl() + d + wialon.core.Session.getInstance().getId() + b + wialon.util.Json.stringify(p);
      },
      listFiles : function(q, u, s, t, r){

        t = this.__vT(t);
        wialon.core.Remote.getInstance().remoteCall(c, {
          itemId : q,
          path : u,
          mask : s,
          flags : t
        }, wialon.util.Helper.wrapCallback(r));
      },
      rm : function(v, y, x, w){

        x = this.__vT(x);
        wialon.core.Remote.getInstance().remoteCall(i, {
          itemId : v,
          path : y,
          flags : x
        }, wialon.util.Helper.wrapCallback(w));
      },
      putFiles : function(z, E, A, D, F, B){

        F = this.__vT(F);
        var C = {
        };
        C.itemId = z;
        C.path = E;
        C.flags = F;
        wialon.core.Uploader.getInstance().uploadFiles(A, h, C, qx.lang.Function.bind(this.__eH, this, B), 1, D);
      },
      readFile : function(G, J, I, H){

        I = this.__vT(I);
        wialon.core.Remote.getInstance().remoteCall(g, {
          itemId : G,
          path : J,
          flags : I
        }, wialon.util.Helper.wrapCallback(H));
      },
      writeFile : function(K, O, N, M, L){

        N = this.__vT(N);
        wialon.core.Remote.getInstance().remoteCall(a, {
          itemId : K,
          path : O,
          flags : N,
          fileData : M
        }, wialon.util.Helper.wrapCallback(L));
      },
      __eH : function(P, Q, R){

        if(R && this.__vS(R, l) && this.__vS(R, j))P(R.error, R.files); else P(0, f);
      },
      __vS : function(T, U){

        if(T instanceof Object){

          var S = Object.keys(T);
          if(S.indexOf(U) !== -1)return true;
        };
        return false;
      },
      __vT : function(V){

        var W = V;
        if(!W)W = 0;
        return W;
      }
    }
  });
})();
(function(){

  var a = "route/optimize",b = "static",c = "wialon.util.Routing";
  qx.Class.define(c, {
    type : b,
    statics : {
      remoteOptimizeCourierRoute : function(d, f, e, g){

        g = wialon.util.Helper.wrapCallback(g);
        return wialon.core.Remote.getInstance().remoteCall(a, {
          pathMatrix : d,
          pointSchedules : f,
          flags : e
        }, g);
      },
      remoteOptimizeFlag : {
        fitSchedule : 0x1,
        optimizeDuration : 0x2,
        optimizeTime : 0x4,
        fixFirstPoint : 0x8,
        fixLastPoint : 0x10
      }
    }
  });
})();
(function(){

  var a = "plots",b = "Comic Sans MS",c = "render",d = "wialon.agro.Helper",e = "agro/update_unit_settings",f = "agro/import_plots",g = "Courier New",h = "agro/upload_cultivation",j = "Arial Black",k = "static",l = "agro/get_units_in_plots",m = "DejaVuSans-BoldOblique",n = "Impact",o = "Arial",p = "Georgia",q = "DejaVuSans",r = "uploadTrack",s = "agro/delete_cultivation_msg",t = "Times New Roman",u = "Trebuchet MS",v = "",w = "register",x = "clear",y = "agro/upload_plot",z = "register_ex",A = "&svc=agro/export_plots&params=",B = "agro/convert_plots",C = "upload",D = "Verdana",E = "&svc=agro/print_plots&params=",F = "/wialon/ajax.html?sid=",G = "agro/update_cultivation_msg",H = "DejaVuSans-Oblique",I = "agro/get_cultivations",J = "DejaVuSans-Bold",K = "agro/create_plots_layer",L = "undefined",M = "agro/get_unit_settings";
  qx.Class.define(d, {
    type : k,
    statics : {
      getCultivations : function(V, R, O, Q, U, P, S){

        var T = wialon.core.Session.getInstance().getRenderer();
        if(!T)return;
        var N = T.getLayers();
        for(var i = N.length - 1;i >= 0;i--){

          if(N[i].getName() == U){

            N[i].dispose();
            qx.lang.Array.remove(N, N[i]);
          };
        };
        return wialon.core.Remote.getInstance().remoteCall(I, {
          plotItemId : V,
          plotId : R,
          timeFrom : O,
          timeTo : Q,
          layerName : typeof U == L ? v : U,
          paintingScheme : P ? P : null
        }, qx.lang.Function.bind(this.__fg, this, wialon.util.Helper.wrapCallback(S)), 300);
      },
      getCultivationsList : function(ba, W, Y, bb, X){

        return wialon.core.Remote.getInstance().remoteCall(I, {
          plotItemId : ba,
          plotId : W,
          timeFrom : Y,
          timeTo : bb,
          layerName : v,
          paintingScheme : null
        }, wialon.util.Helper.wrapCallback(X), 300);
      },
      uploadCultivation : function(bc, be, bd, bf){

        wialon.core.Uploader.getInstance().uploadFiles(bc, h, {
          tzOffset : be,
          color : bd,
          callMode : C
        }, qx.lang.Function.bind(this.__fh, this, wialon.util.Helper.wrapCallback(bf)), true);
      },
      updateCultivationLayer : function(bi, bg, bh, bj){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          time : bi,
          action : bg,
          color : bh,
          callMode : c
        }, wialon.util.Helper.wrapCallback(bj), 300);
      },
      uploadUnitCultivation : function(bt, bm, bp, bv, bu, bs, bx, bo, bn, bw, bk, bl, bq, br){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          unitId : bt,
          timeFrom : bm,
          timeTo : bp,
          switchSensorId : bv,
          widthSensorId : bu,
          flags : bs,
          tzOffset : bx,
          color : bo,
          defaultWidth : bn,
          plotItemId : bw,
          plotId : bk,
          withinPlot : bl ? 1 : 0,
          callMode : r,
          filter : bq
        }, qx.lang.Function.bind(this.__fh, this, wialon.util.Helper.wrapCallback(br)), 300);
      },
      uploadPlot : function(by, bA, bz){

        wialon.core.Uploader.getInstance().uploadFiles(by, y, {
          tzOffset : bA,
          callMode : C
        }, wialon.util.Helper.wrapCallback(bz), true);
      },
      uploadUnitPlot : function(bF, bD, bE, bB, bC){

        return wialon.core.Remote.getInstance().remoteCall(y, {
          unitId : bF,
          timeFrom : bD,
          timeTo : bE,
          switchSensorId : bB,
          callMode : r
        }, wialon.util.Helper.wrapCallback(bC), 300);
      },
      clearUploadedCultivation : function(bG){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          callMode : x
        }, wialon.util.Helper.wrapCallback(bG), 300);
      },
      registerUploadedCultivation : function(bU, bO, bK, bT, bS, bM, bL, bQ, bJ, bH, bN, bR, bI, bP){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          plotItemId : bU,
          plotId : bO,
          ctypeItemId : bK,
          ctypeId : bT,
          machineItemId : bS,
          machineId : bM,
          equipItemId : bL,
          equipId : bQ,
          description : bJ,
          timeFrom : bH,
          timeTo : bN,
          unitId : bR,
          fuelFlags : bI,
          callMode : w
        }, wialon.util.Helper.wrapCallback(bP), 300);
      },
      registerUnitCultivation : function(cj, bV, ca, ci, ch, cb, bX, cf, bY, bW, cc, ck, cg, cd, ce){

        return wialon.core.Remote.getInstance().remoteCall(h, {
          plotItemId : cj,
          plotId : bV,
          ctypeItemId : ca,
          ctypeId : ci,
          machineItemId : ch,
          machineId : cb,
          equipItemId : bX,
          equipId : cf,
          description : bY,
          timeFrom : bW,
          timeTo : cc,
          tzOffset : ck,
          unitId : cg,
          filter : cd,
          callMode : z
        }, wialon.util.Helper.wrapCallback(ce), 300);
      },
      createPlotsLayer : function(cq, cp, cn, cm){

        var co = wialon.core.Session.getInstance().getRenderer();
        if(!co)return;
        var cl = co.getLayers();
        for(var i = cl.length - 1;i >= 0;i--){

          if(cl[i].getName() == cq){

            cl[i].dispose();
            qx.lang.Array.remove(cl, cl[i]);
          };
        };
        return wialon.core.Remote.getInstance().remoteCall(K, {
          layerName : cq,
          plots : cp,
          flags : cn
        }, qx.lang.Function.bind(this.__eL, this, wialon.util.Helper.wrapCallback(cm)), 300);
      },
      getPrintUrl : function(cv, cs, cw, cu, ct, cx, cA, cB, cy, cr){

        var cz = {
          fileType : cv,
          isPlotGroup : cs,
          plots : cw,
          imageFlags : cu,
          plotFlags : ct,
          mapScale : cx,
          font : cA,
          fontSize : cB,
          fontColor : cy,
          lang : cr,
          rnd : (new Date).getTime()
        };
        return wialon.core.Session.getInstance().getBaseUrl() + F + wialon.core.Session.getInstance().getId() + E + wialon.util.Json.stringify(cz);
      },
      getUnitSettings : function(cD, cC){

        return wialon.core.Remote.getInstance().remoteCall(M, {
          itemId : this.getId()
        }, wialon.util.Helper.wrapCallback(cC), 300);
      },
      updateUnitSettings : function(cE, cH, cF, cI, cG){

        return wialon.core.Remote.getInstance().remoteCall(e, {
          unitId : cE,
          machineItemId : cH,
          machineId : cF,
          settings : cI
        }, wialon.util.Helper.wrapCallback(cG), 300);
      },
      convertPlots : function(cJ, cK, cL){

        return wialon.core.Remote.getInstance().remoteCall(B, {
          resourceId : cJ,
          plots : cK
        }, wialon.util.Helper.wrapCallback(cL), 300);
      },
      updateCultivationMsg : function(cS, cP, cM, cO, cN, cR, cQ){

        return wialon.core.Remote.getInstance().remoteCall(G, {
          plotItemId : cS,
          plotId : cP,
          timeFrom : cM,
          timeTo : cO,
          msgIndex : cN,
          params : cR
        }, wialon.util.Helper.wrapCallback(cQ), 300);
      },
      deleteCultivationMsg : function(cY, cW, cT, cV, cU, cX){

        return wialon.core.Remote.getInstance().remoteCall(s, {
          plotItemId : cY,
          plotId : cW,
          timeFrom : cT,
          timeTo : cV,
          msgIndex : cU
        }, wialon.util.Helper.wrapCallback(cX), 300);
      },
      getPlotsUrl : function(db, da, dc){

        return wialon.core.Session.getInstance().getBaseUrl() + F + wialon.core.Session.getInstance().getId() + A + wialon.util.Json.stringify({
          fileName : db ? db : a,
          plots : da,
          tzOffset : dc
        });
      },
      importPlot : function(de, df, dd){

        wialon.core.Uploader.getInstance().uploadFiles([de], f, {
          tzOffset : df,
          callMode : C
        }, wialon.util.Helper.wrapCallback(dd), true);
      },
      registerPlots : function(dg, di, dh, dj){

        return wialon.core.Remote.getInstance().remoteCall(f, {
          resourceId : dg,
          groupId : di,
          config : dh,
          callMode : w
        }, wialon.util.Helper.wrapCallback(dj), 300);
      },
      getUnitsInPlots : function(dk){

        return wialon.core.Remote.getInstance().remoteCall(l, {
        }, wialon.util.Helper.wrapCallback(dk), 300);
      },
      print : {
        fileType : {
          svg : 0x01,
          png : 0x02
        },
        imageFlag : {
          a0 : 0x01,
          a1 : 0x02,
          a2 : 0x04,
          a3 : 0x08,
          a4 : 0x10,
          attachMap : 0x20,
          colored : 0x40
        },
        mapScale : {
          normal : 0x00,
          x2 : 0x01,
          x4 : 0x02,
          x6 : 0x03,
          x8 : 0x04,
          x10 : 0x05,
          x20 : 0x06,
          x50 : 0x07,
          x100 : 0x08,
          x200 : 0x09,
          x400 : 0x0A,
          x1000 : 0x0B
        },
        font : {
          dejaVuSans : q,
          dejaVuSansOblique : H,
          dejaVuSansBold : J,
          dejaVuSansBoldOblique : m,
          arial : o,
          arialBlack : j,
          courierNew : g,
          comicSansMS : b,
          georgia : p,
          impact : n,
          timesNewRoman : t,
          trebuchetMS : u,
          verdana : D
        },
        plotFlag : {
          placementHorizontal : 0x00,
          landscape : 0x01,
          rotate90CCW : 0x02,
          plotName : 0x04,
          plotDescription : 0x08,
          plotArea : 0x10,
          usefulPlotArea : 0x20,
          crop : 0x40,
          placementVertical : 0x80
        }
      },
      __eL : function(dl, dn, dp){

        var dq = wialon.core.Session.getInstance().getRenderer();
        if(!dq)return;
        var dm = null;
        if(dn == 0 && dp){

          if(typeof dp.name != L){

            dm = new wialon.render.Layer(dp);
            dq.getLayers().push(dm);
          };
          dq.setVersion(dq.getVersion() + 1);
        };
        dl(dn, dm);
      },
      __fg : function(dr, dt, du){

        var dv = wialon.core.Session.getInstance().getRenderer();
        if(!dv)return;
        var ds = null;
        if(dt == 0 && du && du.layer){

          if(typeof du.layer.name != L){

            ds = new wialon.render.Layer(du.layer);
            dv.getLayers().push(ds);
          };
          dv.setVersion(dv.getVersion() + 1);
        };
        dr(dt, {
          layer : ds,
          cultivation : du.cultivation
        });
      },
      __fh : function(dz, dy, dA){

        var dB = wialon.core.Session.getInstance().getRenderer();
        if(!dB)return;
        var dx = null;
        if(dy == 0 && dA && dA.data && dA.data.layer){

          var dw = dB.getLayers();
          for(var i = dw.length - 1;i >= 0;i--){

            if(dw[i].getName() == dA.data.layer.name){

              dw[i].dispose();
              qx.lang.Array.remove(dw, dw[i]);
            };
          };
          if(typeof dA.data.layer.name != L){

            dx = new wialon.render.Layer(dA.data.layer);
            dB.getLayers().push(dx);
          };
          dB.setVersion(dB.getVersion() + 1);
        };
        dz(dy, {
          layer : dx,
          registrar : (dA && dA.data) ? dA.data.registrar : []
        });
      }
    }
  });
})();
(function(){

  var a = "string",b = "exchange/import_zones_save",c = "&svc=exchange/export_messages&params=",d = "",e = "/wialon/ajax.html?sid=",f = "core/search_item",g = ">",h = "exchange/import_json",i = "&svc=exchange/export_pois&params=",j = "&svc=exchange/export_zones&params=",k = "txt",l = "kml",m = "exchange/import_pois_save",n = "exchange/import_xml",o = "static",p = "&svc=exchange/export_json&params=",q = "wlb",r = "<",s = "wialon.exchange.Exchange",t = "plt",u = "wln";
  qx.Class.define(s, {
    type : o,
    statics : {
      msgExportFormat : {
        plt : t,
        nmea : k,
        kml : l,
        wln : u,
        wlb : q
      },
      getJsonExportUrl : function(v, x){

        if(typeof x != a || !x.length)x = (new Date()).getTime();
        var w = {
          json : v,
          fileName : x
        };
        return wialon.core.Session.getInstance().getBaseUrl() + e + wialon.core.Session.getInstance().getId() + p + encodeURI(qx.lang.Json.stringify(w).replace(/&lt;/g, r).replace(/&gt;/g, g));
      },
      importJson : function(y, z){

        wialon.core.Uploader.getInstance().uploadFiles(y, h, {
        }, z, true);
      },
      importXml : function(A, B){

        wialon.core.Uploader.getInstance().uploadFiles(A, n, {
        }, B, true);
      },
      getMessagesExportUrl : function(D, F, E){

        var C = {
          layerName : D,
          format : F,
          compress : E
        };
        return wialon.core.Session.getInstance().getBaseUrl() + e + wialon.core.Session.getInstance().getId() + c + qx.lang.Json.stringify(C);
      },
      getPOIsExportUrl : function(J, H, I){

        if(!H || !H.length)return d;
        var G = {
          fileName : J,
          pois : H,
          compress : I
        };
        return wialon.core.Session.getInstance().getBaseUrl() + e + wialon.core.Session.getInstance().getId() + i + qx.lang.Json.stringify(G);
      },
      getZonesExportUrl : function(N, K, M){

        if(!K || !K.length)return d;
        var L = {
          fileName : N,
          zones : K,
          compress : M
        };
        return wialon.core.Session.getInstance().getBaseUrl() + e + wialon.core.Session.getInstance().getId() + j + qx.lang.Json.stringify(L);
      },
      importPois : function(O, P, Q){

        return wialon.core.Remote.getInstance().remoteCall(m, {
          itemId : O,
          pois : P
        }, qx.lang.Function.bind(this.__fi, this, Q));
      },
      importZones : function(S, R, T){

        return wialon.core.Remote.getInstance().remoteCall(b, {
          itemId : S,
          zones : R
        }, qx.lang.Function.bind(this.__fi, this, T));
      },
      getItemJson : function(U, V){

        V = wialon.util.Helper.wrapCallback(V);
        return wialon.core.Remote.getInstance().remoteCall(f, {
          id : U,
          flags : wialon.util.Number.umax()
        }, qx.lang.Function.bind(V));
      },
      __fi : function(W, X, Y){

        if(X || !Y){

          W(X);
          return;
        };
        W(0, Y);
      }
    }
  });
})();
(function(){

  var a = "/gis_copyright",c = "/gis_get_route",d = "",e = "/gis_geocode",f = "number",g = "/gis_searchintelli",h = "string",i = "render",j = "/gis_check_point",k = "routing",l = "wialon.util.Gis",m = "/gis_search",n = "search",o = "geocode",q = "static";
  qx.Class.define(l, {
    type : q,
    statics : {
      geocodingFlags : {
        level_countries : 1,
        level_regions : 2,
        level_cities : 3,
        level_streets : 4,
        level_houses : 5
      },
      searchFlags : {
        search_countries : 0,
        search_regions : 1,
        search_cities : 2,
        search_streets : 3,
        search_houses : 4,
        search_full_path : 0x100,
        search_map_name : 0x200,
        search_coords : 0x400
      },
      searchByStringFlags : {
        search_countries : 0x1,
        search_regions : 0x2,
        search_cities : 0x4,
        search_streets : 0x8,
        search_houses : 0x10
      },
      geocodingParams : {
        flags : 0,
        city_radius : 0,
        dist_from_unit : 0,
        txt_dist : d,
        house_detect_radius : 0
      },
      routingFlags : {
        AStar : 0x1,
        AstarBidirect : 0x2,
        Alt : 0x4,
        AltBidirect : 0x8,
        Ch : 0x10,
        UseRestrictions : 0x2000,
        ByTime : 0x4000,
        Debug : 0x8000
      },
      decodePoly : function(y){

        y = String(y);
        var v = [];
        var r = 0;
        var t = y.length;
        var x = 0;
        var z = 0;
        while(r < t){

          var s = 0;
          var A = 0;
          var b = 0;
          do {

            b = y.charCodeAt(r++) - 63;
            A |= (b & 0x1f) << s;
            s += 5;
          }while(b >= 0x20);
          var u = ((A & 1) != 0 ? ~(A >> 1) : (A >> 1));
          x += u;
          s = 0;
          A = 0;
          do {

            b = y.charCodeAt(r++) - 63;
            A |= (b & 0x1f) << s;
            s += 5;
          }while(b >= 0x20);
          var w = ((A & 1) != 0 ? ~(A >> 1) : (A >> 1));
          z += w;
          var p = {
            lat : x / 100000,
            lon : z / 100000
          };
          v.push(p);
        };
        return v;
      },
      getRoute : function(B, G, C, I, E, D){

        D = wialon.util.Helper.wrapCallback(D);
        if(typeof B != f || typeof G != f || typeof C != f || typeof I != f){

          D(2, null);
          return;
        };
        if(typeof E != f || !E)E = 0x01;
        var F = {
          lat1 : B,
          lon1 : G,
          lat2 : C,
          lon2 : I,
          flags : E
        };
        var H = wialon.core.Session.getInstance().getCurrUser();
        if(H)F.uid = H.getId();
        var self = this;
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseGisUrl(k) + c, F, function(J, K){

          if(!J){

            if(K.points){

              K.points = self.decodePoly(K.points);
            };
            D(0, K);
          } else D(J, null);
        }, 10);
      },
      getLevelFlags : function(Q, O, P, M, N){

        if(Q < 1 || Q > 5)return 1255211008;
        var L = Q << 28;
        if(O > 0 || O < 6)L += O << 25;
        if(P > 0 || P < 6)L += P << 22;
        if(M > 0 || M < 6)L += M << 19;
        if(N > 0 || N < 6)L += N << 16;
        return L;
      },
      getLocations : function(S, R){

        R = wialon.util.Helper.wrapCallback(R);
        if(!S){

          R(2, null);
          return;
        };
        var T = qx.lang.Object.clone(this.geocodingParams);
        T.coords = wialon.util.Json.stringify(S);
        var U = wialon.core.Session.getInstance().getCurrUser();
        if(U)T.uid = U.getId();
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseGisUrl(o) + e, T, R, (S && S.length > 1) ? 10 : 2);
      },
      searchByString : function(bb, X, V, W){

        W = wialon.util.Helper.wrapCallback(W);
        if(typeof bb != h || typeof V != f){

          W(2, null);
          return;
        };
        var ba = {
          phrase : bb,
          flags : X,
          count : V
        };
        var Y = wialon.core.Session.getInstance().getCurrUser();
        if(Y)ba.uid = Y.getId();
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseGisUrl(n) + g, ba, W, 10);
      },
      search : function(be, bf, bd, bh, bi, bc, bg){

        bg = wialon.util.Helper.wrapCallback(bg);
        if(typeof be != h || typeof bf != h || typeof bd != h || typeof bh != h){

          bg(2, null);
          return;
        };
        var bj = {
          country : be,
          region : bf,
          city : bd,
          street : bh,
          flags : bi,
          count : bc
        };
        var bk = wialon.core.Session.getInstance().getCurrUser();
        if(bk)bj.uid = bk.getId();
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseGisUrl(n) + m, bj, bg, 10);
      },
      copyright : function(bl, bq, bm, bs, bn, bo){

        bo = wialon.util.Helper.wrapCallback(bo);
        if(typeof bl != f || typeof bq != f || typeof bm != f || typeof bs != f || typeof bn != f){

          bo(2, null);
          return;
        };
        var bp = {
          lat1 : bl,
          lon1 : bq,
          lat2 : bm,
          lon2 : bs,
          zoom : bn
        };
        var br = wialon.core.Session.getInstance().getCurrUser();
        if(br)bp.uid = br.getId();
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseGisUrl(i) + a, bp, bo, 10);
      },
      checkPointForObject : function(bB, bw, bu, bv, bt, by, bA, bz, bx){

        bx = wialon.util.Helper.wrapCallback(bx);
        if(typeof bB != f || typeof bw != f || typeof bu != h || typeof bv != h || typeof bt != h || typeof by != h || typeof bz != f){

          bx(2, null);
          return;
        };
        var bC = {
          lat : bB,
          lon : bw,
          country : bu,
          region : bv,
          city : bt,
          street : by,
          house : bA,
          radius : bz
        };
        wialon.core.Remote.getInstance().ajaxRequest(wialon.core.Session.getInstance().getBaseGisUrl(o) + j, bC, bx, 10);
      }
    }
  });
})();
(function(){

  var a = "&",b = "data",c = "error",d = "&sid=",e = "",f = "wialon.core.NodeHttp",g = ")",h = "http",i = "(",j = "utf8",k = "://",l = "=",m = "https",o = "sid",p = ":",q = "end",r = "?",s = "object";
  qx.Class.define(f, {
    extend : qx.core.Object,
    construct : function(t, v){

      qx.core.Object.call(this);
      var u = wialon.core.Session.getInstance().getBaseUrl().split(k);
      if(u[0] == m){

        this._port = 443;
        this._http = require(m);
      } else {

        this._port = 80;
        this._http = require(h);
      };
      u = u[u.length - 1].split(p);
      if(u.length > 1)this._port = u[1];
      this._hostname = u[0];
      this._callbacks = {
      };
    },
    members : {
      send : function(x, y, w, A, z){

        if(x.indexOf(r) == -1)x += r + this.__dG(y); else x += a + this.__dG(y);
        var C = {
          host : this._hostname,
          port : this._port,
          path : x
        };
        var B = {
          counter : ++this._counter,
          options : C
        };
        this._callbacks[this._counter] = [w, A, B, 0, z, null, e];
        this.__fj(this._counter);
      },
      supportAsync : function(){

        return true;
      },
      _http : null,
      _hostname : e,
      _port : 80,
      _id : 0,
      _callbacks : {
      },
      _timeout : 0,
      _counter : 0,
      __dG : function(F){

        var D = [];
        var E = false;
        if(typeof F == s){

          for(var n in F){

            if(typeof F[n] == s)D.push(n + l + encodeURIComponent(wialon.util.Json.stringify(F[n]))); else D.push(n + l + encodeURIComponent(F[n]));
            if(n == o)E = true;
          };
          return D.join(a) + (!E ? d + wialon.core.Session.getInstance().getId() : e);
        };
        return !E ? d + wialon.core.Session.getInstance().getId() : e;
      },
      __dF : function(H){

        var G = this._callbacks[H];
        if(!G)return;
        if(G[1])G[1]();
        delete this._callbacks[H];
      },
      __fj : function(J){

        var I = this._callbacks[J];
        if(I[4])I.push(setTimeout(qx.lang.Function.bind(this.__dF, this, J), I[4] * 1000));
        var L = qx.lang.Function.bind(this.__dD, this, J, 0, e);
        var K = qx.lang.Function.bind(function(M, N){

          N.setEncoding(j);
          N.on(b, qx.lang.Function.bind(this.__fk, this, M));
          N.on(q, qx.lang.Function.bind(this.__dD, this, M));
        }, this, J);
        this._http.get(I[2].options, K).on(c, L);
      },
      __fk : function(P, Q){

        var O = this._callbacks[P];
        if(!O || !Q)return;
        O[6] += Q;
      },
      __dD : function(counter, err){

        var callback = this._callbacks[counter];
        if(!callback)return;
        var tm1 = new Date();
        var data = eval(i + callback[6] + g);
        if(!data){

          callback[1]();
          return;
        };
        if(data.error && data.error == 1003 && callback[3] < 3){

          callback[3]++;
          callback[6] = e;
          if(callback[4] && callback[5]){

            clearTimeout(callback[5]);
            callback[5] = setTimeout(qx.lang.Function.bind(this.__dF, this, counter), callback[4] * 1000);
          };
          setTimeout(qx.lang.Function.bind(function(R){

            this.__fj(counter);
          }, this, counter), Math.random() * 1000);
          return;
        };
        if(callback[0])callback[0](data);
        if(callback[4] && callback[5])clearTimeout(callback[5]);
        delete this._callbacks[counter];
      }
    }
  });
})();
(function(){

  var a = "wialon.util.String",b = '',c = "null",d = 'x',e = 'c',f = "",g = 'b',h = 'X',k = 'o',m = '-',n = 'f',o = ' ',p = "x",q = '%',r = ":",s = 's',t = 'd',u = "0",v = "undefined",w = "string",x = "static";
  qx.Class.define(a, {
    type : x,
    statics : {
      wrapString : function(y){

        if(typeof y == v || !y.length)y = f;
        return y;
      },
      xor : function(A, B){

        var z = [];
        for(var i = 0;i < A.length;i++)z.push(A.charCodeAt(i) ^ B.charCodeAt(i % B.length));
        return z.join(r);
      },
      unxor : function(D, E){

        var C = f;
        if(D == f)return D;
        D = D.split(r);
        for(var i = 0;i < D.length;i++)C += String.fromCharCode(D[i] ^ E.charCodeAt(i % E.length));
        return C;
      },
      isValidText : function(F){

        if(F === c)return false;
        var G = f + F;
        var H = /([\"\{\}\\])/i;
        return (G != null && typeof G === w && (!G.length || !H.test(G)));
      },
      isValidName : function(name, J){

        var K = f + name;
        if(J == null)return (K != null && this.isValidText(K) && K.length > 0 && K[0] != o && K[K.length - 1] != o);
        var L = (J.min != null ? J.min : 1);
        var I = (J.max != null ? J.max : 4096);
        return (K != null && this.isValidText(K) && K.length >= L && K.length <= I && K[0] != o && K[K.length - 1] != o);
      },
      isValidEmail : function(M){

        return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(M);
      },
      isValidPhone : function(N){

        var O = f + N;
        return (O != null && this.isValidText(O) && (/^[+]{1,1}[\d]{7,16}$/i).test(O));
      },
      stringMatchTemplates : function(R, P, Q){

        if(typeof R != w || !R.length || !(P instanceof Array))return true;
        if(typeof Q != w || Q.length != 1)Q = p;
        for(var i = 0;i < P.length;i++){

          var S = P[i];
          if(typeof S != w || S.length != R.length)continue;
          var T = true;
          for(var j = 0;j < R.length;j++){

            if(R[j] != S[j] && S[j].toLowerCase() != Q[0]){

              T = false;
              break;
            };
          };
          if(T)return true;
        };
        return false;
      },
      sprintf : function(){

        if(typeof arguments == v){

          return null;
        };
        if(arguments.length < 1){

          return null;
        };
        if(typeof arguments[0] != w){

          return null;
        };
        if(typeof RegExp == v){

          return null;
        };
        var V = arguments[0];
        var ba = new RegExp(/(%([%]|(\-)?(\+|\x20)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX])))/g);
        var W = new Array();
        var be = new Array();
        var X = 0;
        var Y = 0;
        var bc = 0;
        var bg = 0;
        var bd = b;
        var bf = null;
        while(bf = ba.exec(V)){

          if(bf[9]){

            X += 1;
          };
          Y = bg;
          bc = ba.lastIndex - bf[0].length;
          be[be.length] = V.substring(Y, bc);
          bg = ba.lastIndex;
          W[W.length] = {
            match : bf[0],
            left : bf[3] ? true : false,
            sign : bf[4] || b,
            pad : bf[5] || o,
            min : bf[6] || 0,
            precision : bf[8],
            code : bf[9] || q,
            negative : parseFloat(arguments[X]) < 0 ? true : false,
            argument : String(arguments[X])
          };
        };
        be[be.length] = V.substring(bg);
        if(W.length == 0){

          return V;
        };
        if((arguments.length - 1) < X){

          return null;
        };
        var U = null;
        var bf = null;
        var i = null;
        var bb = null;
        for(i = 0;i < W.length;i++){

          if(W[i].code == q){

            bb = q;
          } else if(W[i].code == g){

            W[i].argument = String(Math.abs(parseInt(W[i].argument)).toString(2));
            bb = this.__fl(W[i], true);
          } else if(W[i].code == e){

            W[i].argument = String(String.fromCharCode(parseInt(Math.abs(parseInt(W[i].argument)))));
            bb = this.__fl(W[i], true);
          } else if(W[i].code == t){

            W[i].argument = String(Math.abs(parseInt(W[i].argument)));
            bb = this.__fl(W[i]);
          } else if(W[i].code == n){

            W[i].argument = String(Math.abs(parseFloat(W[i].argument)).toFixed(W[i].precision ? W[i].precision : 6));
            bb = this.__fl(W[i]);
          } else if(W[i].code == k){

            W[i].argument = String(Math.abs(parseInt(W[i].argument)).toString(8));
            bb = this.__fl(W[i]);
          } else if(W[i].code == s){

            W[i].argument = W[i].argument.substring(0, W[i].precision ? W[i].precision : W[i].argument.length);
            bb = this.__fl(W[i], true);
          } else if(W[i].code == d){

            W[i].argument = String(Math.abs(parseInt(W[i].argument)).toString(16));
            bb = this.__fl(W[i]);
          } else if(W[i].code == h){

            W[i].argument = String(Math.abs(parseInt(W[i].argument)).toString(16));
            bb = this.__fl(W[i]).toUpperCase();
          } else {

            bb = W[i].match;
          };;;;;;;;
          bd += be[i];
          bd += bb;
        };
        bd += be[i];
        return bd;
      },
      __fl : function(bj, bh){

        if(bh){

          bj.sign = b;
        } else {

          bj.sign = bj.negative ? m : bj.sign;
        };
        var l = bj.min - bj.argument.length + 1 - bj.sign.length;
        var bi = new Array(l < 0 ? 0 : l).join(bj.pad);
        if(!bj.left){

          if(bj.pad == u || bh){

            return bj.sign + bi + bj.argument;
          } else {

            return bi + bj.sign + bj.argument;
          };
        } else {

          if(bj.pad == u || bh){

            return bj.sign + bj.argument + bi.replace(/0/g, o);
          } else {

            return bj.sign + bj.argument + bi;
          };
        };
      }
    }
  });
})();
(function(){

  var e = "-",h = "'",j = "0",m = "",n = "&deg;",q = "wialon.util.Geometry",t = "00",u = "render/calculate_polygon",w = " ",x = "render/calculate_polyline",y = "static",z = "object";
  qx.Class.define(q, {
    type : y,
    statics : {
      getDistance : function(I, L, J, M){

        var k = Math.PI / 180;
        var H = 1 / 298.257;
        var c,d,f,g,C,B,l,o,r,s,G,F,N,D,O,E,K,A;
        if(I == J && L == M)return 0;
        f = (I + J) / 2;
        g = (I - J) / 2;
        l = (L - M) / 2;
        N = Math.sin(g * k);
        D = Math.cos(g * k);
        O = Math.sin(f * k);
        E = Math.cos(f * k);
        K = Math.sin(l * k);
        A = Math.cos(l * k);
        G = Math.pow(N * A, 2);
        F = Math.pow(E * K, 2);
        s = G + F;
        G = Math.pow(D * A, 2);
        F = Math.pow(O * K, 2);
        c = G + F;
        o = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / o;
        d = 2 * o * 6378.137;
        C = (3 * r - 1) / (2 * c);
        B = (3 * r + 1) / (2 * s);
        G = O * D;
        G = G * G * C * H + 1;
        F = E * N;
        F = F * F * B * H;
        return d * (G - F) * 1000;
      },
      getCoordDegrees : function(Q, R, P, T, S, U){

        if(!U)U = n;
        return Q.toFixed(6) + U;
      },
      getCoordMinutes : function(W, X, V, bb, Y, bc){

        if(!bc)bc = n;
        var v = Number(W);
        var ba = (v < 0) ? e : m;
        var be = v > 0 ? bb : Y;
        v = Math.abs(v);
        var bf = Math.floor(v);
        var bd = (v - bf) * 60.0;
        var p = String(bd);
        if(bd < 10)p = j + bd;
        var bg = m;
        if(X == 2){

          if(bf >= 0 && bf < 10)bg = j + bf; else bg = bf;
        } else if(X == 3){

          if(bf >= 0 && bf < 10)bg = t + bf; else if(bf >= 10 && bf < 100)bg = j + bf; else bg = bf;;
        };
        bg = ba + bg;
        return be + w + bg + bc + w + p.substr(0, V + 3) + h;
      },
      getCoord : function(bi, bj, bh, bl, bk, bm){

        return this.getCoordMinutes(bi, bj, bh, bl, bk, bm);
      },
      getDistanceToLine : function(br, bo, bt, bn, bw, bq, bp){

        var bu = {
        };
        if(br == bt && bo == bn)return this.getDistance(br, bo, bw, bq);
        var bv = 0;
        var bs = 0;
        if(bo != bn){

          var a = (br - bt) / (bo - bn);
          var b = br - bo * a;
          bv = (bq + a * bw - a * b) / (a * a + 1.0);
          bs = bv * a + b;
        } else {

          var a = (bo - bn) / (br - bt);
          var b = bo - br * a;
          bs = (bw + a * bq - a * b) / (a * a + 1.0);
          bv = bs * a + b;
        };
        if(!bp)return this.getDistance(bs, bv, bw, bq);
        if(bv < bo && bv < bn || bv > bo && bv > bn || bs < br && bs < bt || bs > br && bs > bt)return -1; else return this.getDistance(bs, bv, bw, bq);
      },
      pointInShape : function(bH, bI, bE, bz, bL){

        if(!bH || typeof bH != z)return false;
        var bA = bH.length;
        if(bH.length > 2 && bI == 0){

          if(bL && !(bz >= bL.min_y && bz <= bL.max_y && bE >= bL.min_x && bE <= bL.max_x))return;
          var bJ = 0;
          var bF = 0;
          var bD = 0;
          var bx = 0;
          var by = 0;
          var bB = 0;
          var bK = 0;
          var bM = 0;
          var bC = false;
          bD = bH[bA - 1].x;
          bx = bH[bA - 1].y;
          for(var i = 0;i < bA;i++){

            bJ = bH[i].x;
            bF = bH[i].y;
            if(bJ > bD){

              by = bD;
              bK = bJ;
              bB = bx;
              bM = bF;
            } else {

              by = bJ;
              bK = bD;
              bB = bF;
              bM = bx;
            };
            if((bJ < bE) == (bE <= bD) && (bz - bB) * (bK - by) < (bM - bB) * (bE - by)){

              bC = !bC;
            };
            bD = bJ;
            bx = bF;
          };
          return bC;
        } else if(bH.length > 1 && bI){

          if(bL && !(bz >= bL.min_y && bz <= bL.max_y && bE >= bL.min_x && bE <= bL.max_x))return;
          var bO = 0;
          var bN = 0;
          for(var i = 0;i < bA;i++){

            var bG = this.getDistance(bH[i].y, bH[i].x, bz, bE);
            if(bI && bG != -1 && bG <= bI)return true;
            if(bI){

              if(bG != -1 && bG <= bI / 2)return true;
              if(i > 0){

                var bG = this.getDistanceToLine(bH[i].y, bH[i].x, bO, bN, bz, bE, true);
                if(bG != -1 && bG <= bI / 2)return true;
              };
            };
            bO = bH[i].y;
            bN = bH[i].x;
          };
        } else if(bH.length == 1 && bI){

          var p = bH[0];
          bG = this.getDistance(p.y, p.x, bz, bE);
          if(bG != -1 && bG <= bI)return true;
        };;
        return false;
      },
      getShapeCenter : function(bT){

        if(!bT || typeof bT != z)return;
        var bU = bT.length;
        var bR = 0xFFFFFFFF;
        var bS = 0xFFFFFFFF;
        var bP = -0xFFFFFFFF;
        var bQ = -0xFFFFFFFF;
        for(var i = 0;i < bU;i++){

          if(bT[i].x < bR)bR = bT[i].x;
          if(bT[i].x > bP)bP = bT[i].x;
          if(bT[i].y < bS)bS = bT[i].y;
          if(bT[i].y > bQ)bQ = bT[i].y;
        };
        return {
          x : (bP + bR) / 2,
          y : (bQ + bS) / 2
        };
      },
      calculatePolygon : function(bW, bX, bV){

        wialon.core.Remote.getInstance().remoteCall(u, {
          p : bW,
          flags : bX
        }, wialon.util.Helper.wrapCallback(bV));
      },
      calculatePolyline : function(ca, cb, bY, cc){

        wialon.core.Remote.getInstance().remoteCall(x, {
          p : ca,
          flags : cb,
          w : bY
        }, wialon.util.Helper.wrapCallback(cc));
      },
      calculateBoundary : function(cj){

        var ci = 0;
        var cm = 0;
        var ch = 0;
        var co = 0;
        var cd = 0;
        if(!ci && !cm && !ch && !co){

          var cd = 0;
          for(var i = 0;i < cj.length;i++){

            var cn = cj[i];
            if(!ci && !cm && !ch && !co){

              ch = cn.y;
              ci = cn.y;
              co = cn.x;
              cm = cn.x;
              cd = cn.w;
            } else {

              if(co > cn.x)co = cn.x;
              if(cm < cn.x)cm = cn.x;
              if(ch > cn.y)ch = cn.y;
              if(ci < cn.y)ci = cn.y;
              if(cn.radius > cd)cd = cn.w;
            };
          };
          var ce = wialon.util.Geometry.getDistance(ch, co, ch + 1, co);
          var ck = wialon.util.Geometry.getDistance(ch, co, ch, co + 1);
          if(ce && ck){

            ch -= cd / ce;
            co -= cd / ck;
            ci += cd / ce;
            cm += cd / ck;
          };
        };
        return {
          min_y : ch,
          min_x : co,
          max_y : ci,
          max_x : cm
        };
      }
    }
  });
})();
(function(){

  var a = "Error performing request",b = "Item with such unique property already exists",c = "Invalid result",d = "Authorization server is unavailable, please try again later",e = "Internal billing error",f = "static",g = "Destination resource is not an account",h = "Error getting creator of destination account",i = "Error getting source account",j = "Error changing account of the item",k = "Access denied",l = "Messages count has exceeded the limit",m = "Invalid service",n = "Invalid user name or password",o = "Only one request of given time is allowed at the moment",p = "No message for selected interval",q = "Error moving item on a tree parents",r = "Abort batch request",s = "Execution time has exceeded the limit",t = "",u = "Error changing creator of the item",v = "wialon.core.Errors",w = "Item already in the destination account",x = "Invalid user name or e-mail",y = "Invalid input item or source account",z = "Invalid input",A = "Creator of destination account no access to item",B = "Error operation in the billing",C = "Selected user is a creator for some system objects, thus this user cannot be bound to a new account",D = "Invalid session",E = "Account is blocked",F = "Unknown error";
  qx.Class.define(v, {
    type : f,
    statics : {
      getErrorText : function(G){

        switch(G){case 0:
        return t;case 1:
        return D;case 2:
        return m;case 3:
        return c;case 4:
        return z;case 5:
        return a;case 6:
        break;case 7:
        return k;case 8:
        return n;case 9:
        return d;case 10:
        return r;case 11:
        return x;case 1001:
        return p;case 1002:
        return b;case 1003:
        return o;case 1004:
        return l;case 1005:
        return s;case 2001:
        return y;case 2002:
        return g;case 2003:
        return e;case 2004:
        return E;case 2005:
        return h;case 2006:
        return A;case 2007:
        return i;case 2008:
        return w;case 2009:
        return q;case 2010:
        return B;case 2011:
        return e;case 2012:
        return j;case 2013:
        return u;case 2014:
        return C;default:
        break;};
        return F;
      }
    }
  });
})();
(function(){

  var a = "yyyy-MM-dd",b = "Tue",c = "Tuesday",e = "%B",f = "Sun",g = "Tir",h = "Shahrivar",j = "Mon",k = "yyyy-MM-dd HH:mm:ss",l = "am",m = "August",n = "Apr",o = "Mar",p = "Aug",q = "HH:mm",r = "H:m:s",s = "Jul",u = "Monday",v = "string",w = "static",x = "Aban",y = "Day",z = "June",A = "%H",B = "wialon.util.DateTime",C = "%S",D = "Saturday",E = "Mordad",F = "May",G = "Dec",H = "%02d %s %04d %02d:%02d:%02d",I = "January",J = "%a",K = "Khordad",L = "%l",M = "September",N = "October",O = "Oct",P = "%m",Q = "Nov",R = "Thursday",S = "%I",T = "%E",U = "Esfand",V = "",W = "April",X = "number",Y = "Thu",bR = "Bahman",bS = "Jun",bT = "%p",bN = "November",bO = "Farvardin",bP = "0",bQ = "%Y",bX = "Sep",bY = 'day',ca = "March",cs = "Mehr",bU = "Friday",bV = "Sunday",bW = "Feb",bJ = "g",cd = 'days',bM = "Jan",ce = "%e",cf = "Azar",bL = "Ordibehest",cb = "July",cm = "%b",cc = "%M",cg = "pm",ch = "%P",ci = "Sat",cn = "December",co = "Wednesday",cp = "February",bK = "Wed",cj = "%y",ck = "tz",cl = "Fri",cq = "undefined",cr = "%A";
  qx.Class.define(B, {
    type : w,
    statics : {
      formatTime : function(cw, ct, cu){

        if(!cw || typeof cw != X)return V;
        var cx = cu;
        cw = this.userTime(cw);
        var d = new Date(cw * 1000);
        if(!cx || typeof cx != v){

          cx = k;
          if(ct){

            var cy = new Date(this.userTime(wialon.core.Session.getInstance().getServerTime()) * 1000);
            if((d.getUTCFullYear() == cy.getUTCFullYear() && d.getUTCMonth() == cy.getUTCMonth() && d.getUTCDate() == cy.getUTCDate()) || ct == 2)cx = q;
          };
        };
        cx = this.convertFormat(cx);
        var cv = {
          "%A" : this.__mt.days[d.getUTCDay()],
          "%a" : this.__mt.days_abbrev[d.getUTCDay()],
          "%E" : this.__fm(d.getUTCDate()),
          "%e" : d.getUTCDate(),
          "%I" : this.__fm((d.getUTCHours() % 12) ? (d.getUTCHours() % 12) : 12),
          "%M" : this.__fm(d.getUTCMinutes()),
          "%S" : this.__fm(d.getUTCSeconds()),
          "%p" : d.getUTCHours() >= 12 ? cg : l,
          "%Y" : d.getUTCFullYear(),
          "%y" : this.__fm(d.getUTCFullYear() % 100),
          "%H" : this.__fm(d.getUTCHours()),
          "%B" : this.__mt.months[d.getUTCMonth()],
          "%b" : this.__mt.months_abbrev[d.getUTCMonth()],
          "%m" : this.__fm(d.getUTCMonth() + 1),
          "%l" : d.getUTCMonth() + 1,
          "%P" : this.persianFormatTime(this.absoluteTime(cw))
        };
        for(var i in cv)cx = cx.replace(new RegExp(i, bJ), cv[i]);
        return cx;
      },
      formatDate : function(cB, cz){

        if(!cB || typeof cB != X)return V;
        var cC = cz;
        if(!cC || typeof cC != v)cC = a;
        cB = this.userTime(cB);
        var d = new Date(cB * 1000);
        cC = this.convertFormat(cC);
        var cA = {
          "%A" : this.__mt.days[d.getUTCDay()],
          "%a" : this.__mt.days_abbrev[d.getUTCDay()],
          "%E" : this.__fm(d.getUTCDate()),
          "%e" : d.getUTCDate(),
          "%Y" : d.getUTCFullYear(),
          "%y" : this.__fm(d.getUTCFullYear() % 100),
          "%B" : this.__mt.months[d.getUTCMonth()],
          "%b" : this.__mt.months_abbrev[d.getUTCMonth()],
          "%m" : this.__fm(d.getUTCMonth() + 1),
          "%l" : d.getUTCMonth() + 1,
          "%P" : this.persianFormatTime(this.absoluteTime(cB))
        };
        for(var i in cA)cC = cC.replace(new RegExp(i, bJ), cA[i]);
        return cC;
      },
      formatDuration : function(cD, cE){

        var cI = V;
        if(typeof cD !== X || cD < 0)return cI;
        if(!cE || typeof cE !== v)cE = r;
        var cJ = this.getAbsoluteDaysDuration(cD);
        var cG = {
          'd' : cJ,
          'l' : this.getPluralForm(cJ),
          'h' : this.__fm(this.getRelativeHoursDuration(cD)),
          'H' : this.__fm(this.getAbsoluteHoursDuration(cD)),
          'm' : this.__fm(this.getRelativeMinutesDuration(cD)),
          'M' : this.__fm(this.getAbsoluteHoursDuration(cD)),
          's' : this.__fm(this.getRelativeSecondsDuration(cD)),
          'S' : this.__fm(this.getAbsoluteSecondsDuration(cD))
        };
        for(var i = 0,cF = cE.length;i < cF;i++){

          var cH = cE[i];
          if(cG.hasOwnProperty(cH)){

            cI += cG[cH];
          } else {

            cI += cH;
          };
        };
        return cI;
      },
      getAbsoluteDaysDuration : function(cK){

        if(typeof cK !== X || cK < 0)return 0;
        return Math.floor(cK / 86400);
      },
      getPluralForm : function(cL, cN){

        if(!cN)cN = this.__mt.days_plural;
        if(cN.length === 3){

          var cM = 0;
          if(cL % 10 === 1 && cL % 100 !== 11){

            cM = 0;
          } else if(cL % 10 >= 2 && cL % 10 <= 4 && (cL % 100 < 10 || cL % 100 >= 20)){

            cM = 1;
          } else {

            cM = 2;
          };
          return cN[cM];
        };
        return V;
      },
      getAbsoluteHoursDuration : function(cO){

        if(typeof cO !== X || cO < 0)return 0;
        return Math.floor(cO / 3600);
      },
      getRelativeHoursDuration : function(cP){

        if(typeof cP !== X || cP < 0)return 0;
        return Math.floor((cP - this.getAbsoluteDaysDuration(cP) * 86400) / 3600);
      },
      getAbsoluteMinutesDuration : function(cQ){

        if(typeof cQ !== X || cQ < 0)return 0;
        return Math.floor(cQ / 60);
      },
      getRelativeMinutesDuration : function(cR){

        if(typeof cR !== X || cR < 0)return 0;
        var cS = this.getAbsoluteHoursDuration(cR);
        return Math.floor((cR - cS * 3600) / 60);
      },
      getAbsoluteSecondsDuration : function(cT){

        if(typeof cT !== X || cT < 0)return 0;
        return cT;
      },
      getRelativeSecondsDuration : function(cV){

        if(typeof cV !== X || cV < 0)return V;
        var cU = this.getAbsoluteMinutesDuration(cV);
        return cV - cU * 60;
      },
      persianFormatTime : function(dd){

        if(!dd || typeof dd != X)return V;
        dd = this.userTime(dd);
        var d = new Date(dd * 1000);
        var da = [bO, bL, K, g, E, h, cs, x, cf, y, bR, U];
        var i = 0;
        var de = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var db = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        var dc = d.getUTCFullYear() - 1600;
        var cW = 365 * dc + parseInt((dc + 3) / 4) - parseInt((dc + 99) / 100) + parseInt((dc + 399) / 400);
        for(i = 0;i < d.getUTCMonth();i++)cW += de[i];
        if(d.getUTCMonth() > 1 && ((!(dc % 4) && (dc % 100)) || !(dc % 400)))cW++;
        cW += d.getUTCDate() - 1;
        var df = cW - 79;
        var cX = parseInt(df / 12053);
        df %= 12053;
        var cY = 979 + 33 * cX + 4 * parseInt(df / 1461);
        df %= 1461;
        if(df >= 366){

          cY += parseInt((df - 1) / 365);
          df = (df - 1) % 365;
        };
        for(i = 0;i < 11 && df >= db[i];i++)df -= db[i];
        return wialon.util.String.sprintf(H, df + 1, da[i], cY, d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
      },
      setLocale : function(di, dh, dj, dg, dk){

        if(di instanceof Array)this.__mt.days = di;
        if(dh instanceof Array)this.__mt.months = dh;
        if(dj instanceof Array)this.__mt.days_abbrev = dj;
        if(dg instanceof Array)this.__mt.months_abbrev = dg;
        if(dk instanceof Array)this.__mt.days_plural = dk;
      },
      convertFormat : function(dn, dm){

        var dl = {
          "HH" : A,
          "MMMM" : e,
          "MMM" : cm,
          "MM" : P,
          "M" : L,
          "PC" : ch,
          "dddd" : cr,
          "ddd" : J,
          "dd" : T,
          "d" : ce,
          "hh" : S,
          "mm" : cc,
          "ss" : C,
          "tt" : bT,
          "yyyy" : bQ,
          "yy" : cj
        };
        if(!dm){

          for(var i in dl)dn = dn.replace(new RegExp(i, bJ), dl[i]);
        } else {

          for(var i in dl)dn = dn.replace(new RegExp(dl[i], bJ), i);
        };
        return dn;
      },
      getTimezone : function(){

        var dp = -(new Date()).getTimezoneOffset() * 60;
        var dq = wialon.core.Session.getInstance().getCurrUser();
        if(!dq)return dp;
        return parseInt(dq.getCustomProperty(ck, dp)) >>> 0;
      },
      getTimezoneOffset : function(){

        var dr = this.getTimezone();
        if((dr & this.__fn.TZ_TYPE_MASK) != this.__fn.TZ_TYPE_WITH_DST)return dr & this.__fn.TZ_OFFSET_MASK;
        return parseInt(dr & 0x80000000 ? ((dr & 0xFFFF) | 0xFFFF0000) : (dr & 0xFFFF));
      },
      getDSTOffset : function(dC){

        if(!dC)return 0;
        var dv = this.getTimezone();
        var dz = dv & this.__fn.TZ_TYPE_MASK;
        var dG = this.getTimezoneOffset(dv);
        if((dz == this.__fn.TZ_TYPE_WITH_DST && (dv & this.__fn.TZ_DST_TYPE_MASK) == this.__fn.TZ_DST_TYPE_NONE) || (dz != this.__fn.TZ_TYPE_WITH_DST && (dv & this.__fn.TZ_DISABLE_DST_BIT)))return 0;
        if((dz == this.__fn.TZ_TYPE_WITH_DST && (dv & this.__fn.TZ_DST_TYPE_MASK) == this.__fn.TZ_DST_TYPE_SERVER) || dz != this.__fn.TZ_TYPE_WITH_DST){

          var ds = new Date();
          ds.setTime(dC * 1000);
          var dA = new Date();
          dA.setTime((dC - 90 * 86400) * 1000);
          var dB = new Date();
          dB.setTime((dC + 150 * 86400) * 1000);
          if(ds.getTimezoneOffset() < dA.getTimezoneOffset() || ds.getTimezoneOffset() < dB.getTimezoneOffset())return 3600;
          return 0;
        };
        var dx = dv & this.__fn.TZ_CUSTOM_DST_MASK;
        var dF = new Date((dC + dG) * 1000);
        var dw = dF.getTime() / 1000;
        var dE = 0;
        var dt = 0;
        var dD = dF.getUTCFullYear();
        if(typeof this.__fp.from[dx | dD] == cq || typeof this.__fp.to[dx | dD] == cq){

          switch(dx){case this.__fo.DST_MAR2SUN2AM_NOV1SUN2AM:
          dE = this.getWdayTime(dD, 2, 2, 0, 0, 2);
          dt = this.getWdayTime(dD, 10, 1, 0, 0, 2);
          break;case this.__fo.DST_MAR6SUN_OCT6SUN:
          dE = this.getWdayTime(dD, 2, 6, 0);
          dt = this.getWdayTime(dD, 9, 6, 0);
          break;case this.__fo.DST_MAR6SUN1AM_OCT6SUN1AM:
          dE = this.getWdayTime(dD, 2, 6, 0, 0, 1);
          dt = this.getWdayTime(dD, 9, 6, 0, 2);
          break;case this.__fo.DST_MAR6THU_SEP6FRI:
          dE = this.getWdayTime(dD, 2, 6, 4);
          dt = this.getWdayTime(dD, 8, 6, 5);
          break;case this.__fo.DST_MAR6SUN2AM_OCT6SUN2AM:
          dE = this.getWdayTime(dD, 2, 6, 0, 0, 2);
          dt = this.getWdayTime(dD, 9, 6, 0, 0, 2);
          if(dC > 1414281600)return 0;
          return 3600;
          break;case this.__fo.DST_MAR30_SEP21:
          dE = this.getWdayTime(dD, 2, 0, -1, 30);
          dt = this.getWdayTime(dD, 8, 0, -1, 21);
          break;case this.__fo.DST_APR1SUN2AM_OCT6SUN2AM:
          dE = this.getWdayTime(dD, 3, 1, 0, 0, 2);
          dt = this.getWdayTime(dD, 9, 6, 0, 0, 2);
          break;case this.__fo.DST_APR1_OCT6SUN:
          dE = this.getWdayTime(dD, 3, 0, -1, 1);
          dt = this.getWdayTime(dD, 9, 6, 0);
          break;case this.__fo.DST_APR6THU_SEP6THU:
          dE = this.getWdayTime(dD, 3, 6, 4);
          dt = this.getWdayTime(dD, 8, 6, 4);
          break;case this.__fo.DST_APR1_OCT1:
          dE = this.getWdayTime(dD, 3, 0, -1, 1);
          dt = this.getWdayTime(dD, 9, 0, -1, 1);
          break;case this.__fo.DST_MAR21_22SUN_SEP20_21SUN:
          if(this.isLeapYear(dD)){

            dE = this.getWdayTime(dD, 2, 0, -1, 21);
            dt = this.getWdayTime(dD, 8, 0, -1, 20, 23, 0, 0);
          } else {

            dE = this.getWdayTime(dD, 2, 0, -1, 22);
            dt = this.getWdayTime(dD, 8, 0, -1, 21, 23, 0, 0);
          };
          break;case this.__fo.DST_SEP1SUNAFTER7_APR1SUNAFTER5:
          dE = this.getWdayTime(dD, 8, 1, 0, 7);
          dt = this.getWdayTime(dD, 3, 1, 0, 5);
          break;case this.__fo.DST_SEP1SUN_APR1SUN:
          dE = this.getWdayTime(dD, 8, 1, 0);
          dt = this.getWdayTime(dD, 3, 1, 0);
          break;case this.__fo.DST_SEP6SUN_APR1SUN:
          dE = this.getWdayTime(dD, 8, 6, 0);
          dt = this.getWdayTime(dD, 3, 1, 0);
          break;case this.__fo.DST_OCT2SUN_MAR2SUN:
          dE = this.getWdayTime(dD, 9, 2, 0);
          dt = this.getWdayTime(dD, 2, 2, 0);
          break;case this.__fo.DST_OCT1SUN_FEB3SUN:
          dE = this.getWdayTime(dD, 9, 3, 0);
          dt = this.getWdayTime(dD, 1, 3, 0);
          break;case this.__fo.DST_OCT3SUN_MAR2SUN:
          dE = this.getWdayTime(dD, 9, 3, 0);
          dt = this.getWdayTime(dD, 2, 2, 0);
          break;case this.__fo.DST_OCT1SUN_MAR2SUN:
          dE = this.getWdayTime(dD, 9, 1, 0);
          dt = this.getWdayTime(dD, 2, 2, 0);
          break;case this.__fo.DST_OCT1SUN_APR1SUN:
          dE = this.getWdayTime(dD, 9, 1, 0);
          dt = this.getWdayTime(dD, 3, 1, 0);
          break;case this.__fo.DST_OCT1SUN_MAR6SUN:
          dE = this.getWdayTime(dD, 9, 1, 0);
          dt = this.getWdayTime(dD, 2, 6, 0);
          break;default:
          return 0;};
          this.__fp.from[dx | dD] = dE;
          if(dt % 2 == 0)dt--;
          this.__fp.to[dx | dD] = dt;
        } else {

          dE = this.__fp.from[dx | dD];
          dt = this.__fp.to[dx | dD];
        };
        var dy = (dv & this.__fn.TZ_DST_TYPE_MASK) == this.__fn.TZ_DST_TYPE_CUSTOM_UTC ? dE : dE - dG;
        var du = (dv & this.__fn.TZ_DST_TYPE_MASK) == this.__fn.TZ_DST_TYPE_CUSTOM_UTC ? dt : dt - dG;
        if(dx >= this.__fo.DST_SOUTHERN_SEMISPHERE)return (dC <= dy && dC >= du) ? 0 : 3600;
        return (dC >= dy && dC <= du) ? 3600 : 0;
      },
      isLeapYear : function(dH){

        if(dH % 4 == 0 && dH % 100 != 0)return true; else if(dH % 4 == 0 && dH % 100 == 0 && dH % 400 == 0)return true;;
        return false;
      },
      getWdayTime : function(dO, dL, dP, dN, dK, dM, dQ, dJ){

        var dR = new Date();
        dR.setUTCFullYear(dO);
        dR.setUTCMonth(dL);
        dR.setUTCDate(1);
        dR.setUTCHours(0);
        dR.setUTCMilliseconds(0);
        dR.setUTCMinutes(0);
        dR.setUTCSeconds(0);
        var dI = 0;
        if(dN == -1)dI = dK; else {

          if(dR.getUTCDay() <= dN)dI = (dN - dR.getUTCDay()) + 1; else dI = 8 - (dR.getUTCDay() - dN);
          if(dP < 6){

            if(dK){

              while(dI <= dK)dI += 7;
            } else if(dP)dI += 7 * (dP - 1);;
          } else {

            var dS = this.getMonthDays(dL, dO);
            if(dI + 4 * 7 <= dS)dI += 4 * 7; else dI += 3 * 7;
          };
        };
        dR.setUTCDate(dI);
        if(dM)dR.setUTCHours(dM);
        if(dQ)dR.setUTCMinutes(dQ);
        if(dJ)dR.setUTCSeconds(dJ);
        return parseInt(dR.getTime() / 1000);
      },
      getMonthDays : function(dU, dV){

        if(dU < 0 || !dV)return 0;
        var dT = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(dU >= dT.length)return 0;
        if(dU == 1 && this.getYearDays(dV) == 365)return 29;
        return dT[dU];
      },
      getYearDays : function(dW){

        if(!dW)return 0;
        if((dW % 4) == 0){

          if((dW % 100) == 0)return ((dW % 400) == 0) ? 365 : 364;
          return 365;
        };
        return 364;
      },
      userTime : function(dX){

        return dX + this.getDSTOffset(dX) + this.getTimezoneOffset();
      },
      absoluteTime : function(ea){

        var t = ea - this.getTimezoneOffset();
        var dY = this.getDSTOffset(t);
        var eb = this.getDSTOffset(t - 3600);
        if(dY == eb)return t - dY;
        return t;
      },
      calculateFlags : function(ec, ed){

        if(!ec || typeof ec != X)ec = 0;
        if(!ed || ed < 1 || ed > 7)ed = 1;
        return (ed << 24) | ec;
      },
      calculateInterval : function(ee, em, ep){

        var el = wialon.item.MReport.intervalFlag;
        var ek = wialon.core.Session.getInstance().getServerTime();
        if(ep & el.useCurrentTime)em = ek;
        if(ep & (el.prevHour | el.prevDay | el.prevWeek | el.prevMonth | el.prevYear))ee = ek;
        var d = new Date(this.userTime(ee) * 1000);
        var eg = ee - d.getUTCSeconds() - 60 * d.getUTCMinutes() - 3600 * d.getUTCHours();
        if(ep & el.prevHour){

          if(ep & el.currTimeAndPrev){

            var eo = ek - (ek % 60);
            ee = eo - 3600 * em;
            em = eo - 1;
          } else {

            var eo = eg + (3600 * d.getUTCHours());
            ee = eo - 3600 * em;
            em = eo - 1;
          };
        } else if(ep & el.prevDay){

          if(ep & el.currTimeAndPrev){

            ee = eg - 86400 * (em - 1);
            em = ek;
          } else {

            ee = eg - 86400 * em;
            em = eg - 1;
          };
        } else if(ep & el.prevWeek){

          var eq = (ep & 0x7000000) >> 24;
          if(!eq)eq = 1;
          var ej = (d.getUTCDay() - eq);
          var ef = eg - 86400 * ((ej >= 0) ? ej : (7 - Math.abs(ej)));
          if(ep & el.currTimeAndPrev){

            ee = ef - 86400 * 7 * (em - 1);
            em = ek;
          } else {

            ee = ef - 86400 * 7 * em;
            em = ef - 1;
          };
        } else if(ep & el.prevMonth){

          var en = d.getUTCMonth();
          var er = d.getUTCFullYear();
          var eh = eg - 86400 * (d.getUTCDate() - 1);
          ee = eh;
          if(ep & el.currTimeAndPrev)em -= 1;
          while(em-- > 0){

            if(--en < 0){

              en = 11;
              if(--er == 0)return;
            };
            ee -= 86400 * this.getMonthDays(en, er);
          };
          if(ep & el.currTimeAndPrev){

            em = ek;
          } else {

            em = eh - 1;
          };
        } else if(ep & el.prevYear){

          var er = 1970;
          var es = Math.floor(eg / 86400);
          var ei = this.getYearDays(er) + 1;
          while(es >= ei){

            es -= ei;
            ei = this.getYearDays(++er) + 1;
          };
          var et = eg - 86400 * (++es);
          ee = et;
          if(ep & el.currTimeAndPrev)em -= 1;
          while(em-- > 0){

            if(--er == 0)return;
            ee -= 86400 * (this.getYearDays(er) + 1);
          };
          if(ep & el.currTimeAndPrev){

            em = ek;
          } else {

            em = et - 1;
          };
        };;;;
        return {
          from : ee,
          to : em
        };
      },
      __fm : function(i){

        if(i < 10)i = bP + i;
        return i;
      },
      __fn : {
        TZ_DISABLE_DST_BIT : 0x00000001,
        TZ_TYPE_MASK : 0x0C000000,
        TZ_TYPE_WITH_DST : 0x08000000,
        TZ_DST_TYPE_MASK : 0x03000000,
        TZ_DST_TYPE_NONE : 0x00000000,
        TZ_DST_TYPE_SERVER : 0x01000000,
        TZ_DST_TYPE_CUSTOM : 0x02000000,
        TZ_CUSTOM_DST_MASK : 0x00FF0000,
        TZ_DST_TYPE_CUSTOM_UTC : 0x03000000,
        TZ_OFFSET_MASK : 0xFFFFFFFE
      },
      __fo : {
        DST_MAR2SUN2AM_NOV1SUN2AM : 0x00010000,
        DST_MAR6SUN_OCT6SUN : 0x00020000,
        DST_MAR6SUN1AM_OCT6SUN1AM : 0x00030000,
        DST_MAR6THU_SEP6FRI : 0x00040000,
        DST_MAR6SUN2AM_OCT6SUN2AM : 0x00050000,
        DST_MAR30_SEP21 : 0x00060000,
        DST_APR1SUN2AM_OCT6SUN2AM : 0x00070000,
        DST_APR1_OCT6SUN : 0x00080000,
        DST_APR6THU_SEP6THU : 0x00090000,
        DST_APR6THU_UNKNOWN : 0x000A0000,
        DST_APR1_OCT1 : 0x000B0000,
        DST_MAR21_22SUN_SEP20_21SUN : 0x000C0000,
        DST_SOUTHERN_SEMISPHERE : 0x00200000,
        DST_SEP1SUNAFTER7_APR1SUNAFTER5 : 0x00200000,
        DST_SEP1SUN_APR1SUN : 0x00210000,
        DST_SEP6SUN_APR1SUN : 0x00220000,
        DST_OCT2SUN_MAR2SUN : 0x00230000,
        DST_OCT1SUN_FEB3SUN : 0x00240000,
        DST_OCT3SUN_MAR2SUN : 0x00250000,
        DST_OCT1SUN_MAR2SUN : 0x00260000,
        DST_OCT1SUN_APR1SUN : 0x00270000,
        DST_OCT1SUN_MAR6SUN : 0x00280000
      },
      __fp : {
        from : {
        },
        to : {
        }
      },
      __mt : {
        days : [bV, u, c, co, R, bU, D],
        months : [I, cp, ca, W, F, z, cb, m, M, N, bN, cn],
        days_abbrev : [f, j, b, bK, Y, cl, ci],
        months_abbrev : [bM, bW, o, n, F, bS, s, p, bX, O, Q, G],
        days_plural : [bY, cd, cd]
      }
    }
  });
})();

qx.$$loader.init();