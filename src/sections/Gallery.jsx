import * as React from "react";
import { useInView, Title, Arrow } from "../components/InkOrbitTemplate.jsx";
import { galleryPhotos } from "../data/students.js";
import { Modal, usableSrc } from "./shared.jsx";

export const CATEGORY = { trip: "Perjalanan", event: "Acara", daily: "Keseharian" };
const FILTERS = [{ key: "all", label: "Semua" }, ...Object.entries(CATEGORY).map(([key, label]) => ({ key, label }))];
// Pola tata letak saat semua foto tampil: 1 besar, 1 lebar, sisanya persegi (total 16 sel).
const SPAN = { 0: "big", 5: "wide" };

function Tile({ p, span, onOpen }) {
  const [bad, setBad] = React.useState(false);
  const url = usableSrc(p.image);
  return (
    <button type="button" className="yb-tile" data-span={span} onClick={onOpen} aria-label={"Buka foto: " + p.caption}>
      {url && !bad ? (
        <img src={url} alt={p.caption} loading="lazy" onError={() => setBad(true)} />
      ) : (
        <span className="yb-ghost" aria-hidden="true">
          {CATEGORY[p.category]}
        </span>
      )}
      <span className="yb-cap">
        {p.caption}
        <small>{CATEGORY[p.category]}</small>
      </span>
    </button>
  );
}

function Lightbox({ list, index, onIndex, onClose }) {
  const p = list[index];
  const [bad, setBad] = React.useState(false);
  React.useEffect(() => setBad(false), [index]);
  const go = (d) => onIndex((index + d + list.length) % list.length);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  const url = usableSrc(p.image);
  return (
    <Modal onClose={onClose} label={p.caption}>
      <div className="yb-lightbox">
        <div className="yb-lb-img">
          {url && !bad ? (
            <img src={url} alt={p.caption} onError={() => setBad(true)} />
          ) : (
            <span className="yb-ghost">{CATEGORY[p.category]}</span>
          )}
        </div>
        <div className="yb-lb-foot">
          <span>
            {p.caption}
            <small>
              {CATEGORY[p.category]} · {index + 1} / {list.length}
            </small>
          </span>
          <div>
            <button type="button" className="nf-icon-btn" onClick={() => go(-1)} aria-label="Foto sebelumnya">
              <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
                <Arrow />
              </span>
            </button>
            <button type="button" className="nf-icon-btn" onClick={() => go(1)} aria-label="Foto berikutnya">
              <Arrow />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function Gallery({ ctx }) {
  const [ref, inV] = useInView(0.06);
  const [filter, setFilter] = React.useState("all");
  const [open, setOpen] = React.useState(-1);
  const list = filter === "all" ? galleryPhotos : galleryPhotos.filter((p) => p.category === filter);
  const close = React.useCallback(() => setOpen(-1), []);
  return (
    <section
      className="nf-sec nf-sec-pad"
      ref={ctx.setSection("galeri")}
      id="galeri"
      data-section="galeri"
      aria-labelledby={ctx.uid + "galeri"}
    >
      <div className="nf-reveal" ref={ref} data-in={inV}>
        <div className="nf-head" id={ctx.uid + "galeri"}>
          <span className="nf-tag">Galeri</span>
          <Title text={"Momen yang *tidak*\nmau kami lupa"} />
          <div className="yb-chips" role="group" aria-label="Filter kategori">
            {FILTERS.map((f) => (
              <button key={f.key} type="button" className="yb-chip" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="yb-gal">
          {list.map((p, i) => (
            <Tile key={p.id} p={p} span={filter === "all" ? SPAN[i] : undefined} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>
      {open >= 0 && list[open] && <Lightbox list={list} index={open} onIndex={setOpen} onClose={close} />}
    </section>
  );
}
