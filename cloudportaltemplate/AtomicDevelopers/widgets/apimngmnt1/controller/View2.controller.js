sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"apimngmnt1/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("apimngmnt1.controller.View2", {
	    
	    formatter: formatter,
	    
	    onInit: function () {
		    var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("product").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			
			oView.bindElement({
				 path :  "/APIMgmt.APIProducts('" + oArgs.productId + "')",
				//path :  "/APIProducts('" + oArgs.productId + "')",
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
		
		onShareProductPress: function (oEvent) {
			var source = oEvent.getSource();

			var eventBus = sap.ui.getCore().getEventBus();
			eventBus.publish("devportal", "share_api_product", 
			    {
			        selectedObj: source.getModel().getData(),
					path: source.getBindingContext()
			    }
			);
		},
		
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}else{
			    var view = this.getView();
			    var component= this.getOwnerComponent();
			    var model = component.getModel();
			    var path = view.getBindingContext().sPath;
			    view.setBusy(true);
			    
			     model.read(path, 
    			     {
    			         urlParameters: {
    			             "$format":"json",
    			            "$expand":"ToApplicationDetails,ToAPIProxies"
    			         }, 
    			         // "$expand":"applications,apiProxies"
    			         success: function(oData, oResponse){  
            			         debugger;
            			        /*var view = this.getView();
            			        var apiProxyTabBar = view.byId("apiProxyTabBar");
            			        apiProxyTabBar.mProperties.count = oData.apiProxies.results.length;
            			        
			                    var applicationTabBar = view.byId("applicationTabBar");
			                    applicationTabBar.mProperties.count = oData.applications.results.length;*/
			                    
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