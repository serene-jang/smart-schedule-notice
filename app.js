const guideModal = document.getElementById("guideModal");
const openGuideButton = document.getElementById("openGuideButton");
const closeGuideButton = document.getElementById("closeGuideButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const runTestsButton = document.getElementById("runTestsButton");
const currentDateTime = document.getElementById("currentDateTime");
const timetableTableBody = document.getElementById("timetableTableBody");
const noticeList = document.getElementById("noticeList");
const mainNoticeHeading = document.getElementById("mainNoticeHeading");
const mainNoticeBody = document.getElementById("mainNoticeBody");
const noticeBadge = document.getElementById("noticeBadge");
const syncStatusText = document.getElementById("syncStatusText");
const systemMessage = document.getElementById("systemMessage");
const currentPeriodLabel = document.getElementById("currentPeriodLabel");
const nextPeriodLabel = document.getElementById("nextPeriodLabel");
const classFilterSelect = document.getElementById("classFilterSelect");
const dayFilterSelect = document.getElementById("dayFilterSelect");

const noticeForm = document.getElementById("noticeForm");
const noticeClassInput = document.getElementById("noticeClassInput");
const noticePeriodInput = document.getElementById("noticePeriodInput");
const noticeSubjectInput = document.getElementById("noticeSubjectInput");
const noticeTeacherInput = document.getElementById("noticeTeacherInput");
const noticeTimeInput = document.getElementById("noticeTimeInput");
const noticeDateInput = document.getElementById("noticeDateInput");
const noticeBodyInput = document.getElementById("noticeBodyInput");
const noticePriorityInput = document.getElementById("noticePriorityInput");
const noticeSubmitButton = document.getElementById("noticeSubmitButton");
const cancelNoticeEditButton = document.getElementById("cancelNoticeEditButton");
const noticeError = document.getElementById("noticeError");
const noticeSearchInput = document.getElementById("noticeSearchInput");
const noticeClassFilterSelect = document.getElementById("noticeClassFilterSelect");
const noticeDateFilterInput = document.getElementById("noticeDateFilterInput");
const noticePriorityFilterSelect = document.getElementById("noticePriorityFilterSelect");
const noticeSortSelect = document.getElementById("noticeSortSelect");
const noticeCalendarList = document.getElementById("noticeCalendarList");
const classNoticePreviewList = document.getElementById("classNoticePreviewList");
const calendarPrevMonth = document.getElementById("calendarPrevMonth");
const calendarNextMonth = document.getElementById("calendarNextMonth");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const teacherNoticeEditor = document.getElementById("teacherNoticeEditor");
const timetableShortcuts = document.getElementById("timetableShortcuts");

const timetableForm = document.getElementById("timetableForm");
const classNameInput = document.getElementById("classNameInput");
const dayInput = document.getElementById("dayInput");
const periodInput = document.getElementById("periodInput");
const subjectInput = document.getElementById("subjectInput");
const teacherInput = document.getElementById("teacherInput");
const startTimeInput = document.getElementById("startTimeInput");
const endTimeInput = document.getElementById("endTimeInput");
const timetableError = document.getElementById("timetableError");
const timetableSubmitButton = document.getElementById("timetableSubmitButton");
const cancelTimetableEditButton = document.getElementById("cancelTimetableEditButton");
const timetableExcelInput = document.getElementById("timetableExcelInput");

const startRotateButton = document.getElementById("startRotateButton");
const stopRotateButton = document.getElementById("stopRotateButton");
const speakButton = document.getElementById("speakButton");

const GUIDE_KEY = "ssn_guide_seen";
const STUDENT_NOTICE_QUEUE_KEY = "ssn_student_notice_queue";
const SELECTED_CLASS_KEY = "ssn_selected_class";
const SHARED_TIMETABLE_KEY = "ssn_shared_timetable";
const SHARED_NOTICES_KEY = "ssn_shared_notices";
const LIVE_SYNC_CHANNEL_NAME = "ssn_live_sync";
const liveSyncChannel = typeof BroadcastChannel !== "undefined"
  ? new BroadcastChannel(LIVE_SYNC_CHANNEL_NAME)
  : null;
const WEEKDAYS = ["월", "화", "수", "목", "금"];
const CLASS_OPTIONS = Array.from({ length: 11 }, (_, i) => `${i + 1}반`);
const LUNCH_BREAK_TIME = { start: "13:10", end: "13:55" };
const DEFAULT_PERIOD_TIME_MAP = {
  "1교시": { start: "08:50", end: "09:35" },
  "2교시": { start: "09:45", end: "10:30" },
  "3교시": { start: "10:40", end: "11:25" },
  "4교시": { start: "11:35", end: "12:20" },
  "5교시": { start: "12:30", end: "13:10" },
  "6교시": { start: "14:05", end: "14:50" },
  "7교시": { start: "15:00", end: "15:45" },
};

const sampleTimetable = [
  { id: "T001", className: "1반", day: "월", period: "1교시", subject: "국어", teacher: "김선생님", start: "08:50", end: "09:35" },
  { id: "T002", className: "1반", day: "월", period: "2교시", subject: "수학", teacher: "이선생님", start: "09:45", end: "10:30" },
  { id: "T003", className: "1반", day: "월", period: "3교시", subject: "과학", teacher: "박선생님", start: "10:40", end: "11:25" },
  { id: "T004", className: "2반", day: "월", period: "1교시", subject: "영어", teacher: "최선생님", start: "08:50", end: "09:35" },
  { id: "T501", className: "5반", day: "월", period: "1교시", subject: "영어", teacher: "미정", start: "08:50", end: "09:35" },
  { id: "T502", className: "5반", day: "월", period: "2교시", subject: "진로", teacher: "미정", start: "09:45", end: "10:30" },
  { id: "T503", className: "5반", day: "월", period: "3교시", subject: "과1", teacher: "미정", start: "10:40", end: "11:25" },
  { id: "T504", className: "5반", day: "월", period: "4교시", subject: "국1", teacher: "미정", start: "11:35", end: "12:20" },
  { id: "T505", className: "5반", day: "월", period: "5교시", subject: "기술", teacher: "미정", start: "12:30", end: "13:10" },
  { id: "T506", className: "5반", day: "월", period: "6교시", subject: "수학", teacher: "미정", start: "14:05", end: "14:50" },
  { id: "T507", className: "5반", day: "월", period: "7교시", subject: "자율", teacher: "미정", start: "15:00", end: "15:45" },

  { id: "T511", className: "5반", day: "화", period: "1교시", subject: "국2", teacher: "미정", start: "08:50", end: "09:35" },
  { id: "T512", className: "5반", day: "화", period: "2교시", subject: "수학", teacher: "미정", start: "09:45", end: "10:30" },
  { id: "T513", className: "5반", day: "화", period: "3교시", subject: "미2", teacher: "미정", start: "10:40", end: "11:25" },
  { id: "T514", className: "5반", day: "화", period: "4교시", subject: "사회", teacher: "미정", start: "11:35", end: "12:20" },
  { id: "T515", className: "5반", day: "화", period: "5교시", subject: "영2", teacher: "미정", start: "12:30", end: "13:10" },
  { id: "T516", className: "5반", day: "화", period: "6교시", subject: "음악", teacher: "미정", start: "14:05", end: "14:50" },
  { id: "T517", className: "5반", day: "화", period: "7교시", subject: "체1", teacher: "미정", start: "15:00", end: "15:45" },

  { id: "T521", className: "5반", day: "수", period: "1교시", subject: "과2", teacher: "미정", start: "08:50", end: "09:35" },
  { id: "T522", className: "5반", day: "수", period: "2교시", subject: "체2", teacher: "미정", start: "09:45", end: "10:30" },
  { id: "T523", className: "5반", day: "수", period: "3교시", subject: "국1", teacher: "미정", start: "10:40", end: "11:25" },
  { id: "T524", className: "5반", day: "수", period: "4교시", subject: "정보", teacher: "미정", start: "11:35", end: "12:20" },
  { id: "T526", className: "5반", day: "수", period: "6교시", subject: "사회", teacher: "미정", start: "14:05", end: "14:50" },

  { id: "T531", className: "5반", day: "목", period: "1교시", subject: "사회", teacher: "미정", start: "08:50", end: "09:35" },
  { id: "T532", className: "5반", day: "목", period: "2교시", subject: "수학", teacher: "미정", start: "09:45", end: "10:30" },
  { id: "T533", className: "5반", day: "목", period: "3교시", subject: "도덕", teacher: "미정", start: "10:40", end: "11:25" },
  { id: "T534", className: "5반", day: "목", period: "4교시", subject: "미1", teacher: "미정", start: "11:35", end: "12:20" },
  { id: "T535", className: "5반", day: "목", period: "5교시", subject: "영1", teacher: "미정", start: "12:30", end: "13:10" },
  { id: "T536", className: "5반", day: "목", period: "6교시", subject: "과2", teacher: "미정", start: "14:05", end: "14:50" },
  { id: "T537", className: "5반", day: "목", period: "7교시", subject: "가정", teacher: "미정", start: "15:00", end: "15:45" },

  { id: "T541", className: "5반", day: "금", period: "1교시", subject: "도덕", teacher: "미정", start: "08:50", end: "09:35" },
  { id: "T542", className: "5반", day: "금", period: "2교시", subject: "스포츠", teacher: "미정", start: "09:45", end: "10:30" },
  { id: "T543", className: "5반", day: "금", period: "3교시", subject: "국2", teacher: "미정", start: "10:40", end: "11:25" },
  { id: "T544", className: "5반", day: "금", period: "4교시", subject: "국3", teacher: "미정", start: "11:35", end: "12:20" },
  { id: "T545", className: "5반", day: "금", period: "5교시", subject: "수학", teacher: "미정", start: "12:30", end: "13:10" },
  { id: "T546", className: "5반", day: "금", period: "6교시", subject: "체2", teacher: "미정", start: "14:05", end: "14:50" },
];

const sampleNotices = [
  {
    id: "N001",
    className: "1반",
    teacher: "이선생님",
    period: "2교시",
    date: getTodayDateText(),
    title: "2교시 수학 공지",
    body: "컴퍼스와 각도기를 챙겨 주세요.",
    priority: "중요",
    createdAt: new Date().toISOString(),
  },
];

const appState = {
  notices: [],
  timetable: [],
  lastSyncAt: null,
  speechSupported: false,
  selectedNoticeId: null,
  rotateTimerId: null,
  rotationQueueIds: [],
  rotationCursor: 0,
  selectedClassName: "",
  selectedDay: getDayName(new Date()),
  selectedCalendarDate: getTodayDateText(),
  calendarViewYear: new Date().getFullYear(),
  calendarViewMonth: new Date().getMonth(),
  editingTimetableId: null,
  editingNoticeId: null,
  lastSessionKind: null,
  lastBreakSignature: null,
  currentScreen: "teacher",
};

function getTodayDateText() {
  return new Date().toISOString().slice(0, 10);
}

function getDayName(now) {
  const dayIndex = now.getDay();
  const map = { 1: "월", 2: "화", 3: "수", 4: "목", 5: "금" };
  return map[dayIndex] || "월";
}

function formatDateTime(now) {
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} (${weekday}) ${hh}:${mi}:${ss}`;
}

function formatTime(now) {
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function renderClock() {
  currentDateTime.textContent = formatDateTime(new Date());
}

function showSystemMessage(message, type = "info") {
  systemMessage.textContent = message;
  systemMessage.classList.remove("hidden", "info", "warn", "error");
  systemMessage.classList.add(type);
}

function hideSystemMessage() {
  systemMessage.classList.add("hidden");
  systemMessage.classList.remove("info", "warn", "error");
}

function showFieldError(target, message) {
  target.textContent = message;
  target.classList.remove("hidden");
}

function hideFieldError(target) {
  target.classList.add("hidden");
}

function renderPeriodTimeGuide() {
  hideFieldError(noticeError);
}

function updateSyncStatus(now, detail) {
  appState.lastSyncAt = now;
  syncStatusText.textContent = `동기화 상태: 정상 (${detail})`;
}

function parseTimeToMinutes(timeText) {
  const [hh, mm] = timeText.split(":").map(Number);
  return hh * 60 + mm;
}

function normalizeDay(text) {
  const value = String(text ?? "").trim();
  if (!value) return "";

  const compact = value
    .replace(/\s+/g, "")
    .replace(/[()\[\]{}]/g, "")
    .toLowerCase();

  // Accept exact school weekdays only.
  if (WEEKDAYS.includes(compact)) return compact;
  if (WEEKDAYS.includes(compact.replace("요일", ""))) return compact.replace("요일", "");

  const engToKorDay = {
    mon: "월",
    monday: "월",
    tue: "화",
    tues: "화",
    tuesday: "화",
    wed: "수",
    wednesday: "수",
    thu: "목",
    thur: "목",
    thurs: "목",
    thursday: "목",
    fri: "금",
    friday: "금",
  };

  return engToKorDay[compact] || "";
}

function normalizeClassName(text) {
  const value = String(text ?? "").trim();
  if (!value) return "";
  if (CLASS_OPTIONS.includes(value)) return value;

  // 1) Most reliable: explicit "N반" pattern (e.g. "3학년 1반" -> "1반")
  const classSuffixMatch = value.match(/(\d{1,2})\s*반/);
  if (classSuffixMatch) {
    const className = `${Number(classSuffixMatch[1])}반`;
    return CLASS_OPTIONS.includes(className) ? className : "";
  }

  // 2) Common shorthand like "1-3" means 3반.
  const hyphenMatch = value.match(/(\d{1,2})\s*[-_]\s*(\d{1,2})/);
  if (hyphenMatch) {
    const className = `${Number(hyphenMatch[2])}반`;
    return CLASS_OPTIONS.includes(className) ? className : "";
  }

  // 3) If only grade is present (e.g. "1학년"), do not treat it as class.
  if (/학년/.test(value)) {
    return "";
  }

  // 4) Fallback: use the last numeric token.
  const numbers = value.match(/\d{1,2}/g);
  if (!numbers || numbers.length === 0) return "";
  const className = `${Number(numbers[numbers.length - 1])}반`;
  return CLASS_OPTIONS.includes(className) ? className : "";
}

function normalizePeriod(text) {
  const value = String(text ?? "").trim();
  if (!value) return "";
  if (value.includes("교시")) return value.replace(/\s+/g, "");
  const matched = value.match(/(\d{1,2})\s*(?:교시|교|t|th)?/i);
  if (!matched) return "";
  const periodNo = Number(matched[1]);
  if (!Number.isFinite(periodNo) || periodNo <= 0 || periodNo > 20) return "";
  return `${periodNo}교시`;
}

function getDefaultTimesByPeriod(period) {
  return DEFAULT_PERIOD_TIME_MAP[period] || { start: "08:50", end: "09:35" };
}

function mapHeaderColumns(headerRow) {
  const map = {};
  headerRow.forEach((cell, index) => {
    const h = String(cell ?? "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[()\[\]{}]/g, "");
    if (!h) return;
    if (["반", "학급", "class"].includes(h)) map.className = index;
    if (["요일", "day"].includes(h)) map.day = index;
    if (["교시", "period"].includes(h)) map.period = index;
    if (["과목", "subject"].includes(h)) map.subject = index;
    if (["선생님", "교사", "담당", "teacher"].includes(h)) map.teacher = index;
    if (["시작", "시작시간", "start"].includes(h)) map.start = index;
    if (["종료", "끝", "종료시간", "end"].includes(h)) map.end = index;
  });
  return map;
}

function findColumnHeaderRowIndex(sheetRows) {
  for (let i = 0; i < Math.min(sheetRows.length, 25); i += 1) {
    const row = sheetRows[i] || [];
    const col = mapHeaderColumns(row);
    if (col.day !== undefined && col.period !== undefined && col.subject !== undefined) {
      return i;
    }
  }
  return -1;
}

function normalizeTimeCellValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) {
    const minutesInDay = 24 * 60;
    const totalMinutes = Math.round((value % 1) * minutesInDay);
    const hh = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const mm = String(totalMinutes % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  const text = String(value).trim();
  if (!text) return "";

  const rangeMatch = text.match(/(\d{1,2}):(\d{2})\s*[~-]\s*(\d{1,2}):(\d{2})/);
  if (rangeMatch) {
    return `${rangeMatch[1].padStart(2, "0")}:${rangeMatch[2]}`;
  }

  const timeMatch = text.match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return "";
  return `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`;
}

function normalizeEndTimeCellValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) {
    const minutesInDay = 24 * 60;
    const totalMinutes = Math.round((value % 1) * minutesInDay);
    const hh = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
    const mm = String(totalMinutes % 60).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  const text = String(value).trim();
  if (!text) return "";

  const rangeMatch = text.match(/(\d{1,2}):(\d{2})\s*[~-]\s*(\d{1,2}):(\d{2})/);
  if (rangeMatch) {
    return `${rangeMatch[3].padStart(2, "0")}:${rangeMatch[4]}`;
  }

  const timeMatch = text.match(/(\d{1,2}):(\d{2})/);
  if (!timeMatch) return "";
  return `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`;
}

function detectPeriodColumnIndex(sheetRows, startRow, maxScanColumns = 8) {
  const score = new Map();
  for (let r = startRow; r < Math.min(sheetRows.length, startRow + 30); r += 1) {
    const row = sheetRows[r] || [];
    for (let c = 0; c < Math.min(row.length, maxScanColumns); c += 1) {
      const period = normalizePeriod(row[c]);
      if (!period) continue;
      score.set(c, (score.get(c) || 0) + 1);
    }
  }
  if (score.size === 0) return 0;

  return [...score.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function parseColumnTimetableRows(sheetRows) {
  const headerIndex = findColumnHeaderRowIndex(sheetRows);
  if (headerIndex < 0) return [];

  const header = sheetRows[headerIndex] || [];
  const col = mapHeaderColumns(header);
  if (col.day === undefined || col.period === undefined || col.subject === undefined) {
    return [];
  }

  const parsed = [];
  for (let i = headerIndex + 1; i < sheetRows.length; i += 1) {
    const row = sheetRows[i] || [];
    const className = col.className !== undefined
      ? normalizeClassName(row[col.className])
      : appState.selectedClassName;
    const day = normalizeDay(row[col.day]);
    const period = normalizePeriod(row[col.period]);
    const subject = String(row[col.subject] ?? "").trim();
    if (!className || !day || !period || !subject) continue;

    const defaultTime = getDefaultTimesByPeriod(period);
    const startRaw = col.start !== undefined ? normalizeTimeCellValue(row[col.start]) : "";
    const endRaw = col.end !== undefined ? normalizeEndTimeCellValue(row[col.end]) : "";
    const start = isValidTimeText(startRaw) ? startRaw : defaultTime.start;
    const end = isValidTimeText(endRaw) ? endRaw : defaultTime.end;
    const teacher = String(row[col.teacher] ?? "").trim() || "미정";

    parsed.push({ className, day, period, subject, teacher, start, end });
  }
  return parsed;
}

function parseGridTimetableRows(sheetRows) {
  if (sheetRows.length < 2) return [];
  if (!appState.selectedClassName) return [];
  const headerIndex = sheetRows.findIndex((r) => r.some((c) => normalizeDay(c)));
  if (headerIndex < 0) return [];
  const dayHeaderRow = sheetRows[headerIndex];
  const periodColumnIndex = detectPeriodColumnIndex(sheetRows, headerIndex + 1);

  const dayCol = [];
  dayHeaderRow.forEach((cell, idx) => {
    const day = normalizeDay(cell);
    if (day) dayCol.push({ idx, day });
  });
  if (dayCol.length === 0) return [];

  const parsed = [];
  const className = appState.selectedClassName;
  for (let i = headerIndex + 1; i < sheetRows.length; i += 1) {
    const row = sheetRows[i] || [];
    const period = normalizePeriod(row[periodColumnIndex]);
    if (!period) continue;

    dayCol.forEach(({ idx, day }) => {
      const subject = String(row[idx] ?? "").trim();
      if (!subject || subject === "▽" || subject === "▼") return;
      const defaultTime = getDefaultTimesByPeriod(period);
      parsed.push({
        className,
        day,
        period,
        subject,
        teacher: "미정",
        start: defaultTime.start,
        end: defaultTime.end,
      });
    });
  }
  return parsed;
}

function upsertTimetableRows(rows) {
  let updated = 0;
  let added = 0;
  rows.forEach((item) => {
    const existed = appState.timetable.find((r) => r.className === item.className && r.day === item.day && r.period === item.period);
    if (existed) {
      existed.subject = item.subject;
      existed.teacher = item.teacher;
      existed.start = item.start;
      existed.end = item.end;
      updated += 1;
      return;
    }
    appState.timetable.push({ id: `T${Date.now()}${Math.floor(Math.random() * 1000)}`, ...item });
    added += 1;
  });
  return { added, updated };
}

function importTimetableFromWorkbook(workbook) {
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

  let parsed = parseColumnTimetableRows(rows);
  if (parsed.length === 0) {
    parsed = parseGridTimetableRows(rows);
  }

  if (parsed.length === 0) {
    throw new Error("엑셀 형식을 읽지 못했습니다. 표 형식이면 학년/반을 먼저 선택한 뒤 업로드해 주세요.");
  }

  return upsertTimetableRows(parsed);
}

function handleTimetableExcelUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!appState.selectedClassName) {
    showSystemMessage("엑셀 업로드 전에 반을 먼저 선택해 주세요.", "warn");
    timetableExcelInput.value = "";
    return;
  }

  if (!window.XLSX) {
    showSystemMessage("엑셀 라이브러리를 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const result = importTimetableFromWorkbook(workbook);
      saveSharedState();

      renderTimetable();
      renderTimetableShortcuts();
      updateNoticeTeacherPeriodOptions();
      runSyncCheck();

      showSystemMessage(`엑셀 업로드 완료: ${result.added}개 추가, ${result.updated}개 수정`, "info");
    } catch (error) {
      showSystemMessage(error.message || "엑셀 파일 처리 중 오류가 발생했습니다.", "error");
    } finally {
      timetableExcelInput.value = "";
    }
  };

  reader.onerror = () => {
    showSystemMessage("파일을 읽는 중 오류가 발생했습니다.", "error");
    timetableExcelInput.value = "";
  };

  reader.readAsArrayBuffer(file);
}

function isValidTimeText(timeText) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeText);
}

function compareTimeRows(a, b) {
  return parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start);
}

function getPriorityRank(priority) {
  return priority === "중요" ? 2 : 1;
}

function compareNoticesByRule(a, b, rule) {
  const aDateTime = new Date(a.createdAt).getTime();
  const bDateTime = new Date(b.createdAt).getTime();
  const aDate = new Date(`${a.date}T00:00:00`).getTime();
  const bDate = new Date(`${b.date}T00:00:00`).getTime();

  if (rule === "time-asc") {
    return aDate - bDate || aDateTime - bDateTime;
  }
  if (rule === "time-desc") {
    return bDate - aDate || bDateTime - aDateTime;
  }

  return getPriorityRank(b.priority) - getPriorityRank(a.priority) || bDate - aDate || bDateTime - aDateTime;
}

function populateClassSelect(selectElement, selectedValue) {
  selectElement.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "반 선택";
  selectElement.appendChild(placeholder);

  CLASS_OPTIONS.forEach((className) => {
    const option = document.createElement("option");
    option.value = className;
    option.textContent = className;
    selectElement.appendChild(option);
  });
  selectElement.value = CLASS_OPTIONS.includes(selectedValue) ? selectedValue : "";
}

function populateClassFilter() {
  populateClassSelect(classFilterSelect, appState.selectedClassName);
}

function syncSelectionFlow() {
  dayFilterSelect.disabled = !appState.selectedClassName;
}

function populateNoticeClassFilter() {
  noticeClassFilterSelect.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "전체";
  noticeClassFilterSelect.appendChild(allOption);

  CLASS_OPTIONS.forEach((className) => {
    const option = document.createElement("option");
    option.value = className;
    option.textContent = className;
    noticeClassFilterSelect.appendChild(option);
  });
}

function getFilteredTimetable() {
  if (!appState.selectedClassName || !appState.selectedDay) {
    return [];
  }
  return appState.timetable
    .filter((row) => row.className === appState.selectedClassName && row.day === appState.selectedDay)
    .sort(compareTimeRows);
}

function getTimetableForClassDay(className, day) {
  return appState.timetable
    .filter((row) => row.className === className && row.day === day)
    .sort(compareTimeRows);
}

function fillNoticeFromTimetableRow(row) {
  appState.selectedClassName = row.className;
  classFilterSelect.value = row.className;
  noticeClassInput.value = row.className;
  syncSelectionFlow();
  noticePeriodInput.value = row.period;
  noticeSubjectInput.value = row.subject;
  noticeTeacherInput.value = row.teacher;
  noticeTimeInput.value = `${row.start}~${row.end}`;
  noticeBodyInput.focus();
  hideFieldError(noticeError);

  Array.from(timetableShortcuts.querySelectorAll(".shortcut-button")).forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.rowId === row.id);
  });
}

function renderTimetableShortcuts() {
  if (!timetableShortcuts) return;
  timetableShortcuts.innerHTML = "";

  if (!appState.selectedClassName || !appState.selectedDay) {
    const hint = document.createElement("p");
    hint.className = "teacher-only-caption";
    hint.textContent = "반을 먼저 선택하면 시간표 버튼이 나타납니다.";
    timetableShortcuts.appendChild(hint);
    return;
  }

  const className = noticeClassInput.value;
  const day = appState.selectedDay;
  const rows = getTimetableForClassDay(className, day);

  if (rows.length === 0) {
    const hint = document.createElement("p");
    hint.className = "teacher-only-caption";
    hint.textContent = `${className} ${day}요일 시간표를 먼저 등록하면 여기에 빠른 선택 버튼이 나타납니다.`;
    timetableShortcuts.appendChild(hint);
    return;
  }

  rows.forEach((row) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "shortcut-button";
    btn.dataset.rowId = row.id;
    btn.textContent = `${row.period} ${row.subject} ${row.teacher}`;
    btn.addEventListener("click", () => fillNoticeFromTimetableRow(row));
    timetableShortcuts.appendChild(btn);
  });
}

function updateNoticeTeacherPeriodOptions() {
  hideFieldError(noticeError);
  renderTimetableShortcuts();
}

function getFilteredSortedNotices() {
  const keyword = noticeSearchInput.value.trim().toLowerCase();
  const classFilter = noticeClassFilterSelect.value || "all";
  const dateFilter = noticeDateFilterInput.value;
  const priorityFilter = noticePriorityFilterSelect.value || "all";
  const sortRule = noticeSortSelect.value || "priority-time";

  return [...appState.notices]
    .filter((notice) => {
      const byKeyword = !keyword || notice.title.toLowerCase().includes(keyword) || notice.body.toLowerCase().includes(keyword);
      const byClass = classFilter === "all" || notice.className === classFilter;
      const byDate = !dateFilter || notice.date === dateFilter;
      const byPriority = priorityFilter === "all" || notice.priority === priorityFilter;
      return byKeyword && byClass && byDate && byPriority;
    })
    .sort((a, b) => compareNoticesByRule(a, b, sortRule));
}

function getSessionStatus(now, schedule) {
  if (schedule.length === 0) {
    return { kind: "none", label: "시간표 없음", period: null, breakSignature: null, nextRow: null };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sorted = [...schedule].sort(compareTimeRows);

  for (let i = 0; i < sorted.length; i += 1) {
    const current = sorted[i];
    const start = parseTimeToMinutes(current.start);
    const end = parseTimeToMinutes(current.end);

    if (currentMinutes >= start && currentMinutes <= end) {
      return { kind: "class", label: `${current.period} (${current.subject})`, period: current.period, breakSignature: null, nextRow: null };
    }

    if (i < sorted.length - 1) {
      const next = sorted[i + 1];
      const nextStart = parseTimeToMinutes(next.start);
      if (currentMinutes > end && currentMinutes < nextStart) {
        const dayStamp = now.toISOString().slice(0, 10);
        const signature = `${appState.selectedClassName}-${appState.selectedDay}-${current.period}-${next.period}-${dayStamp}`;
        const isLunchGap = current.period === "5교시" && next.period === "6교시";
        const label = isLunchGap ? `점심시간 (${LUNCH_BREAK_TIME.start} - ${LUNCH_BREAK_TIME.end})` : `쉬는 시간 (${current.period} 후)`;
        return { kind: "break", label, period: null, breakSignature: signature, nextRow: next };
      }
    }
  }

  const firstStart = parseTimeToMinutes(sorted[0].start);
  const lastEnd = parseTimeToMinutes(sorted[sorted.length - 1].end);

  if (currentMinutes < firstStart) {
    return { kind: "before", label: "수업 전", period: null, breakSignature: null, nextRow: sorted[0] };
  }

  if (currentMinutes > lastEnd) {
    return { kind: "after", label: "수업 후", period: null, breakSignature: null, nextRow: null };
  }

  return { kind: "none", label: "확인 중", period: null, breakSignature: null, nextRow: null };
}

function renderPeriodChip(status) {
  currentPeriodLabel.textContent = `현재: ${status.label}`;
}

function renderNextPeriodChip(schedule, status) {
  const sorted = [...schedule].sort(compareTimeRows);
  const nowMinutes = parseTimeToMinutes(formatTime(new Date()));

  let nextRow = null;
  if (status.kind === "break" || status.kind === "before") {
    nextRow = status.nextRow;
  } else if (status.kind === "class") {
    const currentIndex = sorted.findIndex((row) => row.period === status.period);
    if (currentIndex >= 0 && currentIndex < sorted.length - 1) {
      nextRow = sorted[currentIndex + 1];
    }
  } else {
    nextRow = sorted.find((row) => parseTimeToMinutes(row.start) > nowMinutes) || null;
  }

  if (!nextRow) {
    nextPeriodLabel.textContent = "다음: 없음";
    return;
  }
  nextPeriodLabel.textContent = `다음: ${nextRow.period} (${nextRow.subject})`;
}

function setMainNotice(notice) {
  if (!notice) {
    mainNoticeHeading.textContent = "오늘 등록된 공지가 없습니다.";
    mainNoticeBody.textContent = "공지 작성 화면에서 새 공지를 등록해 주세요.";
    noticeBadge.textContent = "안내";
    return;
  }

  mainNoticeHeading.textContent = notice.title;
  mainNoticeBody.textContent = `${notice.body}`;
  const subjectText = notice.subject ? ` · ${notice.subject}` : "";
  noticeBadge.textContent = `${notice.priority} · ${notice.className} · ${notice.teacher} · ${notice.period}${subjectText}`;
}

function showNoticeById(noticeId) {
  const target = appState.notices.find((notice) => notice.id === noticeId);
  if (!target) {
    return;
  }

  appState.selectedNoticeId = target.id;
  setMainNotice(target);
  renderNotices();
}

function renderTimetable() {
  timetableTableBody.innerHTML = "";

  if (!appState.selectedClassName || !appState.selectedDay) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.className = "table-empty-cell";
    td.textContent = "반을 먼저 선택하면 시간표가 보입니다.";
    tr.appendChild(td);
    timetableTableBody.appendChild(tr);
    renderPeriodChip({ kind: "none", label: "선택 필요" });
    return;
  }

  const filtered = getFilteredTimetable();
  const status = getSessionStatus(new Date(), filtered);
  renderPeriodChip(status);

  if (filtered.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.className = "table-empty-cell";
    td.textContent = `${appState.selectedClassName} ${appState.selectedDay}요일 시간표가 없습니다.`;
    tr.appendChild(td);
    timetableTableBody.appendChild(tr);
    return;
  }

  filtered.forEach((row) => {
    const tr = document.createElement("tr");
    if (status.kind === "class" && row.period === status.period) {
      tr.classList.add("current-period");
    }

    const periodCell = document.createElement("td");
    periodCell.textContent = row.period;

    const subjectCell = document.createElement("td");
    subjectCell.textContent = row.subject;

    const teacherCell = document.createElement("td");
    teacherCell.textContent = row.teacher;

    const timeCell = document.createElement("td");
    timeCell.textContent = `${row.start} - ${row.end}`;

    const actionCell = document.createElement("td");
    actionCell.className = "teacher-only";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "tiny-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => startTimetableEdit(row.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "tiny-button danger";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteTimetable(row.id));

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);

    tr.appendChild(periodCell);
    tr.appendChild(subjectCell);
    tr.appendChild(teacherCell);
    tr.appendChild(timeCell);
    tr.appendChild(actionCell);
    timetableTableBody.appendChild(tr);
  });
}

function createNoticeGroupTitle(text) {
  const li = document.createElement("li");
  li.className = "list-group-title";
  li.textContent = text;
  return li;
}

function createNoticeListItem(notice) {
  const li = document.createElement("li");
  li.className = "list-item";

  const row = document.createElement("div");
  row.className = "notice-row";

  const main = document.createElement("div");
  main.className = "notice-main";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "notice-button";
  if (notice.id === appState.selectedNoticeId) {
    button.classList.add("selected");
  }
  button.textContent = notice.title;
  button.addEventListener("click", () => showNoticeById(notice.id));

  const meta = document.createElement("p");
  meta.className = "notice-meta";
  const subjectText = notice.subject ? ` · ${notice.subject}` : "";
  meta.textContent = `${notice.className} · ${notice.date} · ${notice.teacher} · ${notice.period}${subjectText} · ${notice.priority}`;

  main.appendChild(button);
  main.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "notice-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "tiny-button";
  editButton.textContent = "수정";
  editButton.addEventListener("click", () => startNoticeEdit(notice.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "tiny-button danger";
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => deleteNotice(notice.id));

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  row.appendChild(main);
  row.appendChild(actions);

  li.appendChild(row);
  return li;
}

function createCalendarNoticeListItem(notice) {
  const li = document.createElement("li");
  li.className = "list-item";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "notice-button";
  button.textContent = `${notice.className} · ${notice.period} · ${notice.title}`;
  button.addEventListener("click", () => showNoticeById(notice.id));

  const meta = document.createElement("p");
  meta.className = "notice-meta";
  meta.textContent = `${notice.teacher} · ${notice.priority}`;

  li.appendChild(button);
  li.appendChild(meta);
  return li;
}

function toDateText(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function formatMonthLabel(year, month) {
  return `${year}년 ${String(month + 1).padStart(2, "0")}월`;
}

function moveCalendarMonth(offset) {
  const next = new Date(appState.calendarViewYear, appState.calendarViewMonth + offset, 1);
  appState.calendarViewYear = next.getFullYear();
  appState.calendarViewMonth = next.getMonth();
  renderCalendarGrid();
}

function handleSelectCalendarDate(dateText) {
  appState.selectedCalendarDate = dateText;
  const selected = new Date(`${dateText}T00:00:00`);
  appState.calendarViewYear = selected.getFullYear();
  appState.calendarViewMonth = selected.getMonth();
  appState.selectedDay = WEEKDAYS[selected.getDay() - 1] || appState.selectedDay;
  dayFilterSelect.value = appState.selectedDay;
  renderCalendarGrid();
  renderTimetable();
  renderCalendarNotices();
}

function renderCalendarGrid() {
  if (!calendarGrid || !calendarMonthLabel) return;

  calendarGrid.innerHTML = "";
  calendarMonthLabel.textContent = formatMonthLabel(appState.calendarViewYear, appState.calendarViewMonth);

  WEEKDAYS.forEach((dayName) => {
    const cell = document.createElement("div");
    cell.className = "calendar-weekday";
    cell.textContent = dayName;
    calendarGrid.appendChild(cell);
  });

  const firstDate = new Date(appState.calendarViewYear, appState.calendarViewMonth, 1);
  const lastDate = new Date(appState.calendarViewYear, appState.calendarViewMonth + 1, 0);
  const lead = (firstDate.getDay() + 6) % 7;
  const todayText = getTodayDateText();

  for (let i = 0; i < lead; i += 1) {
    const empty = document.createElement("div");
    empty.className = "calendar-empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= lastDate.getDate(); day += 1) {
    const dateText = toDateText(appState.calendarViewYear, appState.calendarViewMonth, day);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "calendar-day";
    if (dateText === appState.selectedCalendarDate) {
      btn.classList.add("selected");
    }
    if (dateText === todayText) {
      btn.classList.add("today");
    }
    btn.textContent = String(day);
    btn.addEventListener("click", () => handleSelectCalendarDate(dateText));
    calendarGrid.appendChild(btn);
  }
}

function renderCalendarNotices() {
  if (!noticeCalendarList) return;

  noticeCalendarList.innerHTML = "";
  const selectedDate = appState.selectedCalendarDate || getTodayDateText();
  appState.selectedCalendarDate = selectedDate;

  const rows = [...appState.notices]
    .filter((notice) => !appState.selectedClassName || notice.className === appState.selectedClassName)
    .filter((notice) => notice.date === selectedDate)
    .sort((a, b) => compareNoticesByRule(a, b, "priority-time"));

  if (rows.length === 0) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = "선택한 날짜의 공지가 없습니다.";
    noticeCalendarList.appendChild(li);
    return;
  }

  rows.forEach((notice) => {
    noticeCalendarList.appendChild(createCalendarNoticeListItem(notice));
  });
}

function renderClassNoticePreview() {
  if (!classNoticePreviewList) return;
  classNoticePreviewList.innerHTML = "";

  if (!appState.selectedClassName) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = "반을 선택하면 선생님 입력 공지 예시가 보입니다.";
    classNoticePreviewList.appendChild(li);
    return;
  }

  const rows = [...appState.notices]
    .filter((notice) => notice.className === appState.selectedClassName)
    .sort((a, b) => compareNoticesByRule(a, b, "time-desc"))
    .slice(0, 4);

  if (rows.length === 0) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = `${appState.selectedClassName} 공지 예시가 아직 없습니다.`;
    classNoticePreviewList.appendChild(li);
    return;
  }

  rows.forEach((notice) => {
    classNoticePreviewList.appendChild(createCalendarNoticeListItem(notice));
  });
}

function renderNotices() {
  noticeList.innerHTML = "";

  const filtered = getFilteredSortedNotices();
  const today = getTodayDateText();
  const todayNotices = filtered.filter((notice) => notice.date === today);
  const upcomingNotices = filtered.filter((notice) => notice.date > today);

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = "조건에 맞는 공지가 없습니다.";
    noticeList.appendChild(li);
    setMainNotice(null);
    appState.selectedNoticeId = null;
    renderCalendarNotices();
    renderClassNoticePreview();
    return;
  }

  if (!appState.selectedNoticeId || !appState.notices.some((notice) => notice.id === appState.selectedNoticeId)) {
    appState.selectedNoticeId = filtered[0].id;
  }

  if (todayNotices.length > 0) {
    noticeList.appendChild(createNoticeGroupTitle("오늘 공지"));
    todayNotices.forEach((notice) => {
      noticeList.appendChild(createNoticeListItem(notice));
    });
  }

  if (upcomingNotices.length > 0) {
    noticeList.appendChild(createNoticeGroupTitle("예정 공지"));
    upcomingNotices.forEach((notice) => {
      noticeList.appendChild(createNoticeListItem(notice));
    });
  }

  const restNotices = filtered.filter((notice) => notice.date < today);
  if (restNotices.length > 0) {
    noticeList.appendChild(createNoticeGroupTitle("지난 공지"));
    restNotices.forEach((notice) => {
      noticeList.appendChild(createNoticeListItem(notice));
    });
  }

  const selected = appState.notices.find((notice) => notice.id === appState.selectedNoticeId) || filtered[0];
  appState.selectedNoticeId = selected.id;
  setMainNotice(selected);
  renderCalendarNotices();
  renderClassNoticePreview();
}

function runSyncCheck() {
  const now = new Date();
  if (!appState.selectedClassName || !appState.selectedDay) {
    updateSyncStatus(now, "반을 먼저 선택해 주세요.");
    nextPeriodLabel.textContent = "다음: 확인 중";
    return;
  }
  const filtered = getFilteredTimetable();
  const status = getSessionStatus(now, filtered);

  updateSyncStatus(now, `${formatTime(now)}, ${appState.selectedClassName} ${appState.selectedDay} ${status.label}`);
  renderNextPeriodChip(filtered, status);
  maybeTriggerAutoBreakAlert(status, now);
  appState.lastSessionKind = status.kind;
  renderTimetable();
}

function runAutoAlertCheck() {
  const now = new Date();
  const filtered = getFilteredTimetable();
  const status = getSessionStatus(now, filtered);
  maybeTriggerAutoBreakAlert(status, now);
  appState.lastSessionKind = status.kind;
}

function stopNoticeRotation(showMessage = true) {
  if (appState.rotateTimerId !== null) {
    clearInterval(appState.rotateTimerId);
    appState.rotateTimerId = null;
  }
  if (showMessage) {
    showSystemMessage("자동 전환을 중지했습니다.", "info");
  }
  appState.rotationQueueIds = [];
  appState.rotationCursor = 0;
}

function rotateToNextNotice() {
  const queue = appState.rotationQueueIds.length > 0 ? appState.rotationQueueIds : appState.notices.map((notice) => notice.id);
  if (queue.length <= 1) {
    return;
  }

  const currentIndex = queue.findIndex((noticeId) => noticeId === appState.selectedNoticeId);
  const safeIndex = currentIndex >= 0 ? currentIndex : appState.rotationCursor;
  const nextIndex = (safeIndex + 1) % queue.length;
  appState.rotationCursor = nextIndex;
  showNoticeById(queue[nextIndex]);
}

function startNoticeRotation(queueIds = null, sourceLabel = "수동") {
  stopNoticeRotation(false);

  const queue = Array.isArray(queueIds) && queueIds.length > 0 ? [...queueIds] : appState.notices.map((notice) => notice.id);
  if (queue.length === 0) {
    showSystemMessage("자동 전환할 공지가 없습니다.", "warn");
    return;
  }

  appState.rotationQueueIds = queue;
  appState.rotationCursor = 0;
  showNoticeById(queue[0]);

  appState.rotateTimerId = setInterval(() => {
    rotateToNextNotice();
  }, 5000);

  const sourceText = sourceLabel === "auto-break" ? "쉬는 시간 자동 알림" : "자동 전환";
  showSystemMessage(`${sourceText}이 시작되었습니다. (5초 간격)`, "info");
}

function getPrioritizedAutoNotices(nextRow, now) {
  const today = now.toISOString().slice(0, 10);
  const subjectWord = nextRow?.subject?.trim() ?? "";

  const candidates = appState.notices
    .filter((notice) => notice.className === appState.selectedClassName)
    .filter((notice) => notice.date >= today)
    .map((notice) => {
      const subjectMatch = subjectWord && (`${notice.title} ${notice.body}`).includes(subjectWord) ? 1 : 0;
      return {
        ...notice,
        __subjectMatch: subjectMatch,
        __dateWeight: notice.date === today ? 1 : 0,
      };
    })
    .sort((a, b) => {
      return getPriorityRank(b.priority) - getPriorityRank(a.priority)
        || b.__subjectMatch - a.__subjectMatch
        || b.__dateWeight - a.__dateWeight
        || compareNoticesByRule(a, b, "time-desc");
    });

  const deduped = [];
  const seen = new Set();

  for (const notice of candidates) {
    const key = `${notice.title.toLowerCase()}|${notice.date}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(notice);
  }

  return deduped.slice(0, 5).map((notice) => notice.id);
}

