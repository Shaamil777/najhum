interface AccentTextProps {
  text: string;
  accent: string;
  dark?: boolean;
}

/** Keep the heading's base color and emphasize a phrase for its section background. */
export default function AccentText({ text, accent, dark = false }: AccentTextProps) {
  const index = text.indexOf(accent);

  if (!accent || index < 0) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className={dark ? "text-blue-400" : "text-primary"}>{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}
