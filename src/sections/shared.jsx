import * as React from "react";
import { createPortal } from "react-dom";

export function initialsOf(name = "") {
  const words = name.replace(/\./g, " ").split(/\s+/).filter(Boolean);
  const a = words[0]?.[0] ?? "";
  const b = words.length > 1 ? words[1][0] : "";
  return (a + b).toUpperCase();
}

// "/students/.jpg" (nama file kosong) dianggap tidak ada foto.
export function usableSrc(src) {
  return src && !/\/\.[a-z0-9]+$/i.test(src) ? src : "";
}

// Foto dengan fallback inisial bila file belum ada di /public.
export function Photo({ src, name, className = "" }) {
  const [bad, setBad] = React.useState(false);
  const url = usableSrc(src);
  if (!url || bad) {
    return (
      <span className={"yb-init " + className} role="img" aria-label={name}>
        {initialsOf(name)}
      </span>
    );
  }
  return <img className={className} src={url} alt={name} loading="lazy" onError={() => setBad(true)} />;
}

// Modal dirender ke .nf-root, supaya posisi fixed tidak terjebak container query .nf-shell.
export function Modal({ onClose, label, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const prev = document.activeElement;
    ref.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const lock = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = lock;
      prev?.focus?.();
    };
  }, [onClose]);
  const host = document.querySelector(".nf-root") || document.body;
  return createPortal(
    <div className="nf-modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="nf-dialog yb-dialog" role="dialog" aria-modal="true" aria-label={label}>
        <button ref={ref} type="button" className="nf-icon-btn yb-close" onClick={onClose} aria-label="Tutup">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    host,
  );
}

