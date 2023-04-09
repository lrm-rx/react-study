/** vite的特殊性, 需要处理图片 */
export const getImageUrl = (name: string) => {
  try {
    // const handlePath = imgPath.replace("@", "..");
    // return new URL(handlePath, import.meta.url).href;
    const path = new URL(`../assets/images/${name}`, import.meta.url).href;
    console.log(":::", path);
    console.log(":::", name);
    return new URL(`../assets/images/login/${name}.png`, import.meta.url).href;
  } catch (error) {
    console.warn(error);
  }
};
