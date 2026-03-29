import heapq

class Solution:
    def getMinShoppers(self, orders, waitTime):
        if not orders:
            return 0

        sortedOrders = sorted(orders, key=lambda x: x[1])
        bestSoFar = -1

        low = 1
        high = len(sortedOrders)

        while (low <= high):
            mid = (low + high) // 2
            result = self.getWaitTime(sortedOrders, mid)
            if (result <= waitTime):
                bestSoFar = mid
                high = mid - 1
            else:
                low = mid + 1

        return bestSoFar
    
    def getWaitTime(self, orders, numShoppers):
        waitingShoppers = [0] * numShoppers
        totalWait = 0

        for duration, arrivalTime in orders:
            startTime = max(heapq.heappop(waitingShoppers), arrivalTime)
            finishTime = startTime + duration
            waitTime = finishTime - arrivalTime
            totalWait += waitTime
            heapq.heappush(waitingShoppers, finishTime)

        return totalWait / len(orders)


orders0 = [[2, 1], [5, 2], [3, 4]]

orders1 = [[4, 1], [5, 2], [2, 3]]
k1 = 5.0
# Output: 2

orders2 = [[4, 1], [4, 2], [4, 3], [4, 4]]
k2 = 4.3
# Output: 3

orders3 = [[10, 1], [10, 2], [10, 3], [1, 4]]
k3 = 2.0
# Output: -1

orders4 = []

orders5 = [[5, 4]]

orders6 = [[1,1],[3,2],[2,3],[4,4],[1,5],[2,6]]
k6 = 3

sol = Solution()
print(sol.getWaitTime(orders0, 1)) # 5.0
print(sol.getMinShoppers(orders1, k1)) # 2
print(sol.getMinShoppers(orders2, k2)) # 3
print(sol.getMinShoppers(orders3, k3)) # -1
print(sol.getMinShoppers(orders4, 1)) # 0
print(sol.getMinShoppers(orders5, 3)) # -1 - wait time too long
print(sol.getMinShoppers(orders5, 8)) # 1
print(sol.getMinShoppers(orders6, k6)) # 2
