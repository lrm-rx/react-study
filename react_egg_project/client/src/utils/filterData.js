export default function FilterData(sourceData = [], targetId = "") {
  return sourceData.find((item) => item.value === targetId);
}
