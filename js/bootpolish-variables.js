/**
 * Set up the list of known variables for Bootstrap.
 */
(function(bootpolish) {

	// Declare known variable groups and their description.
	bootpolish.groups = [
		{
			name: 			"links",
			description: 	"Links & Typography",
			variables: 		[]
		},
		{
			name: 			"grid",
			description: 	"Grid",
			variables: 		[]
		},
		{
			name: 			"colors",
			description: 	"Colors",
			variables: 		[]
		},
		{
			name: 			"navbar",
			description: 	"Navbar",
			variables: 		[]
		},
		{
			name: 			"forms",
			description: 	"Forms & Alerts",
			variables: 		[]
		},
		{
			name: 			"custom",
			description: 	"Custom Variables",
			variables: 		[]
		}
	];
	
	// Declare known variables, their type, group and default value.
	bootpolish.variables = {
		"@linkColor": {
			name: 	"@linkColor",
			group: 	"links",
			colour: true
		},
		"@linkColorHover": {
			name: 	"@linkColorHover",
			group: 	"links",
			colour: true
		},
		"@blue": {
			name: 	"@blue",
			group: 	"colors",
			colour: true
		},
		"@green": {
			name: 	"@green",
			group: 	"colors",
			colour: true
		},
		"@red": {
			name: 	"@red",
			group: 	"colors",
			colour: true
		},
		"@yellow": {
			name: 	"@yellow",
			group: 	"colors",
			colour: true
		},
		"@orange": {
			name: 	"@orange",
			group: 	"colors",
			colour: true
		},
		"@pink": {
			name: 	"@pink",
			group: 	"colors",
			colour: true
		},
		"@purple": {
			name: 	"@purple",
			group: 	"colors",
			colour: true
		},
		"@gridColumns": {
			name: 	"@gridColumns",
			group: 	"grid",
			colour: true
		},
		"@gridColumnWidth": {
			name: 	"@gridColumnWidth",
			group: 	"grid",
			colour: true
		},
		"@gridGutterWidth": {
			name: 	"@gridGutterWidth",
			group: 	"grid",
			colour: true
		},
		"@fluidGridColumnWidth": {
			name: 	"@fluidGridColumnWidth",
			group: 	"grid",
			colour: true
		},
		"@fluidGridGutterWidth": {
			name: 	"@fluidGridGutterWidth",
			group: 	"grid",
			colour: true
		},
		"@baseFontSize": {
			name: 	"@baseFontSize",
			group: 	"links",
			size: 	true
		},
		"@baseFontFamily": {
			name: 	"@baseFontFamily",
			group: 	"links",
			text: 	true
		},
		"@baseLineHeight": {
			name: 	"@baseLineHeight",
			group: 	"links",
			size: 	true
		},
		"@primaryButtonColor": {
			name: 	"@primaryButtonColor",
			group: 	"forms",
			colour: true
		},
		"@placeholderText": {
			name: 	"@placeholderText",
			group: 	"forms",
			colour: true
		},
		"@navbarHeight": {
			name: 	"@navbarHeight",
			group: 	"navbar",
			size: 	true
		},
		"@navbarBackground": {
			name: 	"@navbarBackground",
			group: 	"navbar",
			colour: true
		},
		"@navbarBackgroundHighlight": {
			name: 	"@navbarBackgroundHighlight",
			group: 	"navbar",
			colour: true
		},
		"@navbarText": {
			name: 	"@navbarText",
			group: 	"navbar",
			colour: true
		},
		"@navbarLinkColor": {
			name: 	"@navbarLinkColor",
			group: 	"navbar",
			colour: true
		},
		"@navbarLinkColorHover": {
			name: 	"@navbarLinkColorHover",
			group: 	"navbar",
			colour: true
		},
		"@warningText": {
			name: 	"@warningText",
			group: 	"forms",
			colour: true
		},
		"@warningBackground": {
			name: 	"@warningBackground",
			group: 	"forms",
			colour: true
		},
		"@errorText": {
			name: 	"@errorText",
			group: 	"forms",
			colour: true
		},
		"@errorBackground": {
			name: 	"@errorBackground",
			group: 	"forms",
			colour: true
		},
		"@successText": {
			name: 	"@successText",
			group: 	"forms",
			colour: true
		},
		"@successBackground": {
			name: 	"@successBackground",
			group: 	"forms",
			colour: true
		},
		"@infoText": {
			name: 	"@infoText",
			group: 	"forms",
			colour: true
		},
		"@infoBackground": {
			name: 	"@infoBackground",
			group: 	"forms",
			colour: true
		}
	};

}(bootpolish));