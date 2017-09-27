module.exports = longDate => {
  let date = new Date(longDate);
  let day = date.getDate();
  let month = date.getMonth();

  day = day < 10 ? '0' + day : day;
  month = month < 10 ? '0' + month : month;

  return date.getFullYear() + '-' + month + '-' + day;
};
