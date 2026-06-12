import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { LiaRingSolid } from "react-icons/lia";
import { BiMap, BiParty } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";
import { FiCheck, FiCopy } from "react-icons/fi";
import { GiRing } from "react-icons/gi";
import { HiMap } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";

// ─── COLORS ───────────────────────────────────────────────────────────────────
const GOLD = "#b8952a";
const NAVY = "#1e3a8a";
const DEEP = "#0f2456";

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "wedding-raphael-seraphina-v1";

async function loadData() {
  try {
    const result = await window.storage.get(STORAGE_KEY, true);
    return result ? JSON.parse(result.value) : { rsvp: [], wishes: [] };
  } catch {
    return { rsvp: [], wishes: [] };
  }
}

async function saveData(data) {
  try {
    await window.storage.set(STORAGE_KEY, JSON.stringify(data), true);
  } catch (e) {
    console.error("Storage error:", e);
  }
}

// ─── COUNTDOWN ────────────────────────────────────────────────────────────────
function useCountdown(targetDate) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

// ─── FADE IN ON SCROLL ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── GOLD DIVIDER ─────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">

      <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold text-[16px]" >✦</span>
      <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold" />

    </div>
  );
}

// Gold Line //
function GoldLine() {
  return (
    <div className="flex items-center justify-center gap-3 my-1">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="h-px w-32 mx-auto  bg-gradient-to-r from-transparent via-gold to-transparent" />
    </div>
  )
}

// ─── SVG FLORAL CLUSTER ───────────────────────────────────────────────────────
// A single reusable cluster of roses + leaves, rotated/scaled per placement

function FloralCluster({ style = {}, flip = false }) {
  //
  return (
    <svg
      viewBox="0 0 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none select-none"
      style={{ transform: flip ? "scaleX(-1)" : "none", ...style }}>
      {/* Watercolor blush */}
      <ellipse cx="200" cy="120" rx="130" ry="100" fill="#93c5fd" opacity="0.07" />

      {/* Large rose */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
        <ellipse
          key={i}
          cx={200 + Math.cos((deg * Math.PI) / 180) * 34}
          cy={90 + Math.sin((deg * Math.PI) / 180) * 34}
          rx="24" ry="13"
          transform={`rotate(${deg}, ${200 + Math.cos((deg * Math.PI) / 180) * 34}, ${90 + Math.sin((deg * Math.PI) / 180) * 34})`}
          fill={i % 2 === 0 ? "#1e3a8a" : "#1d4ed8"}
          opacity={0.22 + i * 0.025}
        />
      ))}
      <circle cx="200" cy="90" r="22" fill="#1e3a5f" opacity="0.3" />
      <circle cx="200" cy="90" r="11" fill="#1e40af" opacity="0.42" />

      {/* Inner petals */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <ellipse
          key={i}
          cx={200 + Math.cos((deg * Math.PI) / 180) * 15}
          cy={90 + Math.sin((deg * Math.PI) / 180) * 15}
          rx="12" ry="8"
          transform={`rotate(${deg}, ${200 + Math.cos((deg * Math.PI) / 180) * 15}, ${90 + Math.sin((deg * Math.PI) / 180) * 15})`}
          fill="#1e3a8a"
          opacity={0.28 + i * 0.03}
        />
      ))}

      {/* Medium rose */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <ellipse
          key={i}
          cx={120 + Math.cos((deg * Math.PI) / 180) * 22}
          cy={155 + Math.sin((deg * Math.PI) / 180) * 22}
          rx="17" ry="10"
          transform={`rotate(${deg}, ${120 + Math.cos((deg * Math.PI) / 180) * 22}, ${155 + Math.sin((deg * Math.PI) / 180) * 22})`}
          fill="#1e3a8a"
          opacity={0.2 + i * 0.022}
        />
      ))}
      <circle cx="120" cy="155" r="14" fill="#1e3a5f" opacity="0.28" />
      <circle cx="120" cy="155" r="7" fill="#1e40af" opacity="0.38" />

      {/* Small bud top-right */}
      <ellipse cx="270" cy="50" rx="13" ry="17" fill="#1e3a8a" opacity="0.18" />
      <ellipse cx="270" cy="50" rx="8" ry="11" fill="#1e3a5f" opacity="0.25" />

      {/* Large leaves */}
      <path d="M160 75 Q185 45 215 65 Q195 82 160 75Z" fill="#1a4731" opacity="0.35" />
      <path d="M225 105 Q255 78 278 98 Q258 112 225 105Z" fill="#1a4731" opacity="0.3" />
      <path d="M80 165 Q95 140 120 153 Q108 168 80 165Z" fill="#1a4731" opacity="0.32" />
      <path d="M140 195 Q158 170 185 185 Q166 200 140 195Z" fill="#1a4731" opacity="0.28" />
      <path d="M245 145 Q265 122 288 140 Q268 154 245 145Z" fill="#1a4731" opacity="0.27" />

      {/* Stems */}
      <path d="M200 124 Q170 158 140 178 Q120 192 100 205" stroke="#1a4731" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M120 177 Q108 195 95 212" stroke="#1a4731" strokeWidth="1" fill="none" opacity="0.3" />
      <path d="M270 67 Q260 90 248 112 Q238 130 225 145" stroke="#1a4731" strokeWidth="1" fill="none" opacity="0.3" />

      {/* Eucalyptus sprigs */}
      <path d="M290 25 Q310 48 300 78 Q288 100 272 118" stroke="#2d6a4f" strokeWidth="1.2" fill="none" opacity="0.32" />
      {[42, 58, 75, 92, 110].map((y, i) => (
        <ellipse
          key={i}
          cx={302 - i * 2 + (i % 2 === 0 ? 7 : -7)}
          cy={y}
          rx="8" ry="5"
          transform={`rotate(${-18 + i * 8}, ${302 - i * 2 + (i % 2 === 0 ? 7 : -7)}, ${y})`}
          fill="#2d6a4f"
          opacity="0.26"
        />
      ))}

      <path d="M30 10 Q18 38 22 68 Q26 92 35 115" stroke="#2d6a4f" strokeWidth="1" fill="none" opacity="0.25" />
      {[28, 44, 60, 78].map((y, i) => (
        <ellipse
          key={i}
          cx={24 + (i % 2 === 0 ? 8 : -8)}
          cy={y}
          rx="7" ry="4"
          transform={`rotate(${i % 2 === 0 ? 18 : -18}, ${24 + (i % 2 === 0 ? 8 : -8)}, ${y})`}
          fill="#2d6a4f"
          opacity="0.22"
        />
      ))}
    </svg>
  );
}

