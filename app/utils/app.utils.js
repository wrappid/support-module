export function getLabel(string = "") {
  if (string) {
    string = string?.replace(/\s/g, "");
    return (string?.substring(0, 1)?.toUpperCase() + string?.substring(1))
      ?.replace(/([A-Z])/g, " $1")
      ?.trim();
  } else {
    return "";
  }
}
  
export function getFullName(data) {
  let name = "";
  
  if (data?.firstName) {
    name += data?.firstName;
  }
  if (data?.middleName) {
    name += " " + data?.middleName;
  }
  if (data?.lastName) {
    name += " " + data?.lastName;
  }
  return name && name.length > 0 ? name : "Unnamed";
}