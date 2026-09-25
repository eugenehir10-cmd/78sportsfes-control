type MatchStatus = "BEFORE" | "IN_PROGRESS" | "FINISHED";
type MatchFormat = "tournament" | "league" | "single";

type Match = {
  id: string;
  court: string;
  sport: string;
  grade: string;
  title: string;
  format: MatchFormat;
  teamA: string;
  teamB: string;
  scoreA: number | null;
  scoreB: number | null;
  start: string;
  end: string;
  referee: string;
  staff: string;
  status: MatchStatus;
  offsetMins: number;
};

type AppState = {
  schedule: Match[];
  timelineViewMode: "grouped" | "byCourt";
  expandedGroups: Record<string, boolean>;
  selectedModalStatus: MatchStatus;
  isAdmin: boolean;
  announcement: string;
};

const INITIAL_SCHEDULE: Match[] = [
  { id: "m1", court: "上グラ", sport: "サッカー", grade: "中3", title: "準決勝1", format: "tournament", teamA: "A", teamB: "B", scoreA: 2, scoreB: 1, start: "08:50", end: "09:20", referee: "相山", staff: "神作", status: "FINISHED", offsetMins: 0 },
  { id: "m2", court: "上グラ", sport: "サッカー", grade: "中3", title: "準決勝2", format: "tournament", teamA: "C", teamB: "D", scoreA: 0, scoreB: 3, start: "09:25", end: "09:55", referee: "相山", staff: "神作", status: "FINISHED", offsetMins: 0 },
  { id: "m3", court: "上グラ", sport: "サッカー", grade: "中3", title: "決勝戦", format: "tournament", teamA: "A", teamB: "D", scoreA: null, scoreB: null, start: "10:10", end: "10:40", referee: "相山", staff: "神作", status: "IN_PROGRESS", offsetMins: 10 },
  { id: "m4", court: "上グラ", sport: "サッカー", grade: "高1", title: "準決勝1", format: "tournament", teamA: "A", teamB: "C", scoreA: null, scoreB: null, start: "10:45", end: "11:15", referee: "佐藤", staff: "鈴木", status: "BEFORE", offsetMins: 10 },

  { id: "m5", court: "下グラ", sport: "アルティメット", grade: "中3", title: "リーグ第1節", format: "league", teamA: "A", teamB: "B", scoreA: 12, scoreB: 8, start: "09:00", end: "09:40", referee: "田中", staff: "高橋", status: "FINISHED", offsetMins: 0 },
  { id: "m6", court: "下グラ", sport: "アルティメット", grade: "中3", title: "リーグ第2節", format: "league", teamA: "C", teamB: "D", scoreA: null, scoreB: null, start: "09:50", end: "10:30", referee: "田中", staff: "高橋", status: "IN_PROGRESS", offsetMins: 5 },

  { id: "m7", court: "体育館", sport: "バスケ", grade: "高2", title: "準決勝1", format: "tournament", teamA: "A", teamB: "D", scoreA: 42, scoreB: 38, start: "08:45", end: "09:25", referee: "渡辺", staff: "伊藤", status: "FINISHED", offsetMins: 0 },
  { id: "m8", court: "体育館", sport: "バスケ", grade: "高2", title: "準決勝2", format: "tournament", teamA: "B", teamB: "C", scoreA: 50, scoreB: 45, start: "09:30", end: "10:10", referee: "渡辺", staff: "伊藤", status: "FINISHED", offsetMins: 0 },
  { id: "m9", court: "体育館", sport: "バスケ", grade: "高2", title: "決勝戦", format: "tournament", teamA: "A", teamB: "B", scoreA: null, scoreB: null, start: "10:20", end: "11:00", referee: "渡辺", staff: "伊藤", status: "BEFORE", offsetMins: 0 }
];

let appState: AppState = {
  schedule: JSON.parse(localStorage.getItem("gym78_v4_schedule") ?? "null") || INITIAL_SCHEDULE,
  timelineViewMode: "grouped",
  expandedGroups: {},
  selectedModalStatus: "BEFORE",
  isAdmin: false,
  announcement: localStorage.getItem("gym78_v4_announcement") || ""
};

