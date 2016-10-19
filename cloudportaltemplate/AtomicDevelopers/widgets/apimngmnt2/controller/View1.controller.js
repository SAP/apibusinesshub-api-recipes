sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/m/MessageToast'
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("apimngmnt2.controller.View1", {
	    
	    onInit: function () {
			this._wizard = this.getView().byId("CreateProductWizard");
			this._oNavContainer = this.getView().byId("wizardNavContainer");
			this._oWizardContentPage = this.getView().byId("wizardContentPage");
			this.model = new sap.ui.model.json.JSONModel();
			this.model.setData({
				appNameState:"Error"
			});
			this.getView().setModel(this.model);
			this.model.setProperty("/productVAT", false);
		},

		applicationNameValidation : function () {
			var appName = this.getView().byId("appName").getValue();

			if( appName.length > 0 && appName.length<6 ){
			    this.model.setProperty("/appNameState", "Error");
			}else{
			    this.model.setProperty("/appNameState", "None");
			}
 
			if (appName.length < 6){
				this._wizard.invalidateStep(this.getView().byId("AppNameStep"));
			}else{
				this._wizard.validateStep(this.getView().byId("AppNameStep"));
			}
		},
		
 
		productAPIValidation: function(oEvent) {
            var selectedProductAPIs = oEvent.getParameter("selectedItems");
            if(typeof(selectedProductAPIs) !== "undefined" &&
                    selectedProductAPIs.length && selectedProductAPIs.length > 0)
            {
                this.model.setProperty("/selectedProductAPIs", selectedProductAPIs);
        
                this._wizard.validateStep(this.getView().byId("ProductAPIStep"));
            }else{
                this._wizard.invalidateStep(this.getView().byId("ProductAPIStep"));
            }
		},
		
		wizardCompletedHandler: function(oEvent){
		  var view = this.getView();
		  var APIMgmtModel = view.getModel("APIMgmtModel");
    	  var newEntity = this.buildNewEntity();
    	  view.setBusy(true);
    	  APIMgmtModel.create("APIMgmt.Applications", 
    	                  newEntity, {  
                          async : false,  
                          success : function(oData, response) {  
                               debugger;
                               	view.setBusy(false);
     				           APIMgmtModel.refresh();
     				           
     				           sap.m.MessageToast.show("Subscription created");
            
                                setTimeout(function(){ 
                                     var oRouter = this.getOwnerComponent().getRouter();
                                			oRouter.navTo("application", {
                                			    applicationId: oData.id
                                			}, true);
                                }.bind(this), 2500);      
                          }.bind(this),  
                          error : function(oError) {  
                               debugger;
                               view.setBusy(false);
     				            sap.m.MessageToast.show("Failed to create Subscription.");
                          }.bind(this)  
                      });  
		},
		
    	buildNewEntity: function(){
    	    var modelData = this.model.getData();
            var appName = modelData.appName;
    	    var selectedProductAPIs = modelData.selectedProductAPIs;
    	    var metaDataArray = [];
    	    for(var idx = 0 ; idx < selectedProductAPIs.length ; idx++){
    	        metaDataArray[idx] =  {"__metadata":{"uri":"APIMgmt.APIProducts(\'" + selectedProductAPIs[idx].getKey() + "\')"}};
    	    }
    	    
    	    var newEntity = {
    	        "id":"06534534536565",
    	        "version":"1",
    	        "title": appName,
    	        "ToAPIProductsDetails": metaDataArray
    	        /*"ToAPIProductsDetails":[
    	            {"__metadata":{"uri":"APIMgmt.APIProducts('NProduct')"}}
    	            ]*/
    	    };
    	    
    	    return newEntity;
    	},	
		
		
		_setEmptyValue : function (sPath) {
			this.model.setProperty(sPath, "n/a");
		},
	    
	    
	    handleWizardCancel: function(oEvent){
    	    if(typeof(hasher) !== "undefined"){
               hasher.setHash("Home-Display");
           }
	    }

	});

});