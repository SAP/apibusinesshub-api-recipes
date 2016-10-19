sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"apimngmnt1/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("apimngmnt1.Component", {

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
			
			//Workaround for DEVPORTAL BUG
			var _oSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
			XMLHttpRequest.prototype.setRequestHeader = function(name, value){ 
				debugger;
			    if(name === 'X-Requested-With') {
			        return;
			    }
			    _oSetRequestHeader.call(this, name, value);
			};

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

            this.setModel(models.createAPIMgmtModel(this));       
			//this.setModel(model);
			
			XMLHttpRequest.prototype.setRequestHeader = _oSetRequestHeader;

            var router = this.getRouter();
			router.initialize();
            
		}
	});

});