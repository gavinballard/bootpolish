# Build Bootpolish
# Compile and minify JS and CSS and copy to docs.
# Requires uglifyjs.
bootpolish: template
	cat lib/less.js/less-1.2.1.js js/bootpolish.js js/bootpolish-variables.js js/bootpolish-hogan.js templates/templates.js > dist/bootpolish.js
	uglifyjs -nc dist/bootpolish.js > dist/bootpolish.min.js
	mkdir -p docs/assets/js
	cp dist/*min.js docs/assets/js
	rm templates/templates.js*

# Build docs.
docs: bootpolish
	node docs/build	
	@echo "Built docs."

# Build templates
template:
	@echo "bootpolish.loadTemplates = function(bootpolish) {" > templates/templates.js
	cd templates; hulk *.mustache >> templates.js; cd ..
	@echo "bootpolish.templates = templates;" >> templates/templates.js
	@echo "};" >> templates/templates.js
	sed -i -e 's/Hogan/bootpolish.Hogan/g' templates/templates.js
	@echo "Built templates."

# Update Bootstrap files (LESS and JS) to Bootstrap's latest master.
# Requires the bootstrap repo to be checked out one level up.
update:
	cp -r ../bootstrap/less ./docs/assets/