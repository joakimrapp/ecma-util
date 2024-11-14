NPM=npm

install:
	@$(NPM) -s i;

i: install

lint:
	@$(NPM) -s run lint;

test:
	@$(NPM) -s test;
