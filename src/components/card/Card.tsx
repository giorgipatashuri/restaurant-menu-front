import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import Input from '../input/Input';
import Modal from '../modal/Modal';
import './card.scss';

interface cardProps {
  id: string;
  name: string;
  descr: string;
  price: number;
  imgUrl: string;
  isAdmin: boolean;
  onDelete?: any;
}

const Card: FC<cardProps> = ({ id, name, descr, price, imgUrl, onDelete, isAdmin }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [food, setFood] = useState({
    name: '',
    descr: '',
    price: 0,
    imgUrl: '',
  });
  useEffect(() => {
    setFood({
      name,
      descr,
      price,
      imgUrl,
    });
  }, []);
  const navigate = useNavigate();
  const handleChange = (e: any) => {
    setFood((prevstate: any) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async () => {
    try {
      const senddata = {
        ...food,
        price: Number(food.price),
      };
      const { data } = await axios.post(`/foods/update/${id}`, senddata);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };
  return (
    <>
      {/* <Modal isActive={showEdit} setIsActive={setShowEdit}>
        <Input name='name' value={food.name} setValue={handleChange} label='name' />
        <Input label='Description' setValue={handleChange} name='descr' value={food.descr} />
        <Input label='Price' setValue={handleChange} name='price' value={food.price} />
        <Input label='img' setValue={handleChange} name='imgUrl' value={food.imgUrl} />
        <div className='footer'>
          <div className='btnWrap'>
            <button className='cancel_btn close_btn' onClick={() => setShowEdit(false)}>
              Cancel
            </button>
            <button className='create_btn' onClick={onSubmit}>
              edit
            </button>
          </div>
        </div>
      </Modal> */}
      <div className='card'>
        <img src={imgUrl} alt={name} />
        <div className='card-content'>
          <h2>{name}</h2>
          <h4>{price} ლარი</h4>
          <p>{descr}</p>
        </div>
        {isAdmin && (
          <div className='footer'>
            <div className='btnWrap'>
              <button
                className='cancel_btn close_btn'
                onClick={() => {
                  setShowEdit(true);
                  navigate(`/edit/${id}`);
                }}>
                Edit
              </button>
              <button className='create_btn' onClick={() => onDelete(id)}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Card;
