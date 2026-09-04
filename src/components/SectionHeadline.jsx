/* ------------------------------------------------------------------
   Section headline block — Figma 122:19867 / 122:19893 / 122:19922.

   620px of measure centred in the page, copy ranged left: the lead
   sentence in the foreground colour with the hero's lit treatment,
   the rest dropping to the dim tone, then a 20px supporting line
   24px below.

   The lit effect needs the lead text three times over — bloom,
   contact shadow, solid face — so the whole subtree is hidden from
   assistive tech and the heading carries an explicit label instead.
   That keeps the announced name exactly one clean sentence pair,
   whatever a given engine does with aria-hidden inside a name
   computation.
   ------------------------------------------------------------------ */
export default function SectionHeadline({
  id,
  lead,
  rest,
  sub,
  /* the comp breaks straight after the lead sentence in some
     sections and lets the measure decide in others */
  breakAfterLead = false,
  className = '',
}) {
  /* `rest` may be an array when the break between its lines is a
     deliberate one rather than whatever the measure happens to give */
  const restLines = Array.isArray(rest) ? rest : [rest];

  return (
    <div className={`cf-hblock ${className}`.trim()}>
      <h2
        id={id}
        className="cf-headline"
        aria-label={`${lead} ${restLines.join(' ')}`}
      >
        <span className="cf-headline__lead cf-lit" aria-hidden="true">
          <span className="cf-lit__bloom">{lead}</span>
          <span className="cf-lit__shade">{lead}</span>
          <span className="cf-lit__face">{lead}</span>
        </span>{' '}
        {breakAfterLead && <br aria-hidden="true" />}
        <span className="cf-headline__rest" aria-hidden="true">
          {restLines.map((line, i) => (
            <span key={line} className="cf-headline__line">
              {/* the space keeps the lines from running together for
                  anything reading the DOM text; it collapses at the
                  end of a line, so the break is unaffected */}
              {i > 0 && (
                <>
                  {' '}
                  <br />
                </>
              )}
              {line}
            </span>
          ))}
        </span>
      </h2>

      {sub && (
        <p className="cf-subline">
          {/* `sub` may be an array where the comp breaks the line
              itself rather than leaving it to the measure */}
          {(Array.isArray(sub) ? sub : [sub]).map((line, i) => (
            <span key={line}>
              {i > 0 && (
                <>
                  {' '}
                  <br />
                </>
              )}
              {line}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
