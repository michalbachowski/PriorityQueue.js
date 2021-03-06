REPORTER ?= dot

all: clean build test

build:
	node node_modules/requirejs/bin/r.js \
		-o name=src/priority_queue \
		out=build/priority_queue.js \
		baseUrl=.

clean:
	rm -rf build

test:
	./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		-u bdd test/priority_queue.js

.PHONY: all build clean test
