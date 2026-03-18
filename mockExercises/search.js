class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function bfs(root, target) {
    if (root === null) return -1;

    const queue = [root];
    let depth = 0;
    let head = 0; // Since .shift() is O(n)
    while (head < queue.length) {
        let numInThisLevel = queue.length - head;
        for (let i = 0; i < numInThisLevel; i++) {
            const current = queue[head];
            if (current.value === target) {
                return depth;
            }

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);

            head++;
        }
        depth++;
    }

    return -1;
}

function dfs(root, targetId) {
    const result = search(root, 0);
    return [result.node.value, result.depth];

    function search(node, level) {
        if (node === null) return null;
        if (node.value === targetId) return { node: node, depth: level };

        level++;

        const left = search(node.left, level);
        if (left !== null) return left; // Either returns null or target

        const right = search(node.right, level);
        if (right !== null) return right;

        return null;
    }
}

// Constructing a sample binary tree:
//           1
//         /   \
//        2     3
//       / \     \
//      4   3     6
//     /     \   / \
//    7       4 9   2

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(3);
root.right.right = new TreeNode(6);
root.left.left.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);
root.right.right.left = new TreeNode(9)
root.right.right.right = new TreeNode(2)

console.log(dfs(root, 7));


function print(arr) {
    let str = '';
    for (const node of arr) {
        str += node.value;
        str += ' ';
    }
    console.log(str);
}

