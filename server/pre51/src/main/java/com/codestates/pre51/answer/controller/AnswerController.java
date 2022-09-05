package com.codestates.pre51.answer.controller;

import com.codestates.pre51.answer.dto.AnswerDTO;
import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.mapper.AnswerMapper;
import com.codestates.pre51.answer.service.AnswerService;

import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.answercomment.service.AnswerCommentService;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.service.QuestionService;
import com.codestates.pre51.questionLikes.entity.QuestionLikes;
import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.codestates.pre51.questioncomment.service.QuestionCommentService;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final QuestionService questionService;

    private final AnswerCommentService answerCommentService;

    private final QuestionCommentService questionCommentService;
    private final UserService userService;


    @PostConstruct
    public void init()   {

        // ****************************************** 1번 게시물 ******************************************
        User user = User.builder()
                .userId(0)
                .userName("김코딩" + 11)
                .userEmail("test" + 11 + "@gmail.com")
                .userPassword("00000000" + 11)
                .userCreatedAt(LocalDateTime.now())
                .userQuestions(new ArrayList<>())
                .build();
        userService.createUser(user);

        Question question = Question.builder()
                .questionWriterId(11)
                .questionTitle("spring boot에서 Controller 의 역할")
                .questionContent("spring boot를 처음 공부하고 있는데, controller의 역할이 뭔지 잘 이해가 안갑니다. 알려주세요 ㅠㅠ")
                .questionCreatedAt(LocalDateTime.now())
                .questionWriter(user)
                .questionLikes(new QuestionLikes())
                .build();
        questionService.createQuestion(question);

        QuestionComment questionComment = QuestionComment.builder()
                .questionCommentWriterId(1)
                .questionCommentContent("저도 궁금했는데 얼른 답변이 달렸으면 좋겠네요")
                .questionCommentCreatedAt(LocalDateTime.now())
                .questionComments(question)
                .questionCommentWriter(user)
                .build();
        questionCommentService.createQuestionComment(questionComment);

        Answer answer = Answer.builder()
                .answerContent("저도 잘 모르겠네요 내공냠냠")
                .answerWriterId(2)
                .answerCreatedAt(LocalDateTime.now())
                .answerQuestions(question)
                .answerWriter(user)
                .build();
        answerService.createAnswer(answer);

        AnswerComment answerComment = AnswerComment.builder()
                .answerCommentWriterId(3)
                .answerComments(answer)
                .answerCommentContent("이런 댓글은 삭제해주세요.")
                .answerCommentWriter(user)
                .answerCommentCreatedAt(LocalDateTime.now())
                .build();
        answerCommentService.createAnswerComment(answerComment);

        answer = Answer.builder()
                .answerContent("Controller는 MVC 패턴의 C에 해당하고, 주로 사용자의 요청을 처리 한 후 지정된 뷰에 모델 객체를 넘겨주는 역할을 수행한다. 지정된 뷰에 모델 객체를 넘겨주는 역할은 두 가지로 나누어 설명할 수 있다. 1. 사용자들이 웹브라우저에서 'URI *'로 요청을 보내면, 그 요청을 컨트롤러가 받게된다. 2. 요청에 대한 응답(View)을 반환한다.")
                .answerWriterId(4)
                .answerCreatedAt(LocalDateTime.now())
                .answerQuestions(question)
                .answerWriter(user)
                .build();
        answerService.createAnswer(answer);

        answerComment = AnswerComment.builder()
                .answerCommentWriterId(5)
                .answerComments(answer)
                .answerCommentContent("친절한 답변 감사합니다.")
                .answerCommentCreatedAt(LocalDateTime.now())
                .answerCommentWriter(user)
                .build();
        answerCommentService.createAnswerComment(answerComment);

        // ****************************************** 2번 게시물 ******************************************

        question = Question.builder()
                .questionWriterId(0)
                .questionTitle("Spring Boot JPA 질문드립니다")
                .questionContent("현재 프리 프로젝트 진행 중 JPA 관련하여 질문드립니다.\n" +
                        "\n" +
                        "Question과 Answer, Comment 세가지 도메인으로 개발하고 있습니다.\n" +
                        "\n" +
                        "Question은 Answer, Comment 로 이루어진 List 를,\n" +
                        "Answer 은 Comment 로 이루어진 list 를 가지도록 엔티티 맵핑을 하였습니다.\n" +
                        "\n" +
                        "문제는 POSTMAN을 통해 데이터 조회 결과에 answer의 List 가 보이지 않습니다.")
                .questionCreatedAt(LocalDateTime.now())
                .questionWriter(user)
                .build();
        questionService.createQuestion(question);

        questionComment = QuestionComment.builder()
                .questionCommentWriterId(1)
                .questionCommentContent("질문에 코드를 첨부해주세요")
                .questionCommentCreatedAt(LocalDateTime.now())
                .questionComments(question)
                .questionCommentWriter(user)
                .build();
        questionCommentService.createQuestionComment(questionComment);

        answer = Answer.builder()
                .answerContent("Question, Answer 각 Entity에 해당하는 @OneToMany 의 @JsonIgnore를 제거해 보시기 바랍니다" +
                        "(해당 애노테이션이 붙어 있으면 Json으로 파싱할때 그 부분은 Json 처리가 되지 않기 때문에 문제가 발생합니다.)")
                .answerWriterId(4)
                .answerCreatedAt(LocalDateTime.now())
                .answerQuestions(question)
                .answerWriter(user)
                .build();
        answerService.createAnswer(answer);

        answerComment = AnswerComment.builder()
                .answerCommentWriterId(5)
                .answerComments(answer)
                .answerCommentContent("말씀하신 @JsonIgnore 어노테이션이 문제였습니다. " +
                        "Answer 엔티티에 붙어있던 answerComments 리스트에 어노테이션을 붙여놔서 보이지 않았던 것 같습니다.")
                .answerCommentCreatedAt(LocalDateTime.now())
                .answerCommentWriter(user)
                .build();
        answerCommentService.createAnswerComment(answerComment);

        // ****************************************** 3번 게시물 ******************************************

        question = Question.builder()
                .questionWriterId(1)
                .questionTitle("데일리 코딩 48번 질문있습니다. ")
                .questionContent("큐를 이용한, 너비우선탐색으로 모든 조합을 구하는 로직을 이용했습니다. 시간이 초과 이슈가 있어서, 탐색하기전에 오름차순으로 정렬을하여 조합의 합이 bound를 넘어서면 탐색을 멈추게 했습니다. 시간초과 문제가 많이 발생하는데, 어떻게 접근하는게 좋을까요? 약간의 조언을 얻을 수 있다면 좋겠습니다.")
                .questionCreatedAt(LocalDateTime.now())
                .questionWriter(user)
                .build();
        questionService.createQuestion(question);

        answer = Answer.builder()
                .answerContent("현재 48번 문제의 경우, 부분집합의 합을 구하는 대표적인 문제입니다. 지금 작성해주신 코드는, 해당 입력된 배열의 크기에 따라 모든 부분집합을 구하면서 결과를 탐색해 나가는 과정을 거치고 있습니다. 현재 이미 계산된 값도 다시 while문을 통해 계산하고, 큐에 저장하는 과정을 거치고 있습니다.배열의 크기가 늘어날수록 큐에 데이터가 쌓이는 양이 늘어나게 됩니다. 배열이 커질수록 결과물을 찾아내는데 시간이 기하급수적으로 증가하게 됩니다.")
                .answerWriterId(4)
                .answerCreatedAt(LocalDateTime.now())
                .answerQuestions(question)
                .answerWriter(user)
                .build();
        answerService.createAnswer(answer);

        // ****************************************** 4번 게시물 ******************************************

        question = Question.builder()
                .questionWriterId(1)
                .questionTitle("WSL Linux에 생성한 자바 프로젝트 실행 문제")
                .questionContent("wsl linux쪽에서 작업을 해서 개발 관련 프로그램이나 프로젝트 등을 linux쪽에 두고 관리하고 있습니다. " +
                        "자바와 IntelliJ를 처음 사용해보아서 윈도우에 설치하고 프로젝트 생성은 linux쪽에 생성하고 IntelliJ로 해당 프로젝트를 열어서 " +
                        "실행했을 때 제대로 실행되지 않았습니다. " +
                        "wsl 환경에서 intelliJ를 통해 Java를 실행하려면 따로 환경설정을 해주어야 하는 것 같은데 " +
                        "앞으로 진행할 커리큘럼에서 사용하는 프로그램들이 다 윈도우 개발환경에서 이루어지는지 궁금합니다.")
                .questionCreatedAt(LocalDateTime.now())
                .questionWriter(user)
                .build();
        questionService.createQuestion(question);
    }

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper, QuestionService questionService, AnswerCommentService answerCommentService, QuestionCommentService questionCommentService, UserService userService){
        this.answerMapper=answerMapper;
        this.answerService=answerService;
        this.questionService = questionService;
        this.answerCommentService = answerCommentService;
        this.questionCommentService = questionCommentService;
        this.userService = userService;
    }

    @GetMapping("")
    @ApiOperation(value="DB에 있는 모든 답변 조회" , notes="사용 X POSTMAN 응답 확인용")
    public ResponseEntity getAnswers(){
        List<Answer> answers = answerService.findAnswers();
        return new ResponseEntity<>(
                answerMapper.answersToAnswerResponses(answers),
                HttpStatus.OK);
    }

    @PostMapping("/{question-id}")
    @ApiOperation(value="답변_생성" , notes="답변-작성자-식별자, 답변-내용 필요")
    public ResponseEntity postAnswer(@RequestBody AnswerDTO.Post requestBody,
                                     @PathVariable("question-id") @ApiParam(name = "질문_식별자")long question_id){
        Answer answer = answerMapper.answerPostToAnswer(requestBody);
        long answerWriterId = answer.getAnswerWriterId();
        Question question = questionService.findQuestion(question_id);
        answer.setAnswerQuestions(question);

        Answer createdAnswer = answerService.createAnswer(answer,answerWriterId);
        AnswerDTO.Response response = answerMapper.answerToAnswerResponse(createdAnswer);

        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}/edit")
    @ApiOperation(value="답변-수정" , notes="답변-식별자, 답변-내용 필요")
    public ResponseEntity patchAnswer(
            @PathVariable("answer-id") @ApiParam(name = "답변_식별자") @Positive long answerId,
            @RequestBody AnswerDTO.Patch requestBody){
        requestBody.setAnswerId(answerId);
        Answer answer =
                answerService.updateAnswer(answerMapper.answerPatchToAnswer(requestBody));


        return new ResponseEntity<>(
                new SingleResponseDTO<>(answerMapper.answerToAnswerResponse(answer)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    @ApiOperation(value="답변-삭제" , notes="답변-식별자 필요")
    public ResponseEntity deleteQuestion(
            @PathVariable("answer-id") @ApiParam(name = "답변_식별자") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
