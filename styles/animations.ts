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

export const modalBackdropAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const modalAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

export const errorAnimation = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};
