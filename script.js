// Defines the blueprint for a single node in the binary tree.
class Node {
  constructor(data) {
    // 'data' holds the value for this node.
    this.data = data;
    // 'left' is a pointer to the left child node.
    this.left = null;
    // 'right' is a pointer to the right child node.
    this.right = null;
  }
}

// Defines the binary search tree itself.
class BinaryTree {
  constructor(arr) {
    // Stores the initial array after sorting and removing duplicates.
    this.array = this.sortedArray(arr);
    // 'root' is a pointer to the top node of the tree.
    this.root;
  }

  // Visually prints the tree structure to the console.
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  // A helper function to log the internal array and the root of the tree.
  logArray() {
    console.log(this.array);
    console.log(this.root);
  }

  // Takes an array, sorts it numerically, and removes any duplicate values.
  sortedArray(array) {
    return [...new Set(array.sort((a, b) => a - b))];
  }

  // Recursively builds a balanced binary search tree from a sorted array.
  buildTree(arr = this.array, start = 0, end = this.array.length - 1) {
    // Base case: If the start index is greater than the end index, we're done.
    if (start > end) {
      return null;
    }
    // Find the middle of the array to be the new root.
    let mid = start + Math.floor((end - start) / 2);
    let newRoot = new Node(arr[mid]);

    // If this is the first node being created, set it as the tree's main root.
    if (this.root === undefined) {
      this.root = newRoot;
    }

    // Recursively build the left and right subtrees.
    newRoot.left = this.buildTree(arr, start, mid - 1);
    newRoot.right = this.buildTree(arr, mid + 1, end);

    return newRoot;
  }

  // Recursively inserts a new value into the tree.
  insert(value, current = this.root) {
    // Base cases: If we find an empty spot, insert the new node.
    if (value > current.data && current.right == null) {
      return (current.right = new Node(value));
    } else if (value <= current.data && current.left == null) {
      return (current.left = new Node(value));
    }

    // Recursive steps: Traverse to the right or left subtree.
    if (value > current.data) {
      current = current.right;
      this.insert(value, current);
    } else if (value <= current.data) {
      current = current.left;
      this.insert(value, current);
    }
  }

  // Finds the in-order successor (the smallest value in the right subtree).
  getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  // Deletes a node with the given value 'x' from the tree.
  delNode(x, root = this.root) {
    // Base case: If the tree is empty.
    if (root === null) {
      return root;
    }
    // Traverse the tree to find the node to delete.
    if (root.data > x) {
      root.left = this.delNode(x, root.left);
    } else if (root.data < x) {
      root.right = this.delNode(x, root.right);
    } else {
      // Case 1 & 2: Node with only one child or no child.
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;

      // Case 3: Node with two children.
      // Get the in-order successor.
      let succ = this.getSuccessor(root);
      // Copy the successor's data to this node.
      root.data = succ.data;
      // Delete the in-order successor from the right subtree.
      root.right = this.delNode(succ.data, root.right);
    }
    return root;
  }

  // Recursively finds and returns the node with a given value.
  find(value, current = this.root) {
    // Base case: If the value is found.
    if (value == current.data) {
      console.log(current);
      return current;
    }
    // Recursive steps: Traverse left or right.
    if (value > current.data) {
      current = current.right;
      return this.find(value, current);
    } else if (value < current.data) {
      current = current.left;
      return this.find(value, current);
    }
  }

