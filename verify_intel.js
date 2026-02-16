// verify_intel.js
import { getCompanyIntel, generateRoundMap } from './src/services/analysisService.js';

console.log("--- TEST SCENARIO: ENTERPRISE (AMAZON) ---");
const intel1 = getCompanyIntel("Amazon India");
const skills1 = { 'Core CS': ['DSA'], 'Web': ['React'] };
const rounds1 = generateRoundMap(intel1, skills1);

console.log("Intel 1:", JSON.stringify(intel1, null, 2));
console.log("Rounds 1 Count:", rounds1.length);
console.log("Round 1 Name:", rounds1[0].name); // Should be Online Assessment
console.log("---");

console.log("--- TEST SCENARIO: STARTUP (KODNEST) ---");
const intel2 = getCompanyIntel("KodNest");
const skills2 = { 'Web': ['React', 'Node.js'] };
const rounds2 = generateRoundMap(intel2, skills2);

console.log("Intel 2:", JSON.stringify(intel2, null, 2));
console.log("Rounds 2 Count:", rounds2.length);
console.log("Round 1 Name:", rounds2[0].name); // Should be Practical Coding
console.log("---");

console.log("--- TEST SCENARIO: UNKNOWN COMPANY ---");
const intel3 = getCompanyIntel("Acme Corp");
console.log("Intel 3 Size:", intel3.size); // Should be Startup
