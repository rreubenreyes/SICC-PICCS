export const getNewPrivateKey = () => {
  let ans = [];
  for (let i = 0; i < 6; i++) {
    ans.push(Math.floor(Math.random() * 10));
  }
  return ans.join("");
};

export const checkSubmission = ({ keyword, results, model }) => {
  if (model === "food" || model === "general") {
    return (
      results.outputs[0].data.concepts.findIndex(
        result => result.value > 0.85 && result.name === keyword
      ) > -1
    );
  }
  if (model === "color") {
    return (
      results.outputs[0].data.colors.findIndex(
        result =>
          result.w3c.name.toLowerCase() === keyword.toLowerCase() &&
          result.value > 0.8
      ) > -1
    );
  }
};
