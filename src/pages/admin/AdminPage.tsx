import './AdminPage.scss';

import { useEffect, useRef, useState } from 'react';
import Card from '../../components/card/Card';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import axios from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { Fade } from 'react-reveal';
import Header from '../../components/header/Header';

interface Ifood {
  id: string;
  name: string;
  descr: string;
  price: number;
  imgUrl: string;
}

const AdminPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deletefood, setDelete] = useState();
  const [food, setFood] = useState({
    name: '',
    descr: '',
    price: 0,
    imgUrl: '',
  });
  const [imgLink, setImgLink] = useState('');
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setFood((prevstate: any) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
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
  }, [modalActive]);

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files![0];
      if (file) {
        formData.append('image', file);
        const { data } = await axios.post('/file', formData).then();
        setImgLink(data[0].url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async () => {
    try {
      const senddata = {
        ...food,
        price: Number(food.price),
      };
      const { data } = await axios.post('/foods/create', senddata);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setModalActive(false);
    }
  };
  if (isLoading) {
    return <h2>loading</h2>;
  }
  const deleteFood = async (id: string) => {
    try {
      const { data } = await axios.delete(`/foods/${id}`);
    } catch (error) {
      setError(true);
    } finally {
      const { data } = await axios.get('/foods');
      setFoods(data);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className='page-header'>
        <h1>Admin Panel</h1>
      </div>
      <div className='container'></div>
      <div className='addBtn'>
        <button onClick={() => setModalActive(true)}>add Food</button>
      </div>
      <div className='container'>
        <Fade right>
          {foods.map((food: Ifood) => (
            <Card
              onDelete={deleteFood}
              isAdmin={true}
              id={food.id}
              name={food.name}
              price={food.price}
              descr={food.descr}
              imgUrl={food.imgUrl}
              key={food.id}
            />
          ))}
        </Fade>
      </div>
      <Modal isActive={modalActive} setIsActive={setModalActive}>
        <Input label='Food name' setValue={handleChange} name='name' value={food.name} />
        <Input label='Description' setValue={handleChange} name='descr' value={food.descr} />
        <Input label='Price' setValue={handleChange} name='price' value={food.price} />
        <Input label='img' setValue={handleChange} name='imgUrl' value={food.imgUrl} />

        {/* <button onClick={() => useFileRef.current?.click()}>Upload photo</button>
        <input ref={useFileRef} type='file' onChange={handleChangeFile} hidden /> */}
        <div className='footer'>
          <div className='btnWrap'>
            <button className='cancel_btn close_btn' onClick={() => setModalActive(false)}>
              Cancel
            </button>
            <button className='create_btn' onClick={onSubmit}>
              Add food
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default AdminPage;
