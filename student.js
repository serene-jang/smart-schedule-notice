const SELECTED_CLASS_KEY = "ssn_selected_class";
const SHARED_TIMETABLE_KEY = "ssn_shared_timetable";
const SHARED_NOTICES_KEY = "ssn_shared_notices";
const STUDENT_NOTICE_QUEUE_KEY = "ssn_student_notice_queue";
const LIVE_SYNC_CHANNEL_NAME = "ssn_live_sync";
const liveSyncChannel = typeof BroadcastChannel !== "undefined"
  ? new BroadcastChannel(LIVE_SYNC_CHANNEL_NAME)
  : null;
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const LUNCH_BREAK_TIME = { start: "13:10", end: "13:55" };

const classLabel = document.getElementById("classLabel");
const dateLabel = document.getElementById("dateLabel");
const currentPeriodLabel = document.getElementById("currentPeriodLabel");
const nextPeriodLabel = document.getElementById("nextPeriodLabel");
const clockEl = document.getElementById("clock");
const noticeBadge = document.getElementById("noticeBadge");
const mainNoticeHeading = document.getElementById("mainNoticeHeading");
const mainNoticeBody = document.getElementById("mainNoticeBody");
const todayScheduleTitle = document.getElementById("todayScheduleTitle");
const scheduleBody = document.getElementById("scheduleBody");
const calendarPrevMonthButton = document.getElementById("calendarPrevMonth");
const calendarNextMonthButton = document.getElementById("calendarNextMonth");
const calendarMonthLabel = document.getElementById("calendarMonthLabel");
const calendarGrid = document.getElementById("calendarGrid");
const selectedDateTitle = document.getElementById("selectedDateTitle");
const noticeList = document.getElementById("noticeList");

const state = {
  className: "",
  timetable: [],
  notices: [],
  currentNoticeId: null,
  rotationIndex: 0,
  selectedCalendarDate: "",
  calendarViewYear: new Date().getFullYear(),
  calendarViewMonth: new Date().getMonth(),
};

const DAY_ORDER = { "월": 1, "화": 2, "수": 3, "목": 4, "금": 5, "토": 6, "일": 7 };
const CALENDAR_WEEKDAY_HEAD = ["일", "월", "화", "수", "목", "금", "토"];

const SUBJECT_STYLE_MAP = {
  "국": "subject-korean",
  "국어": "subject-korean",
  "영": "subject-english",
  "영어": "subject-english",
  "수": "subject-math",
  "수학": "subject-math",
  "사": "subject-social",
  "사회": "subject-social",
  "과": "subject-science",
  "과학": "subject-science",
  "도": "subject-ethics",
  "도덕": "subject-ethics",
  "기": "subject-tech",
  "기술": "subject-tech",
  "가정": "subject-home",
  "체": "subject-pe",
  "체육": "subject-pe",
  "스": "subject-sports",
  "스포츠": "subject-sports",
};

function parseJsonStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (_error) {
    return fallback;
  }
}