function maybeTriggerAutoBreakAlert(status, now) {
  const breakStarted = status.kind === "break" && appState.lastSessionKind !== "break";
  const isNewBreak = status.breakSignature && status.breakSignature !== appState.lastBreakSignature;

  if (!breakStarted || !isNewBreak) {
    return;
  }

  appState.lastBreakSignature = status.breakSignature;
  const queueIds = getPrioritizedAutoNotices(status.nextRow, now);

  if (queueIds.length === 0) {
    showSystemMessage("쉬는 시간 알림: 표시할 공지가 없습니다.", "warn");
    return;
  }

  startNoticeRotation(queueIds, "auto-break");
}

function startManualNoticeRotation() {
  const queue = getFilteredSortedNotices().map((notice) => notice.id);
  startNoticeRotation(queue, "manual");
}

function speakCurrentNotice() {
  if (!appState.speechSupported) {
    showSystemMessage("음성 기능을 지원하지 않는 브라우저입니다.", "warn");
    return;
  }

  const current = appState.notices.find((notice) => notice.id === appState.selectedNoticeId);
  if (!current) {
    showSystemMessage("읽을 공지가 없습니다.", "warn");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(`${current.title}. ${current.body}`);
  utterance.lang = "ko-KR";

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  showSystemMessage("현재 공지를 음성으로 읽고 있습니다.", "info");
}

function validateNoticeInput(className, teacher, period, subject, timeText, body) {
  if (!className.trim()) {
    return "반/학급을 선택해 주세요.";
  }
  if (!teacher.trim()) {
    return "선생님 이름을 입력해 주세요.";
  }
  if (!period.trim()) {
    return "교시를 입력해 주세요.";
  }
  if (!subject.trim()) {
    return "과목을 입력해 주세요.";
  }
  if (!timeText.trim()) {
    return "시간을 입력해 주세요.";
  }
  if (!body.trim()) {
    return "공지 내용은 비워둘 수 없습니다.";
  }
  return null;
}

function validateTimetableInput(className, day, period, subject, teacher, start, end) {
  if (!className.trim()) {
    return "반/학급을 선택해 주세요.";
  }
  if (!WEEKDAYS.includes(day)) {
    return "요일을 다시 선택해 주세요.";
  }
  if (!period.trim() || !subject.trim()) {
    return "교시와 과목을 모두 입력해 주세요.";
  }
  if (!teacher.trim()) {
    return "선생님 이름을 입력해 주세요.";
  }
  if (!isValidTimeText(start) || !isValidTimeText(end)) {
    return "시간 형식은 HH:MM으로 입력해 주세요. 예: 09:30";
  }
  if (parseTimeToMinutes(start) >= parseTimeToMinutes(end)) {
    return "시작 시간은 종료 시간보다 빨라야 합니다.";
  }
  return null;
}

function resetTimetableForm() {
  timetableForm.reset();
  classNameInput.value = appState.selectedClassName;
  dayInput.value = appState.selectedDay;
}

function resetNoticeForm() {
  noticeForm.reset();
  noticeClassInput.value = appState.selectedClassName;
  noticePeriodInput.value = "";
  noticeSubjectInput.value = "";
  noticeTeacherInput.value = "";
  noticeTimeInput.value = "";
  noticeDateInput.value = getTodayDateText();
  noticePriorityInput.value = "안내";
  hideFieldError(noticeError);
  renderTimetableShortcuts();
}

function resetTimetableEditMode() {
  appState.editingTimetableId = null;
  timetableSubmitButton.textContent = "시간표 추가";
  cancelTimetableEditButton.classList.add("hidden");
}

function resetNoticeEditMode() {
  appState.editingNoticeId = null;
  noticeSubmitButton.textContent = "전송";
  cancelNoticeEditButton.classList.add("hidden");
}

function startTimetableEdit(timetableId) {
  const row = appState.timetable.find((item) => item.id === timetableId);
  if (!row) {
    return;
  }

  appState.editingTimetableId = timetableId;
  classNameInput.value = row.className;
  dayInput.value = row.day;
  periodInput.value = row.period;
  subjectInput.value = row.subject;
  teacherInput.value = row.teacher;
  startTimeInput.value = row.start;
  endTimeInput.value = row.end;
  timetableSubmitButton.textContent = "시간표 수정";
  cancelTimetableEditButton.classList.remove("hidden");
  showSystemMessage("시간표 수정 모드입니다.", "info");
}

function startNoticeEdit(noticeId) {
  const notice = appState.notices.find((item) => item.id === noticeId);
  if (!notice) {
    return;
  }

  appState.editingNoticeId = noticeId;
  noticeClassInput.value = notice.className;
  noticePeriodInput.value = notice.period || "";
  noticeSubjectInput.value = notice.subject || "";
  noticeTeacherInput.value = notice.teacher || "";
  noticeTimeInput.value = notice.timeText || "";
  noticeDateInput.value = notice.date || getTodayDateText();
  noticeBodyInput.value = notice.body;
  noticePriorityInput.value = notice.priority;
  noticeSubmitButton.textContent = "수정 후 전송";
  cancelNoticeEditButton.classList.remove("hidden");
  showSystemMessage("공지 수정 모드입니다.", "info");
}

function setTeacherScreen() {
  document.body.setAttribute("data-screen", "teacher");
  appState.currentScreen = "teacher";
  if (teacherNoticeEditor) {
    teacherNoticeEditor.classList.remove("hidden");
  }
  const badge = document.querySelector(".screen-badge");
  if (badge) {
    badge.textContent = "현재 화면: 선생님";
  }
}

function setStudentScreen() {
  document.body.setAttribute("data-screen", "student");
  appState.currentScreen = "student";
  if (teacherNoticeEditor) {
    teacherNoticeEditor.classList.add("hidden");
  }
  const badge = document.querySelector(".screen-badge");
  if (badge) {
    badge.textContent = "현재 화면: 학생";
  }
}

function applyScreenModeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("screen");
  if (mode === "student") {
    setStudentScreen();
    return;
  }
  setTeacherScreen();
}

