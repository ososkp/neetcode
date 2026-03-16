# Toast Engineering Interview: Study Guide & Cheat Sheet

## Part 1: Core Coding Questions & Test Cases

### 1. Find the Celebrity

**The Prompt:** In a group of `n` people, a "celebrity" is someone who is known by everyone, but knows no one else. Given a helper function `knows(a, b)` that returns true if person `a` knows person `b`, find the celebrity's ID (or return `-1` if there is none).

**Key Concepts:** Two-Pointers, Graph Theory (directed edges), optimizing O(n^2) brute force down to O(n).

**Test Inputs:**

- **Happy Path (Celebrity Exists):** Input: `n = 3`, `knows` API represented by adjacency matrix: `[[1, 1, 0], [0, 1, 0], [1, 1, 1]]` (Person 0 knows 1, Person 2 knows 0 and 1. Person 1 knows no one). **Expected Output:** `1`
- **None Found (No Celebrity):** Input: `n = 3`, `knows` matrix: `[[1, 1, 0], [0, 1, 1], [1, 0, 1]]` (Cycle: 0 knows 1, 1 knows 2, 2 knows 0). **Expected Output:** `-1`
- **Edge Case (The "Fake" Celebrity / Small N):** Input: `n = 2`, `knows` matrix: `[[1, 1], [1, 1]]` (Both know each other, so neither is a true celebrity). **Expected Output:** `-1`

### 2. Menu / Nested Map Navigation

**The Prompt:** Given a deeply nested JSON object representing a restaurant menu (Categories -> Subcategories -> Items -> Modifiers), write a function to search for an item by ID, or calculate the total cost of a given order array.

**Key Concepts:** Recursion, Depth-First Search (DFS), Handling Null/Undefined gracefully.

**Test Inputs:**

- **Happy Path (Item Deep in Tree):** Input: `menu = { "Breakfast": { "Sides": { "Bacon": { "id": 42, "price": 3.99 } } } }`, `searchId = 42`. **Expected Output:** `{ "id": 42, "price": 3.99 }`
- **None Found (Invalid ID):** Input: `menu = { "Lunch": { "Burger": { "id": 10 } } }`, `searchId = 999`. **Expected Output:** `null` (or gracefully handled equivalent)
- **Edge Case (Empty Menu / Type Mismatches):** Input: `menu = {}`, `searchId = 10`. **Expected Output:** `null`. Input (Type Mismatch): `menu = { "Item": { "id": 5, "price": "12.99" } }` -> Ensure math functions parsing this return `12.99` instead of concatenating strings.

### 3. Valid Palindrome / String Cleanup

**The Prompt:** Determine if a string is a palindrome, ignoring non-alphanumeric characters and case. (Often themed as parsing messy receipt text).

**Key Concepts:** Two-Pointers (start and end moving inward), Regex filtering, String manipulation.

**Test Inputs:**

- **Happy Path:** Input: `"A man, a plan, a canal: Panama"`. **Expected Output:** `true`
- **None Found / False Match:** Input: `"Race a car"`. **Expected Output:** `false`
- **Edge Case (Empty or Punctuation Only):** Input: `" .,, "`. **Expected Output:** `true` (Since filtering leaves an empty string, which reads the same forwards and backwards).

### 4. The List Builder (Frontend / Fullstack)

**The Prompt:** Build a UI or API endpoint that takes a raw list of "Orders" and returns them sorted, filtered, or paginated.

**Key Concepts:** Sorting algorithms, State management, Time/Date parsing.

**Test Inputs:**

- **Happy Path (Standard Sort):** Input: `[{id: 1, time: "10:00AM"}, {id: 2, time: "09:30AM"}]`. **Expected Output:** `[{id: 2, time: "09:30AM"}, {id: 1, time: "10:00AM"}]`
- **None Found (Empty List):** Input: `[]`. **Expected Output:** `[]` (Ensure UI shows an "Empty State" component rather than crashing).
- **Edge Case (Ties & Missing Fields):** Input: `[{id: 1, time: "10:00AM", prep: 15}, {id: 2, time: "10:00AM", prep: null}]`. **Expected Output:** Graceful handling of the tie (e.g., secondary sort by `id`) and no runtime errors when attempting to calculate totals with the `null` prep time.

