import React from "react";
import useDistanceFromUser from "./useDistanceFromUser";

// @ts-ignore
import commaNumber from "comma-number";
import Loader from "react-loader-spinner";

export default function Explore({
  onCancel,
  onClickClaimItem,
  explorationHint,
  lat,
  long
}: {
  explorationHint: string;
  lat: number;
  long: number;
  onClickClaimItem: () => void;
  onCancel: () => void;
}) {
  const distance = useDistanceFromUser(lat, long);

  const distanceForDisplay =
    distance === null ? (
      <>
        <Loader type="Grid" color="#00BFFF" height={80} width={80} />
      </>
    ) : (
      `${commaNumber(Math.ceil(distance))} ft`
    );

  const isWithinRange = distance != null && distance <= 250;

  return (
    <div className="explore-page">
      <div className="app-content row">
        <strong className="accent">Travel closer to the date location</strong>
      </div>

      {distance === null && (
        <div className="app-content row">Waiting for geolocation...</div>
      )}

      <div className="app-content row">
        <div className="card app-content exploration-card">
          <span className="hero">{distanceForDisplay}</span>
        </div>
      </div>

      <div className="app-content row muted">
        <strong>Hint:</strong> {explorationHint}
      </div>

      <div className="row">&nbsp;</div>

      <div className="app-content row button-bar">
        <button onClick={onCancel} className="button-block secondary">
          Cancel
        </button>
        <button
          onClick={onClickClaimItem}
          disabled={!isWithinRange}
          className="block"
        >
          {isWithinRange ? "Claim Item!" : "Move Closer"}
        </button>
      </div>
    </div>
  );
}