function syncSelectedClassToStorage() {
  if (!appState.selectedClassName) return;
  try {
    localStorage.setItem(SELECTED_CLASS_KEY, appState.selectedClassName);
  } catch (_error) {
    // Ignore localStorage failures silently.
  }
}

function loadSelectedClassFromStorage() {
  try {
    const saved = localStorage.getItem(SELECTED_CLASS_KEY);
    if (saved && CLASS_OPTIONS.includes(saved)) {
      appState.selectedClassName = saved;
    }
  } catch (_error) {
    // Ignore localStorage failures silently.
  }
}

function saveSharedState() {
  try {
    localStorage.setItem(SHARED_TIMETABLE_KEY, JSON.stringify(appState.timetable));
    localStorage.setItem(SHARED_NOTICES_KEY, JSON.stringify(appState.notices));
    if (appState.selectedClassName) {
      localStorage.setItem(SELECTED_CLASS_KEY, appState.selectedClassName);
    }
    if (liveSyncChannel) {
      liveSyncChannel.postMessage({ type: "shared-state-updated", at: new Date().toISOString() });
    }
  } catch (_error) {
    // Ignore localStorage failures silently.
  }
}

function ingestStudentQueue() {
  try {
    const raw = localStorage.getItem(STUDENT_NOTICE_QUEUE_KEY);
    if (!raw) return;
    const queue = JSON.parse(raw);
    if (!Array.isArray(queue) || queue.length === 0) return;

    queue.forEach((item) => {
      const existed = appState.notices.find((notice) => notice.id === item.id);
      if (existed) {
        Object.assign(existed, item);
        return;
      }
      appState.notices.push({ ...item });
    });

    localStorage.setItem(STUDENT_NOTICE_QUEUE_KEY, JSON.stringify([]));
    saveSharedState();
    renderNotices();
    renderCalendarNotices();
    renderClassNoticePreview();
  } catch (_error) {
    // Ignore malformed queue data.
  }
}

