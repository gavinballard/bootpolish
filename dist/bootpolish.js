/**
 * Bootpolish.
 */
(function(window, $, less) {

	var bootpolish = {};

	/**
	 * Initialise Bootpolish.
	 */
	bootpolish.start = function(options) {

		// Store options.
		this.options = options;

		// Load hogan/js template renderer.
		$.getScript('http://twitter.github.com/hogan.js/builds/1.0.5/template-1.0.5.min.js', function() {

			// Load templates.
			this.loadTemplates(bootpolish);

			// Load CSS into head.
			$('head').append(this.templates.css.render());

			// Render the widget.
			this.widget = $(this.templates.widget.render({}));
			$('body').append(this.widget);

			// Set listener on widget header.
			bootpolish.widget.find('.modal-header').click(bootpolish.toggle);

			// Open the widget if set.
			if(this.options.startOpen) {
				bootpolish.toggle();
			}	
		}.bind(this));
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
**/bootpolish.loadTemplates = function(bootpolish) {
var templates = {};
templates.css = new Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<style type=\"text/css\">";b += "\n" + i;b += "	#bootpolish-widget {";b += "\n" + i;b += "		margin: 	0;";b += "\n" + i;b += "		top: 		60px;	";b += "\n" + i;b += "		width: 		300px;";b += "\n" + i;b += "		left: 		20px;";b += "\n" + i;b += "		opacity:	1.0;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget .close {";b += "\n" + i;b += "		opacity:	1.0;";b += "\n" + i;b += "		margin-top:	5px;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget .icon-chevron-right {";b += "\n" + i;b += "		display: none;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget > .modal-header {";b += "\n" + i;b += "		cursor: 	pointer;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget > .modal-body {";b += "\n" + i;b += "		max-height:		300px;";b += "\n" + i;b += "		overflow:		auto;";b += "\n" + i;b += "		margin-bottom: 	0;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "\n" + i;b += "	/* 'Closed' widget. */";b += "\n" + i;b += "	#bootpolish-widget.closed {	";b += "\n" + i;b += "		left:		-260px;";b += "\n" + i;b += "		opacity:	0.25;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget.closed .icon-chevron-right { display: inline-block; }";b += "\n" + i;b += "	#bootpolish-widget.closed .icon-chevron-left  { display: none; }";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget.closed > .modal-body,";b += "\n" + i;b += "	#bootpolish-widget.closed > .modal-footer {";b += "\n" + i;b += "		display: none;";b += "\n" + i;b += "	}";b += "\n" + i;b += "</style>";return b;;});
templates.templates = new Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "bootpolish.loadTemplates = function(bootpolish) {";return b;;});
templates.variable_group = new Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"accordion-group\">";b += "\n" + i;b += "  <div class=\"accordion-heading\">";b += "\n" + i;b += "    <a class=\"accordion-toggle\" href=\"#\" data-toggle=\"collapse\" data-target=\"#bootpolish-widget-links\" data-parent=\"#bootpolish-widget\">Links</a>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "  <div class=\"accordion-body collapse in\" id=\"bootpolish-widget-links\">";b += "\n" + i;b += "    <div class=\"accordion-inner\">";b += "\n" + i;b += "      Links";b += "\n" + i;b += "    </div>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "</div>";return b;;});
templates.widget = new Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div id=\"bootpolish-widget\" class=\"modal closed\">";b += "\n" + i;b += "  <div class=\"modal-header\">        ";b += "\n" + i;b += "    <a class=\"close\">";b += "\n" + i;b += "      <i class=\"icon-chevron-right\"></i>";b += "\n" + i;b += "      <i class=\"icon-chevron-left\"></i>";b += "\n" + i;b += "    </a>";b += "\n" + i;b += "    <h3>Bootpolish</h3>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "\n" + i;b += "  <div class=\"modal-body accordion\">  ";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "\n" + i;b += "  <div class=\"modal-footer\">";b += "\n" + i;b += "    <button class=\"btn btn-large btn-primary\">Generate LESS</button>";b += "\n" + i;b += "    <button class=\"btn btn-large btn-danger\">Reset</button>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "</div>";return b;;});
bootpolish.templates = templates;
};
