// This is a simple *viewmodel* - JavaScript that defines the data and behavior of the UI.
var Skyguardian;
(function (Skyguardian) {
    var AppViewModel = (function () {
        function AppViewModel() {
        	this.unitId = "";
        	this.userName = ko.observable();
            this.unitName = ko.observable();
            this.unitIconUrl = ko.observable();
            this.unitLocation = ko.observable();
            this.unitSpeed = ko.observable();
            this.unitTimeOfLstMsg = ko.observable();
            this.ignition = ko.observable(); 
            this.hasError = ko.observable();
            this.messageText = ko.observable();
        }
        return AppViewModel;
    })();
    Skyguardian.AppViewModel = AppViewModel;

    Skyguardian.appViewModel = new Skyguardian.AppViewModel();
})(Skyguardian || (Skyguardian = {}));
// ------------------------------------------------------------

var callbacks = {};

/// Execute callback
function exec_callback(id) {
	if (!callbacks[id])
		return;
	callbacks[id].call();
}
/// Wrap callback
function wrap_callback(callback) {
	var id = (new Date()).getTime();
	callbacks[id] = callback;
	return id;
}

/// IE check
function ie() {
	return (navigator.appVersion.indexOf("MSIE 6") != -1 || navigator.appVersion.indexOf("MSIE 7") != -1 || navigator.appVersion.indexOf("MSIE 8") != -1);
}

/// Fetch varable from 'GET' request
function get_url_parameter(name) {
	if (!name)
		return null;
	var pairs = decodeURIComponent(document.location.search.substr(1)).split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		if (pair[0] == name) {
			pair.splice(0, 1);
			return pair.join("=");
		}
	}
	return null;
}

function load_wsdk(src, callback) {
	var script = document.createElement("script");
	script.setAttribute("type","text/javascript");
	script.setAttribute("charset","UTF-8");
	script.setAttribute("src", src);	
	if (callback && typeof callback === "function") {		
		var id = wrap_callback(callback);
		if (ie()) {
			script.onreadystatechange = function () {
				if (this.readyState === 'complete' || this.readyState == 'loaded') {
					callback();
				}
			};
		} else {			
			script.setAttribute("onLoad", "exec_callback(" + wrap_callback(callback) + ")");
		}
	}
	document.getElementsByTagName("head")[0].appendChild(script);
}
/// Init SDK
function init_sdk () {
	var token = get_url_parameter("token");
	if(!token)
		throw new Error("Expected user/password parameters are not present.");
	doLogin(token, null, loginHandler);
}


function doLogin (token, notInUse, callback) {
    /*var session = wialon.core.Session.getInstance(); // get instance of current Session
    session.initSession("https://hst-api.wialon.com"); // initialize Wialon session
  	session.login(user, password, "", callback);*/
	//or login to wialon using our token
	wialon.core.Session.getInstance().initSession("http://hst-api.wialon.com");

	wialon.core.Session.getInstance().loginToken(token, "", callback);
}



function loginHandler (code) {
    if (code) {
        // login failed, print error
    	Skyguardian.appViewModel.hasError(true);
    	Skyguardian.appViewModel.messageText("["+wialon.core.Errors.getErrorText(code)+"]");
        throw new Error("There was an issue in the login process: " + wialon.core.Errors.getErrorText(code));
    }
    else {
    	initEnv();
    }
}

/**
* Fetch default Gurtam maps map options
*/ 
function gurtam_maps_options(opts) {
	if (typeof opts != 'object')
		opts = new Object;

	opts.maxExtent = new OpenLayers.Bounds(-20037508.3427892,-20037508.3427892,20037508.3427892,20037508.3427892);
	opts.numZoomLevels = 10;
	opts.maxResolution = 156543.0339;
	opts.units = 'm';
	opts.projection = "EPSG:900913";
	opts.displayProjection = new OpenLayers.Projection("EPSG:4326");
	
	return opts;
}

