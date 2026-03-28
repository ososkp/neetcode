const findOrder = function (numCourses, prerequisites) {
    const inDegree = new Array(numCourses).fill(0)
    const adjList = new Map()
    for (let i = 0; i < numCourses; i++) adjList.set(i, []);

    for (const [course, prereq] of prerequisites) {
        adjList.get(prereq).push(course);
        inDegree[course]++;
    }

    const queue = [];

    for (let course = 0; course < inDegree.length; course++) {
        if (inDegree[course] === 0) queue.push(course);
    }

    const results = [];
    while (queue.length > 0) {
        const nextCourseTaken = queue.shift();
        results.push(nextCourseTaken);
        const thisIsAPrereqFor = adjList.get(nextCourseTaken);
        for (const reliantCourse of thisIsAPrereqFor) {
            inDegree[reliantCourse]--;
            if (inDegree[reliantCourse] === 0) queue.push(reliantCourse);
        }
    }

    if (results.length === numCourses) {
        return results;
    } else {
        return [];
    }
};



const numCourses1 = 2, prerequisites1 = [[1, 0]]
// [0 1 2]


const numCourses2 = 4, prerequisites2 = [[1, 0], [2, 0], [3, 1], [3, 2]]
// Output: [0, 2, 1, 3]

console.log(findOrder(numCourses1, prerequisites1));
console.log(findOrder(numCourses2, prerequisites2));