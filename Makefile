
# Build Bootpolish
# Compile and minify JS and CSS and copy to docs.
bootpolish:
	cat src/bootpolish.js > dist/bootpolish.js
	cp lib/less.js/less-1.2.1.js  dist/less-1.2.1.js
	uglifyjs -nc dist/bootpolish.js > dist/bootpolish.min.js
	uglifyjs -nc dist/less-1.2.1.js > dist/less-1.2.1.min.js
	mkdir -p docs/css
	mkdir -p docs/js
	cp assets/css/* docs/css
	cp dist/* docs/js