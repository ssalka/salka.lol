interface SectionHeaderProps {
  /** Two-digit section index, e.g. `02` */
  index: string;
  title: string;
}

/** Section index + hairline rule + condensed title, with a ruler strip under the rule */
export function SectionHeader({ index, title }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex items-end gap-4">
      <span className="text-label text-ink-muted font-mono uppercase">{index}</span>
      <div className="flex-1">
        <div className="bg-hairline h-px" />
        <div
          aria-hidden="true"
          className="h-2 bg-[repeating-linear-gradient(90deg,var(--hairline)_0_1px,transparent_1px_16px)]"
        />
      </div>
      <h2 className="font-display text-display-lg text-ink uppercase">{title}</h2>
    </div>
  );
}
