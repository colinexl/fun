import * as Helpers from './helpers';

/*
Backtracking search algorithm
The basic gist of this algorithm is to first determine all the ways we can
traverse the cells, and then use backtracking algorithm to search through
the possible cells starting at the level and index of the first letter found.

Traditionally, backtracking algorithms have O(N!) time complexities. However,
we have a few optimizations that reduces the overall running time.

First, we do not brute-force all the cells. We will find a starting cell that
matches the starting letter in the word we're trying to search for.
This is a small optimization on the brute-force solution in that we do not have
to look through cells that we know cannot be valid.
Currently, searching for the starting point is a linear search using indexOf().
If there are large number of layers with long lists, we can optimize the
search even further by using a binary search instead. So it'll take O(N) to
look for the starting index, where N is the total length of all the layers.

Second, once we find the word, we return the result immediately. The worst-case
is if we have word with length L, for each letter, we have to search 6 adjacent
cells before either not finding the next letter or finding one. Assume that we
always find the next letter on the last recurse, then for each letter we have
6 recursions giving us O(6L) for each word. Let's say we have W words to look
for, this will give us O(W * 6L). Getting rid of constants, we have O(W * L)
where W is the total number of words in the valid list and L is the longest
word in the valid list.

So the total running time is time it takes to find the starting point added to
the search: O(N) + O(W * L)

Every cell has the following properties:
- has sibling cells to left and right
- may have cells below, meaning previous layer
- may have cell above, if there is an additional layer
- cell on level 0 is a special case, which doesn't have siblings but only a layer above

Some cells are at the corner of the honeycomb shape and some are in between
two corner cells.

Non-corner cells can be determined by the formula (index % level !== 0)
The non-corner cells have the following properties:
- have two cells above,
- two cells below
- and two siblings
knowing these properties will help us determine how to search

To find the index of the two corresponding cells in the level above, use:
top-left: index + Math.floor(index / level)
top-right: index + Math.floor(index / level) + 1

To find the two sibling cells, one on each side, we have to be careful to
handle the case of overflow or underflow. For example, if the cell is at index
0, then its left sibling is not -1, but rather the last index in its current
level. Otherwise, it's pretty straightforward

To find the index of the two corresponding cells in the level below, we also
have to be careful of overflow situations. Rather than writing more logic to
handle that, we can use getSiblingRight function in combination with
getBottomLeft to find the bottom-right:
bottom-left: index - (Math.floor(index / level)) - 1;
bottom-right: getSiblingRight(getBottomLeft(index, level), level - 1);
please see tests

Corner cells can be determined by the formula (index % level === 0)
The corner cells have different set of properties:
- have three cells above,
- one cells below
- and two siblings
Again, knowing these properties will help us determine how to traverse the
cells.
Please see tests to learn how it's done
*/
export function searchRecursive(input, currentLevel, currentIndex, currentWord, visited) {
  // check to see if we've already visited this cell using an Object hash
  if (visited[''+currentLevel+','+currentIndex]) {
    return false;
  } else {
    visited[''+currentLevel+','+currentIndex] = true;
  }

  // there are no more letters to match, which means we've matched all letters
  // in currentWord and found a match!
  if (currentWord === '') {
    return true;
  }

  // this can probably be passed in or made as a global
  let totalLevels = input.length - 1;
  let nextWord;

  // if the letter we're searching for matches first letter in the currentWord,
  // then we keep searching...
  if (currentWord[0] === input[currentLevel][currentIndex]) {
    // the next word we are looking for is the remaining set of letters without
    // the first letter
    nextWord = currentWord.substr(1);
    // we have to handle corner and non-corner cells differently
    if (!Helpers.isCorner(currentIndex, currentLevel)) {
      // cell is not a corner, so 2 above, 2 siblings, and 2 below
      // start searching the level above, if there is one...
      if (currentLevel < totalLevels) {
        // search top-left
        if (searchRecursive(input, currentLevel + 1, Helpers.getTopLeft(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search top-right,
        if (searchRecursive(input, currentLevel + 1, Helpers.getTopRight(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
      }
      // search left-sibling
      if (searchRecursive(input, currentLevel, Helpers.getSiblingLeft(currentIndex, currentLevel), nextWord, visited)) {
        return true;
      }
      // search right-sibling
      if (searchRecursive(input, currentLevel, Helpers.getSiblingRight(currentIndex, currentLevel), nextWord, visited)) {
        return true;
      }
      // search bottom-left
      if (searchRecursive(input, currentLevel - 1, Helpers.getBottomLeft(currentIndex, currentLevel), nextWord, visited)) {
        return true;
      }
      // search bottom-right
      if (searchRecursive(input, currentLevel - 1, Helpers.getBottomRight(currentIndex, currentLevel), nextWord, visited)) {
        return true;
      }
    } else {
      // cell is a corner, so 3 above, 2 siblings, and 1 below
      // start searching the level above, if there is one...
      if (currentLevel < totalLevels) {
        // search top-left
        if (searchRecursive(input, currentLevel + 1, Helpers.getTopLeft(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search top
        if (searchRecursive(input, currentLevel + 1, Helpers.getTop(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search top-right
        if (searchRecursive(input, currentLevel + 1, Helpers.getTopRight(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
      }
      if (Helpers.isCenterCell(currentIndex, currentLevel)) {
        // search left-sibling
        if (searchRecursive(input, currentLevel + 1, Helpers.getSiblingLeft(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search right-sibling
        if (searchRecursive(input, currentLevel + 1, Helpers.getSiblingRight(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search bottom
        if (searchRecursive(input, currentLevel + 1, Helpers.getBottom(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
      } else {
        // search left-sibling
        if (searchRecursive(input, currentLevel, Helpers.getSiblingLeft(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search right-sibling
        if (searchRecursive(input, currentLevel, Helpers.getSiblingRight(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
        // search bottom
        if (searchRecursive(input, currentLevel - 1, Helpers.getBottom(currentIndex, currentLevel), nextWord, visited)) {
          return true;
        }
      }
    }
  }

  // if we're here, then we never found a match :(
  // we need to delete the cell from visited so it can be visited again by
  // the backtracking algorithm later
  visited[''+currentLevel+','+currentIndex] = false;
  return false;
};

/*
Using a basic backtracking algorithm to search the adjacent honeycomb cells
top, top-right, bottom-right, bottom, bottom-left, top-left
with the exception of layer 0, which is a special case where it only has
adjacent cells and no sibling cells. Every other layer has sibling cells.

               U
            Q     A
         W     B     N
            G     C
         S     A     T
            F     D
         Y     E     C
            T     A
               S
*/
export function search(input, validWords, shouldSort) {
  let index = 0;
  let foundWords = [];

  // for each valid words, find the starting point, then recursively start looking
  // from there
  validWords.forEach((currentWord) => {
    let visited = {};
    for (var level = 0; (level < input.length); ++level) {
      index = input[level].indexOf(currentWord[0]);
      if (index !== -1) {
        // we found a starting point
        if (searchRecursive(input, level, index, currentWord, visited)) {
          // if we found a match, add it to the found words list
          foundWords.push(currentWord);
        }
      }
    }
  });

  return shouldSort ? foundWords.sort() : foundWords;
}
