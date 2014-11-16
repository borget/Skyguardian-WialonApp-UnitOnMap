/// <reference path="../typings/knockout.d.ts" />
var Skyguardian;
(function (Skyguardian) {
    var LoginMainPageViewModel = (function () {
        function LoginMainPageViewModel() {
            this.openWialonMapApp = function () {
                window.location.href = "http://apps.wialon.com/onewialon/?baseUrl=https://hst-api.wialon.com&hostUrl=http://by.hosting.wialon.com&lang=en&user=serviacero&sid=27273f530b6c50f1f255acf643cf128b";
            };
            this.userName = ko.observable();
            this.password = ko.observable();
            this.unitId = ko.observable();
        }
        return LoginMainPageViewModel;
    })();
    Skyguardian.LoginMainPageViewModel = LoginMainPageViewModel;
})(Skyguardian || (Skyguardian = {}));
//# sourceMappingURL=LoginMainPageViewModel.js.map
