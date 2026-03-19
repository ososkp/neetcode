class CloudStorage {
    constructor() {
        this.files = {};
        this.users = {};
    }

    // --- Level 1 ---
    addFile(name, size, userId) {
        if (this.files[name] || size <= 0) return false;
        this.files[name] = {
            name,
            size,
            originalSize: size,
            isCompressed: false
        }

        if (userId) this.files[name].userId = userId;
        return true;
    }

    getFileSize(name) {
        if (!this.files[name]) return null;
        return this.files[name].size;
    }

    deleteFile(name) {
        if (!this.files[name]) return false;
        const user = this.files[name].userId ?? null;

        if (user !== null) {
            this.users[user].remainingCapacity += this.files[name].size;
        }

        delete this.files[name];
        return true;
    }

    // --- Level 2 ---
    copyFile(nameFrom, nameTo) {
        if (!this.files[nameFrom] || this.files[nameTo]) return false;

        const userTo = this.files[nameFrom].userId ?? null;

        // Check capacity
        if (this.users[userTo]
            && this.users[userTo].remainingCapacity < this.files[nameFrom].size) {
            return false;
        }

        this.files[nameTo] = {
            ...this.files[nameFrom],
            name: nameTo
        };

        // Update capacity
        if (this.users[userTo]) {
            this.users[userTo].remainingCapacity -= this.files[nameFrom].size
        }

        return true;
    }

    findFilesByPrefix(prefix) {
        const fileNames = Object.keys(this.files);

        return fileNames.filter(fileName => fileName.startsWith(prefix))
            .sort((a, b) => a.localeCompare(b));
    }

    // --- Level 3 ---
    addUser(userId, capacity) {
        if (this.users[userId]) return false;
        this.users[userId] = {
            id: userId,
            totalCapacity: capacity,
            remainingCapacity: capacity
        }
        return true;
    }

    addFileByUser(userId, name, size) {
        if (!this.users[userId]
            || this.files[name]
            || this.users[userId].remainingCapacity < size) {
            return null;
        }

        if (!this.addFile(name, size, userId)) return null;

        this.users[userId].remainingCapacity -= size;

        return this.users[userId].remainingCapacity;
    }

    getRemainingCapacity(userId) {
        if (!this.users[userId]) return null
        return this.users[userId].remainingCapacity;
    }

    // --- Level 4 ---
    compressFile(name) {
        if (!this.files[name]) return false;

        // Already compressed
        if (this.files[name].isCompressed) return false;

        const uncompressedSize = this.files[name].size
        this.files[name].size = Math.floor(this.files[name].size / 2);
        this.files[name].isCompressed = true;

        const user = this.files[name].userId ?? null;

        if (user !== null) {
            const amountSaved = uncompressedSize - this.files[name].size;
            this.users[this.files[name].userId].remainingCapacity += amountSaved;
        }

        return true;
    }

    decompressFile(name) {
        if (!this.files[name] || !this.files[name].isCompressed) {
            return false;
        }

        const file = this.files[name];
        const userId = this.files[name].userId ?? null;

        if (userId) {
            if (!this.users[userId]) return false;

            const user = this.users[userId];
            const compressionAmount = file.originalSize - file.size;

            if (user.remainingCapacity < compressionAmount) return false;
            user.remainingCapacity -= compressionAmount;
        }

        file.size = file.originalSize;
        file.isCompressed = false;

        return true;
    }
}

module.exports = CloudStorage;