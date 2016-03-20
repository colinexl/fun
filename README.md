# How to Run

#### Install dependencies
```sh
npm install
```

#### Start the main program
```sh
npm start
```

#### Run the tests
```sh
npm test
```

#### Other possible solutions
Build a undirected graph, then use BFS to search for each valid word starting at a valid starting vertex.

Building the graph O(N) where N is the total number of letters in the input since we have to go through each letter at least once. Search using BFS should only be O(L), where L is the length of the word since we essentially have a reachability graph that can easily tell us how to get to the next letter.

The data structure should be some sort of adjacency list where each vertex has a list of all possible letter and their [layer, index] that it can reach.

```javascript
graph = {
    'A': {
        'B': [[1,0]],
        'C': [[1,1]],
        'D': [[1,2]],
        'E': [[1,3]],
        'F': [[1,4]],
        'G': [[1,5]],
    },
    'B': {
        'U': [[2,0]],
        'A': [[2,1]],
        'C': [[1,1]],
        'A': [[0,0]],
        'G': [[1,5]],
        'Q': [[2,11]],
    },
    'C': {
        'A': [[2,1], [0,0]],
        'N': [[2,2]],
        'T': [[2,3]],
        'D': [[1,2]],
        'B': [[1,0]],
    },
    ...
}
```

Then searching for a word will simply be:
* Find a starting point
* Is there more letters to look for?
* If No, return true
* If Yes, can we reach next letter in the list?
* If Yes, go there and repeat
* If No, then return false

