/// <reference path="../typings/knockout.d.ts" />
/// <reference path="../typings/underscore.d.ts" />
/// <reference path="../viewmodel/LoginMainPageViewModel.ts" />
module Utils {
	export class App {
		public loginMainPageViewModel: Skyguardian.LoginMainPageViewModel;
		constructor() {
			this.loginMainPageViewModel = new Skyguardian.LoginMainPageViewModel();
		}
		
		public init = ():void => {
			ko.applyBindings(this.loginMainPageViewModel);
		}
	}
}