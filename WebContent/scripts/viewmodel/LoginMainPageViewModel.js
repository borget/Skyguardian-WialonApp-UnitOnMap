/// <reference path="../typings/knockout.d.ts" />
/// <reference path="../typings/wialon.d.ts" />
/// <reference path="../viewmodel/WialonSessionViewModel.ts" />
/// <reference path="../utils/Constants.ts" />
var Skyguardian;
(function (Skyguardian) {
    var LoginMainPageViewModel = (function () {
        function LoginMainPageViewModel() {
            var _this = this;
            this.openWialonMapApp = function () {
                window.location.href = Utils.Constants.WIALON_APP + _this.userName() + "&sid=" + _this.wialonSession.sid;
            };
            this.doLogin = function () {
                var sess = wialon.core.Session.getInstance();
                var user = sess.getCurrUser();
                if (user) {
                    _this.openWialonMapApp();
                }

                // if not logged
                if (_this.isValid()) {
                    sess.initSession("https://hst-api.wialon.com"); // initialize Wialon session
                    sess.login(_this.userName(), _this.password(), "", function (code) {
                        if (code) {
                            // login failed, print error
                            _this.showError(wialon.core.Errors.getErrorText(code));
                        } else {
                            _this.wialonSession.sid = wialon.core.Session.getInstance().getId();
                            _this.openWialonMapApp();
                        }
                    });
                } else {
                    _this.showError("Todos los campos son requeridos");
                }
            };
            this.isValid = function () {
                var isValidContext = false;
                if (_this.userName() != undefined && _this.userName().trim() != "" && _this.password() != undefined && _this.password().trim() != "" && _this.unitId() != undefined && _this.unitId().trim() != "") {
                    isValidContext = true;
                }
                return isValidContext;
            };
            this.showError = function (message) {
                _this.hasError(true);
                _this.messageError(message);
            };
            this.hideError = function () {
                _this.hasError(false);
                _this.messageError("");
            };
            this.wialonSession = new Skyguardian.WialonSessionViewModel();
            this.userName = ko.observable();
            this.password = ko.observable();
            this.unitId = ko.observable("2323");
            this.hasError = ko.observable();
            this.messageError = ko.observable();
            this.userName.subscribe(this.hideError);
            this.password.subscribe(this.hideError);
            this.unitId.subscribe(this.hideError);
        }
        return LoginMainPageViewModel;
    })();
    Skyguardian.LoginMainPageViewModel = LoginMainPageViewModel;
})(Skyguardian || (Skyguardian = {}));
//# sourceMappingURL=LoginMainPageViewModel.js.map
