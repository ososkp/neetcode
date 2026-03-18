class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function bfsOld(root, target) {
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

function dfsRecursive(root, targetId) {
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

function dfsRec(root, target) {

    const result = search(root, 0);

    function search(root, level) {
        if (root === null) return null;
        if (root.value === target) return { value: root.value, level: level };

        const left = search(root.left, level + 1);
        if (left !== null) return left;

        const right = search(root.right, level + 1);
        if (right !== null) return right;

        return null;
    }

    return result;
}

function bfs(root, target) {
    const queue = [root];
    let head = 0;
    let depth = 0;

    while (head < queue.length) {
        const length = queue.length;

        while (head < length) {
            const current = queue[head];

            if (current.value === target) return [current.value, depth];

            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);

            head++;
        }
        depth++;
    }

    return -1;
}

function bfsOn(root, target) {
    const queue = [root];

    while (queue.length > 0) {
        print(queue);
        const current = queue.shift() // O(n)

        if (current.value === target) return current.value;

        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
    }

    return -1;
}

function dfs(root, target) {
    const stack = [root];

    while (stack.length > 0) {
        print(stack);
        const current = stack.pop();

        if (current.value === target) {
            return current.value;
        }

        if (current.right !== null) stack.push(current.right);
        if (current.left !== null) stack.push(current.left);
    }

    return -1;
}

// Constructing a sample binary tree:
//           1
//         /   \
//        2     3
//       / \     \
//      4   3     6
//     /     \   / \
//    7       4 9   8

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(3);
root.right.right = new TreeNode(6);
root.left.left.left = new TreeNode(7);
root.left.right.right = new TreeNode(4);
root.right.right.left = new TreeNode(9)
root.right.right.right = new TreeNode(8)

console.log(dfsRec(root, 8));


function print(arr) {
    let str = '';
    for (const node of arr) {
        str += node.value;
        str += ' ';
    }
    console.log(str);
}