---

## Part 2: System Design Concepts (Restaurant Scale)

> **Note:** For system design, "test inputs" are best thought of as stress-test scenarios to prove your architecture's resilience.

### 1. Order Fulfillment System (Real-Time Kitchen Display)

**The Scenario:** Design a system that routes orders from a customer's phone directly to a Kitchen Display System (KDS) tablet.

**Key Concepts to Discuss:** WebSockets / SSE, Message Queues (Kafka/RabbitMQ), Idempotency, Offline First.

**Stress Test Scenarios:**

- **Happy Path (Standard Flow):** Customer submits order -> API -> Message Queue -> WebSocket pushes to KDS under 500ms.
- **"None Found" / Disconnect (Offline Mode):** The restaurant's main ISP drops. Does the system queue orders locally on the POS, or fail entirely?
- **Edge Case (The Double Tap):** A waiter's tablet lags, and they hit "Send Order" three times in one second. Idempotency keys should ensure the kitchen only receives one ticket.

### 2. Analytics Dashboard (Multi-Location Merchant)

**The Scenario:** Design a dashboard showing total daily sales across 1,500 franchise locations.

**Key Concepts to Discuss:** Batch vs. Stream Processing, Materialized Views, Database Sharding.

**Stress Test Scenarios:**

- **Happy Path (Daily Check):** A manager logs in and queries today's sales for their 5 local stores. Fetched from a materialized view in < 1 second.
- **"None Found" (Zero Sales):** A newly opened location has no historical data. The dashboard must render `0` or `N/A` instead of throwing a division-by-zero or null pointer exception.
- **Edge Case (The "All Data" Query):** The franchise CEO logs in and requests data for all 1,500 stores over a 5-year period. Your system should paginate this, utilize pre-aggregated batch tables, or run an asynchronous report rather than locking up the primary database.

### 3. The "Missing Data" Problem

**The Scenario:** Your data pipeline receives messy data from legacy point-of-sale systems.

**Key Concepts to Discuss:** Dead Letter Queues (DLQ), Graceful Degradation.

**Stress Test Scenarios:**

- **Happy Path (Clean Payload):** Payload arrives with valid JSON, correct types, and all required UUIDs. Parsed and stored successfully.
- **"None Found" (Missing Critical Identifiers):** An order arrives but the `merchant_id` is null. The payload cannot be routed. It is caught, skipped, and sent to a Dead Letter Queue for alerting/manual review without crashing the consumer.
- **Edge Case (Malformed Schema):** A legacy POS sends a string `"15"` instead of an integer `15` for the quantity, or truncates a timestamp. The pipeline should attempt type coercion or fail gracefully to the DLQ.

## Deep Dive: Order Fulfillment System (Real-Time Kitchen Display)

### 1. Requirements & Constraints

Before designing the system, we need to establish the boundaries:

- **Functional Requirements:**
  - Customers place orders via a mobile app or web interface.
  - Orders must appear on the appropriate restaurant's Kitchen Display System (KDS) tablet in real-time.
  - Kitchen staff can update order statuses (e.g., "Received", "Cooking", "Ready").
- **Non-Functional Requirements:**
  - **Low Latency:** Orders must reach the kitchen in < 500ms.
  - **High Availability:** The restaurant cannot stop taking orders, even during traffic spikes.
  - **Fault Tolerance (Offline First):** KDS tablets must handle spotty restaurant Wi-Fi gracefully.
  - **Exactly-Once Processing:** No dropped orders, and no duplicate tickets for the kitchen.

---

### 2. High-Level Architecture & Data Flow

