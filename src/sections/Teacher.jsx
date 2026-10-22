import * as React from "react";
import { useInView, Brackets, Title } from "../components/InkOrbitTemplate.jsx";
import { teacher, classInfo } from "../data/students.js";
import { Photo } from "./shared.jsx";

export default function Teacher({ ctx }) {
  const [ref, inV] = useInView(0.2);
  return (
    <section
      className="nf-sec nf-sec-pad"
      ref={ctx.setSection("wali")}
      id="wali"
      data-section="wali"
      aria-labelledby={ctx.uid + "wali"}
    >
      <div className="nf-reveal yb-teacher" ref={ref} data-in={inV}>
        <div className="nf-frame" style={{ width: "100%" }}>
          <Brackets />
          <div className="yb-tphoto">
            <Photo src={teacher.image} name={teacher.name} />
          </div>
        </div>
        <div className="yb-tcopy">
          <div className="nf-head" id={ctx.uid + "wali"}>
            <span className="nf-tag">Guru</span>
            <Title text={"Pesan dari\n*guru kami*"} />
          </div>
          <blockquote className="yb-tmsg">{teacher.message}</blockquote>
          <div className="yb-tby">
            <b>{teacher.name}</b>
            <span>
              Guru {teacher.subject} · {classInfo.className}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