document.addEventListener("DOMContentLoaded", () => {
  startClock();
  renderCourtDelaySummary();
  renderTimeline();
  renderResultsTab();
  calculateScoresAndRanks();
  if (appState.announcement) showAnnouncement(appState.announcement);
});

function toggleTheme(): void {
  const html = document.documentElement;
  const btnText = document.getElementById("themeBtnText");
  if (!btnText) return;

  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    btnText.innerText = "ダークモード (暗いUI)";
  } else {
    html.classList.add("dark");
    btnText.innerText = "屋外モード (明るいUI)";
  }
}

function startClock(): void {
  const clockEl = document.getElementById("clockDisplay");
  if (!clockEl) return;

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

function saveState(): void {
  localStorage.setItem("gym78_v4_schedule", JSON.stringify(appState.schedule));
  localStorage.setItem("gym78_v4_announcement", appState.announcement);
}

function calcAdjustedTime(timeStr: string, offsetMins: number): string {
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m + offsetMins, 0, 0);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function switchTab(tabName: string): void {
  document.querySelectorAll<HTMLElement>("main > section").forEach((sec) => sec.classList.add("hidden"));
  document.querySelectorAll<HTMLElement>(".tab-btn").forEach((btn) => {
    btn.classList.remove("border-sky-500", "text-sky-600", "dark:text-sky-400");
    btn.classList.add("border-transparent", "text-slate-500", "dark:text-slate-400");
  });

  const target = document.getElementById(`sec-${tabName}`);
  if (target) target.classList.remove("hidden");

  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.add("border-sky-500", "text-sky-600", "dark:text-sky-400");
  }

  if (tabName === "gantt") renderGantt();
  if (tabName === "results") renderResultsTab();
}

function renderCourtDelaySummary(): void {
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
    } else if (maxOffset < 0) {
      badgeColor = "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-500/40 text-sky-600 dark:text-sky-400 font-bold";
      delayText = `${maxOffset}分 前倒し`;
    }

    summaryHtml += `
      <div class="stat-tile border rounded-2xl p-2.5 text-center shadow-sm ${badgeColor}">
        <div class="text-[10px] font-black tracking-[0.18em] uppercase opacity-80">${court}</div>
        <div class="mt-1 text-xs font-mono font-black">${delayText}</div>
        <div class="mt-1 text-[10px] opacity-80">${finishedCount}/${courtMatches.length} 完了</div>
        <div class="mt-1 text-[10px] truncate" title="${inProgress ? `進行中: ${inProgress.title}` : nextMatch ? `次: ${nextMatch.title}` : "試合なし"}">
          ${inProgress ? `進行中: ${inProgress.title}` : nextMatch ? `次: ${calcAdjustedTime(nextMatch.start, nextMatch.offsetMins)} ${nextMatch.title}` : "試合なし"}
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

  if (summaryContainer) summaryContainer.innerHTML = summaryHtml;
  if (adminMonitor) adminMonitor.innerHTML = adminMonitorHtml;
}

function setTimelineViewMode(mode: "grouped" | "byCourt"): void {
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

function renderTimeline(): void {
  const container = document.getElementById("timelineContainer");
  const courtFilter = (document.getElementById("courtFilter") as HTMLSelectElement | null)?.value ?? "ALL";
  const statusFilter = (document.getElementById("statusFilter") as HTMLSelectElement | null)?.value ?? "ALL";

  if (!container) return;
  container.innerHTML = "";

  const filtered = appState.schedule.filter((m) => {
    if (courtFilter !== "ALL" && m.court !== courtFilter) return false;
    if (statusFilter !== "ALL" && m.status !== statusFilter) return false;
    return true;
  });

  if (appState.timelineViewMode === "grouped") {
    const groups: Record<string, Match[]> = {};
    filtered.forEach((m) => {
      const key = `${m.grade} - ${m.sport}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });

    if (Object.keys(groups).length === 0) {
      container.innerHTML = '<div class="text-center py-8 text-xs text-slate-400 font-bold">該当する試合はありません</div>';
      return;
    }

    Object.keys(groups).forEach((gKey) => {
      const matches = groups[gKey];
      const isExpanded = appState.expandedGroups[gKey] !== false;
      const finishedCount = matches.filter((m) => m.status === "FINISHED").length;
      const inProgressCount = matches.filter((m) => m.status === "IN_PROGRESS").length;

      const groupCard = document.createElement("div");
      groupCard.className = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm";

      groupCard.innerHTML = `
        <div onclick="toggleGroupExpand('${gKey}')" class="p-3 flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-slate-100 dark:border-slate-800">
          <div class="flex items-center space-x-2.5">
            <span class="bg-sky-500 text-white font-black text-xs px-2.5 py-0.5 rounded-md">${gKey.split(" - ")[0]}</span>
            <h3 class="font-black text-sm text-slate-800 dark:text-slate-100">${gKey.split(" - ")[1]}</h3>
            <span class="text-[11px] text-slate-400 font-bold">(${matches.length}試合)</span>
          </div>

          <div class="flex items-center space-x-2">
            ${inProgressCount > 0 ? `<span class="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full animate-pulse">進行中 ${inProgressCount}</span>` : ""}
            <span class="text-[11px] font-bold text-slate-400">${finishedCount}/${matches.length} 完了</span>
            <i class="fa-solid fa-chevron-${isExpanded ? "up" : "down"} text-slate-400 text-xs ml-1"></i>
          </div>
        </div>

        ${isExpanded ? `<div class="p-2.5 bg-slate-50 dark:bg-slate-950/40 space-y-2">${matches.map((m) => createMatchItemHtml(m)).join("")}</div>` : ""}
      `;
      container.appendChild(groupCard);
    });
  } else {
    const courts = ["上グラ", "下グラ", "体育館", "ハード", "オムニ", "卓球場"];
    courts.forEach((court) => {
      const cMatches = filtered.filter((m) => m.court === court);
      if (cMatches.length === 0) return;

      const courtSec = document.createElement("div");
      courtSec.className = "space-y-2";
      courtSec.innerHTML = `
        <div class="text-xs font-black text-slate-500 dark:text-slate-400 flex items-center gap-1 pl-1">
          <i class="fa-solid fa-location-dot text-sky-500"></i> ${court}
        </div>
        <div class="space-y-2">${cMatches.map((m) => createMatchItemHtml(m)).join("")}</div>
      `;
      container.appendChild(courtSec);
    });
  }
}

