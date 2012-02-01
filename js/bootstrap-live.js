/**
 * Bootstrap Live
 */
var bslive = (function(less) {

	function getSheetVariables(sheetHrefId) {
		if(!less.parsed.hasOwnProperty(sheetHrefId)) {
			return {};
		}
		return less.parsed[sheetHrefId]._variableHash;
	}

	function renderWidget(widget, sheetMap) {
		var html = '';

		for(sheet in sheetMap) {
			html += renderSheet(sheet, sheetMap);
		}

		widget.innerHTML = html;
	}

	function renderSheet(sheet, sheetMap) {
		var html = '';

		// Strip sheet name
		var sheetName = sheet.substring(sheet.lastIndexOf('/'));
		html += '<h3>' + sheetName + '</h3>';
		html += '<form>';
		for(variable in sheetMap[sheet]) {
			html += renderVariable(sheet, variable, sheetMap[sheet]);
		}
		html += '</form>';
		return html;
	}

	function renderVariable(sheet, variable, variableMap) {
		var html = '';
		html += '<label>' + variable + '</label>';
		html += '<input type="text" ';
		html += 'value=\'' + variableMap[variable] + '\' ';
		html += 'data-bsl-variable=\'' + variable + '\' ';
		html += 'data-bsl-sheet="' + sheet + '" ';
		html += 'onchange="bslive.inputChanged(this);" \/>';
		return html;
	}

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
			this.update(variable, value, sheet);
		},

		// Update a particular variable.
		update: function(variable, value, sheet) {
			less.updateVariable(variable, value, sheet);
		}

	};
}(less));

// Trigger initialisation.
bslive.initialise();