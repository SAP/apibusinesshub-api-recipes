sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"apimngmnt1/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("apimngmnt1.controller.View1", {
	    
	    formatter: formatter,
	    
	    formatDate: function(value){
	        return value;
	    },
	    
	    onItemSelect: function(oEvent){
	        var list = oEvent.oSource;
	        var selectedItem = list.getSelectedItem();
	        var context = selectedItem.getBindingContext();
	        var path = context.getProperty("name");
	        var content = selectedItem.getContent()[0];
	       var iconSrc = content.getIcon();

	        var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("product", {
			    productId: path,
			    iconSrc: iconSrc
			}, true);
	    }

	});

});