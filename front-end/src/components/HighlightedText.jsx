import React from "react";

const HighlightedText = ({ text, searchText, isMoney }) => {
  if (!text || text.trim() === "") {
    return <></>;
  } else if (!searchText || searchText.trim() === "") {
    return isMoney ? (
      <>
        {Number.parseInt(text).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </>
    ) : (
      <>{text}</>
    );
  }

  const escapedSearchText = searchText
    .replaceAll("/[-\\^$*+?.()|[]{}]/g", "\\$&")
    .replaceAll(" ", "|");
  const regEx = new RegExp(`(${escapedSearchText})`, "gi");
  const terms = text.split(regEx);

  // console.log(searchText, terms, isMoney);
  console.log(terms);

  return (
    <div>
      {isMoney && (
        <span style={{ backgroundColor: "#FFFF00" }}>
          {Number.parseInt(text).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      )}
      {!isMoney &&
        terms.map((term, index) =>
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
