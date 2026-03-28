import json
from typing import List

class Solution:
    def decode(self, text: List[str]) -> str:
        charMap = {}
        maxIndex = -1
        i = 0

        while (i < len(text) and text[i] != ''):
            if (text[i] == ''):
                i += 1

            targetIndex = int(text[i])

            if targetIndex in charMap:
                # If password is complete, return
                if len(charMap) == maxIndex + 1:
                    result = [charMap.get(j, '') for j in range(maxIndex + 1)]
                    return ''.join(result)
                else:
                    maxIndex = -1
                    charMap.clear()

            if targetIndex > maxIndex:
                maxIndex = targetIndex

            x, y = json.loads(text[i + 1])

            endOfBlock = i + 2
            while (endOfBlock < len(text) and text[endOfBlock] != ''):
                endOfBlock += 1

            rowIndex = endOfBlock - 1 - y
            charMap[targetIndex] = text[rowIndex][x]

            i = endOfBlock + 1
        
        return ''
    
text5 = ["2", "[2, 3]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "0", "[1, 2]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "1", "[0, 0]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB", "",
    "0", "[0, 1]", "ABCDEFG", "HIGKLMN", "OPQRSTU", "VWXYZAB"];
# Output: "IVC"

text6 = ["0", "[3, 2]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "",
    "1", "[1, 1]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "",
    "0", "[5, 0]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO", "",
    "2", "[2, 3]", "MNOPQRS", "TUVWXYZ", "ABCDEFG", "HIJKLMO"];
# Output: "WB"

text7 = ["3", "[0, 3]", "QWERTYUIOP", "ASDFGHJKLZ", "ZXCVBNMQWE", "POIUYTREWQ", "",
    "1", "[2, 1]", "ABCDEFGHIJ", "KLMNOPQRST", "UVWXYZABCD", "EFGHIJKLMN", "",
    "0", "[4, 2]", "ZYXWVUTSRQ", "PONMLKJIHG", "FEDCBAZYX", "WVUTSRQPON", "",
    "2", "[1, 0]", "HELLOWORLDX", "GOODBYEWORLD", "TESTSTRING", "FINALTEST", "",
    "1", "[3, 3]", "SHOULDNOTBE", "PROCESSEDXX", "XXXXXXXXXX", "XXXXXXXXXX", "",
    "4", "[6, 1]", "SHOULDNOTBE", "PROCESSEDXX", "XXXXXXXXXX", "XXXXXXXXXX"];
# Output: "LWIQ"

sol = Solution()
print(sol.decode(text5))
print(sol.decode(text6))
print(sol.decode(text7))