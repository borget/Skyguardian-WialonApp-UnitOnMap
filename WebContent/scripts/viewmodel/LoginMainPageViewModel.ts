/// <reference path="../typings/knockout.d.ts" />
/// <reference path="../typings/underscore.d.ts" />
/// <reference path="../typings/wialon.d.ts" />
/// <reference path="../viewmodel/WialonSessionViewModel.ts" />
/// <reference path="../viewmodel/UnitViewModel.ts" />
/// <reference path="../utils/Constants.ts" />
module Skyguardian {
	export class LoginMainPageViewModel {
		public userName: KnockoutObservable<string>;
		public password: KnockoutObservable<string>;
		public unitList: KnockoutObservableArray<Skyguardian.UnitViewModel>;
		public hasError: KnockoutObservable<boolean>;
		public messageError: KnockoutObservable<string>;
		public wialonSession: Skyguardian.WialonSessionViewModel;
		
		constructor(){
			this.wialonSession = new Skyguardian.WialonSessionViewModel();
			this.userName = ko.observable<string>();
			this.password = ko.observable<string>();
			this.unitList = ko.observableArray<Skyguardian.UnitViewModel>();
			this.hasError = ko.observable<boolean>();
			this.messageError = ko.observable<string>();
		}
		
		public openWialonMapApp = () : void => {
			window.location.href = Utils.Constants.WIALON_APP+this.userName()+"&sid="+this.wialonSession.sid;
		}
		
		public doLogin = () : any => {
            var sess = wialon.core.Session.getInstance(); // get instance of current Session
            var user = sess.getCurrUser(); // get current User
            if (user) { // if user exists - you are already logged, print username to log
				this.openWialonMapApp();
            }

            // if not logged
            if (this.isValid()) { 
                sess.initSession("https://hst-api.wialon.com"); // initialize Wialon session
            	sess.login(this.userName(), this.password(), "", // trying login 
					this.loginCallback
            	);
            } else {
            	this.showError("Todos los campos son requeridos");
            }
		}
		
		private loginCallback = (code: any):void =>{
            if (code) {
                // login failed, print error
                this.showError(wialon.core.Errors.getErrorText(code));
            }
            else {
                this.wialonSession.sid = wialon.core.Session.getInstance().getId();
                this.loadUnits();
                //this.openWialonMapApp();
            }
		}
		
		private loadUnits = ():void => {
			var unitsVMArray: Array<Skyguardian.UnitViewModel> = new Array<Skyguardian.UnitViewModel>();
			
			
			var sess = wialon.core.Session.getInstance(); // get instance of current Session
			// flags to specify what kind of data should be returned
			var flags = wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastMessage;
		
		    sess.loadLibrary("itemIcon"); // load Icon Library	
		    sess.updateDataFlags( // load items to current session
			[{type: "type", data: "avl_unit", flags: flags, mode: 0}], // Items specification
				(code) => { // updateDataFlags callback
		    		if (code) { 
		    			this.showError(wialon.core.Errors.getErrorText(code)); 
		    			return; 
		    		} // exit if error code
		
		            // get loaded 'avl_unit's items  
			    	var units = sess.getItems("avl_unit");
		    		if (!units || !units.length){ 
		    			this.showError("We are sorry, we did not find any Units."); 
		    			return; 
		    		} // check if units found
		
				    for (var i = 0; i< units.length; i++){ // construct Select object using found units
					    var u = units[i]; // current unit in cycle
					    unitsVMArray.push(new Skyguardian.UnitViewModel(u.getId(), u.getName()));			
					    // append option to select
					    //$("#units").append("<option value='"+ u.getId() +"'>"+ u.getName()+ "</option>");
					}
					this.unitList(unitsVMArray);
		            // bind action to select change event
				    //$("#units").change( getSelectedUnitInfo );
			    }
	);
			
		}
		
		private isValid = ():boolean => {
			var isValidContext:boolean = false;
			if (this.userName() != undefined && this.userName().trim() != "" && 
				 this.password() != undefined && this.password().trim() != "") {
				isValidContext = true;
			}
			return isValidContext;
		}
		
		private showError = (message: string) => {
			this.hasError(true);
			this.messageError(message);
		}
		
		private hideError = () => {
			this.hasError(false);
			this.messageError("");
		}
	}
}
