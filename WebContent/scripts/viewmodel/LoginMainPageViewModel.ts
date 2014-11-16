/// <reference path="../typings/knockout.d.ts" />
/// <reference path="../typings/wialon.d.ts" />
/// <reference path="../viewmodel/WialonSessionViewModel.ts" />
/// <reference path="../utils/Constants.ts" />
module Skyguardian {
	export class LoginMainPageViewModel {
		public userName: KnockoutObservable<string>;
		public password: KnockoutObservable<string>;
		public unitId: KnockoutObservable<string>;
		public hasError: KnockoutObservable<boolean>;
		public messageError: KnockoutObservable<string>;
		public wialonSession: Skyguardian.WialonSessionViewModel;
		
		constructor(){
			this.wialonSession = new Skyguardian.WialonSessionViewModel();
			this.userName = ko.observable<string>();
			this.password = ko.observable<string>();
			this.unitId = ko.observable<string>("2323");
			this.hasError = ko.observable<boolean>();
			this.messageError = ko.observable<string>();
			this.userName.subscribe(this.hideError);
			this.password.subscribe(this.hideError);
			this.unitId.subscribe(this.hideError);	
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
					(code) => { // login callback
                    	if (code) {
                    		// login failed, print error
                    		this.showError(wialon.core.Errors.getErrorText(code));
                    	}
                    	else {
                    		this.wialonSession.sid = wialon.core.Session.getInstance().getId();
                    		this.openWialonMapApp();
                    	}
                	}
            	);
            } else {
            	this.showError("Todos los campos son requeridos");
            }
		}
		
		private isValid = ():boolean => {
			var isValidContext:boolean = false;
			if (this.userName() != undefined && this.userName().trim() != "" && 
				 this.password() != undefined && this.password().trim() != "" && 
				 this.unitId() != undefined && this.unitId().trim() != "") {
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
