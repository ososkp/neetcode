function bijection(s, t) {
    if (s.length === 0) return true;
    const sMap = {};
    const tMap = {};

    for (let i = 0; i < s.length; i++) {
        // If s[i] is in sMap, it must === t[i] and vice versa
        const charS = s[i];
        const charT = t[i];

        if (Object.hasOwn(sMap, charS) && sMap[charS] !== charT) return false;
        if (Object.hasOwn(tMap, charT) && tMap[charT] !== charS) return false;

        // If not, add it
        sMap[s[i]] = t[i];
        tMap[t[i]] = s[i];
    }
    return true;
}


const s = "egg", t = "add"; // true
const s1 = "f11", t1 = "b23"; // false
const s2 = "paper", t2 = "title"; // true

console.log(bijection(s, t));
console.log(bijection(s1, t1));
console.log(bijection(s2, t2));