/**
* Login result
*/
function login(code) {
	if (code) {
		alert("Su sesión ha expirado. Ingrese nuevamente...");
		return;
	}
	initEnv();
}

/**
* Init wialon event system and create map
*/
function initEnv() {		
	// array for map markers
	markersArray = [];	
	// array for event listeners indicators
	listeners = [];
	// map
	map = null;		
	
	// load library for working with unit icons
	wialon.core.Session.getInstance().loadLibrary("itemIcon");
	
	// init wialon event system
	var spec = [{type: "type", 
				data: "avl_unit", 
				flags: wialon.item.Item.dataFlag.base|wialon.item.Unit.dataFlag.lastMessage|wialon.item.Item.dataFlag.image, 
				mode: 0}];	
	wialon.core.Session.getInstance().updateDataFlags(spec, function(code) {
		if(code) {
			alert("Error ["+ code +"]: " + wialon.core.Errors.getErrorText(code));
			return;
		}

				// get & set address format for GIS geocoding
				var address_format = wialon.core.Session.getInstance().getCurrUser().getCustomProperty("us_addr_fmt", "");
				if (address_format) {
					var addr_fmt = address_format.split("_");
					if (addr_fmt)
						wialon.util.Gis.geocodingParams = {flags: addr_fmt[0], city_radius: addr_fmt[1], dist_from_unit: addr_fmt[2]};
				}

        // get string of time format
        wialon.core.Session.getInstance().getCurrUser().getLocale(function(arg, locale){

            var fd = (locale && locale.fd) ? locale.fd : '%Y-%m-%E_%H:%M:%S'; // check for users who have never changed the parameters of the metric

            enFormatTime = wialon.util.DateTime.convertFormat(fd,true).replace(/_/, '&nbsp;&nbsp;').replace(/ /, '&nbsp;');
            setLocaleDateTime();
            // init map options
            OpenLayers.ImgPath = "./img/";

            // options for GurtmMaps layer
            var opts = {};
            opts.maxExtent = new OpenLayers.Bounds(-20037508.3427892,-20037508.3427892,20037508.3427892,20037508.3427892);
            opts.numZoomLevels = 19;
            opts.maxResolution = 156543.0339;
            opts.units = 'm';
            opts.projection = "EPSG:900913";
            opts.displayProjection = new OpenLayers.Projection("EPSG:4326");
            // create layer
            var gurtamMaps = new OpenLayers.Layer.WebGIS("Gurtam Maps", wialon.core.Session.getInstance().getBaseGisUrl("render"), opts);

            opts.controls = [new OpenLayers.Control.GPanZoomBar(), new OpenLayers.Control.GNavigation(), new OpenLayers.Control.KeyboardDefaults()];

            // create map
            map = new OpenLayers.GMap("map_id", opts);
            map.addLayer(gurtamMaps);
            map.zoomToMaxExtent();

            // create markers layer
            var markersLayer = new OpenLayers.Layer.Markers("markers");
            layerId = markersLayer.id;
            markersLayer.setVisibility(true);
            map.addLayer(markersLayer);

            // init unit
            showUnit();
        });
	});		
}

/**
* Show units in the table and on the map
*/
function showUnit() {
	// get units
	var units = wialon.core.Session.getInstance().getItems("avl_unit");	
	var unitId = get_url_parameter("unitId");
	
	if (!units || !units.length || !unitId) {
		throw new Error("Units not found or unit id parameter not present.");
		return;
	}
		
	var unit = findUnitById(units, unitId);

	if (!unit) {
		throw new Error("Unit not found");
		return;
	}		
	// if map available - add to map
	if(map){
		createUnitMarker(unit);
		if (unit.getPosition()) {
			map.setCenter(new OpenLayers.LonLat(unit.getPosition().x, unit.getPosition().y), 13);
		}
	}
	// listen unit event
	addUnitListener(unit);
	
	goToMarker(unit.getId());
	// center unit on map
	$("a.row-name").click(function(e) {
		var id = e.currentTarget.id.substr(10);		
		goToMarker(id);
	});
	
	knockoutjsInit(unit);
}

