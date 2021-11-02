import { FC, useState, useCallback } from 'react';

type Props = {
  list: {
    image: string;
    list: {
      title: string;
      description: string;
      hoverSrc: string;
    }[];
  };
};

const FeatureCards: FC<Props> = ({ list }) => {
  const [image, setImage] = useState(list.image);

  const handleHover = useCallback(
    (itemImage) => {
      setImage(itemImage);
    },
    [setImage]
  );

  return (
    <div className="feature_card__container">
      <div className="feature_card__image">
        <img src={image} alt={'pizza'} />
      </div>
      <ul>
        {list.list.map((item) => (
          <li
            key={item.title}
            className="feature_card__contents"
            onMouseOver={() => handleHover(item.hoverSrc)}
            onMouseOut={() => handleHover(list.image)}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCards;