function pushNoticeToStudentQueue(notice) {
  const payload = {
    id: notice.id,
    className: notice.className,
    teacher: notice.teacher,
    period: notice.period,
    date: notice.date,
    title: notice.title,
    body: notice.body,
    priority: notice.priority,
    createdAt: notice.createdAt,
    sentAt: new Date().toISOString(),
    fromScreen: "teacher",
  };

  try {
    const raw = localStorage.getItem(STUDENT_NOTICE_QUEUE_KEY);
    const queue = raw ? JSON.parse(raw) : [];
    queue.push(payload);
    localStorage.setItem(STUDENT_NOTICE_QUEUE_KEY, JSON.stringify(queue));
    return true;
  } catch (_error) {
    return false;
  }
}

function cancelTimetableEdit() {
  resetTimetableEditMode();
  resetTimetableForm();
  hideFieldError(timetableError);
  showSystemMessage("시간표 수정을 취소했습니다.", "info");
}

function cancelNoticeEdit() {
  resetNoticeEditMode();
  resetNoticeForm();
  hideFieldError(noticeError);
  showSystemMessage("공지 수정을 취소했습니다.", "info");
}

function deleteTimetable(timetableId) {
  appState.timetable = appState.timetable.filter((row) => row.id !== timetableId);
  saveSharedState();
  populateClassFilter();
  updateNoticeTeacherPeriodOptions();
  renderTimetableShortcuts();
  renderTimetable();
  runSyncCheck();
  showSystemMessage("시간표를 삭제했습니다.", "info");
}

