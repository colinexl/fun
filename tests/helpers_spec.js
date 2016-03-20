import {expect} from 'chai';
import * as Helpers from '../helpers';

const input = [
  'A',
  'BCDEFG',
  'UANTCASTYSWQ',
  'EORNOTOBEKANGARTOB',
  'LUYAGIMMXVRHPJITSOOTHEPZ'
];

describe('Helper functions', () => {
  describe('isCorner()', () => {
    it('should return true for center cell', (done) => {
      // special case for level 0
      expect(Helpers.isCorner(0, 0)).to.equal(true);
      done();
    });

    it('should return true if cell is a corner', (done) => {
      expect(Helpers.isCorner(0, 1)).to.equal(true);
      expect(Helpers.isCorner(1, 1)).to.equal(true);
      expect(Helpers.isCorner(0, 2)).to.equal(true);
      expect(Helpers.isCorner(2, 2)).to.equal(true);
      expect(Helpers.isCorner(4, 2)).to.equal(true);
      expect(Helpers.isCorner(0, 3)).to.equal(true);
      expect(Helpers.isCorner(3, 3)).to.equal(true);
      expect(Helpers.isCorner(9, 3)).to.equal(true);
      done();
    });

    it('should return false if cell is not a corner', (done) => {
      expect(Helpers.isCorner(1, 2)).to.equal(false);
      expect(Helpers.isCorner(3, 2)).to.equal(false);
      expect(Helpers.isCorner(7, 2)).to.equal(false);
      expect(Helpers.isCorner(2, 3)).to.equal(false);
      expect(Helpers.isCorner(4, 3)).to.equal(false);
      expect(Helpers.isCorner(5, 3)).to.equal(false);
      done();
    });
  });

  describe('isCenterCell()', () => {
    it('should return true for center cell only', (done) => {
      expect(Helpers.isCenterCell(0, 0)).to.equal(true);
      expect(Helpers.isCenterCell(0, 1)).to.equal(false);
      done();
    });
  });

  describe('getTopLeft()', () => {
    it('should get top left cell for center cell', (done) => {
      expect(Helpers.getTopLeft(0, 0)).to.equal(5);
      done();
    });

    it('should get top left cell for corners', (done) => {
      // expect(Helpers.getTopLeft(0, 0, Helpers.isCorner(0, 0))).to.equal(5);
      expect(Helpers.getTopLeft(0, 1)).to.equal(11);
      expect(Helpers.getTopLeft(1, 1)).to.equal(1);
      expect(Helpers.getTopLeft(2, 1)).to.equal(3);
      expect(Helpers.getTopLeft(5, 1)).to.equal(9);
      expect(Helpers.getTopLeft(0, 2)).to.equal(17);
      expect(Helpers.getTopLeft(2, 2)).to.equal(2);
      expect(Helpers.getTopLeft(4, 2)).to.equal(5);
      expect(Helpers.getTopLeft(10, 2)).to.equal(14);
      done();
    });

    it('should get top left cell for non-corner', (done) => {
      expect(Helpers.getTopLeft(1, 2)).to.equal(1);
      expect(Helpers.getTopLeft(3, 2)).to.equal(4);
      expect(Helpers.getTopLeft(5, 2)).to.equal(7);
      expect(Helpers.getTopLeft(7, 2)).to.equal(10);
      expect(Helpers.getTopLeft(9, 2)).to.equal(13);
      expect(Helpers.getTopLeft(11, 2)).to.equal(16);
      expect(Helpers.getTopLeft(1, 3)).to.equal(1);
      expect(Helpers.getTopLeft(2, 3)).to.equal(2);
      expect(Helpers.getTopLeft(4, 3)).to.equal(5);
      expect(Helpers.getTopLeft(5, 3)).to.equal(6);
      expect(Helpers.getTopLeft(7, 3)).to.equal(9);
      expect(Helpers.getTopLeft(8, 3)).to.equal(10);
      expect(Helpers.getTopLeft(10, 3)).to.equal(13);
      expect(Helpers.getTopLeft(11, 3)).to.equal(14);
      expect(Helpers.getTopLeft(13, 3)).to.equal(17);
      expect(Helpers.getTopLeft(14, 3)).to.equal(18);
      expect(Helpers.getTopLeft(16, 3)).to.equal(21);
      expect(Helpers.getTopLeft(17, 3)).to.equal(22);
      done();
    });
  });

  describe('getTopRight()', () => {
    it('should get top right cell for center cell', (done) => {
      expect(Helpers.getTopRight(0, 0)).to.equal(1);
      done();
    });

    it('should get top right cell for corners', (done) => {
      // expect(Helpers.getTopLeft(0, 0, Helpers.isCorner(0, 0))).to.equal(5);
      expect(Helpers.getTopRight(0, 1)).to.equal(1);
      expect(Helpers.getTopRight(1, 1)).to.equal(3);
      expect(Helpers.getTopRight(2, 1)).to.equal(5);
      expect(Helpers.getTopRight(5, 1)).to.equal(11);
      expect(Helpers.getTopRight(0, 2)).to.equal(1);
      expect(Helpers.getTopRight(2, 2)).to.equal(4);
      expect(Helpers.getTopRight(4, 2)).to.equal(7);
      expect(Helpers.getTopRight(10, 2)).to.equal(16);
      done();
    });

    it('should get top right cell for non-corner', (done) => {
      expect(Helpers.getTopRight(1, 2)).to.equal(2);
      expect(Helpers.getTopRight(3, 2)).to.equal(5);
      expect(Helpers.getTopRight(5, 2)).to.equal(8);
      expect(Helpers.getTopRight(7, 2)).to.equal(11);
      expect(Helpers.getTopRight(9, 2)).to.equal(14);
      expect(Helpers.getTopRight(11, 2)).to.equal(17);
      expect(Helpers.getTopRight(1, 3)).to.equal(2);
      expect(Helpers.getTopRight(2, 3)).to.equal(3);
      expect(Helpers.getTopRight(4, 3)).to.equal(6);
      expect(Helpers.getTopRight(5, 3)).to.equal(7);
      expect(Helpers.getTopRight(7, 3)).to.equal(10);
      expect(Helpers.getTopRight(8, 3)).to.equal(11);
      expect(Helpers.getTopRight(10, 3)).to.equal(14);
      expect(Helpers.getTopRight(11, 3)).to.equal(15);
      expect(Helpers.getTopRight(13, 3)).to.equal(18);
      expect(Helpers.getTopRight(14, 3)).to.equal(19);
      expect(Helpers.getTopRight(16, 3)).to.equal(22);
      expect(Helpers.getTopRight(17, 3)).to.equal(23);
      done();
    });
  });

  describe('getTop()', () => {
    it('should return the cell above center cell', (done) => {
      expect(Helpers.getTop(0, 0)).to.equal(0);
      done();
    });

    it('should get cell directly to the top with respect the the cell', (done) => {
      expect(Helpers.getTop(0, 1)).to.equal(0);
      expect(Helpers.getTop(1, 1)).to.equal(2);
      expect(Helpers.getTop(5, 1)).to.equal(10);
      expect(Helpers.getTop(0, 2)).to.equal(0);
      expect(Helpers.getTop(2, 2)).to.equal(3);
      expect(Helpers.getTop(4, 2)).to.equal(6);
      expect(Helpers.getTop(8, 2)).to.equal(12);
      done();
    });
  });

  describe('getSiblingLeft()', () => {
    it('should get left sibling of center cell', (done) => {
      expect(Helpers.getSiblingLeft(0, 0)).to.equal(4);
      done();
    });

    it('should get left sibling cell', (done) => {
      expect(Helpers.getSiblingLeft(0, 1)).to.equal(5);
      expect(Helpers.getSiblingLeft(1, 1)).to.equal(0);
      expect(Helpers.getSiblingLeft(2, 1)).to.equal(1);
      expect(Helpers.getSiblingLeft(3, 1)).to.equal(2);
      expect(Helpers.getSiblingLeft(4, 1)).to.equal(3);
      expect(Helpers.getSiblingLeft(0, 2)).to.equal(11);
      expect(Helpers.getSiblingLeft(1, 2)).to.equal(0);
      expect(Helpers.getSiblingLeft(2, 2)).to.equal(1);
      expect(Helpers.getSiblingLeft(3, 2)).to.equal(2);
      expect(Helpers.getSiblingLeft(5, 2)).to.equal(4);
      expect(Helpers.getSiblingLeft(11, 2)).to.equal(10);
      expect(Helpers.getSiblingLeft(0, 3)).to.equal(17);
      expect(Helpers.getSiblingLeft(9, 2)).to.equal(8);
      expect(Helpers.getSiblingLeft(17, 2)).to.equal(16);
      done();
    });
  });

  describe('getSiblingRight()', () => {
    it('should get right sibling of center cell', (done) => {
      expect(Helpers.getSiblingRight(0, 0)).to.equal(2);
      done();
    });

    it('should get right sibling cell', (done) => {
      expect(Helpers.getSiblingRight(0, 1)).to.equal(1);
      expect(Helpers.getSiblingRight(1, 1)).to.equal(2);
      expect(Helpers.getSiblingRight(2, 1)).to.equal(3);
      expect(Helpers.getSiblingRight(3, 1)).to.equal(4);
      expect(Helpers.getSiblingRight(4, 1)).to.equal(5);
      expect(Helpers.getSiblingRight(5, 1)).to.equal(0);
      expect(Helpers.getSiblingRight(0, 2)).to.equal(1);
      expect(Helpers.getSiblingRight(1, 2)).to.equal(2);
      expect(Helpers.getSiblingRight(2, 2)).to.equal(3);
      expect(Helpers.getSiblingRight(3, 2)).to.equal(4);
      expect(Helpers.getSiblingRight(5, 2)).to.equal(6);
      expect(Helpers.getSiblingRight(11, 2)).to.equal(0);
      expect(Helpers.getSiblingRight(0, 3)).to.equal(1);
      expect(Helpers.getSiblingRight(9, 2)).to.equal(10);
      expect(Helpers.getSiblingRight(17, 2)).to.equal(0);
      done();
    });
  });

  describe('getBottomLeft()', () => {
    it('should get bottom left cell', (done) => {
      expect(Helpers.getBottomLeft(1, 2)).to.equal(0);
      expect(Helpers.getBottomLeft(3, 2)).to.equal(1);
      expect(Helpers.getBottomLeft(5, 2)).to.equal(2);
      expect(Helpers.getBottomLeft(7, 2)).to.equal(3);
      expect(Helpers.getBottomLeft(9, 2)).to.equal(4);
      expect(Helpers.getBottomLeft(11, 2)).to.equal(5);

      expect(Helpers.getBottomLeft(1, 3)).to.equal(0);
      expect(Helpers.getBottomLeft(2, 3)).to.equal(1);
      expect(Helpers.getBottomLeft(4, 3)).to.equal(2);
      expect(Helpers.getBottomLeft(5, 3)).to.equal(3);
      expect(Helpers.getBottomLeft(16, 3)).to.equal(10);
      expect(Helpers.getBottomLeft(17, 3)).to.equal(11);
      done();
    });
  });

  describe('getBottomRight()', () => {
    it('should get bottom right cell', (done) => {
      expect(Helpers.getBottomRight(1, 2)).to.equal(1);
      expect(Helpers.getBottomRight(3, 2)).to.equal(2);
      expect(Helpers.getBottomRight(5, 2)).to.equal(3);
      expect(Helpers.getBottomRight(7, 2)).to.equal(4);
      expect(Helpers.getBottomRight(9, 2)).to.equal(5);
      expect(Helpers.getBottomRight(11, 2)).to.equal(0);

      expect(Helpers.getBottomRight(1, 3)).to.equal(1);
      expect(Helpers.getBottomRight(2, 3)).to.equal(2);
      expect(Helpers.getBottomRight(4, 3)).to.equal(3);
      expect(Helpers.getBottomRight(5, 3)).to.equal(4);
      expect(Helpers.getBottomRight(16, 3)).to.equal(11);
      expect(Helpers.getBottomRight(17, 3)).to.equal(0);
      done();
    });
  });

  describe('getBottom()', () => {
    it('should get bottom cell of center cell', (done) => {
      expect(Helpers.getBottom(0, 0)).to.equal(3);
      done();
    });

    it('should get bottom cell', (done) => {
      expect(Helpers.getBottom(0, 1)).to.equal(0);
      expect(Helpers.getBottom(1, 1)).to.equal(0);
      expect(Helpers.getBottom(2, 1)).to.equal(0);
      expect(Helpers.getBottom(3, 1)).to.equal(0);
      expect(Helpers.getBottom(4, 1)).to.equal(0);
      expect(Helpers.getBottom(5, 1)).to.equal(0);

      expect(Helpers.getBottom(0, 2)).to.equal(0);
      expect(Helpers.getBottom(2, 2)).to.equal(1);
      expect(Helpers.getBottom(4, 2)).to.equal(2);
      expect(Helpers.getBottom(6, 2)).to.equal(3);
      expect(Helpers.getBottom(8, 2)).to.equal(4);
      expect(Helpers.getBottom(10, 2)).to.equal(5);

      expect(Helpers.getBottom(0, 3)).to.equal(0);
      expect(Helpers.getBottom(9, 3)).to.equal(6);

      done();
    });
  });

  describe('getLevelLength()', () => {
    it('should get length of the level', (done) => {
      expect(Helpers.getLevelLength(0)).to.equal(1);
      expect(Helpers.getLevelLength(1)).to.equal(6);
      expect(Helpers.getLevelLength(2)).to.equal(12);
      expect(Helpers.getLevelLength(3)).to.equal(18);
      done();
    });
  });
});