/**
 * 
 * @param units
 * @param unitId
 * @returns unit found.
 */
function findUnitById(units, unitId) {
	var decodedUnitId = decodeURI(unitId);
	for(var i=0;i<units.length;i++) {	
		var unitItem = units[i];
		if (unitItem.getName() === decodedUnitId) {
			return unitItem; 	
		}
	}
}

/**
* Add listener to the current unit
* @param unit {Object} wialon unit object
*/
function addUnitListener(unit) {
	if(typeof listeners[unit.getId()] == "undefined") {
		// change name
		unit.addListener("changeName", redrawUnit, this);			
		// change position
		unit.addListener("changePosition", redrawUnit, this);
		// change last message
		unit.addListener("changeLastMessage", redrawUnit, this);
		// change image
		unit.addListener("changeIcon", redrawUnit, this);
		listeners[unit.getId()] = true;	
	}
}

/**
* Create marker and add it to the markers array
* @param unit {Object} wialon unit object
*/
function createUnitMarker(unit) {
	if (map && unit && unit.getPosition()) {
		var markersLayer = map.getLayer(layerId);		
		var iconSize =  new OpenLayers.Size(32,32);
		var iconOffset = new OpenLayers.Pixel(-(iconSize.w/2), -(iconSize.h/2));
		var pos = new OpenLayers.LonLat(unit.getPosition().x, unit.getPosition().y).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
		if (!pos)
			return;
		var marker = new OpenLayers.GMarker(pos, new OpenLayers.Icon(unit.getIconUrl(), iconSize, iconOffset),unit,{mouseOver:true});
		markersLayer.addMarker(marker);
		markersArray[unit.getId()] = marker;	
	}
}

/**
* Pan map to current unit
* @param id {Number} id of wialon unit
*/
function goToMarker(id) {	
	var unit = wialon.core.Session.getInstance().getItem(id);
	if (!unit)
	  return;
	if (map && unit.getPosition()) {
	  var pos = new OpenLayers.LonLat(unit.getPosition().x,unit.getPosition().y).transform(new OpenLayers.Projection("EPSG:4326"),map.getProjectionObject());
	  if (pos)
		map.panTo(pos);     
	}
}

/**
* Move marker to new coordinates, in fact destroy old marker and draw new one
* @param unit {Object} wialon unit object
*/
function moveMarker(unit) {		
	if (map && unit.getPosition()) {
		map.getLayer(layerId).removeMarker(markersArray[unit.getId()]);
		markersArray[unit.getId()].destroy();
		createUnitMarker(unit);		
	}
}

/**
* Redraw unit info
* @param e {Object} changeName, changePosition or changeLastMessage event
*/
function redrawUnit(e) {
	var unit = e.getTarget();	
	var type = e.getType();
	if (type == "changeName") {		
		$("#unit_name_" + unit.getId()+" div").html(unit.getName());
	} else if (type == "changePosition") {		
		moveMarker(unit);
		setUnitLocation(unit);
		setUnitSpeed(unit);
	} else if (type == "changeLastMessage") {		
		setUnitTimeOfLstMsg(unit);
		setIgnition(unit);
	} else if (type == "changeIcon") {		
		var imgUrl = unit.getIconUrl();
		$("#unit_img_" + unit.getId() + " img").attr("src",imgUrl);
		markersArray[unit.getId()].setUrl(imgUrl);
	}
}

/**
 * get Measure Units
 */
function getMeasureUnits (unit) {
    var metric = unit.getMeasureUnits();
    metric = (metric) ? metric : 0; // check for users who have never changed the parameters of the metric
    return metric;
}

/**
 * set Locale Date Time
 */
