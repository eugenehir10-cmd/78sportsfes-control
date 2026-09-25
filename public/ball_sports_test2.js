"use strict";
const INITIAL_SCHEDULE = [
    { id: "m1", blockId: "initial_c1_soccer", blockTitle: "第1試合", court: "上グラ", sport: "サッカー", grade: "中1", title: "第一試合", format: "league", teamA: "A", teamB: "B", scoreA: null, scoreB: null, start: "08:20", end: "08:30", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0, pointRule: [150, 100, 50, 0] },
    { id: "m1_2", blockId: "initial_c1_soccer", blockTitle: "第1試合", court: "上グラ", sport: "サッカー", grade: "中1", title: "第二試合", format: "league", teamA: "A", teamB: "C", scoreA: null, scoreB: null, start: "08:35", end: "08:45", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0, pointRule: [150, 100, 50, 0] },
    { id: "m1_3", blockId: "initial_c1_soccer", blockTitle: "第1試合", court: "上グラ", sport: "サッカー", grade: "中1", title: "第三試合", format: "league", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "08:50", end: "09:00", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0, pointRule: [150, 100, 50, 0] },
    { id: "m1_4", blockId: "initial_c1_soccer", blockTitle: "第1試合", court: "上グラ", sport: "サッカー", grade: "中1", title: "第四試合", format: "league", teamA: "B", teamB: "C", scoreA: null, scoreB: null, start: "09:05", end: "09:15", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0, pointRule: [150, 100, 50, 0] },
    { id: "m1_5", blockId: "initial_c1_soccer", blockTitle: "第1試合", court: "上グラ", sport: "サッカー", grade: "中1", title: "第五試合", format: "league", teamA: "B", teamB: "D", scoreA: null, scoreB: null, start: "09:20", end: "09:30", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0, pointRule: [150, 100, 50, 0] },
    { id: "m1_6", blockId: "initial_c1_soccer", blockTitle: "第1試合", court: "上グラ", sport: "サッカー", grade: "中1", title: "第六試合", format: "league", teamA: "C", teamB: "D", scoreA: null, scoreB: null, start: "09:35", end: "09:45", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0, pointRule: [150, 100, 50, 0] },
    { id: "m2", court: "上グラ", sport: "サッカー", grade: "高1", title: "第2試合", format: "league", teamA: "A", teamB: "C", scoreA: null, scoreB: null, start: "09:35", end: "10:42", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m3", court: "上グラ", sport: "サッカー", grade: "中2", title: "第3試合", format: "league", teamA: "B", teamB: "D", scoreA: null, scoreB: null, start: "10:50", end: "11:57", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m4", court: "上グラ", sport: "サッカー", grade: "高3", title: "第4試合", format: "league", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "11:20", end: "12:27", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m5", court: "上グラ", sport: "サッカー", grade: "高2", title: "第5試合", format: "league", teamA: "B", teamB: "C", scoreA: null, scoreB: null, start: "12:35", end: "13:42", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m6", court: "上グラ", sport: "サッカー", grade: "高3", title: "第6試合", format: "league", teamA: "C", teamB: "D", scoreA: null, scoreB: null, start: "13:50", end: "15:00", referee: "相山", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m7", court: "下グラ", sport: "アルティメット", grade: "中2", title: "第1試合", format: "league", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "08:20", end: "09:12", referee: "田中", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m8", court: "下グラ", sport: "野球", grade: "高3", title: "第1試合", format: "tournament", teamA: "B", teamB: "C", scoreA: null, scoreB: null, start: "11:25", end: "12:25", referee: "田中", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m9", court: "下グラ", sport: "野球", grade: "高3", title: "第2試合", format: "tournament", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "13:00", end: "14:00", referee: "田中", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m10", court: "体育館", sport: "バスケ", grade: "中3", title: "第1試合", format: "league", teamA: "A", teamB: "B", scoreA: null, scoreB: null, start: "08:20", end: "09:17", referee: "渡辺", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m11", court: "体育館", sport: "バスケ", grade: "高2", title: "第2試合", format: "league", teamA: "C", teamB: "D", scoreA: null, scoreB: null, start: "09:45", end: "10:42", referee: "渡辺", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m12", court: "体育館", sport: "バスケ", grade: "中1", title: "第3試合", format: "league", teamA: "A", teamB: "C", scoreA: null, scoreB: null, start: "10:50", end: "11:47", referee: "渡辺", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m13", court: "体育館", sport: "バスケ", grade: "高1", title: "第4試合", format: "league", teamA: "B", teamB: "D", scoreA: null, scoreB: null, start: "13:00", end: "13:57", referee: "渡辺", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m14", court: "体育館", sport: "バスケ", grade: "高3", title: "第5試合", format: "league", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "14:05", end: "15:00", referee: "渡辺", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m15", court: "ハード", sport: "ドッジボール", grade: "中2", title: "第1試合", format: "tournament", teamA: "A", teamB: "B", scoreA: null, scoreB: null, start: "08:20", end: "09:15", referee: "高橋", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m16", court: "ハード", sport: "アルティメット", grade: "中3", title: "第1試合", format: "league", teamA: "C", teamB: "D", scoreA: null, scoreB: null, start: "09:35", end: "10:27", referee: "高橋", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m17", court: "オムニ", sport: "バレー", grade: "高2", title: "第1試合", format: "league", teamA: "A", teamB: "C", scoreA: null, scoreB: null, start: "08:20", end: "09:45", referee: "伊藤", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m18", court: "オムニ", sport: "バレー", grade: "高3", title: "第2試合", format: "league", teamA: "B", teamB: "D", scoreA: null, scoreB: null, start: "09:55", end: "11:20", referee: "伊藤", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m19", court: "オムニ", sport: "バレー", grade: "高1", title: "第3試合", format: "league", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "11:30", end: "12:55", referee: "伊藤", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m20", court: "オムニ", sport: "バレー", grade: "中3", title: "第4試合", format: "league", teamA: "B", teamB: "C", scoreA: null, scoreB: null, start: "13:35", end: "15:00", referee: "伊藤", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m21", court: "卓球場", sport: "卓球", grade: "中1", title: "第1試合", format: "league", teamA: "A", teamB: "B", scoreA: null, scoreB: null, start: "08:20", end: "09:15", referee: "鈴木", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m22", court: "卓球場", sport: "卓球", grade: "高1", title: "第2試合", format: "league", teamA: "C", teamB: "D", scoreA: null, scoreB: null, start: "09:25", end: "10:20", referee: "鈴木", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m23", court: "卓球場", sport: "卓球", grade: "高2", title: "第3試合", format: "league", teamA: "A", teamB: "C", scoreA: null, scoreB: null, start: "10:30", end: "11:25", referee: "鈴木", staff: "進行", status: "BEFORE", offsetMins: 0 },
    { id: "m24", court: "卓球場", sport: "卓球", grade: "中2", title: "第4試合", format: "league", teamA: "B", teamB: "D", scoreA: null, scoreB: null, start: "12:00", end: "12:55", referee: "鈴木", staff: "進行", status: "BEFORE", offsetMins: 0 }
];
const LEAGUE_PAIRS = [["A", "B"], ["A", "C"], ["A", "D"], ["B", "C"], ["B", "D"], ["C", "D"]];
function normalizeCompetitionSchedule(sourceSchedule) {
    const normalized = [];
    sourceSchedule.forEach((source) => {
        if (source.blockId) {
            normalized.push(source);
            return;
        }
        const blockId = `block_${source.id}`;
        const blockTitle = "第1試合";
        const endMinutes = Number(source.end.split(":")[0]) * 60 + Number(source.end.split(":")[1]);
        const startMinutes = Number(source.start.split(":")[0]) * 60 + Number(source.start.split(":")[1]);
        const duration = Math.max(10, Math.round(endMinutes - startMinutes));
        const definitions = source.format === "tournament"
            ? [["準決勝1", "A", "B"], ["準決勝2", "C", "D"], ["3位決定戦", "準決勝1の敗者", "準決勝2の敗者"], ["決勝", "準決勝1の勝者", "準決勝2の勝者"]]
            : LEAGUE_PAIRS.map((pair, index) => [`第${index + 1}試合`, pair[0], pair[1]]);
        definitions.forEach((definition, index) => {
            const start = addMinutesToTime(source.start, index * (duration + 5));
            normalized.push({
                ...source,
                id: `${blockId}_${index + 1}`,
                blockId,
                blockTitle,
                title: definition[0],
                teamA: definition[1],
                teamB: definition[2],
                scoreA: null,
                scoreB: null,
                start,
                end: addMinutesToTime(start, duration),
                offsetMins: 0,
                pointRule: source.pointRule ?? [150, 100, 50, 0]
            });
        });
    });
    return normalized;
}
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyCVYfQSmKyPvbDWrAp6FNMUmuu3_GyrM00",
    authDomain: "thsportsfes.firebaseapp.com",
    projectId: "thsportsfes",
    storageBucket: "thsportsfes.appspot.com",
    messagingSenderId: "96596815858",
    appId: "1:96596815858:web:5f85526bf785ccc5d8056b"
};
let firebaseSync = {
    app: null,
    db: null,
    initialized: false,
    online: false
};
let appState = {
    schedule: normalizeCompetitionSchedule(JSON.parse(localStorage.getItem("gym78_ball_day_v1_schedule") ?? "null") || INITIAL_SCHEDULE),
    timelineViewMode: "byCourt",
    expandedGroups: {},
    selectedModalStatus: "BEFORE",
    isAdmin: false,
    announcement: localStorage.getItem("gym78_ball_day_v1_announcement") || ""
};
function updateSyncStatus(label, tone = "sky") {
    const badge = document.getElementById("syncStatusBadge");
    const text = document.getElementById("syncStatusText");
    if (!badge || !text)
        return;
    text.textContent = label;
    badge.className = `inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-bold ${tone === "success" ? "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : tone === "warning" ? "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300" : "border-sky-300 bg-sky-100 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300"}`;
    const dot = badge.querySelector("span");
    if (dot) {
        dot.className = `inline-block h-2 w-2 rounded-full ${tone === "success" ? "bg-emerald-500" : tone === "warning" ? "bg-amber-500" : "bg-sky-500"}`;
    }
}
async function initFirebaseSync() {
    if (!window.firebase || !window.firebase.apps)
        return;
    try {
        if (!firebaseSync.app)
            firebaseSync.app = firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(FIREBASE_CONFIG);
        firebaseSync.db = firebase.firestore(firebaseSync.app);
        firebaseSync.initialized = true;
        firebaseSync.online = true;
        updateSyncStatus("同期中", "success");
        const docSnap = await firebaseSync.db.collection("sportsfes").doc("main").get();
        if (docSnap.exists && Array.isArray(docSnap.data()?.schedule)) {
            const remoteSchedule = docSnap.data().schedule;
            if (remoteSchedule.length > 0 && remoteSchedule.every((match) => typeof match === "object")) {
                appState.schedule = normalizeCompetitionSchedule(remoteSchedule);
                const remoteAnnouncement = docSnap.data()?.announcement ?? "";
                if (typeof remoteAnnouncement === "string")
                    appState.announcement = remoteAnnouncement;
                localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
                localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
            }
        }
    }
    catch {
        firebaseSync.initialized = false;
        firebaseSync.online = false;
        updateSyncStatus("オフライン", "warning");
    }
}
async function syncStateToFirebase() {
    if (!firebaseSync.db || !firebaseSync.initialized)
        return;
    try {
        await firebaseSync.db.collection("sportsfes").doc("main").set({
            schedule: appState.schedule,
            announcement: appState.announcement,
            updatedAt: new Date().toISOString() 
        }, { merge: true });
        updateSyncStatus("同期済み", "success");
    }
    catch {
        updateSyncStatus("同期失敗", "warning");
    }
}
function saveState() {
    localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
    localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
    if (firebaseSync.initialized)
        syncStateToFirebase();
}
document.addEventListener("DOMContentLoaded", () => {
    startClock();
    updateSyncStatus("同期待機", "sky");
    initFirebaseSync();
    setTimelineViewMode(appState.timelineViewMode);
    refreshSportSelectors();
    renderCourtDelaySummary();
    renderTimeline();
    renderResultsTab();
    renderTimeConfigEditor();
    calculateScoresAndRanks();
    if (appState.announcement)
        showAnnouncement(appState.announcement);
});
function toggleTheme() {
    const html = document.documentElement;
    const btnText = document.getElementById("themeBtnText");
    if (!btnText)
        return;
    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        btnText.innerText = "ダークモード (暗いUI)";
    }
    else {
        html.classList.add("dark");
        btnText.innerText = "屋外モード (明るいUI)";
    }
}
function toggleContrast() {
    const enabled = document.body.classList.toggle("high-contrast");
    const button = document.getElementById("contrastToggleBtn");
    button?.setAttribute("aria-pressed", String(enabled));
    if (button)
        button.classList.toggle("contrast-active", enabled);
}
function startClock() {
    const clockEl = document.getElementById("clockDisplay");
    if (!clockEl)
        return;
    const update = () => {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, "0");
        const mins = String(now.getMinutes()).padStart(2, "0");
        const secs = String(now.getSeconds()).padStart(2, "0");
        const ms = String(now.getMilliseconds()).padStart(3, "0");
        clockEl.innerHTML = `${hrs}:${mins}:${secs}.<span class="text-[10px] text-sky-500">${ms}</span>`;
        updateGanttTimeBar(now);
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}
function saveState() {
    localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
    localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
}
function calcAdjustedTime(timeStr, offsetMins) {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m + offsetMins, 0, 0);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
function switchTab(tabName) {
    document.querySelectorAll("main > section").forEach((sec) => sec.classList.add("hidden"));
    document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("border-sky-500", "text-sky-600", "dark:text-sky-400");
        btn.classList.add("border-transparent", "text-slate-500", "dark:text-slate-400");
    });
    const target = document.getElementById(`sec-${tabName}`);
    if (target)
        target.classList.remove("hidden");
    const activeBtn = document.getElementById(`tab-${tabName}`);
    if (activeBtn) {
        activeBtn.classList.add("border-sky-500", "text-sky-600", "dark:text-sky-400");
    }
    if (tabName === "gantt")
        renderGantt();
    if (tabName === "results")
        renderResultsTab();
}
function renderCourtDelaySummary() {
    const courts = ["上グラ", "下グラ", "体育館", "ハード", "オムニ", "卓球場"];
    const summaryContainer = document.getElementById("courtDelaySummaryBar");
    const adminMonitor = document.getElementById("adminCourtDelayMonitor");
    let summaryHtml = "";
    let adminMonitorHtml = "";
    courts.forEach((court) => {
        const courtMatches = appState.schedule.filter((m) => m.court === court);
        const maxOffset = courtMatches.length > 0 ? courtMatches[courtMatches.length - 1].offsetMins : 0;
        const inProgress = courtMatches.find((m) => m.status === "IN_PROGRESS");
        const nextMatch = courtMatches
            .filter((m) => m.status === "BEFORE")
            .sort((a, b) => calcAdjustedTime(a.start, a.offsetMins).localeCompare(calcAdjustedTime(b.start, b.offsetMins)))[0];
        const finishedCount = courtMatches.filter((m) => m.status === "FINISHED").length;
        let badgeColor = "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400";
        let delayText = "順調 (±0分)";
        if (maxOffset > 0) {
            badgeColor = "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/40 text-rose-600 dark:text-rose-400 font-bold";
            delayText = `+${maxOffset}分 遅延中`;
        }
        else if (maxOffset < 0) {
            badgeColor = "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-500/40 text-sky-600 dark:text-sky-400 font-bold";
            delayText = `${maxOffset}分 前倒し`;
        }
        const inProgressLabel = inProgress ? getDisplayMatchName(inProgress) : "";
        const nextLabel = nextMatch ? getDisplayMatchName(nextMatch) : "";
        summaryHtml += `
      <div class="stat-tile border rounded-2xl p-2.5 text-center shadow-sm ${badgeColor}">
        <div class="text-[10px] font-black tracking-[0.18em] uppercase opacity-80">${court}</div>
        <div class="mt-1 text-xs font-mono font-black">${delayText}</div>
        <div class="mt-1 text-[10px] opacity-80">${finishedCount}/${courtMatches.length} 完了</div>
        <div class="mt-1 text-[10px] truncate" title="${inProgress ? `進行中: ${inProgressLabel}` : nextMatch ? `次: ${nextLabel}` : "試合なし"}">
          ${inProgress ? `進行中: ${inProgressLabel}` : nextMatch ? `次: ${calcAdjustedTime(nextMatch.start, nextMatch.offsetMins)} ${nextLabel}` : "試合なし"}
        </div>
      </div>
    `;
        adminMonitorHtml += `
      <div class="surface-card rounded-2xl p-3 flex justify-between items-center gap-3">
        <div>
          <div class="font-black text-xs text-slate-800 dark:text-slate-100">${court} コート</div>
          <div class="text-[10px] text-slate-400 mt-1">現在: ${inProgress ? inProgress.title : "進行中なし"}</div>
        </div>
        <div class="text-right">
          <span class="text-xs font-mono font-black px-2.5 py-1 rounded-lg inline-block ${maxOffset > 0 ? "bg-rose-500 text-white" : maxOffset < 0 ? "bg-sky-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"}">
            ${maxOffset > 0 ? `+${maxOffset}分遅延` : maxOffset < 0 ? `${maxOffset}分前倒し` : "定刻通り"}
          </span>
        </div>
      </div>
    `;
    });
    if (summaryContainer)
        summaryContainer.innerHTML = summaryHtml;
    if (adminMonitor)
        adminMonitor.innerHTML = adminMonitorHtml;
}
function setTimelineViewMode(mode) {
    appState.timelineViewMode = mode;
    const groupedBtn = document.getElementById("viewGroupBtn");
    const courtBtn = document.getElementById("viewCourtBtn");
    if (groupedBtn) {
        groupedBtn.className = mode === "grouped" ? "px-3 py-1 text-xs font-bold rounded-lg bg-sky-500 text-white shadow-sm" : "px-3 py-1 text-xs font-bold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
    if (courtBtn) {
        courtBtn.className = mode === "byCourt" ? "px-3 py-1 text-xs font-bold rounded-lg bg-sky-500 text-white shadow-sm" : "px-3 py-1 text-xs font-bold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300";
    }
    renderTimeline();
}
function getDisplayMatchName(match) {
    if (!match)
        return "試合";
    const title = match.title || "";
    const genericMatchPattern = /^(第[0-9０-９一二三四五六七八九十百]+試合|第[0-9０-９一二三四五六七八九十百]+節)$/;
    return genericMatchPattern.test(title) ? match.sport || title : title || match.sport || "試合";
}
function getMatchOpponentText(match) {
    if (!match)
        return "試合";
    if (match.teamA && match.teamB)
        return `${match.teamA}対${match.teamB}`;
    return getDisplayMatchName(match);
}
function createScoreSelect(matchId, side, value) {
    const selected = value === null || value === undefined ? "" : String(value);
    const options = ['<option value="">-</option>'];
    for (let score = 0; score <= 50; score++) {
        options.push(`<option value="${score}" ${selected === String(score) ? "selected" : ""}>${score}</option>`);
    }
    return `<select id="inputScore${side}_${matchId}" class="score-input w-16 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 px-0.5 font-mono font-bold text-sm text-sky-600 dark:text-sky-400 outline-none focus:border-sky-500">
      ${options.join("")}
    </select>`;
}
function renderTimeline() {
    const container = document.getElementById("timelineContainer");
    const courtFilter = document.getElementById("courtFilter")?.value ?? "ALL";
    const statusFilter = document.getElementById("statusFilter")?.value ?? "ALL";
    if (!container)
        return;
    container.innerHTML = "";
    container.className = appState.timelineViewMode === "byCourt" ? "court-lane-scroll" : "space-y-3";
    const filtered = appState.schedule.filter((m) => {
        if (courtFilter !== "ALL" && m.court !== courtFilter)
            return false;
        if (statusFilter !== "ALL" && m.status !== statusFilter)
            return false;
        return true;
    });
    if (appState.timelineViewMode === "grouped") {
        const groups = {};
        filtered.forEach((m) => {
            const key = m.blockId ?? `${m.grade} - ${m.sport}`;
            if (!groups[key])
                groups[key] = [];
            groups[key].push(m);
        });
        if (Object.keys(groups).length === 0) {
            container.innerHTML = '<div class="text-center py-8 text-xs text-slate-400 font-bold">該当する試合はありません</div>';
            return;
        }
        Object.keys(groups).forEach((gKey) => {
            const matches = groups[gKey].sort((a, b) => a.start.localeCompare(b.start));
            const firstMatch = matches[0];
            const groupLabel = firstMatch.sport || `${firstMatch.grade} ${firstMatch.sport}`;
            const isExpanded = appState.expandedGroups[gKey] === true;
            const finishedCount = matches.filter((m) => m.status === "FINISHED").length;
            const inProgressCount = matches.filter((m) => m.status === "IN_PROGRESS").length;
            const groupCard = document.createElement("div");
            groupCard.className = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm";
            groupCard.innerHTML = `
        <div onclick="toggleGroupExpand('${gKey}')" class="timeline-group-header p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-2.5">
            <span class="bg-sky-500 text-white font-black text-xs px-2.5 py-0.5 rounded-md">${firstMatch.grade}</span>
            <h3 class="font-black text-sm text-slate-800 dark:text-slate-100">${groupLabel}</h3>
            <span class="text-[11px] text-slate-400 font-bold">(${matches.length}試合)</span>
          </div>

          <div class="flex items-center space-x-2">
            ${inProgressCount > 0 ? `<span class="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full animate-pulse">進行中 ${inProgressCount}</span>` : ""}
            <span class="text-[11px] font-bold text-slate-400">${finishedCount}/${matches.length} 完了</span>
            <span class="text-[10px] text-slate-400">タップで詳細</span>
            <i class="fa-solid fa-chevron-${isExpanded ? "up" : "down"} text-slate-400 text-xs ml-1"></i>
          </div>
        </div>

        ${isExpanded ? `<div class="p-2.5 bg-slate-50 dark:bg-slate-950/40 space-y-2">${matches.map((m) => createMatchItemHtml(m)).join("")}</div>` : ""}
      `;
            container.appendChild(groupCard);
        });
    }
    else {
        const courts = ["上グラ", "下グラ", "体育館", "ハード", "オムニ", "卓球場"];
        courts.forEach((court) => {
            const cMatches = filtered
                .filter((m) => m.court === court)
                .sort((a, b) => calcAdjustedTime(a.start, a.offsetMins).localeCompare(calcAdjustedTime(b.start, b.offsetMins)));
            if (cMatches.length === 0)
                return;
            const courtSec = document.createElement("div");
            courtSec.className = "court-lane";
            courtSec.innerHTML = `
        <div class="court-lane-header text-sm font-black text-slate-700 dark:text-slate-200 flex items-center justify-between gap-1">
          <span>
          <i class="fa-solid fa-location-dot text-sky-500"></i> ${court}
          </span>
          <span class="text-[10px] font-bold text-slate-400">${cMatches.length}試合</span>
        </div>
        <div class="court-lane-matches">${cMatches.map((m) => createMatchItemHtml(m)).join("")}</div>
      `;
            container.appendChild(courtSec);
        });
    }
}
function createMatchItemHtml(m) {
    const adjStart = calcAdjustedTime(m.start, m.offsetMins);
    const adjEnd = calcAdjustedTime(m.end, m.offsetMins);
    const isDelayed = m.offsetMins > 0;
    const matchTitleDisplay = getDisplayMatchName(m);
    let statusBadge = '<span class="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold">開始前</span>';
    if (m.status === "IN_PROGRESS")
        statusBadge = '<span class="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded font-black animate-pulse">進行中</span>';
    if (m.status === "FINISHED")
        statusBadge = '<span class="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">✓ 終了</span>';
    return `
    <div class="surface-card rounded-2xl p-3 space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500/60">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          ${statusBadge}
          <span class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">${m.court}</span>
          <span class="font-black text-xs text-slate-800 dark:text-slate-100">${matchTitleDisplay}</span>
          <span class="text-[10px] bg-sky-500/10 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded-full font-bold">${m.format === "league" ? "総当たり" : m.format === "tournament" ? "トーナメント" : "単発"}</span>
        </div>

        <div class="flex items-center gap-2 ml-auto">
          <div class="text-right">
            <span class="text-[10px] text-slate-400 font-bold">定刻 ${m.start}</span>
            <span class="text-xs font-mono font-black ${isDelayed ? "text-rose-500" : "text-slate-800 dark:text-slate-100"} ml-1">
              [${adjStart} - ${adjEnd}]
            </span>
          </div>
          <div class="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-2">
            <button onclick="applyCascadeOffset('${m.id}', -1)" class="action-btn bg-sky-50 dark:bg-sky-950 hover:bg-sky-100 border border-sky-300 dark:border-sky-500/30 text-sky-600 dark:text-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded">-1分</button>
            <button onclick="applyCascadeOffset('${m.id}', 1)" class="action-btn bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 border border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded">+1分</button>
            <button onclick="openModal('${m.id}')" class="action-btn bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"><i class="fa-solid fa-gear"></i></button>
          </div>
        </div>
      </div>

      <div class="bg-slate-50/90 dark:bg-slate-950/80 p-2.5 rounded-xl flex flex-wrap justify-between items-center gap-2 border border-slate-200 dark:border-slate-800/80">
        <div class="flex items-center gap-2 w-full sm:w-auto justify-center">
          <span class="font-black text-xs text-slate-700 dark:text-slate-200 min-w-[3rem] text-right">${m.teamA || "チームA"}</span>
          ${createScoreSelect(m.id, "A", m.scoreA)}
          <span class="font-black text-slate-400 text-xs">VS</span>
          ${createScoreSelect(m.id, "B", m.scoreB)}
          <span class="font-black text-xs text-slate-700 dark:text-slate-200 min-w-[3rem] text-left">${m.teamB || "チームB"}</span>
        </div>

        <div class="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button onclick="quickSaveScore('${m.id}', 'IN_PROGRESS')" class="action-btn bg-amber-200 hover:bg-amber-300 text-slate-800 font-black text-[11px] px-2.5 py-1.5 rounded-lg transition shadow-sm border border-amber-300">
            進行中にする
          </button>
          <button onclick="quickSaveScore('${m.id}', 'FINISHED')" class="action-btn bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-[11px] px-3 py-1.5 rounded-lg transition shadow-md">
            スコア決定 & 終了
          </button>
        </div>
      </div>
    </div>
  `;
}
function toggleGroupExpand(gKey) {
    appState.expandedGroups[gKey] = appState.expandedGroups[gKey] === true ? false : true;
    renderTimeline();
}
function quickSaveScore(matchId, newStatus) {
    const m = appState.schedule.find((item) => item.id === matchId);
    if (!m)
        return;
    const valA = document.getElementById(`inputScoreA_${matchId}`)?.value ?? "";
    const valB = document.getElementById(`inputScoreB_${matchId}`)?.value ?? "";
    m.scoreA = valA !== "" ? Math.min(50, Math.max(0, parseInt(valA, 10) || 0)) : null;
    m.scoreB = valB !== "" ? Math.min(50, Math.max(0, parseInt(valB, 10) || 0)) : null;
    m.status = newStatus;
    updateTournamentBracket(m.blockId);
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    calculateScoresAndRanks();
    renderResultsTab();
}
function getWinner(match) {
    if (match.status !== "FINISHED" || match.scoreA === null || match.scoreB === null || match.scoreA === match.scoreB)
        return null;
    return match.scoreA > match.scoreB ? match.teamA : match.teamB;
}
function getLoser(match) {
    if (match.status !== "FINISHED" || match.scoreA === null || match.scoreB === null || match.scoreA === match.scoreB)
        return null;
    return match.scoreA < match.scoreB ? match.teamA : match.teamB;
}
function updateTournamentBracket(blockId) {
    if (!blockId)
        return;
    const blockMatches = appState.schedule.filter((match) => match.blockId === blockId && match.format === "tournament");
    const semiOne = blockMatches.find((match) => match.title === "準決勝1");
    const semiTwo = blockMatches.find((match) => match.title === "準決勝2");
    const thirdPlace = blockMatches.find((match) => match.title === "3位決定戦");
    const final = blockMatches.find((match) => match.title === "決勝");
    if (!semiOne || !semiTwo)
        return;
    const winnerOne = getWinner(semiOne);
    const winnerTwo = getWinner(semiTwo);
    const loserOne = getLoser(semiOne);
    const loserTwo = getLoser(semiTwo);
    if (final) {
        final.teamA = winnerOne ?? "準決勝1の勝者";
        final.teamB = winnerTwo ?? "準決勝2の勝者";
    }
    if (thirdPlace) {
        thirdPlace.teamA = loserOne ?? "準決勝1の敗者";
        thirdPlace.teamB = loserTwo ?? "準決勝2の敗者";
    }
}
function applyCascadeOffset(targetMatchId, diffMins) {
    const target = appState.schedule.find((m) => m.id === targetMatchId);
    if (!target)
        return;
    const courtMatches = appState.schedule
        .filter((m) => m.court === target.court)
        .sort((a, b) => a.start.localeCompare(b.start));
    const targetIndex = courtMatches.findIndex((m) => m.id === targetMatchId);
    for (let i = targetIndex; i < courtMatches.length; i++) {
        courtMatches[i].offsetMins += diffMins;
    }
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    if (!document.getElementById("sec-gantt")?.classList.contains("hidden"))
        renderGantt();
}
function renderGantt() {
    const container = document.getElementById("ganttContainer");
    const filterValue = document.getElementById("ganttCourtFilter")?.value ?? "ALL";
    const courts = filterValue === "ALL" ? ["上グラ", "下グラ", "体育館", "ハード", "オムニ", "卓球場"] : [filterValue];
    const startH = 8;
    const endH = 16;
    const totalMins = (endH - startH) * 60;
    let html = `<div class="relative border-b border-slate-200 dark:border-slate-800 pb-2 mb-3 flex text-[10px] font-mono font-bold text-slate-400 pl-24">`;
    for (let h = startH; h <= endH; h++) {
        const leftP = ((h - startH) * 60 / totalMins) * 100;
        html += `<div class="absolute" style="left: ${leftP}%">${String(h).padStart(2, "0")}:00</div>`;
    }
    html += `</div>`;
    courts.forEach((court) => {
        const matches = appState.schedule
            .filter((m) => m.court === court)
            .sort((a, b) => a.start.localeCompare(b.start));
        const grouped = {};
        matches.forEach((m) => {
            const key = `${m.grade}｜${m.sport}`;
            if (!grouped[key])
                grouped[key] = [];
            grouped[key].push(m);
        });
        html += `<div class="mb-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">`;
        html += `<div class="flex items-center justify-between bg-slate-100 dark:bg-slate-800/80 px-3 py-2 border-b border-slate-200 dark:border-slate-700"><div class="font-black text-xs text-slate-700 dark:text-slate-200"><i class="fa-solid fa-location-dot text-sky-500 mr-2"></i>${court}</div><div class="text-[10px] text-slate-400 font-bold">${matches.length} 試合</div></div>`;
        Object.entries(grouped).forEach(([groupKey, groupMatches]) => {
            const [grade, sport] = groupKey.split("｜");
            html += `<div class="border-b border-slate-100 dark:border-slate-800/70 px-3 py-2 bg-slate-50/60 dark:bg-slate-950/40"><div class="font-black text-[10px] text-slate-500 dark:text-slate-400 mb-2">${grade} / ${sport}</div><div class="relative h-12">`;
            groupMatches.forEach((m) => {
                const adjStart = calcAdjustedTime(m.start, m.offsetMins);
                const adjEnd = calcAdjustedTime(m.end, m.offsetMins);
                const [sH, sM] = adjStart.split(":").map(Number);
                const [eH, eM] = adjEnd.split(":").map(Number);
                const sMins = (sH - startH) * 60 + sM;
                const eMins = (eH - startH) * 60 + eM;
                const left = (sMins / totalMins) * 100;
                const width = Math.max(((eMins - sMins) / totalMins) * 100, 2);
                let bgClass = "bg-slate-500 text-white";
                if (m.status === "IN_PROGRESS")
                    bgClass = "bg-amber-500 text-slate-950 font-black animate-pulse";
                if (m.status === "FINISHED")
                    bgClass = "bg-emerald-500 text-white";
                html += `
            <button type="button" onclick="openModal('${m.id}')" class="absolute top-1 bottom-1 rounded-md px-2 text-[9px] font-bold flex items-center justify-between shadow-sm border border-white/20 ${bgClass}"
              style="left: ${left}%; width: ${width}%;" title="${getMatchOpponentText(m)} (${adjStart}-${adjEnd})">
              <span class="truncate">${getMatchOpponentText(m)}</span>
            </button>
          `;
            });
            html += `</div></div>`;
        });
        html += `</div>`;
    });
    html += '<div id="ganttTimeBar" class="absolute top-8 bottom-0 w-0.5 bg-rose-500 z-20 pointer-events-none"><div class="bg-rose-500 text-white text-[8px] px-1 rounded -ml-3 -mt-3 font-mono font-bold">現在</div></div>';
    if (container)
        container.innerHTML = html;
}
function updateGanttTimeBar(now) {
    const bar = document.getElementById("ganttTimeBar");
    if (!bar)
        return;
    const startH = 8;
    const endH = 16;
    const totalMins = (endH - startH) * 60;
    const curMins = (now.getHours() - startH) * 60 + now.getMinutes() + now.getSeconds() / 60;
    if (curMins >= 0 && curMins <= totalMins) {
        const p = (curMins / totalMins) * 100;
        bar.style.left = `calc(5rem + (100% - 5rem) * ${p / 100})`;
        bar.style.display = "block";
    }
    else {
        bar.style.display = "none";
    }
}
function calculateTeamScoreTotals(schedule = appState.schedule) {
    const totals = { A: 0, B: 0, C: 0, D: 0 };
    schedule.forEach((match) => {
        if (typeof match.scoreA === "number")
            totals.A += match.scoreA;
        if (typeof match.scoreB === "number")
            totals.B += match.scoreB;
        if (typeof match.scoreC === "number")
            totals.C += match.scoreC;
        if (typeof match.scoreD === "number")
            totals.D += match.scoreD;
    });
    return totals;
}
function getTimeConfigGroups() {
    const groups = new Map();
    appState.schedule.forEach((match) => {
        const key = match.blockId || `${match.grade}-${match.sport}-${match.court}-${match.title}`;
        const label = `${match.grade}・${match.sport}・${match.court}`;
        if (!groups.has(key)) {
            groups.set(key, {
                key,
                label,
                matches: []
            });
        }
        groups.get(key).matches.push(match);
    });
    return [...groups.values()].sort((a, b) => a.label.localeCompare(b.label));
}
function refreshTeamScoreSummary() {
    const summaryEl = document.getElementById("teamScoreSummary");
    if (!summaryEl)
        return;
    const totals = calculateTeamScoreTotals();
    summaryEl.innerHTML = `
      <div class="grid grid-cols-4 gap-2 text-[10px] font-black">
        <div class="rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/20 px-2 py-1.5 text-center text-rose-700 dark:text-rose-300">A 組<br><span class="text-sm text-slate-900 dark:text-slate-100">${totals.A}</span></div>
        <div class="rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-500/20 px-2 py-1.5 text-center text-sky-700 dark:text-sky-300">B 組<br><span class="text-sm text-slate-900 dark:text-slate-100">${totals.B}</span></div>
        <div class="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 px-2 py-1.5 text-center text-amber-700 dark:text-amber-300">C 組<br><span class="text-sm text-slate-900 dark:text-slate-100">${totals.C}</span></div>
        <div class="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 px-2 py-1.5 text-center text-emerald-700 dark:text-emerald-300">D 組<br><span class="text-sm text-slate-900 dark:text-slate-100">${totals.D}</span></div>
      </div>
    `;
}
function renderTimeConfigEditor() {
    const select = document.getElementById("timeConfigBlockSelect");
    const container = document.getElementById("timeConfigList");
    if (!select || !container)
        return;
    const groups = getTimeConfigGroups();
    if (groups.length === 0) {
        container.innerHTML = '<div class="text-xs text-slate-400 font-bold">設定する試合がありません</div>';
        return;
    }
    const currentValue = select.value || groups[0].key;
    select.innerHTML = groups.map((group) => `<option value="${group.key}">${group.label} (${group.matches.length}試合)</option>`).join("");
    select.value = groups.some((group) => group.key === currentValue) ? currentValue : groups[0].key;
    const activeGroup = groups.find((group) => group.key === select.value) || groups[0];
    refreshTeamScoreSummary();
    container.innerHTML = activeGroup.matches
        .sort((a, b) => a.start.localeCompare(b.start))
        .map((match) => `
            <div class="time-setting-row">
                <div class="text-[11px] font-black text-slate-700 dark:text-slate-200">${match.title || match.sport}</div>
                <label class="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <span>開始</span>
                    <input type="time" value="${match.start}" data-match-id="${match.id}" data-field="start" class="time-config-input w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-100" />
                </label>
                <label class="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    <span>終了</span>
                    <input type="time" value="${match.end}" data-match-id="${match.id}" data-field="end" class="time-config-input w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-100" />
                </label>
            </div>
        `)
        .join("");
}
function saveTimeConfig() {
    const container = document.getElementById("timeConfigList");
    if (!container)
        return;
    const inputs = container.querySelectorAll("input[type='time']");
    inputs.forEach((input) => {
        const match = appState.schedule.find((item) => item.id === input.dataset.matchId);
        if (!match)
            return;
        const value = input.value;
        if (!value)
            return;
        if (input.dataset.field === "start")
            match.start = value;
        if (input.dataset.field === "end")
            match.end = value;
    });
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    renderGantt();
    renderResultsTab();
    alert("試合時間を保存しました。");
}
function exportResultsCsv() {
    const rows = [["学年", "競技", "場", "試合名", "A組", "A点", "B組", "B点", "状態", "開始", "終了"]];
    appState.schedule.forEach((match) => {
        rows.push([
            match.grade,
            match.sport,
            match.court,
            match.title,
            match.teamA,
            match.scoreA ?? "",
            match.teamB,
            match.scoreB ?? "",
            match.status,
            match.start,
            match.end
        ]);
    });
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sportsfes_results.csv";
    a.click();
    URL.revokeObjectURL(url);
}
function getAvailableSports() {
    const defaults = ["サッカー", "バスケ", "バレー", "アルティメット", "ドッジボール", "卓球", "野球"];
    const fromSchedule = appState.schedule.map((match) => match.sport).filter(Boolean);
    return [...new Set([...defaults, ...fromSchedule])];
}
function refreshSportSelectors() {
    const addSportSelect = document.getElementById("addSport");
    const deleteSportSelect = document.getElementById("deleteSportSelect");
    const deleteGradeSelect = document.getElementById("deleteGradeSelect");
    const deleteCourtSelect = document.getElementById("deleteCourtSelect");
    const sports = getAvailableSports();
    if (addSportSelect) {
        const currentValue = addSportSelect.value || sports[0];
        addSportSelect.innerHTML = sports.map((sport) => `<option value="${sport}">${sport}</option>`).join("");
        addSportSelect.value = sports.includes(currentValue) ? currentValue : sports[0];
    }
    if (deleteSportSelect) {
        const currentValue = deleteSportSelect.value || sports[0];
        deleteSportSelect.innerHTML = sports.map((sport) => `<option value="${sport}">${sport}</option>`).join("");
        deleteSportSelect.value = sports.includes(currentValue) ? currentValue : sports[0];
    }
    if (deleteGradeSelect) {
        const currentValue = deleteGradeSelect.value || "ALL";
        deleteGradeSelect.value = ["ALL", "中1", "中2", "中3", "高1", "高2", "高3"].includes(currentValue) ? currentValue : "ALL";
    }
    if (deleteCourtSelect) {
        const currentValue = deleteCourtSelect.value || "ALL";
        deleteCourtSelect.value = ["ALL", "上グラ", "下グラ", "体育館", "ハード", "オムニ", "卓球場"].includes(currentValue) ? currentValue : "ALL";
    }
}
function deleteSelectedCompetition() {
    const deleteSportSelect = document.getElementById("deleteSportSelect");
    const deleteGradeSelect = document.getElementById("deleteGradeSelect");
    const deleteCourtSelect = document.getElementById("deleteCourtSelect");
    const deletePassword = document.getElementById("deleteConfirmationPassword")?.value ?? "";
    if (!deleteSportSelect || !deleteGradeSelect || !deleteCourtSelect)
        return;
    if (deletePassword !== "admin123") {
        alert("削除の再認証に失敗しました。管理者パスワードを入力してください。");
        return;
    }
    const sportToDelete = deleteSportSelect.value;
    const gradeToDelete = deleteGradeSelect.value;
    const courtToDelete = deleteCourtSelect.value;
    if (!sportToDelete)
        return;
    const targetMatches = appState.schedule.filter((match) => {
        const sportMatch = match.sport === sportToDelete;
        const gradeMatch = gradeToDelete === "ALL" || match.grade === gradeToDelete;
        const courtMatch = courtToDelete === "ALL" || match.court === courtToDelete;
        return sportMatch && gradeMatch && courtMatch;
    });
    if (targetMatches.length === 0) {
        alert("削除対象の試合がありません。条件を見直してください。");
        return;
    }
    const summary = `${sportToDelete}${gradeToDelete === "ALL" ? " 全学年" : ` / ${gradeToDelete}`} ${courtToDelete === "ALL" ? "全会場" : ` / ${courtToDelete}`}`;
    if (!confirm(`${summary} に一致する ${targetMatches.length}件を削除しますか？`))
        return;
    appState.schedule = appState.schedule.filter((match) => !(
        match.sport === sportToDelete &&
        (gradeToDelete === "ALL" || match.grade === gradeToDelete) &&
        (courtToDelete === "ALL" || match.court === courtToDelete)
    ));
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    renderResultsTab();
    renderGantt();
    renderTimeConfigEditor();
    refreshSportSelectors();
    const passwordField = document.getElementById("deleteConfirmationPassword");
    if (passwordField)
        passwordField.value = "";
    alert(`${summary} の試合を削除しました。`);
}
function renderResultsTab() {
    const container = document.getElementById("resultsContentContainer");
    const gradeFilter = document.getElementById("resultGradeFilter")?.value ?? "ALL";
    if (!container)
        return;
    container.innerHTML = "";
    const categories = {};
    appState.schedule.forEach((m) => {
        if (gradeFilter !== "ALL" && m.grade !== gradeFilter)
            return;
        const key = m.blockId ?? `${m.grade} - ${m.sport}`;
        if (!categories[key]) {
            categories[key] = {
                grade: m.grade,
                sport: m.sport,
                format: m.format,
                matches: [],
                blockTitle: m.blockTitle ?? "競技ブロック"
            };
        }
        categories[key].matches.push(m);
    });
    if (Object.keys(categories).length === 0) {
        container.innerHTML = '<div class="col-span-2 text-center py-8 text-xs text-slate-400 font-bold">該当する試合結果データはありません</div>';
        return;
    }
    Object.keys(categories).forEach((key) => {
        const cat = categories[key];
        const card = document.createElement("div");
        card.className = "surface-card rounded-2xl p-4 space-y-3";
        let matchesListHtml = "";
        cat.matches.forEach((m) => {
            const hasScore = Number.isFinite(m.scoreA) && Number.isFinite(m.scoreB);
            matchesListHtml += `
        <div class="flex justify-between items-center text-xs bg-slate-50/90 dark:bg-slate-950/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span class="font-bold text-slate-500">${m.title}</span>
          <div class="font-bold font-mono">
            <span class="${hasScore && m.scoreA > m.scoreB ? "text-sky-500 font-black" : "text-slate-700 dark:text-slate-300"}">${m.teamA} (${m.scoreA ?? "-"})</span>
            <span class="text-slate-400 mx-1">vs</span>
            <span class="${hasScore && m.scoreB > m.scoreA ? "text-sky-500 font-black" : "text-slate-700 dark:text-slate-300"}">${m.teamB} (${m.scoreB ?? "-"})</span>
          </div>
        </div>
      `;
        });
        const standings = calculateCompetitionStandings(cat.matches, cat.format);
        const tournamentComplete = cat.format !== "tournament"
            || (cat.matches.some((match) => match.title === "決勝" && match.status === "FINISHED")
                && cat.matches.some((match) => match.title === "3位決定戦" && match.status === "FINISHED"));
        const standingsHtml = `
      <div class="overflow-x-auto">
        <table class="w-full text-[11px] min-w-[420px]">
          <thead><tr class="text-left text-slate-400 border-b border-slate-200 dark:border-slate-800"><th class="py-1">順位</th><th>組</th><th>勝</th><th>分</th><th>敗</th><th>競技点</th></tr></thead>
          <tbody>${standings.map((standing) => `<tr class="border-b border-slate-100 dark:border-slate-800/70"><td class="py-1.5 font-black">${tournamentComplete || cat.format !== "tournament" ? `${standing.rank}位` : "未確定"}</td><td class="font-black">${standing.team}</td><td>${standing.wins}</td><td>${standing.draws}</td><td>${standing.losses}</td><td class="font-black text-sky-600 dark:text-sky-400">${tournamentComplete ? `${standing.rankPoints}pt` : "-"}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    `;
        card.innerHTML = `
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded-full shadow-sm">${cat.grade}</span>
          <h3 class="font-black text-xs text-slate-800 dark:text-slate-100">${cat.blockTitle}｜${cat.sport}</h3>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
          ${cat.format === "league" ? "総当たり戦" : cat.format === "tournament" ? "トーナメント" : "単発形式"}
        </span>
      </div>

      <div class="text-[10px] font-bold text-slate-400">${cat.format === "league" ? "勝利 3pt / 引き分け 1pt / 敗戦 0pt" : cat.format === "tournament" ? `決勝・3位決定戦 ${tournamentComplete ? "終了｜順位確定" : "終了後に順位確定"}` : "勝利 30pt"}</div>

      <div class="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-2.5">
        <div class="text-[10px] font-black text-slate-500 dark:text-slate-400 mb-1.5">ブロック順位と得点割</div>
        ${standingsHtml}
      </div>

      <div class="space-y-1.5">
        <div class="text-[10px] font-bold text-slate-400">試合結果一覧:</div>
        ${matchesListHtml}
      </div>
    `;
        container.appendChild(card);
    });
}
function calculateCompetitionStandings(matches, format) {
    if (format === "tournament")
        return calculateTournamentStandings(matches);
    const teams = Array.from(new Set(matches.flatMap((match) => [match.teamA, match.teamB]).filter(Boolean)));
    const stats = {};
    teams.forEach((team) => { stats[team] = { wins: 0, draws: 0, losses: 0, points: 0, scored: 0, conceded: 0 }; });
    matches.filter((match) => match.status === "FINISHED" && Number.isFinite(match.scoreA) && Number.isFinite(match.scoreB)).forEach((match) => {
        const a = stats[match.teamA];
        const b = stats[match.teamB];
        if (!a || !b)
            return;
        a.scored += match.scoreA;
        a.conceded += match.scoreB;
        b.scored += match.scoreB;
        b.conceded += match.scoreA;
        if (match.scoreA > match.scoreB) {
            a.wins += 1;
            a.points += format === "league" ? 3 : 1;
            b.losses += 1;
        }
        else if (match.scoreB > match.scoreA) {
            b.wins += 1;
            b.points += format === "league" ? 3 : 1;
            a.losses += 1;
        }
        else {
            a.draws += 1;
            b.draws += 1;
            a.points += format === "league" ? 1 : 0.5;
            b.points += format === "league" ? 1 : 0.5;
        }
    });
    const pointRule = matches.find((match) => match.pointRule)?.pointRule ?? [150, 100, 50, 0];
    return teams
        .sort((a, b) => stats[b].points - stats[a].points || (stats[b].scored - stats[b].conceded) - (stats[a].scored - stats[a].conceded) || stats[b].scored - stats[a].scored)
        .map((team, index) => ({ ...stats[team], team, rank: index + 1, rankPoints: pointRule[index] ?? 0 }));
}
function calculateTournamentStandings(matches) {
    const pointRule = matches.find((match) => match.pointRule)?.pointRule ?? [150, 100, 50, 0];
    const stats = {};
    const ensureTeam = (team) => {
        if (team && !stats[team])
            stats[team] = { wins: 0, draws: 0, losses: 0, points: 0 };
    };
    matches.forEach((match) => { ensureTeam(match.teamA); ensureTeam(match.teamB); });
    matches.filter((match) => match.status === "FINISHED" && Number.isFinite(match.scoreA) && Number.isFinite(match.scoreB)).forEach((match) => {
        ensureTeam(match.teamA);
        ensureTeam(match.teamB);
        if (match.scoreA === match.scoreB) {
            stats[match.teamA].draws += 1;
            stats[match.teamB].draws += 1;
            return;
        }
        const winner = match.scoreA > match.scoreB ? match.teamA : match.teamB;
        const loser = match.scoreA > match.scoreB ? match.teamB : match.teamA;
        stats[winner].wins += 1;
        stats[winner].points += 1;
        stats[loser].losses += 1;
    });
    const final = matches.find((match) => match.title === "決勝");
    const thirdPlace = matches.find((match) => match.title === "3位決定戦");
    const rankedTeams = [];
    const addRankedTeam = (team) => {
        if (team && !rankedTeams.includes(team))
            rankedTeams.push(team);
    };
    if (final) {
        addRankedTeam(getWinner(final));
        if (final.status === "FINISHED" && Number.isFinite(final.scoreA) && Number.isFinite(final.scoreB) && final.scoreA !== final.scoreB) {
            addRankedTeam(getLoser(final));
        }
    }
    if (thirdPlace) {
        addRankedTeam(getWinner(thirdPlace));
        if (thirdPlace.status === "FINISHED" && Number.isFinite(thirdPlace.scoreA) && Number.isFinite(thirdPlace.scoreB) && thirdPlace.scoreA !== thirdPlace.scoreB) {
            addRankedTeam(getLoser(thirdPlace));
        }
    }
    Object.keys(stats).forEach((team) => addRankedTeam(team));
    return rankedTeams.map((team, index) => ({
        team,
        ...stats[team],
        rank: index + 1,
        rankPoints: index < 4 && final?.status === "FINISHED" && thirdPlace?.status === "FINISHED" ? pointRule[index] ?? 0 : 0
    }));
}
function calculateScoresAndRanks() {
    const totals = { A: 0, B: 0, C: 0, D: 0 };
    const categories = {};
    appState.schedule.forEach((match) => {
        const key = `${match.grade} - ${match.sport}`;
        if (!categories[key])
            categories[key] = [];
        categories[key].push(match);
    });
    Object.values(categories).forEach((matches) => {
        calculateCompetitionStandings(matches, matches[0].format).forEach((standing) => {
            if (totals[standing.team] !== undefined)
                totals[standing.team] += standing.rankPoints;
        });
    });
    const scoreDisplayA = document.getElementById("scoreDisplayA");
    const scoreDisplayB = document.getElementById("scoreDisplayB");
    const scoreDisplayC = document.getElementById("scoreDisplayC");
    const scoreDisplayD = document.getElementById("scoreDisplayD");
    if (scoreDisplayA)
        scoreDisplayA.innerHTML = `${totals.A} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
    if (scoreDisplayB)
        scoreDisplayB.innerHTML = `${totals.B} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
    if (scoreDisplayC)
        scoreDisplayC.innerHTML = `${totals.C} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
    if (scoreDisplayD)
        scoreDisplayD.innerHTML = `${totals.D} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
}
function applyBulkOperations() {
    const court = document.getElementById("bulkCourt")?.value ?? "ALL";
    const status = document.getElementById("bulkStatus")?.value ?? "NO_CHANGE";
    const delay = Number(document.getElementById("bulkDelay")?.value ?? 0);
    const targets = appState.schedule.filter((match) => court === "ALL" || match.court === court);
    if (targets.length === 0) {
        alert("対象となる試合がありません。");
        return;
    }
    if (status !== "NO_CHANGE") {
        targets.forEach((match) => { match.status = status; });
    }
    if (Number.isFinite(delay) && delay !== 0) {
        targets.forEach((match) => { match.offsetMins += delay; });
    }
    saveState();
    renderCourtDelaySummary();
    renderTimeline();
    renderResultsTab();
    calculateScoresAndRanks();
    if (!document.getElementById("sec-gantt")?.classList.contains("hidden"))
        renderGantt();
    alert(`${targets.length}試合に一括反映しました。`);
}
function createNewMatch() {
    const grade = document.getElementById("addGrade")?.value ?? "中1";
    const sport = document.getElementById("addSport")?.value.trim() ?? "";
    const format = document.getElementById("addFormat")?.value ?? "tournament";
    const court = document.getElementById("addCourt")?.value ?? "上グラ";
    const title = document.getElementById("addTitle")?.value.trim() ?? "";
    const teamA = document.getElementById("addTeamA")?.value.trim() || "A組";
    const teamB = document.getElementById("addTeamB")?.value.trim() || "B組";
    const start = document.getElementById("addStartTime")?.value ?? "09:00";
    const end = document.getElementById("addEndTime")?.value ?? "09:30";
    const pointRule = getAddPointRule();
    if (!sport || !title) {
        alert("競技名と試合タイトルを入力してください。");
        return;
    }
    const newMatch = {
        id: "m_" + Date.now(),
        court,
        sport,
        grade,
        title,
        format,
        teamA,
        teamB,
        scoreA: null,
        scoreB: null,
        start,
        end,
        referee: "",
        staff: "",
        status: "BEFORE",
        offsetMins: 0,
        pointRule
    };
    appState.schedule.push(newMatch);
    saveState();
    refreshSportSelectors();
    renderTimeline();
    renderCourtDelaySummary();
    renderTimeConfigEditor();
    alert(`「${title} (${format === "league" ? "総当たり" : "トーナメント"})」を作成追加しました！`);
    const titleInput = document.getElementById("addTitle");
    if (titleInput)
        titleInput.value = "";
}
function parsePointRule(value) {
    const values = value.split(",").map((item) => Number(item.trim()));
    return [0, 1, 2, 3].map((index) => Number.isFinite(values[index]) ? Math.max(0, values[index]) : 0);
}
function getAddPointRule() {
    const input = document.getElementById("addPointRule");
    return parsePointRule(input?.value || "150,100,50,0");
}
function addMinutesToTime(time, minutes) {
    const [hours, mins] = time.split(":").map(Number);
    const total = hours * 60 + mins + minutes;
    return `${String(Math.floor((total % 1440 + 1440) % 1440 / 60)).padStart(2, "0")}:${String((total % 60 + 60) % 60).padStart(2, "0")}`;
}
function createCompetitionBlock() {
    const grade = document.getElementById("addGrade")?.value ?? "中1";
    const sport = document.getElementById("addSport")?.value.trim() ?? "";
    const format = document.getElementById("addFormat")?.value ?? "league";
    const court = document.getElementById("addCourt")?.value ?? "上グラ";
    const start = document.getElementById("addStartTime")?.value ?? "09:00";
    const end = document.getElementById("addEndTime")?.value ?? "09:30";
    if (!sport) {
        alert("競技名を入力してください。");
        return;
    }
    const [startHour, startMinute] = start.split(":").map(Number);
    const duration = Math.max(15, (Number(end.split(":")[0]) * 60 + Number(end.split(":")[1])) - (startHour * 60 + startMinute));
    const blockId = `block_${Date.now()}`;
    const blockTitle = document.getElementById("addTitle")?.value.trim() || "第1試合";
    const pointRule = getAddPointRule();
    const definitions = format === "league"
        ? [
            ["第1節", "A", "B"], ["第2節", "A", "C"], ["第3節", "A", "D"],
            ["第4節", "B", "C"], ["第5節", "B", "D"], ["第6節", "C", "D"]
        ]
        : [
            ["準決勝1", "A", "B"], ["準決勝2", "C", "D"],
            ["3位決定戦", "敗者1", "敗者2"], ["決勝", "勝者1", "勝者2"]
        ];
    definitions.forEach((definition, index) => {
        appState.schedule.push({
            id: `${blockId}_${index + 1}`,
            blockId,
            blockTitle,
            court,
            sport,
            grade,
            title: definition[0],
            format,
            teamA: definition[1],
            teamB: definition[2],
            scoreA: null,
            scoreB: null,
            start: addMinutesToTime(start, index * (duration + 5)),
            end: addMinutesToTime(start, index * (duration + 5) + duration),
            referee: "",
            staff: "",
            status: "BEFORE",
            offsetMins: 0,
            pointRule
        });
    });
    saveState();
    refreshSportSelectors();
    renderTimeline();
    renderCourtDelaySummary();
    renderResultsTab();
    renderTimeConfigEditor();
    alert(`${grade} ${sport}の${format === "league" ? "総当たり" : "トーナメント"}ブロックを${definitions.length}試合作成しました。`);
}
function openModal(matchId) {
    const m = appState.schedule.find((item) => item.id === matchId);
    if (!m)
        return;
    document.getElementById("modalMatchId").value = m.id;
    document.getElementById("modalMatchDetail").innerText = `${m.title} (${m.grade} ${m.sport})`;
    document.getElementById("modalCourtDetail").innerText = `場所: ${m.court}`;
    document.getElementById("modalTimeDetail").innerText = `定刻: ${m.start} - ${m.end}`;
    document.getElementById("inputMatchTitle").value = m.title;
    document.getElementById("inputTeamA").value = m.teamA;
    document.getElementById("inputTeamB").value = m.teamB;
    document.getElementById("inputModalScoreA").value = m.scoreA === null ? "" : String(m.scoreA);
    document.getElementById("inputModalScoreB").value = m.scoreB === null ? "" : String(m.scoreB);
    setModalStatus(m.status || "BEFORE");
    document.getElementById("inputDelayMinutes").value = String(m.offsetMins);
    document.getElementById("inputReferee").value = m.referee;
    document.getElementById("inputStaff").value = m.staff;
    document.getElementById("inputCompetitionPoints").value = (m.pointRule ?? [150, 100, 50, 0]).join(",");
    document.getElementById("editModal")?.classList.remove("hidden");
}
function closeModal() {
    document.getElementById("editModal")?.classList.add("hidden");
}
function setModalStatus(st) {
    appState.selectedModalStatus = st;
    ["BEFORE", "IN_PROGRESS", "FINISHED"].forEach((s) => {
        const btn = document.getElementById(`statusBtn${s}`);
        if (!btn)
            return;
        if (s === st) {
            btn.className = "py-1.5 border rounded-lg font-bold text-xs bg-sky-500 text-white border-sky-500";
        }
        else {
            btn.className = "py-1.5 border rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700";
        }
    });
}
function setModalDelay(val) {
    document.getElementById("inputDelayMinutes").value = String(val);
}
function saveModalData() {
    const matchId = document.getElementById("modalMatchId").value;
    const m = appState.schedule.find((item) => item.id === matchId);
    if (!m)
        return;
    const newOffset = parseInt(document.getElementById("inputDelayMinutes").value, 10) || 0;
    const diff = newOffset - m.offsetMins;
    m.status = appState.selectedModalStatus;
    m.title = document.getElementById("inputMatchTitle").value.trim() || m.title;
    m.teamA = document.getElementById("inputTeamA").value.trim() || m.teamA;
    m.teamB = document.getElementById("inputTeamB").value.trim() || m.teamB;
    const scoreA = document.getElementById("inputModalScoreA").value;
    const scoreB = document.getElementById("inputModalScoreB").value;
    m.scoreA = scoreA === "" ? null : Math.max(0, parseInt(scoreA, 10) || 0);
    m.scoreB = scoreB === "" ? null : Math.max(0, parseInt(scoreB, 10) || 0);
    updateTournamentBracket(m.blockId);
    m.referee = document.getElementById("inputReferee").value;
    m.staff = document.getElementById("inputStaff").value;
    m.pointRule = parsePointRule(document.getElementById("inputCompetitionPoints").value);
    if (diff !== 0) {
        applyCascadeOffset(m.id, diff);
    }
    else {
        saveState();
        renderTimeline();
        renderCourtDelaySummary();
    }
    renderTimeConfigEditor();
    closeModal();
}
function authenticateAdmin() {
    const pass = document.getElementById("adminPasswordInput")?.value ?? "";
    if (pass === "admin123") {
        appState.isAdmin = true;
        document.getElementById("adminAuthOverlay")?.classList.add("hidden");
        document.getElementById("adminContent")?.classList.remove("hidden");
        renderCourtDelaySummary();
    }
    else {
        document.getElementById("authError")?.classList.remove("hidden");
    }
}
function lockAdmin() {
    appState.isAdmin = false;
    document.getElementById("adminAuthOverlay")?.classList.remove("hidden");
    document.getElementById("adminContent")?.classList.add("hidden");
    const passwordInput = document.getElementById("adminPasswordInput");
    if (passwordInput)
        passwordInput.value = "";
}
function broadcastAnnouncement() {
    const txt = document.getElementById("announcementInput")?.value ?? "";
    if (!txt)
        return;
    appState.announcement = txt;
    saveState();
    showAnnouncement(txt);
}
function clearAnnouncement() {
    appState.announcement = "";
    saveState();
    document.getElementById("announcementBar")?.classList.add("hidden");
}
function showAnnouncement(txt) {
    const announcementText = document.getElementById("announcementText");
    if (announcementText)
        announcementText.innerText = txt;
    document.getElementById("announcementBar")?.classList.remove("hidden");
}
function dismissAnnouncement() {
    document.getElementById("announcementBar")?.classList.add("hidden");
}
function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "gym78_ball_day_data.json");
    dl.click();
}
function isMatch(value) {
    if (!value || typeof value !== "object")
        return false;
    const match = value;
    return typeof match.id === "string"
        && typeof match.court === "string"
        && typeof match.sport === "string"
        && typeof match.grade === "string"
        && typeof match.title === "string"
        && ["tournament", "league", "single"].includes(match.format ?? "")
        && typeof match.teamA === "string"
        && typeof match.teamB === "string"
        && (match.scoreA === null || typeof match.scoreA === "number")
        && (match.scoreB === null || typeof match.scoreB === "number")
        && typeof match.start === "string"
        && typeof match.end === "string"
        && typeof match.referee === "string"
        && typeof match.staff === "string"
        && ["BEFORE", "IN_PROGRESS", "FINISHED"].includes(match.status ?? "")
        && typeof match.offsetMins === "number";
}
function importData(input) {
    const file = input.files?.[0];
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const imported = JSON.parse(String(reader.result));
            if (!Array.isArray(imported.schedule) || !imported.schedule.every(isMatch)) {
                throw new Error("invalid schedule");
            }
            appState.schedule = imported.schedule;
            appState.announcement = typeof imported.announcement === "string" ? imported.announcement : "";
            saveState();
            renderCourtDelaySummary();
            renderTimeline();
            renderResultsTab();
            renderTimeConfigEditor();
            calculateScoresAndRanks();
            if (appState.announcement)
                showAnnouncement(appState.announcement);
            else
                document.getElementById("announcementBar")?.classList.add("hidden");
            alert(`${appState.schedule.length}件の試合データを取り込みました。`);
        }
        catch {
            alert("データを読み込めませんでした。出力したJSONファイルを選択してください。");
        }
        finally {
            input.value = "";
        }
    };
    reader.readAsText(file);
}
function resetAllData() {
    if (confirm("全てのデータを初期状態にリセットしますか？")) {
        localStorage.clear();
        location.reload();
    }
}
window.toggleTheme = toggleTheme;
window.toggleContrast = toggleContrast;
window.switchTab = switchTab;
window.createNewMatch = createNewMatch;
window.createCompetitionBlock = createCompetitionBlock;
window.quickSaveScore = quickSaveScore;
window.applyCascadeOffset = applyCascadeOffset;
window.toggleGroupExpand = toggleGroupExpand;
window.setModalStatus = setModalStatus;
window.setModalDelay = setModalDelay;
window.saveModalData = saveModalData;
window.openModal = openModal;
window.closeModal = closeModal;
window.authenticateAdmin = authenticateAdmin;
window.lockAdmin = lockAdmin;
window.broadcastAnnouncement = broadcastAnnouncement;
window.clearAnnouncement = clearAnnouncement;
window.dismissAnnouncement = dismissAnnouncement;
window.renderTimeline = renderTimeline;
window.renderResultsTab = renderResultsTab;
window.renderCourtDelaySummary = renderCourtDelaySummary;
window.renderGantt = renderGantt;
window.setTimelineViewMode = setTimelineViewMode;
window.exportData = exportData;
window.importData = importData;
window.resetAllData = resetAllData;
window.applyBulkOperations = applyBulkOperations;
window.deleteSelectedCompetition = deleteSelectedCompetition;
window.deleteSelectedSport = deleteSelectedCompetition;
window.refreshSportSelectors = refreshSportSelectors;
window.initFirebaseSync = initFirebaseSync;
window.syncStateToFirebase = syncStateToFirebase;
