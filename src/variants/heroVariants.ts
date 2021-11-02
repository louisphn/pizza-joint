export const image = {
  hidden: {
    x: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: 0,
    },
  },
  visible: {
    x: 80,
    opacity: 1,
    transition: {
      delay: 3,
      duration: 0.5,
    },
  },
};

export const sentence = {
  hidden: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0,
    },
  },
  visible: {
    opacity: 1,
    y: -40,
    transition: {
      when: 'beforeChildren',
      delay: 1.5,
      duration: 0.3,
      staggerChildren: 0.08,
    },
  },
};

export const letter = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const description = {
  hidden: {
    textAlign: 'left',
    opacity: 0,
    y: 0,
  },
  visible: {
    textAlign: 'left',
    opacity: 1,
    y: -40,
    transition: {
      delay: 5,
    },
  },
};

export const learnMore = {
  hover: {
    x: 8,
  },
};

export const arrow = {
  hover: {
    x: [0, 8],
    opacity: [1, 0.5],
    transition: {
      yoyo: 1,
    },
  },
};
