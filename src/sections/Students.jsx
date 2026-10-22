import * as React from "react";
import { useInView, Brackets, Title, Arrow } from "../components/InkOrbitTemplate.jsx";
import { students } from "../data/students.js";
import { Photo, Modal, YB_CSS } from "./shared.jsx";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.6 10.6 14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function StudentModal({ list, index, onIndex, onClose }) {
  const s = list[index];
  const go = (d) => onIndex((index + d + list.length) % list.length);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  return (
    <Modal onClose={onClose} label={"Profil " + s.name}>
      <div className="yb-mod">
        <div className="yb-ph">
          <Photo src={s.image} name={s.name} />
        </div>
        <div className="yb-mod-copy">
          <h3>{s.name}</h3>
          <span className="yb-nick">Panggilan: {s.nickname}</span>
          <p className="yb-quote">“{s.quote}”</p>
          <div className="yb-pager">
            <span>
              {index + 1} / {list.length}
            </span>
            <div>
              <button type="button" className="nf-icon-btn" onClick={() => go(-1)} aria-label="Siswa sebelumnya">
                <span style={{ display: "inline-flex", transform: "rotate(180deg)" }}>
                  <Arrow />
                </span>
              </button>
              <button type="button" className="nf-icon-btn" onClick={() => go(1)} aria-label="Siswa berikutnya">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function Students({ ctx }) {
  const [ref, inV] = useInView(0.04);
  const [q, setQ] = React.useState("");
  const [open, setOpen] = React.useState(-1);
  const term = q.trim().toLowerCase();
  const list = React.useMemo(
    () => (term ? students.filter((s) => (s.name + " " + s.nickname).toLowerCase().includes(term)) : students),
    [term],
  );
  const close = React.useCallback(() => setOpen(-1), []);

  return (
    <section
      className="nf-sec nf-sec-pad"
      ref={ctx.setSection("siswa")}
      id="siswa"
      data-section="siswa"
      aria-labelledby={ctx.uid + "siswa"}
    >
      <style>{YB_CSS}</style>
      <div className="nf-reveal" ref={ref} data-in={inV}>
        <div className="nf-head" id={ctx.uid + "siswa"}>
          <span className="nf-tag">Siswa</span>
          <Title text={students.length + " *teman*,\nsatu kelas"} />
          <p className="nf-sub">Klik salah satu kartu untuk membaca kutipan favoritnya.</p>
        </div>

        <div className="yb-tools">
          <label className="yb-search">
            <span className="nf-sr">Cari nama atau panggilan</span>
            <SearchIcon />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama atau panggilan"
              autoComplete="off"
            />
          </label>
          <span className="yb-count" role="status">
            {list.length === students.length ? "Semua " + students.length + " siswa" : list.length + " dari " + students.length + " siswa"}
          </span>
        </div>

        {list.length === 0 ? (
          <p className="yb-empty">Tidak ada yang cocok dengan “{q}”.</p>
        ) : (
          <div className="yb-grid">
            {list.map((s, i) => (
              <div key={s.id} className="nf-frame nf-frame-hover">
                <Brackets />
                <button type="button" className="yb-card" onClick={() => setOpen(i)} aria-label={"Buka profil " + s.name}>
                  <span className="yb-ph">
                    <Photo src={s.image} name={s.name} />
                  </span>
                  <span className="yb-meta">
                    <span className="yb-name">{s.name}</span>
                    <span className="yb-nick">{s.nickname}</span>
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {open >= 0 && list[open] && <StudentModal list={list} index={open} onIndex={setOpen} onClose={close} />}
    </section>
  );
}
