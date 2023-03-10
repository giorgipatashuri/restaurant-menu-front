import { useEffect, useState } from 'react';
import './EditPage.scss';
import Input from '../../components/input/Input';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

interface Ifood {
  id: string;
  name: string;
  descr: string;
  price: number;
  imgUrl: string;
}

const EditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState({
    name: '',
    descr: '',
    price: 0,
    imgUrl: '',
  });
  const [loading, setLoading] = useState(true);
  const fatchFood = async (id: string) => {
    try {
      const { data } = await axios.get(`/foods/${id}`);
      setFood(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: any) => {
    setFood((prevstate: any) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    fatchFood(id!);
  }, []);
  const onSubmit = async () => {
    try {
      const senddata = {
        ...food,
        price: Number(food.price),
      };
      const { data } = await axios.post(`/foods/update/${id}`, senddata);
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/admin');
    }
  };
  if (loading) {
    return (
      <div className='container'>
        <h3>loading..</h3>
      </div>
    );
  }
  return (
    <div className='inputContainer'>
      <Input label='Food name' setValue={handleChange} name='name' value={food.name} />
      <Input label='Description' setValue={handleChange} name='descr' value={food.descr} />
      <Input label='Price' setValue={handleChange} name='price' value={food.price} />
      <Input label='img' setValue={handleChange} name='imgUrl' value={food.imgUrl} />
      <div className='footer'>
        <div className='btnWrap'>
          <button
            className='cancel_btn close_btn'
            onClick={() => {
              navigate('/admin');
            }}>
            Cancel
          </button>
          <button className='create_btn' onClick={onSubmit}>
            update
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditPage;
