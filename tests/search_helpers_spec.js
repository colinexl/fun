import {expect} from 'chai';
import {search} from '../search_helpers';

const input = [
  'A',
  'BCDEFG',
  'UANTCASTYSWQ',
  'EORNOTOBEKANGARTOB',
  'LUYAGIMMXVRHPJITSOOTHEPZ'
];
const validWords = [
'QUANTCAST',
'FADE',
'GRABS',
'CASTE',
'CAST',
'DEAF',
'CASTED',
'CASTLE',
'BAGS',
'QUANTCATS',
'BAG',
'BUG',
'DEFEAT',
'FADED',
'DEFACTO',
'EAST',
'YEAST',
];

describe('Search function', () => {
  describe('search()', () => {
    it('should return a list of matching words from valid word list, unsorted', (done) => {
      const foundList = [
        'QUANTCAST',
        'FADE',
        'CASTE',
        'CAST',
        'DEAF',
        'CASTED',
        'BAGS',
        'BAG',
        'DEFACTO',
        'EAST',
      ];
      expect(search(input, validWords)).to.deep.equal(foundList);
      done();
    });

    it('should return a list of matching words from valid word list, sorted', (done) => {
      const foundList = [
        'BAG',
        'BAGS',
        'CAST',
        'CASTE',
        'CASTED',
        'DEAF',
        'DEFACTO',
        'EAST',
        'FADE',
        'QUANTCAST',
      ];
      expect(search(input, validWords, true)).to.deep.equal(foundList);
      done();
    });
  });

});