function createMatchItemHtml(m: Match): string {
  const adjStart = calcAdjustedTime(m.start, m.offsetMins);
  const adjEnd = calcAdjustedTime(m.end, m.offsetMins);
  const isDelayed = m.offsetMins > 0;

  let statusBadge = '<span class="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold">開始前</span>';
  if (m.status === "IN_PROGRESS") statusBadge = '<span class="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded font-black animate-pulse">進行中</span>';
  if (m.status === "FINISHED") statusBadge = '<span class="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold">✓ 終了</span>';

  const scoreAVal = m.scoreA !== null ? String(m.scoreA) : "";
  const scoreBVal = m.scoreB !== null ? String(m.scoreB) : "";

  return `
    <div class="surface-card rounded-2xl p-3 space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500/60">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          ${statusBadge}
          <span class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">${m.court}</span>
          <span class="font-black text-xs text-slate-800 dark:text-slate-100">${m.title}</span>
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
            <button onclick="applyCascadeOffset('${m.id}', -5)" class="action-btn bg-sky-50 dark:bg-sky-950 hover:bg-sky-100 border border-sky-300 dark:border-sky-500/30 text-sky-600 dark:text-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded">-5分</button>
            <button onclick="applyCascadeOffset('${m.id}', 5)" class="action-btn bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 border border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded">+5分</button>
            <button onclick="openModal('${m.id}')" class="action-btn bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1"><i class="fa-solid fa-gear"></i></button>
          </div>
        </div>
      </div>

      <div class="bg-slate-50/90 dark:bg-slate-950/80 p-2.5 rounded-xl flex flex-wrap justify-between items-center gap-2 border border-slate-200 dark:border-slate-800/80">
        <div class="flex items-center gap-2 w-full sm:w-auto justify-center">
          <span class="font-black text-xs text-slate-700 dark:text-slate-200 min-w-[3rem] text-right">${m.teamA || "チームA"}</span>
          <input type="number" id="inputScoreA_${m.id}" value="${scoreAVal}" placeholder="0" class="score-input w-12 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1 font-mono font-bold text-sm text-sky-600 dark:text-sky-400 outline-none focus:border-sky-500">
          <span class="font-black text-slate-400 text-xs">VS</span>
          <input type="number" id="inputScoreB_${m.id}" value="${scoreBVal}" placeholder="0" class="score-input w-12 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1 font-mono font-bold text-sm text-sky-600 dark:text-sky-400 outline-none focus:border-sky-500">
          <span class="font-black text-xs text-slate-700 dark:text-slate-200 min-w-[3rem] text-left">${m.teamB || "チームB"}</span>
        </div>

        <div class="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button onclick="quickSaveScore('${m.id}', 'IN_PROGRESS')" class="action-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1.5 rounded-lg transition shadow-sm">
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

function toggleGroupExpand(gKey: string): void {
  appState.expandedGroups[gKey] = appState.expandedGroups[gKey] === false ? true : false;
  renderTimeline();
}

function quickSaveScore(matchId: string, newStatus: MatchStatus): void {
  const m = appState.schedule.find((item) => item.id === matchId);
  if (!m) return;

  const valA = (document.getElementById(`inputScoreA_${matchId}`) as HTMLInputElement | null)?.value ?? "";
  const valB = (document.getElementById(`inputScoreB_${matchId}`) as HTMLInputElement | null)?.value ?? "";

  m.scoreA = valA !== "" ? parseInt(valA, 10) : null;
  m.scoreB = valB !== "" ? parseInt(valB, 10) : null;
  m.status = newStatus;

  saveState();
  renderTimeline();
  renderCourtDelaySummary();
  calculateScoresAndRanks();
}

function applyCascadeOffset(targetMatchId: string, diffMins: number): void {
  const target = appState.schedule.find((m) => m.id === targetMatchId);
  if (!target) return;

  const courtMatches = appState.schedule.filter((m) => m.court === target.court);
  const targetIndex = courtMatches.findIndex((m) => m.id === targetMatchId);

  for (let i = targetIndex; i < courtMatches.length; i++) {
    courtMatches[i].offsetMins += diffMins;
  }

  saveState();
  renderTimeline();
  renderCourtDelaySummary();
  if (!(document.getElementById("sec-gantt") as HTMLElement | null)?.classList.contains("hidden")) renderGantt();
}

function renderGantt(): void {
  const container = document.getElementById("ganttContainer");
  const courts = ["上グラ", "下グラ", "体育館", "ハード", "オムニ", "卓球場"];
  const startH = 8;
  const endH = 16;
  const totalMins = (endH - startH) * 60;

  let html = `<div class="relative border-b border-slate-200 dark:border-slate-800 pb-2 mb-3 flex text-[10px] font-mono font-bold text-slate-400 pl-20">`;
  for (let h = startH; h <= endH; h++) {
    const leftP = ((h - startH) * 60 / totalMins) * 100;
    html += `<div class="absolute" style="left: ${leftP}%">${String(h).padStart(2, "0")}:00</div>`;
  }
  html += `</div>`;

  courts.forEach((court) => {
    const matches = appState.schedule.filter((m) => m.court === court);
    html += `
      <div class="relative h-9 flex items-center border-b border-slate-100 dark:border-slate-800/60 pl-20 my-1">
        <div class="absolute left-0 w-16 font-black text-xs text-slate-700 dark:text-slate-300">${court}</div>
        <div class="relative w-full h-6 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
    `;

    matches.forEach((m) => {
      const adjStart = calcAdjustedTime(m.start, m.offsetMins);
      const adjEnd = calcAdjustedTime(m.end, m.offsetMins);

      const [sH, sM] = adjStart.split(":").map(Number);
      const [eH, eM] = adjEnd.split(":").map(Number);

      const sMins = (sH - startH) * 60 + sM;
      const eMins = (eH - startH) * 60 + eM;

      const left = (sMins / totalMins) * 100;
      const width = Math.max(((eMins - sMins) / totalMins) * 100, 2);

      let bgClass = "bg-slate-500 text-white";
      if (m.status === "IN_PROGRESS") bgClass = "bg-amber-500 text-slate-950 font-black animate-pulse";
      if (m.status === "FINISHED") bgClass = "bg-emerald-500 text-white";

      html += `
        <div class="absolute top-0.5 bottom-0.5 rounded px-1.5 text-[9px] font-bold flex items-center justify-between shadow ${bgClass}"
             style="left: ${left}%; width: ${width}%;" title="${m.title} (${adjStart}-${adjEnd})">
          <span class="truncate">${m.title}</span>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  html += '<div id="ganttTimeBar" class="absolute top-8 bottom-0 w-0.5 bg-rose-500 z-20 pointer-events-none"><div class="bg-rose-500 text-white text-[8px] px-1 rounded -ml-3 -mt-3 font-mono font-bold">現在</div></div>';
  if (container) container.innerHTML = html;
}

