import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { readQuestion } from '../redux/slice/questionSlice';

const BestAnswerMark = (props) => {
  const themeState = useSelector((state) => state.themeSlice).theme;
  const dispatch = useDispatch();
  const handleBestAnswer = async () => {
    await axios
      .patch(`/questions/${props.questionId}/${props.id}`)
      .then((res) => res);
    dispatch(readQuestion(props.questionId));
  };
  const handleResetBestAnswer = async () => {
    await axios.patch(`/questions/${props.questionId}/0`).then((res) => res);
    dispatch(readQuestion(props.questionId));
  };

  return props.isBestAnswer ? (
    props.isQuestionWriter ? (
      <CheckMarkWrapper
        themeState={themeState}
        onClick={() => handleResetBestAnswer()}
      >
        <svg width='36' height='36' viewBox='0 0 36 36' className='bestAnswer'>
          <path d='m6 14 8 8L30 6v8L14 30l-8-8v-8Z'></path>
        </svg>
      </CheckMarkWrapper>
    ) : (
      <CheckMarkWrapper themeState={themeState}>
        <svg width='36' height='36' viewBox='0 0 36 36' className='bestAnswer'>
          <path d='m6 14 8 8L30 6v8L14 30l-8-8v-8Z'></path>
        </svg>
      </CheckMarkWrapper>
    )
  ) : props.isQuestionWriter ? (
    <CheckMarkWrapper
      themeState={themeState}
      onClick={() => handleBestAnswer()}
    >
      <svg width='36' height='36' viewBox='0 0 36 36' className='answer'>
        <path d='m6 14 8 8L30 6v8L14 30l-8-8v-8Z'></path>
      </svg>
    </CheckMarkWrapper>
  ) : (
    <></>
  );
};

const CheckMarkWrapper = styled.div`
  .bestAnswer {
    cursor: ${(props) => (props.isQuestionWriter ? 'pointer' : '')};
    fill: ${(props) => (props.themeState === 'light' ? '#48a868' : '#62b47d')};
  }
  .answer {
    cursor: pointer;
    fill: ${(props) => (props.themeState === 'light' ? '#2d2d2d' : '#696f75')};
  }
`;

export default BestAnswerMark;
