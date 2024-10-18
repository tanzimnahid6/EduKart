export const formateDate = (data) => {
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(data);
  return formattedDate;
};
