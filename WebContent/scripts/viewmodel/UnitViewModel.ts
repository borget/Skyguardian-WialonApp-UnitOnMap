/// <reference path="../typings/knockout.d.ts" />
module Skyguardian {
	export class UnitViewModel {
		public unitId: number;
		public unitName: string;
		constructor (unitId:number, unitName:string){
			this.unitId = unitId;
			this.unitName = unitName;
		}
	}
}