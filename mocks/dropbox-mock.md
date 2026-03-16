# Dropbox Software Engineering Interview Guide

Dropbox is known for a "practical" interview style. Unlike FAANG companies that often rely on abstract LeetCode puzzles, Dropbox leans toward **implementation-heavy** questions (concurrency, file systems, and real-world simulations).

---

## 1. The Take-Home / Online Assessment (OA)

Dropbox has transitioned many roles to a **CodeSignal "Project-Style" Assessment**.

- **Format:** Typically 4 levels of a single evolving problem.
- **Key Concept:** Instead of 4 separate questions, you build a system. Level 1 might be a basic data structure, and Level 4 might require advanced refactoring or handling complex state.
- **Common Topics:** \* **Text Editor Simulation:** Implementing `insert`, `delete`, `undo`, `redo`.
  - **File System Navigation:** Implementing `mkdir`, `cd`, `ls` with permissions.
  - **Bank System:** Handling transfers, deposits, and account locking.

### Sample Problem: Simple Bank System

- **Input:** `balance = [10, 100, 20]`, `requests = ["withdraw 2 10", "transfer 1 3 5"]`
- **Expectation:** Manage state across multiple operations and handle edge cases (insufficient funds, invalid account IDs).
- **LeetCode Equivalent:** [Simple Bank System (LC 2043)](https://leetcode.com/problems/simple-bank-system/)

---

## 2. Technical Screen & Onsite Coding

Dropbox coding rounds are famous for **Concurrency** and **File System** logic. They care about "clean code" that looks like production-grade software.

### A. The "Bread and Butter" Questions

1.  **Find Duplicate Files:** \* **The Ask:** Given a root directory, find all duplicate files based on content (not name).
    - **Key Concepts:** Hashing (MD5/SHA), traversing file trees, handling large files (streaming vs. loading into memory).
    - **LeetCode:** [Find Duplicate File in System (LC 609)](https://leetcode.com/problems/find-duplicate-file-in-system/)
2.  **Game of Life:** \* **The Ask:** Implement the rules for Conway's Game of Life, often with a twist like an "infinite board."
    - **Key Concepts:** Matrix manipulation, state management, space optimization.
    - **LeetCode:** [Game of Life (LC 289)](https://leetcode.com/problems/game-of-life/)

### B. Concurrency & Multithreading (Critical)

Dropbox _will_ test your ability to write thread-safe code. You might be asked to implement:

- **Token Bucket / Rate Limiter:** How to throttle requests in a multi-threaded environment.
- **Multi-threaded Web Crawler:** Crawling URLs using a thread pool.
- **Key Concepts:** Mutexes/Locks, Read-Write Locks, Semaphores, and avoiding Deadlocks.
- **LeetCode:** [Web Crawler Multithreaded (LC 1242)](https://leetcode.com/problems/web-crawler-multithreaded/)

---

## 3. System Design Round

At Dropbox, system design is deeply rooted in their actual product: **distributed file storage and synchronization.**

### Core Requirements to Master:

- **Metadata vs. Block Storage:** Understand why you separate file metadata (MySQL/PostgreSQL) from the actual file chunks (S3/Magic Pocket).
- **Sync Engine:** How does a client know a file changed? (Long polling vs. WebSockets).
- **Conflict Resolution:** What happens when two people edit the same file offline? (Last-writer-wins vs. creating a "Conflicted Copy").
- **Deduplication:** Hashing chunks to avoid storing the same data twice.

### Set of Areas to Cover in Your Design:

1.  **Upload/Download Path:** How a file is broken into chunks (e.g., 4MB chunks), hashed, and uploaded.
2.  **Database Schema:** How to store file hierarchies, versions, and user permissions.
3.  **Scalability:** Sharding the metadata DB by `User_ID`.
4.  **Availability/Durability:** Mention "11 nines" of durability and multi-region replication.

---

## 4. Summary Checklist for Success

- [ ] **Master Concurrency:** Be comfortable writing `Lock` and `Unlock` logic in your preferred language.
- [ ] **Practice Simulation:** Solve problems where you have to maintain a complex state (like a spreadsheet or text editor).
- [ ] **Focus on Trade-offs:** In System Design, always explain _why_ you chose one database over another (e.g., SQL for ACID compliance in metadata).
- [ ] **Prepare Behavioral Stories:** Dropbox values "Ownership" and "Humility." Use the STAR method for stories about technical conflicts.
