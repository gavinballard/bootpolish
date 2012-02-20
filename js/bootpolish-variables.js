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
		}
	};

}(bootpolish));