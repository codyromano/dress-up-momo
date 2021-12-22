import React, { useEffect, useState } from "react";
import { AccessoryData } from "./constants";

const getImageClassName = (id: string) => `accessory accessory-${id}`;

const preloadImage = async (id: string, imageUrl: string) => {
  const preloader = document.createElement("img");
  preloader.className = getImageClassName(id);

  await new Promise((resolve) => {
    preloader.addEventListener("load", resolve);
    preloader.src = imageUrl;
  });
};

export default function Accessory({
  item,
  isUnlocked
}: {
  item: AccessoryData;
  isUnlocked: boolean;
}) {
  const [currentItem, setCurrentItem] = useState<AccessoryData | null>(null);
  // const [loadedItems, setLoadedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    let setItemTimeout: number;

    setCurrentItem(null);

    const createPreloadAndRenderCallback = (item: AccessoryData) => () => {
      setItemTimeout = window.setTimeout(() => setCurrentItem(item), 1);
      // setLoadedItems((items) => new Set(items).add(item.id));
    };

    preloadImage(item.id, item.imageUrl).then(
      createPreloadAndRenderCallback(item)
    );

    return () => window.clearTimeout(setItemTimeout);
  }, [item]);

  return currentItem != null && isUnlocked ? (
    <img
      alt="Accessory"
      className={getImageClassName(currentItem.id)}
      src={currentItem.imageUrl}
    />
  ) : null;
}
