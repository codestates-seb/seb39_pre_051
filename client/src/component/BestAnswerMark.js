import styled from 'styled-components';
import axios from 'axios';
import {useDispatch} from'react-redux'
import { readQuestion } from '../redux/slice/questionSlice';

const BestAnswerMark = (props) => {
  const dispatch = useDispatch();

  const handleBestAnswer = async() => {
    console.log('hello')
    console.log(props.questionId)
    await axios.patch(`/questions/${props.questionId}/${props.id}`)
    .then((res)=>console.log(res))
    dispatch(readQuestion(props.questionId))
  }
  
  const handleResetBestAnswer = async() => {
    console.log('hello')
    console.log(props.questionId)
    await axios.patch(`/questions/${props.questionId}/0`)
    .then((res)=>console.log(res))
    dispatch(readQuestion(props.questionId))
  }

  return(
    props.isBestAnswer ? (
    props.isQuestionWriter ? (
      <CheckMarkWrapper onClick={()=>handleResetBestAnswer()}>
      <svg width='36' height='36' viewBox='0 0 36 36' className='bestAnswer' >
        <path d='m6 14 8 8L30 6v8L14 30l-8-8v-8Z'></path>
      </svg>
    </CheckMarkWrapper>
    ) : (
      <CheckMarkWrapper>
      <svg width='36' height='36' viewBox='0 0 36 36' className='bestAnswer' >
        <path d='m6 14 8 8L30 6v8L14 30l-8-8v-8Z'></path>
      </svg>
    </CheckMarkWrapper>
    )
  ) : 
  props.isQuestionWriter ? (
    <CheckMarkWrapper onClick={()=>handleBestAnswer()}>
    <svg width='36' height='36' viewBox='0 0 36 36' className='answer' >
      <path d='m6 14 8 8L30 6v8L14 30l-8-8v-8Z'></path>
    </svg>
  </CheckMarkWrapper>
  ) : (
    <>
    </>
  )
  )
};

const CheckMarkWrapper = styled.div`
  .bestAnswer {
    cursor: ${(props)=>props.isQuestionWriter ? "pointer" : ""};
    fill: #48A868;
  }
  .answer {
    cursor: pointer;
    fill: #2d2d2d;
  }
`;

export default BestAnswerMark;
