sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createAPIMgmtModel: function(){
			debugger;
		

			
		     var model = 
    			new sap.ui.model.odata.ODataModel(jQuery.sap.getModulePath("apimngmnt2") +
    			    "/destinations/API_Managment_EndPoint/odata/1.0/data.svc", {
                        json: true,
                        loadMetadataAsync: true
                        });
                    
		    return model;
		}

	};

});