REPORTER ?= dot

test:
	./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) -u bdd

.PHONY: test
