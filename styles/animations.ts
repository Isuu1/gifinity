export const overlayAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
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

export const autocompleteContainerAnimation = {
  hidden: {
    opacity: 0,
    maxHeight: 0,
  },
  visible: {
    opacity: 1,
    maxHeight: 300, //Can be any value as long as it fits content
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    maxHeight: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export const userModalAnimation = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "200px",
    transition: {
      ease: "linear",
      duration: 0.2,
      delayChildren: 0.1,
      staggerChildren: 0.02,
    },
  },
  exit: { opacity: 0, height: 0 },
};

export const userModalMenuItemsAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
