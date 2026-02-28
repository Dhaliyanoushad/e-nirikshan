export function getExpectedProgress(startDate, endDate, timeline) {

try {

if (!timeline || timeline.length === 0) {

return {
phase: "Unknown",
expectedProgress: 0,
phaseProgress: 0
};

}

const start = new Date(startDate);
const end = new Date(endDate);
const today = new Date();


// total project duration in months
const totalMonths =
(end - start) / (1000 * 60 * 60 * 24 * 30);


// elapsed months
const elapsedMonths =
(today - start) / (1000 * 60 * 60 * 24 * 30);


// clamp elapsed
const safeElapsed =
Math.max(0, Math.min(elapsedMonths, totalMonths));


// total timeline duration (from Gemini)
const timelineTotal =
timeline[timeline.length - 1].end;


// ==========================
// FIND CURRENT PHASE
// ==========================

let currentPhase = timeline[timeline.length - 1];

for (const phase of timeline) {

if (
safeElapsed >= phase.start &&
safeElapsed <= phase.end
) {

currentPhase = phase;
break;

}

}


// ==========================
// CALCULATE EXPECTED PROGRESS
// BASED ON TIMELINE
// ==========================

// overall %

const expectedProgress =
Math.round(
(safeElapsed / timelineTotal) * 100
);


// phase %

const phaseDuration =
currentPhase.end - currentPhase.start;

const phaseElapsed =
safeElapsed - currentPhase.start;

const phaseProgress =
Math.round(
Math.max(0,
Math.min(
100,
(phaseElapsed / phaseDuration) * 100
)
)
);


// ==========================
// RETURN
// ==========================

return {

phase: currentPhase.phase,

expectedProgress,

phaseProgress

};

}

catch (error) {

console.error(error);

return {

phase: "Unknown",
expectedProgress: 0,
phaseProgress: 0

};

}

}