function setLocaleDateTime () {
    var days = [
            $.localise.tr("Sunday"),
            $.localise.tr("Monday"),
            $.localise.tr("Tuesday"),
            $.localise.tr("Wednesday"),
            $.localise.tr("Thursday"),
            $.localise.tr("Friday"),
            $.localise.tr("Saturday")
        ],
        months = [
            $.localise.tr("January"),
            $.localise.tr("February"),
            $.localise.tr("March"),
            $.localise.tr("April"),
            $.localise.tr("May"),
            $.localise.tr("June"),
            $.localise.tr("July"),
            $.localise.tr("August"),
            $.localise.tr("September"),
            $.localise.tr("October"),
            $.localise.tr("November"),
            $.localise.tr("December")
        ],
        days_abbrev = [
            $.localise.tr("Sun"),
            $.localise.tr("Mon"),
            $.localise.tr("Tue"),
            $.localise.tr("Wed"),
            $.localise.tr("Thu"),
            $.localise.tr("Fri"),
            $.localise.tr("Sat")
        ],
        months_abbrev = [
            $.localise.tr("Jan"),
            $.localise.tr("Feb"),
            $.localise.tr("Mar"),
            $.localise.tr("Apr"),
            $.localise.tr("May"),
            $.localise.tr("Jun"),
            $.localise.tr("Jul"),
            $.localise.tr("Aug"),
            $.localise.tr("Sep"),
            $.localise.tr("Oct"),
            $.localise.tr("Nov"),
            $.localise.tr("Dec")
        ];
    wialon.util.DateTime.setLocale(days, months, days_abbrev, months_abbrev);
}

/**
* Initialize
*/ 
$(document).ready(function () {	
	$.localise('lang/', {language: "en"});
	// Initialize knockout.js
	ko.applyBindings(Skyguardian.appViewModel);
	load_wsdk("https://hst-api.wialon.com/wsdk/script/wialon.js", init_sdk);		
	
});

function knockoutjsInit(unit) {
	var userName = wialon.core.Session.getInstance().getCurrUser().getName();
	Skyguardian.appViewModel.unitId = unit.getId();
	Skyguardian.appViewModel.userName(userName);
	Skyguardian.appViewModel.unitName(unit.getName());
	Skyguardian.appViewModel.unitIconUrl(unit.getIconUrl());
	setUnitLocation(unit);
	setUnitSpeed(unit);
	setUnitTimeOfLstMsg(unit);
	setIgnition(unit);
}

function setUnitLocation(unit) {
	if(unit.getPosition()) {
		var pos = unit.getPosition();
		wialon.util.Gis.getLocations([{lat:pos.y,lon:pos.x}],function(code,data) {
			if(code)
				Skyguardian.appViewModel.unitLocation("No disponible en este momento.");
			else
				Skyguardian.appViewModel.unitLocation(data[0]);
		});		
	}	
}

function setUnitSpeed(unit) {
	Skyguardian.appViewModel.unitSpeed(((getMeasureUnits(unit)) ? Math.round( unit.getPosition().s / 1.609344) : unit.getPosition().s) + " " + ( (getMeasureUnits(unit)) ? $.localise.tr("mph") : $.localise.tr("km/h")));
}

function setUnitTimeOfLstMsg(unit) {
	var tm = "-";
	var lastMessage = unit.getLastMessage();
	if(lastMessage)
		tm = lastMessage.t;
	
	tm = (tm !== "-"? wialon.util.DateTime.formatTime(tm, 0, enFormatTime):tm);
	tm = tm.replace(/&nbsp;/gi, " ");
	
	Skyguardian.appViewModel.unitTimeOfLstMsg(tm);
}

function setIgnition(unit) {
	var lastMessage = unit.getLastMessage();
	Skyguardian.appViewModel.ignition("Apagado");
	if(lastMessage && lastMessage.p) {
		var egParam = lastMessage.p.EG;
		var motionStatus = lastMessage.p.motion_status;
		var state = lastMessage.p.state;
		var engine = lastMessage.p.engine;
		if((egParam && egParam == 1) 
				|| (motionStatus && (motionStatus == 33 || motionStatus == 34))
				|| (state && (state == 33 || state == 34))
				|| (engine && engine == 1)) {
			Skyguardian.appViewModel.ignition("Encendido");
		} 
	}
}