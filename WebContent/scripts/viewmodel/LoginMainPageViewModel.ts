/// <reference path="../typings/knockout.d.ts" />
module Skyguardian {
	export class LoginMainPageViewModel {
		public userName: KnockoutObservable<string>;
		public password: KnockoutObservable<string>;
		public unitId: KnockoutObservable<number>;
		
		constructor(){
			this.userName = ko.observable<string>();
			this.password = ko.observable<string>();
			this.unitId = ko.observable<number>();
		}
		
		public openWialonMapApp = () : void => {
			window.location.href = "http://apps.wialon.com/onewialon/?baseUrl=https://hst-api.wialon.com&hostUrl=http://by.hosting.wialon.com&lang=en&user=serviacero&sid=27273f530b6c50f1f255acf643cf128b";
		}
	}
}
