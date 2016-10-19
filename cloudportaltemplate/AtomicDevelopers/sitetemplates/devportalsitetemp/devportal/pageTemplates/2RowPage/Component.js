// define a root UIComponent which exposes the main view
/*global jQuery, sap */
jQuery.sap.declare("cpv2.templates.2RowPage.Component");
jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("sap.ui.core.routing.Router");

// new Component
sap.ui.core.UIComponent.extend("cpv2.templates.2RowPage.Component", {

	oMainView: null,

	// use inline declaration instead of component.json to save 1 round trip
	metadata: {

		version: "@version@",

		includes: ["../../css/main.css"],

		dependencies: {
			libs: ["sap.m"],
			components: []
		},

		"config": {
			fullWidth: true,
			hideLightBackground: true
		}
	},

	createContent: function() {
		"use strict";
		this.oMainView = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.XML,
			viewName: "cpv2.templates.2RowPage.Template",
			id: this.createId("MainView")
		});

		return this.oMainView;
	}
});