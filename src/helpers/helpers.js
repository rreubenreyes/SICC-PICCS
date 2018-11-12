export const getNewPrivateKey = () => {
  let ans = [];
  for (let i = 0; i < 6; i++) {
    ans.push(Math.floor(Math.random() * 10));
  }
  return ans.join('');
};
export const getRandomGameId = data => {
  const index = Math.floor(Math.random() * data.length);
  return data[index].id;
};

export const checkSubmission = ({ keyword, results, model }) => {
  if (model === 'food' || model === 'general') {
    return (
      results.outputs[0].data.concepts.findIndex(
        result => result.value > 0.85 && result.name === keyword
      ) > -1
    );
  }
  /*
   * Makes sure to include all types of the keyword. For example, if the keyword is 'blue',
   * we want to count both LightBlue and CornflowerBlue.
   */
  if (model === 'color') {
    return (
      results.outputs[0].data.colors
        .filter(result =>
          result.w3c.name.toLowerCase().includes(keyword.toLowerCase())
        )
        .reduce((results, acc) => acc + results.value, 0) > 0.2
    );
  }
};
