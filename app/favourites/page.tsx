"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

//Interfaces
import { Gifs } from "@/interfaces/gifs";
import { Stickers } from "@/interfaces/stickers";
import DataFeed from "@/components/DataFeed/DataFeed";

export default function Page() {
  const [gifs, setGifs] = useState<Gifs>({ data: [] });
  const [stickers, setStickers] = useState<Stickers>({ data: [] });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGifs = localStorage.getItem("userGifs");
      const storedStickers = localStorage.getItem("userStickers");

      if (storedGifs) {
        setGifs(JSON.parse(storedGifs));
      }
      if (storedStickers) {
        setStickers(JSON.parse(storedStickers));
      }
    }
  }, []);

  console.log("gifs", gifs);

  return (
    <div className="page">
      <div className="headline-container">
        <Image src="/images/heart.svg" alt="trending" width={40} height={40} />
        <h2 className="headline-container__text">Favourites</h2>
      </div>
      <div
        style={{
          background: "#a0153e",
          padding: "1rem",
          borderRadius: "24px",
          color: "#fff",
          margin: "1rem auto",
        }}
      >
        <h4>
          Your favorites are currently stored in your browser`s local storage.
          Creating an account will allow you to save them permanently allowing
          you to access then on any device.
        </h4>
      </div>
      {gifs.data.length > 0 || gifs.data.length > 0 ? (
        <DataFeed data={{ gifs: gifs, stickers: stickers }} />
      ) : (
        <h2 style={{ textAlign: "center" }}>
          You don`t have any favourites yet!
        </h2>
      )}
    </div>
  );
}
