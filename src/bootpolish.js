/**
 * Bootpolish.
 */
(function(window, $, less) {

	var bootpolish = {};

	/**
	 * Initialise Bootpolish.
	 */
	bootpolish.initialise = function() {
		var widget = $('#bootpolish-widget').css({
			position: 	'fixed',
			top: 		'50px',
			left: 		'10px',
			width: 		'350px',
			maxHeight: 	'600px',
			margin: 	0
		});

		// Set properties on the modal body.
		widget.find('.modal-body').css({
			maxHeight: 		'430px',
			overflow: 		'auto',
			marginBottom: 	0
		});

		// Set open / close functions.
		widget.find('a.close:first').click(function(event) {
			// Close.
			if(this.innerHTML == '«') {
				bootpolish.widget.css({
					left: 		'-310px',
					opacity: 	0.25
				}).find('.modal-body,.modal-footer').hide();
				this.innerHTML = '»';
				return;
			}

			bootpolish.widget.css({
				left: 			'30px',
				opacity: 		1.0
			}).find('.modal-body,.modal-footer').show();
			this.innerHTML = '«';
		});

		// Attach the widget to the 
		bootpolish.widget = widget;
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

// Initialise bootpolish on document ready.
$(document).ready(bootpolish.initialise);

/**
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
		html += '<h3 onclick="bslive.headerClicked(this);">' + sheetName + '</h3>';
		html += '<form id="' + sheetName + '_form">';
		for(variable in sheetMap[sheet]) {
			html += renderVariable(sheet, variable, sheetMap[sheet]);
		}
		html += '</form>';
		return html;
	}

	function renderVariable(sheet, variable, variableMap) {

		// Dirty type detection
		var value = variableMap[variable];
		var type  = '';
		var cssClass = '';
		if(value.substring(0,1) == '#') {
			type = 'colour';
			cssClass += 'color {hash:true,adjust:false}';
		}

		var html = '';
		html += '<label>' + variable + '</label>';
		html += '<input type="text" ';
		html += 'class="' + cssClass + '" ';
		html += 'value=\'' + variableMap[variable] + '\' ';
		html += 'data-bsl-variable=\'' + variable + '\' ';
		html += 'data-bsl-type=\'' + type + '\' ';
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