export const YB_CSS = `
.yb-tools{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin-bottom:clamp(20px,3cqw,32px)}
.yb-search{position:relative;flex:1 1 260px;max-width:380px}
.yb-search input{width:100%;height:42px;padding:0 14px 0 38px;background:var(--nf-card);border:1px solid var(--nf-line);border-radius:2px;color:var(--nf-ink);outline:none;transition:border-color .2s,background-color .45s}
.yb-search input::placeholder{color:var(--nf-faint)}
.yb-search input:focus{border-color:var(--nf-ink)}
.yb-search svg{position:absolute;left:13px;top:50%;transform:translateY(-50%);color:var(--nf-muted);pointer-events:none}
.yb-count{font-size:12.5px;color:var(--nf-muted)}
.yb-empty{padding:48px 0;text-align:center;color:var(--nf-muted);font-size:14px}

.yb-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(12px,1.8cqw,18px)}
@container (min-width:520px){.yb-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@container (min-width:760px){.yb-grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
@container (min-width:1040px){.yb-grid{grid-template-columns:repeat(6,minmax(0,1fr))}}
.yb-card{display:flex;flex-direction:column;width:100%;height:100%;text-align:left;background:var(--nf-card);border:1px solid var(--nf-line);transition:transform .45s cubic-bezier(.2,.8,.2,1),box-shadow .45s,border-color .3s,background-color .45s}
.yb-card:hover{transform:translateY(-4px);box-shadow:var(--nf-shadow);border-color:var(--nf-line-strong);background:var(--nf-raise)}
.yb-ph{position:relative;aspect-ratio:1/1;overflow:hidden;background:var(--nf-band)}
.yb-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter .5s,transform .8s cubic-bezier(.2,.8,.2,1)}
.yb-card:hover .yb-ph img,.yb-card:focus-visible .yb-ph img{filter:grayscale(0);transform:scale(1.05)}
.yb-init{display:grid;place-items:center;width:100%;height:100%;font-family:var(--nf-serif);font-size:clamp(28px,4.4cqw,46px);letter-spacing:-.02em;color:var(--nf-soft);background-color:var(--nf-band);background-image:repeating-linear-gradient(135deg,var(--nf-hatch) 0 1px,transparent 1px 10px)}
.yb-ph .yb-init{position:absolute;inset:0}
.yb-meta{padding:12px 12px 14px;display:grid;gap:2px}
.yb-name{font-size:13.5px;font-weight:600;letter-spacing:-.005em;line-height:1.3}
.yb-nick{font-size:12px;color:var(--nf-muted)}

.yb-dialog{width:min(640px,100%)}
.yb-close{position:absolute;top:10px;right:10px;z-index:2;background:var(--nf-paper)}
.yb-mod{display:grid;grid-template-columns:minmax(0,1fr)}
@media (min-width:600px){.yb-mod{grid-template-columns:minmax(0,260px) minmax(0,1fr)}}
.yb-mod .yb-ph{aspect-ratio:1/1;height:100%;min-height:240px}
.yb-mod-copy{padding:26px 24px 22px;display:flex;flex-direction:column;gap:10px}
.yb-mod-copy h3{font-size:20px;font-weight:600;letter-spacing:-.02em}
.yb-quote{font-family:var(--nf-serif);font-size:clamp(20px,3.4vw,26px);line-height:1.3;letter-spacing:-.01em;color:var(--nf-ink);margin-top:6px}
.yb-pager{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:auto;padding-top:18px;font-size:12.5px;color:var(--nf-muted)}
.yb-pager div{display:flex;gap:6px}

.yb-teacher{display:grid;grid-template-columns:minmax(0,1fr);gap:clamp(24px,4.5cqw,64px);align-items:center}
@container (min-width:760px){.yb-teacher{grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr)}}
.yb-tphoto{position:relative;aspect-ratio:4/5;max-width:420px;width:100%;margin:0 auto;background:var(--nf-band);overflow:hidden;border:1px solid var(--nf-line)}
.yb-tphoto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1)}
.yb-tphoto .yb-init{position:absolute;inset:0;font-size:clamp(64px,10cqw,120px)}
.yb-tcopy .nf-head{align-items:flex-start;text-align:left;margin-bottom:18px}
.yb-tmsg{font-family:var(--nf-serif);font-size:clamp(22px,3.1cqw,34px);line-height:1.28;letter-spacing:-.015em;color:var(--nf-ink);max-width:30ch}
.yb-tby{margin-top:26px;display:grid;gap:2px}
.yb-tby b{font-size:15px;font-weight:600;letter-spacing:-.01em}
.yb-tby span{font-size:13px;color:var(--nf-muted)}

.yb-chips{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:6px}
.yb-chip{padding:8px 14px;font-size:13px;line-height:1;color:var(--nf-soft);background:var(--nf-raise);border:1px solid var(--nf-line-strong);border-radius:2px;transition:background-color .25s,color .25s,border-color .25s}
.yb-chip:hover{border-color:var(--nf-ink)}
.yb-chip[aria-pressed="true"]{background:var(--nf-inv);color:var(--nf-inv-ink);border-color:var(--nf-inv)}
.yb-gal{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-flow:dense;gap:clamp(10px,1.6cqw,16px)}
@container (min-width:760px){.yb-gal{grid-template-columns:repeat(4,minmax(0,1fr))}}
.yb-tile{position:relative;display:block;width:100%;aspect-ratio:1/1;overflow:hidden;text-align:left;background:var(--nf-band);border:1px solid var(--nf-line);transition:border-color .3s,box-shadow .4s}
.yb-tile:hover{border-color:var(--nf-line-strong);box-shadow:var(--nf-shadow)}
.yb-tile[data-span="big"]{grid-column:span 2;grid-row:span 2}
.yb-tile[data-span="wide"]{grid-column:span 2;aspect-ratio:2/1}
.yb-tile img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1);transition:filter .5s,transform .9s cubic-bezier(.2,.8,.2,1)}
.yb-tile:hover img,.yb-tile:focus-visible img{filter:grayscale(0);transform:scale(1.04)}
.yb-ghost{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--nf-serif);font-size:clamp(26px,4.4cqw,48px);letter-spacing:-.02em;color:var(--nf-faint);background-image:repeating-linear-gradient(135deg,var(--nf-hatch) 0 1px,transparent 1px 10px)}
.yb-cap{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding:10px 12px;font-size:12.5px;font-weight:500;color:var(--nf-ink);background:color-mix(in srgb,var(--nf-paper) 90%,transparent);transition:background-color .45s}
.yb-cap small{font-size:11px;font-weight:400;color:var(--nf-muted);white-space:nowrap}
.yb-lightbox{width:min(920px,100%)}
.yb-lb-img{position:relative;aspect-ratio:3/2;background:var(--nf-band);overflow:hidden}
.yb-lb-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.yb-lb-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;font-size:13.5px}
.yb-lb-foot small{display:block;color:var(--nf-muted);font-size:12px;margin-top:2px}
.yb-lb-foot div{display:flex;gap:6px}
`;
