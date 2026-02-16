// verify_logic.js
// Mocking logic to test the score calculation and bounds

function calculateLiveScore(baseScore, skills, confidenceMap) {
    let scoreAdjustment = 0;
    skills.forEach(s => {
        if (confidenceMap[s] === 'know') scoreAdjustment += 2;
        else scoreAdjustment -= 2;
    });

    return Math.max(0, Math.min(100, baseScore + scoreAdjustment));
}

// Test Case 1: Base 50, 10 skills, all practice
const base1 = 50;
const skills1 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const map1 = {};
skills1.forEach(s => map1[s] = 'practice');
console.log("Test 1 (All Practice):", calculateLiveScore(base1, skills1, map1)); // Should be 50 - 20 = 30

// Test Case 2: Base 50, 10 skills, all know
const map2 = {};
skills1.forEach(s => map2[s] = 'know');
console.log("Test 2 (All Know):", calculateLiveScore(base1, skills1, map2)); // Should be 50 + 20 = 70

// Test Case 3: Bounds check (Low)
const base3 = 10;
const skills3 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const map3 = {};
skills3.forEach(s => map3[s] = 'practice');
console.log("Test 3 (Lower Bound):", calculateLiveScore(base3, skills3, map3)); // Should be 0, not -10

// Test Case 4: Bounds check (High)
const base4 = 90;
const map4 = {};
skills3.forEach(s => map4[s] = 'know');
console.log("Test 4 (Upper Bound):", calculateLiveScore(base4, skills3, map4)); // Should be 100, not 110

// Test Case 5: Partial
const map5 = { 'A': 'know', 'B': 'know', 'C': 'know' };
skills1.forEach(s => { if (!map5[s]) map5[s] = 'practice'; });
// 3 know (+6), 7 practice (-14) -> Net -8
console.log("Test 5 (Partial):", calculateLiveScore(base1, skills1, map5)); // Should be 50 - 8 = 42