function deleteNotice(noticeId) {
  appState.notices = appState.notices.filter((notice) => notice.id !== noticeId);
  if (appState.selectedNoticeId === noticeId) {
    appState.selectedNoticeId = appState.notices[0]?.id ?? null;
  }
  saveSharedState();
  populateNoticeClassFilter();
  renderNotices();
  renderClassNoticePreview();
  showSystemMessage("공지를 삭제했습니다.", "info");
}

function buildNoticeTitle(className, period, subject, teacher) {
  return `${className} ${period} ${subject} ${teacher} 공지`;
}

function handleNoticeSubmit(event) {
  event.preventDefault();

  const className = noticeClassInput.value.trim();
  const period = noticePeriodInput.value.trim();
  const subject = noticeSubjectInput.value.trim();
  const teacher = noticeTeacherInput.value.trim();
  const timeText = noticeTimeInput.value.trim();
  const noticeDate = noticeDateInput.value;
  const body = noticeBodyInput.value;
  const priority = noticePriorityInput.value;
  const errorMessage = validateNoticeInput(className, teacher, period, subject, timeText, body);

  if (errorMessage) {
    showFieldError(noticeError, errorMessage);
    return;
  }

  if (!noticeDate) {
    showFieldError(noticeError, "공지 날짜를 선택해 주세요.");
    return;
  }

  hideFieldError(noticeError);
  const date = noticeDate;
  const title = buildNoticeTitle(className, period, subject, teacher);

  if (appState.editingNoticeId) {
    const target = appState.notices.find((notice) => notice.id === appState.editingNoticeId);
    if (target) {
      target.className = className;
      target.teacher = teacher;
      target.period = period;
      target.subject = subject;
      target.timeText = timeText;
      target.date = date;
      target.title = title;
      target.body = body.trim();
      target.priority = priority;
      target.createdAt = new Date().toISOString();
    }
    appState.selectedNoticeId = appState.editingNoticeId;
    const sent = target ? pushNoticeToStudentQueue(target) : false;
    showSystemMessage(sent ? "공지 수정 후 학생 화면으로 전송했습니다." : "공지 수정은 완료됐지만 전송 저장에 실패했습니다.", sent ? "info" : "warn");
  } else {
    const newNotice = {
      id: `N${Date.now()}`,
      className,
      teacher,
      period,
      subject,
      timeText,
      date,
      title,
      body: body.trim(),
      priority,
      createdAt: new Date().toISOString(),
    };
    appState.notices.push(newNotice);
    appState.selectedNoticeId = newNotice.id;
    const sent = pushNoticeToStudentQueue(newNotice);
    showSystemMessage(sent ? "새 공지를 학생 화면으로 전송했습니다." : "새 공지는 등록됐지만 전송 저장에 실패했습니다.", sent ? "info" : "warn");
  }

  appState.selectedCalendarDate = date;
  const selected = new Date(`${date}T00:00:00`);
  appState.calendarViewYear = selected.getFullYear();
  appState.calendarViewMonth = selected.getMonth();
  renderCalendarGrid();

  saveSharedState();
  populateNoticeClassFilter();
  resetNoticeEditMode();
  resetNoticeForm();
  renderNotices();
  renderClassNoticePreview();
}

function handleTimetableSubmit(event) {
  event.preventDefault();

  const className = classNameInput.value.trim();
  const day = dayInput.value;
  const period = periodInput.value;
  const subject = subjectInput.value;
  const teacher = teacherInput.value;
  const start = startTimeInput.value;
  const end = endTimeInput.value;

  const errorMessage = validateTimetableInput(className, day, period, subject, teacher, start, end);
  if (errorMessage) {
    showFieldError(timetableError, errorMessage);
    return;
  }

  hideFieldError(timetableError);

  if (appState.editingTimetableId) {
    const target = appState.timetable.find((row) => row.id === appState.editingTimetableId);
    if (target) {
      target.className = className;
      target.day = day;
      target.period = period.trim();
      target.subject = subject.trim();
      target.teacher = teacher.trim();
      target.start = start;
      target.end = end;
    }
    showSystemMessage("시간표를 수정했습니다.", "info");
  } else {
    appState.timetable.push({
      id: `T${Date.now()}`,
      className,
      day,
      period: period.trim(),
      subject: subject.trim(),
      teacher: teacher.trim(),
      start,
      end,
    });
    showSystemMessage("시간표를 추가했습니다.", "info");
  }

  appState.selectedClassName = className;
  appState.selectedDay = day;
  saveSharedState();
  populateClassFilter();
  syncSelectionFlow();
  dayFilterSelect.value = appState.selectedDay;
  classNameInput.value = appState.selectedClassName;
  noticeClassInput.value = appState.selectedClassName;
  resetTimetableEditMode();
  resetTimetableForm();
  updateNoticeTeacherPeriodOptions();
  renderTimetable();
  runSyncCheck();
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function runBasicTests() {
  const results = [];

  if (appState.notices.length > 1) {
    const beforeId = appState.selectedNoticeId;
    rotateToNextNotice();
    const afterId = appState.selectedNoticeId;
    results.push(afterId !== beforeId ? "자동 전환 테스트 통과" : "자동 전환 테스트 실패");
  } else {
    results.push("자동 전환 테스트 건너뜀 (공지 2개 이상 필요)");
  }

  if (appState.notices.length > 0) {
    const clickTarget = appState.notices.length > 1 ? appState.notices[1] : appState.notices[0];
    showNoticeById(clickTarget.id);
    results.push(appState.selectedNoticeId === clickTarget.id ? "클릭 표시 테스트 통과" : "클릭 표시 테스트 실패");
  } else {
    results.push("클릭 표시 테스트 실패 (공지 없음)");
  }

  if (appState.speechSupported && appState.notices.length > 0) {
    speakCurrentNotice();
    await wait(200);
    speakCurrentNotice();
    results.push("음성 재생 테스트 통과 (중복 재생 방지 호출 완료)");
  } else {
    results.push("음성 재생 테스트 건너뜀 (브라우저 미지원 또는 공지 없음)");
  }

  const schedule = getFilteredTimetable();
  const status = getSessionStatus(new Date(), schedule);
  const ok = status.label.includes("쉬는 시간") || status.kind === "class" || status.kind === "before" || status.kind === "after";
  results.push(ok ? "현재 교시/쉬는시간 판별 통과" : "현재 교시 판별 실패");

  showSystemMessage(results.join(" | "), "info");
}

function checkSpeechSupport() {
  appState.speechSupported = Boolean(window.speechSynthesis);
}

function openGuide() {
  guideModal.classList.remove("hidden");
}

function closeGuide() {
  guideModal.classList.add("hidden");
  localStorage.setItem(GUIDE_KEY, "true");
}

function initGuide() {
  const hasSeenGuide = localStorage.getItem(GUIDE_KEY) === "true";
  if (!hasSeenGuide) {
    openGuide();
  }
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      fullscreenButton.textContent = "전체화면 종료";
      showSystemMessage("전체화면 모드로 전환했습니다.", "info");
      return;
    }

    await document.exitFullscreen();
    fullscreenButton.textContent = "전체화면";
    showSystemMessage("전체화면 모드를 종료했습니다.", "info");
  } catch (_error) {
    showSystemMessage("브라우저 정책으로 전체화면 전환에 실패했습니다.", "warn");
  }
}

function syncFullscreenButtonLabel() {
  fullscreenButton.textContent = document.fullscreenElement ? "전체화면 종료" : "전체화면";
}

function handleClassFilterChange() {
  appState.selectedClassName = classFilterSelect.value;
  if (appState.selectedClassName) {
    appState.selectedDay = appState.selectedDay || getDayName(new Date());
  }
  syncSelectedClassToStorage();
  dayFilterSelect.value = appState.selectedDay;
  classNameInput.value = appState.selectedClassName;
  noticeClassInput.value = appState.selectedClassName;
  syncSelectionFlow();
  updateNoticeTeacherPeriodOptions();
  renderTimetableShortcuts();
  renderTimetable();
  renderCalendarNotices();
  renderClassNoticePreview();
  runSyncCheck();
}

function handleDayFilterChange() {
  appState.selectedDay = dayFilterSelect.value;
  dayInput.value = appState.selectedDay;
  syncSelectionFlow();
  updateNoticeTeacherPeriodOptions();
  renderTimetableShortcuts();
  renderTimetable();
  renderClassNoticePreview();
  runSyncCheck();
}

function handleNoticeFilterChange() {
  renderNotices();
}

function handlePrevMonthClick() {
  moveCalendarMonth(-1);
}

function handleNextMonthClick() {
  moveCalendarMonth(1);
}

function handleNoticeClassChange() {
  updateNoticeTeacherPeriodOptions();
}

function handleNoticeTeacherChange() {
  hideFieldError(noticeError);
}

