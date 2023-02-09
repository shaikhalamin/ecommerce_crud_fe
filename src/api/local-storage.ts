export const getLocalSession = () => {
  const session = JSON.parse(localStorage.getItem("session") as string);
  return session;
};

export const removeLocalSession = () => {
  localStorage.removeItem("session");
};
