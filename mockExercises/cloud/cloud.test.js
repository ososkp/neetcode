const CloudStorage = require('./cloud');

describe("CloudStorage System", () => {
    let cloud;

    beforeEach(() => {
        cloud = new CloudStorage();
    });

    describe("Level 1: Basic Storage", () => {
        test("should add files and return correct boolean flags", () => {
            expect(cloud.addFile("file1.txt", 100)).toBe(true);
            expect(cloud.addFile("file2.txt", 200)).toBe(true);
            expect(cloud.addFile("file1.txt", 50)).toBe(false); // Duplicate
        });

        test("should get correct file sizes", () => {
            cloud.addFile("document.pdf", 1024);
            expect(cloud.getFileSize("document.pdf")).toBe(1024);
            expect(cloud.getFileSize("missing.doc")).toBeNull();
        });

        test("should delete files correctly", () => {
            cloud.addFile("temp.log", 50);
            expect(cloud.deleteFile("temp.log")).toBe(true);
            expect(cloud.getFileSize("temp.log")).toBeNull();
            expect(cloud.deleteFile("temp.log")).toBe(false); // Already deleted
        });
    });

    describe("Level 2: Copy and Search", () => {
        beforeEach(() => {
            cloud.addFile("photo.png", 500);
            cloud.addFile("notes.txt", 100);
        });

        test("should copy files successfully", () => {
            expect(cloud.copyFile("photo.png", "photo_backup.png")).toBe(true);
            expect(cloud.getFileSize("photo_backup.png")).toBe(500);
        });

        test("should fail copy if source missing or target exists", () => {
            expect(cloud.copyFile("ghost.png", "new.png")).toBe(false);
            expect(cloud.copyFile("photo.png", "notes.txt")).toBe(false);
        });

        test("should find files by prefix and sort lexicographically", () => {
            cloud.addFile("app_config.json", 10);
            cloud.addFile("app_data.csv", 20);
            cloud.addFile("apple.jpg", 30);
            cloud.addFile("banana.txt", 40);

            const results = cloud.findFilesByPrefix("app");
            expect(results).toEqual(["app_config.json", "app_data.csv", "apple.jpg"]);

            const noResults = cloud.findFilesByPrefix("zebra");
            expect(noResults).toEqual([]);
        });
    });

    describe("Level 3: User Quotas", () => {
        test("should create users and return capacities", () => {
            expect(cloud.addUser("userA", 1000)).toBe(true);
            expect(cloud.addUser("userA", 500)).toBe(false); // Duplicate
            expect(cloud.getRemainingCapacity("userA")).toBe(1000);
            expect(cloud.getRemainingCapacity("ghostUser")).toBeNull();
        });

        test("should add files by user and track capacity", () => {
            cloud.addUser("userA", 100);

            expect(cloud.addFileByUser("userA", "file1.txt", 40)).toBe(60);
            expect(cloud.addFileByUser("userA", "file2.txt", 50)).toBe(10);
            expect(cloud.getFileSize("file1.txt")).toBe(40);
        });

        test("should prevent upload if capacity exceeded", () => {
            cloud.addUser("userA", 100);
            expect(cloud.addFileByUser("userA", "huge.vid", 150)).toBeNull();
            expect(cloud.getRemainingCapacity("userA")).toBe(100); // Capacity unchanged
        });

        test("should restore capacity when a user's file is deleted", () => {
            cloud.addUser("userA", 100);
            expect(cloud.getRemainingCapacity("userA")).toBe(100);

            cloud.addFileByUser("userA", "file1.txt", 40);
            expect(cloud.getRemainingCapacity("userA")).toBe(60);

            expect(cloud.deleteFile("file1.txt")).toBe(true);
            expect(cloud.getRemainingCapacity("userA")).toBe(100);
        });
    });

    describe("Level 4: Compression", () => {
        beforeEach(() => {
            cloud.addUser("userA", 100);
            cloud.addFileByUser("userA", "big.dat", 60); // 40 remaining
        });

        test("should compress file and restore user capacity", () => {
            expect(cloud.compressFile("big.dat")).toBe(true);

            // 60 / 2 = 30. File is now 30. Remaining capacity should jump from 40 to 70.
            expect(cloud.getFileSize("big.dat")).toBe(30);
            expect(cloud.getRemainingCapacity("userA")).toBe(70);

            // Should not compress twice
            expect(cloud.compressFile("big.dat")).toBe(false);
        });

        test("should decompress file and reduce user capacity", () => {
            cloud.compressFile("big.dat"); // Size goes to 30, remaining to 70

            expect(cloud.decompressFile("big.dat")).toBe(true);
            expect(cloud.getFileSize("big.dat")).toBe(60);
            expect(cloud.getRemainingCapacity("userA")).toBe(40); // Back to original
        });

        test("should fail decompression if it exceeds capacity", () => {
            cloud.compressFile("big.dat"); // Size goes to 30, remaining to 70

            // User uploads another file eating up the freed space
            cloud.addFileByUser("userA", "sneaky.dat", 60); // 10 remaining

            // Now trying to decompress big.dat requires 30 more space, but only 10 is left
            expect(cloud.decompressFile("big.dat")).toBe(false);

            // State should remain unchanged
            expect(cloud.getFileSize("big.dat")).toBe(30);
            expect(cloud.getRemainingCapacity("userA")).toBe(10);
        });
    });
});