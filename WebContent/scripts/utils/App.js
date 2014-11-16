/// <reference path="../typings/knockout.d.ts" />
/// <reference path="../typings/underscore.d.ts" />
/// <reference path="../viewmodel/LoginMainPageViewModel.ts" />
var Utils;
(function (Utils) {
    var App = (function () {
        function App() {
            var _this = this;
            this.init = function () {
                ko.applyBindings(_this.loginMainPageViewModel);
            };
            this.loginMainPageViewModel = new Skyguardian.LoginMainPageViewModel();
        }
        return App;
    })();
    Utils.App = App;
})(Utils || (Utils = {}));
//# sourceMappingURL=App.js.map