openGuideButton.addEventListener("click", openGuide);
closeGuideButton.addEventListener("click", closeGuide);
fullscreenButton.addEventListener("click", toggleFullscreen);
runTestsButton.addEventListener("click", runBasicTests);
noticeForm.addEventListener("submit", handleNoticeSubmit);
timetableForm.addEventListener("submit", handleTimetableSubmit);
startRotateButton.addEventListener("click", startManualNoticeRotation);
stopRotateButton.addEventListener("click", () => stopNoticeRotation(true));
speakButton.addEventListener("click", speakCurrentNotice);
classFilterSelect.addEventListener("change", handleClassFilterChange);
dayFilterSelect.addEventListener("change", handleDayFilterChange);
cancelTimetableEditButton.addEventListener("click", cancelTimetableEdit);
cancelNoticeEditButton.addEventListener("click", cancelNoticeEdit);
noticeSearchInput.addEventListener("input", handleNoticeFilterChange);
noticeClassFilterSelect.addEventListener("change", handleNoticeFilterChange);
noticeDateFilterInput.addEventListener("change", handleNoticeFilterChange);
noticePriorityFilterSelect.addEventListener("change", handleNoticeFilterChange);
noticeSortSelect.addEventListener("change", handleNoticeFilterChange);
if (calendarPrevMonth) {
  calendarPrevMonth.addEventListener("click", handlePrevMonthClick);
}
if (calendarNextMonth) {
  calendarNextMonth.addEventListener("click", handleNextMonthClick);
}
noticeClassInput.addEventListener("change", handleNoticeClassChange);
noticePeriodInput.addEventListener("input", handleNoticeTeacherChange);
noticeSubjectInput.addEventListener("input", handleNoticeTeacherChange);
noticeTeacherInput.addEventListener("input", handleNoticeTeacherChange);
noticeTimeInput.addEventListener("input", handleNoticeTeacherChange);
if (timetableExcelInput) {
  timetableExcelInput.addEventListener("change", handleTimetableExcelUpload);
}

guideModal.addEventListener("click", (event) => {
  if (event.target === guideModal) {
    closeGuide();
  }
});

document.addEventListener("fullscreenchange", syncFullscreenButtonLabel);

