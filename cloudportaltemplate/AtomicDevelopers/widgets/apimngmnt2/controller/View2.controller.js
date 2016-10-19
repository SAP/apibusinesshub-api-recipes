sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("apimngmnt2.controller.View2", {
	    
	    
	    onInit: function () {
		    var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("application").attachMatched(this._onRouteMatched, this);
		},
		
		onShareProductPress: function (oEvent) {
			debugger;
			var source = oEvent.getSource();

			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("devportal", "share_new_application", 
			    {
			        selectedObj: source.getModel().getData(),
					path: source.getBindingContext()
			    }
			);
		},
		
		_onRouteMatched : function (oEvent) {
		    debugger;
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			
			oView.bindElement({
				path :  "/APIMgmt.Applications('" + oArgs.applicationId + "')",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
		},
		
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}else{
			    	debugger;
			    var view = this.getView();
			    var component= this.getOwnerComponent();
			    var model = component.getModel("APIMgmtModel");
			    var path = view.getBindingContext().sPath;
			    view.setBusy(true);
			    
			     model.read(path, 
    			     {
    			         urlParameters: {
    			             "$format":"json",
    			             "$expand":"ToAPIProductsDetails"
    			         }, 
    			         success: function(oData, oResponse){  
            			         debugger;
                                // create JSON model  
                                var oODataJSONModel =  new sap.ui.model.json.JSONModel();  
                                // set the odata JSON as data of JSON model  
                                oODataJSONModel.setData(oData);  
                                view.setModel(oODataJSONModel);  
                                view.setBusy(false);
                                
                            }.bind(this), 
                        error: function(error){  
                              debugger
                                alert("Read failed"); 
                                 view.setBusy(false);
                          }.bind(this)
    			     });
			}
		},
	    
	    onNavBack: function() {
	        var oRouter = this.getOwnerComponent().getRouter();
		    oRouter.navTo("list");
		}
	    

	});

});