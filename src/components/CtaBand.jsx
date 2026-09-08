import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';

export default function CtaBand({ title, subtitle, primaryText, primaryMsg, primaryLink, secondaryText, secondaryLink, eyebrow = 'Contacto' }) {
  const isExternalSec = secondaryLink?.startsWith('tel:') || secondaryLink?.startsWith('http') || secondaryLink?.startsWith('mailto:');
  const isExternalPri = primaryLink?.startsWith('tel:') || primaryLink?.startsWith('http') || primaryLink?.startsWith('mailto:');

  const renderPrimary = () => {
    if (primaryLink) {
      return isExternalPri ? (
        <a className="btn btn-light btn-lg" href={primaryLink} target={primaryLink.startsWith('http') ? '_blank' : undefined} rel={primaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {primaryText}
        </a>
      ) : (
        <Link className="btn btn-light btn-lg" to={primaryLink}>
          {primaryText}
        </Link>
      );
    }
    return (
      <a
        className="btn btn-light btn-lg"
        href={wspUrl(primaryMsg || 'Hola Lionel, quiero ponerme en contacto contigo')}
        target="_blank"
        rel="noopener noreferrer"
      >
        {primaryText}
      </a>
    );
  };

  return (
    <section className="cta-band">
      <div className="cta-band__grid" aria-hidden="true" />
      <div className="cta-band__glow cta-band__glow--1" aria-hidden="true" />
      <div className="cta-band__glow cta-band__glow--2" aria-hidden="true" />
      <div className="container cta-band__inner">
        <span className="eyebrow cta-band__eyebrow">{eyebrow}</span>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <p>{subtitle}</p>
        <div className="cta-band__ctas">
          {renderPrimary()}
          {secondaryText && secondaryLink && (
            isExternalSec
              ? <a className="btn btn-outline-light btn-lg" href={secondaryLink} target={secondaryLink.startsWith('http') ? '_blank' : undefined} rel={secondaryLink.startsWith('http') ? 'noopener noreferrer' : undefined}>{secondaryText}</a>
              : <Link className="btn btn-outline-light btn-lg" to={secondaryLink}>{secondaryText}</Link>
          )}
        </div>
      </div>
    </section>
  );
}
