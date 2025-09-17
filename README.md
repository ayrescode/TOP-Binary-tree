# JavaScript Binary Search Tree 🌳

An implementation of a balanced Binary Search Tree (BST) data structure in JavaScript, created as part of The Odin Project's curriculum. This project demonstrates the fundamental concepts of BSTs, including node creation, insertion, deletion, traversal, and balancing.

---
## Features

A `BinaryTree` class that supports the following methods:

-   **`buildTree(array)`**: Builds a balanced BST from a sorted array of unique values.
-   **`insert(value)`**: Inserts a new node with the given `value`.
-   **`delNode(value)`**: Deletes the node with the given `value`.
-   **`find(value)`**: Returns the node containing the given `value`.
-   **Traversal Methods**:
    -   `levelOrderForEach(callback)`: Traverses the tree in breadth-first level order.
    -   `inOrderForEach(callback)`: Traverses the tree in-order (Left, Root, Right).
    -   `preOrderForEach(callback)`: Traverses the tree in pre-order (Root, Left, Right).
    -   `postOrderForEach(callback)`: Traverses the tree in post-order (Left, Right, Root).
-   **Tree Analysis**:
    -   `height(value)`: Returns the height of the node with the given `value`.
    -   `depth(value)`: Returns the depth of the node with the given `value`.
    -   `isBalanced()`: Checks if the tree is balanced.
-   **Balancing**:
    -   `rebalance()`: Rebalances an unbalanced tree.
-   **Visualization**:
    -   `prettyPrint()`: Visually prints the tree structure to the console.

---
## Usage Example

The following script demonstrates the core functionality of the `BinaryTree` class, including creating a tree, checking its balance, unbalancing it by adding new nodes, and then rebalancing it.

```javascript
// Helper function to generate a random array
const generateRandomArray = (size, max) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max));
};

// 1. Create a binary search tree from a random array of numbers
const randomArr = generateRandomArray(15, 100);
const tree = new BinaryTree(randomArr);
tree.buildTree();

// 2. Confirm that the tree is balanced
console.log('Is the initial tree balanced?', tree.isBalanced()); // Should be true
console.log('Initial Tree:');
tree.prettyPrint();

// 3. Print out all elements in level, pre, post, and in order
console.log('Level Order:', tree.levelOrderForEach(node => console.log(node.data)));
console.log('Pre Order:', tree.preOrderForEach(node => console.log(node.data)));
console.log('Post Order:', tree.postOrderForEach(node => console.log(node.data)));
console.log('In Order:', tree.inOrderForEach(node => console.log(node.data)));

// 4. Unbalance the tree by adding several numbers > 100
tree.insert(101);
tree.insert(150);
tree.insert(200);
tree.insert(300);

// 5. Confirm that the tree is unbalanced
console.log('Is the tree balanced after adding numbers?', tree.isBalanced()); // Should be false
console.log('
