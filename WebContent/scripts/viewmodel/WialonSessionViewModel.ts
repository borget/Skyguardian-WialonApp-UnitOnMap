module Skyguardian {
	export class WialonSessionViewModel {
		private _sid: string;
		constructor() {
			this._sid = null;
		}
		get sid():string {
     	   return this._sid;
    	}
    	set sid(sid:string) {
        	this._sid = sid;
    	}
	}
}
