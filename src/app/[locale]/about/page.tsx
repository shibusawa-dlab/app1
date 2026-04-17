import { routing } from '@/i18n/routing';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import PageLayout from '@/components/layout/PageLayout';
import { getPageMetadata } from '@/constants/metadata';
import { PROSE_STYLES } from '@/constants/styles';
import type { Metadata } from 'next';
import type { Locale } from '@/constants/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return getPageMetadata(locale as Locale, {
    title: t('title'),
    description: t('description'),
  });
}

const ABOUT_CONTENT: Record<Locale, string> = {
  ja: `
    <p>本サイトは、令和2（2020）年度国立歴史民俗博物館総合資料学奨励研究「TEIを用いた『渋沢栄一伝記資料』テキストデータの再構築と活用」の成果として構築／公開するものです。一部不明確な部分または間違いがある可能性があることをご理解の上ご利用ください。なお、本サイトは今後改善をおこない、サイトの内容およびデータを変更する場合があります。</p>

    <h2>「TEIを用いた『渋沢栄一伝記資料』テキストデータの再構築と活用」</h2>

    <h3>研究内容</h3>
    <p>『渋沢栄一伝記資料』（略して『伝記資料』）は、全68巻（本編58巻、別巻10冊）、約48,000ページにわたる膨大な資料集である。本資料は、日本近代史、経済史研究の基礎資料であることから、デジタル化された場合の活用の可能性については大きな期待が寄せられている。本資料のデジタル化はすでに行われており、本編1~57巻（58巻は索引のため除外）は「<a href="https://eiichi.shibusawa.or.jp/denkishiryo/digital/main/" target="_blank" rel="noopener noreferrer">デジタル版『渋沢栄一伝記資料』</a>」として2016年11月からインターネットで閲覧できるようになった。一方、別巻の10冊については編纂方針が本編とは異なり、その内容が日記や、書簡、談話、講演、遺墨、写真などの資料種別ごとにまとめられている。そのため、現在公開に向けて技術的・方法論的課題の解決にあたっているところで、公開には至っていない。</p>
    <p>そこで、本研究では、別巻10冊のテキストデータを多様な側面から活用できるよう、TEIのガイドラインを踏まえて再構築しつつ、テキストデータのあり方や、公開方法、活用方法などを考察することを目的とする。具体的な研究課題としては、次の3項目を設定する。</p>
    <ul>
      <li>近現代日本語資料に汎用性のあるTEIマークアップ手法を提案することで、日本語資料のテキストの構造化および公開に貢献することを目指す。</li>
      <li>様々な可視化および分析を用いた多角的な研究アプローチを提示することで、新たな研究の手掛かりや研究範囲の拡大に関する可能性を示す。</li>
      <li>TEIの特徴を活かしたテキストデータの構造化とモデル化、また、アーカイブズ分野におけるTEI関連研究事例の調査・分析を通じて、アーカイブズ資料への応用可能性を探る。</li>
    </ul>

    <h3>研究対象</h3>
    <p>渋沢栄一伝記資料の量は膨大であるため、本研究が行われた令和2（2020）年5月〜令和3（2021）年3月中には、別巻第1および第2の日記および集会日時通知表を研究対象とした。</p>

    <h3>研究メンバー（五十音順）</h3>
    <ul>
      <li>金 甫榮（渋沢栄一記念財団）</li>
      <li>小風 尚樹（千葉大学）</li>
      <li>中村 覚（東京大学史料編纂所）</li>
      <li>永崎 研宣（一般財団法人人文情報学研究所）</li>
      <li>橋本 雄太（国立歴史民俗博物館）</li>
    </ul>

    <h3>研究協力</h3>
    <ul>
      <li>井上 さやか（渋沢栄一記念財団）</li>
      <li>茂原 暢（渋沢栄一記念財団）</li>
    </ul>

    <h3>資料提供</h3>
    <ul>
      <li>公益財団法人渋沢栄一記念財団 情報資源センター</li>
    </ul>

    <h2>利用条件</h2>
    <p>本サイトは <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">クリエイティブ・コモンズ表示4.0国際ライセンス</a> の下に提供されています。利用の際には、適切なクレジットを表示し、変更があった場合はその旨を示さなければなりません。</p>

    <h2>お問い合わせ</h2>
    <p><a href="https://www.shibusawa.or.jp/center/" target="_blank" rel="noopener noreferrer">公益財団法人渋沢栄一記念財団 情報資源センター</a><br />
    center_info[at]shibusawa.or.jp （[at]は＠に書き換えてください）</p>
  `,
  en: `
    <p>This site was built as an output of the 2020 (Reiwa 2) research project "Restructuring and utilization of the Shibusawa Eiichi Denki Shiryo text data using TEI", supported by the National Museum of Japanese History. Please be aware that some parts may contain inaccuracies or be subject to future revision.</p>

    <h2>Project Overview</h2>
    <h3>Background</h3>
    <p>The Shibusawa Eiichi Denki Shiryo is a vast collection of 68 volumes (58 main + 10 supplementary) totalling approximately 48,000 pages. Volumes 1–57 of the main series have been available online since November 2016 as the <a href="https://eiichi.shibusawa.or.jp/denkishiryo/digital/main/" target="_blank" rel="noopener noreferrer">Digital edition</a>. The supplementary volumes, however, follow a different editorial policy and are still undergoing work toward public release.</p>
    <p>This project restructures the text data of the supplementary volumes following the TEI guidelines, and explores how this data can be published and reused. Specifically, we focus on three research questions:</p>
    <ul>
      <li>Propose general-purpose TEI markup practice for modern Japanese texts.</li>
      <li>Present research approaches enabled by various visualizations and analyses.</li>
      <li>Investigate applicability to archival material through surveys of TEI use in the archival domain.</li>
    </ul>

    <h3>Scope</h3>
    <p>During the research period (May 2020 – March 2021), the project focused on the diaries and meeting schedules in supplementary volumes 1 and 2.</p>

    <h3>Members</h3>
    <ul>
      <li>Boyoung Kim (Shibusawa Eiichi Memorial Foundation)</li>
      <li>Naoki Kokaze (Chiba University)</li>
      <li>Satoru Nakamura (Historiographical Institute, The University of Tokyo)</li>
      <li>Kiyonori Nagasaki (International Institute for Digital Humanities)</li>
      <li>Yuta Hashimoto (National Museum of Japanese History)</li>
    </ul>

    <h3>Collaborators</h3>
    <ul>
      <li>Sayaka Inoue (Shibusawa Eiichi Memorial Foundation)</li>
      <li>Toru Mohara (Shibusawa Eiichi Memorial Foundation)</li>
    </ul>

    <h3>Data Provider</h3>
    <ul>
      <li>Information Resources Center, Shibusawa Eiichi Memorial Foundation</li>
    </ul>

    <h2>License</h2>
    <p>This site is provided under the <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution 4.0 International License</a>. Please provide appropriate credit and indicate any changes.</p>

    <h2>Contact</h2>
    <p><a href="https://www.shibusawa.or.jp/center/" target="_blank" rel="noopener noreferrer">Information Resources Center, Shibusawa Eiichi Memorial Foundation</a><br />
    center_info[at]shibusawa.or.jp (replace [at] with @)</p>
  `,
};

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');
  const title = t('title');
  const description = t('description');
  const html = ABOUT_CONTENT[locale as Locale] ?? ABOUT_CONTENT.en;

  return (
    <PageLayout breadcrumbItems={[{ title }]} title={title} description={description}>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div className={PROSE_STYLES} dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </PageLayout>
  );
}
