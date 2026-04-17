import type { Locale } from '@/constants/site';

export const CALENDAR_TRANSLATIONS: Record<
  Locale,
  {
    title: string;
    description: string;
    noteBio: string;
    noteAge: string;
    ageLabel: (age: number) => string;
    months: string[];
    monthsShort: string[];
    entryCount: (count: number) => string;
    backToCalendar: string;
    dayDetailIntro: string;
    sampleNotice: string;
    noEntries: string;
    viewOriginal: string;
    timeLabel: string;
    dayLabel: (y: number, m: number, d: number) => string;
  }
> = {
  ja: {
    title: 'カレンダー',
    description:
      '『渋沢栄一伝記資料』別巻第1, 第2の日付と時間情報を活用し、カレンダー形式で可視化しています。',
    noteBio:
      '『渋沢栄一伝記資料』別巻第1, 第2の日付と時間情報を活用し、カレンダー形式で可視化しています。',
    noteAge: '年齢は当該年の誕生日における渋沢栄一の満年齢を示します。',
    ageLabel: (age: number) => `〔${age}歳〕`,
    months: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    monthsShort: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    entryCount: (count: number) => `${count}件`,
    backToCalendar: 'カレンダーに戻る',
    dayDetailIntro:
      '『渋沢栄一伝記資料』別巻第1, 第2より、該当日の日記および集会日時通知表を表示します。',
    sampleNotice:
      '※ 現在、サンプルデータのみを表示しています（移行作業中）。',
    noEntries: 'この日のデータはまだ準備中です。',
    viewOriginal: '原文を見る',
    timeLabel: '時刻',
    dayLabel: (y: number, m: number, d: number) => `${y}年${m}月${d}日`,
  },
  en: {
    title: 'Calendar',
    description:
      'Browse diary entries from the Shibusawa Eiichi Denki Shiryo (supplementary volumes 1 & 2) by date.',
    noteBio:
      'Diary entries from the Shibusawa Eiichi Denki Shiryo (supplementary volumes 1 & 2) are visualized on a yearly calendar.',
    noteAge:
      'Age refers to Shibusawa Eiichi\u2019s age on his birthday within that year.',
    ageLabel: (age: number) => `[age ${age}]`,
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    monthsShort: [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    entryCount: (count: number) => (count === 1 ? '1 entry' : `${count} entries`),
    backToCalendar: 'Back to calendar',
    dayDetailIntro:
      'Diary and meeting-schedule entries for this day, drawn from the Shibusawa Eiichi Denki Shiryo supplementary volumes 1 & 2.',
    sampleNotice:
      'Note: only a sample of days is included in this preview build.',
    noEntries: 'No data is available for this day yet.',
    viewOriginal: 'View source',
    timeLabel: 'Time',
    dayLabel: (y: number, m: number, d: number) =>
      `${['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'][m - 1]} ${d}, ${y}`,
  },
};
