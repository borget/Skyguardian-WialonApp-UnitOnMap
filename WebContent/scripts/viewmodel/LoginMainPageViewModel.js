/// <reference path="../typings/knockout.d.ts" />
/// <reference path="../typings/underscore.d.ts" />
/// <reference path="../typings/wialon.d.ts" />
/// <reference path="../viewmodel/WialonSessionViewModel.ts" />
/// <reference path="../viewmodel/UnitViewModel.ts" />
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
                    sess.login(_this.userName(), _this.password(), "", _this.loginCallback);
                } else {
                    _this.showError("Todos los campos son requeridos");
                }
            };
            this.loginCallback = function (code) {
                if (code) {
                    // login failed, print error
                    _this.showError(wialon.core.Errors.getErrorText(code));
                } else {
                    _this.wialonSession.sid = wialon.core.Session.getInstance().getId();
                    _this.loadUnits();
                    //this.openWialonMapApp();
                }
            };
            this.loadUnits = function () {
                var unitsVMArray = new Array();

                var sess = wialon.core.Session.getInstance();

                // flags to specify what kind of data should be returned
                var flags = wialon.item.Item.dataFlag.base | wialon.item.Unit.dataFlag.lastMessage;

                sess.loadLibrary("itemIcon"); // load Icon Library
                sess.updateDataFlags([{ type: "type", data: "avl_unit", flags: flags, mode: 0 }], function (code) {
                    if (code) {
                        _this.showError(wialon.core.Errors.getErrorText(code));
                        return;
                    }

                    // get loaded 'avl_unit's items
                    var units = sess.getItems("avl_unit");
                    if (!units || !units.length) {
                        _this.showError("We are sorry, we did not find any Units.");
                        return;
                    }

                    for (var i = 0; i < units.length; i++) {
                        var u = units[i];
                        unitsVMArray.push(new Skyguardian.UnitViewModel(u.getId(), u.getName()));
                        // append option to select
                        //$("#units").append("<option value='"+ u.getId() +"'>"+ u.getName()+ "</option>");
                    }
                    _this.unitList(unitsVMArray);
                    // bind action to select change event
                    //$("#units").change( getSelectedUnitInfo );
                });
            };
            this.isValid = function () {
                var isValidContext = false;
                if (_this.userName() != undefined && _this.userName().trim() != "" && _this.password() != undefined && _this.password().trim() != "") {
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
            this.unitList = ko.observableArray();
            this.hasError = ko.observable();
            this.messageError = ko.observable();
        }
        return LoginMainPageViewModel;
    })();
    Skyguardian.LoginMainPageViewModel = LoginMainPageViewModel;
})(Skyguardian || (Skyguardian = {}));
//# sourceMappingURL=LoginMainPageViewModel.js.map
