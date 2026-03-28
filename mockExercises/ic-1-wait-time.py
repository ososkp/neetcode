import heapq
from typing import List

class Solution:
    def getMinShoppers(self, orders: List[List[int]], k: float) -> int:
        if not orders:
            return 0

        sortedOrders = sorted(orders, key=lambda x: x[1])
        bestSoFar = -1

        low = 1
        high = len(orders)

        while (low <= high):
            mid = (low + high) // 2
            result = self.getAverageWait(sortedOrders, mid)
            if (result <= k):
                bestSoFar = mid
                high = mid - 1
            else:
                low = mid + 1

        return bestSoFar


    def getAverageWait(self, orders: List[List[int]], numShoppers: int) -> float:
        nextFinishTime = [0] * numShoppers
        totalWait = 0

        for duration, arrivalTime in orders:
            startTime = max(heapq.heappop(nextFinishTime), arrivalTime)
            finishTime = startTime + duration
            wait = finishTime - arrivalTime
            totalWait += wait
            heapq.heappush(nextFinishTime, finishTime)
        
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
print(sol.getMinShoppers(orders1, k1))
print(sol.getMinShoppers(orders2, k2))
print(sol.getMinShoppers(orders3, k3))
print(sol.getMinShoppers(orders4, 1))
print(sol.getMinShoppers(orders5, 3))
print(sol.getMinShoppers(orders5, 8))
print(sol.getMinShoppers(orders6, k6))




# class Solution:
#     def getMinShoppers(self, orders: List[List[int]], k: float) -> int:
#         sortedOrders = sorted(orders, key=lambda x: x[1])
#         bestSoFar = -1

#         low = 1
#         high = len(orders)

#         while (low <= high):
#             mid = (low + high) // 2
#             result = self.getAverageWait(sortedOrders, mid)
#             if (result <= k):
#                 bestSoFar = mid
#                 high = mid - 1
#             else:
#                 low = mid + 1


#         return bestSoFar


#     def getAverageWait(self, orders: List[List[int]], numShoppers: int) -> float:
#         nextAvailable = [0] * numShoppers
#         totalWait = 0
#         for wait, arrival in orders:
#             startTime = max(heapq.heappop(nextAvailable), arrival)
#             endTime = startTime + wait
#             totalWait += (endTime - arrival)
#             heapq.heappush(nextAvailable, endTime)
#         return totalWait / len(orders)