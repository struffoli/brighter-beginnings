import React from "react";

const HighlightedText = ({ text, searchText }) => {
  if (!text || text.trim() === "") {
    return <></>;
  } else if (!searchText || searchText.trim() === "") {
    return <>{text}</>;
  }
  const escapedSearchText = searchText.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&").replace(" ", "|");
  const regEx = new RegExp(`(${escapedSearchText})`, "gi");
  const terms = text.split(regEx);

  return (
    <div>
      {terms.map((term, index) =>
        regEx.test(term) && searchText !== "" ? (
          <span key={index} style={{ backgroundColor: "#FFFF00" }}>
            {term}
          </span>
        ) : (
          <React.Fragment key={index}>{term}</React.Fragment>
        )
      )}
    </div>
  );
};
export default HighlightedText;
