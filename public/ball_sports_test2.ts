export {};

type MatchStatus = "BEFORE" | "IN_PROGRESS" | "FINISHED";
type MatchFormat = "tournament" | "league" | "single" | "table_tennis_round_robin" | "exhibition";

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
  competitionLead?: string;
  attendance?: string;
  status: MatchStatus;
  offsetMins: number;
  blockId?: string;
  blockTitle?: string;
  pointRule?: [number, number, number, number];
};

declare const firebase: any;

declare global {
  interface Window {
    firebase: any;
    lucide: any;
  }
}

type AppState = {
  schedule: Match[];
  timelineViewMode: "grouped" | "byCourt";
  expandedGroups: Record<string, boolean>;
  expandedGanttGroupKey: string;
  selectedModalStatus: MatchStatus;
  isAdmin: boolean;
  announcement: string;
};

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

const INITIAL_SCHEDULE: Match[] = [
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

const LEAGUE_PAIRS: Array<[string, string]> = [["A", "B"], ["A", "C"], ["A", "D"], ["B", "C"], ["B", "D"], ["C", "D"]];
const TOURNAMENT_PAIRS: Array<[string, string, string]> = [["準決勝1", "A", "B"], ["準決勝2", "C", "D"], ["3位決定戦", "準決勝1の敗者", "準決勝2の敗者"], ["決勝", "準決勝1の勝者", "準決勝2の勝者"]];

function getFormatMatchDefinitions(format: MatchFormat): Array<[string, string, string]> {
  if (format === "tournament") return TOURNAMENT_PAIRS;
  if (format === "exhibition") return [["エキシビション", "優勝チーム", "教師"]];
  if (format === "single") return [["単発試合", "A", "B"]];
  if (format === "table_tennis_round_robin") {
    return Array.from({ length: 3 }, (_, roundIndex) => LEAGUE_PAIRS.map((pair, pairIndex): [string, string, string] => [`${roundIndex + 1}回戦 第${pairIndex + 1}試合`, pair[0], pair[1]])).flat();
  }
  return LEAGUE_PAIRS.map((pair, index): [string, string, string] => [`第${index + 1}試合`, pair[0], pair[1]]);
}

function parseTimeMinutes(value: string | undefined): number {
  if (typeof value !== "string" || !value.includes(":")) return 0;
  const [hoursText, minutesText = "0"] = value.split(":");
  const hours = Number(hoursText);
  const minutes = Number(minutesText);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return 0;
  return hours * 60 + minutes;
}

function normalizeCompetitionSchedule(sourceSchedule: Match[]): Match[] {
  const normalized: Match[] = [];
  sourceSchedule.forEach((source) => {
    if (!source || typeof source !== "object") return;
    if (source.blockId) {
      normalized.push(source);
      return;
    }

    const blockId = `block_${source.id}`;
    const blockTitle = "第1試合";
    const startValue = typeof source.start === "string" ? source.start : typeof (source as any).startTime === "string" ? (source as any).startTime : "08:00";
    const endValue = typeof source.end === "string" ? source.end : typeof (source as any).endTime === "string" ? (source as any).endTime : addMinutesToTime(startValue, 30);
    const startMinutes = parseTimeMinutes(startValue);
    const endMinutes = parseTimeMinutes(endValue);
    const duration = Math.max(10, Math.round(Math.max(endMinutes - startMinutes, 30)));
    const definitions = getFormatMatchDefinitions(source.format);

    definitions.forEach((definition, index) => {
      const start = addMinutesToTime(startValue, index * (duration + 5));
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

function cloneInitialSchedule(): Match[] {
  return INITIAL_SCHEDULE.map((match) => ({ ...match }));
}

function loadPersistedSchedule(): Match[] {
  try {
    const raw = localStorage.getItem("gym78_ball_day_v1_schedule");
    if (!raw) return cloneInitialSchedule();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return cloneInitialSchedule();
    if (parsed.some((match) => match && typeof match === "object" && match.blockId)) return parsed;
    const normalized = normalizeCompetitionSchedule(parsed);
    return normalized.length > 0 ? normalized : cloneInitialSchedule();
  }
  catch {
    return cloneInitialSchedule();
  }
}

function loadPersistedAnnouncement(): string {
  try {
    const raw = localStorage.getItem("gym78_ball_day_v1_announcement");
    return typeof raw === "string" ? raw : "";
  }
  catch {
    return "";
  }
}

let appState: AppState = {
  schedule: loadPersistedSchedule(),
  timelineViewMode: "byCourt",
  expandedGroups: {},
  expandedGanttGroupKey: "",
  selectedModalStatus: "BEFORE",
  isAdmin: false,
  announcement: loadPersistedAnnouncement()
};
(window as any).appState = appState;

let firebaseSync: { app: any; db: any; initialized: boolean; online: boolean; unsubscribe: any } = {
  app: null,
  db: null,
  initialized: false,
  online: false,
  unsubscribe: null
};
(window as any).firebaseSync = firebaseSync;
let firebaseWriteInFlight = false;
let firebaseWritePending = false;

function updateSyncStatus(label: string, tone: "success" | "warning" | "sky" = "sky"): void {
  const badge = document.getElementById("syncStatusBadge");
  const text = document.getElementById("syncStatusText");
  if (!badge || !text) return;

  text.textContent = label;
  badge.className = `inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-bold ${tone === "success" ? "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : tone === "warning" ? "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300" : "border-sky-300 bg-sky-100 text-sky-700 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300"}`;

  const dot = badge.querySelector("span");
  if (dot) {
    dot.className = `inline-block h-2 w-2 rounded-full ${tone === "success" ? "bg-emerald-500" : tone === "warning" ? "bg-amber-500" : "bg-sky-500"}`;
  }
}

function initializeLucideIcons(): void {
  if (!window.lucide) return;

  const iconMap: Record<string, string> = {
    "fa-triangle-exclamation": "triangle-alert",
    "fa-xmark": "x",
    "fa-trophy": "trophy",
    "fa-circle-half-stroke": "contrast",
    "fa-sun": "sun",
    "fa-moon": "moon",
    "fa-clock-rotate-left": "history",
    "fa-chart-gantt": "chart-no-axes-gantt",
    "fa-ranking-star": "trophy",
    "fa-gear": "settings-2",
    "fa-futbol": "goal",
    "fa-filter": "list-filter",
    "fa-bolt": "zap",
    "fa-sitemap": "network",
    "fa-file-csv": "file-spreadsheet",
    "fa-lock": "lock-keyhole",
    "fa-bullhorn": "megaphone",
    "fa-tower-broadcast": "radio-tower",
    "fa-eraser": "eraser",
    "fa-calendar-plus": "calendar-plus-2",
    "fa-arrow-up-right-from-square": "external-link",
    "fa-arrow-left": "arrow-left",
    "fa-layer-group": "layers-2",
    "fa-plus-circle": "circle-plus",
    "fa-plus": "plus",
    "fa-diagram-project": "workflow",
    "fa-clock": "clock-3",
    "fa-floppy-disk": "save",
    "fa-trash": "trash-2",
    "fa-database": "database",
    "fa-download": "download",
    "fa-upload": "upload",
    "fa-location-dot": "map-pin"
  };

  const refresh = () => {
    document.querySelectorAll<HTMLElement>('i[class*="fa-"]').forEach((icon) => {
      const legacyClass = [...icon.classList].find((className) => className.startsWith("fa-") && className !== "fa-solid");
      if (!legacyClass) return;
      const iconName = iconMap[legacyClass] ?? (legacyClass.startsWith("fa-chevron-") ? legacyClass.replace("fa-", "") : "circle-help");
      icon.dataset.lucide = iconName;
      [...icon.classList].filter((className) => className.startsWith("fa-")).forEach((className) => icon.classList.remove(className));
    });
    window.lucide.createIcons();
  };

  refresh();
  let refreshQueued = false;
  new MutationObserver((mutations) => {
    const hasIconPlaceholder = mutations.some((mutation) => [...mutation.addedNodes].some((node) =>
      node instanceof Element && (node.matches('i[class*="fa-"], i[data-lucide]') || node.querySelector('i[class*="fa-"], i[data-lucide]'))));
    if (!hasIconPlaceholder || refreshQueued) return;
    refreshQueued = true;
    requestAnimationFrame(() => {
      refreshQueued = false;
      refresh();
    });
  }).observe(document.body, { childList: true, subtree: true });
}

function decodeStringifiedValue(value: string | unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return "";

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

function normalizeScheduleEntries(value: unknown): any[] | null {
  if (Array.isArray(value)) {
    const parsed = value
      .map((entry) => typeof entry === "string" ? decodeStringifiedValue(entry) : entry)
      .filter((entry) => entry !== null && entry !== undefined);
    if (parsed.length === 0) return null;
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

function getPayloadEnvelope(data: any): any {
  if (!data || typeof data !== "object") return null;
  return data.data && typeof data.data === "object" ? data.data : data;
}

function extractRemoteSchedule(data: any): any[] | null {
  const payload = getPayloadEnvelope(data);
  if (!payload || typeof payload !== "object") return null;

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
    if (normalized) return normalized;
  }

  return null;
}

function normalizeRemoteAnnouncement(data: any): string {
  const payload = getPayloadEnvelope(data) || data || {};
  const direct = typeof payload.announcement === "string" ? payload.announcement : "";
  const value = typeof direct === "string" ? decodeStringifiedValue(direct) : "";
  return typeof value === "string" ? value : "";
}

function applyRemoteDocumentData(data: any): boolean {
  const remoteSchedule = extractRemoteSchedule(data);
  if (!remoteSchedule || !Array.isArray(remoteSchedule) || remoteSchedule.length === 0) {
    console.warn("[同期] 有効なスケジュールなし");
    if (!appState.schedule || appState.schedule.length === 0) appState.schedule = INITIAL_SCHEDULE;
    return false;
  }

  const needsNormalize = remoteSchedule.some((match: any) => !match.blockId);
  const nextSchedule = needsNormalize ? normalizeCompetitionSchedule(remoteSchedule) : remoteSchedule;
  const nextAnnouncement = normalizeRemoteAnnouncement(data);
  const currentSignature = JSON.stringify({ schedule: appState.schedule ?? [], announcement: appState.announcement });
  const nextSignature = JSON.stringify({ schedule: nextSchedule ?? [], announcement: nextAnnouncement });
  if (currentSignature === nextSignature) return true;
  appState.schedule = nextSchedule;
  if (appState.schedule.length === 0) appState.schedule = INITIAL_SCHEDULE;
  appState.announcement = nextAnnouncement;
  localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
  localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
  updateSyncStatus("同期済み", "success");
  renderCourtDelaySummary();
  renderTimeline();
  renderResultsTab();
  calculateScoresAndRanks();
  if (appState.announcement) showAnnouncement(appState.announcement);
  else document.getElementById("announcementBar")?.classList.add("hidden");
  console.log("[同期完了]", appState.schedule.length, "件");
  return true;
}

function subscribeToRemoteData(): void {
  if (!firebaseSync.db || !firebaseSync.initialized) return;

  if (firebaseSync.unsubscribe) {
    try {
      firebaseSync.unsubscribe();
    }
    catch {
      // ignore
    }
  }

  const primaryDoc = firebaseSync.db.collection("app_data").doc("ball_sports_test2_main");
  firebaseSync.unsubscribe = primaryDoc.onSnapshot((docSnap: any) => {
    if (!docSnap.exists) return;
    applyRemoteDocumentData(docSnap.data());
  }, () => {
    updateSyncStatus("待機中", "sky");
  });
}

async function initFirebaseSync(): Promise<void> {
  if (!window.firebase || !window.firebase.apps) return;

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
    } else {
      const primarySnapshot = await firebaseSync.db.collection("app_data").doc("ball_sports_test2_main").get();
      if (!primarySnapshot.exists) await syncStateToFirebase();
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

async function syncStateToFirebase(): Promise<void> {
  if (!firebaseSync.db || !firebaseSync.initialized) return;
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
    if (firebaseWritePending) syncStateToFirebase();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startClock();
  initializeLucideIcons();
  const dataToolsView = window.location.hash === "#data-tools";
  if (new URLSearchParams(window.location.search).get("view") === "match-tools" || window.location.hash === "#match-tools" || dataToolsView) {
    document.body.classList.add("match-tools-view");
    if (dataToolsView) document.body.classList.add("data-tools-view");
    switchTab("admin");
  }
  updateSyncStatus("待機中", "sky");
  initFirebaseSync();
  renderCourtDelaySummary();
  renderTimeline();
  renderResultsTab();
  calculateScoresAndRanks();
  if (appState.announcement) showAnnouncement(appState.announcement);
  else document.getElementById("announcementBar")?.classList.add("hidden");
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

function toggleContrast(): void {
  const enabled = document.body.classList.toggle("high-contrast");
  const button = document.getElementById("contrastToggleBtn");
  button?.setAttribute("aria-pressed", String(enabled));
  if (button) button.classList.toggle("contrast-active", enabled);
}

function startClock(): void {
  const clockEl = document.getElementById("clockDisplay");
  const adminClockEl = document.getElementById("adminClockDisplay");
  if (!clockEl && !adminClockEl) return;
  let lastGanttTick = "";
  let lastAdminTick = "";

  const update = () => {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    const secs = String(now.getSeconds()).padStart(2, "0");
    const ms = String(now.getMilliseconds()).padStart(3, "0");
    if (clockEl) clockEl.innerHTML = `${hrs}:${mins}:${secs}.<span class="text-[10px] text-sky-500">${ms}</span>`;

    const ganttTick = `${hrs}:${mins}:${secs}`;
    if (ganttTick !== lastGanttTick) {
      updateGanttTimeBar(now);
      lastGanttTick = ganttTick;
    }
    if (adminClockEl && ganttTick !== lastAdminTick) {
      adminClockEl.textContent = ganttTick;
      lastAdminTick = ganttTick;
    }
    requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

function saveState(): void {
  localStorage.setItem("gym78_ball_day_v1_schedule", JSON.stringify(appState.schedule));
  localStorage.setItem("gym78_ball_day_v1_announcement", appState.announcement);
  if (firebaseSync.initialized) {
    syncStateToFirebase().catch((err) => console.warn("[自動同期スキップ]", err));
  }
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
  document.getElementById("courtDelaySummaryBar")?.classList.toggle("hidden", tabName === "admin");

  const activeBtn = document.getElementById(`tab-${tabName}`);
  if (activeBtn) {
    activeBtn.classList.add("border-sky-500", "text-sky-600", "dark:text-sky-400");
  }

  if (tabName === "gantt") renderGantt();
  if (tabName === "results") renderResultsTab();
}

function getSelectedCourts(): string[] {
  return [...document.querySelectorAll<HTMLInputElement>(".court-filter-checkbox")]
    .filter((box) => box.checked && box.value !== "ALL")
    .map((box) => box.value);
}

function handleCourtFilterChange(changedBox: HTMLInputElement): void {
  const boxes = [...document.querySelectorAll<HTMLInputElement>(".court-filter-checkbox")];
  const allBox = boxes.find((box) => box.value === "ALL");
  const courtBoxes = boxes.filter((box) => box.value !== "ALL");

  if (changedBox.value === "ALL") {
    courtBoxes.forEach((box) => { box.checked = changedBox.checked; });
  } else if (allBox) {
    allBox.checked = courtBoxes.length > 0 && courtBoxes.every((box) => box.checked);
  }

  renderTimeline();
  renderGantt();
}

function getSelectedGanttCourts(): string[] {
  return [...document.querySelectorAll<HTMLInputElement>(".gantt-court-checkbox")]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
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

    let badgeColor = "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400";
    let delayText = "順調 (±0分)";

    if (maxOffset > 0) {
      badgeColor = "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-500/40 text-rose-600 dark:text-rose-400 font-bold";
      delayText = `+${maxOffset}分 遅延中`;
    } else if (maxOffset < 0) {
      badgeColor = "bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-500/40 text-sky-600 dark:text-sky-400 font-bold";
      delayText = `${maxOffset}分 前倒し`;
    }

    const currentLabel = inProgress ? `${inProgress.grade} / ${inProgress.sport} / ${inProgress.title}` : nextMatch ? `${nextMatch.grade} / ${nextMatch.sport} / ${nextMatch.title}` : "試合なし";

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
  const selectedCourts = getSelectedCourts();
  const statusFilter = (document.getElementById("statusFilter") as HTMLSelectElement | null)?.value ?? "ALL";

  if (!container) return;
  container.innerHTML = "";
  container.className = appState.timelineViewMode === "byCourt" ? "court-lane-scroll" : "space-y-3";

  const filtered = appState.schedule.filter((m) => {
    if (!selectedCourts.includes(m.court)) return false;
    if (statusFilter !== "ALL" && m.status !== statusFilter) return false;
    return true;
  });

  if (selectedCourts.length === 0) {
    container.innerHTML = '<div class="text-center py-8 text-xs text-slate-400 font-bold">表示するコートを選択してください</div>';
    return;
  }

  if (appState.timelineViewMode === "grouped") {
    const groups: Record<string, Match[]> = {};
    filtered.forEach((m) => {
      const key = m.blockId ?? `${m.grade} - ${m.sport}`;
      if (!groups[key]) groups[key] = [];
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
  } else {
    const courts = getSelectedCourts();
    courts.forEach((court) => {
      const cMatches = filtered
        .filter((m) => m.court === court)
        .sort((a, b) => calcAdjustedTime(a.start, a.offsetMins).localeCompare(calcAdjustedTime(b.start, b.offsetMins)));
      if (cMatches.length === 0) return;

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
  window.lucide?.createIcons();
}

function createMatchItemHtml(m: Match): string {
  const adjStart = calcAdjustedTime(m.start, m.offsetMins);
  const adjEnd = calcAdjustedTime(m.end, m.offsetMins);
  const isDelayed = m.offsetMins > 0;

  let statusBadge = '<span class="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] px-2 py-0.5 rounded font-bold">開始前</span>';
  if (m.status === "IN_PROGRESS") statusBadge = '<span class="bg-amber-500 text-slate-950 text-[10px] px-2 py-0.5 rounded font-black animate-pulse">進行中</span>';
  if (m.status === "FINISHED") statusBadge = '<span class="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded font-bold"><i data-lucide="check" class="w-3 h-3 inline"></i> 終了</span>';

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
          <div class="flex items-center gap-0.5 border-l border-slate-200 dark:border-slate-800 pl-2">
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

function toggleGroupExpand(gKey: string): void {
  appState.expandedGroups[gKey] = appState.expandedGroups[gKey] !== true;
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
  updateTournamentBracket(m.blockId);
  updateExhibitionTeams(m.sport);

  saveState();
  renderTimeline();
  renderCourtDelaySummary();
  calculateScoresAndRanks();
}

function getWinner(match: Match): string | null {
  if (match.status !== "FINISHED" || match.scoreA === null || match.scoreB === null || match.scoreA === match.scoreB) return null;
  return match.scoreA > match.scoreB ? match.teamA : match.teamB;
}

function getLoser(match: Match): string | null {
  if (match.status !== "FINISHED" || match.scoreA === null || match.scoreB === null || match.scoreA === match.scoreB) return null;
  return match.scoreA < match.scoreB ? match.teamA : match.teamB;
}

function isCompetitionComplete(matches: Match[], format: MatchFormat): boolean {
  if (format === "exhibition" || matches.length === 0) return false;
  const hasResult = (match: Match) => match.status === "FINISHED" && match.scoreA !== null && match.scoreB !== null;
  if (format === "tournament") {
    const final = matches.find((match) => match.title === "決勝");
    const thirdPlace = matches.find((match) => match.title === "3位決定戦");
    return !!final && !!thirdPlace && hasResult(final) && hasResult(thirdPlace);
  }
  return matches.every(hasResult);
}

function updateExhibitionTeams(sport: string): void {
  const competitions = new Map<string, Match[]>();
  appState.schedule.forEach((match) => {
    if (match.sport !== sport || match.format === "exhibition") return;
    const key = match.blockId ?? `${match.grade} - ${match.sport}`;
    if (!competitions.has(key)) competitions.set(key, []);
    competitions.get(key)?.push(match);
  });
  const completed = [...competitions.values()].filter((matches) => isCompetitionComplete(matches, matches[0].format));
  const latest = completed[completed.length - 1];
  let champion: string | null = null;
  if (latest) {
    if (latest[0].format === "tournament") {
      const final = latest.find((match) => match.title === "決勝");
      champion = final ? getWinner(final) : null;
    } else {
      champion = calculateCompetitionStandings(latest, latest[0].format).find((standing) => standing.rank === 1)?.team ?? null;
    }
  }
  appState.schedule.filter((match) => match.sport === sport && match.format === "exhibition" && match.status !== "FINISHED")
    .forEach((match) => { match.teamA = champion ?? "優勝チーム"; });
}

function updateTournamentBracket(blockId?: string): void {
  if (!blockId) return;
  const blockMatches = appState.schedule.filter((match) => match.blockId === blockId && match.format === "tournament");
  const semiOne = blockMatches.find((match) => match.title === "準決勝1");
  const semiTwo = blockMatches.find((match) => match.title === "準決勝2");
  const thirdPlace = blockMatches.find((match) => match.title === "3位決定戦");
  const final = blockMatches.find((match) => match.title === "決勝");
  if (!semiOne || !semiTwo) return;

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

function applyCascadeOffset(targetMatchId: string, diffMins: number): void {
  const target = appState.schedule.find((m) => m.id === targetMatchId);
  if (!target) return;

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
  if (!(document.getElementById("sec-gantt") as HTMLElement | null)?.classList.contains("hidden")) renderGantt();
}

function renderGantt(): void {
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
      .filter((match) => match.court === court)
      .sort((a, b) => a.start.localeCompare(b.start));
    const groups = new Map<string, Match[]>();
    matches.forEach((match) => {
      const key = `${court}|${match.grade}|${match.sport}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)?.push(match);
    });
    const eventGroups = [...groups.entries()].map(([key, groupMatches]) => {
      const ordered = [...groupMatches].sort((a, b) => a.start.localeCompare(b.start));
      const first = ordered[0];
      const last = ordered[ordered.length - 1];
      const adjustedStart = calcAdjustedTime(first.start, first.offsetMins);
      const adjustedEnd = calcAdjustedTime(last.end, last.offsetMins);
      const startMinuteOfDay = parseTimeMinutes(adjustedStart);
      const endMinuteOfDay = parseTimeMinutes(adjustedEnd);
      const visibleStart = Math.max(startH * 60, startMinuteOfDay);
      const visibleEnd = Math.min(endH * 60, endMinuteOfDay);
      if (visibleEnd <= visibleStart) return "";
      const left = (visibleStart - startH * 60) / totalMins * 100;
      const width = Math.max((visibleEnd - visibleStart) / totalMins * 100, 1.4);
      const groupKey = encodeURIComponent(key);
      const isExpanded = appState.expandedGanttGroupKey === key;
      const statuses = new Set(ordered.map((match) => match.status));
      const statusClass = statuses.has("IN_PROGRESS") ? "gantt-event-live" : statuses.size === 1 && statuses.has("FINISHED") ? "gantt-event-finished" : "gantt-event-before";
      const details = isExpanded ? `
        <div class="gantt-group-details" aria-label="${first.grade} ${first.sport} の試合一覧">
          ${ordered.map((match) => {
            const matchStart = calcAdjustedTime(match.start, match.offsetMins);
            const matchEnd = calcAdjustedTime(match.end, match.offsetMins);
            const state = match.status === "FINISHED" ? "終了" : match.status === "IN_PROGRESS" ? "進行中" : "開始前";
            return `<button type="button" class="gantt-detail-match" onclick="openModal('${match.id}')"><span class="gantt-detail-time">${matchStart}–${matchEnd}</span><strong>${match.title}</strong><span>${match.teamA} 対 ${match.teamB}</span><small>${state}</small></button>`;
          }).join("")}
        </div>` : "";

      return `
        <button type="button" class="gantt-event ${statusClass} ${isExpanded ? "is-expanded" : ""}" style="left:${left}%;width:${width}%" title="${first.grade} ${first.sport}・${ordered.length}試合" aria-expanded="${isExpanded}" onclick="toggleGanttGroup('${groupKey}')">
          <span class="gantt-event-primary">${first.grade} / ${first.sport}</span>
          <span class="gantt-event-secondary">${ordered.length}試合 · ${adjustedStart}–${adjustedEnd} · 詳細</span>
        </button>
        ${details}
      `;
    }).join("");

    return `
      <div class="gantt-lane">
        <div class="gantt-lane-label"><span>${court}</span><small>${matches.length}試合</small></div>
        <div class="gantt-lane-content">
          <div class="gantt-lane-track">
            ${Array.from({ length: endH - startH + 1 }, (_, index) => `<span class="gantt-gridline" style="left:${index / (endH - startH) * 100}%"></span>`).join("")}
            ${eventGroups || '<span class="gantt-empty">試合なし</span>'}
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (!container) return;
  if (!courts.length) {
    container.innerHTML = '<p class="gantt-no-courts">表示する会場を選択してください。</p>';
    return;
  }
  container.innerHTML = `
    <div class="gantt-board">
      <div class="gantt-ruler"><div class="gantt-ruler-label">会場 / 件数</div><div class="gantt-ruler-track">${ruler}</div></div>
      <div class="gantt-lanes gantt-courts-${Math.min(courts.length, 6)}" id="ganttLanes">${lanes}<div id="ganttTimeBar" class="gantt-time-marker" aria-hidden="true"><span>現在 <b data-gantt-current-time></b></span></div></div>
    </div>
  `;
  updateGanttTimeBar(new Date());
}

function toggleGanttGroup(groupKey: string): void {
  const decodedKey = decodeURIComponent(groupKey);
  appState.expandedGanttGroupKey = appState.expandedGanttGroupKey === decodedKey ? "" : decodedKey;
  renderGantt();
}

function updateGanttTimeBar(now: Date): void {
  const bar = document.getElementById("ganttTimeBar");
  const track = document.querySelector<HTMLElement>(".gantt-lane-track");
  const lanes = document.getElementById("ganttLanes");
  if (!bar || !track || !lanes) return;

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
  const timeLabel = bar.querySelector<HTMLElement>("[data-gantt-current-time]");
  if (timeLabel) timeLabel.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function renderResultsTab(): void {
  const container = document.getElementById("resultsContentContainer");
  const gradeFilter = (document.getElementById("resultGradeFilter") as HTMLSelectElement | null)?.value ?? "ALL";
  if (!container) return;
  container.innerHTML = "";

  const categories: Record<string, { grade: string; sport: string; format: MatchFormat; matches: Match[]; blockTitle: string }> = {};
  appState.schedule.forEach((m) => {
    if (gradeFilter !== "ALL" && m.grade !== gradeFilter) return;
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
            <span class="${hasScore && m.scoreA! > m.scoreB! ? "text-sky-500 font-black" : "text-slate-700 dark:text-slate-300"}">${m.teamA} (${m.scoreA ?? "-"})</span>
            <span class="text-slate-400 mx-1">vs</span>
            <span class="${hasScore && m.scoreB! > m.scoreA! ? "text-sky-500 font-black" : "text-slate-700 dark:text-slate-300"}">${m.teamB} (${m.scoreB ?? "-"})</span>
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

function calculateCompetitionStandings(matches: Match[], format: MatchFormat): Array<{ team: string; wins: number; draws: number; losses: number; points: number; rank: number; rankPoints: number }> {
  if (format === "exhibition") return [];
  if (format === "tournament") return calculateTournamentStandings(matches);

  const teams = Array.from(new Set(matches.flatMap((match) => [match.teamA, match.teamB]).filter(Boolean)));
  const stats: Record<string, { wins: number; draws: number; losses: number; points: number; scored: number; conceded: number }> = {};
  teams.forEach((team) => { stats[team] = { wins: 0, draws: 0, losses: 0, points: 0, scored: 0, conceded: 0 }; });

  matches.filter((match) => match.status === "FINISHED" && match.scoreA !== null && match.scoreB !== null).forEach((match) => {
    const a = stats[match.teamA];
    const b = stats[match.teamB];
    if (!a || !b) return;
    a.scored += match.scoreA!;
    a.conceded += match.scoreB!;
    b.scored += match.scoreB!;
    b.conceded += match.scoreA!;
    if (match.scoreA! > match.scoreB!) {
      a.wins += 1;
      a.points += format === "league" ? 3 : 1;
      b.losses += 1;
    } else if (match.scoreB! > match.scoreA!) {
      b.wins += 1;
      b.points += format === "league" ? 3 : 1;
      a.losses += 1;
    } else {
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

function calculateTournamentStandings(matches: Match[]): Array<{ team: string; wins: number; draws: number; losses: number; points: number; rank: number; rankPoints: number }> {
  const pointRule = matches.find((match) => match.pointRule)?.pointRule ?? [150, 100, 50, 0];
  const stats: Record<string, { wins: number; draws: number; losses: number; points: number }> = {};
  const ensureTeam = (team: string) => {
    if (team && !stats[team]) stats[team] = { wins: 0, draws: 0, losses: 0, points: 0 };
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
    const winner = match.scoreA! > match.scoreB! ? match.teamA : match.teamB;
    const loser = match.scoreA! > match.scoreB! ? match.teamB : match.teamA;
    stats[winner].wins += 1;
    stats[winner].points += 1;
    stats[loser].losses += 1;
  });

  const final = matches.find((match) => match.title === "決勝");
  const thirdPlace = matches.find((match) => match.title === "3位決定戦");
  const rankedTeams: string[] = [];
  const addRankedTeam = (team: string | null) => {
    if (team && !rankedTeams.includes(team)) rankedTeams.push(team);
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

function calculateScoresAndRanks(): void {
  const totals: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };

  const categories: Record<string, Match[]> = {};
  appState.schedule.forEach((match) => {
    if (match.format === "exhibition") return;
    const key = match.blockId ?? `${match.grade} - ${match.sport}`;
    if (!categories[key]) categories[key] = [];
    categories[key].push(match);
  });
  Object.values(categories).forEach((matches) => {
    calculateCompetitionStandings(matches, matches[0].format).forEach((standing) => {
      if (totals[standing.team] !== undefined) totals[standing.team] += standing.rankPoints;
    });
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

function applyBulkOperations(): void {
  const court = (document.getElementById("bulkCourt") as HTMLSelectElement | null)?.value ?? "ALL";
  const sport = (document.getElementById("bulkSport") as HTMLSelectElement | null)?.value ?? "ALL";
  const status = (document.getElementById("bulkStatus") as HTMLSelectElement | null)?.value ?? "NO_CHANGE";
  const delay = Number((document.getElementById("bulkDelay") as HTMLInputElement | null)?.value ?? 0);
  const targets = appState.schedule.filter((match) => (court === "ALL" || match.court === court) && (sport === "ALL" || match.sport === sport));

  if (targets.length === 0) {
    alert("対象となる試合がありません。");
    return;
  }

  if (status !== "NO_CHANGE") {
    targets.forEach((match) => { match.status = status as MatchStatus; });
  }
  if (Number.isFinite(delay) && delay !== 0) {
    targets.forEach((match) => { match.offsetMins += delay; });
  }

  saveState();
  renderCourtDelaySummary();
  renderTimeline();
  renderResultsTab();
  calculateScoresAndRanks();
  if (!(document.getElementById("sec-gantt") as HTMLElement | null)?.classList.contains("hidden")) renderGantt();
  alert(`${targets.length}試合に一括反映しました。`);
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
  const pointRule = getAddPointRule();

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
    offsetMins: 0,
    pointRule
  };

  appState.schedule.push(newMatch);
  saveState();
  renderTimeline();
  renderCourtDelaySummary();
  alert(`「${title} (${format === "league" ? "総当たり" : "トーナメント"})」を作成追加しました！`);

  const titleInput = document.getElementById("addTitle") as HTMLInputElement | null;
  if (titleInput) titleInput.value = "";
}

function parsePointRule(value: string): [number, number, number, number] {
  const values = value.split(",").map((item) => Number(item.trim()));
  return [0, 1, 2, 3].map((index) => Number.isFinite(values[index]) ? Math.max(0, values[index]) : 0) as [number, number, number, number];
}

function getAddPointRule(): [number, number, number, number] {
  const input = document.getElementById("addPointRule") as HTMLInputElement | null;
  return parsePointRule(input?.value || "150,100,50,0");
}

function addMinutesToTime(time: string, minutes: number): string {
  const [hours, mins] = time.split(":").map(Number);
  const total = hours * 60 + mins + minutes;
  return `${String(Math.floor((total % 1440 + 1440) % 1440 / 60)).padStart(2, "0")}:${String((total % 60 + 60) % 60).padStart(2, "0")}`;
}

function createCompetitionBlock(): void {
  const grade = (document.getElementById("addGrade") as HTMLSelectElement | null)?.value ?? "中1";
  const sport = (document.getElementById("addSport") as HTMLInputElement | null)?.value.trim() ?? "";
  const format = (document.getElementById("addFormat") as HTMLSelectElement | null)?.value as MatchFormat ?? "league";
  const court = (document.getElementById("addCourt") as HTMLSelectElement | null)?.value ?? "上グラ";
  const start = (document.getElementById("addStartTime") as HTMLInputElement | null)?.value ?? "09:00";
  const end = (document.getElementById("addEndTime") as HTMLInputElement | null)?.value ?? "09:30";

  if (!sport) {
    alert("競技名を入力してください。");
    return;
  }

  const [startHour, startMinute] = start.split(":").map(Number);
  const duration = Math.max(15, (Number(end.split(":")[0]) * 60 + Number(end.split(":")[1])) - (startHour * 60 + startMinute));
  const blockId = `block_${Date.now()}`;
  const blockTitle = (document.getElementById("addTitle") as HTMLInputElement | null)?.value.trim() || "第1試合";
  const pointRule = getAddPointRule();
  const scheduleFormat: MatchFormat = sport === "卓球" && format === "tournament" ? "table_tennis_round_robin" : format;
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
  renderTimeline();
  renderCourtDelaySummary();
  renderResultsTab();
  calculateScoresAndRanks();
  alert(`${grade} ${sport}の試合ブロックを${definitions.length}試合作成しました。`);
}

function openModal(matchId: string): void {
  const m = appState.schedule.find((item) => item.id === matchId);
  if (!m) return;

  (document.getElementById("modalMatchId") as HTMLInputElement).value = m.id;
  (document.getElementById("modalMatchDetail") as HTMLElement).innerText = `${m.title} (${m.grade} ${m.sport})`;
  (document.getElementById("modalCourtDetail") as HTMLElement).innerText = `場所: ${m.court}`;
  (document.getElementById("modalTimeDetail") as HTMLElement).innerText = `定刻: ${m.start} - ${m.end}`;
  (document.getElementById("inputMatchTitle") as HTMLInputElement).value = m.title;
  (document.getElementById("inputTeamA") as HTMLInputElement).value = m.teamA;
  (document.getElementById("inputTeamB") as HTMLInputElement).value = m.teamB;
  (document.getElementById("inputModalScoreA") as HTMLInputElement).value = m.scoreA === null ? "" : String(m.scoreA);
  (document.getElementById("inputModalScoreB") as HTMLInputElement).value = m.scoreB === null ? "" : String(m.scoreB);

  setModalStatus(m.status || "BEFORE");
  (document.getElementById("inputDelayMinutes") as HTMLInputElement).value = String(m.offsetMins);
  (document.getElementById("inputCompetitionLead") as HTMLInputElement).value = m.competitionLead ?? m.staff ?? "";
  (document.getElementById("inputReferee") as HTMLInputElement).value = m.referee ?? "";
  (document.getElementById("inputAttendance") as HTMLInputElement).value = m.attendance ?? "";
  (document.getElementById("inputCompetitionPoints") as HTMLInputElement).value = (m.pointRule ?? [150, 100, 50, 0]).join(",");

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

function adjustModalDelay(diff: number): void {
  const input = document.getElementById("inputDelayMinutes") as HTMLInputElement | null;
  if (!input) return;
  input.value = String((parseInt(input.value, 10) || 0) + diff);
}

function saveModalData(): void {
  const matchId = (document.getElementById("modalMatchId") as HTMLInputElement).value;
  const m = appState.schedule.find((item) => item.id === matchId);
  if (!m) return;

  const newOffset = parseInt((document.getElementById("inputDelayMinutes") as HTMLInputElement).value, 10) || 0;
  const diff = newOffset - m.offsetMins;

  m.status = appState.selectedModalStatus;
  const scoreA = (document.getElementById("inputModalScoreA") as HTMLInputElement).value;
  const scoreB = (document.getElementById("inputModalScoreB") as HTMLInputElement).value;
  m.scoreA = scoreA === "" ? null : Math.max(0, parseInt(scoreA, 10) || 0);
  m.scoreB = scoreB === "" ? null : Math.max(0, parseInt(scoreB, 10) || 0);
  updateTournamentBracket(m.blockId);
  updateExhibitionTeams(m.sport);
  m.referee = (document.getElementById("inputReferee") as HTMLInputElement).value;
  m.competitionLead = (document.getElementById("inputCompetitionLead") as HTMLInputElement).value;
  m.staff = m.competitionLead;
  m.attendance = (document.getElementById("inputAttendance") as HTMLInputElement).value;

  if (diff !== 0) {
    applyCascadeOffset(m.id, diff);
  } else {
    saveState();
    renderTimeline();
    renderCourtDelaySummary();
  }

  calculateScoresAndRanks();
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

function authenticateDataTools(): void {
  const password = (document.getElementById("adminDataPassword") as HTMLInputElement | null)?.value ?? "";
  if (password === "admin123") {
    document.getElementById("adminDataAuthGate")?.classList.add("hidden");
    document.getElementById("adminDataControls")?.classList.remove("hidden");
    document.getElementById("adminDataAuthError")?.classList.add("hidden");
    loadBackupList();
    return;
  }
  document.getElementById("adminDataAuthError")?.classList.remove("hidden");
}

function lockDataTools(): void {
  document.getElementById("adminDataControls")?.classList.add("hidden");
  document.getElementById("adminDataAuthGate")?.classList.remove("hidden");
  document.getElementById("adminDataAuthError")?.classList.add("hidden");
  const password = document.getElementById("adminDataPassword") as HTMLInputElement | null;
  if (password) password.value = "";
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
  if (appState.announcement) showAnnouncement(appState.announcement);
}

function getBackupCollection(): any | null {
  if (!firebaseSync.db || !firebaseSync.initialized) return null;
  return firebaseSync.db.collection("app_data").doc("ball_sports_test2_backups").collection("snapshots");
}

async function createBackup(): Promise<void> {
  const status = document.getElementById("dataBackupStatus");
  const backups = getBackupCollection();
  if (!backups) {
    if (status) status.textContent = "Firebase未接続です。JSON出力からバックアップしてください。";
    return;
  }
  if (status) status.textContent = "バックアップを作成しています...";
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
    if (status) status.textContent = `${new Date(createdAt).toLocaleString("ja-JP")} に ${appState.schedule.length}試合をバックアップしました。`;
    await loadBackupList();
  } catch (error) {
    console.error("[バックアップ作成失敗]", error);
    if (status) status.textContent = "バックアップを作成できませんでした。JSON出力を利用してください。";
  }
}

async function loadBackupList(): Promise<void> {
  const container = document.getElementById("dataBackupList");
  const backups = getBackupCollection();
  if (!container || !backups) return;
  try {
    const snapshot = await backups.orderBy("createdAt", "desc").limit(10).get();
    if (snapshot.empty) {
      const status = document.getElementById("dataBackupStatus");
      if (status) status.textContent = "バックアップ履歴はありません。";
      container.innerHTML = '<p class="text-xs text-slate-400">バックアップ履歴はありません。</p>';
      return;
    }
    const latest = snapshot.docs[0].data();
    const status = document.getElementById("dataBackupStatus");
    if (status) status.textContent = `${snapshot.size}件のバックアップがあります。最新: ${new Date(latest.createdAt).toLocaleString("ja-JP")}`;
    container.innerHTML = snapshot.docs.map((doc: any) => {
      const backup = doc.data();
      const date = new Date(backup.createdAt).toLocaleString("ja-JP");
      return `<div class="backup-row"><span><strong>${date}</strong><small>${Number(backup.matchCount) || 0}試合</small></span><button type="button" class="admin-command-secondary" onclick="restoreBackup('${doc.id}')"><i data-lucide="rotate-ccw"></i> 復元</button></div>`;
    }).join("");
  } catch (error) {
    console.error("[バックアップ一覧の取得失敗]", error);
    container.innerHTML = '<p class="text-xs text-rose-500">バックアップ履歴を読み込めません。JSON出力をご利用ください。</p>';
  }
}

async function restoreBackup(backupId: string): Promise<void> {
  const status = document.getElementById("dataBackupStatus");
  const backups = getBackupCollection();
  if (!backups) return;
  if (!confirm("選択したバックアップで現在の試合データを置き換えます。続けますか？")) return;
  try {
    const snapshot = await backups.doc(backupId).get();
    if (!snapshot.exists) throw new Error("backup not found");
    const backup = snapshot.data();
    if (!Array.isArray(backup.schedule) || !backup.schedule.every(isMatch)) throw new Error("invalid backup data");
    appState.schedule = backup.schedule;
    appState.announcement = typeof backup.announcement === "string" ? backup.announcement : "";
    saveState();
    renderCourtDelaySummary();
    renderTimeline();
    renderResultsTab();
    calculateScoresAndRanks();
    (window as any).populateBlockSelectors?.();
    (window as any).renderTimeConfigEditor?.();
    if (appState.announcement) showAnnouncement(appState.announcement);
    else document.getElementById("announcementBar")?.classList.add("hidden");
    if (status) status.textContent = `${new Date(backup.createdAt).toLocaleString("ja-JP")} のバックアップから復元しました。`;
  } catch (error) {
    console.error("[バックアップ復元失敗]", error);
    if (status) status.textContent = "復元できませんでした。選択したバックアップを確認してください。";
  }
}

function exportData(): void {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const dl = document.createElement("a");
  dl.setAttribute("href", dataStr);
  dl.setAttribute("download", "gym78_ball_day_data.json");
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

function resetScoreLogs(): void {
  if (!confirm("全試合の得点と進行状態を消去します。競技時間・対戦表は保持されます。")) return;
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
  alert("得点ログを消去しました。");
}

function resetAllData(): void {
  if (!confirm("全てのデータを初期状態にリセットしますか？")) return;
  appState.schedule = cloneInitialSchedule();
  appState.announcement = "";
  appState.expandedGroups = {};
  saveState();
  renderTimeline();
  renderCourtDelaySummary();
  renderResultsTab();
  calculateScoresAndRanks();
  document.getElementById("announcementBar")?.classList.add("hidden");
}

(window as any).toggleTheme = toggleTheme;
(window as any).toggleContrast = toggleContrast;
(window as any).switchTab = switchTab;
(window as any).createNewMatch = createNewMatch;
(window as any).createCompetitionBlock = createCompetitionBlock;
(window as any).quickSaveScore = quickSaveScore;
(window as any).applyCascadeOffset = applyCascadeOffset;
(window as any).handleCourtFilterChange = handleCourtFilterChange;
(window as any).toggleGroupExpand = toggleGroupExpand;
(window as any).toggleGanttGroup = toggleGanttGroup;
(window as any).setModalStatus = setModalStatus;
(window as any).setModalDelay = setModalDelay;
(window as any).adjustModalDelay = adjustModalDelay;
(window as any).saveModalData = saveModalData;
(window as any).openModal = openModal;
(window as any).closeModal = closeModal;
(window as any).authenticateAdmin = authenticateAdmin;
(window as any).authenticateDataTools = authenticateDataTools;
(window as any).lockDataTools = lockDataTools;
(window as any).lockAdmin = lockAdmin;
(window as any).broadcastAnnouncement = broadcastAnnouncement;
(window as any).clearAnnouncement = clearAnnouncement;
(window as any).dismissAnnouncement = dismissAnnouncement;
(window as any).createBackup = createBackup;
(window as any).loadBackupList = loadBackupList;
(window as any).restoreBackup = restoreBackup;
(window as any).renderTimeline = renderTimeline;
(window as any).renderResultsTab = renderResultsTab;
(window as any).renderCourtDelaySummary = renderCourtDelaySummary;
(window as any).renderGantt = renderGantt;
(window as any).setTimelineViewMode = setTimelineViewMode;
(window as any).exportData = exportData;
(window as any).importData = importData;
(window as any).resetScoreLogs = resetScoreLogs;
(window as any).resetAllData = resetAllData;
(window as any).applyBulkOperations = applyBulkOperations;
