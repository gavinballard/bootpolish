# Build Bootpolish
# Compile and minify JS and CSS and copy to docs.
# Requires uglifyjs.
bootpolish:
	cat src/bootpolish.js > dist/bootpolish.js
	cp lib/less.js/less-1.2.1.js  dist/less-1.2.1.js
	uglifyjs -nc dist/bootpolish.js > dist/bootpolish.min.js
	uglifyjs -nc dist/less-1.2.1.js > dist/less-1.2.1.min.js
	mkdir -p docs/assets/css
	mkdir -p docs/assets/js
	cp assets/css/* docs/assets/css
	cp dist/* docs/assets/js

# Update Bootstrap files (LESS and JS) to Bootstrap's latest master.
# Requires the bootstrap repo to be checked out one level up.
update:
	cd ../bootstrap && git pull
	make bootstrap && cd ../bootpolish
	cp ../bootstrap/less/* docs/less/
	cp ../bootstrap/bootstrap/js/* docs/assets/js/
