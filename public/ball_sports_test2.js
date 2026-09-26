"use strict";
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAwVUxoXbvTraGUDoLztqqcJx2fIHqUntc",
    authDomain: "thsportsfes.firebaseapp.com",
    databaseURL: "https://thsportsfes-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thsportsfes",
    storageBucket: "thsportsfes.firebasestorage.app",
    messagingSenderId: "96596815858",
    appId: "1:96596815858:web:5f85526bf785ccc5d8056b",
    measurementId: "G-TCPMRTY3P1"
};
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
const TOURNAMENT_PAIRS = [["準決勝1", "A", "B"], ["準決勝2", "C", "D"], ["3位決定戦", "準決勝1の敗者", "準決勝2の敗者"], ["決勝", "準決勝1の勝者", "準決勝2の勝者"]];
function getFormatMatchDefinitions(format) {
    if (format === "tournament")
        return TOURNAMENT_PAIRS;
    if (format === "exhibition")
        return [["エキシビション", "優勝チーム", "教師"]];
    if (format === "single")
        return [["単発試合", "A", "B"]];
    if (format === "table_tennis_round_robin") {
        return Array.from({ length: 3 }, (_, roundIndex) => LEAGUE_PAIRS.map((pair, pairIndex) => [`${roundIndex + 1}回戦 第${pairIndex + 1}試合`, pair[0], pair[1]]))
            .flat();
    }
    return LEAGUE_PAIRS.map((pair, index) => [`第${index + 1}試合`, pair[0], pair[1]]);
}
function parseTimeMinutes(value) {
    if (typeof value !== "string" || !value.includes(":"))
        return 0;
    const [hoursText, minutesText = "0"] = value.split(":");
    const hours = Number(hoursText);
    const minutes = Number(minutesText);
    if (!Number.isFinite(hours) || !Number.isFinite(minutes))
        return 0;
    return hours * 60 + minutes;
}
function normalizeGradeLabel(value) {
    const grade = String(value ?? "").trim();
    if (!grade)
        return "不明";
    const normalized = grade.replace(/[^0-9A-Za-z一-龯]/g, "");
    if (normalized === "中1" || normalized === "中学1")
        return "中学1年";
    if (normalized === "中2" || normalized === "中学2")
        return "中学2年";
    if (normalized === "中3" || normalized === "中学3")
        return "中学3年";
    if (normalized === "高1" || normalized === "高校1")
        return "高校1年";
    if (normalized === "高2" || normalized === "高校2")
        return "高校2年";
    if (normalized === "高3" || normalized === "高校3")
        return "高校3年";
    return grade;
}
function normalizeLegacyStatus(status) {
    const value = String(status ?? "").toLowerCase();
    if (["done", "finished", "complete", "end", "ended"].includes(value) || value === "fin")
        return "FINISHED";
    if (["live", "in_progress", "inprogress", "running", "now"].includes(value) || value === "progress")
        return "IN_PROGRESS";
    return "BEFORE";
}
function normalizeScheduleEntry(source) {
    if (!source || typeof source !== "object")
        return null;
    const legacyCourt = source.court ?? source.venue ?? source.place ?? source.location ?? "上グラ";
    const courtMap = { "上グラウンド": "上グラ", "下グラウンド": "下グラ", "上グラ": "上グラ", "下グラ": "下グラ" };
    const court = courtMap[String(legacyCourt)] ?? String(legacyCourt);
    const grade = source.grade ?? "中1";
    const sport = source.sport ?? "球技";
    const title = source.title ?? source.blockTitle ?? "試合";
    const blockTitle = source.blockTitle ?? (typeof title === "string" && title.includes("試合") ? title : "試合");
    const blockId = source.blockId ?? `block_${source.id ?? Date.now()}`;
    const startValue = typeof source.start === "string" ? source.start : typeof source.time === "string" ? source.time : "08:00";
    const durationValue = Number.isFinite(Number(source.duration)) ? Number(source.duration) : 30;
    const endValue = typeof source.end === "string" ? source.end : addMinutesToTime(startValue, durationValue);
    const format = ["league", "tournament", "single", "table_tennis_round_robin", "exhibition"].includes(source.format)
        ? source.format
        : (source.type === "tournament" ? "tournament" : "league");
    return {
        ...source,
        id: typeof source.id === "string" ? source.id : `${blockId}_${Date.now()}`,
        blockId,
        blockTitle,
        court,
        sport,
        grade,
        title,
        format,
        teamA: source.teamA ?? source.rank1 ?? source.team_a ?? "A",
        teamB: source.teamB ?? source.rank2 ?? source.team_b ?? "B",
        scoreA: source.scoreA ?? null,
        scoreB: source.scoreB ?? null,
        referee: source.referee ?? "",
        staff: source.staff ?? "",
        competitionLead: source.competitionLead ?? source.staff ?? "",
        attendance: source.attendance ?? "",
        start: startValue,
        end: endValue,
        status: normalizeLegacyStatus(source.status),
        offsetMins: Number.isFinite(Number(source.offsetMins)) ? Number(source.offsetMins) : Number.isFinite(Number(source.delay)) ? Number(source.delay) : 0,
        pointRule: Array.isArray(source.pointRule) ? source.pointRule : [150, 100, 50, 0]
    };
}
function normalizeCompetitionSchedule(sourceSchedule) {
    const normalized = [];
    sourceSchedule.forEach((source) => {
        if (!source || typeof source !== "object")
            return;
        const canonical = normalizeScheduleEntry(source);
        if (!canonical)
            return;
        if (source.blockId) {
            normalized.push(canonical);
            return;
        }
        const blockId = `block_${canonical.id ?? Date.now()}`;
        const blockTitle = canonical.blockTitle || "第1試合";
        const startValue = canonical.start || "08:00";
        const endValue = canonical.end || addMinutesToTime(startValue, 30);
        const startMinutes = parseTimeMinutes(startValue);
        const endMinutes = parseTimeMinutes(endValue);
        const duration = Math.max(10, Math.round(Math.max(endMinutes - startMinutes, 30)));
        const definitions = getFormatMatchDefinitions(canonical.format);
        definitions.forEach((definition, index) => {
            const start = addMinutesToTime(startValue, index * (duration + 5));
            normalized.push({
                ...canonical,
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
                pointRule: canonical.pointRule ?? [150, 100, 50, 0]
            });
        });
    });
    return normalized;
}
function cloneInitialSchedule() {
    return INITIAL_SCHEDULE.map((match) => ({ ...match }));
}
function loadPersistedSchedule() {
    try {
        const raw = localStorage.getItem("gym78_ball_day_v1_schedule");
        if (!raw)
            return cloneInitialSchedule();
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed) || parsed.length === 0)
            return cloneInitialSchedule();
        const normalized = parsed
            .map((entry) => normalizeScheduleEntry(entry))
            .filter((entry) => entry !== null && entry !== undefined);
        if (normalized.length === 0)
            return cloneInitialSchedule();
        if (normalized.some((match) => match.blockId))
            return normalized;
        const competitionSchedule = normalizeCompetitionSchedule(normalized);
        return competitionSchedule.length > 0 ? competitionSchedule : cloneInitialSchedule();
    }
    catch {
        return cloneInitialSchedule();
    }
}
function loadPersistedAnnouncement() {
    try {
        const raw = localStorage.getItem("gym78_ball_day_v1_announcement");
        return typeof raw === "string" ? raw : "";
    }
    catch {
        return "";
    }
}
let appState = {
    schedule: loadPersistedSchedule(),
    timelineViewMode: "byCourt",
    expandedGroups: {},
    expandedGanttGroupKey: "",
    selectedModalStatus: "BEFORE",
    isAdmin: false,
    announcement: loadPersistedAnnouncement()
};
window.appState = appState;
let firebaseSync = {
    app: null,
    db: null,
    initialized: false,
    online: false,
    unsubscribe: null
};
window.firebaseSync = firebaseSync;
let firebaseWriteInFlight = false;
let firebaseWritePending = false;
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
function initializeLucideIcons() {
    if (!window.lucide)
        return;
    const iconMap = {
        "fa-triangle-exclamation": "triangle-alert", "fa-xmark": "x", "fa-trophy": "trophy",
        "fa-circle-half-stroke": "contrast", "fa-sun": "sun", "fa-moon": "moon",
        "fa-clock-rotate-left": "history", "fa-chart-gantt": "chart-no-axes-gantt",
        "fa-ranking-star": "trophy", "fa-gear": "settings-2", "fa-futbol": "goal",
        "fa-filter": "list-filter", "fa-bolt": "zap", "fa-sitemap": "network",
        "fa-file-csv": "file-spreadsheet", "fa-lock": "lock-keyhole", "fa-bullhorn": "megaphone",
        "fa-tower-broadcast": "radio-tower", "fa-eraser": "eraser", "fa-calendar-plus": "calendar-plus-2",
        "fa-arrow-up-right-from-square": "external-link", "fa-arrow-left": "arrow-left",
        "fa-layer-group": "layers-2", "fa-plus-circle": "circle-plus", "fa-plus": "plus",
        "fa-diagram-project": "workflow", "fa-clock": "clock-3", "fa-floppy-disk": "save",
        "fa-trash": "trash-2", "fa-database": "database", "fa-download": "download",
        "fa-upload": "upload", "fa-location-dot": "map-pin"
    };
    const refresh = () => {
        document.querySelectorAll('i[class*="fa-"]').forEach((icon) => {
            const legacyClass = [...icon.classList].find((className) => className.startsWith("fa-") && className !== "fa-solid");
            if (!legacyClass)
                return;
            icon.dataset.lucide = iconMap[legacyClass] ?? (legacyClass.startsWith("fa-chevron-") ? legacyClass.replace("fa-", "") : "circle-help");
            [...icon.classList].filter((className) => className.startsWith("fa-")).forEach((className) => icon.classList.remove(className));
        });
        window.lucide.createIcons();
    };
    refresh();
    let refreshQueued = false;
    new MutationObserver((mutations) => {
        const hasIconPlaceholder = mutations.some((mutation) => [...mutation.addedNodes].some((node) => node instanceof Element && (node.matches('i[class*="fa-"], i[data-lucide]') || node.querySelector('i[class*="fa-"], i[data-lucide]'))));
        if (!hasIconPlaceholder || refreshQueued)
            return;
        refreshQueued = true;
        requestAnimationFrame(() => {
            refreshQueued = false;
            refresh();
        });
    }).observe(document.body, { childList: true, subtree: true });
}
function decodeStringifiedValue(value) {
    if (typeof value !== "string")
        return value;
    const trimmed = value.trim();
    if (!trimmed)
        return "";
    if ((trimmed.startsWith("\"") && trimmed.endsWith("\"")) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
        try {
            return JSON.parse(trimmed);
        }
        catch {
            return trimmed.slice(1, -1);
        }
    }
    try {
        return JSON.parse(trimmed);
    }
    catch {
        return value;
    }
}
function normalizeScheduleEntries(value) {
    if (Array.isArray(value)) {
        const parsed = value
            .map((entry) => typeof entry === "string" ? decodeStringifiedValue(entry) : entry)
            .filter((entry) => entry !== null && entry !== undefined);
        if (parsed.length === 0)
            return null;
        return parsed.some((entry) => typeof entry === "string") ? null : parsed;
    }
    if (typeof value === "string") {
        try {
            return normalizeScheduleEntries(JSON.parse(value));
        }
        catch {
            return null;
        }
    }
    return null;
}
function getPayloadEnvelope(data) {
    if (!data || typeof data !== "object")
        return null;
    return data.data && typeof data.data === "object" ? data.data : data;
}
function extractRemoteSchedule(data) {
    const payload = getPayloadEnvelope(data);
    if (!payload || typeof payload !== "object")
        return null;
    const candidates = [
        payload.schedule,
        payload.matches,
        data?.schedule,
        data?.matches,
        decodeStringifiedValue(payload.schedule),
        decodeStringifiedValue(payload.matches),
        decodeStringifiedValue(data?.schedule),
        decodeStringifiedValue(data?.matches)
    ];
    for (const candidate of candidates) {
        const normalized = normalizeScheduleEntries(candidate);
        if (normalized)
            return normalized;
    }
    return null;
}
function normalizeRemoteAnnouncement(data) {
    const payload = getPayloadEnvelope(data) || data || {};
    const direct = typeof payload.announcement === "string" ? payload.announcement : "";
    const value = typeof direct === "string" ? decodeStringifiedValue(direct) : "";
    return typeof value === "string" ? value : "";
}
function applyRemoteDocumentData(data) {
    const remoteSchedule = extractRemoteSchedule(data);
    if (!remoteSchedule || !Array.isArray(remoteSchedule) || remoteSchedule.length === 0) {
        console.warn("[同期] 有効なスケジュールなし");
        if (!appState.schedule || appState.schedule.length === 0)
            appState.schedule = INITIAL_SCHEDULE;
        return false;
    }
    const normalizedRemoteSchedule = remoteSchedule
        .map((match) => normalizeScheduleEntry(match))
        .filter((match) => match && typeof match === "object");
    const preparedSchedule = normalizedRemoteSchedule.length > 0 ? normalizedRemoteSchedule : remoteSchedule;
    const needsNormalize = preparedSchedule.some((match) => !match.blockId || match.court === "上グラウンド" || match.court === "下グラウンド" || !["BEFORE", "IN_PROGRESS", "FINISHED"].includes(match.status ?? ""));
    const nextSchedule = needsNormalize ? normalizeCompetitionSchedule(preparedSchedule) : preparedSchedule;
    const nextAnnouncement = normalizeRemoteAnnouncement(data);
    const currentSignature = JSON.stringify({ schedule: appState.schedule ?? [], announcement: appState.announcement });
    const nextSignature = JSON.stringify({ schedule: nextSchedule ?? [], announcement: nextAnnouncement });
    if (currentSignature === nextSignature) {
        return true;
    }
    appState.schedule = nextSchedule;
    if (appState.schedule.length === 0)
        appState.schedule = INITIAL_SCHEDULE;
    appState.announcement = nextAnnouncement;
    localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
    localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
    updateSyncStatus("同期済み", "success");
    renderCourtDelaySummary();
    renderTimeline();
    renderResultsTab();
    calculateScoresAndRanks();
    if (appState.announcement)
        showAnnouncement(appState.announcement);
    else
        document.getElementById("announcementBar")?.classList.add("hidden");
    console.log("[同期完了]", appState.schedule.length, "件");
    return true;
}
function subscribeToRemoteData() {
    if (!firebaseSync.db || !firebaseSync.initialized)
        return;
    if (firebaseSync.unsubscribe) {
        try {
            firebaseSync.unsubscribe();
        }
        catch {
            // ignore
        }
    }
    const primaryDoc = firebaseSync.db.collection("app_data").doc("ball_sports_test2_main");
    firebaseSync.unsubscribe = primaryDoc.onSnapshot((docSnap) => {
        if (!docSnap.exists)
            return;
        applyRemoteDocumentData(docSnap.data());
    }, () => {
        updateSyncStatus("待機中", "sky");
    });
}
async function initFirebaseSync() {
    if (firebaseSync.initialized && firebaseSync.db)
        return;
    if (!window.firebase || !window.firebase.apps)
        return;
    try {
        if (!firebaseSync.app) {
            firebaseSync.app = firebase.apps.length ? firebase.apps[0] : firebase.initializeApp(FIREBASE_CONFIG);
        }
        firebaseSync.db = firebase.firestore(firebaseSync.app);
        firebaseSync.initialized = true;
        firebaseSync.online = true;
        updateSyncStatus("接続中", "sky");
        const documentCandidates = [
            { collection: "app_data", doc: "ball_sports_test2_main" },
            { collection: "app_data", doc: "ball_sports_data_v4" },
            { collection: "sportsfes", doc: "main" },
            { collection: "app_data", doc: "sportsfes_main" },
            { collection: "app_data", doc: "main" }
        ];
        let loaded = false;
        for (const { collection, doc } of documentCandidates) {
            try {
                const docSnap = await firebaseSync.db.collection(collection).doc(doc).get();
                if (docSnap.exists && applyRemoteDocumentData(docSnap.data())) {
                    loaded = true;
                    console.log("[Firebase] ロード元:", `${collection}/${doc}`);
                    break;
                }
            }
            catch (e) {
                console.warn(`[Firebase] ${collection}/${doc} 読込スキップ:`, e);
            }
        }
        if (!loaded) {
            updateSyncStatus("ローカルモード", "warning");
            console.log("[Firebase] リモートデータなし、ローカルデータを使用");
            await syncStateToFirebase();
        }
        else {
            const primarySnapshot = await firebaseSync.db.collection("app_data").doc("ball_sports_test2_main").get();
            if (!primarySnapshot.exists)
                await syncStateToFirebase();
        }
        subscribeToRemoteData();
    }
    catch (err) {
        console.error("[Firebase 初期化失敗]", err);
        firebaseSync.initialized = false;
        firebaseSync.online = false;
        updateSyncStatus("オフライン", "warning");
    }
}
async function syncStateToFirebase() {
    if (!firebaseSync.db || !firebaseSync.initialized)
        return;
    if (firebaseWriteInFlight) {
        firebaseWritePending = true;
        return;
    }
    firebaseWriteInFlight = true;
    try {
        const mainDoc = firebaseSync.db.collection("app_data").doc("ball_sports_test2_main");
        do {
            firebaseWritePending = false;
            const payload = {
                schedule: appState.schedule,
                announcement: appState.announcement,
                updatedAt: new Date().toISOString()
            };
            await mainDoc.set(payload, { merge: true });
        } while (firebaseWritePending);
        updateSyncStatus("同期済み", "success");
    }
    catch (err) {
        console.error("[Firebase 同期エラー]", err);
        updateSyncStatus("同期失敗", "warning");
    }
    finally {
        firebaseWriteInFlight = false;
        if (firebaseWritePending)
            syncStateToFirebase();
    }
}
document.addEventListener("DOMContentLoaded", () => {
    startClock();
    initializeLucideIcons();
    const dataToolsView = window.location.hash === "#data-tools";
    if (new URLSearchParams(window.location.search).get("view") === "match-tools" || window.location.hash === "#match-tools" || dataToolsView) {
        document.body.classList.add("match-tools-view");
        if (dataToolsView)
            document.body.classList.add("data-tools-view");
        switchTab("admin");
    }
    updateSyncStatus("待機中", "sky");
    initFirebaseSync();
    populateBlockSelectors();
    renderTimeConfigEditor();
    renderCourtDelaySummary();
    renderTimeline();
    renderResultsTab();
    calculateScoresAndRanks();
    if (appState.announcement)
        showAnnouncement(appState.announcement);
    else
        document.getElementById("announcementBar")?.classList.add("hidden");
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
    const adminClockEl = document.getElementById("adminClockDisplay");
    if (!clockEl && !adminClockEl)
        return;
    let lastGanttTick = "";
    let lastAdminTick = "";
    const update = () => {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, "0");
        const mins = String(now.getMinutes()).padStart(2, "0");
        const secs = String(now.getSeconds()).padStart(2, "0");
        const ms = String(now.getMilliseconds()).padStart(3, "0");
        if (clockEl)
            clockEl.innerHTML = `${hrs}:${mins}:${secs}.<span class="text-[10px] text-sky-500">${ms}</span>`;
        const tick = `${hrs}:${mins}:${secs}`;
        if (tick !== lastGanttTick) {
            updateGanttTimeBar(now);
            lastGanttTick = tick;
        }
        if (adminClockEl && tick !== lastAdminTick) {
            adminClockEl.textContent = tick;
            lastAdminTick = tick;
        }
        requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}
function saveState() {
    localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
    localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
    if (firebaseSync.initialized) {
        syncStateToFirebase().catch((err) => console.warn("[自動同期スキップ]", err));
    }
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
    document.getElementById("courtDelaySummaryBar")?.classList.toggle("hidden", tabName === "admin");
    const activeBtn = document.getElementById(`tab-${tabName}`);
    if (activeBtn) {
        activeBtn.classList.add("border-sky-500", "text-sky-600", "dark:text-sky-400");
    }
    if (tabName === "gantt")
        renderGantt();
    if (tabName === "results")
        renderResultsTab();
}
function getSelectedCourts() {
    return [...document.querySelectorAll(".court-filter-checkbox")]
        .filter((box) => box.checked && box.value !== "ALL")
        .map((box) => box.value);
}
function handleCourtFilterChange(changedBox) {
    const boxes = [...document.querySelectorAll(".court-filter-checkbox")];
    const allBox = boxes.find((box) => box.value === "ALL");
    const courtBoxes = boxes.filter((box) => box.value !== "ALL");
    if (changedBox.value === "ALL") {
        courtBoxes.forEach((box) => { box.checked = changedBox.checked; });
    }
    else if (allBox) {
        allBox.checked = courtBoxes.length > 0 && courtBoxes.every((box) => box.checked);
    }
    renderTimeline();
    renderGantt();
}
function getSelectedGanttCourts() {
    return [...document.querySelectorAll(".gantt-court-checkbox")]
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value);
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
        const currentLabel = inProgress ? `${inProgress.grade} / ${inProgress.sport}` : nextMatch ? `${nextMatch.grade} / ${nextMatch.sport}` : "試合なし";
        summaryHtml += `
      <div class="stat-tile border rounded-2xl p-2.5 text-center shadow-sm ${badgeColor}">
        <div class="text-[10px] font-black tracking-[0.18em] uppercase opacity-80">${court}</div>
        <div class="mt-1 text-xs font-mono font-black">${delayText}</div>
        <div class="mt-1 text-[10px] truncate" title="${currentLabel}">${currentLabel}</div>
      </div>
    `;
        adminMonitorHtml += `
      <div class="surface-card rounded-2xl p-3 flex justify-between items-center gap-3">
        <div>
          <div class="font-black text-xs text-slate-800 dark:text-slate-100">${court} コート</div>
          <div class="text-[10px] text-slate-400 mt-1">現在: ${inProgress ? `${inProgress.grade} ${inProgress.sport} ${inProgress.title}` : "進行中なし"}</div>
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
function renderTimeline() {
    const container = document.getElementById("timelineContainer");
    const selectedCourts = getSelectedCourts();
    const statusFilter = document.getElementById("statusFilter")?.value ?? "ALL";
    if (!container)
        return;
    container.innerHTML = "";
    container.className = appState.timelineViewMode === "byCourt" ? "court-lane-scroll" : "space-y-3";
    const filtered = appState.schedule.filter((m) => {
        if (!selectedCourts.includes(m.court))
            return false;
        if (statusFilter !== "ALL" && m.status !== statusFilter)
            return false;
        return true;
    });
    if (selectedCourts.length === 0) {
        container.innerHTML = '<div class="text-center py-8 text-xs text-slate-400 font-bold">表示するコートを選択してください</div>';
        return;
    }
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
            const groupLabel = `${firstMatch.grade} / ${firstMatch.sport}`;
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
            <i data-lucide="${isExpanded ? "chevron-up" : "chevron-down"}" class="w-4 h-4 text-slate-400 ml-1"></i>
          </div>
        </div>

        ${isExpanded ? `<div class="p-2.5 bg-slate-50 dark:bg-slate-950/40 space-y-2">${matches.map((m) => createMatchItemHtml(m)).join("")}</div>` : ""}
      `;
            container.appendChild(groupCard);
        });
    }
    else {
        const courts = selectedCourts;
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
          <i data-lucide="map-pin" class="w-4 h-4 text-sky-500"></i> ${court}
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
    let statusBadge = '<span class="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold">開始前</span>';
    if (m.status === "IN_PROGRESS")
        statusBadge = '<span class="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded font-black animate-pulse">進行中</span>';
    if (m.status === "FINISHED")
        statusBadge = '<span class="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold"><i data-lucide="check" class="w-3 h-3 inline"></i> 終了</span>';
    const scoreAVal = m.scoreA !== null ? String(m.scoreA) : "";
    const scoreBVal = m.scoreB !== null ? String(m.scoreB) : "";
    return `
    <div class="surface-card rounded-2xl p-3 space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500/60 cursor-pointer" onclick="openModal('${m.id}')">
      <div class="flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-2 flex-wrap">
          ${statusBadge}
          <span class="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">${m.court}</span>
          <span class="font-black text-xs text-slate-800 dark:text-slate-100">${m.grade} / ${m.sport}</span>
          <span class="font-black text-xs text-slate-800 dark:text-slate-100">${m.title}</span>
          <span class="text-[10px] bg-sky-500/10 text-sky-600 dark:text-sky-400 px-1.5 py-0.5 rounded-full font-bold">${m.format === "league" ? "総当たり" : m.format === "tournament" ? "トーナメント" : m.format === "table_tennis_round_robin" ? "卓球総当たり" : m.format === "exhibition" ? "エキシビション" : "単発"}</span>
        </div>

        <div class="flex items-center gap-2 ml-auto">
          <div class="text-right">
            <span class="text-[10px] text-slate-400 font-bold">定刻 ${m.start}</span>
            <span class="text-xs font-mono font-black ${isDelayed ? "text-rose-500" : "text-slate-800 dark:text-slate-100"} ml-1">
              [${adjStart} - ${adjEnd}]
            </span>
          </div>
                    <div class="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-2" onclick="event.stopPropagation()">
                        <button onclick="event.stopPropagation(); applyCascadeOffset('${m.id}', -1)" class="action-btn bg-sky-50 dark:bg-sky-950 hover:bg-sky-100 border border-sky-300 dark:border-sky-500/30 text-sky-600 dark:text-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded" aria-label="この試合から1分前倒し">-1分</button>
                        <button onclick="event.stopPropagation(); applyCascadeOffset('${m.id}', 1)" class="action-btn bg-rose-50 dark:bg-rose-950 hover:bg-rose-100 border border-rose-300 dark:border-rose-500/30 text-rose-600 dark:text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded" aria-label="この試合から1分遅延">+1分</button>
                        <button onclick="event.stopPropagation(); openModal('${m.id}')" class="action-btn bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded ml-1" aria-label="試合詳細を編集"><i data-lucide="settings-2" class="w-4 h-4"></i></button>
          </div>
        </div>
      </div>

      <div class="bg-slate-50/90 dark:bg-slate-950/80 p-2.5 rounded-xl flex flex-wrap justify-between items-center gap-2 border border-slate-200 dark:border-slate-800/80">
        <div class="flex items-center gap-2 w-full sm:w-auto justify-center" onclick="event.stopPropagation()">
          <span class="font-black text-xs text-slate-700 dark:text-slate-200 min-w-[3rem] text-right">${m.teamA || "チームA"}</span>
          <input type="number" id="inputScoreA_${m.id}" value="${scoreAVal}" placeholder="0" min="0" max="50" class="score-input w-12 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1 font-mono font-bold text-sm text-sky-600 dark:text-sky-400 outline-none focus:border-sky-500">
          <span class="font-black text-slate-400 text-xs">VS</span>
          <input type="number" id="inputScoreB_${m.id}" value="${scoreBVal}" placeholder="0" min="0" max="50" class="score-input w-12 text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-1 font-mono font-bold text-sm text-sky-600 dark:text-sky-400 outline-none focus:border-sky-500">
          <span class="font-black text-xs text-slate-700 dark:text-slate-200 min-w-[3rem] text-left">${m.teamB || "チームB"}</span>
        </div>

        <div class="flex items-center gap-1.5 w-full sm:w-auto justify-end">
          <button onclick="event.stopPropagation(); quickSaveScore('${m.id}', 'IN_PROGRESS')" class="action-btn bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-1.5 rounded-lg transition shadow-sm">
            進行中にする
          </button>
          <button onclick="event.stopPropagation(); quickSaveScore('${m.id}', 'FINISHED')" class="action-btn bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-black text-[11px] px-3 py-1.5 rounded-lg transition shadow-md">
            スコア決定 & 終了
          </button>
        </div>
      </div>
    </div>
  `;
}
function toggleGroupExpand(gKey) {
    appState.expandedGroups[gKey] = appState.expandedGroups[gKey] !== true;
    renderTimeline();
}
function quickSaveScore(matchId, newStatus) {
    const m = appState.schedule.find((item) => item.id === matchId);
    if (!m)
        return;
    const valA = document.getElementById(`inputScoreA_${matchId}`)?.value ?? "";
    const valB = document.getElementById(`inputScoreB_${matchId}`)?.value ?? "";
    m.scoreA = valA !== "" ? parseInt(valA, 10) : null;
    m.scoreB = valB !== "" ? parseInt(valB, 10) : null;
    m.status = newStatus;
    updateTournamentBracket(m.blockId);
    updateExhibitionTeams(m.sport);
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    calculateScoresAndRanks();
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
function isCompetitionComplete(matches, format) {
    if (format === "exhibition" || !matches.length)
        return false;
    const hasResult = (match) => match.status === "FINISHED" && match.scoreA !== null && match.scoreB !== null;
    if (format === "tournament") {
        const final = matches.find((match) => match.title === "決勝");
        const thirdPlace = matches.find((match) => match.title === "3位決定戦");
        return !!final && !!thirdPlace && hasResult(final) && hasResult(thirdPlace);
    }
    return matches.every(hasResult);
}
function updateExhibitionTeams(sport) {
    const competitions = new Map();
    appState.schedule.forEach((match) => {
        if (match.sport !== sport || match.format === "exhibition")
            return;
        const key = match.blockId ?? `${match.grade} - ${match.sport}`;
        if (!competitions.has(key))
            competitions.set(key, []);
        competitions.get(key).push(match);
    });
    const completed = [...competitions.values()].filter((matches) => isCompetitionComplete(matches, matches[0].format));
    const latest = completed[completed.length - 1];
    let champion = null;
    if (latest) {
        if (latest[0].format === "tournament") {
            champion = getWinner(latest.find((match) => match.title === "決勝"));
        } else {
            champion = calculateCompetitionStandings(latest, latest[0].format).find((standing) => standing.rank === 1)?.team ?? null;
        }
    }
    appState.schedule.filter((match) => match.sport === sport && match.format === "exhibition" && match.status !== "FINISHED")
        .forEach((match) => { match.teamA = champion ?? "優勝チーム"; });
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
    const courts = getSelectedGanttCourts();
    const startH = 8;
    const endH = 16;
    const totalMins = (endH - startH) * 60;
    const ruler = Array.from({ length: endH - startH + 1 }, (_, index) => {
        const hour = startH + index;
        const position = index / (endH - startH) * 100;
        const edgeClass = index === 0 ? "gantt-hour-first" : index === endH - startH ? "gantt-hour-last" : "";
        return `<span class="gantt-hour ${edgeClass}" style="left:${position}%">${String(hour).padStart(2, "0")}:00</span>`;
    }).join("");
    const lanes = courts.map((court) => {
        const matches = appState.schedule
            .filter((m) => m.court === court)
            .sort((a, b) => a.start.localeCompare(b.start));
                const groups = new Map();
                matches.forEach((match) => {
                        const groupKey = `${court}|${match.grade}|${match.sport}`;
                        if (!groups.has(groupKey))
                                groups.set(groupKey, []);
                        groups.get(groupKey).push(match);
                });
                const events = [...groups.entries()].map(([groupKey, groupMatches]) => {
                        const ordered = [...groupMatches].sort((a, b) => a.start.localeCompare(b.start));
                        const first = ordered[0];
                        const last = ordered[ordered.length - 1];
                        const adjustedStart = calcAdjustedTime(first.start, first.offsetMins);
                        const adjustedEnd = calcAdjustedTime(last.end, last.offsetMins);
                        const visibleStart = Math.max(startH * 60, parseTimeMinutes(adjustedStart));
                        const visibleEnd = Math.min(endH * 60, parseTimeMinutes(adjustedEnd));
                        if (visibleEnd <= visibleStart)
                                return "";
                        const left = (visibleStart - startH * 60) / totalMins * 100;
                        const width = Math.max((visibleEnd - visibleStart) / totalMins * 100, 1.4);
                        const key = encodeURIComponent(groupKey);
                        const expanded = appState.expandedGanttGroupKey === groupKey;
                        const statuses = new Set(ordered.map((match) => match.status));
                        const statusClass = statuses.has("IN_PROGRESS") ? "gantt-event-live" : statuses.size === 1 && statuses.has("FINISHED") ? "gantt-event-finished" : "gantt-event-before";
                        const details = expanded ? `<div class="gantt-group-details" aria-label="${first.grade} ${first.sport} の試合一覧">${ordered.map((match) => {
                                const start = calcAdjustedTime(match.start, match.offsetMins);
                                const end = calcAdjustedTime(match.end, match.offsetMins);
                                const status = match.status === "FINISHED" ? "終了" : match.status === "IN_PROGRESS" ? "進行中" : "開始前";
                                return `<button type="button" class="gantt-detail-match" onclick="openModal('${match.id}')"><span class="gantt-detail-time">${start}–${end}</span><strong>${match.title}</strong><span>${match.teamA} 対 ${match.teamB}</span><small>${status}</small></button>`;
                        }).join("")}</div>` : "";
                        return `<button type="button" class="gantt-event ${statusClass} ${expanded ? "is-expanded" : ""}" style="left:${left}%;width:${width}%" title="${first.grade} ${first.sport}・${ordered.length}試合" aria-expanded="${expanded}" onclick="toggleGanttGroup('${key}')"><span class="gantt-event-primary">${first.grade} / ${first.sport}</span><span class="gantt-event-secondary">${ordered.length}試合 · ${adjustedStart}–${adjustedEnd} · 詳細</span></button>${details}`;
                }).join("");
        return `
      <div class="gantt-lane">
        <div class="gantt-lane-label"><span>${court}</span><small>${matches.length}試合</small></div>
                <div class="gantt-lane-content">
                    <div class="gantt-lane-track">
                        ${Array.from({ length: endH - startH + 1 }, (_, index) => `<span class="gantt-gridline" style="left:${index / (endH - startH) * 100}%"></span>`).join("")}
                        ${events || '<span class="gantt-empty">試合なし</span>'}
                    </div>
        </div>
      </div>`;
    }).join("");
    if (!container)
        return;
    if (!courts.length) {
        container.innerHTML = '<p class="gantt-no-courts">表示する会場を選択してください。</p>';
        return;
    }
    container.innerHTML = `
    <div class="gantt-board">
      <div class="gantt-ruler"><div class="gantt-ruler-label">会場 / 件数</div><div class="gantt-ruler-track">${ruler}</div></div>
    <div class="gantt-lanes gantt-courts-${Math.min(courts.length, 6)}" id="ganttLanes">${lanes}<div id="ganttTimeBar" class="gantt-time-marker" aria-hidden="true"><span>現在 <b data-gantt-current-time></b></span></div></div>
    </div>`;
    updateGanttTimeBar(new Date());
}
function toggleGanttGroup(groupKey) {
    const decodedKey = decodeURIComponent(groupKey);
    appState.expandedGanttGroupKey = appState.expandedGanttGroupKey === decodedKey ? "" : decodedKey;
    renderGantt();
}
function updateGanttTimeBar(now) {
    const bar = document.getElementById("ganttTimeBar");
    const track = document.querySelector(".gantt-lane-track");
    const lanes = document.getElementById("ganttLanes");
    if (!bar || !track || !lanes)
        return;
    const startH = 8;
    const endH = 16;
    const totalMins = (endH - startH) * 60;
    const curMins = (now.getHours() - startH) * 60 + now.getMinutes() + now.getSeconds() / 60;
    const position = Math.max(0, Math.min(100, curMins / totalMins * 100));
    const trackLeft = track.getBoundingClientRect().left - lanes.getBoundingClientRect().left;
    bar.style.left = `${trackLeft + track.clientWidth * position / 100}px`;
    bar.classList.toggle("at-start", position === 0);
    bar.classList.toggle("at-end", position === 100);
    bar.style.display = "block";
    const timeLabel = bar.querySelector("[data-gantt-current-time]");
    if (timeLabel)
        timeLabel.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
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
            const hasScore = m.scoreA !== null && m.scoreB !== null;
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
        const competitionComplete = isCompetitionComplete(cat.matches, cat.format);
        const standingsHtml = cat.format === "exhibition" ? '<p class="py-3 text-center text-[11px] font-bold text-slate-400">エキシビションは得点集計対象外です。</p>' : `
      <div class="overflow-x-auto">
        <table class="w-full text-[11px] min-w-[420px]">
          <thead><tr class="text-left text-slate-400 border-b border-slate-200 dark:border-slate-800"><th class="py-1">順位</th><th>組</th><th>勝</th><th>分</th><th>敗</th><th>競技点</th></tr></thead>
          <tbody>${standings.map((standing) => `<tr class="border-b border-slate-100 dark:border-slate-800/70"><td class="py-1.5 font-black">${competitionComplete ? `${standing.rank}位` : "未確定"}</td><td class="font-black">${standing.team}</td><td>${standing.wins}</td><td>${standing.draws}</td><td>${standing.losses}</td><td class="font-black text-sky-600 dark:text-sky-400">${competitionComplete ? `${standing.rankPoints}pt` : "-"}</td></tr>`).join("")}</tbody>
        </table>
      </div>
    `;
        card.innerHTML = `
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <div class="flex items-center gap-2">
          <span class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black text-xs px-2 py-0.5 rounded-full shadow-sm">${cat.grade}</span>
          <h3 class="font-black text-xs text-slate-800 dark:text-slate-100">${cat.sport}</h3>
        </div>
        <span class="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">
          ${cat.format === "league" ? "総当たり戦" : cat.format === "tournament" ? "トーナメント" : cat.format === "table_tennis_round_robin" ? "卓球総当たり" : cat.format === "exhibition" ? "エキシビション" : "単発形式"}
        </span>
      </div>

    <div class="text-[10px] font-bold text-slate-400">${cat.format === "exhibition" ? "得点集計対象外" : cat.format === "league" ? `勝利 3pt / 引き分け 1pt / 敗戦 0pt｜${competitionComplete ? "順位確定" : "全試合終了後に順位確定"}` : cat.format === "tournament" ? `決勝・3位決定戦 ${competitionComplete ? "終了｜順位確定" : "終了後に順位確定"}` : cat.format === "table_tennis_round_robin" ? `卓球総当たり｜${competitionComplete ? "順位確定" : "全試合終了後に順位確定"}` : "勝利 30pt"}</div>

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
    if (format === "exhibition")
        return [];
    if (format === "tournament")
        return calculateTournamentStandings(matches);
    const teams = Array.from(new Set(matches.flatMap((match) => [match.teamA, match.teamB]).filter(Boolean)));
    const stats = {};
    teams.forEach((team) => { stats[team] = { wins: 0, draws: 0, losses: 0, points: 0, scored: 0, conceded: 0 }; });
    matches.filter((match) => match.status === "FINISHED" && match.scoreA !== null && match.scoreB !== null).forEach((match) => {
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
        .map((team, index) => ({ ...stats[team], team, rank: index + 1, rankPoints: isCompetitionComplete(matches, format) ? pointRule[index] ?? 0 : 0 }));
}
function calculateTournamentStandings(matches) {
    const pointRule = matches.find((match) => match.pointRule)?.pointRule ?? [150, 100, 50, 0];
    const stats = {};
    const ensureTeam = (team) => {
        if (team && !stats[team])
            stats[team] = { wins: 0, draws: 0, losses: 0, points: 0 };
    };
    matches.forEach((match) => { ensureTeam(match.teamA); ensureTeam(match.teamB); });
    matches.filter((match) => match.status === "FINISHED" && match.scoreA !== null && match.scoreB !== null).forEach((match) => {
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
        if (final.status === "FINISHED" && final.scoreA !== null && final.scoreB !== null && final.scoreA !== final.scoreB) {
            addRankedTeam(getLoser(final));
        }
    }
    if (thirdPlace) {
        addRankedTeam(getWinner(thirdPlace));
        if (thirdPlace.status === "FINISHED" && thirdPlace.scoreA !== null && thirdPlace.scoreB !== null && thirdPlace.scoreA !== thirdPlace.scoreB) {
            addRankedTeam(getLoser(thirdPlace));
        }
    }
    Object.keys(stats).forEach((team) => addRankedTeam(team));
    return rankedTeams.map((team, index) => ({
        team,
        ...stats[team],
        rank: index + 1,
        rankPoints: isCompetitionComplete(matches, "tournament") && index < 4 ? pointRule[index] ?? 0 : 0
    }));
}
function calculateScoresAndRanks() {
    const totals = { A: 0, B: 0, C: 0, D: 0 };
    const scoreDisplayA = document.getElementById("scoreDisplayA");
    const scoreDisplayB = document.getElementById("scoreDisplayB");
    const scoreDisplayC = document.getElementById("scoreDisplayC");
    const scoreDisplayD = document.getElementById("scoreDisplayD");
    if (!appState.schedule || appState.schedule.length === 0) {
        const valueHtml = (value) => `${value} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
        if (scoreDisplayA)
            scoreDisplayA.innerHTML = valueHtml(0);
        if (scoreDisplayB)
            scoreDisplayB.innerHTML = valueHtml(0);
        if (scoreDisplayC)
            scoreDisplayC.innerHTML = valueHtml(0);
        if (scoreDisplayD)
            scoreDisplayD.innerHTML = valueHtml(0);
        return;
    }
    const categories = {};
    appState.schedule.forEach((match) => {
        if (match.format === "exhibition")
            return;
        const key = match.blockId ?? `${match.grade} - ${match.sport}`;
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
    const valueHtml = (value) => `${value} <span class="text-[10px] font-normal text-slate-400">pt</span>`;
    if (scoreDisplayA)
        scoreDisplayA.innerHTML = valueHtml(totals.A);
    if (scoreDisplayB)
        scoreDisplayB.innerHTML = valueHtml(totals.B);
    if (scoreDisplayC)
        scoreDisplayC.innerHTML = valueHtml(totals.C);
    if (scoreDisplayD)
        scoreDisplayD.innerHTML = valueHtml(totals.D);
}
function getCompetitionBlocks() {
    const blocks = new Map();
    appState.schedule.forEach((match) => {
        const grade = normalizeGradeLabel(match.grade);
        const sport = String(match.sport ?? "").trim() || "球技";
        const groupKey = `${grade} | ${sport}`;
        if (!blocks.has(groupKey)) {
            blocks.set(groupKey, {
                key: groupKey,
                label: `${grade} / ${sport}`,
                grade,
                sport,
                matches: []
            });
        }
        blocks.get(groupKey).matches.push(match);
    });
    return [...blocks.values()].sort((a, b) => a.label.localeCompare(b.label));
}
function populateBlockSelectors() {
    const blockSelect = document.getElementById("timeConfigBlockSelect");
    const sportSelect = document.getElementById("deleteSportSelect");
    if (blockSelect) {
        const blocks = getCompetitionBlocks();
        const currentValue = blockSelect.value || blocks[0]?.key || "";
        blockSelect.innerHTML = blocks.length
            ? blocks.map((block) => `<option value="${block.key}">${block.label}</option>`).join("")
            : '<option value="">対象なし</option>';
        if (blocks.length > 0 && [...blockSelect.options].some((option) => option.value === currentValue)) {
            blockSelect.value = currentValue;
        }
        else if (blocks.length > 0) {
            blockSelect.value = blocks[0].key;
        }
    }
    if (sportSelect) {
        const sports = [...new Set(appState.schedule.map((match) => match.sport).filter(Boolean))].sort();
        sportSelect.innerHTML = `<option value="ALL">全競技</option>${sports.map((sport) => `<option value="${sport}">${sport}</option>`).join("")}`;
    }
}
function renderTimeConfigEditor() {
    const blockSelect = document.getElementById("timeConfigBlockSelect");
    const listContainer = document.getElementById("timeConfigList");
    const summaryContainer = document.getElementById("teamScoreSummary");
    if (!blockSelect || !listContainer || !summaryContainer)
        return;
    const blocks = getCompetitionBlocks();
    const selectedKey = blockSelect.value || blocks[0]?.key || "";
    const block = blocks.find((item) => item.key === selectedKey) || blocks[0];
    if (!block) {
        listContainer.innerHTML = '<div class="text-xs text-slate-400 font-bold py-3">編集対象の学年・球技グループがありません。</div>';
        summaryContainer.innerHTML = "";
        return;
    }
    const teamTotals = { A: 0, B: 0, C: 0, D: 0 };
    block.matches.forEach((match) => {
        const teams = [match.teamA, match.teamB];
        teams.forEach((team) => {
            if (team && teamTotals[team] !== undefined) {
                const score = team === match.teamA ? (match.scoreA ?? 0) : (match.scoreB ?? 0);
                teamTotals[team] += score;
            }
        });
    });
    const summaryText = ["A", "B", "C", "D"].map((team) => `<span class="px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-black">${team}組: ${teamTotals[team]}点</span>`).join("");
    summaryContainer.innerHTML = `<div class="flex flex-wrap gap-2">${summaryText}</div>`;
    listContainer.innerHTML = `
        <div class="mb-2 text-[10px] font-black text-slate-500 dark:text-slate-400">対象: ${block.label} / ${block.matches.length}件</div>
        ${block.matches
            .sort((a, b) => (a.start || "00:00").localeCompare(b.start || "00:00"))
            .map((match) => `
                <div class="time-setting-row" data-match-row="${match.id}">
                    <div class="flex flex-col gap-1">
                        <div class="font-black text-[11px] text-slate-700 dark:text-slate-200">${match.title || match.blockTitle || "試合"}</div>
                        <div class="text-[10px] text-slate-500 dark:text-slate-400">${match.court} / ${normalizeGradeLabel(match.grade)} / ${match.sport} / ${match.teamA || "-"} vs ${match.teamB || "-"}</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-[10px] font-black text-slate-500 dark:text-slate-400">開始</label>
                        <input type="time" value="${match.start || "08:00"}" data-match-id="${match.id}" data-field="start" class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 font-bold text-slate-800 dark:text-slate-100">
                    </div>
                    <div class="flex flex-col gap-1">
                        <label class="text-[10px] font-black text-slate-500 dark:text-slate-400">終了</label>
                        <input type="time" value="${match.end || addMinutesToTime(match.start || "08:00", 30)}" data-match-id="${match.id}" data-field="end" class="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 py-1.5 font-bold text-slate-800 dark:text-slate-100">
                    </div>
                </div>
            `)
            .join("")}
    `;
}
function saveTimeConfig() {
    const rows = document.querySelectorAll("[data-match-row]");
    if (!rows.length) {
        alert("保存対象の試合がありません。");
        return;
    }
    let updated = 0;
    rows.forEach((row) => {
        const matchId = row.getAttribute("data-match-row");
        const match = appState.schedule.find((item) => item.id === matchId);
        if (!match)
            return;
        const startInput = row.querySelector('[data-field="start"]');
        const endInput = row.querySelector('[data-field="end"]');
        if (startInput && typeof startInput.value === "string" && startInput.value)
            match.start = startInput.value;
        if (endInput && typeof endInput.value === "string" && endInput.value)
            match.end = endInput.value;
        updated += 1;
    });
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    renderGantt();
    alert(`${updated}件の試合時間を保存しました。`);
}
function deleteSelectedCompetition() {
    const sport = document.getElementById("deleteSportSelect")?.value ?? "ALL";
    const grade = document.getElementById("deleteGradeSelect")?.value ?? "ALL";
    const court = document.getElementById("deleteCourtSelect")?.value ?? "ALL";
    const passwordValue = document.getElementById("deleteConfirmationPassword")?.value ?? "";
    if (passwordValue !== "admin123") {
        alert("高度操作パスワードが一致しません。");
        return;
    }
    const beforeCount = appState.schedule.length;
    appState.schedule = appState.schedule.filter((match) => {
        const sportMatch = sport === "ALL" || match.sport === sport;
        const gradeMatch = grade === "ALL" || match.grade === grade;
        const courtMatch = court === "ALL" || match.court === court;
        return !(sportMatch && gradeMatch && courtMatch);
    });
    if (appState.schedule.length === beforeCount) {
        alert("削除対象の試合がありません。");
        return;
    }
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    renderResultsTab();
    calculateScoresAndRanks();
    populateBlockSelectors();
    renderTimeConfigEditor();
    alert(`${beforeCount - appState.schedule.length}件の試合を削除しました。`);
    const passwordInput = document.getElementById("deleteConfirmationPassword");
    if (passwordInput)
        passwordInput.value = "";
}
function exportResultsCsv() {
    const rows = [["学年", "競技", "ブロック", "タイトル", "チームA", "点A", "チームB", "点B", "開始", "終了", "状態"]];
    appState.schedule.forEach((match) => {
        rows.push([
            match.grade,
            match.sport,
            match.blockTitle || match.title,
            match.title,
            match.teamA,
            match.scoreA ?? "",
            match.teamB,
            match.scoreB ?? "",
            match.start,
            match.end,
            match.status
        ]);
    });
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sportsfes-results-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}
function applyBulkOperations() {
    const court = document.getElementById("bulkCourt")?.value ?? "ALL";
    const sport = document.getElementById("bulkSport")?.value ?? "ALL";
    const status = document.getElementById("bulkStatus")?.value ?? "NO_CHANGE";
    const delay = Number(document.getElementById("bulkDelay")?.value ?? 0);
    const targets = appState.schedule.filter((match) => (court === "ALL" || match.court === court) && (sport === "ALL" || match.sport === sport));
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
    renderTimeline();
    renderCourtDelaySummary();
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
    const scheduleFormat = sport === "卓球" && format === "tournament" ? "table_tennis_round_robin" : format;
    const definitions = getFormatMatchDefinitions(scheduleFormat);
    definitions.forEach((definition, index) => {
        appState.schedule.push({
            id: `${blockId}_${index + 1}`,
            blockId,
            blockTitle,
            court,
            sport,
            grade,
            title: definition[0],
            format: scheduleFormat,
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
    populateBlockSelectors();
    const blockSelect = document.getElementById("timeConfigBlockSelect");
    if (blockSelect)
        blockSelect.value = `${normalizeGradeLabel(grade)} | ${sport}`;
    renderTimeConfigEditor();
    renderTimeline();
    renderCourtDelaySummary();
    renderResultsTab();
    calculateScoresAndRanks();
    alert(`${grade} ${sport}の試合ブロックを${definitions.length}試合作成しました。`);
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
    document.getElementById("inputCompetitionLead").value = m.competitionLead ?? m.staff ?? "";
    document.getElementById("inputReferee").value = m.referee ?? "";
    document.getElementById("inputAttendance").value = m.attendance ?? "";
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
function adjustModalDelay(diff) {
    const input = document.getElementById("inputDelayMinutes");
    if (input)
        input.value = String((parseInt(input.value, 10) || 0) + diff);
}
function saveModalData() {
    const matchId = document.getElementById("modalMatchId").value;
    const m = appState.schedule.find((item) => item.id === matchId);
    if (!m)
        return;
    const newOffset = parseInt(document.getElementById("inputDelayMinutes").value, 10) || 0;
    const diff = newOffset - m.offsetMins;
    m.status = appState.selectedModalStatus;
    const scoreA = document.getElementById("inputModalScoreA").value;
    const scoreB = document.getElementById("inputModalScoreB").value;
    m.scoreA = scoreA === "" ? null : Math.max(0, parseInt(scoreA, 10) || 0);
    m.scoreB = scoreB === "" ? null : Math.max(0, parseInt(scoreB, 10) || 0);
    updateTournamentBracket(m.blockId);
    updateExhibitionTeams(m.sport);
    m.referee = document.getElementById("inputReferee").value;
    m.competitionLead = document.getElementById("inputCompetitionLead").value;
    m.staff = m.competitionLead;
    m.attendance = document.getElementById("inputAttendance").value;
    if (diff !== 0) {
        applyCascadeOffset(m.id, diff);
    }
    else {
        saveState();
        renderTimeline();
        renderCourtDelaySummary();
    }
    calculateScoresAndRanks();
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
function authenticateDataTools() {
    const password = document.getElementById("adminDataPassword")?.value ?? "";
    if (password === "admin123") {
        document.getElementById("adminDataAuthGate")?.classList.add("hidden");
        document.getElementById("adminDataControls")?.classList.remove("hidden");
        document.getElementById("adminDataAuthError")?.classList.add("hidden");
        loadBackupList();
        return;
    }
    document.getElementById("adminDataAuthError")?.classList.remove("hidden");
}
function lockDataTools() {
    document.getElementById("adminDataControls")?.classList.add("hidden");
    document.getElementById("adminDataAuthGate")?.classList.remove("hidden");
    document.getElementById("adminDataAuthError")?.classList.add("hidden");
    const password = document.getElementById("adminDataPassword");
    if (password)
        password.value = "";
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
    if (appState.announcement)
        showAnnouncement(appState.announcement);
}
function getBackupCollection() {
    if (!firebaseSync.db || !firebaseSync.initialized)
        return null;
    return firebaseSync.db.collection("app_data").doc("ball_sports_test2_backups").collection("snapshots");
}
async function createBackup() {
    const status = document.getElementById("dataBackupStatus");
    const backups = getBackupCollection();
    if (!backups) {
        if (status)
            status.textContent = "Firebase未接続です。JSON出力からバックアップしてください。";
        return;
    }
    if (status)
        status.textContent = "バックアップを作成しています...";
    const createdAt = new Date().toISOString();
    const backupId = createdAt.replace(/[:.]/g, "-");
    try {
        await backups.doc(backupId).set({
            schedule: appState.schedule,
            announcement: appState.announcement,
            createdAt,
            matchCount: appState.schedule.length,
            schemaVersion: 1
        });
        if (status)
            status.textContent = `${new Date(createdAt).toLocaleString("ja-JP")} に ${appState.schedule.length}試合をバックアップしました。`;
        await loadBackupList();
    }
    catch (error) {
        console.error("[バックアップ作成失敗]", error);
        if (status)
            status.textContent = "バックアップを作成できませんでした。JSON出力を利用してください。";
    }
}
async function loadBackupList() {
    const container = document.getElementById("dataBackupList");
    const backups = getBackupCollection();
    if (!container || !backups)
        return;
    try {
        const snapshot = await backups.orderBy("createdAt", "desc").limit(10).get();
        if (snapshot.empty) {
            const status = document.getElementById("dataBackupStatus");
            if (status)
                status.textContent = "バックアップ履歴はありません。";
            container.innerHTML = '<p class="text-xs text-slate-400">バックアップ履歴はありません。</p>';
            return;
        }
        const latest = snapshot.docs[0].data();
        const status = document.getElementById("dataBackupStatus");
        if (status)
            status.textContent = `${snapshot.size}件のバックアップがあります。最新: ${new Date(latest.createdAt).toLocaleString("ja-JP")}`;
        container.innerHTML = snapshot.docs.map((doc) => {
            const backup = doc.data();
            const date = new Date(backup.createdAt).toLocaleString("ja-JP");
            return `<div class="backup-row"><span><strong>${date}</strong><small>${Number(backup.matchCount) || 0}試合</small></span><button type="button" class="admin-command-secondary" onclick="restoreBackup('${doc.id}')"><i data-lucide="rotate-ccw"></i> 復元</button></div>`;
        }).join("");
    }
    catch (error) {
        console.error("[バックアップ一覧の取得失敗]", error);
        container.innerHTML = '<p class="text-xs text-rose-500">バックアップ履歴を読み込めません。JSON出力をご利用ください。</p>';
    }
}
async function restoreBackup(backupId) {
    const status = document.getElementById("dataBackupStatus");
    const backups = getBackupCollection();
    if (!backups)
        return;
    if (!confirm("選択したバックアップで現在の試合データを置き換えます。続けますか？"))
        return;
    try {
        const snapshot = await backups.doc(backupId).get();
        if (!snapshot.exists)
            throw new Error("backup not found");
        const backup = snapshot.data();
        if (!Array.isArray(backup.schedule) || !backup.schedule.every(isMatch))
            throw new Error("invalid backup data");
        appState.schedule = backup.schedule;
        appState.announcement = typeof backup.announcement === "string" ? backup.announcement : "";
        saveState();
        renderCourtDelaySummary();
        renderTimeline();
        renderResultsTab();
        calculateScoresAndRanks();
        populateBlockSelectors();
        renderTimeConfigEditor();
        if (appState.announcement)
            showAnnouncement(appState.announcement);
        else
            document.getElementById("announcementBar")?.classList.add("hidden");
        if (status)
            status.textContent = `${new Date(backup.createdAt).toLocaleString("ja-JP")} のバックアップから復元しました。`;
    }
    catch (error) {
        console.error("[バックアップ復元失敗]", error);
        if (status)
            status.textContent = "復元できませんでした。選択したバックアップを確認してください。";
    }
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
        && ["tournament", "league", "single", "table_tennis_round_robin", "exhibition"].includes(match.format ?? "")
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
function resetScoreLogs() {
    if (!confirm("全試合の得点と進行状態を消去します。競技時間・対戦表は保持されます。"))
        return;
    appState.schedule.forEach((match) => {
        match.scoreA = null;
        match.scoreB = null;
        match.status = "BEFORE";
    });
    const blockIds = new Set(appState.schedule.map((match) => match.blockId).filter(Boolean));
    blockIds.forEach((blockId) => updateTournamentBracket(blockId));
    [...new Set(appState.schedule.map((match) => match.sport))].forEach(updateExhibitionTeams);
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    renderResultsTab();
    calculateScoresAndRanks();
    renderTimeConfigEditor();
    alert("得点ログを消去しました。");
}
function resetAllData() {
    if (!confirm("全てのデータを初期状態にリセットしますか？"))
        return;
    appState.schedule = cloneInitialSchedule();
    appState.announcement = "";
    appState.expandedGroups = {};
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
    renderResultsTab();
    calculateScoresAndRanks();
    populateBlockSelectors();
    renderTimeConfigEditor();
    document.getElementById("announcementBar")?.classList.add("hidden");
}
window.toggleTheme = toggleTheme;
window.toggleContrast = toggleContrast;
window.switchTab = switchTab;
window.createNewMatch = createNewMatch;
window.createCompetitionBlock = createCompetitionBlock;
window.quickSaveScore = quickSaveScore;
window.applyCascadeOffset = applyCascadeOffset;
window.handleCourtFilterChange = handleCourtFilterChange;
window.toggleGroupExpand = toggleGroupExpand;
window.toggleGanttGroup = toggleGanttGroup;
window.setModalStatus = setModalStatus;
window.setModalDelay = setModalDelay;
window.adjustModalDelay = adjustModalDelay;
window.saveModalData = saveModalData;
window.openModal = openModal;
window.closeModal = closeModal;
window.authenticateAdmin = authenticateAdmin;
window.authenticateDataTools = authenticateDataTools;
window.lockDataTools = lockDataTools;
window.lockAdmin = lockAdmin;
window.broadcastAnnouncement = broadcastAnnouncement;
window.clearAnnouncement = clearAnnouncement;
window.dismissAnnouncement = dismissAnnouncement;
window.createBackup = createBackup;
window.loadBackupList = loadBackupList;
window.restoreBackup = restoreBackup;
window.renderTimeline = renderTimeline;
window.renderResultsTab = renderResultsTab;
window.renderCourtDelaySummary = renderCourtDelaySummary;
window.renderGantt = renderGantt;
window.setTimelineViewMode = setTimelineViewMode;
window.exportData = exportData;
window.importData = importData;
window.resetScoreLogs = resetScoreLogs;
window.resetAllData = resetAllData;
window.applyBulkOperations = applyBulkOperations;
window.populateBlockSelectors = populateBlockSelectors;
window.renderTimeConfigEditor = renderTimeConfigEditor;
window.saveTimeConfig = saveTimeConfig;
window.deleteSelectedCompetition = deleteSelectedCompetition;
window.exportResultsCsv = exportResultsCsv;
