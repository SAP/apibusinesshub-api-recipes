sap.ui.define([

	] , function () {
		"use strict";

    var ICONS = [ "sap-icon://product",
		             "sap-icon://background",
		             "sap-icon://bar-chart",
		             "sap-icon://badge",
		             "sap-icon://car-rental",
		             "sap-icon://cart",
		             "sap-icon://collaborate",
		             "sap-icon://electrocardiogram",
		             "sap-icon://geographic-bubble-chart",
		             "sap-icon://heating-cooling"
		             ];  
		             
		return {
		    
		   

			/**
			 * Rounds the number unit value to 2 digits
			 * @public
			 * @param {string} sValue the number string to be rounded
			 * @returns {string} sValue with 2 digits rounded
			 */
			numberUnit : function (sValue) {
				if (!sValue) {
					return "";
				}
				return parseFloat(sValue).toFixed(2);
			},
			
			formatDate : function (sValue) {
			    return sValue;
			},
			
			formatAPIProxies : function (sValue) {
			    if(typeof(sValue) !== "undefined" && sValue.length){
			        return sValue.length;
			    }else{
			        return 0;
			    }
			},
			
			formatIcon: function(){
			    return ICONS[ Math.floor((Math.random() * 10)) ];
			}

		};

	}
);