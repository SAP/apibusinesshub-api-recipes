sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"apimngmnt2/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("apimngmnt2.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			var _oSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;

			//Workaround for DEVPORTAL BUG
			XMLHttpRequest.prototype.setRequestHeader = function(name, value){ 
			    if(name === 'X-Requested-With') {
			        return;
			    }
			    _oSetRequestHeader.call(this, name, value);
			};

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			this.setModel(models.createAPIMgmtModel(), "APIMgmtModel");
			
			var router = this.getRouter();
			router.initialize();
			
			XMLHttpRequest.prototype.setRequestHeader = _oSetRequestHeader;
		}
	});

});