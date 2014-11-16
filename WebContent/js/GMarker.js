OpenLayers.GMarker = OpenLayers.Class(OpenLayers.Marker, { 
    /** 
     * Property: labelDiv 
     * {DOMElement} 
     */ 
    labelDiv: null, 
    /** 
     * Property: label 
     * {String} 
     */ 
    label: null, 
    /** 
     * Property: label 
     * {Boolean} 
     */ 
    mouseOver: false, 
    /** 
     * Property: labelClass 
     * {String} 
     */ 
    labelClass: "olMarkerLabel", 
    /** 
     * Property: events 
     * {<OpenLayers.Events>} the event handler. 
     */ 
    events: null, 
    /** 
     * Property: div 
     * {DOMElement} 
     */ 
    div: null, 
    /** 
     * Property: onlyOnMouseOver 
     * {Boolean} 
     */ 
    onlyOnMouseOver: false, 
    /** 
     * Property: mouseover 
     * {Boolean} 
     */ 
    mouseover: false, 
    /** 
     * Property: labelOffsetTop 
     * {String} 
     */ 
    labelOffsetTop: "0px", 
     /** 
     * Property: labelOffsetLeft 
     * {String} 
     */ 
    labelOffsetLeft: "", 
				      
    /** 
     * Constructor: OpenLayers.Marker.Label 
     * Parameters: 
     * icon - {<OpenLayers.Icon>}  the icon for this marker 
     * lonlat - {<OpenLayers.LonLat>} the position of this marker 
     * label - {String} the position of this marker 
     * options - {Object} 
     */ 
    initialize: function(lonlat, icon, unit, options) { 
        var newArguments = []; 
        OpenLayers.Util.extend(this, options); 
        newArguments.push(lonlat, icon, unit); 
        OpenLayers.Marker.prototype.initialize.apply(this, newArguments); 
	       
        this.labelDiv = OpenLayers.Util.createDiv(this.icon.id + "_Text", null, null); 
        this.labelDiv.className = this.labelClass; 	
	this.unit = unit;	
        this.labelDiv.style.marginTop = this.labelOffsetTop; 
	this.labelDiv.style.marginLeft = this.labelOffsetLeft = this.icon.size.w +"px"; 
    }, 
    
    /** 
     * APIMethod: destroy 
     * Destroy the marker. You must first remove the marker from any 
     * layer which it has been added to, or you will get buggy behavior. 
     * (This can not be done within the marker since the marker does not 
     * know which layer it is attached to.) 
     */ 
    destroy: function() { 
        this.label = null; 
        this.labelDiv = null; 
        OpenLayers.Marker.prototype.destroy.apply(this, arguments); 
    }, 
    
    /** 
    * Method: draw 
    * Calls draw on the icon, and returns that output. 
    * 
    * Parameters: 
    * px - {<OpenLayers.Pixel>} 
    * 
    * Returns: 
    * {DOMElement} A new DOM Image with this marker's icon set at the 
    * location passed-in 
    */ 
    draw: function(px) { 
        this.div = OpenLayers.Marker.prototype.draw.apply(this, arguments); 
        this.div.appendChild(this.labelDiv, this.div.firstChild); 
        
        if (this.mouseOver === true) { 
            this.setLabelVisibility(false); 
            this.events.register("mouseover", this, this.onmouseover); 
            this.events.register("mouseout", this, this.onmouseout); 
        } 
        else { 
            this.setLabelVisibility(true); 
        } 
        return this.div; 
    }, 
    /** 
     * Method: onmouseover 
     * When mouse comes up within the popup, after going down 
     * in it, reset the flag, and then (once again) do not 
     * propagate the event, but do so safely so that user can 
     * select text inside 
     * 
     * Parameters: 
     * evt - {Event} 
     */ 
    onmouseover: function (evt) { 
	if (!this.unit)
		return;	
	var id = this.unit.getId();
	//last message
	var lastMessage = this.unit.getLastMessage();
	var tm = "-";
	if(lastMessage)
		tm = lastMessage.t;
    tm = tm!="-"?wialon.util.DateTime.formatTime(tm, 0, enFormatTime):tm; // enFormatTime define in main.js
	//speed
	var speed = "-";
	if(this.unit.getPosition()) {
		var pos = this.unit.getPosition();
		speed = ((this.getMeasureUnits()) ? Math.round( pos.s / 1.609344) : pos.s) + "&nbsp;" + ((this.getMeasureUnits()) ? $.localise.tr("mph") : $.localise.tr("km/h"));
		wialon.util.Gis.getLocations([{lat:pos.y,lon:pos.x}],function(code,data) {
			if(code)
				$("#marker_tooltip_"+id).html("-");
			else
				$("#marker_tooltip_"+id).html(data);
		});		
	}
	//tooltip content    
	var html = "<div class='label-title'>"+this.unit.getName()+"</div>"
		+"<table><tr><td>"+$.localise.tr("Last message")+":&nbsp;</td><td>"+tm+"</td></tr>"
		+"<tr><td>"+$.localise.tr("Location")+":</td><td id='marker_tooltip_"+id+"'></td></tr>"
		+"<tr><td>"+$.localise.tr("Speed")+":</td><td>"+speed+"</td></tr></table>";
	this.labelDiv.innerHTML = html;		    
    
        if (!this.mouseover) { 
            this.setLabelVisibility(true); 
            this.mouseover = true; 
        } 
        if (this.map.getSize().w - this.map.getPixelFromLonLat(this.lonlat).x<50) { 
            this.labelDiv.style.marginLeft = (this.icon.size.w)+"px"; 
        } 
        if (this.map.getSize().h - this.map.getPixelFromLonLat(this.lonlat).y<50) { 
            this.labelDiv.style.marginTop = (this.icon.size.h)+"px"; 
        } 
        OpenLayers.Event.stop(evt, true); 
    }, 
    /** 
     * Method: onmouseout 
     * When mouse goes out of the popup set the flag to false so that 
     *   if they let go and then drag back in, we won't be confused. 
     * 
     * Parameters: 
     * evt - {Event} 
     */ 
    onmouseout: function (evt) { 
        this.mouseover = false; 
        this.setLabelVisibility(false); 
        this.labelDiv.style.marginLeft = this.labelOffsetLeft; 
        this.labelDiv.style.marginTop = this.labelOffsetTop; 
        OpenLayers.Event.stop(evt, true); 
    }, 
    /** 
     * Method: setLabelVisibility 
     * Toggle label visibility 
     * 
     * Parameters: 
     * visibility - {Boolean} 
     */ 
    setLabelVisibility: function (visibility) { 
        if (visibility) { 
            this.labelDiv.style.display = "block"; 
        } 
        else { 
            this.labelDiv.style.display = "none"; 
        } 
    }, 
    
    /** 
     * Method: getLabelVisibility 
     * Get label visibility 
     * 
     * Returns: 
     *   visibility - {Boolean} 
     */ 
    getLabelVisibility: function () { 
        if (this.labelDiv.style == "none") { 
            return false; 
        } 
        else { 
            return true; 
        } 
    },

    /**
     * Method: getMeasureUnits
     * Get Measure Units
     *
     * Returns:
     *   Measure Units - 1 or 0
     */
    getMeasureUnits: function() {
        return this.unit.getMeasureUnits() ;
    },
    
    CLASS_NAME: "OpenLayers.Marker.Label" 
}); 