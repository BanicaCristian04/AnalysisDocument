const DiffMatchPatch = require("diff-match-patch");

exports.Diff = (text1, text2) => {
  const dmp = new DiffMatchPatch();
  const diffs = dmp.diff_main(text1, text2);
  dmp.diff_cleanupSemantic(diffs);
  return diffs;
};

exports.formatDiffsAsHTML = (diffs) => {
  return diffs
    .map((diff) => {
      switch (diff[0]) {
        case 1:
          return `<span style="background-color: lightgreen;">${diff[1]}</span>`;
        case -1:
          return `<span style="background-color: pink;">${diff[1]}</span>`;
        default:
          return diff[1];
      }
    })
    .join("");
};
