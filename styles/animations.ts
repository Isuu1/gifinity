export const overlayAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.8 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const categoriesMenuAnimation = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.2, delayChildren: 0.1, staggerChildren: 0.02 },
  },
  exit: { opacity: 0, height: 0 },
};

export const categoryMenuItemsAnimation = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
