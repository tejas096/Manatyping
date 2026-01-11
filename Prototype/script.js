/* =================================================
   ManaTyping – FINAL COMPLETE SCRIPT (BUG FIXED)
   Copy-Paste detection works from FIRST session
   Privacy-First • Hackathon Ready
================================================= */

/* ---------- STATE ---------- */
let sessionActive = false;
let sessionStart = 0;
let lastKeyTime = 0;

let keystrokes = 0;
let totalPause = 0;
let delays = [];

/* Content growth tracking */
let lastContentLength = 0;
let lastContentTime = 0;
let defaulterDetected = false;

/* ---------- CONSTANTS ---------- */
const PAUSE_THRESHOLD = 5000;        // 5 sec pause = thinking
const CONTENT_SPIKE_THRESHOLD = 40;  // chars/sec → paste detection

/* ---------- ELEMENTS ---------- */
const editor = document.getElementById("editor");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const modal = document.getElementById("summaryModal");

/* ---------- START SESSION ---------- */
startBtn.onclick = () => {
  startBtn.classList.add("animate-start");
  editor.classList.add("fade-in");

  sessionActive = true;
  sessionStart = Date.now();
  lastKeyTime = Date.now();

  keystrokes = 0;
  totalPause = 0;
  delays = [];

  lastContentLength = 0;
  lastContentTime = Date.now();
  defaulterDetected = false;

  editor.disabled = false;
  editor.focus();

  startBtn.disabled = true;
  stopBtn.disabled = false;

  document.getElementById("analysisText").innerText =
    "Analyzing typing rhythm...";

  setTimeout(() => startBtn.classList.remove("animate-start"), 400);
};

/* ---------- STOP SESSION ---------- */
stopBtn.onclick = () => {
  stopBtn.classList.add("animate-stop");

  sessionActive = false;
  editor.disabled = true;

  startBtn.disabled = false;
  stopBtn.disabled = true;

  showSummary();

  setTimeout(() => stopBtn.classList.remove("animate-stop"), 400);
};

/* ---------- KEYDOWN (RHYTHM + PAUSE) ---------- */
editor.addEventListener("keydown", () => {
  if (!sessionActive) return;

  const now = Date.now();
  const diff = now - lastKeyTime;
  keystrokes++;

  if (diff > PAUSE_THRESHOLD) {
    totalPause += diff;
  } else {
    delays.push(diff);
  }

  lastKeyTime = now;
  updateStats();
});

/* ---------- INPUT (CONTENT GROWTH / PASTE DETECTION) ---------- */
editor.addEventListener("input", () => {
  if (!sessionActive) return;

  const now = Date.now();
  const currentLength = editor.value.length;

  const timeDiff = now - lastContentTime;
  const charsAdded = currentLength - lastContentLength;

  if (timeDiff > 0 && charsAdded > 5) {
    const charsPerSecond = (charsAdded / timeDiff) * 1000;

    if (charsPerSecond > CONTENT_SPIKE_THRESHOLD) {
      defaulterDetected = true;
    }
  }

  lastContentLength = currentLength;
  lastContentTime = now;
});

/* ---------- LIVE STATS ---------- */
function updateStats() {
  const duration = Math.floor((Date.now() - sessionStart) / 1000);
  const avgDelay = delays.length
    ? Math.floor(delays.reduce((a, b) => a + b, 0) / delays.length)
    : 0;

  document.getElementById("keystrokes").innerText = keystrokes;
  document.getElementById("duration").innerText = duration + "s";
  document.getElementById("avgDelay").innerText = avgDelay + "ms";
  document.getElementById("thinkingTime").innerText =
    Math.floor(totalPause / 1000) + "s";

  document.getElementById("analysisText").innerText =
    defaulterDetected
      ? "⚠ Possible copy-paste behavior detected"
      : "Analyzing typing rhythm...";
}

/* ---------- CLASSIFICATION ---------- */
function classify(avgDelay, pause) {
  if (defaulterDetected) {
    return "Defaulter detected – abnormal text growth";
  }
  if (pause > 15000) {
    return "Reflective writing detected";
  }
  if (avgDelay < 80) {
    return "Unnaturally fast input detected";
  }
  return "Natural writing rhythm";
}

/* ---------- SESSION SUMMARY ---------- */
function showSummary() {
  const duration = Math.floor((Date.now() - sessionStart) / 1000);
  const avgDelay = delays.length
    ? Math.floor(delays.reduce((a, b) => a + b, 0) / delays.length)
    : 0;

  document.getElementById("mKeys").innerText = keystrokes;
  document.getElementById("mDuration").innerText = duration + "s";
  document.getElementById("mDelay").innerText = avgDelay + "ms";
  document.getElementById("mThinking").innerText =
    Math.floor(totalPause / 1000) + "s";
  document.getElementById("mBehavior").innerText =
    classify(avgDelay, totalPause);

  modal.classList.add("active");
}

/* ---------- MODAL ---------- */
function closeModal() {
  modal.classList.remove("active");
}

/* ---------- DOWNLOAD EFFORT REPORT ---------- */
function downloadReport() {
  const avgDelay = delays.length
    ? Math.floor(delays.reduce((a, b) => a + b, 0) / delays.length)
    : 0;

  const report = `
ManaTyping – Effort Report
-------------------------
Keystrokes: ${keystrokes}
Duration: ${Math.floor((Date.now() - sessionStart) / 1000)} seconds
Average Key Delay: ${avgDelay} ms
Thinking Time: ${Math.floor(totalPause / 1000)} seconds
Behavior: ${classify(avgDelay, totalPause)}

Privacy Notice:
- No clipboard access
- No content analysis
- Timing & length only
`;

  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "manatyping_effort_report.txt";
  a.click();

  URL.revokeObjectURL(url);
}



/* ---------- RESTART SESSION ---------- */
function restartSession() {
  closeModal();

  editor.value = "";
  editor.disabled = true;

  keystrokes = 0;
  totalPause = 0;
  delays = [];
  defaulterDetected = false;
  lastContentLength = 0;
  lastContentTime = 0;
  sessionActive = false;

  document.getElementById("keystrokes").innerText = "0";
  document.getElementById("duration").innerText = "0s";
  document.getElementById("avgDelay").innerText = "0ms";
  document.getElementById("thinkingTime").innerText = "0s";
  document.getElementById("analysisText").innerText =
    "Start typing to analyze";

  startBtn.disabled = false;
  stopBtn.disabled = true;
}
