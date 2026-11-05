"use client";

import Image from "next/image";
import { useState } from "react";

const tones = ["#14382c", "#8d3d32", "#1c1915", "#3e5c49", "#6d5424"];

export function BookCover({
  src,
  title,
  author,
  level,
  className = "",
  sizes = "(max-width: 768px) 45vw, 240px",
}: {
  src: string | null;
  title: string;
  author?: string;
  level?: string | null;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(!src);
  const tone = tones[title.length % tones.length];
  const positioned = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div className={`overflow-hidden bg-[#efe4d2] ${positioned ? "" : "relative"} ${className}`}>
      {failed ? (
        <div className="absolute inset-0 flex flex-col p-4 text-[#f6edd8]" style={{ background: tone }}>
          <div className="h-1.5 w-16 bg-[#e7c98a]" />
          <p className="mt-4 text-[10px] tracking-[0.22em] uppercase">Tome Scholars</p>
          <p className="mt-auto font-serif text-xl leading-tight">{title}</p>
          <p className="mt-2 text-xs text-[#e7c98a]">{level || author}</p>
        </div>
      ) : (
        <Image
          src={src!}
          alt={title}
          fill
          sizes={sizes}
          unoptimized={src!.endsWith(".svg")}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
