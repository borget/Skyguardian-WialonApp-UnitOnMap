/*
* Site base configuration
*/

// Wialon KIT
//var GIS_URL = "http://render.mapsviewer.com/kit-api.wialon.com";

// Wialon Hosting
//var GIS_URL = "http://render.mapsviewer.com/hst-api.wialon.com";

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

/// Load scripts
function load_script(src, callback) {
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
	var url = get_url_parameter("baseUrl");
	if (!url) {
		url = get_url_parameter("hostUrl");
	}
	if (!url) {
		return null;
	}
	var user = get_url_parameter("user");
	if(!user)
		return null;
	
	wialon.core.Session.getInstance().initSession(url, "", 0x800);
	wialon.core.Session.getInstance().duplicate(get_url_parameter("sid"), user, true, login);
}



/**
* Fetch default Gurtam maps map options
*/ 
function gurtam_maps_options(opts) {
	if (typeof opts != 'object')
		opts = new Object;

	opts.maxExtent = new OpenLayers.Bounds(-20037508.3427892,-20037508.3427892,20037508.3427892,20037508.3427892);
	opts.numZoomLevels = 19;
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
		alert("Login error.");
		return;
	}
	$("#user_name_id").html(wialon.core.Session.getInstance().getCurrUser().getName());
	initEnv();
}

/**
* Init text and styles
*/
function initControls() {	
	// IE style fix	
	if(navigator.appVersion.indexOf("MSIE 10") == -1 && navigator.appVersion.indexOf("MSIE 9") == -1 && navigator.appVersion.indexOf("MSIE") != -1) {
		var headerHeight = $("#header").height();
		document.getElementById("content").style.top = headerHeight+1;
		$("#name_col").width(150);
		
		var resize = function(){
			var headerHeight = $("#header").height()+1;
			var windowHeight = $(window).innerWidth() || document.body.clientHeight;			
			$("#content").height(windowHeight-headerHeight);
		};
		resize();			
		window.onresize=function(){
			resize();
		};			
	}
	
	// column names
	$("#icon_col").html($.localise.tr("Icon"));
	$("#name_col").html($.localise.tr("Name"));
	$("#lmsg_col").html($.localise.tr("Last message"));
	$("#speed_col").html($.localise.tr("Speed"));
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

            // init unit table
            showUnits();


        });
	});		
}

/**
* Show units in the table and on the map
*/
function showUnits() {
	// get units
	var units = wialon.core.Session.getInstance().getItems("avl_unit");	
	if (!units || !units.length)
		return;
	//sort by name in ascending order
	units.sort(function(unit1,unit2){
		var name1 = unit1.getName().toLowerCase();
		var name2 = unit2.getName().toLowerCase();
		if(name1>name2)
			return 1;
		else
			return -1;
	});	
	// populate table
	for(var i=0;i<units.length;i++) {	
		var unit = units[i];
		addUnitRow(unit);		
		// if map available - add to map
		if(map)
			createUnitMarker(unit);
		// listen unit event
		addUnitListener(unit);
	}
	
	// center unit on map
	$("a.row-name").click(function(e) {
		var id = e.currentTarget.id.substr(10);		
		goToMarker(id);
	});
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
		$("#unit_speed_" + unit.getId()).html( ((getMeasureUnits(unit)) ? Math.round( unit.getPosition().s / 1.609344) : unit.getPosition().s) +"&nbsp;" + ( (getMeasureUnits(unit)) ? $.localise.tr("mph") : $.localise.tr("km/h") ));
		moveMarker(unit);
	} else if (type == "changeLastMessage") {		
		var tm = unit.getLastMessage().t;
		$("#unit_time_" + unit.getId()).html( wialon.util.DateTime.formatTime(tm, 0, enFormatTime) );
	} else if (type == "changeIcon") {		var imgUrl = unit.getIconUrl();
		$("#unit_img_" + unit.getId() + " img").attr("src",imgUrl);
		markersArray[unit.getId()].setUrl(imgUrl);
	}
}

/**
* Add row to the table of units 
* @param unit {Object} wialon unit object
*/
function addUnitRow(unit) {
	if (!unit)
		return;	
	var lastMessage = unit.getLastMessage();
	var tm = "-";
	if(lastMessage)
		tm = lastMessage.t;	
	var speed = "-";
	if(unit.getPosition())
		speed = ((getMeasureUnits(unit)) ? Math.round( unit.getPosition().s / 1.609344) : unit.getPosition().s) + "&nbsp;" + ( (getMeasureUnits(unit)) ? $.localise.tr("mph") : $.localise.tr("km/h") );
	var id = unit.getId();
	var html = "<tr>"
		+ "<td class='centered' id='unit_img_" + id + "'><img src='" + unit.getIconUrl(24) + "'/></td>"
		+ "<td id='unit_name_" + id + "' class='shorten-container'><div class='shorten'>" + (speed=="-" ? "":"<a class='row-name' href='#' id='unit_name_"+ id +"'>") + unit.getName() + (speed=="-" ? "":"</a>") + "</div></td>"	
		+ "<td id='unit_time_" + id + "'>" + (tm!="-"?wialon.util.DateTime.formatTime(tm, 0, enFormatTime):tm) + "</td>"
		+ "<td id='unit_speed_" + id + "'>" + speed + "</td>"	
		+ "</tr>";
	$("#units_tbl").append(html);
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
	var url = get_url_parameter("baseUrl");
	if (!url) 
		url = get_url_parameter("hostUrl");
	if (!url)
		return null;
	url += "/wsdk/script/wialon.js";
	
	LANG = get_url_parameter("lang");
	if ((!LANG) || ($.inArray(LANG, ["en", "ru"]) == -1))
		LANG = "en";		
	$.localise('lang/', {language: LANG});
	initControls();
		
	load_script(url, init_sdk);		
});
