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
**//**
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

}(bootpolish));/**
 * Wrap hogan.js template renderer into bootpolish namespace.
 */
(function(bootpolish) {

	/*
	 *  Copyright 2011 Twitter, Inc.
	 *  Licensed under the Apache License, Version 2.0 (the "License");
	 *  you may not use this file except in compliance with the License.
	 *  You may obtain a copy of the License at
	 *
	 *  http://www.apache.org/licenses/LICENSE-2.0
	 *
	 *  Unless required by applicable law or agreed to in writing, software
	 *  distributed under the License is distributed on an "AS IS" BASIS,
	 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 *  See the License for the specific language governing permissions and
	 *  limitations under the License.
	 */

	var Hogan = {};

	(function (Hogan) {
	  Hogan.Template = function constructor(renderFunc, text, compiler) {
	    if (renderFunc) {
	      this.r = renderFunc;
	    }
	    this.c = compiler;
	    this.text = text || '';
	  }

	  Hogan.Template.prototype = {
	    // render: replaced by generated code.
	    r: function (context, partials, indent) { return ''; },

	    // variable escaping
	    v: hoganEscape,

	    render: function render(context, partials, indent) {
	      return this.ri([context], partials || {}, indent);
	    },

	    // render internal -- a hook for overrides that catches partials too
	    ri: function (context, partials, indent) {
	      return this.r(context, partials, indent);
	    },

	    // tries to find a partial in the curent scope and render it
	    rp: function(name, context, partials, indent) {
	      var partial = partials[name];

	      if (!partial) {
	        return '';
	      }

	      if (this.c && typeof partial == 'string') {
	        partial = this.c.compile(partial);
	      }

	      return partial.ri(context, partials, indent);
	    },

	    // render a section
	    rs: function(context, partials, section) {
	      var buf = '',
	          tail = context[context.length - 1];

	      if (!isArray(tail)) {
	        return buf = section(context, partials);
	      }

	      for (var i = 0; i < tail.length; i++) {
	        context.push(tail[i]);
	        buf += section(context, partials);
	        context.pop();
	      }

	      return buf;
	    },

	    // maybe start a section
	    s: function(val, ctx, partials, inverted, start, end, tags) {
	      var pass;

	      if (isArray(val) && val.length === 0) {
	        return false;
	      }

	      if (typeof val == 'function') {
	        val = this.ls(val, ctx, partials, inverted, start, end, tags);
	      }

	      pass = (val === '') || !!val;

	      if (!inverted && pass && ctx) {
	        ctx.push((typeof val == 'object') ? val : ctx[ctx.length - 1]);
	      }

	      return pass;
	    },

	    // find values with dotted names
	    d: function(key, ctx, partials, returnFound) {
	      var names = key.split('.'),
	          val = this.f(names[0], ctx, partials, returnFound),
	          cx = null;

	      if (key === '.' && isArray(ctx[ctx.length - 2])) {
	        return ctx[ctx.length - 1];
	      }

	      for (var i = 1; i < names.length; i++) {
	        if (val && typeof val == 'object' && names[i] in val) {
	          cx = val;
	          val = val[names[i]];
	        } else {
	          val = '';
	        }
	      }

	      if (returnFound && !val) {
	        return false;
	      }

	      if (!returnFound && typeof val == 'function') {
	        ctx.push(cx);
	        val = this.lv(val, ctx, partials);
	        ctx.pop();
	      }

	      return val;
	    },

	    // find values with normal names
	    f: function(key, ctx, partials, returnFound) {
	      var val = false,
	          v = null,
	          found = false;

	      for (var i = ctx.length - 1; i >= 0; i--) {
	        v = ctx[i];
	        if (v && typeof v == 'object' && key in v) {
	          val = v[key];
	          found = true;
	          break;
	        }
	      }

	      if (!found) {
	        return (returnFound) ? false : "";
	      }

	      if (!returnFound && typeof val == 'function') {
	        val = this.lv(val, ctx, partials);
	      }

	      return val;
	    },

	    // higher order templates
	    ho: function(val, cx, partials, text, tags) {
	      var compiler = this.c;
	      var t = val.call(cx, text, function(t) {
	        return compiler.compile(t, {delimiters: tags}).render(cx, partials);
	      });
	      var s = compiler.compile(t.toString(), {delimiters: tags}).render(cx, partials);
	      this.b = s;
	      return false;
	    },

	    // higher order template result buffer
	    b: '',

	    // lambda replace section
	    ls: function(val, ctx, partials, inverted, start, end, tags) {
	      var cx = ctx[ctx.length - 1],
	          t = null;

	      if (!inverted && this.c && val.length > 0) {
	        return this.ho(val, cx, partials, this.text.substring(start, end), tags);
	      }

	      t = val.call(cx);

	      if (typeof t == 'function') {
	        if (inverted) {
	          return true;
	        } else if (this.c) {
	          return this.ho(t, cx, partials, this.text.substring(start, end), tags);
	        }
	      }

	      return t;
	    },

	    // lambda replace variable
	    lv: function(val, ctx, partials) {
	      var cx = ctx[ctx.length - 1];
	      var result = val.call(cx);
	      if (typeof result == 'function') {
	        result = result.call(cx);
	      }
	      result = result.toString();

	      if (this.c && ~result.indexOf("{{")) {
	        return this.c.compile(result).render(cx, partials);
	      }

	      return result;
	    }

	  };

	  var rAmp = /&/g,
	      rLt = /</g,
	      rGt = />/g,
	      rApos =/\'/g,
	      rQuot = /\"/g,
	      hChars =/[&<>\"\']/;

	  function hoganEscape(str) {
	    str = String((str === null || str === undefined) ? '' : str);
	    return hChars.test(str) ?
	      str
	        .replace(rAmp,'&amp;')
	        .replace(rLt,'&lt;')
	        .replace(rGt,'&gt;')
	        .replace(rApos,'&#39;')
	        .replace(rQuot, '&quot;') :
	      str;
	  }

	  var isArray = Array.isArray || function(a) {
	    return Object.prototype.toString.call(a) === '[object Array]';
	  };

	})(typeof exports !== 'undefined' ? exports : Hogan);

	// Attach Hogan object to bootpolish namespace.
	bootpolish.Hogan = Hogan;
	
}(bootpolish));bootpolish.loadTemplates = function(bootpolish) {
var templates = {};
templates.css = new bootpolish.Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<style type=\"text/css\">";b += "\n" + i;b += "	#bootpolish-widget {";b += "\n" + i;b += "		margin: 		0;";b += "\n" + i;b += "		top: 			60px;	";b += "\n" + i;b += "		width: 			320px;";b += "\n" + i;b += "		left: 			-10px;";b += "\n" + i;b += "		opacity:		1.0;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget .close {";b += "\n" + i;b += "		opacity:	1.0;";b += "\n" + i;b += "		margin-top:	5px;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget .icon-chevron-right {";b += "\n" + i;b += "		display: none;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget > .modal-header {";b += "\n" + i;b += "		cursor: 		pointer;";b += "\n" + i;b += "		padding-left:	20px;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget > .modal-body {";b += "\n" + i;b += "		max-height:		300px;";b += "\n" + i;b += "		overflow:		auto;";b += "\n" + i;b += "		margin-bottom: 	0;";b += "\n" + i;b += "		padding-left:	20px;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "\n" + i;b += "	/* 'Closed' widget. */";b += "\n" + i;b += "	#bootpolish-widget.closed {	";b += "\n" + i;b += "		left:		-280px;";b += "\n" + i;b += "		opacity:	0.25;";b += "\n" + i;b += "	}";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget.closed .icon-chevron-right { display: inline-block; }";b += "\n" + i;b += "	#bootpolish-widget.closed .icon-chevron-left  { display: none; }";b += "\n" + i;b += "\n" + i;b += "	#bootpolish-widget.closed > .modal-body,";b += "\n" + i;b += "	#bootpolish-widget.closed > .modal-footer {";b += "\n" + i;b += "		display: none;";b += "\n" + i;b += "	}";b += "\n" + i;b += "</style>";return b;;});
templates.group = new bootpolish.Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div class=\"accordion-group\">";b += "\n" + i;b += "  <div class=\"accordion-heading\">";b += "\n" + i;b += "    <a class=\"accordion-toggle\" href=\"#\" data-toggle=\"collapse\" data-target=\"#bootpolish-widget-";b += (_.v(_.f("name",c,p,0)));b += "\" data-parent=\"#bootpolish-widget\">";b += (_.v(_.f("description",c,p,0)));b += "</a>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "  <div class=\"accordion-body collapse\" id=\"bootpolish-widget-";b += (_.v(_.f("name",c,p,0)));b += "\">";b += "\n" + i;b += "    <div class=\"accordion-inner\">";b += "\n" + i;if(_.s(_.f("variables",c,p,1),c,p,0,358,387, "{{ }}")){b += _.rs(c,p,function(c,p){ var b = "";b += _.rp("variable",c,p,"      	");return b;});c.pop();}else{b += _.b; _.b = ""};b += "    </div>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "</div>";return b;;});
templates.variable = new bootpolish.Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<label>";b += (_.v(_.f("name",c,p,0)));b += "</label>";b += "\n" + i;if(_.s(_.f("colour",c,p,1),c,p,0,35,60, "{{ }}")){b += _.rs(c,p,function(c,p){ var b = "";b += _.rp("variable_colour",c,p,"  ");return b;});c.pop();}else{b += _.b; _.b = ""};return b;;});
templates.variable_colour = new bootpolish.Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<input type=\"text\" class=\"input-large\" value=\"";b += (_.v(_.f("value",c,p,0)));b += "\" placeholder=\"";b += (_.v(_.f("value",c,p,0)));b += "\" data-variable=\"";b += (_.v(_.f("name",c,p,0)));b += "\" data-type=\"colour\" />";return b;;});
templates.widget = new bootpolish.Hogan.Template(function(c,p,i){i = i || "";var b = i + "";var _ = this;b += "<div id=\"bootpolish-widget\" class=\"modal closed\">";b += "\n" + i;b += "  <div class=\"modal-header\">        ";b += "\n" + i;b += "    <a class=\"close\">";b += "\n" + i;b += "      <i class=\"icon-chevron-right\"></i>";b += "\n" + i;b += "      <i class=\"icon-chevron-left\"></i>";b += "\n" + i;b += "    </a>";b += "\n" + i;b += "    <h3>Bootpolish</h3>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "\n" + i;b += "  <div class=\"modal-body accordion\">  ";b += "\n" + i;if(_.s(_.f("groups",c,p,1),c,p,0,285,304, "{{ }}")){b += _.rs(c,p,function(c,p){ var b = "";b += _.rp("group",c,p,"    ");return b;});c.pop();}else{b += _.b; _.b = ""};b += "  </div>";b += "\n" + i;b += "\n" + i;b += "  <div class=\"modal-footer\">";b += "\n" + i;b += "    <button class=\"btn btn-large btn-primary\">Generate LESS</button>";b += "\n" + i;b += "    <button class=\"btn btn-large btn-danger\">Reset</button>";b += "\n" + i;b += "  </div>";b += "\n" + i;b += "</div>";return b;;});
bootpolish.templates = templates;
};
