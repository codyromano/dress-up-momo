import "./styles.css";
import ReactAudioPlayer from "react-audio-player";
import Accessory from "./Accessory";
import Explore from "./Explore";
import { useState } from "react";
import accessories from "./data/accessories";
import { AccessoryData } from "./constants";
import useLocalStorage from "use-local-storage";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type Game = {
  // Item IDs
  itemsDiscovered: string[];
};

function ViewAccessory({
  item,
  isUnlocked,
  onClickExplore
}: {
  isUnlocked: boolean;
  item: AccessoryData;
  onClickExplore: () => void;
}) {
  return isUnlocked ? (
    <div className="app-content row">
      <strong className="row">{item.title}</strong>
      <p>{item.description}</p>
    </div>
  ) : (
    <div className="app-content">
      <strong className="row">
        {item.title}{" "}
        <span aria-label="locked" role="img">
          🔒
        </span>
      </strong>
      <div className="row">How to unlock this item:</div>
      <ol style={{ marginLeft: "2rem", lineHeight: "200%" }} className="row">
        <li>Go on a date in real life</li>
        <li>Check in at the date location</li>
        <li>A new accessory will appear</li>
      </ol>

      <div className="fluid button-bar">
        <button className="secondary" onClick={onClickExplore}>
          Go on a date
        </button>
      </div>
    </div>
  );
}

const getInitialGameState: () => Game = () => ({
  itemsDiscovered: ["propeller", "chicken"]
});

export default function App() {
  const [savedGameString, setSavedGameString] = useLocalStorage(
    "momoDateNightSavedGame",
    JSON.stringify(getInitialGameState())
  );

  /*
  const [savedGameString, setSavedGameString] = useState<string>(
    JSON.stringify(getInitialGameState())
  );
  */
  const game: Game = JSON.parse(savedGameString);
  const saveGame = (game: Game) => setSavedGameString(JSON.stringify(game));

  const [currentAccessoryIndex, setCurrentAccessoryIndex] = useState<number>(0);

  const [isExploring, setIsExploring] = useState<boolean>(false);
  const [isGettingReady, setIsGettingReady] = useState<boolean>(false);
  const [isMusicMuted, setIsMusicMuted] = useState<boolean>(true);

  const currentItem = accessories[currentAccessoryIndex];
  const isItemUnlocked = game.itemsDiscovered.indexOf(currentItem.id) >= 0;
  // const isItemUnlocked = true;

  const onClickClaimItem = () => {
    const newItemsDiscovered = new Set(game.itemsDiscovered).add(
      currentItem.id
    );

    saveGame({
      ...game,
      itemsDiscovered: Array.from(newItemsDiscovered)
    });

    setIsExploring(false);
  };

  const percentComplete = Math.round(
    (game.itemsDiscovered.length / accessories.length) * 100
  );

  return (
    <>
      {isGettingReady && (
        <ReactAudioPlayer
          muted={isMusicMuted}
          autoPlay
          src="/music/background.mp3"
        />
      )}
      <main>
        {isGettingReady && (
          <div className="top-action-bar app-content">
            Music:&nbsp;
            <button
              onClick={() => {
                setIsMusicMuted((muted) => !muted);
              }}
              className="low-key"
            >
              {isMusicMuted ? "Off" : "On"}
            </button>
          </div>
        )}

        <header className="app-content">
          <h1 className="row">Dress Up Momo</h1>
        </header>

        {!isExploring && (
          <div className="fluid momo-background">
            <div className="fluid row momo-container">
              {isGettingReady && (
                <Accessory isUnlocked={isItemUnlocked} item={currentItem} />
              )}
              <div
                className="momo"
                style={{
                  backgroundImage: "url(/images/momo.jpeg)"
                }}
              />
            </div>
          </div>
        )}

        {isExploring && (
          <Explore
            onClickClaimItem={onClickClaimItem}
            explorationHint={currentItem.explorationHint}
            lat={currentItem.coords[0]}
            long={currentItem.coords[1]}
            onCancel={() => setIsExploring(false)}
          />
        )}

        {isGettingReady && !isExploring && (
          <>
            <div className="app-content game-progress row">
              <div className="game-progress-item game-progress-graphic">
                <CircularProgressbar
                  value={percentComplete}
                  text={`${percentComplete}%`}
                  styles={buildStyles({
                    textSize: "25px"
                  })}
                />
              </div>
              <div className="game-progress-item">
                <strong className="accent">Find items to beat the game</strong>

                <p className="muted">
                  You've discovered {game.itemsDiscovered.length} of{" "}
                  {accessories.length} items.
                </p>
              </div>
            </div>

            <div className="app-content row">
              <div className="exploration-card">
                <ViewAccessory
                  onClickExplore={() => setIsExploring(true)}
                  isUnlocked={isItemUnlocked}
                  item={accessories[currentAccessoryIndex]}
                />
              </div>
            </div>

            <div className="app-content button-bar">
              {currentAccessoryIndex > 0 && (
                <button
                  onClick={() => {
                    setCurrentAccessoryIndex((index) => index - 1);
                  }}
                  className="secondary"
                >
                  Back
                </button>
              )}

              {currentAccessoryIndex < accessories.length - 1 && (
                <button
                  onClick={() => setCurrentAccessoryIndex((index) => index + 1)}
                >
                  Next
                </button>
              )}
            </div>
          </>
        )}

        {!isGettingReady && (
          <>
            <p className="app-content row">
              Momo has a date, but he's not sure what to wear. Will you help him
              pick accessories?
            </p>

            <div className="app-content">
              <button
                onClick={() => {
                  setIsGettingReady(true);
                  setIsMusicMuted(false);
                }}
                className="block-button"
              >
                Get Started
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
