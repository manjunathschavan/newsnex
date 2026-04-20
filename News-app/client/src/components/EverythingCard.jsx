import React from "react";

const fallbackImg = "https://placehold.co/400x200?text=No+Image";

function Card(props) {
  const date = props.publishedAt
    ? new Date(props.publishedAt).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
      })
    : "Unknown date";

  return (
    <div className="everything-card flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300" style={{ background: "var(--card-bg)" }}>
      <img
        src={props.imgUrl || fallbackImg}
        alt={props.title}
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = fallbackImg; }}
      />
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h2 className="title text-base font-bold leading-snug line-clamp-3">{props.title}</h2>
        <p className="text-sm leading-relaxed opacity-80 line-clamp-3">
          {props.description || "No description available."}
        </p>
        <div className="mt-auto flex flex-col gap-1 text-xs opacity-70">
          <span><span className="font-semibold">Source: </span>
            <a href={props.url} target="_blank" rel="noreferrer" className="underline hover:opacity-100">
              {props.source?.substring(0, 60)}
            </a>
          </span>
          {props.author && <span><span className="font-semibold">Author: </span>{props.author}</span>}
          <span><span className="font-semibold">Published: </span>{date}</span>
        </div>
        <a
          href={props.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 text-center text-sm font-semibold py-2 px-4 rounded-lg transition-opacity duration-200 hover:opacity-80"
          style={{ background: "var(--heading)", color: "var(--btn-color)" }}
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default Card;
