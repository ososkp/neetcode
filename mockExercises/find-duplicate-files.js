class FileSystem {
    // --- Mock OS Functions (Do not modify) ---
    isDirectory = (path) => !path.includes(".");
    getDirectoryContents = (path) => {
        const fileSystem = {
            "/root": ["a", "c", "4.txt"],
            "/root/a": ["1.txt", "2.txt"],
            "/root/c": ["3.txt", "d"],
            "/root/c/d": ["4.txt"]
        };
        return fileSystem[path] || [];
    };
    getFileHash = (path) => {
        const hashes = {
            "/root/a/1.txt": "hash_abcd",
            "/root/a/2.txt": "hash_efgh",
            "/root/c/3.txt": "hash_abcd",
            "/root/c/d/4.txt": "hash_efgh",
            "/root/4.txt": "hash_efgh"
        };
        return hashes[path] || "unknown_hash";
    };
    // -----------------------------------------

    findDuplicates(rootPath) {
        const contentMap = {};
        const stack = [rootPath]; // push and pop

        while (stack.length > 0) {
            const currentPath = stack.pop();

            if (this.isDirectory(currentPath)) {
                // TODO: 1. Get the directory contents
                const contents = this.getDirectoryContents(currentPath);

                // TODO: 2. Construct the full paths (currentPath + "/" + item)
                const paths = contents.map(folder => currentPath + '/' + folder);

                // TODO: 3. Push the new paths onto the stack
                stack.push(...paths);

            } else {
                // TODO: 4. Get the file hash
                const fileHash = this.getFileHash(currentPath);
                // TODO: 5. Add the full path to the contentMap using the hash as the key
                (contentMap[fileHash] ??= []).push(currentPath);
            }
        }

        return Object.values(contentMap).filter(arr => arr.length > 1);
    }

    searchFiles(fileArray) {
        const fileMap = {};

        for (const directoryString of fileArray) {
            const split = directoryString.split(' ');
            const directoryPath = split[0];

            const files = split.slice(1);

            for (const fileString of files) {
                const innerSplit = fileString.split('(');
                const fileName = innerSplit[0];
                const fileContents = innerSplit[1].slice(0, -1);

                const fullFilePath = directoryPath + '/' + fileName;

                (fileMap[fileContents] ??= []).push(fullFilePath)
            }
        }

        return Object.values(fileMap).filter((value) => value.length > 1);
    }
}

const fs = new FileSystem();
console.log(fs.findDuplicates("/root"));

const input1 = [
    "root/a 1.txt(abcd) 2.txt(efgh)",
    "root/c 3.txt(abcd)",
    "root/c/d 4.txt(efgh)",
    "root 4.txt(efgh)"
];

// console.log(fs.searchFiles(input1));