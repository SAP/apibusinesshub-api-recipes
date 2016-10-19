sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"apimngmnt3/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("apimngmnt3.controller.View1", {
	    
	    formatter: formatter,
	    
	    formatDate: function(value){
	        return value;
	    },
	    
	    onItemSelect: function(oEvent){
	        var list = oEvent.oSource;
	        var selectedItem = list.getSelectedItem();
	        var context = selectedItem.getBindingContext();
	        var path = context.getProperty("id");
	        var content = selectedItem.getContent()[0];
	       var iconSrc = content.getIcon();

	        var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("application", {
			    applicationId: path,
			    iconSrc: iconSrc
			}, true);
	    }

	});

});