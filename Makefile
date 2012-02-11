# Build Bootpolish
# Compile and minify JS and CSS and copy to docs.
# Requires uglifyjs.
bootpolish: template
	cat js/bootpolish.js templates/templates.js > dist/bootpolish.js
	cp lib/less.js/less-1.2.1.js dist/less-1.2.1.js
	uglifyjs -nc dist/bootpolish.js > dist/bootpolish.min.js
	uglifyjs -nc dist/less-1.2.1.js > dist/less-1.2.1.min.js
	mkdir -p docs/assets/js
	cp dist/*min.js docs/assets/js
	rm templates/templates.js

# Build docs.
docs: bootpolish
	node docs/build
	@echo "Built docs."

# Build templates
template:
	@echo "bootpolish.loadTemplates = function(bootpolish) {" > templates/templates.js
	hulk templates/* >> templates/templates.js
	@echo "bootpolish.templates = templates;" >> templates/templates.js
	@echo "};" >> templates/templates.js
	@echo "Built templates."

# Update Bootstrap files (LESS and JS) to Bootstrap's latest master.
# Requires the bootstrap repo to be checked out one level up.
update:
	cp -r ../bootstrap/less ./docs/assets/