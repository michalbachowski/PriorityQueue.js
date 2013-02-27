/*global: node */
if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['../src/priority_queue.js', 'chai'], function (PriorityQueue, chai) {
    var assert = chai.assert;

    describe('PriorityQueue', function () {
        var pq;
        
        beforeEach(function () {
            pq = PriorityQueue();
        });

        describe('pop', function () {
            describe('when no items in queue', function () {
                it('should return undefined', function () {
                    assert.isUndefined(pq.pop());
                });
            });
            
            describe('when one item in queue', function () {
                it('should return item', function () {
                    pq.push('foo', 1);
                    assert.equal(pq.pop(), 'foo');
                });
                it('should empty queue', function () {
                    pq.push('foo', 1);
                    assert.equal(pq.pop(), 'foo');
                    assert.isUndefined(pq.pop());
                });
            });

            describe('when many items', function () {
                describe('and {low: true}', function () {
                    it('should return item with LOWEST priority', function () {
                        pq = PriorityQueue({'low': true});
                        pq.push('bar', 10);
                        pq.push('foo', 1);
                        assert.equal(pq.pop(), 'foo');
                        assert.equal(pq.pop(), 'bar');
                        assert.isUndefined(pq.pop());
                    });
                });
                describe('and {low: false}', function () {
                    it('should return item with HIGHEST priority', function () {
                        pq.push('bar', 10);
                        pq.push('foo', 1);
                        assert.equal(pq.pop(), 'bar');
                        assert.equal(pq.pop(), 'foo');
                        assert.isUndefined(pq.pop());
                    });
                });
            });
        });
        
        describe('top', function () {
            describe('when no items in queue', function () {
                it('should return undefined', function () {
                    assert.isUndefined(pq.top());
                });
            });
            
            describe('when one item in queue', function () {
                it('should return item', function () {
                    pq.push('foo', 1);
                    assert.equal(pq.top(), 'foo');
                });
                it('should NOT empty queue', function () {
                    pq.push('foo', 1);
                    assert.equal(pq.top(), 'foo');
                    assert.equal(pq.top(), 'foo');
                    assert.equal(pq.top(), 'foo');
                    assert.equal(pq.top(), 'foo');
                });
            });

            describe('when many items', function () {
                describe('and {low: true}', function () {
                    it('should return first item with LOWEST priority', function () {
                        pq = PriorityQueue({'low': true});
                        pq.push('bar', 10);
                        pq.push('foo', 1);
                        assert.equal(pq.top(), 'foo');
                        assert.equal(pq.top(), 'foo');
                    });
                });
                describe('and {low: false}', function () {
                    it('should return first item with HIGHEST priority', function () {
                        pq.push('bar', 10);
                        pq.push('foo', 1);
                        assert.equal(pq.top(), 'bar');
                        assert.equal(pq.top(), 'bar');
                        assert.equal(pq.top(), 'bar');
                        assert.equal(pq.top(), 'bar');
                        assert.equal(pq.top(), 'bar');
                    });
                });
            });
        });

        describe('each', function () {
            describe('when no items in queue', function () {
                it('does not call callback', function () {
                    pq.each(assert.fail);
                });
            });
            describe('when any item in queue', function () {
                it('should invoke callback', function () {
                    pq.push('a', 1);
                    pq.each(function (i) {
                        assert.equal(i, 'a');
                    });
                });
                it('should invoke callback as many times as items in queue', function () {
                    pq.push('a', 1);
                    pq.push('b', 1);
                    pq.push('c', 1);
                    pq.push('d', 1);
                    var size = pq.size();
                    pq.each(function (i) {
                        size -= 1;
                    });
                    assert.equal(size, 0);
                });
            });
            it('should invoke callback in given order', function () {
                var tester = function (items, expected) {
                    var i = 0;
                    for(; i < items.length; i = i + 1) {
                        pq.push(items[i][0], items[i][1]);
                    }
                    i = 0;
                    pq.each(function (e) {
                        assert.equal(e, expected[i]);
                        i = i + 1;
                    });
                };
                tester([['a', 2], ['b', 1]], ['b', 'a']);
                pq = PriorityQueue({'low': true});
                tester([['a', 2], ['b', 1]], ['a', 'b']);
            });
        });
        
        describe('includes', function () {
            describe('when no items in queue', function () {
                it('should always return False', function () {
                    assert.isFalse(pq.includes(void 0));
                    assert.isFalse(pq.includes(null));
                    assert.isFalse(pq.includes('foo'));
                    assert.isFalse(pq.includes(''));
                });
            });

            describe('when any item in queue', function () {
                it('should return True if item is present in queue', function () {
                    pq.push('foo', 1);
                    assert.isTrue(pq.includes('foo'))
                });
                it('should return False if item is not present in queue', function () {
                    pq.push('foo', 1);
                    assert.isFalse(pq.includes('bar'))
                });
            });
        });
        
        describe('size', function () {
            it('should return number of items in queue', function () {
                assert.equal(pq.size(), 0);
                pq.push('a', 1);
                assert.equal(pq.size(), 1);
                pq.push('b', 1);
                assert.equal(pq.size(), 2);
                pq.pop();
                assert.equal(pq.size(), 1);
                pq.push('a', 1);
                assert.equal(pq.size(), 2);
                pq.top();
                assert.equal(pq.size(), 2);
            });
        });

        describe('empty', function () {
            describe('when no items in queue', function () {
                it('should return False', function () {
                    assert.isTrue(pq.empty());
                });
            });
            describe('when any items in queue', function () {
                it('should return False', function () {
                    pq.push('a', 1);
                    assert.isFalse(pq.empty());
                });
            });
        });

        describe('push', function () {
            it('adds new item with the same priority', function () {
                pq.push('a', 1);
                pq.push('b', 1);
                assert.equal(pq.size(), 2);
            });
            it('adds new item with the same value', function () {
                pq.push('a', 1);
                pq.push('a', 2);
                assert.equal(pq.size(), 2);
            });
            it('adds new item with the same value and priority', function () {
                pq.push('a', 1);
                pq.push('a', 1);
                assert.equal(pq.size(), 2);
            });
        });
    });    
});
