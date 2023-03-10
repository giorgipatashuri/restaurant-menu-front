import './Modal.scss';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface ModalProps {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isActive, setIsActive, children }) => {
  return (
    <div className={isActive ? 'modal active' : 'modal'} onClick={() => setIsActive(false)}>
      <div className='modalContent' onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default Modal;