1.  **Client Application (Customer Phone):** Sends an HTTP POST request to create an order.
2.  **API Gateway / Load Balancer:** Routes the request, handles rate limiting, and terminates SSL/TLS.
3.  **Order Service:** The core backend. Validates the order, generates a unique ID, applies idempotency checks, and saves the initial state to the database.
4.  **Database (PostgreSQL / CockroachDB):** Stores the source of truth for all orders. Relational databases are preferred here for ACID compliance regarding financial/inventory transactions.
5.  **Message Queue (Kafka / RabbitMQ):** The Order Service publishes an `OrderCreated` event to a topic. This decouples order ingestion from kitchen delivery.
6.  **KDS Routing Service:** Consumes events from the message queue. It maintains a registry of active connections to the KDS tablets.
7.  **Real-Time Gateway (WebSockets / SSE):** Pushes the `OrderCreated` payload down to the specific restaurant's tablet.

---

### 3. Deep Dive: Core Concepts & Trade-offs

#### A. Real-Time Communication: WebSockets vs. SSE

To push orders to the tablet instantly, standard HTTP polling is too resource-intensive and slow.

- **WebSockets:** Provide a persistent, bidirectional connection. Great if the tablet constantly sends granular telemetry back to the server.
- **Server-Sent Events (SSE):** Provide a persistent, unidirectional connection (server to client).
- **The Verdict:** **SSE** is often better for KDS delivery. The primary data flow is one-way (Order -> Kitchen). When the kitchen updates a status ("Order Ready"), the tablet can simply make a standard REST HTTP POST request back to the server. SSE is lighter, runs over standard HTTP/2, and handles connection drops/reconnects automatically natively in the browser/client.

#### B. Asynchronous Decoupling via Message Queues

Why not have the Order Service call the KDS Routing Service directly?

- **Spike Handling:** On Super Bowl Sunday, order volume might spike 100x. If the KDS service slows down, a synchronous HTTP call would block the Order Service, causing customer checkouts to timeout and fail.
- **Kafka / RabbitMQ:** By dropping the order into a queue, the Order Service immediately returns a "200 OK" to the customer. The KDS Routing Service processes the queue at its own maximum speed without bringing down the checkout flow.

#### C. Handling the Stress Test Scenarios

**Stress Test 1: The Double Tap (Idempotency)**

- **The Problem:** A customer on a slow 3G network taps "Checkout", nothing happens, so they tap it three more times.
- **The Solution:** The client app must generate a unique UUID (Idempotency Key) for the transaction _before_ sending the request. The Order Service checks a fast, in-memory cache (like Redis) for this key.
  - If the key doesn't exist: Process the order and cache the key.
  - If the key exists: Return the cached success response immediately _without_ publishing a new event to the Message Queue. The kitchen only gets one ticket.

**Stress Test 2: Disconnect / Offline Mode (Fault Tolerance)**

- **The Problem:** The restaurant's local ISP goes down. The KDS tablet loses connection to the cloud.
- **The Solution:** \* **Cloud Side:** The KDS Routing Service recognizes the broken WebSocket/SSE connection. Instead of dropping the message, it relies on the Message Queue's persistence (or a dedicated Dead Letter/Retry Queue) to hold the unacknowledged orders.
  - **Local Side (Offline-First):** For enterprise restaurant setups (like Toast), the Point of Sale (POS) terminals and KDS tablets often run on a Local Area Network (LAN). The primary POS device acts as a local edge server. If the external internet dies, waitstaff can still punch in orders on the POS, which routes directly to the KDS over local Wi-Fi. Once the internet returns, the local edge server syncs the missing state back up to the cloud Database to reconcile inventory and analytics.

---

### 4. Database Schema (Simplified)

**Table: `Orders`**

- `id` (UUID, Primary Key)
- `idempotency_key` (String, Unique Index)
- `merchant_id` (UUID, Foreign Key)
- `status` (Enum: PENDING, KITCHEN_RECEIVED, PREPARING, READY, FULFILLED)
- `total_amount` (Decimal)
- `payload` (JSONB - stores the actual items/modifiers)
- `created_at` (Timestamp)

_Indexing `merchant_id` and `created_at` is critical for quickly querying a restaurant's active orders upon tablet reboot._
