var Skyguardian;
(function (Skyguardian) {
    var WialonSessionViewModel = (function () {
        function WialonSessionViewModel() {
            this._sid = null;
        }
        Object.defineProperty(WialonSessionViewModel.prototype, "sid", {
            get: function () {
                return this._sid;
            },
            set: function (sid) {
                this._sid = sid;
            },
            enumerable: true,
            configurable: true
        });
        return WialonSessionViewModel;
    })();
    Skyguardian.WialonSessionViewModel = WialonSessionViewModel;
})(Skyguardian || (Skyguardian = {}));
//# sourceMappingURL=WialonSessionViewModel.js.map
