NPM=npm

i: install

lint:
	@$(NPM) -s run lint;

test:
	@$(NPM) -s test;

purge:
	@rm -rf node_modules
	@rm -f package-lock.json
	@find . -maxdepth 3 -mindepth 3 -type d -name node_modules -exec rm -rf {} \;
	@find . -maxdepth 3 -mindepth 3 -type d -name output -exec rm -rf {} \;
	@find . -maxdepth 3 -mindepth 3 -type f -name package-lock.json -exec rm {} \;
	@find . -name ".DS_Store" -delete

tar:
	@tar -zcvf ../ecma-util.tar.gz .
