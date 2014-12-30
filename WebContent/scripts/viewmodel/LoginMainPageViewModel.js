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
            this.openWialonApp = function () {
                if (_this.unitList() != undefined && _this.unitList().length > 0) {
                    window.location.href = Utils.Constants.WIALON_APP + _this.userName() + "&sid=" + _this.wialonSession.sid + "&unitId=" + _this.selectedUnit().unitId;
                } else {
                    _this.showError("Seleccione una unidad a localizar.");
                }
            };
            this.populateUnitsList = function () {
                if (_this.isValidForm()) {
                    _this.doLogin(_this.loadUnitsHandler);
                } else {
                    _this.showError("El nombre de usuario y contraseña son campos requeridos.");
                }
            };
            this.doLogin = function (callback) {
                var session = wialon.core.Session.getInstance();
                session.initSession(Utils.Constants.GURTAM_BASE_URL); // initialize Wialon session
                session.login(_this.userName(), _this.password(), "", callback);
            };
            this.loadUnitsHandler = function (code) {
                if (code) {
                    // login failed, print error
                    _this.showError(wialon.core.Errors.getErrorText(code));
                } else {
                    _this.wialonSession.sid = wialon.core.Session.getInstance().getId();
                    _this.loadUnits();
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
            this.isValidForm = function () {
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
            this.unitList = ko.observableArray(new Array());
            this.hasError = ko.observable();
            this.messageError = ko.observable();
            this.selectedUnit = ko.observable(new Skyguardian.UnitViewModel(0, ""));
            this.hasUnits = ko.computed(function () {
                return _this.unitList().length > 0;
            });
        }
        return LoginMainPageViewModel;
    })();
    Skyguardian.LoginMainPageViewModel = LoginMainPageViewModel;
})(Skyguardian || (Skyguardian = {}));
//# sourceMappingURL=LoginMainPageViewModel.js.map