function updateGanttTimeBar(now: Date): void {
  const bar = document.getElementById("ganttTimeBar");
  if (!bar) return;

  const startH = 8;
  const endH = 16;
  const totalMins = (endH - startH) * 60;
  const curMins = (now.getHours() - startH) * 60 + now.getMinutes() + now.getSeconds() / 60;

  if (curMins >= 0 && curMins <= totalMins) {
    const p = (curMins / totalMins) * 100;
    bar.style.left = `calc(5rem + (100% - 5rem) * ${p / 100})`;
    bar.style.display = "block";
  } else {
    bar.style.display = "none";
  }
}

function renderResultsTab(): void {
  const container = document.getElementById("resultsContentContainer");
  const gradeFilter = (document.getElementById("resultGradeFilter") as HTMLSelectElement | null)?.value ?? "ALL";
  if (!container) return;
  container.innerHTML = "";

  const categories: Record<string, { grade: string; sport: string; format: MatchFormat; matches: Match[] }> = {};
  appState.schedule.forEach((m) => {
    if (gradeFilter !== "ALL" && m.grade !== gradeFilter) return;
    const key = `${m.grade} - ${m.sport}`;
    if (!categories[key]) {
      categories[key] = {
        grade: m.grade,
        sport: m.sport,
        format: m.format,
        matches: []
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
      const hasScore = m.scoreA !== null && m.scoreB !== null;
      matchesListHtml += `
        <div class="flex justify-between items-center text-xs bg-slate-50/90 dark:bg-slate-950/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <span class="font-bold text-slate-500">${m.title}</span>
          <div class="font-bold font-mono">
            <span class="${hasScore && m.scoreA! > m.scoreB! ? "text-sky-500 font-black" : "text-slate-700 dark:text-slate-300"}">${m.teamA} (${m.scoreA ?? "-"})</span>
            <span class="text-slate-400 mx-1">vs</span>
            <span class="${hasScore && m.scoreB! > m.scoreA! ? "text-sky-500 font-black" : "text-slate-700 dark:text-slate-300"}">${m.teamB} (${m.scoreB ?? "-"})</span>
          </div>
        </div>
      `;
    });

    card.innerHTML = `
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded-full shadow-sm">${cat.grade}</span>
          <h3 class="font-black text-xs text-slate-800 dark:text-slate-100">${cat.sport}</h3>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
          ${cat.format === "league" ? "総当たり戦" : cat.format === "tournament" ? "トーナメント" : "単発形式"}
        </span>
      </div>

      <div class="space-y-1.5">
        <div class="text-[10px] font-bold text-slate-400">試合結果一覧:</div>
        ${matchesListHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function calculateScoresAndRanks(): void {
  const totals: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

  appState.schedule.forEach((m) => {
    if (m.status === "FINISHED" && m.scoreA !== null && m.scoreB !== null) {
      if (m.scoreA > m.scoreB && totals[m.teamA] !== undefined) totals[m.teamA] += 30;
      if (m.scoreB > m.scoreA && totals[m.teamB] !== undefined) totals[m.teamB] += 30;
      if (m.scoreA === m.scoreB) {
        if (totals[m.teamA] !== undefined) totals[m.teamA] += 10;
        if (totals[m.teamB] !== undefined) totals[m.teamB] += 10;
      }
    }
  });

  const scoreDisplayA = document.getElementById("scoreDisplayA");
  const scoreDisplayB = document.getElementById("scoreDisplayB");
  const scoreDisplayC = document.getElementById("scoreDisplayC");
  const scoreDisplayD = document.getElementById("scoreDisplayD");

  if (scoreDisplayA) scoreDisplayA.innerHTML = `${totals.A} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
  if (scoreDisplayB) scoreDisplayB.innerHTML = `${totals.B} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
  if (scoreDisplayC) scoreDisplayC.innerHTML = `${totals.C} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
  if (scoreDisplayD) scoreDisplayD.innerHTML = `${totals.D} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
}

function createNewMatch(): void {
  const grade = (document.getElementById("addGrade") as HTMLSelectElement | null)?.value ?? "中1";
  const sport = (document.getElementById("addSport") as HTMLInputElement | null)?.value.trim() ?? "";
  const format = (document.getElementById("addFormat") as HTMLSelectElement | null)?.value as MatchFormat ?? "tournament";
  const court = (document.getElementById("addCourt") as HTMLSelectElement | null)?.value ?? "上グラ";
  const title = (document.getElementById("addTitle") as HTMLInputElement | null)?.value.trim() ?? "";
  const teamA = (document.getElementById("addTeamA") as HTMLInputElement | null)?.value.trim() || "A組";
  const teamB = (document.getElementById("addTeamB") as HTMLInputElement | null)?.value.trim() || "B組";
  const start = (document.getElementById("addStartTime") as HTMLInputElement | null)?.value ?? "09:00";
  const end = (document.getElementById("addEndTime") as HTMLInputElement | null)?.value ?? "09:30";

  if (!sport || !title) {
    alert("競技名と試合タイトルを入力してください。");
    return;
  }

  const newMatch: Match = {
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
    offsetMins: 0
  };

  appState.schedule.push(newMatch);
  saveState();
  renderTimeline();
  renderCourtDelaySummary();
  alert(`「${title} (${format === "league" ? "総当たり" : "トーナメント"})」を作成追加しました！`);

  const titleInput = document.getElementById("addTitle") as HTMLInputElement | null;
  if (titleInput) titleInput.value = "";
}

function openModal(matchId: string): void {
  const m = appState.schedule.find((item) => item.id === matchId);
  if (!m) return;

  (document.getElementById("modalMatchId") as HTMLInputElement).value = m.id;
  (document.getElementById("modalMatchDetail") as HTMLElement).innerText = `${m.title} (${m.grade} ${m.sport})`;
  (document.getElementById("modalCourtDetail") as HTMLElement).innerText = `場所: ${m.court}`;
  (document.getElementById("modalTimeDetail") as HTMLElement).innerText = `定刻: ${m.start} - ${m.end}`;

  setModalStatus(m.status || "BEFORE");
  (document.getElementById("inputDelayMinutes") as HTMLInputElement).value = String(m.offsetMins);
  (document.getElementById("inputReferee") as HTMLInputElement).value = m.referee;
  (document.getElementById("inputStaff") as HTMLInputElement).value = m.staff;

  document.getElementById("editModal")?.classList.remove("hidden");
}

function closeModal(): void {
  document.getElementById("editModal")?.classList.add("hidden");
}

function setModalStatus(st: MatchStatus): void {
  appState.selectedModalStatus = st;
  (["BEFORE", "IN_PROGRESS", "FINISHED"] as MatchStatus[]).forEach((s) => {
    const btn = document.getElementById(`statusBtn${s}`);
    if (!btn) return;
    if (s === st) {
      btn.className = "py-1.5 border rounded-lg font-bold text-xs bg-sky-500 text-white border-sky-500";
    } else {
      btn.className = "py-1.5 border rounded-lg font-bold text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700";
    }
  });
}

function setModalDelay(val: number): void {
  (document.getElementById("inputDelayMinutes") as HTMLInputElement).value = String(val);
}

function saveModalData(): void {
  const matchId = (document.getElementById("modalMatchId") as HTMLInputElement).value;
  const m = appState.schedule.find((item) => item.id === matchId);
  if (!m) return;

  const newOffset = parseInt((document.getElementById("inputDelayMinutes") as HTMLInputElement).value, 10) || 0;
  const diff = newOffset - m.offsetMins;

  m.status = appState.selectedModalStatus;
  m.referee = (document.getElementById("inputReferee") as HTMLInputElement).value;
  m.staff = (document.getElementById("inputStaff") as HTMLInputElement).value;

  if (diff !== 0) {
    applyCascadeOffset(m.id, diff);
  } else {
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
  }

  closeModal();
}

function authenticateAdmin(): void {
  const pass = (document.getElementById("adminPasswordInput") as HTMLInputElement | null)?.value ?? "";
  if (pass === "admin123") {
    appState.isAdmin = true;
    document.getElementById("adminAuthOverlay")?.classList.add("hidden");
    document.getElementById("adminContent")?.classList.remove("hidden");
    renderCourtDelaySummary();
  } else {
    document.getElementById("authError")?.classList.remove("hidden");
  }
}

function lockAdmin(): void {
  appState.isAdmin = false;
  document.getElementById("adminAuthOverlay")?.classList.remove("hidden");
  document.getElementById("adminContent")?.classList.add("hidden");
  const passwordInput = document.getElementById("adminPasswordInput") as HTMLInputElement | null;
  if (passwordInput) passwordInput.value = "";
}

function broadcastAnnouncement(): void {
  const txt = (document.getElementById("announcementInput") as HTMLTextAreaElement | null)?.value ?? "";
  if (!txt) return;
  appState.announcement = txt;
  saveState();
  showAnnouncement(txt);
}

function clearAnnouncement(): void {
  appState.announcement = "";
  saveState();
  document.getElementById("announcementBar")?.classList.add("hidden");
}

function showAnnouncement(txt: string): void {
  const announcementText = document.getElementById("announcementText");
  if (announcementText) announcementText.innerText = txt;
  document.getElementById("announcementBar")?.classList.remove("hidden");
}

function dismissAnnouncement(): void {
  document.getElementById("announcementBar")?.classList.add("hidden");
}

function exportData(): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const dl = document.createElement("a");
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", "gym78_v4_data.json");
  dl.click();
}

function isMatch(value: unknown): value is Match {
  if (!value || typeof value !== "object") return false;
  const match = value as Partial<Match>;
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

function importData(input: HTMLInputElement): void {
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = JSON.parse(String(reader.result)) as Partial<AppState>;
      if (!Array.isArray(imported.schedule) || !imported.schedule.every(isMatch)) {
        throw new Error("invalid schedule");
      }

      appState.schedule = imported.schedule;
      appState.announcement = typeof imported.announcement === "string" ? imported.announcement : "";
      saveState();
      renderCourtDelaySummary();
      renderTimeline();
      renderResultsTab();
      calculateScoresAndRanks();
      if (appState.announcement) showAnnouncement(appState.announcement);
      else document.getElementById("announcementBar")?.classList.add("hidden");
      alert(`${appState.schedule.length}件の試合データを取り込みました。`);
    } catch {
      alert("データを読み込めませんでした。出力したJSONファイルを選択してください。");
    } finally {
      input.value = "";
    }
  };
  reader.readAsText(file);
}

function resetAllData(): void {
  if (confirm("全てのデータを初期状態にリセットしますか？")) {
    localStorage.clear();
    location.reload();
  }
}

(window as any).toggleTheme = toggleTheme;
(window as any).switchTab = switchTab;
(window as any).createNewMatch = createNewMatch;
(window as any).quickSaveScore = quickSaveScore;
(window as any).applyCascadeOffset = applyCascadeOffset;
(window as any).toggleGroupExpand = toggleGroupExpand;
(window as any).setModalStatus = setModalStatus;
(window as any).setModalDelay = setModalDelay;
(window as any).saveModalData = saveModalData;
(window as any).openModal = openModal;
(window as any).closeModal = closeModal;
(window as any).authenticateAdmin = authenticateAdmin;
(window as any).lockAdmin = lockAdmin;
(window as any).broadcastAnnouncement = broadcastAnnouncement;
(window as any).clearAnnouncement = clearAnnouncement;
(window as any).dismissAnnouncement = dismissAnnouncement;
(window as any).renderTimeline = renderTimeline;
(window as any).renderResultsTab = renderResultsTab;
(window as any).renderCourtDelaySummary = renderCourtDelaySummary;
(window as any).renderGantt = renderGantt;
(window as any).setTimelineViewMode = setTimelineViewMode;
(window as any).exportData = exportData;
(window as any).importData = importData;
(window as any).resetAllData = resetAllData;
