import { PROSE_STYLES } from '@/constants/styles';

type Props = {
  html: string;
};

export default function StaticArticle({ html }: Props) {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      <div className={PROSE_STYLES} dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
