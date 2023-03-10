import './MenuPage.scss';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import axios from '../../axios';
import { Fade } from 'react-reveal';

interface Ifood {
  id: string;
  name: string;
  descr: string;
  price: number;
  imgUrl: string;
}

const Menu = () => {
  const [foods, setFoods] = useState<Ifood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fatchFoods = async () => {
    try {
      const { data } = await axios.get('/foods');
      setFoods(data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fatchFoods();
  }, []);

  return (
    <div className='container'>
      {foods.map((food: Ifood) => (
        <Fade right key={food.id}>
          <Card
            isAdmin={false}
            id={food.id}
            name={food.name}
            price={food.price}
            descr={food.descr}
            imgUrl={food.imgUrl}
            key={food.id}
          />
        </Fade>
      ))}
    </div>
  );
};
export default Menu;
