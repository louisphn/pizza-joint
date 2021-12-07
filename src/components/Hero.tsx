import { FC, useState } from 'react';

import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { AiOutlineRight } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';

import {
  image,
  sentence,
  letter,
  description,
  arrow,
  learnMore,
} from '../variants/heroVariants';
import Loading from './Loading';

const Hero: FC = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  // const rotate = useTransform(currentY, [0, -700], [0, 360]);

  const line1 = "It's not just";
  const line2 = "Food. It's an";
  const line3 = 'Experience.';

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/base');
    }, 2000);
  };

  return (
    <section className="hero">
      <Loading isLoading={loading} />
      <div className="content">
        <motion.h2
          variants={sentence}
          ref={ref}
          initial="hidden"
          animate={inView && 'visible'}
        >
          {line1.split('').map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letter}>
              {char}
            </motion.span>
          ))}
          <br />
          {line2.split('').map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letter}>
              {char}
            </motion.span>
          ))}
          <br />
          {line3.split('').map((char, index) => (
            <motion.span key={`${char}-${index}`} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p
          variants={description as any}
          initial="hidden"
          animate={inView && 'visible'}
        >
          Offer the best PIZZA in the world.
          <br />
          Get one for yourself now.
        </motion.p>
        <motion.div
          className="cta"
          variants={description as any}
          initial="hidden"
          animate={inView && 'visible'}
        >
          {/* <button>Learn More</button> */}
          <button onClick={() => handleClick()}>Order now</button>
          <Link to="about">
            <motion.div
              variants={learnMore}
              whileHover="hover"
              onClick={() => router.push('/')}
            >
              <p>Learn more</p>
              <motion.div variants={arrow}>
                <AiOutlineRight />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
      <motion.img
        variants={image}
        ref={ref}
        initial="hidden"
        animate={inView && 'visible'}
        src="pizza.svg"
        width="480"
        height="480"
      />
    </section>
  );
};

export default Hero;
