export const getNewPrivateKey = () => {
  let ans = [];
  for (let i = 0; i < 6; i++) {
    ans.push(Math.floor(Math.random() * 10));
  }
  return ans.join("");
};

export const getRandomGameId = data => {
  const index = Math.floor(Math.random() * data.length);
  return data[index].id;
};