function toMinutes(text) {
  if (!text || typeof text !== "string") return null;
  const [h, m] = text.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

function getCurrentWeekday() {
  return WEEKDAYS[new Date().getDay()];
}

function getTodayDateText() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDateLabel(dateText) {
  const value = new Date(`${dateText}T00:00:00`);
  const weekday = WEEKDAYS[value.getDay()];
  return `${dateText} (${weekday})`;
}

function isToday(dateText) {
  if (!dateText) return false;
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}` === dateText;
}

function getClassTimetableForToday() {
  const weekday = getCurrentWeekday();
  return state.timetable
    .filter((row) => row.className === state.className && row.day === weekday)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
}

function getClassTimetableForDisplay() {
  return state.timetable
    .filter((row) => row.className === state.className)
    .sort((a, b) => {
      const dayDiff = (DAY_ORDER[a.day] || 99) - (DAY_ORDER[b.day] || 99);
      if (dayDiff !== 0) return dayDiff;
      return (toMinutes(a.start) || 0) - (toMinutes(b.start) || 0);
    });
}

function getSubjectStyleClass(subjectText) {
  const normalized = (subjectText || "").trim();
  if (!normalized) return "";
  const exact = SUBJECT_STYLE_MAP[normalized];
  if (exact) return exact;

  const key = Object.keys(SUBJECT_STYLE_MAP).find((token) => normalized.startsWith(token));
  return key ? SUBJECT_STYLE_MAP[key] : "";
}

function getNoticeCountByPeriodForSelectedDate() {
  const selectedDate = state.selectedCalendarDate || getTodayDateText();
  const counter = {};

  state.notices
    .filter((notice) => notice.className === state.className && notice.date === selectedDate)
    .forEach((notice) => {
      const periodKey = (notice.period || "").trim();
      if (!periodKey) return;
      counter[periodKey] = (counter[periodKey] || 0) + 1;
    });

  return counter;
}

function findSessionStatus(rows) {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  for (const row of rows) {
    const start = toMinutes(row.start);
    const end = toMinutes(row.end);
    if (start == null || end == null) continue;
    if (nowMinutes >= start && nowMinutes <= end) {
      return { current: row, next: null, breakTime: false };
    }
    if (nowMinutes < start) {
      return { current: null, next: row, breakTime: false };
    }
  }

  const lunchStart = toMinutes(LUNCH_BREAK_TIME.start);
  const lunchEnd = toMinutes(LUNCH_BREAK_TIME.end);
  if (lunchStart != null && lunchEnd != null && nowMinutes >= lunchStart && nowMinutes <= lunchEnd) {
    return { current: null, next: rows.find((row) => row.period === "6교시") || null, breakTime: true };
  }

  return { current: null, next: null, breakTime: false };
}

function renderClock() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const yyyy = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const weekday = WEEKDAYS[now.getDay()];

  clockEl.textContent = `${hh}:${mm}:${ss}`;
  dateLabel.textContent = `날짜: ${yyyy}-${month}-${day} (${weekday})`;
}

function renderTopMeta(status) {
  classLabel.textContent = `반: ${state.className || "선택 안 됨"}`;

  if (status.current) {
    currentPeriodLabel.textContent = `현재: ${status.current.period} ${status.current.subject}`;
  } else if (status.breakTime) {
    currentPeriodLabel.textContent = "현재: 쉬는 시간";
  } else {
    currentPeriodLabel.textContent = "현재: 수업 없음";
  }

  if (status.next) {
    nextPeriodLabel.textContent = `다음: ${status.next.period} ${status.next.subject}`;
  } else {
    nextPeriodLabel.textContent = "다음: 없음";
  }
}

function renderSchedule(status) {
  const rows = getClassTimetableForToday();
  const weekday = getCurrentWeekday();
  const noticeCounter = getNoticeCountByPeriodForSelectedDate();
  todayScheduleTitle.textContent = `오늘 시간표 (${weekday}요일)`;

  if (rows.length === 0) {
    scheduleBody.innerHTML = '<tr><td colspan="2">오늘 시간표가 없습니다.</td></tr>';
    return;
  }

  scheduleBody.innerHTML = rows
    .map((row) => {
      const isCurrent = status.current && status.current.id === row.id;
      const subjectClass = getSubjectStyleClass(row.subject);
      const count = noticeCounter[row.period] || 0;
      const countBadge = count > 0 ? `<span class="notice-count-badge">${count}</span>` : "";
      const subjectMarkup = `<span class="subject-wrap"><span class="subject-pill ${subjectClass}">${row.subject}</span>${countBadge}</span>`;
      return `<tr class="${isCurrent ? "current" : ""}"><td>${row.period}</td><td>${subjectMarkup}</td></tr>`;
    })
    .join("");
}

function sortNoticesByPriorityAndTime(notices) {
  return notices.sort((a, b) => {
    if ((a.priority || "") !== (b.priority || "")) {
      return a.priority === "high" ? -1 : 1;
    }
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
}

function getTodayNoticeCandidates() {
  const todayNotices = state.notices.filter((notice) => {
    return notice.className === state.className && isToday(notice.date);
  });

  return sortNoticesByPriorityAndTime(todayNotices);
}

function getSelectedDateNoticeCandidates() {
  const selectedDate = state.selectedCalendarDate || getTodayDateText();
  const matched = state.notices.filter((notice) => {
    return notice.className === state.className && notice.date === selectedDate;
  });
  return sortNoticesByPriorityAndTime(matched);
}

function renderNoticeList(candidates) {
  const selectedDate = state.selectedCalendarDate || getTodayDateText();
  selectedDateTitle.textContent = `${formatDateLabel(selectedDate)} 공지`;

  if (candidates.length === 0) {
    noticeList.innerHTML = '<li class="notice-item"><strong>공지 없음</strong><span>선택한 날짜에 등록된 공지가 없습니다.</span></li>';
    return;
  }

  noticeList.innerHTML = candidates
    .slice(0, 12)
    .map((notice) => {
      const priorityLabel = notice.priority === "high" ? "중요" : "일반";
      const selectedClass = notice.id === state.currentNoticeId ? "selected" : "";
      return `<li class="notice-item ${selectedClass}" data-notice-id="${notice.id}"><strong>[${priorityLabel}] ${notice.title}</strong><span>${notice.date} · ${notice.period} · ${notice.teacher || ""}</span></li>`;
    })
    .join("");
}

function getMonthLabel(year, month) {
  return `${year}년 ${month + 1}월`;
}

function dateTextFromParts(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function hasNoticeOnDate(dateText) {
  return state.notices.some((notice) => notice.className === state.className && notice.date === dateText);
}

function renderCalendarGrid() {
  const year = state.calendarViewYear;
  const month = state.calendarViewMonth;
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarMonthLabel.textContent = getMonthLabel(year, month);

  const headCells = CALENDAR_WEEKDAY_HEAD
    .map((dayName) => `<div class="day-head">${dayName}</div>`)
    .join("");

  const dayCells = [];
  for (let i = 0; i < startWeekday; i += 1) {
    dayCells.push('<div class="day-cell muted"></div>');
  }

  const today = getTodayDateText();
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateText = dateTextFromParts(year, month, day);
    const classes = ["day-cell"];
    if (dateText === state.selectedCalendarDate) classes.push("selected");
    if (dateText === today) classes.push("today");
    if (hasNoticeOnDate(dateText)) classes.push("has-notice");

    dayCells.push(`<button type="button" class="${classes.join(" ")}" data-date="${dateText}">${day}</button>`);
  }

  calendarGrid.innerHTML = headCells + dayCells.join("");
}

function setMainNotice(notice, status) {
  if (!notice) {
    noticeBadge.textContent = status.breakTime ? "쉬는 시간" : "안내";
    noticeBadge.classList.remove("important");
    mainNoticeHeading.textContent = status.breakTime ? "쉬는 시간입니다" : "공지 대기 중";
    mainNoticeBody.textContent = status.breakTime
      ? "다음 수업 준비를 해 주세요."
      : "선생님이 공지를 등록하면 여기에 크게 표시됩니다.";
    return;
  }

  const isImportant = notice.priority === "high";
  noticeBadge.textContent = isImportant ? "중요 공지" : "일반 공지";
  noticeBadge.classList.toggle("important", isImportant);
  mainNoticeHeading.textContent = notice.title || "공지";
  mainNoticeBody.textContent = notice.body || "";

  if (isImportant) {
    speak(notice.body || notice.title || "중요 공지가 도착했습니다.");
  }
}

function chooseNoticeToShow(status, candidates) {
  if (candidates.length === 0) return null;

  const highPriority = candidates.find((notice) => notice.priority === "high");
  if (highPriority) return highPriority;

  if (status.breakTime && status.next) {
    const nextPeriodNotice = candidates.find((notice) => notice.period === status.next.period);
    if (nextPeriodNotice) return nextPeriodNotice;
  }

  state.rotationIndex = state.rotationIndex % candidates.length;
  return candidates[state.rotationIndex];
}

function rotateNotice() {
  const rows = getClassTimetableForToday();
  const status = findSessionStatus(rows);
  const candidates = getTodayNoticeCandidates();

  if (candidates.length > 1) {
    state.rotationIndex = (state.rotationIndex + 1) % candidates.length;
  } else {
    state.rotationIndex = 0;
  }

  const chosen = chooseNoticeToShow(status, candidates);
  if (chosen) {
    state.currentNoticeId = chosen.id;
  }

  renderTopMeta(status);
  renderSchedule(status);
  renderNoticeList(candidates);
  setMainNotice(chosen, status);
}

function speak(text) {
  if (!("speechSynthesis" in window) || !text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ko-KR";
  utterance.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function pullQueueIntoNotices() {
  try {
    const raw = localStorage.getItem(STUDENT_NOTICE_QUEUE_KEY);
    if (!raw) return;
    const queue = JSON.parse(raw);
    if (!Array.isArray(queue) || queue.length === 0) return;

    for (const item of queue) {
      const existed = state.notices.find((notice) => notice.id === item.id);
      if (existed) {
        Object.assign(existed, item);
      } else {
        state.notices.push(item);
      }
    }

    localStorage.setItem(STUDENT_NOTICE_QUEUE_KEY, JSON.stringify([]));
  } catch (_error) {
    // Ignore malformed queue data.
  }
}

function pickFallbackClassName() {
  const weekday = getCurrentWeekday();
  const todayClass = state.timetable.find((row) => row.day === weekday && row.className);
  if (todayClass) return todayClass.className;

  const anyTimetableClass = state.timetable.find((row) => row.className);
  if (anyTimetableClass) return anyTimetableClass.className;

  const anyNoticeClass = state.notices.find((notice) => notice.className);
  if (anyNoticeClass) return anyNoticeClass.className;

  return "";
}

function ensureRenderableClassName() {
  const hasMatchingData = state.className
    && (state.timetable.some((row) => row.className === state.className)
      || state.notices.some((notice) => notice.className === state.className));

  if (hasMatchingData) return;
  state.className = pickFallbackClassName();
}

function ensureCalendarState() {
  const fallbackDate = getTodayDateText();
  if (!state.selectedCalendarDate) {
    state.selectedCalendarDate = fallbackDate;
  }
  const selected = new Date(`${state.selectedCalendarDate}T00:00:00`);
  if (!Number.isNaN(selected.getTime())) {
    state.calendarViewYear = selected.getFullYear();
    state.calendarViewMonth = selected.getMonth();
  }
}

function loadSharedState() {
  const className = localStorage.getItem(SELECTED_CLASS_KEY) || "";
  const timetable = parseJsonStorage(SHARED_TIMETABLE_KEY, []);
  const notices = parseJsonStorage(SHARED_NOTICES_KEY, []);

  state.className = className;
  state.timetable = Array.isArray(timetable) ? timetable : [];
  state.notices = Array.isArray(notices) ? notices : [];

  pullQueueIntoNotices();
  ensureRenderableClassName();
  ensureCalendarState();
}

function renderAll() {
  const rows = getClassTimetableForToday();
  const status = findSessionStatus(rows);
  const todayCandidates = getTodayNoticeCandidates();
  const selectedDateCandidates = getSelectedDateNoticeCandidates();
  let chosen = chooseNoticeToShow(status, todayCandidates);

  if (state.currentNoticeId) {
    const opened = state.notices.find((notice) => notice.id === state.currentNoticeId);
    if (opened) {
      chosen = opened;
    }
  }

  if (chosen) {
    state.currentNoticeId = chosen.id;
  }

  renderClock();
  renderTopMeta(status);
  renderSchedule(status);
  renderCalendarGrid();
  renderNoticeList(selectedDateCandidates);
  setMainNotice(chosen, status);
}

noticeList.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const item = target.closest("[data-notice-id]");
  if (!(item instanceof HTMLElement)) return;

  const noticeId = item.getAttribute("data-notice-id");
  if (!noticeId) return;

  const notice = state.notices.find((entry) => entry.id === noticeId);
  if (!notice) return;

  state.currentNoticeId = notice.id;
  const rows = getClassTimetableForToday();
  const status = findSessionStatus(rows);
  setMainNotice(notice, status);
  renderNoticeList(getSelectedDateNoticeCandidates());
});

calendarGrid.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  const date = target.getAttribute("data-date");
  if (!date) return;

  state.selectedCalendarDate = date;
  renderAll();
});

calendarPrevMonthButton.addEventListener("click", () => {
  const next = new Date(state.calendarViewYear, state.calendarViewMonth - 1, 1);
  state.calendarViewYear = next.getFullYear();
  state.calendarViewMonth = next.getMonth();
  renderCalendarGrid();
});

calendarNextMonthButton.addEventListener("click", () => {
  const next = new Date(state.calendarViewYear, state.calendarViewMonth + 1, 1);
  state.calendarViewYear = next.getFullYear();
  state.calendarViewMonth = next.getMonth();
  renderCalendarGrid();
});

window.addEventListener("storage", (event) => {
  if (![SELECTED_CLASS_KEY, SHARED_TIMETABLE_KEY, SHARED_NOTICES_KEY, STUDENT_NOTICE_QUEUE_KEY].includes(event.key)) {
    return;
  }
  loadSharedState();
  renderAll();
});

if (liveSyncChannel) {
  liveSyncChannel.addEventListener("message", (_event) => {
    loadSharedState();
    renderAll();
  });
}

loadSharedState();
renderAll();
setInterval(renderClock, 1000);
setInterval(() => {
  loadSharedState();
  rotateNotice();
}, 5000);