  // Traverses the tree level by level (breadth-first) and applies a callback to each node.
  levelOrderForEach(callback, currentNode = this.root, queue = [this.root]) {
    if (typeof callback != 'function') {
      console.log('you have to initialize a callback value');
      return;
    }
    if (queue.length == 0) {
      return;
    } else {
      // Add children of the current node to the end of the queue.
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    // Process the current node.
    callback(currentNode);
    // Remove the processed node from the front of the queue.
    queue.shift();
    // Move to the next node in the queue and continue traversal.
    currentNode = queue[0];
    this.levelOrderForEach(callback, currentNode, queue);
  }

  // Traverses the tree in pre-order (Root, Left, Right) and applies a callback.
  preOrderForEach(callback, currentNode = this.root) {
    callback(currentNode);
    if (currentNode.left != null) {
      this.preOrderForEach(callback, currentNode.left);
    }
    if (currentNode.right != null) {
      this.preOrderForEach(callback, currentNode.right);
    }
  }

  // Traverses the tree in-order (Left, Root, Right) and applies a callback.
  inOrderForEach(callback, currentNode = this.root) {
    if (currentNode.left != null) {
      this.inOrderForEach(callback, currentNode.left);
    }
    callback(currentNode);
    if (currentNode.right != null) {
      this.inOrderForEach(callback, currentNode.right);
    }
  }

  // Traverses the tree in post-order (Left, Right, Root) and applies a callback.
  postOrderForEach(callback, currentNode = this.root) {
    if (currentNode.left != null) {
      this.postOrderForEach(callback, currentNode.left); // Note: Original code had a typo here.
    }
    if (currentNode.right != null) {
      this.postOrderForEach(callback, currentNode.right); // Note: Original code had a typo here.
    }
    callback(currentNode);
  }

  // Helper function to calculate height from a given node.
  _calculateHeight(node) {
    // Base case: The height of a null node is -1 (since height is number of edges).
    if (node === null) {
      return -1;
    }
    const leftHeight = this._calculateHeight(node.left);
    const rightHeight = this._calculateHeight(node.right);
    // Height is 1 + the height of the taller subtree.
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Returns the height of the node with the given value.
  height(value) {
    // First, find the node.
    const node = this.find(value);
    if (node === null) {
      return null; // Value not found
    }
    // Then, calculate its height.
    return this._calculateHeight(node);
  }

  // Returns the depth of the node with the given value.
  depth(value) {
    let current = this.root;
    let depth = 0;
    // Traverse from the root, counting edges.
    while (current !== null) {
      if (current.data === value) {
        return depth;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      depth++;
    }
    return null; // Value not found
  }

  // Helper function to check if the tree is balanced from a given node.
  _checkBalance(node) {
    if (node === null) {
      return 0; // Height of an empty tree is 0.
    }
    const leftHeight = this._checkBalance(node.left);
    // If the left subtree is unbalanced, propagate the error signal (-1) up.
    if (leftHeight === -1) return -1;

    const rightHeight = this._checkBalance(node.right);
    // If the right subtree is unbalanced, propagate the error signal up.
    if (rightHeight === -1) return -1;

    // If the height difference at this node is > 1, it's unbalanced.
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }
    // Otherwise, return the actual height of this node.
    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Checks if the entire tree is balanced.
  isBalanced() {
    // If the helper function returns -1, the tree is unbalanced.
    return this._checkBalance(this.root) !== -1;
  }

  // Rebalances an unbalanced tree.
  rebalance() {
    if (this.root === null) return;

    // 1. Get a sorted array of all node data using an in-order traversal.
    const sortedNodes = [];
    this.inOrderForEach((node) => sortedNodes.push(node.data));

    // 2. Build a new, balanced tree from the sorted array.
    this.root = this.buildTree(sortedNodes, 0, sortedNodes.length - 1);
  }
}

// An example array to build the tree from.
const arr = [1, 7, 4, 23, 0.5, 8, 9, 4, 3, 20, 25, 2, 5, 7, 9, 67, 6345, 324];
// Creates a new instance of the BinaryTree.
const tree = new BinaryTree(arr);
tree.buildTree();
tree.insert(10);
// tree.logArray();
// tree.delNode(25);
// tree.find(3);

tree.prettyPrint();
// tree.levelOrderForEach((node) => console.log(node.data));
// tree.inOrderForEach((node) => console.log(node.data));
tree.preOrderForEach((node) => console.log(node.data));
