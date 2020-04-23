export const saveLocally = (preservation, name) => {
  const json = JSON.stringify(preservation);
  localStorage.setItem(name, json);
};

export const loadFromLocal = name => {
  const json = localStorage.getItem(name);
  return JSON.parse(json);
};
