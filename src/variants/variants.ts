export const homeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      delay: 1.5,
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};

export const homeButtonVariants = {
  visible: {
    background: '#ff8e3c',
    color: '#fff',
    transition: {
      delay: 2,
    },
  },
  hover: {
    scale: 1.1,
    opacity: 1,
    background: '#2cb67d',
    border: '2px solid #2cb67d',
    transition: {
      duration: 0.3,
    },
  },
};

export const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      delay: 0.5,
    },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};

export const orderContainerVariants = {
  hidden: {
    y: -16,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      delay: 0.5,
      when: 'beforeChildren',
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
};
export const listItemVariants = {
  hidden: {
    scale: 1,
    color: '#fff',
  },
  selected: {
    scale: 1,
    color: '#fbdd74',
  },
  hover: {
    scale: 1.3,
    originX: 0,
    color: '#fbdd74',
  },
  transition: { type: 'spring', stiffness: 300 },
};

export const buttonVariants = {
  hidden: {
    content: 'Next',
  },
  hover: {
    content: '',
    scale: 1,
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
};

export const nextButton = {
  hidden: {
    width: 0,
    x: -50,
  },
  hover: {
    width: '100%',
    x: 0,
    transition: {
      ease: [0.785, 0.135, 0.15, 0.86],
    },
  },
};

export const nextColor = {
  hidden: {
    x: -50,
  },
  hover: {
    width: '100%',
    x: 0,
    transition: {
      type: 'tween',
    },
  },
};

export const nextVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
    },
  },
  hover: {
    color: '#010101',
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const backVariants = {
  hover: {
    color: '#fbdd74',
  },
};

export const arrowVariants = {
  hover: {
    color: '#fbdd74',
    x: -4,
    origin: 0,
    scale: [1, 1.1, 1.3],
    opacity: [1, 0.5, 0],
    transition: {
      duration: 1,
      yoyo: Infinity,
    },
  },
};
