(() => {
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
  const AUTHORIZED_EMAILS = new Set([
    "jh62220120@s.musashi.ed.jp", "jh62220340@s.musashi.ed.jp", "jh62220140@s.musashi.ed.jp",
    "jh62231310@s.musashi.ed.jp", "jh62230450@s.musashi.ed.jp", "jh62220250@s.musashi.ed.jp",
    "jh62230440@s.musashi.ed.jp", "jh62220030@s.musashi.ed.jp", "jh62231560@s.musashi.ed.jp",
    "jh62230600@s.musashi.ed.jp", "jh62220260@s.musashi.ed.jp"
  ]);
  // Enable only after deploying firestore.rules and verifying the deployed access controls.
  const FIRESTORE_RULES_READY = true;
  const DIRECTORY_DOC = "student_directory/current";
  const MAX_DIRECTORY_BYTES = 850_000;
  const ID_HINT = /4桁番号|学籍番号|生徒番号|個人番号|student.?id|^id$/i;
  const SENSITIVE_HINT = /mail|メール|メアド|gmail|電話|phone|住所|address/i;
  const FREE_TEXT_FILTER_HINT = /4桁番号|四桁番号|学籍番号|生徒番号|個人番号|名字|姓|名前|氏名|メアド|メール|gmail|e-mail|^名$/i;
  const SPORT_HINT = /球技|競技|種目|sport/i;
  const ATTENDANCE_HALVES = "__attendance_number_halves__";
  const ATTENDANCE_ALL_GRADES_SCOPE = "all";
  const DEFAULT_ATTENDANCE_SESSIONS = [
    { id: "ball-day", name: "球技日", grades: {}, numbers: [] },
    { id: "team-before-opening", name: "団体競技日・開会式前", grades: {}, numbers: [] },
    { id: "team-after-opening", name: "団体競技日・開会式後", grades: {}, numbers: [] }
  ];
  const state = { rows: [], fields: [], attendanceSessions: DEFAULT_ATTENDANCE_SESSIONS.map((session) => ({ ...session })), activeAttendanceSessionId: "ball-day", attendanceLookup: "", attendanceSportFilter: "", filters: {}, staged: null, selectedStudentIndices: new Set(), lockTimer: 0, db: null, auth: null, user: null, unsubscribe: null };
  const $ = (id) => document.getElementById(id);

  const encoder = new TextEncoder();
  async function loadCloudDirectory() {
    state.unsubscribe?.();
    await new Promise((resolve, reject) => {
      let initialSnapshot = true;
      state.unsubscribe = state.db.doc(DIRECTORY_DOC).onSnapshot((snapshot) => {
        const payload = snapshot.exists ? snapshot.data() : {};
        state.rows = Array.isArray(payload.rows) ? payload.rows : [];
        state.fields = Array.isArray(payload.fields) ? payload.fields : [];
        state.attendanceSessions = normalizeAttendanceSessions(payload.attendanceSessions);
        renderDirectory();
        if (initialSnapshot) resolve();
        initialSnapshot = false;
      }, (error) => {
        if (initialSnapshot) reject(error);
        else setMessage("importStatus", "共有名簿との接続が切れました。再読み込みしてください。", true);
      });
    });
    $("unlockPanel").classList.add("hidden");
    $("directoryPanel").classList.remove("hidden");
    $("lockButton").classList.remove("hidden");
    renderDirectory();
    resetLockTimer();
  }

  async function persist() {
    const payload = { rows: state.rows, fields: state.fields, attendanceSessions: state.attendanceSessions };
    const bytes = encoder.encode(JSON.stringify(payload)).length;
    if (bytes > MAX_DIRECTORY_BYTES) throw new Error("名簿が大きすぎます。項目を整理してから再度お試しください。");
    await state.db.doc(DIRECTORY_DOC).set({
      ...payload,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedBy: state.user.email
    });
  }

  async function lock() {
    clearTimeout(state.lockTimer);
    state.unsubscribe?.();
    state.unsubscribe = null;
    state.rows = [];
    state.fields = [];
    state.attendanceSessions = DEFAULT_ATTENDANCE_SESSIONS.map((session) => ({ ...session }));
    state.staged = null;
    state.selectedStudentIndices.clear();
    state.attendanceLookup = "";
    $("attendanceLookup").value = "";
    state.attendanceSportFilter = "";
    $("directoryPanel").classList.add("hidden");
    $("lockButton").classList.add("hidden");
    $("unlockPanel").classList.remove("hidden");
    $("unlockMessage").textContent = "ロックしました。";
    $("results").replaceChildren();
    $("query").value = "";
    state.filters = {};
    if (state.auth?.currentUser) await state.auth.signOut();
  }

  function resetLockTimer() {
    clearTimeout(state.lockTimer);
    state.lockTimer = setTimeout(() => lock(), 15 * 60 * 1000);
  }

  function parseCsv(text) {
    const rows = [];
    let row = [], cell = "", quoted = false;
    const source = text.replace(/^\uFEFF/, "");
    for (let i = 0; i < source.length; i++) {
      const char = source[i];
      if (quoted) {
        if (char === '"' && source[i + 1] === '"') { cell += '"'; i++; }
        else if (char === '"') quoted = false;
        else cell += char;
      } else if (char === '"') quoted = true;
      else if (char === ",") { row.push(cell); cell = ""; }
      else if (char === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
      else cell += char;
    }
    if (cell.length || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); }
    return rows;
  }

  function cleanGrid(grid) {
    const headerIndex = grid.findIndex((row) => row?.some((value) => String(value ?? "").trim()));
    if (headerIndex < 0) throw new Error("列名を読み取れませんでした。");
    const sourceHeaders = grid[headerIndex];
    const sourceRows = grid.slice(headerIndex + 1);
    const activeColumns = sourceHeaders.map((_, index) => index).filter((index) =>
      String(sourceHeaders[index] ?? "").trim() || sourceRows.some((row) => String(row?.[index] ?? "").trim())
    );
    const headers = activeColumns.map((index) => {
      const header = String(sourceHeaders[index] ?? "").trim();
      if (header) return header;
      if (index > 0 && /読み|よみ|ふりがな/i.test(String(sourceHeaders[index - 1] ?? ""))) return "名前読み";
      return `列${index + 1}`;
    });
    const records = sourceRows.map((values) => Object.fromEntries(activeColumns.map((sourceIndex, index) =>
      [headers[index], String(values?.[sourceIndex] ?? "").trim()]
    ))).filter((record) => Object.values(record).some(Boolean));
    if (!records.length) throw new Error("名簿の行が見つかりませんでした。");
    return { headers, records };
  }

  async function readFile(file) {
    if (file.name.toLowerCase().endsWith(".csv")) return { sheets: [{ name: "CSV", ...cleanGrid(parseCsv(await file.text())) }] };
    if (!window.XLSX) throw new Error("Excel読込ライブラリが読み込めませんでした。ページを再読み込みしてください。");
    const bytes = await file.arrayBuffer();
    const signature = new Uint8Array(bytes, 0, Math.min(bytes.byteLength, 2));
    if (file.name.toLowerCase().endsWith(".xlsx") && signature[0] === 0xd0 && signature[1] === 0xcf) throw new Error("encrypted workbook");
    const workbook = XLSX.read(bytes, { type: "array", raw: false });
    return { sheets: workbook.SheetNames.map((name) => ({ name, ...cleanGrid(XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, defval: "", raw: false })) })) };
  }

  function suggestedKey(headers) {
    return headers.find((header) => ID_HINT.test(header)) ?? headers.find((header) => /番号|number/i.test(header)) ?? headers[0];
  }

  function stageImport(sheets) {
    state.staged = sheets;
    $("sheetSelect").innerHTML = sheets.map((sheet, index) => `<option value="${index}">${escapeHtml(sheet.name)}（${sheet.records.length}人 / ${sheet.headers.length}項目）</option>`).join("");
    const sportSheet = sheets.findIndex((sheet) => sheet.headers.some((header) => SPORT_HINT.test(header)));
    if (sportSheet >= 0) $("sheetSelect").value = String(sportSheet);
    updateImportKeyOptions();
    $("importOptions").classList.remove("hidden");
    $("importStatus").textContent = "シートと更新方法を選んで「この内容で更新」を押してください。名簿の氏名やメールアドレスはプレビュー表示しません。";
  }

  function updateImportKeyOptions() {
    const sheet = state.staged?.[Number($("sheetSelect").value)];
    if (!sheet) return;
    $("keyField").innerHTML = sheet.headers.map((header) => `<option value="${escapeHtml(header)}">${escapeHtml(header)}</option>`).join("");
    $("keyField").value = suggestedKey(sheet.headers);
    $("importMode").value = state.rows.length ? "merge" : "replace";
    $("keyField").closest("label").classList.toggle("hidden", $("importMode").value !== "merge");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  async function commitImport() {
    const sheet = state.staged?.[Number($("sheetSelect").value)];
    if (!sheet) return;
    const mode = $("importMode").value;
    const keyField = $("keyField").value;
    if (mode === "merge" && !keyField) return setMessage("importStatus", "照合キーを選択してください。", true);
    const previousRows = state.rows;
    const previousFields = state.fields;
    if (mode === "merge") {
      const mergedRows = state.rows.map((record) => ({ ...record }));
      const indexByKey = new Map();
      mergedRows.forEach((record, index) => {
        const key = String(record[keyField] ?? "").trim();
        if (key && !indexByKey.has(key)) indexByKey.set(key, index);
      });
      sheet.records.forEach((incoming) => {
        const key = String(incoming[keyField] ?? "").trim();
        if (key && indexByKey.has(key)) Object.assign(mergedRows[indexByKey.get(key)], incoming);
        else {
          const index = mergedRows.push(incoming) - 1;
          if (key) indexByKey.set(key, index);
        }
      });
      state.rows = mergedRows;
      state.fields = [...new Set([...state.fields, ...sheet.headers])];
    } else {
      state.rows = sheet.records;
      state.fields = sheet.headers;
    }
    try {
      await persist();
    } catch (error) {
      state.rows = previousRows;
      state.fields = previousFields;
      throw error;
    }
    $("importOptions").classList.add("hidden");
    $("importFile").value = "";
    state.staged = null;
    $("importStatus").textContent = `${state.rows.length.toLocaleString()}人分を共有名簿へ保存しました。`;
    renderDirectory();
  }

  function setMessage(id, text, error = false) {
    const el = $(id);
    el.textContent = text;
    el.classList.toggle("error", error);
  }

  function renderDirectory() {
    $("datasetSummary").textContent = state.rows.length ? `${state.rows.length.toLocaleString()}人 / ${state.fields.length}項目　（共有名簿）` : "名簿はまだありません。ExcelまたはCSVを選択して読み込んでください。";
    renderAttendanceSessions();
    renderFilters();
    renderExportFields();
    renderAssignmentFields();
    renderResults();
  }

  function normalizeAttendanceSessions(sessions) {
    const savedSessions = Array.isArray(sessions) ? sessions : [];
    const savedById = new Map(savedSessions.map((session) => [session?.id, session]));
    const fixedSessions = DEFAULT_ATTENDANCE_SESSIONS.map((defaults) => {
      const saved = savedById.get(defaults.id);
      return { ...defaults, grades: normalizeAttendanceGrades(saved?.grades), numbers: normalizeAttendanceEntries(saved?.numbers) };
    });
    const customSessions = savedSessions.filter((session) => session?.id && !DEFAULT_ATTENDANCE_SESSIONS.some((item) => item.id === session.id))
      .map((session) => ({ id: String(session.id), name: String(session.name || "競技"), grades: normalizeAttendanceGrades(session.grades), numbers: normalizeAttendanceEntries(session.numbers) }));
    return [fixedSessions[0], fixedSessions[1], ...customSessions, fixedSessions[2]];
  }

  function normalizeAttendanceGrades(grades) {
    if (!grades || typeof grades !== "object" || Array.isArray(grades)) return {};
    return Object.fromEntries(Object.entries(grades).filter(([, values]) => Array.isArray(values))
      .map(([scope, values]) => [scope === "__all__" ? ATTENDANCE_ALL_GRADES_SCOPE : scope, values.map(String)]));
  }

  function normalizeAttendanceEntries(entries) {
    if (!Array.isArray(entries)) return [];
    return entries.map((entry) => typeof entry === "string"
      ? { number: entry, key: "", name: "", status: "absent" }
      : { number: String(entry?.number ?? ""), key: String(entry?.key ?? ""), name: String(entry?.name ?? ""), status: entry?.status === "late" ? "late" : "absent" })
      .filter((entry) => entry.number);
  }

  function renderAttendanceSessions() {
    const select = $("attendanceSessionSelect");
    const previous = state.activeAttendanceSessionId;
    select.replaceChildren(...state.attendanceSessions.map((session) => new Option(session.name, session.id)));
    state.activeAttendanceSessionId = state.attendanceSessions.some((session) => session.id === previous)
      ? previous
      : state.attendanceSessions[0]?.id ?? "";
    select.value = state.activeAttendanceSessionId;
    renderAttendanceExportOptions();
    $("removeAttendanceSessionButton").classList.toggle("hidden", DEFAULT_ATTENDANCE_SESSIONS.some((session) => session.id === state.activeAttendanceSessionId));
    renderAttendanceFilters();
    renderAttendanceGrades();
    renderAttendanceRecords();
  }

  function renderAttendanceExportOptions() {
    const dayContainer = $("attendanceDayExportFields");
    const detailContainer = $("teamAttendanceExportFields");
    const renderOptions = (container, options) => {
      const previous = new Map([...container.querySelectorAll('input[type="checkbox"]')]
        .map((input) => [input.value, input.checked]));
      container.replaceChildren(...options.map(({ value, label }) => {
        const wrapper = document.createElement("label");
        wrapper.className = "check-label";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = value;
        input.checked = previous.has(value) ? previous.get(value) : true;
        wrapper.append(input, document.createTextNode(label));
        return wrapper;
      }));
    };
    renderOptions(dayContainer, [
      { value: "attendance:ball-day", label: "球技日" },
      { value: "attendance:team-day", label: "団体競技日（集計）" }
    ]);
    renderOptions(detailContainer, state.attendanceSessions
      .filter((session) => session.id !== "ball-day")
      .map((session) => ({ value: `detail:${session.id}`, label: session.name })));
  }

  function attendanceSportField() {
    return state.fields.find((field) => /球技/i.test(field)) ?? state.fields.find((field) => /競技|種目|sport/i.test(field));
  }

  function attendanceGradeField() {
    return state.fields.find((field) => /学年|grade/i.test(field));
  }

  function renderAttendanceFilters() {
    const select = $("attendanceSportFilter");
    const field = attendanceSportField();
    const values = field ? [...new Set(state.rows.map((record) => String(record[field] ?? "").trim()).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "ja")) : [];
    select.replaceChildren(new Option(field ? "すべて" : "球技項目なし", ""), ...values.map((value) => new Option(value, value)));
    select.disabled = !field;
    state.attendanceSportFilter = values.includes(state.attendanceSportFilter) ? state.attendanceSportFilter : "";
    select.value = state.attendanceSportFilter;
    $("attendanceLookup").value = state.attendanceLookup;
  }

  function attendanceGradeScope(session) {
    return session.id === "ball-day" && state.attendanceSportFilter ? state.attendanceSportFilter : ATTENDANCE_ALL_GRADES_SCOPE;
  }

  function selectedAttendanceGrades(session) {
    const scope = attendanceGradeScope(session);
    const selected = session.grades[scope] ?? (scope !== ATTENDANCE_ALL_GRADES_SCOPE ? session.grades[ATTENDANCE_ALL_GRADES_SCOPE] : null);
    return Array.isArray(selected) ? selected : null;
  }

  function attendanceSaveError(error) {
    if (error?.code === "permission-denied") return "Firestoreの書き込みが拒否されました。最新のfirestore.rulesをFirebaseへデプロイしてください。";
    return error?.message || "保存に失敗しました。接続を確認してください。";
  }

  function renderAttendanceGrades() {
    const container = $("attendanceGrades");
    container.replaceChildren();
    const session = state.attendanceSessions.find((item) => item.id === state.activeAttendanceSessionId);
    const field = attendanceGradeField();
    const values = field ? [...new Set(state.rows.map((record) => String(record[field] ?? "").trim()).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "ja")) : [];
    $("attendanceGradeLabel").textContent = session?.id === "ball-day" && state.attendanceSportFilter
      ? `${state.attendanceSportFilter}に参加する学年`
      : "この区分に参加する学年";
    if (!session || !field || !values.length) {
      const note = document.createElement("span");
      note.className = "muted";
      note.textContent = "名簿に学年項目がありません。";
      container.append(note);
      return;
    }
    const selected = selectedAttendanceGrades(session);
    values.forEach((value) => {
      const label = document.createElement("label");
      label.className = "check-label";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = value;
      checkbox.checked = !selected || selected.includes(value);
      checkbox.addEventListener("change", () => updateAttendanceGrades(session, container));
      label.append(checkbox, document.createTextNode(value));
      container.append(label);
    });
  }

  async function updateAttendanceGrades(session, container) {
    if (!session) return;
    const scope = attendanceGradeScope(session);
    const previousGrades = session.grades;
    session.grades = { ...session.grades, [scope]: [...container.querySelectorAll('input[type="checkbox"]:checked')].map((checkbox) => checkbox.value) };
    renderAttendanceRecords();
    try {
      await persist();
      setMessage("attendanceStatus", `「${session.name}」の参加学年を保存しました。`);
      resetLockTimer();
    } catch (error) {
      session.grades = previousGrades;
      renderAttendanceGrades();
      renderAttendanceRecords();
      setMessage("attendanceStatus", `保存できませんでした: ${attendanceSaveError(error)}`, true);
    }
  }

  function normalizedAttendanceNumber(value) {
    const digits = String(value ?? "").normalize("NFKC").match(/\d+/)?.[0];
    return digits && Number(digits) > 0 ? String(Number(digits)) : "";
  }

  function attendanceStudentKey(record) {
    const idField = state.fields.find((field) => ID_HINT.test(field.trim()));
    if (idField && String(record[idField] ?? "").trim()) return `${idField}:${String(record[idField]).trim()}`;
    const numberField = attendanceNumberField();
    const groupFields = state.fields.filter((field) => /学年|組|クラス/.test(field));
    return JSON.stringify([String(record[numberField] ?? "").trim(), studentDisplayName(record), groupFields.map((field) => String(record[field] ?? "").trim())]);
  }

  function attendanceRecordNumber(record) {
    const field = attendanceNumberField() ?? state.fields.find((item) => ID_HINT.test(item.trim()));
    return String(record[field] ?? "").trim() || attendanceStudentKey(record);
  }

  function renderAttendanceRecords() {
    const container = $("attendanceRecords");
    container.replaceChildren();
    const session = state.attendanceSessions.find((item) => item.id === state.activeAttendanceSessionId);
    const lookup = state.attendanceLookup.normalize("NFKC").toLocaleLowerCase("ja").split(/\s+/).filter(Boolean);
    const sportField = attendanceSportField();
    const gradeField = attendanceGradeField();
    const grades = session ? selectedAttendanceGrades(session) : null;
    const records = filteredRows().filter((record) => {
      if (state.attendanceSportFilter && String(record[sportField] ?? "").trim() !== state.attendanceSportFilter) return false;
      if (grades && (!gradeField || !grades.includes(String(record[gradeField] ?? "").trim()))) return false;
      const content = state.fields.filter((field) => !SENSITIVE_HINT.test(field)).map((field) => record[field] ?? "").join(" ").normalize("NFKC").toLocaleLowerCase("ja");
      return lookup.every((token) => content.includes(token));
    });
    $("attendanceFilterSummary").textContent = `${records.length.toLocaleString()}人が検索条件に一致しています。欠席にする生徒にチェックしてください。`;
    if (!session || !records.length) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "検索条件に一致する生徒がいません。";
      container.append(empty);
      return;
    }
    records.slice(0, 300).forEach((record) => {
      const row = document.createElement("div");
      row.className = "attendance-record";
      const identity = document.createElement("div");
      identity.className = "attendance-record-identity";
      const name = document.createElement("strong");
      name.textContent = studentDisplayName(record);
      const details = state.fields.filter((field) => /番号|学年|組|クラス|球技|競技|種目/i.test(field) && !SENSITIVE_HINT.test(field) && record[field])
        .map((field) => `${field}: ${record[field]}`).join(" / ");
      identity.append(name);
      if (details) {
        const detailText = document.createElement("span");
        detailText.textContent = details;
        identity.append(detailText);
      }
      const statusControls = document.createElement("div");
      statusControls.className = "attendance-status-controls";
      const currentStatus = attendanceStatus(session, record);
      [["absent", "欠席"], ["late", "遅刻"]].forEach(([status, text]) => {
        const label = document.createElement("label");
        label.className = `attendance-toggle attendance-toggle-${status}`;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = currentStatus === status;
        checkbox.setAttribute("aria-label", `${studentDisplayName(record)}を${text}にする`);
        checkbox.addEventListener("change", () => setAttendanceStatus(session.id, record, checkbox.checked ? status : "present"));
        label.append(checkbox, document.createTextNode(text));
        statusControls.append(label);
      });
      row.append(identity, statusControls);
      container.append(row);
    });
    if (records.length > 300) {
      const note = document.createElement("p");
      note.className = "muted";
      note.textContent = "先頭300人を表示しています。検索条件を追加してください。";
      container.append(note);
    }
  }

  function attendanceStatus(session, record) {
    const key = attendanceStudentKey(record);
    const number = normalizedAttendanceNumber(attendanceRecordNumber(record));
    const entry = session.numbers.find((item) => item.key
      ? item.key === key
      : Boolean(number) && normalizedAttendanceNumber(item.number) === number);
    return entry?.status === "late" ? "late" : entry ? "absent" : "present";
  }

  function attendanceExportValue(session, record) {
    const gradeField = attendanceGradeField();
    const sportField = attendanceSportField();
    const sport = String(record[sportField] ?? "").trim();
    const scope = session.id === "ball-day" && sport ? sport : ATTENDANCE_ALL_GRADES_SCOPE;
    const grades = session.grades[scope] ?? (scope !== ATTENDANCE_ALL_GRADES_SCOPE ? session.grades[ATTENDANCE_ALL_GRADES_SCOPE] : null);
    if (Array.isArray(grades) && (!gradeField || !grades.includes(String(record[gradeField] ?? "").trim()))) return "対象外";
    const status = attendanceStatus(session, record);
    return status === "absent" ? "欠席" : status === "late" ? "遅刻" : "出席";
  }

  function teamDayAttendanceExportValue(record) {
    const statuses = state.attendanceSessions
      .filter((session) => session.id !== "ball-day")
      .map((session) => attendanceExportValue(session, record))
      .filter((status) => status !== "対象外");
    if (!statuses.length) return "対象外";
    const absentCount = statuses.filter((status) => status === "欠席").length;
    const lateCount = statuses.filter((status) => status === "遅刻").length;
    if (absentCount === statuses.length) return "団体競技日欠席";
    if (absentCount > 0 || lateCount >= 2) return "欠課";
    if (lateCount === 1) return "遅刻";
    return "出席";
  }

  function setAttendanceStatus(sessionId, record, status) {
    const session = state.attendanceSessions.find((item) => item.id === sessionId);
    const recordNumber = attendanceRecordNumber(record);
    if (!session || !recordNumber) return;
    const key = attendanceStudentKey(record);
    const previousStatus = attendanceStatus(session, record);
    if (previousStatus === status) return;
    const previousNumbers = session.numbers;
    const number = normalizedAttendanceNumber(recordNumber);
    session.numbers = session.numbers.filter((entry) => entry.key
      ? entry.key !== key
      : !number || normalizedAttendanceNumber(entry.number) !== number);
    if (status !== "present") session.numbers.push({ number: recordNumber, key, name: studentDisplayName(record), status });
    renderAttendanceRecords();
    persist().then(() => {
      setMessage("attendanceStatus", `「${session.name}」の${studentDisplayName(record)}を${status === "absent" ? "欠席" : status === "late" ? "遅刻" : "出席"}として保存しました。`);
      resetLockTimer();
    }).catch((error) => {
      session.numbers = previousNumbers;
      renderAttendanceRecords();
      setMessage("attendanceStatus", `保存できませんでした: ${error.message}`, true);
    });
  }

  async function removeAttendanceSession(sessionId) {
    const index = state.attendanceSessions.findIndex((session) => session.id === sessionId);
    if (index < 0) return;
    const [removed] = state.attendanceSessions.splice(index, 1);
    renderAttendanceSessions();
    try {
      await persist();
      setMessage("attendanceStatus", `「${removed.name}」を削除しました。`);
    } catch (error) {
      state.attendanceSessions.splice(index, 0, removed);
      renderAttendanceSessions();
      setMessage("attendanceStatus", `削除を保存できませんでした: ${error.message}`, true);
    }
  }

  function studentDisplayName(record) {
    const full = state.fields.find((field) => /^(氏名|生徒氏名|名前（フル）)$/.test(field.trim()));
    const family = state.fields.find((field) => /^(名字|姓|姓（漢字）|名字（漢字）)$/.test(field.trim()));
    const given = state.fields.find((field) => /^(名前|名|名（漢字）)$/.test(field.trim()));
    return full ? String(record[full] ?? "（氏名なし）")
      : family || given ? [record[family] ?? "", record[given] ?? ""].filter(Boolean).join(" ")
        : String(record[state.fields[0]] ?? "生徒");
  }

  function renderAssignmentFields() {
    const select = $("assignmentField");
    const previous = select.value;
    select.replaceChildren(...state.fields.map((field) => new Option(field, field)));
    if (state.fields.includes(previous)) select.value = previous;
    $("assignValueButton").disabled = state.selectedStudentIndices.size === 0 || !select.value;
    $("assignValueButton").textContent = `選択した${state.selectedStudentIndices.size}人に追加`;
  }

  function renderStudentCandidates() {
    const container = $("studentCandidates"); container.replaceChildren();
    const query = $("studentPickerSearch").value.trim().normalize("NFKC").toLocaleLowerCase("ja");
    $("selectedStudent").textContent = state.selectedStudentIndices.size ? `${state.selectedStudentIndices.size}人を選択中。検索語を変えて追加選択できます。` : "候補から生徒を選択してください。";
    if (query.length < 1) { renderAssignmentFields(); return; }
    const matches = state.rows.map((record, index) => ({ record, index })).filter(({ record }) =>
      state.fields.filter((field) => !SENSITIVE_HINT.test(field)).some((field) => String(record[field] ?? "").normalize("NFKC").toLocaleLowerCase("ja").includes(query))
    ).slice(0, 20);
    matches.forEach(({ record, index }) => {
      const label = document.createElement("label"); label.className = "student-candidate";
      const details = state.fields.filter((field) => /番号|学年|組|クラス/.test(field) && !SENSITIVE_HINT.test(field) && record[field]).map((field) => `${field}: ${record[field]}`).join(" / ");
      const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = state.selectedStudentIndices.has(index);
      const name = document.createElement("span"); name.textContent = details ? `${studentDisplayName(record)}　${details}` : studentDisplayName(record);
      if (checkbox.checked) label.classList.add("selected");
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) state.selectedStudentIndices.add(index); else state.selectedStudentIndices.delete(index);
        label.classList.toggle("selected", checkbox.checked);
        $("selectedStudent").textContent = state.selectedStudentIndices.size ? `${state.selectedStudentIndices.size}人を選択中。検索語を変えて追加選択できます。` : "候補から生徒を選択してください。";
        renderAssignmentFields();
      });
      label.append(checkbox, name); container.append(label);
    });
    if (!matches.length) { const note = document.createElement("p"); note.className = "muted"; note.textContent = "該当する生徒が見つかりません。"; container.append(note); }
    else if (matches.length === 20) { const note = document.createElement("p"); note.className = "muted"; note.textContent = "候補は20人まで表示しています。検索語を追加してください。"; container.append(note); }
    renderAssignmentFields();
  }

  function renderFilters() {
    const container = $("filters");
    container.replaceChildren();
    state.fields.forEach((field) => {
      const distinct = [...new Set(state.rows.map((row) => row[field]).filter((value) => String(value ?? "").trim()))].sort((a, b) => String(a).localeCompare(String(b), "ja"));
      const label = document.createElement("label");
      label.className = "filter-control";
      label.textContent = field;
      let input;
      if (FREE_TEXT_FILTER_HINT.test(field)) {
        input = document.createElement("input");
        input.type = "search";
        input.placeholder = `${field}で検索`;
      } else {
        input = document.createElement("select");
        input.add(new Option("すべて", ""));
        distinct.forEach((value) => input.add(new Option(String(value), String(value))));
      }
      input.dataset.field = field;
      input.value = state.filters[field] ?? "";
      input.addEventListener("input", () => { state.filters[field] = input.value; renderResults(); renderAttendanceRecords(); renderExportGroupValues(); resetLockTimer(); });
      label.append(input);
      container.append(label);
    });
    const groupFields = $("exportGroupFields");
    const previousGroupFields = new Set([...groupFields.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value));
    const hasAttendanceNumber = Boolean(attendanceNumberField());
    const groupFieldOptions = [{ label: "番号（1〜22→前半、23以降→後半）", value: ATTENDANCE_HALVES, disabled: !hasAttendanceNumber }, ...state.fields.map((field) => ({ label: field, value: field }))];
    groupFields.replaceChildren(...groupFieldOptions.map(({ label, value, disabled = false }) => {
      const wrapper = document.createElement("label");
      wrapper.className = "check-label";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = value;
      input.checked = !disabled && previousGroupFields.has(value);
      input.disabled = disabled;
      wrapper.append(input, document.createTextNode(label));
      return wrapper;
    }));
    $("exportGroupHint").textContent = hasAttendanceNumber
      ? "条件を選ばない場合は1シート、複数条件を選ぶと値の組み合わせごとにシートを作成します。"
      : "条件を選ばない場合は1シート、複数条件を選ぶと値の組み合わせごとにシートを作成します。「番号（前半・後半）」分けには「番号」列が必要です。";
    renderExportGroupValues();
  }

  function renderExportGroupValues() {
    const selectedFields = [...$("exportGroupFields").querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
    const field = selectedFields[0], container = $("exportGroupValues");
    const previous = new Set([...container.querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value));
    const attendanceField = attendanceNumberField();
    const values = selectedFields.length === 1 && field === ATTENDANCE_HALVES
      ? ["前半（1〜22）", "後半（23以降）"].filter((half) => filteredRows().some((row) => attendanceHalf(row[attendanceField]) === half))
      : selectedFields.length === 1
        ? [...new Set(filteredRows().map((row) => String(row[field] ?? "")).filter((value) => value.trim()))].sort((a, b) => a.localeCompare(b, "ja"))
        : [];
    container.replaceChildren(...values.map((value) => {
      const wrapper = document.createElement("label");
      wrapper.className = "check-label";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = value;
      input.checked = previous.has(value);
      wrapper.append(input, document.createTextNode(value));
      return wrapper;
    }));
    const singleCondition = selectedFields.length === 1;
    $("exportGroupValuesLabel").classList.toggle("hidden", !singleCondition);
    if (selectedFields.length > 1) $("exportGroupHint").textContent = "選択した条件の値の組み合わせごとにシートを作成します。";
    else if (selectedFields.length === 1) $("exportGroupHint").textContent = "出力する値を選択してください。";
    else $("exportGroupHint").textContent = "条件を選ばない場合は1シートで出力します。";
  }

  function attendanceNumberField() {
    return state.fields.find((field) => /^(出席番号|番号|出席no|attendance.?number)$/i.test(field.trim()));
  }

  function attendanceHalf(value) {
    const match = String(value ?? "").normalize("NFKC").match(/\d+/);
    const number = match ? Number(match[0]) : NaN;
    if (!Number.isInteger(number) || number < 1) return "";
    return number <= 22 ? "前半（1〜22）" : "後半（23以降）";
  }

  function renderExportFields() {
    const container = $("exportFields");
    container.replaceChildren();
    state.fields.forEach((field) => {
      const label = document.createElement("label");
      label.className = "check-label";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = field;
      input.checked = !SENSITIVE_HINT.test(field) && (/番号|学年|組|クラス|名字|姓|名前|氏名|球技|競技|種目|パート|所属|担当/i.test(field));
      label.append(input, document.createTextNode(field));
      container.append(label);
    });
  }

  function filteredRows() {
    const tokens = $("query").value.normalize("NFKC").toLocaleLowerCase("ja").split(/\s+/).filter(Boolean);
    return state.rows.filter((row) => {
      if (!state.fields.every((field) => !state.filters[field] || String(row[field] ?? "").toLocaleLowerCase("ja").includes(String(state.filters[field]).toLocaleLowerCase("ja")))) return false;
      const content = state.fields.map((field) => row[field] ?? "").join(" ").normalize("NFKC").toLocaleLowerCase("ja");
      return tokens.every((token) => content.includes(token));
    });
  }

  function renderResults() {
    const results = filteredRows();
    $("resultCount").textContent = `${results.length.toLocaleString()}人を表示`;
    const container = $("results");
    container.replaceChildren();
    const displayFields = state.fields.filter((field) => !SENSITIVE_HINT.test(field));
    const fullNameField = displayFields.find((field) => /^(氏名|生徒氏名|名前（フル）)$/.test(field.trim()));
    const familyField = displayFields.find((field) => /^(名字|姓|姓（漢字）|名字（漢字）)$/.test(field.trim()));
    const givenField = displayFields.find((field) => /^(名前|名|名（漢字）)$/.test(field.trim()));
    const makeName = (record) => fullNameField ? String(record[fullNameField] ?? "（氏名なし）")
      : familyField || givenField ? [record[familyField] ?? "", record[givenField] ?? ""].filter(Boolean).join(" ")
        : String(record[displayFields[0]] ?? "生徒");
    if ($("viewMode").value === "table") {
      const wrapper = document.createElement("div"); wrapper.className = "table-scroll";
      const table = document.createElement("table"); table.className = "student-table";
      const head = document.createElement("thead"), headRow = document.createElement("tr");
      displayFields.forEach((field) => { const th = document.createElement("th"); th.textContent = field; headRow.append(th); });
      head.append(headRow); table.append(head);
      const body = document.createElement("tbody");
      results.slice(0, 300).forEach((record) => {
        const row = document.createElement("tr");
        displayFields.forEach((field) => {
          const cell = document.createElement("td"), input = document.createElement("input");
          input.type = "text"; input.value = String(record[field] ?? ""); input.setAttribute("aria-label", `${makeName(record)} ${field}`);
          input.addEventListener("change", async () => {
            const previousValue = record[field] ?? "";
            record[field] = input.value.trim();
            try { await persist(); setMessage("editStatus", "変更を保存しました。"); resetLockTimer(); }
            catch (error) { record[field] = previousValue; input.value = String(previousValue); setMessage("editStatus", `保存できませんでした: ${error.message}`, true); }
          });
          cell.append(input); row.append(cell);
        });
        body.append(row);
      });
      table.append(body); wrapper.append(table); container.append(wrapper);
    } else results.slice(0, 300).forEach((record) => {
      const article = document.createElement("article"); article.className = "student-card";
      const title = document.createElement("h3"); title.textContent = makeName(record); article.append(title);
      const details = document.createElement("dl");
      displayFields.filter((field) => field !== fullNameField && record[field] !== "").forEach((field) => {
        const dt = document.createElement("dt"); dt.textContent = field;
        const dd = document.createElement("dd"); dd.textContent = String(record[field]); details.append(dt, dd);
      });
      article.append(details); container.append(article);
    });
    if (results.length > 300) {
      const note = document.createElement("p"); note.className = "muted"; note.textContent = "先頭300件を表示しています。絞り込んでください。"; container.append(note);
    }
  }

  function excelText(value) {
    let text = String(value ?? "");
    if (/^[\s]*[=+@-]/.test(text)) text = `'${text}`;
    return text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function exportAttendanceWorkbook() {
    const records = filteredRows();
    const fields = [...$("exportFields").querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
    const selectedAttendance = new Set([
      ...$("attendanceDayExportFields").querySelectorAll('input[type="checkbox"]:checked'),
      ...$("teamAttendanceExportFields").querySelectorAll('input[type="checkbox"]:checked')
    ].map((input) => input.value));
    const attendanceColumns = [];
    const ballDay = state.attendanceSessions.find((session) => session.id === "ball-day");
    if (ballDay && selectedAttendance.has("attendance:ball-day")) {
      attendanceColumns.push({ name: "球技日", value: (record) => attendanceExportValue(ballDay, record) });
    }
    if (selectedAttendance.has("attendance:team-day")) {
      attendanceColumns.push({ name: "団体競技日", value: teamDayAttendanceExportValue });
    }
    state.attendanceSessions.filter((session) => session.id !== "ball-day" && selectedAttendance.has(`detail:${session.id}`))
      .forEach((session) => attendanceColumns.push({ name: session.name, value: (record) => attendanceExportValue(session, record) }));
    if (!records.length) return alert("出力する生徒がいません。");
    if (!fields.length && !attendanceColumns.length) return alert("出力する項目を選択してください。");
    const headers = [...fields, ...attendanceColumns.map((column) => column.name)];
    if (!window.XLSX) return alert("Excel出力ライブラリを読み込めませんでした。ページを再読み込みしてください。");
    const groupFields = [...$("exportGroupFields").querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
    const selectedValues = [...$("exportGroupValues").querySelectorAll('input[type="checkbox"]:checked')].map((input) => input.value);
    if (groupFields.includes(ATTENDANCE_HALVES) && !attendanceNumberField()) return alert("「番号」列が見つかりません。");
    if (groupFields.length === 1 && !selectedValues.length) return alert("シートに分ける値を1つ以上選択してください。");
    const groups = [];
    if (groupFields.length === 1) {
      const field = groupFields[0];
      const attendanceField = attendanceNumberField();
      groups.push(...selectedValues.map((value) => ({
        name: `${value}名簿`,
        rows: records.filter((record) => (field === ATTENDANCE_HALVES ? attendanceHalf(record[attendanceField]) : String(record[field] ?? "")) === value)
      })));
    } else if (groupFields.length > 1) {
      const attendanceField = attendanceNumberField();
      const groupedRows = new Map();
      records.forEach((record) => {
        const values = groupFields.map((field) => field === ATTENDANCE_HALVES
          ? attendanceHalf(record[attendanceField])
          : String(record[field] ?? "").trim());
        if (values.some((value) => !value)) return;
        const key = JSON.stringify(values);
        if (!groupedRows.has(key)) groupedRows.set(key, { name: `${values.join("_")}名簿`, rows: [] });
        groupedRows.get(key).rows.push(record);
      });
      groups.push(...groupedRows.values());
    } else groups.push({ name: "名簿", rows: records });
    const workbook = XLSX.utils.book_new();
    const usedNames = new Set();
    groups.forEach(({ name, rows }) => {
      if (!rows.length) return;
      const safeName = (base, index = 1) => {
        const normalizedBase = String(base).replace(/[\u0000-\u001f:\/?*\[\]]/g, "_").replace(/^'+|'+$/g, "").trim() || "名簿";
        const candidate = `${normalizedBase.slice(0, 31 - (index > 1 ? String(index).length + 1 : 0))}${index > 1 ? `_${index}` : ""}`;
        if (!usedNames.has(candidate)) { usedNames.add(candidate); return candidate; }
        return safeName(normalizedBase, index + 1);
      };
      const sheet = XLSX.utils.aoa_to_sheet([headers, ...rows.map((record) => [...fields.map((field) => String(record[field] ?? "")), ...attendanceColumns.map((column) => column.value(record))])], { cellDates: false });
      sheet["!cols"] = headers.map(() => ({ wch: 16 }));
      XLSX.utils.book_append_sheet(workbook, sheet, safeName(name));
    });
    XLSX.writeFile(workbook, "第78回体育祭名簿.xlsx");
    resetLockTimer();
  }

  async function signIn() {
    try {
      await state.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      const message = error.code === "auth/popup-blocked" ? "ポップアップがブロックされました。ブラウザーで許可してください。" : "Googleログインに失敗しました。ページを再読み込みしてお試しください。";
      setMessage("unlockMessage", message, true);
    }
  }

  try {
    if (!FIRESTORE_RULES_READY) {
      setMessage("unlockMessage", "FirebaseのFirestoreルール設定が未確認のため、生徒照会を停止しています。設定手順は firebase/student-directory.rules.fragment を確認してください。", true);
      $("googleLoginButton").disabled = true;
      return;
    }
    const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(FIREBASE_CONFIG);
    state.auth = firebase.auth(app);
    state.db = firebase.firestore(app);
    $("googleLoginButton").addEventListener("click", signIn);
    state.auth.onAuthStateChanged(async (user) => {
      clearTimeout(state.lockTimer);
      state.user = user;
      if (!user) {
        state.rows = [];
        state.fields = [];
        state.selectedStudentIndices.clear();
        $("directoryPanel").classList.add("hidden");
        $("unlockPanel").classList.remove("hidden");
        $("lockButton").classList.add("hidden");
        $("results").replaceChildren();
        return;
      }
      if (!user.emailVerified || !AUTHORIZED_EMAILS.has(user.email?.toLowerCase())) {
        setMessage("unlockMessage", `このページを利用できるのは許可されたGoogleアカウントのみです。現在のアカウント: ${user.email ?? "不明"}`, true);
        await state.auth.signOut();
        return;
      }
      try {
        setMessage("unlockMessage", "共有名簿を読み込んでいます…");
        await loadCloudDirectory();
        $("unlockMessage").textContent = "";
      } catch (error) {
        $("directoryPanel").classList.add("hidden");
        $("unlockPanel").classList.remove("hidden");
        const message = error.code === "permission-denied"
          ? "Firebaseの読み取りルールで拒否されました。Firestoreルールを設定してから再度お試しください。"
          : "共有名簿を読み込めませんでした。ネットワークとFirebase設定を確認してください。";
        setMessage("unlockMessage", message, true);
      }
    });
  } catch (error) {
    setMessage("unlockMessage", "Firebaseを初期化できませんでした。ネットワーク接続を確認してください。", true);
    $("googleLoginButton").disabled = true;
  }
  $("importFile").addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const imported = await readFile(file);
      stageImport(imported.sheets);
    } catch (error) {
      console.error("Excel/CSVの読み込みに失敗しました:", error);
      $("importOptions").classList.add("hidden");
      $("importFile").value = "";
      const detail = String(error?.message || error || "不明なエラー").slice(0, 180);
      const hint = detail.toLowerCase().includes("password") || detail.toLowerCase().includes("encrypted")
        ? "パスワードなしの.xlsxまたはCSV UTF-8で保存し直してください。"
        : "対応形式はCSVまたは.xlsxです。詳細を確認して再度お試しください。";
      setMessage("importStatus", `読み込み失敗: ${detail}。${hint}`, true);
    }
  });
  $("sheetSelect").addEventListener("change", updateImportKeyOptions);
  $("importMode").addEventListener("change", () => $("keyField").closest("label").classList.toggle("hidden", $("importMode").value !== "merge"));
  $("confirmImport").addEventListener("click", () => commitImport().catch((error) => setMessage("importStatus", error.message || "Firebaseへの保存に失敗しました。アクセスルールと接続を確認してください。", true)));
  $("cancelImport").addEventListener("click", () => { state.staged = null; $("importOptions").classList.add("hidden"); $("importFile").value = ""; });
  $("query").addEventListener("input", () => { renderResults(); renderAttendanceRecords(); renderExportGroupValues(); resetLockTimer(); });
  $("attendanceSessionSelect").addEventListener("change", () => { state.activeAttendanceSessionId = $("attendanceSessionSelect").value; renderAttendanceGrades(); renderAttendanceRecords(); });
  $("removeAttendanceSessionButton").addEventListener("click", () => removeAttendanceSession(state.activeAttendanceSessionId));
  $("attendanceLookup").addEventListener("input", () => { state.attendanceLookup = $("attendanceLookup").value; renderAttendanceRecords(); resetLockTimer(); });
  $("attendanceSportFilter").addEventListener("change", () => { state.attendanceSportFilter = $("attendanceSportFilter").value; renderAttendanceGrades(); renderAttendanceRecords(); resetLockTimer(); });
  $("exportGroupFields").addEventListener("change", renderExportGroupValues);
  $("exportButton").addEventListener("click", exportAttendanceWorkbook);
  $("viewMode").addEventListener("change", renderResults);
  $("viewMode").addEventListener("change", () => document.body.classList.toggle("wide-table-view", $("viewMode").value === "table"));
  $("studentPickerSearch").addEventListener("input", renderStudentCandidates);
  $("addAttendanceSessionForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = $("attendanceSessionName").value.trim();
    if (!name) return;
    if (state.attendanceSessions.some((session) => session.name === name)) return setMessage("attendanceStatus", "同じ競技名がすでにあります。", true);
    const session = { id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name, grades: {}, numbers: [] };
    state.attendanceSessions.splice(-1, 0, session);
    renderAttendanceSessions();
    try {
      await persist();
      $("attendanceSessionName").value = "";
      setMessage("attendanceStatus", `「${name}」を追加しました。`);
      resetLockTimer();
    } catch (error) {
      state.attendanceSessions = state.attendanceSessions.filter((item) => item.id !== session.id);
      renderAttendanceSessions();
      setMessage("attendanceStatus", `追加を保存できませんでした: ${error.message}`, true);
    }
  });
  $("assignmentField").addEventListener("change", renderAssignmentFields);
  $("assignValueButton").addEventListener("click", async () => {
    const indices = [...state.selectedStudentIndices].filter((index) => state.rows[index]), field = $("assignmentField").value, value = $("assignmentValue").value.trim();
    if (!indices.length || !field) return;
    if (!value) return setMessage("editStatus", "追加する文字列を入力してください。", true);
    const previousValues = indices.map((index) => state.rows[index][field] ?? "");
    indices.forEach((index) => { state.rows[index][field] = value; });
    try {
      await persist(); setMessage("editStatus", `選択した${indices.length}人の「${field}」を保存しました。`); $("assignmentValue").value = ""; state.selectedStudentIndices.clear(); renderStudentCandidates(); renderResults(); resetLockTimer();
    } catch (error) {
      indices.forEach((index, i) => { state.rows[index][field] = previousValues[i]; }); setMessage("editStatus", `保存できませんでした: ${error.message}`, true);
    }
  });
  $("addFieldForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const field = $("newFieldName").value.trim();
    if (!field) return;
    if (state.fields.includes(field)) return setMessage("editStatus", "同じ名前の項目がすでにあります。", true);
    const oldFields = state.fields, oldRows = state.rows.map((row) => ({ ...row }));
    state.fields = [...state.fields, field]; state.rows.forEach((row) => { row[field] = ""; });
    try {
      await persist(); $("newFieldName").value = ""; setMessage("editStatus", `「${field}」を追加して保存しました。`); renderDirectory(); $("assignmentField").value = field; renderAssignmentFields();
    } catch (error) {
      state.fields = oldFields; state.rows = oldRows; setMessage("editStatus", `保存できませんでした: ${error.message}`, true);
    }
  });
  $("lockButton").addEventListener("click", () => lock());
  ["pointerdown", "keydown"].forEach((eventName) => document.addEventListener(eventName, () => { if (state.user) resetLockTimer(); }, { passive: true }));
})();
