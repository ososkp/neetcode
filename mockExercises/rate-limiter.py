import threading
import time

class RateLimiter:
    def __init__(self, maxCapacity, refillRatePerSecond):
        self.maxCapacity = maxCapacity
        self.refillRatePerSecond = refillRatePerSecond
        self.currentRequests = 0
        self.lastChecked = self.getTimeMs(time.time())
        self.lock = threading.Lock()


    def getTimeMs(self, timeMicroseconds):
        return round(timeMicroseconds * 1000)
    
    def allowRequest(self):
        now = self.getTimeMs(time.time())

        with self.lock:
            timePassedMs = now - self.lastChecked
            self.lastChecked = now

            refills = (timePassedMs / 1000) * self.refillRatePerSecond
            self.currentRequests = max(0, self.currentRequests - refills)

            result = False
            if self.currentRequests <= self.maxCapacity - 1:
                self.currentRequests += 1
                result = True

        return result
    
rl = RateLimiter(2, 1)

# print(rl.allowRequest())
# print(rl.allowRequest())
# print(rl.allowRequest())
# time.sleep(1.1)
# print(rl.allowRequest())

def make_request(thread_id):
    """This function simulates a single user request."""
    success = rl.allowRequest()
    status = "Allowed" if success else "Denied"
    print(f"Thread {thread_id} attempting request: {status}")

# Create a list to hold our thread objects
threads = []

print("Simulating 5 simultaneous requests...\n")

# Spawn 5 threads that hit the limiter at the exact same time
for i in range(1, 6):
    t = threading.Thread(target=make_request, args=(i,))
    threads.append(t)
    t.start()

# Wait for all threads to finish executing
for t in threads:
    t.join() 

print("\nSimulation complete.")