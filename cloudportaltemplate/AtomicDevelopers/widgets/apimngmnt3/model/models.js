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

			var model = 
    			new sap.ui.model.odata.ODataModel(jQuery.sap.getModulePath("apimngmnt3") + "/destinations/API_Management_Dev_Portal/odata/1.0/data.svc/", {
	                        json: true,
	                        loadMetadataAsync: true
                        });

	      //  var model = 
    			// new sap.ui.model.odata.ODataModel(jQuery.sap.getModulePath("apimngmnt3") + "/destinations/API_Management_Dev_Portal/apiportal/api/1.0/Management.svc", {
       //                 json: true,
       //                 loadMetadataAsync: true
       //                 });

                    
		    return model;
		}

	};

});