// COVER
function Cover({ onOpen }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#edf2ff] via-[#e8eef8] to-[#f4eedd]">

      {/* Watercolor pools */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 opacity-15" style={{ width: "60%", height: "60%", background: "radial-gradient(ellipse, #93c5fd, transparent 70%)", transform: "translate(15%,-15%)" }} />
        <div className="absolute bottom-0 left-0 opacity-10" style={{ width: "55%", height: "55%", background: "radial-gradient(ellipse, #bfdbfe, transparent 70%)", transform: "translate(-15%,15%)" }} />
      </div>

      {/* Florals */}
      <div className=" absolute top-0 right-0 w-52 sm:w-[340px] opacity-90">
        <FloralCluster />
      </div>
      <div className=" absolute bottom-0 left-0 w-44 sm:w-[300px] opacity-85">
        <FloralCluster flip />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center px-8 py-3">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xs sm:text-lg lg:text-xs tracking-[0.25em] uppercase mb-5 font-sans text-gold">
          Wedding Invitation
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className=" text-4xl md:text-6xl lg:text-[66px] text-deep font-primary -tracking-[0.01em]">
          Raphael
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className=" text-2xl font-primary text-gold my-3 ">
          &
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className=" text-4xl md:text-6xl lg:text-[66px] text-deep font-primary -tracking-[0.01em]">
          Seraphina
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-px w-32 mx-auto my-8 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}>
          <p className="text-sm sm:text-xl lg:text-sm text-[#8a94b0] mb-1 font-serif" >Kepada Yth</p>
          <p className="text-xl sm:text-2xl lg:text-lg mb-20 lg:mb-8 font-serif text-deep">Hartono</p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onOpen}
            className="px-12 py-3 text-sm sm:text-xl lg:text-sm w-full rounded-lg text-white bg-navy hover:bg-[#162d6b] hover:shadow-xl transition-all duration-500 cursor-pointer">
            Buka Undangan
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Hero
function HeroSection() {
  return (
    <section className="relative py-32 sm:py-24 lg:py-20 px-6 overflow-hidden bg-gradient-to-br from-[#edf2ff] to-[#ffffff] ">

      {/* Top-left floral accent */}
      <div className=" absolute top-0 left-0 w-56 sm:w-64"   >
        <FloralCluster />
      </div>

      <div className="relative z-10 max-w-lg mx-auto text-center">

        <FadeIn>
          <p className="text-gold text-xs tracking-[0.20em] uppercase mb-7 sm:mb-9 lg:mb-7">Wedding Invitation</p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="flex items-baseline justify-center gap-2 sm:gap-5 mb-4 sm:mb-2">
            <h2 className="text-navy text-[32px] sm:text-6xl font-primary">Raphael</h2>
            <span className="text-gold text-lg sm:text-2xl font-primary">&</span>
            <h2 className="text-navy text-[32px] sm:text-6xl font-primary">Seraphina</h2>
          </div>
          <p className="text-gold text-xs sm:text-sm tracking-widest mt-1 sm:mt-9 lg:mt-6">Sabtu, 30 April 2026</p>
        </FadeIn>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
          <GoldLine />
          {/* <GoldDivider /> */}
        </div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-36 h-36 rounded-full flex flex-col items-center justify-center mt-2">
          <p className="text-[66px] text-gold font-primary w-16 flex justify-start">R</p>
          <p className="text-[66px] text-gold font-primary -mt-12 w-16 flex justify-end">S</p>
        </motion.div>

      </div>
    </section>
  );
}

// Couple
function CoupleSection() {
  return (
    <section className="relative py-16 px-6 overflow-hidden  ">

      <div className="relative z-10 max-w-xl mx-auto text-center">

        <h2 className="font-primary mb-3 text-[32px] lg:text-4xl text-gold">The Wedding Of </h2>
        <p className=" leading-relaxed text-[#7a8aaa] text-sm font-serif">The pleasure of your company is requested</p>

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
          <GoldLine />
        </div>

        <FadeIn delay={0.2}>

          <div className="grid grid-cols-1 lg:grid-cols-2  gap-20">
            {[
              { initial: "R", name: "Raphael Aldino", parent: "Putra dari\nBapak Drs. Agus & Ibu Rahmawati", ig: "@raphael.aldino" },
              { initial: "S", name: "Seraphina Kirana", parent: "Putri dari\nBapak Kirana Wijaya & Ibu dr. Dewi Kusuma", ig: "@raphael.aldino" },
            ].map(({ initial, name, parent, ig }) => (
              <div key={initial} className="flex flex-col items-center justify-center ">
                <div className="mx-auto flex items-center justify-center w-24 h-[124px] font-primary rounded-t-full border border-gold text-5xl  mb-3 text-gold ">
                  {initial}
                </div>
                <h3 className="text-2xl font-primary text-gold">{name.split(" ")[0]}</h3>
                <p className="text-sm text-[#8a94b0]">{name.split(" ").slice(1).join(" ")}</p>
                <p className="text-xs mt-2 leading-relaxed whitespace-pre-line text-[#8a94b0]">{parent}</p>
                <p className="text-xs mt-1 text-gold flex items-center gap-1"><BsInstagram size={12} />{ig}</p>
              </div>
            ))}
          </div>

        </FadeIn>

      </div>
    </section>
  );
}

// SAVE THE DATE
function SaveTheDateSection() {
  const { days, hours, minutes, seconds } = useCountdown("2026-04-30T08:00:00");

  const handleCalendar = () => {
    window.open(
      "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Raphael+%26+Seraphina&dates=20260430T010000Z/20260430T100000Z&details=Akad+Nikah+%26+Resepsi&location=Taciro+Grand+Ballroom,+Jl.+Bambang+Utoyo+No.+118A,+Palembang",
      "_blank"
    );
  };

  return (
    <section className="relative py-16 px-6 overflow-hidden bg-gradient-to-b from-[#0c1a3e] via-[#182d5a] to-[#0d1a3a]">

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 45 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 0.8,
              height: Math.random() * 2 + 0.8,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ opacity: [0.08, Math.random() * 0.5 + 0.15, 0.08] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 4 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-xs mx-auto text-center">
        <FadeIn>
          <h2 className="font-primary mb-2 text-[32px] lg:text-4xl text-gold tracking-wider">
            Save The Date
          </h2>

          <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
            <GoldLine />
          </div>

        </FadeIn>

        <FadeIn delay={0.15}>

          <div className="grid grid-cols-4 gap-3 sm:gap-12 mb-12">
            {[
              { value: days, label: "Hari" },
              { value: hours, label: "Jam" },
              { value: minutes, label: "Menit" },
              { value: seconds, label: "Detik" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center">
                <motion.div
                  key={value}
                  initial={{ opacity: 0.5, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-16 sm:w-20 h-16 sm:h-20 border border-gold rounded-lg flex items-center justify-center mb-2 bg-[#0d1a3d] backdrop-blur-sm font-serif text-3xl sm:text-4xl text-[#dde8ff]" >
                  {String(value).padStart(2, "0")}
                </motion.div>
                <p className="text-xs mt-3 text-[#6193ff] opacity-85">{label}</p>
              </div>
            ))}
          </div>

          <motion.button
            onClick={handleCalendar}
            className="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-300 text-[#182d5a] bg-gold hover:bg-[#9b7d23] hover:shadow-xl cursor-pointer">
            Tambahkan Ke Kalender
          </motion.button>

        </FadeIn>
      </div>
    </section>
  );
}

// EVENT / WEDDING DAY
function EventSection() {
  return (
    <section className="relative py-16 px-6 overflow-hidden ">

      <div className="relative z-10 max-w-lg mx-auto text-center">

        <FadeIn>

          <h2 className="font-primary mb-2 text-[32px] lg:text-4xl text-navy tracking-wider">
            It's Wedding Day
          </h2>

          <p className="leading-relaxed text-[#7a8aaa] text-sm font-serif">
            True love stands by each other's side on<br />good days and stands closer on bad days
          </p>

          <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
            <GoldLine />
          </div>

        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mb-12 text-2xl text-deep font-serif">Sabtu, 30 April 2026 </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
            {[
              { title: "Akad Nikah", time: "08:00 – Selesai" },
              { title: "Resepsi", time: "10:00 – Selesai" },
            ].map(({ title, time }) => (
              <div
                key={title}
                className="flex flex-col items-center justify-center py-6 bg-white border border-[#a3b5db] rounded-lg">
                <div className="text-gold text-3xl mb-3">{title === "Akad Nikah" ? (
                  <GiRing className="mx-auto text-3xl" />
                ) : (
                  <div>
                    <img src="/blu.png" alt="" className="w-7" />
                  </div>

                )}</div>
                <p className="text-3xl text-navy mb-5 font-primary" >{title}</p>
                <p className="text-sm mt-1 text-[#7a8aaa] font-medium">{time}</p>
              </div>
            ))}
          </div>

          <div className="max-w-sm mx-auto">
            {/*<HiMap className="text-3xl mx-auto mb-2 text-gold" /> 
            <BiMap className="text-3xl text-gold mx-auto mb-2" />
            */}
            <HiMapPin className="text-3xl mx-auto mb-2 text-gold" />
            <p className="font-serif text-2xl text-deep">Taciro Grand Ballroom</p>
            <p className="text-xs sm:text-sm leading-relaxed mt-1 mb-7 text-[#7a8aaa] font-serif">
              Jl. Bambang Utoyo No. 118A, Palembang, Sumatera Selatan
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => window.open("https://maps.google.com/?q=Taciro+Grand+Ballroom+Palembang", "_blank")}
              className="px-8 py-3 text-sm text-white bg-navy hover:bg-[#162d6b] hover:shadow-xl rounded-lg transition-all duration-400 cursor-pointer ">
              Lihat Peta
            </motion.button>
          </div>


        </FadeIn>
      </div>
    </section>
  );
}

// WEDDING GIFT
function GiftSection() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("1234 5678 90").catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-16 px-6 overflow-hidden bg-gradient-to-b from-[#f4f7ff] to-[#eef1fb]">

      {/* <FloralCluster style={{ position: "absolute", bottom: 0, right: 0, width: "260px", opacity: 0.45 }} flip /> */}

      <div className="relative z-10 max-w-md mx-auto text-center">
        <FadeIn>
          <h2 className="font-primary mb-2 text-[32px] lg:text-4xl text-gold">
            Wedding Gift
          </h2>

          <p className="text-sm leading-relaxed mb-8 text-[#7a8aaa] font-serif">
            Tanpa mengurangi rasa hormat, apabila Bapak/Ibu/Saudara/i berkeinginan memberikan tanda kasih, silahkan sampaikan melalui nomor rekening berikut.
          </p>

          <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
            <GoldLine />
          </div>

        </FadeIn>

        <FadeIn delay={0.15}>

          <div className="max-w-md mx-auto">

            <div className="flex items-center justify-between p-6 text-left border border-[#7a8aaa] rounded-lg bg-transparent">

              <div>
                <p className="text-xs mb-1.5 text-gold">Muamalat</p>
                <p className="font-serif text-lg lg:text-2xl tracking-wider text-navy "> 1234 5678 90 </p>
                <p className="text-xs mt-1.5 text-navy/70">Raphael Aldino</p>
              </div>

              {/* <div className="flex items-center justify-between gap-4"> */}

              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={copy}
                className="flex items-center justify-center text-xs px-4 py-1.5 rounded-md gap-1 transition-all flex-shrink-0 border border-gold text-gold bg-transparent cursor-pointer " >
                {copied ? (
                  <>
                    <FiCheck size={12} />
                    <p> Tersalin</p>
                  </>
                ) : (
                  <>
                    <FiCopy size={12} />
                    <p> Salin</p>
                  </>)}
              </motion.button>
              {/* 
              </div> */}


            </div>

          </div>

        </FadeIn>
      </div>
    </section>
  );
}

// FOOTER
function Footer() {
  return (
    <footer className="relative pt-16 pb-11 px-6 text-center overflow-hidden bg-gradient-to-b from-[#0d1a3a] to-[#060e22]" >

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{ width: 1.2, height: 1.2, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.05, Math.random() * 0.3 + 0.1, 0.05] }}
            transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }} />
        ))}
      </div>

      <div className="relative z-10">

        <div className="mt-12 mb-24 sm:mt-14 lg:mt-8 lg:mb-16">
          <GoldLine />
        </div>

        <p className="font-primary mb-1 text-3xl text-gold ">Raphael & Seraphina</p>
        <p className="text-xs mb-10 text-[#BED2FF]/65"> Sabtu, 16 May 2026</p>

        <div className="h-px w-10 mx-auto mb-4" style={{ background: "rgba(184,149,42,0.35)" }} />

        <p className="text-xs text-[#BED2FF]/25 ">Powered by</p>
        <p className="font-medium text-[#BED2FF]/45 text-sm ">MuRu</p>
      </div>

    </footer>
  );
}

// ROOT EXPORT
export default function BlFlrlInvitation() {
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState({ rsvp: [], wishes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData().then(d => { setData(d); setLoading(false); });
  }, []);

  const handleRSVP = async (entry) => {
    const updated = { ...data, rsvp: [entry, ...data.rsvp] };
    setData(updated);
    await saveData(updated);
  };

  const handleWish = async (msg) => {
    const entry = { msg, ts: Date.now() };
    const updated = { ...data, wishes: [entry, ...data.wishes] };
    setData(updated);
    await saveData(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#f0f4ff" }}>
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontStyle: "italic", color: GOLD }}
        >
          Loading…
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <AnimatePresence mode="wait">

        {!opened ? (
          <motion.div key="cover" exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.65 }}>
            <Cover onOpen={() => setOpened(true)} />
          </motion.div>

        ) : (

          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <HeroSection />
            <CoupleSection />
            <SaveTheDateSection />
            <EventSection />

            <GiftSection />

            <Footer />
          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}
