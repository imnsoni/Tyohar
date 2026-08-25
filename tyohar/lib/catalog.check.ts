import assert from 'node:assert/strict';

import { catalog, formatInr, itemById, templeById, temples } from './catalog.ts';

assert.ok(temples.length >= 8, 'need a real temple network');
assert.ok(catalog.some((c) => c.kind === 'puja'));
assert.ok(catalog.some((c) => c.kind === 'hawan'));
assert.ok(catalog.some((c) => c.kind === 'offering'));
assert.equal(formatInr(39), '₹39');
assert.ok(templeById('kashi'));
assert.ok(itemById('rudrabhishek'));
assert.ok(catalog.every((c) => templeById(c.templeId)), 'every seva maps to a temple');
console.log('catalog ok', temples.length, 'temples', catalog.length, 'sevas');
