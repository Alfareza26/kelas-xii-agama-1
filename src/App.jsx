import InkOrbitSaasTemplate from "./components/InkOrbitTemplate.jsx";
import Students from "./sections/Students.jsx";
import Teacher from "./sections/Teacher.jsx";
import Gallery, { CATEGORY } from "./sections/Gallery.jsx";
import { students, teacher, classInfo, galleryPhotos } from "./data/students.js";
import { initialsOf } from "./sections/shared.jsx";

const n = students.length;
const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const nav = [
  { label: "Beranda", target: "home" },
  { label: "Siswa", target: "siswa" },
  { label: "Guru", target: "wali" },
  { label: "Galeri", target: "galeri" },
  { label: "Kutipan", target: "testimonials" },
  { label: "Tentang", target: "about" },
];

const faq = [
  { question: "Visi madrasah", answer: classInfo.schoolVision },
  { question: "Misi madrasah", answer: classInfo.schoolMission.map((m, i) => (i + 1) + ". " + m).join("\n") },
];

// Kutipan siswa jadi isi carousel; foto dari /public/students, fallback inisial.
const testimonials = students.map((s) => ({
  quote: s.quote,
  name: s.name,
  role: s.nickname,
  rating: null,
  avatar: s.image,
  initials: initialsOf(s.name),
}));

const demoSteps = galleryPhotos.map((p) => ({ label: p.caption, detail: CATEGORY[p.category] }));
const team = students.slice(0, 5);

export default function App() {
  return (
    <InkOrbitSaasTemplate
      brand={classInfo.className}
      nav={nav}
      navCta="Lihat Siswa"
      onGetStarted={() => scrollTo("siswa")}
      sculptureSeed={2025}
      hero={{
        titleTop: classInfo.heroTitle,
        titleAccent: ["Perjalanan Kita", classInfo.className, "Generasi Qur'ani"],
        description: `${classInfo.heroSubtitle}. Album digital ${classInfo.className}, ${classInfo.fullName}: ${n} siswa, satu guru, dan ${galleryPhotos.length} momen yang tidak ingin kami lupa.`,
        primaryCta: "Lihat Teman Kelas",
        secondaryCta: "Perjalanan Kita",
        sculptureHint: "Seret untuk memutar · Klik untuk membentuk ulang",
        ticks: [classInfo.className.split(" ")[0] + " · 2025", classInfo.schoolName.toUpperCase()],
        proofPrefix: "Satu kelas,",
        proofValue: n + " siswa",
        proofSuffix: "satu cerita",
        proofFaces: students.slice(0, 4).map((s) => initialsOf(s.name)),
      }}
      onStartTrial={() => scrollTo("siswa")}
      demoSteps={demoSteps}
      demoText={{
        title: "Perjalanan kita",
        running: "memutar kenangan",
        done: "selesai",
        close: "Tutup",
        runFoot: "Duduk manis, kenangannya sedang diputar.",
        doneFoot: `${galleryPhotos.length} momen, satu angkatan.`,
        replay: "Putar ulang",
        per: 0.9,
      }}
      features={{
        tag: "Kebersamaan",
        title: `${n} cerita,\nsatu *keluarga*`,
        collaboration: {
          title: "Satu kelas, satu keluarga",
          description: `${n} siswa dan satu guru berjalan bersama di ${classInfo.className}, dari hari pertama sampai wisuda.`,
        },
        reports: {
          title: "Album kenangan",
          description: `${galleryPhotos.length} momen, dari study tour sampai wisuda, tersimpan rapi di galeri.`,
        },
        team: team.map((s) => `${s.nickname} · ${s.name}`),
        teamInitials: team.map((s) => initialsOf(s.name)),
        reportLabel: "KENANGAN #",
        reportCycle: galleryPhotos.length,
        flowLabel: `${n} siswa mengalir lewat ${classInfo.className} menjadi album kenangan`,
        integrations: {
          title: "Tiga jenis momen",
          description: "Galeri dibagi jadi perjalanan, acara, dan keseharian.",
          tools: ["Trip", "Acara", "Harian", "Galeri"],
          syncLabel: "membuka",
          countLabel: "4 kategori",
        },
        insights: {
          title: "Kutipan terpanjang",
          description: "Jumlah huruf di kutipan favorit tiap siswa. Arahkan kursor untuk melihat siapa yang paling banyak bicara.",
          values: students.map((s) => s.quote.length),
          forecastFrom: 1,
          noSplit: true,
          tipFn: (i, v) => `${students[i].nickname} · ${v} huruf`,
        },
      }}
      testimonialsTag="Kutipan"
      testimonialsTitle={"Kata-kata yang *kami*\nbawa pulang"}
      testimonials={testimonials}
      logos={["MAN Batang", classInfo.className, classInfo.heroTitle, "Beriman", "Berakhlak", "Berilmu", "Berprestasi", "Qur'ani"]}
      showPricing={false}
      about={{
        tag: "Tentang",
        title: "Madrasah Aliyah\n*Negeri Batang*",
        body: `${classInfo.fullName} dipimpin ${classInfo.principal} dan beralamat di ${classInfo.address}. ${classInfo.schoolSlogan}.`,
        stats: [
          { value: String(n), label: "Siswa" },
          { value: String(galleryPhotos.length), label: "Momen di galeri" },
          { value: String(classInfo.schoolMission.length), label: "Misi madrasah" },
          { value: classInfo.year, label: "Tahun ajaran" },
        ],
      }}
      faq={faq}
      faqLabel="Visi dan misi madrasah"
      cta={{
        title: `Terima kasih,\n*${classInfo.className}.*`,
        description: classInfo.motto,
        button: "Kembali ke atas",
        noForm: true,
      }}
      footerTagline={classInfo.motto}
      footerColumns={[
        {
          title: "Jelajahi",
          links: [
            { label: "Siswa", href: "#siswa" },
            { label: "Guru", href: "#wali" },
            { label: "Galeri", href: "#galeri" },
          ],
        },
        {
          title: "Madrasah",
          links: [
            { label: classInfo.fullName, href: "#about" },
            { label: classInfo.address, href: "#about" },
          ],
        },
        {
          title: "Kelas",
          links: [
            { label: `${classInfo.className} · ${classInfo.year}`, href: "#home" },
            { label: `Guru: ${teacher.name}`, href: "#wali" },
          ],
        },
      ]}
      footerNote={`© ${classInfo.year} ${classInfo.className} · ${classInfo.schoolName}`}
      statusText={classInfo.heroTitle}
      slots={{
        afterFeatures: (ctx) => (
          <>
            <Students ctx={ctx} />
            <Teacher ctx={ctx} />
            <Gallery ctx={ctx} />
          </>
        ),
      }}
    />
  );
}
