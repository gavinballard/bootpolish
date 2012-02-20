/**
 * Bootpolish.
 */
(function(window, $, less) {

	var bootpolish = {};

	// Event callback for input change event.
	function changed(event) {

		var element 	= event.target,
			variable 	= element.getAttribute('data-variable'),
			type 		= element.getAttribute('data-type'),
			value  		= element.value;

		bootpolish.set(variable, value);
	};

	// Fetch a hash of parsed LESS variables and their CSS values.
	// Overrides any existing value in the given variables hash.
	function readVariables(variables) {

		// Iterate through each parsed sheet.
		less.sheets.forEach(function(sheet) {
			var href = less.extractId(sheet.href);

			var sheetVariables = less.parsed[href] ? less.parsed[href]._variableHash : {};

			// Attempt to get the CSS value of each variable.			
			for(sheetVariable in sheetVariables) {
				try {
					var value = sheetVariables[sheetVariable].value.toCSS({compress: true});

					// See if we know about this variable.
					if(variables[sheetVariable]) {
						variables[sheetVariable].value = value;
					} else {
						// Create a new custom variable.
						variables[sheetVariable] = {
							name: 	sheetVariable,
							group: 	'custom',
							text: 	true
						};
					}

				} catch(e) {
					// For the moment, ignore derived variables.
				}
			}
		}, this);

		return variables;
	};

	// Group variables.
	function groupVariables(groups, variables) {
		for(variable in variables) {
			var matched = false;
			groups.forEach(function(group) {
				if(!matched && (group.name === 'custom' || group.name === variables[variable].group)) {
					group.variables.push(variables[variable]);
					matched = true;
				}
			}, this);
		}

		return groups;
	};

	/**
	 * Initialise Bootpolish.
	 */
	bootpolish.start = function(options) {

		// Store options.
		this.options = options;

		// Load templates.
		this.loadTemplates(bootpolish);

		// Load CSS into head.
		$('head').append(this.templates.css.render());

		// Read and overwrite variables
		this.variables = readVariables(this.variables);

		// Group variables.
		var grouped = groupVariables(this.groups, this.variables);
		
		// Render the widget.
		var widget = $(this.templates.widget.render({
			groups: grouped
		}, this.templates));
		$('body').append(widget);

		// Set listener on widget header.
		widget.find('.modal-header').click(bootpolish.toggle);

		// Set listeners for variable inputs.
		$('body').on('change', 'input[data-variable]', changed);

		// Attach the widget
		bootpolish.widget = widget;

		// Open the widget if set.
		if(this.options.startOpen) {
			bootpolish.toggle();
		}
	};

	// Toggle the widget open or closed.
	bootpolish.toggle = function() {
		bootpolish.widget.toggleClass('closed');
	};

	/**
	 * Set a variable to a particular value.
	 * @param variable 	The name of the variable to set.
	 * @param value 	The value.
	 * @param sheet 	Optional. The href of the variable's sheet.
	 *					If no sheet is specified, the variable will
	 *					be set on all sheets in which it exists.
	 */
	bootpolish.set = function(variable, value, sheet) {
		less.updateVariable(variable, value, sheet);
	};

	// Add bootpolish to window object.
	window.bootpolish = bootpolish;
})(window, window.jQuery, window.less);

/**


	return {

		// Initialise the widget.
		initialise: function() {
		
			var sheetMap = {};

			// For each sheet, get a list of variables and their current value.
			less.sheets.forEach(function(sheet) {
				var hrefId = less.extractId(sheet.href);

				var variableMap = {};
				var variables = getSheetVariables(hrefId);

				for(variable in variables) {
					try {
						variableMap[variable] = variables[variable].value.toCSS({compress: true});
					} catch(e) {
						// For the moment, ignore derived variables.
					}
				}

				sheetMap[hrefId] = variableMap;
			}, this);

			// Render the widget.
			var widget = document.getElementById('bootstrap-live');
			renderWidget(widget, sheetMap);
		},

		// Triggered when an input changes.
		inputChanged: function(input) {
			var variable = input.getAttribute('data-bsl-variable');
			var value 	 = input.value;
			var sheet 	 = input.getAttribute('data-bsl-sheet');
			var type	 = input.getAttribute('data-bsl-type');

			// Prepend hash if it's a color.
			if(type === 'colour') {
				//value = '#' + value;
			}

			this.update(variable, value, sheet);
		},

		// Header was clicked. Toggle its form.
		headerClicked: function(header) {
			var widget = document.getElementById('bootstrap-live');
			var form = document.getElementById(header.innerHTML + '_form');
			form.style.display = (form.style.display != 'none' ? 'none' : '' );			
			widget.style.opacity = (widget.style.opacity == 0.2) ? 0.8 : 0.2;
		},

	};
}(less));

// Trigger initialisation.
bslive.initialise();
**/