populateClassFilter();
populateNoticeClassFilter();
populateClassSelect(classNameInput, appState.selectedClassName);
populateClassSelect(noticeClassInput, appState.selectedClassName);
loadSelectedClassFromStorage();
applyScreenModeFromUrl();
populateClassFilter();
populateClassSelect(classNameInput, appState.selectedClassName);
populateClassSelect(noticeClassInput, appState.selectedClassName);
saveSharedState();
syncSelectionFlow();
dayFilterSelect.value = appState.selectedDay;
classNameInput.value = appState.selectedClassName;
noticeClassInput.value = appState.selectedClassName;
dayInput.value = appState.selectedDay;
resetNoticeForm();
renderTimetableShortcuts();
renderClock();
setInterval(renderClock, 1000);
renderCalendarGrid();
renderTimetable();
renderNotices();
renderCalendarNotices();
renderClassNoticePreview();
checkSpeechSupport();
runSyncCheck();
setInterval(runSyncCheck, 60000);
setInterval(runAutoAlertCheck, 10000);
setInterval(ingestStudentQueue, 3000);
window.addEventListener("storage", (event) => {
  if (event.key === STUDENT_NOTICE_QUEUE_KEY) {
    ingestStudentQueue();
  }
});
initGuide();
if (appState.timetable.length === 0) {
  showSystemMessage("시간표를 먼저 등록해 주세요.", "warn");
} else {
  hideSystemMessage();
}
/*
const guideModal = document.getElementById("guideModal");
const openGuideButton = document.getElementById("openGuideButton");
const closeGuideButton = document.getElementById("closeGuideButton");
const fullscreenButton = document.getElementById("fullscreenButton");
const runTestsButton = document.getElementById("runTestsButton");
const currentDateTime = document.getElementById("currentDateTime");
const timetableList = document.getElementById("timetableList");
const noticeList = document.getElementById("noticeList");
const mainNoticeHeading = document.getElementById("mainNoticeHeading");
const mainNoticeBody = document.getElementById("mainNoticeBody");
const noticeBadge = document.getElementById("noticeBadge");
const syncStatusText = document.getElementById("syncStatusText");
const systemMessage = document.getElementById("systemMessage");
const currentPeriodLabel = document.getElementById("currentPeriodLabel");
const classFilterSelect = document.getElementById("classFilterSelect");
const dayFilterSelect = document.getElementById("dayFilterSelect");

const noticeForm = document.getElementById("noticeForm");
const noticeClassInput = document.getElementById("noticeClassInput");
const noticeTeacherSelect = document.getElementById("noticeTeacherSelect");
const noticePeriodSelect = document.getElementById("noticePeriodSelect");
const noticeBodyInput = document.getElementById("noticeBodyInput");
const noticePriorityInput = document.getElementById("noticePriorityInput");
const noticeSubmitButton = document.getElementById("noticeSubmitButton");
const cancelNoticeEditButton = document.getElementById("cancelNoticeEditButton");
const noticeError = document.getElementById("noticeError");
const noticeSearchInput = document.getElementById("noticeSearchInput");
const noticeClassFilterSelect = document.getElementById("noticeClassFilterSelect");
const noticeDateFilterInput = document.getElementById("noticeDateFilterInput");
const noticePriorityFilterSelect = document.getElementById("noticePriorityFilterSelect");
const noticeSortSelect = document.getElementById("noticeSortSelect");

const timetableForm = document.getElementById("timetableForm");
const classNameInput = document.getElementById("classNameInput");
const dayInput = document.getElementById("dayInput");
const periodInput = document.getElementById("periodInput");
const subjectInput = document.getElementById("subjectInput");
const teacherInput = document.getElementById("teacherInput");
const startTimeInput = document.getElementById("startTimeInput");
const endTimeInput = document.getElementById("endTimeInput");
const timetableError = document.getElementById("timetableError");
const timetableSubmitButton = document.getElementById("timetableSubmitButton");
const cancelTimetableEditButton = document.getElementById("cancelTimetableEditButton");

const startRotateButton = document.getElementById("startRotateButton");
const stopRotateButton = document.getElementById("stopRotateButton");
const speakButton = document.getElementById("speakButton");

const GUIDE_KEY = "ssn_guide_seen";
const CLASS_OPTIONS = Array.from({ length: 11 }, (_, i) => `${i + 1}반`);
const WEEKDAYS = ["월", "화", "수", "목", "금"];

const sampleTimetable = [
  { id: "T001", className: "1반", day: "월", period: "1교시", subject: "국어", teacher: "김선생님", start: "09:00", end: "09:45" },
  { id: "T002", className: "1반", day: "월", period: "2교시", subject: "수학", teacher: "김선생님", start: "09:55", end: "10:40" },
  { id: "T003", className: "1반", day: "월", period: "3교시", subject: "과학", teacher: "박선생님", start: "10:50", end: "11:35" },
  { id: "T004", className: "2반", day: "월", period: "1교시", subject: "사회", teacher: "이선생님", start: "09:00", end: "09:45" },
];

const sampleNotices = [
  {
    id: "N001",
    className: "1반",
    day: "월",
    period: "2교시",
    teacher: "김선생님",
    date: "2026-06-13",
    title: "2교시 수학 안내",
    body: "수학 공책과 연필을 준비해 주세요.",
    priority: "중요",
    createdAt: "2026-06-13T08:10:00",
  },
  {
    id: "N002",
    className: "1반",
    day: "월",
    period: "3교시",
    teacher: "박선생님",
    date: "2026-06-14",
    title: "3교시 과학 안내",
    body: "과학 실험 보고서를 제출해 주세요.",
    priority: "안내",
    createdAt: "2026-06-13T08:20:00",
  },
];

const appState = {
  notices: [...sampleNotices],
  timetable: [...sampleTimetable],
  selectedClassName: "1반",
  selectedDay: getDayName(new Date()),
  selectedNoticeId: sampleNotices[0]?.id ?? null,
  editingTimetableId: null,
  editingNoticeId: null,
  lastSyncAt: null,
  speechSupported: false,
  rotateTimerId: null,
  rotationQueueIds: [],
  rotationCursor: 0,
  lastSessionKind: null,
  lastBreakSignature: null,
};

function getTodayDateText() {
  return new Date().toISOString().slice(0, 10);
}

function getDayName(now) {
  const dayIndex = now.getDay();
  const map = { 1: "월", 2: "화", 3: "수", 4: "목", 5: "금" };
  return map[dayIndex] || "월";
}

function formatDateTime(now) {
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][now.getDay()];
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} (${weekday}) ${hh}:${mi}:${ss}`;
}

function formatTime(now) {
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function showSystemMessage(message, type = "info") {
  systemMessage.textContent = message;
  systemMessage.classList.remove("hidden", "info", "warn", "error");
  systemMessage.classList.add(type);
}

function hideSystemMessage() {
  systemMessage.classList.add("hidden");
  systemMessage.classList.remove("info", "warn", "error");
}

function showFieldError(target, message) {
  target.textContent = message;
  target.classList.remove("hidden");
}

function hideFieldError(target) {
  target.classList.add("hidden");
}

function parseTimeToMinutes(timeText) {
  const [hh, mm] = timeText.split(":").map(Number);
  return hh * 60 + mm;
}

function isValidTimeText(timeText) {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(timeText);
}

function compareTimeRows(a, b) {
  return parseTimeToMinutes(a.start) - parseTimeToMinutes(b.start);
}

function getPriorityRank(priority) {
  return priority === "중요" ? 2 : 1;
}

function compareNoticesByRule(a, b, rule) {
  const aDateTime = new Date(a.createdAt).getTime();
  const bDateTime = new Date(b.createdAt).getTime();
  const aDate = new Date(`${a.date}T00:00:00`).getTime();
  const bDate = new Date(`${b.date}T00:00:00`).getTime();

  if (rule === "time-asc") {
    return aDate - bDate || aDateTime - bDateTime;
  }
  if (rule === "time-desc") {
    return bDate - aDate || bDateTime - aDateTime;
  }

  return getPriorityRank(b.priority) - getPriorityRank(a.priority) || bDate - aDate || bDateTime - aDateTime;
}

function getFilteredTimetable() {
  return appState.timetable
    .filter((row) => row.className === appState.selectedClassName && row.day === appState.selectedDay)
    .sort(compareTimeRows);
}

function getSessionStatus(now, schedule) {
  if (schedule.length === 0) {
    return { kind: "none", label: "시간표 없음", period: null, breakSignature: null, nextRow: null };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const sorted = [...schedule].sort(compareTimeRows);

  for (let i = 0; i < sorted.length; i += 1) {
    const current = sorted[i];
    const start = parseTimeToMinutes(current.start);
    const end = parseTimeToMinutes(current.end);

    if (currentMinutes >= start && currentMinutes <= end) {
      return { kind: "class", label: `${current.period} (${current.subject})`, period: current.period, breakSignature: null, nextRow: null };
    }

    if (i < sorted.length - 1) {
      const next = sorted[i + 1];
      const nextStart = parseTimeToMinutes(next.start);
      if (currentMinutes > end && currentMinutes < nextStart) {
        const dayStamp = now.toISOString().slice(0, 10);
        const signature = `${appState.selectedClassName}-${appState.selectedDay}-${current.period}-${next.period}-${dayStamp}`;
        return { kind: "break", label: `쉬는 시간 (${current.period} 후)`, period: null, breakSignature: signature, nextRow: next };
      }
    }
  }

  const firstStart = parseTimeToMinutes(sorted[0].start);
  const lastEnd = parseTimeToMinutes(sorted[sorted.length - 1].end);

  if (currentMinutes < firstStart) {
    return { kind: "before", label: "수업 전", period: null, breakSignature: null, nextRow: sorted[0] };
  }

  if (currentMinutes > lastEnd) {
    return { kind: "after", label: "수업 후", period: null, breakSignature: null, nextRow: null };
  }

  return { kind: "none", label: "확인 중", period: null, breakSignature: null, nextRow: null };
}

function renderClock() {
  currentDateTime.textContent = formatDateTime(new Date());
}

function populateClassOptions(selectEl, selectedValue) {
  selectEl.innerHTML = "";
  CLASS_OPTIONS.forEach((className) => {
    const option = document.createElement("option");
    option.value = className;
    option.textContent = className;
    selectEl.appendChild(option);
  });
  selectEl.value = CLASS_OPTIONS.includes(selectedValue) ? selectedValue : CLASS_OPTIONS[0];
}

function getTeachersForNotice() {
  const teachers = Array.from(new Set(
    appState.timetable
      .filter((row) => row.className === noticeClassInput.value && row.day === appState.selectedDay)
      .map((row) => row.teacher)
  ));

  if (teachers.length === 0) {
    return ["선택 가능한 선생님 없음"];
  }
  return teachers;
}

function getPeriodsForNotice() {
  const periods = appState.timetable
    .filter((row) => row.className === noticeClassInput.value)
    .filter((row) => row.day === appState.selectedDay)
    .filter((row) => row.teacher === noticeTeacherSelect.value)
    .sort(compareTimeRows)
    .map((row) => row.period);

  if (periods.length === 0) {
    return ["선택 가능한 교시 없음"];
  }
  return periods;
}

function populateNoticeClassFilter() {
  noticeClassFilterSelect.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "전체";
  noticeClassFilterSelect.appendChild(allOption);

  CLASS_OPTIONS.forEach((className) => {
    const option = document.createElement("option");
    option.value = className;
    option.textContent = className;
    noticeClassFilterSelect.appendChild(option);
  });
}

function refreshNoticeTeacherOptions() {
  const teachers = getTeachersForNotice();
  const prev = noticeTeacherSelect.value;
  noticeTeacherSelect.innerHTML = "";
  teachers.forEach((teacher) => {
    const option = document.createElement("option");
    option.value = teacher;
    option.textContent = teacher;
    noticeTeacherSelect.appendChild(option);
  });
  noticeTeacherSelect.value = teachers.includes(prev) ? prev : teachers[0];
}

function refreshNoticePeriodOptions() {
  const periods = getPeriodsForNotice();
  const prev = noticePeriodSelect.value;
  noticePeriodSelect.innerHTML = "";
  periods.forEach((period) => {
    const option = document.createElement("option");
    option.value = period;
    option.textContent = period;
    noticePeriodSelect.appendChild(option);
  });
  noticePeriodSelect.value = periods.includes(prev) ? prev : periods[0];
}

function refreshNoticeSelectorOptions() {
  refreshNoticeTeacherOptions();
  refreshNoticePeriodOptions();
}

function getFilteredSortedNotices() {
  const keyword = noticeSearchInput.value.trim().toLowerCase();
  const classFilter = noticeClassFilterSelect.value || "all";
  const dateFilter = noticeDateFilterInput.value;
  const priorityFilter = noticePriorityFilterSelect.value || "all";
  const sortRule = noticeSortSelect.value || "priority-time";

  return [...appState.notices]
    .filter((notice) => {
      const byKeyword = !keyword || notice.title.toLowerCase().includes(keyword) || notice.body.toLowerCase().includes(keyword);
      const byClass = classFilter === "all" || notice.className === classFilter;
      const byDate = !dateFilter || notice.date === dateFilter;
      const byPriority = priorityFilter === "all" || notice.priority === priorityFilter;
      return byKeyword && byClass && byDate && byPriority;
    })
    .sort((a, b) => compareNoticesByRule(a, b, sortRule));
}

function setMainNotice(notice) {
  if (!notice) {
    mainNoticeHeading.textContent = "오늘 등록된 공지가 없습니다.";
    mainNoticeBody.textContent = "공지 작성 화면에서 새 공지를 등록해 주세요.";
    noticeBadge.textContent = "안내";
    return;
  }

  mainNoticeHeading.textContent = notice.title;
  mainNoticeBody.textContent = notice.body;
  noticeBadge.textContent = `${notice.priority} · ${notice.className} · ${notice.day} ${notice.period}`;
}

function showNoticeById(noticeId) {
  const target = appState.notices.find((notice) => notice.id === noticeId);
  if (!target) {
    return;
  }

  appState.selectedNoticeId = target.id;
  setMainNotice(target);
  renderNotices();
}

function renderPeriodChip(status) {
  currentPeriodLabel.textContent = `현재: ${status.label}`;
}

function renderTimetable() {
  timetableList.innerHTML = "";
  const filtered = getFilteredTimetable();
  const status = getSessionStatus(new Date(), filtered);
  renderPeriodChip(status);

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = `${appState.selectedClassName} ${appState.selectedDay}요일 시간표가 없습니다.`;
    timetableList.appendChild(li);
    return;
  }

  filtered.forEach((row) => {
    const li = document.createElement("li");
    li.className = "list-item";
    if (status.kind === "class" && row.period === status.period) {
      li.classList.add("current-period");
    }

    const rowWrap = document.createElement("div");
    rowWrap.className = "timetable-row";

    const meta = document.createElement("div");
    meta.className = "timetable-meta";
    const head = document.createElement("strong");
    head.textContent = `${row.period} ${row.subject}`;
    const tail = document.createElement("span");
    tail.textContent = `${row.className} ${row.day} ${row.teacher} (${row.start} - ${row.end})`;
    meta.appendChild(head);
    meta.appendChild(tail);

    const actions = document.createElement("div");
    actions.className = "timetable-actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "tiny-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => startTimetableEdit(row.id));

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "tiny-button danger";
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", () => deleteTimetable(row.id));

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    rowWrap.appendChild(meta);
    rowWrap.appendChild(actions);

    li.appendChild(rowWrap);
    timetableList.appendChild(li);
  });
}

function createNoticeGroupTitle(text) {
  const li = document.createElement("li");
  li.className = "list-group-title";
  li.textContent = text;
  return li;
}

function createNoticeListItem(notice) {
  const li = document.createElement("li");
  li.className = "list-item";

  const row = document.createElement("div");
  row.className = "notice-row";

  const main = document.createElement("div");
  main.className = "notice-main";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "notice-button";
  if (notice.id === appState.selectedNoticeId) {
    button.classList.add("selected");
  }
  button.textContent = notice.title;
  button.addEventListener("click", () => showNoticeById(notice.id));

  const meta = document.createElement("p");
  meta.className = "notice-meta";
  meta.textContent = `${notice.className} · ${notice.date} · ${notice.day} ${notice.period} · ${notice.teacher} · ${notice.priority}`;

  main.appendChild(button);
  main.appendChild(meta);

  const actions = document.createElement("div");
  actions.className = "notice-actions";

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "tiny-button";
  editButton.textContent = "수정";
  editButton.addEventListener("click", () => startNoticeEdit(notice.id));

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "tiny-button danger";
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", () => deleteNotice(notice.id));

  actions.appendChild(editButton);
  actions.appendChild(deleteButton);

  row.appendChild(main);
  row.appendChild(actions);
  li.appendChild(row);
  return li;
}

function renderNotices() {
  noticeList.innerHTML = "";
  const filtered = getFilteredSortedNotices();
  const today = getTodayDateText();

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.className = "list-item";
    li.textContent = "조건에 맞는 공지가 없습니다.";
    noticeList.appendChild(li);
    setMainNotice(null);
    appState.selectedNoticeId = null;
    return;
  }

  if (!appState.selectedNoticeId || !appState.notices.some((notice) => notice.id === appState.selectedNoticeId)) {
    appState.selectedNoticeId = filtered[0].id;
  }

  const todayNotices = filtered.filter((notice) => notice.date === today);
  const upcomingNotices = filtered.filter((notice) => notice.date > today);
  const pastNotices = filtered.filter((notice) => notice.date < today);

  if (todayNotices.length) {
    noticeList.appendChild(createNoticeGroupTitle("오늘 공지"));
    todayNotices.forEach((notice) => noticeList.appendChild(createNoticeListItem(notice)));
  }
  if (upcomingNotices.length) {
    noticeList.appendChild(createNoticeGroupTitle("예정 공지"));
    upcomingNotices.forEach((notice) => noticeList.appendChild(createNoticeListItem(notice)));
  }
  if (pastNotices.length) {
    noticeList.appendChild(createNoticeGroupTitle("지난 공지"));
    pastNotices.forEach((notice) => noticeList.appendChild(createNoticeListItem(notice)));
  }

  const selected = appState.notices.find((notice) => notice.id === appState.selectedNoticeId) || filtered[0];
  appState.selectedNoticeId = selected.id;
  setMainNotice(selected);
}

function updateSyncStatus(now, detail) {
  appState.lastSyncAt = now;
  syncStatusText.textContent = `동기화 상태: 정상 (${detail})`;
}

function getPrioritizedAutoNotices(nextRow, now) {
  const today = now.toISOString().slice(0, 10);

  const candidates = appState.notices
    .filter((notice) => notice.className === appState.selectedClassName)
    .filter((notice) => notice.day === appState.selectedDay)
    .filter((notice) => notice.date >= today)
    .map((notice) => ({
      ...notice,
      periodMatch: nextRow && notice.period === nextRow.period ? 1 : 0,
    }))
    .sort((a, b) => getPriorityRank(b.priority) - getPriorityRank(a.priority)
      || b.periodMatch - a.periodMatch
      || compareNoticesByRule(a, b, "time-desc"));

  // 같은 시간 충돌 규칙: 같은 반/요일/교시는 중요도 높은 공지 1개만 남깁니다.
  const deduped = [];
  const seenSlot = new Set();

  for (const notice of candidates) {
    const slot = `${notice.className}|${notice.day}|${notice.period}`;
    if (seenSlot.has(slot)) {
      continue;
    }
    seenSlot.add(slot);
    deduped.push(notice);
  }

  return deduped.slice(0, 5).map((notice) => notice.id);
}

function maybeTriggerAutoBreakAlert(status, now) {
  const breakStarted = status.kind === "break" && appState.lastSessionKind !== "break";
  const isNewBreak = status.breakSignature && status.breakSignature !== appState.lastBreakSignature;

  if (!breakStarted || !isNewBreak) {
    return;
  }

  appState.lastBreakSignature = status.breakSignature;
  const queueIds = getPrioritizedAutoNotices(status.nextRow, now);

  if (queueIds.length === 0) {
    showSystemMessage("쉬는 시간 알림: 표시할 공지가 없습니다.", "warn");
    return;
  }

  startNoticeRotation(queueIds, "auto-break");
}

function runSyncCheck() {
  const now = new Date();
  const schedule = getFilteredTimetable();
  const status = getSessionStatus(now, schedule);

  updateSyncStatus(now, `${formatTime(now)}, ${appState.selectedClassName} ${appState.selectedDay} ${status.label}`);
  maybeTriggerAutoBreakAlert(status, now);
  appState.lastSessionKind = status.kind;
  renderTimetable();
}

function runAutoAlertCheck() {
  const now = new Date();
  const schedule = getFilteredTimetable();
  const status = getSessionStatus(now, schedule);
  maybeTriggerAutoBreakAlert(status, now);
  appState.lastSessionKind = status.kind;
}

function stopNoticeRotation(showMessage = true) {
  if (appState.rotateTimerId !== null) {
    clearInterval(appState.rotateTimerId);
    appState.rotateTimerId = null;
  }
  appState.rotationQueueIds = [];
  appState.rotationCursor = 0;
  if (showMessage) {
    showSystemMessage("자동 전환을 중지했습니다.", "info");
  }
}

function rotateToNextNotice() {
  const queue = appState.rotationQueueIds.length > 0 ? appState.rotationQueueIds : appState.notices.map((notice) => notice.id);
  if (queue.length <= 1) {
    return;
  }

  const currentIndex = queue.findIndex((noticeId) => noticeId === appState.selectedNoticeId);
  const safeIndex = currentIndex >= 0 ? currentIndex : appState.rotationCursor;
  const nextIndex = (safeIndex + 1) % queue.length;
  appState.rotationCursor = nextIndex;
  showNoticeById(queue[nextIndex]);
}

function startNoticeRotation(queueIds = null, sourceLabel = "manual") {
  stopNoticeRotation(false);

  const queue = Array.isArray(queueIds) && queueIds.length > 0 ? [...queueIds] : getFilteredSortedNotices().map((notice) => notice.id);
  if (queue.length === 0) {
    showSystemMessage("자동 전환할 공지가 없습니다.", "warn");
    return;
  }

  appState.rotationQueueIds = queue;
  appState.rotationCursor = 0;
  showNoticeById(queue[0]);

  appState.rotateTimerId = setInterval(() => {
    rotateToNextNotice();
  }, 5000);

  const label = sourceLabel === "auto-break" ? "쉬는 시간 자동 알림" : "자동 전환";
  showSystemMessage(`${label}이 시작되었습니다. (5초 간격)`, "info");
}

function speakCurrentNotice() {
  if (!appState.speechSupported) {
    showSystemMessage("음성 기능을 지원하지 않는 브라우저입니다.", "warn");
    return;
  }

  const current = appState.notices.find((notice) => notice.id === appState.selectedNoticeId);
  if (!current) {
    showSystemMessage("읽을 공지가 없습니다.", "warn");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(`${current.title}. ${current.body}`);
  utterance.lang = "ko-KR";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function validateNoticeInput(className, teacher, period, body) {
  if (!CLASS_OPTIONS.includes(className)) {
    return "반을 선택해 주세요.";
  }
  if (!teacher || teacher.includes("없음")) {
    return "선생님을 먼저 선택해 주세요.";
  }
  if (!period || period.includes("없음")) {
    return "교시를 먼저 선택해 주세요.";
  }
  if (!body.trim()) {
    return "공지 내용을 입력해 주세요.";
  }
  return null;
}

function validateTimetableInput(className, day, period, subject, teacher, start, end) {
  if (!CLASS_OPTIONS.includes(className)) {
    return "반을 선택해 주세요.";
  }
  if (!WEEKDAYS.includes(day)) {
    return "요일을 선택해 주세요.";
  }
  if (!period.trim() || !subject.trim() || !teacher.trim()) {
    return "교시, 과목, 선생님을 모두 입력해 주세요.";
  }
  if (!isValidTimeText(start) || !isValidTimeText(end)) {
    return "시간 형식은 HH:MM 입니다. 예: 09:30";
  }
  if (parseTimeToMinutes(start) >= parseTimeToMinutes(end)) {
    return "시작 시간은 종료 시간보다 빨라야 합니다.";
  }
  return null;
}

function resetTimetableForm() {
  timetableForm.reset();
  classNameInput.value = appState.selectedClassName;
  dayInput.value = appState.selectedDay;
}

function resetNoticeForm() {
  noticeForm.reset();
  noticeClassInput.value = appState.selectedClassName;
  noticePriorityInput.value = "안내";
  refreshNoticeSelectorOptions();
}

function resetTimetableEditMode() {
  appState.editingTimetableId = null;
  timetableSubmitButton.textContent = "시간표 추가";
  cancelTimetableEditButton.classList.add("hidden");
}

function resetNoticeEditMode() {
  appState.editingNoticeId = null;
  noticeSubmitButton.textContent = "공지 추가";
  cancelNoticeEditButton.classList.add("hidden");
}

function startTimetableEdit(timetableId) {
  const row = appState.timetable.find((item) => item.id === timetableId);
  if (!row) {
    return;
  }

  appState.editingTimetableId = timetableId;
  classNameInput.value = row.className;
  dayInput.value = row.day;
  periodInput.value = row.period;
  subjectInput.value = row.subject;
  teacherInput.value = row.teacher;
  startTimeInput.value = row.start;
  endTimeInput.value = row.end;
  timetableSubmitButton.textContent = "시간표 수정";
  cancelTimetableEditButton.classList.remove("hidden");
}

function startNoticeEdit(noticeId) {
  const notice = appState.notices.find((item) => item.id === noticeId);
  if (!notice) {
    return;
  }

  appState.editingNoticeId = noticeId;
  noticeClassInput.value = notice.className;
  refreshNoticeSelectorOptions();
  noticeTeacherSelect.value = notice.teacher;
  refreshNoticePeriodOptions();
  noticePeriodSelect.value = notice.period;
  noticeBodyInput.value = notice.body;
  noticePriorityInput.value = notice.priority;
  noticeSubmitButton.textContent = "공지 수정";
  cancelNoticeEditButton.classList.remove("hidden");
}

function cancelTimetableEdit() {
  resetTimetableEditMode();
  resetTimetableForm();
  hideFieldError(timetableError);
}

function cancelNoticeEdit() {
  resetNoticeEditMode();
  resetNoticeForm();
  hideFieldError(noticeError);
}

function deleteTimetable(timetableId) {
  appState.timetable = appState.timetable.filter((row) => row.id !== timetableId);
  refreshNoticeSelectorOptions();
  renderTimetable();
  runSyncCheck();
}

function deleteNotice(noticeId) {
  appState.notices = appState.notices.filter((notice) => notice.id !== noticeId);
  if (appState.selectedNoticeId === noticeId) {
    appState.selectedNoticeId = appState.notices[0]?.id ?? null;
  }
  renderNotices();
}

function buildNoticeTitle(className, day, period, teacher) {
  const row = appState.timetable.find((item) => item.className === className && item.day === day && item.period === period && item.teacher === teacher);
  const subjectText = row ? row.subject : "수업";
  return `${period} ${subjectText} 안내`;
}

function handleNoticeSubmit(event) {
  event.preventDefault();

  const className = noticeClassInput.value;
  const teacher = noticeTeacherSelect.value;
  const period = noticePeriodSelect.value;
  const body = noticeBodyInput.value;
  const priority = noticePriorityInput.value;
  const errorMessage = validateNoticeInput(className, teacher, period, body);

  if (errorMessage) {
    showFieldError(noticeError, errorMessage);
    return;
  }

  hideFieldError(noticeError);

  const noticePayload = {
    className,
    day: appState.selectedDay,
    period,
    teacher,
    date: getTodayDateText(),
    title: buildNoticeTitle(className, appState.selectedDay, period, teacher),
    body: body.trim(),
    priority,
  };

  if (appState.editingNoticeId) {
    const target = appState.notices.find((notice) => notice.id === appState.editingNoticeId);
    if (target) {
      Object.assign(target, noticePayload);
    }
    appState.selectedNoticeId = appState.editingNoticeId;
    showSystemMessage("공지를 수정했습니다.", "info");
  } else {
    const newNotice = {
      id: `N${Date.now()}`,
      ...noticePayload,
      createdAt: new Date().toISOString(),
    };
    appState.notices.push(newNotice);
    appState.selectedNoticeId = newNotice.id;
    showSystemMessage("새 공지를 등록했습니다.", "info");
  }

  resetNoticeEditMode();
  resetNoticeForm();
  renderNotices();
}

function handleTimetableSubmit(event) {
  event.preventDefault();

  const className = classNameInput.value;
  const day = dayInput.value;
  const period = periodInput.value;
  const subject = subjectInput.value;
  const teacher = teacherInput.value;
  const start = startTimeInput.value;
  const end = endTimeInput.value;

  const errorMessage = validateTimetableInput(className, day, period, subject, teacher, start, end);
  if (errorMessage) {
    showFieldError(timetableError, errorMessage);
    return;
  }

  hideFieldError(timetableError);

  if (appState.editingTimetableId) {
    const target = appState.timetable.find((row) => row.id === appState.editingTimetableId);
    if (target) {
      target.className = className;
      target.day = day;
      target.period = period.trim();
      target.subject = subject.trim();
      target.teacher = teacher.trim();
      target.start = start;
      target.end = end;
    }
  } else {
    appState.timetable.push({
      id: `T${Date.now()}`,
      className,
      day,
      period: period.trim(),
      subject: subject.trim(),
      teacher: teacher.trim(),
      start,
      end,
    });
  }

  appState.selectedClassName = className;
  appState.selectedDay = day;
  classFilterSelect.value = className;
  dayFilterSelect.value = day;
  resetTimetableEditMode();
  resetTimetableForm();
  refreshNoticeSelectorOptions();
  renderTimetable();
  runSyncCheck();
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function runBasicTests() {
  const results = [];

  if (appState.notices.length > 1) {
    const before = appState.selectedNoticeId;
    rotateToNextNotice();
    results.push(before !== appState.selectedNoticeId ? "자동 전환 테스트 통과" : "자동 전환 테스트 실패");
  } else {
    results.push("자동 전환 테스트 건너뜀 (공지 2개 이상 필요)");
  }

  if (appState.notices.length > 0) {
    const target = appState.notices[Math.min(1, appState.notices.length - 1)];
    showNoticeById(target.id);
    results.push(appState.selectedNoticeId === target.id ? "클릭 표시 테스트 통과" : "클릭 표시 테스트 실패");
  }

  if (appState.speechSupported && appState.notices.length > 0) {
    speakCurrentNotice();
    await wait(200);
    speakCurrentNotice();
    results.push("음성 재생 테스트 통과");
  } else {
    results.push("음성 재생 테스트 건너뜀");
  }

  showSystemMessage(results.join(" | "), "info");
}

function checkSpeechSupport() {
  appState.speechSupported = Boolean(window.speechSynthesis);
}

function openGuide() {
  guideModal.classList.remove("hidden");
}

function closeGuide() {
  guideModal.classList.add("hidden");
  localStorage.setItem(GUIDE_KEY, "true");
}

function initGuide() {
  const hasSeenGuide = localStorage.getItem(GUIDE_KEY) === "true";
  if (!hasSeenGuide) {
    openGuide();
  }
}

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      fullscreenButton.textContent = "전체화면 종료";
      return;
    }
    await document.exitFullscreen();
    fullscreenButton.textContent = "전체화면";
  } catch (_error) {
    showSystemMessage("브라우저 정책으로 전체화면 전환에 실패했습니다.", "warn");
  }
}

function syncFullscreenButtonLabel() {
  fullscreenButton.textContent = document.fullscreenElement ? "전체화면 종료" : "전체화면";
}

function handleClassFilterChange() {
  appState.selectedClassName = classFilterSelect.value;
  classNameInput.value = appState.selectedClassName;
  noticeClassInput.value = appState.selectedClassName;
  refreshNoticeSelectorOptions();
  renderTimetable();
  runSyncCheck();
}

function handleDayFilterChange() {
  appState.selectedDay = dayFilterSelect.value;
  dayInput.value = appState.selectedDay;
  refreshNoticeSelectorOptions();
  renderTimetable();
  runSyncCheck();
}

function handleNoticeFilterChange() {
  renderNotices();
}

function runSyncAndAutoAlert() {
  runSyncCheck();
}

function runAutoAlertCheck() {
  const now = new Date();
  const schedule = getFilteredTimetable();
  const status = getSessionStatus(now, schedule);
  maybeTriggerAutoBreakAlert(status, now);
  appState.lastSessionKind = status.kind;
}

openGuideButton.addEventListener("click", openGuide);
closeGuideButton.addEventListener("click", closeGuide);
fullscreenButton.addEventListener("click", toggleFullscreen);
runTestsButton.addEventListener("click", runBasicTests);
noticeForm.addEventListener("submit", handleNoticeSubmit);
timetableForm.addEventListener("submit", handleTimetableSubmit);
startRotateButton.addEventListener("click", () => startNoticeRotation(null, "manual"));
stopRotateButton.addEventListener("click", () => stopNoticeRotation(true));
speakButton.addEventListener("click", speakCurrentNotice);
classFilterSelect.addEventListener("change", handleClassFilterChange);
dayFilterSelect.addEventListener("change", handleDayFilterChange);
cancelTimetableEditButton.addEventListener("click", cancelTimetableEdit);
cancelNoticeEditButton.addEventListener("click", cancelNoticeEdit);
noticeSearchInput.addEventListener("input", handleNoticeFilterChange);
noticeClassFilterSelect.addEventListener("change", handleNoticeFilterChange);
noticeDateFilterInput.addEventListener("change", handleNoticeFilterChange);
noticePriorityFilterSelect.addEventListener("change", handleNoticeFilterChange);
noticeSortSelect.addEventListener("change", handleNoticeFilterChange);
noticeClassInput.addEventListener("change", () => {
  refreshNoticeSelectorOptions();
});
noticeTeacherSelect.addEventListener("change", refreshNoticePeriodOptions);

guideModal.addEventListener("click", (event) => {
  if (event.target === guideModal) {
    closeGuide();
  }
});

document.addEventListener("fullscreenchange", syncFullscreenButtonLabel);

populateClassOptions(classFilterSelect, appState.selectedClassName);
populateClassOptions(classNameInput, appState.selectedClassName);
populateClassOptions(noticeClassInput, appState.selectedClassName);
populateNoticeClassFilter();

dayFilterSelect.value = appState.selectedDay;
dayInput.value = appState.selectedDay;
refreshNoticeSelectorOptions();

renderClock();
setInterval(renderClock, 1000);
renderTimetable();
renderNotices();
checkSpeechSupport();
runSyncAndAutoAlert();
setInterval(runSyncAndAutoAlert, 60000);
setInterval(runAutoAlertCheck, 10000);
initGuide();
if (appState.timetable.length === 0) {
  showSystemMessage("시간표를 먼저 등록해 주세요.", "warn");
} else {
  hideSystemMessage();
}
*/
