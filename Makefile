# Build Bootpolish
# Compile and minify JS and CSS and copy to docs.
# Requires uglifyjs.
bootpolish:
	cat js/bootpolish.js > dist/bootpolish.js
	cp lib/less.js/less-1.2.1.js  dist/less-1.2.1.js
	uglifyjs -nc dist/bootpolish.js > dist/bootpolish.min.js
	uglifyjs -nc dist/less-1.2.1.js > dist/less-1.2.1.min.js
	mkdir -p docs/assets/js
	cp dist/* docs/assets/js
	mkdir -p docs/assets/css
	cp css/* docs/assets/css

# Build docs.
docs: bootpolish
	node docs/build

# Update Bootstrap files (LESS and JS) to Bootstrap's latest master.
# Requires the bootstrap repo to be checked out one level up.
update:
	cp -r ../bootstrap/less ./docs/assets/
