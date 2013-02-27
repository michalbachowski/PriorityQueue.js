REPORTER ?= dot

all: build test

build:
	node node_modules/requirejs/bin/r.js \
		-o name=src/priority_queue \
		out=build/priority-queue.js \
		baseUrl=.

clean:
	rm -rf build

test:
	./node_modules/mocha/bin/mocha \
		--reporter $(REPORTER) \
		-u bdd

.PHONY: all build clean test
