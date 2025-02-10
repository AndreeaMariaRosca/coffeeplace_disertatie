import { BigHead } from "@bigheads/core";

export default function AvatarIcon() {

  return (
    <div style={{ display: "flex", height: "100%", width: "200px" }}>
      <BigHead
        clothing="dress"
        eyes="happy"
        mouth="openSmile"
        facialHair="none"
      />

    </div>
  );
}
