import styled from 'styled-components';
import {useDispatch,useSelector } from 'react-redux';
import {toggleTheme} from '../redux/slice/themeSlice'

const DarkModeSwitch = () => {
  const themeState = useSelector((state)=>state.themeSlice).theme
  const dispatch = useDispatch();
  const handleToggleTheme = () => {
    dispatch(toggleTheme())
}
  return (
    <CheckBoxWrapper>
      <CheckBox id='checkbox' type='checkbox'  className={themeState==='light' ? 'toggle': 'toggle darkmode'  } themeState={themeState} onClick={handleToggleTheme}/>
      <CheckBoxLabel htmlFor='checkbox' />
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 2rem;;
  width: 4.2rem;
  height: 2.6rem;
  border-radius: 1.5rem;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    margin: 0.3rem;
    background: #ffffff;
    box-shadow: 0.1rem 0.3rem 0.3rem 0.1rem rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 1.5rem;
  width: 4.2rem;
  height: 2.6rem;
  &.darkmode + ${CheckBoxLabel} {
    background: var(--color-orange);
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 1.8rem;
      height: 1.8rem;
      margin-left: 2.1rem;
      transition: 0.2s;
    }
  }
`;

export default DarkModeSwitch;
