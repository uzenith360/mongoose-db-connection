import 'mocha';
import { assert } from 'chai';

import MongooseDBConnection from '../src/index';

describe('MongooseDB Connection Class', () => {
    it('should have a getInstance init method', () => {
        assert.isFunction(MongooseDBConnection.getInstance);
    });
});