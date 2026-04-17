import type { Locale } from '@/constants/site';

export const NETWORK_TRANSLATIONS: Record<Locale, Record<string, string>> = {
  ja: {
    title: '人物ネットワーク',
    description: '日記に登場する人物同士の関係性を可視化したネットワーク。',
    lead: '同一の日記に共起した人物同士のネットワークです。クリックで選択、ノード一覧から個別のネットワークを参照できます。',
    listTitle: '人物一覧',
    viewNetwork: 'このノードのネットワークを見る',
    count: '共起数',
    backToList: 'ネットワーク一覧へ',
    detailTitle: 'のネットワーク',
    detailLead: 'このノードを中心とする共起ネットワークです。',
    relations: '関連ノード',
    loading: 'ネットワークを読み込み中…',
    limitNotice: '※静的出力のサイズ上限のため、総出現数上位50件の人物のみ個別ネットワークを公開しています。',
  },
  en: {
    title: 'Person Network',
    description: 'Visualize the relationships among people in the diaries.',
    lead: 'Each node is a person that appears in the diary; edges show their co-occurrence. Click a node to see its focused network.',
    listTitle: 'People',
    viewNetwork: 'View this node\u2019s network',
    count: 'Co-occurrences',
    backToList: 'Back to the network list',
    detailTitle: '\u2019s network',
    detailLead: 'Co-occurrence network centered on this person.',
    relations: 'Related nodes',
    loading: 'Loading network…',
    limitNotice:
      'Note: due to static-export size limits, per-node networks are exposed only for the top-50 most frequent people.',
  },
};
