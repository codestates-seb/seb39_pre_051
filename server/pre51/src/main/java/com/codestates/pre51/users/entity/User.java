package com.codestates.pre51.users.entity;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "users")
public class User {

    @Id
    @Column(name="user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    @Column
    private String userName;

    private String userEmail;

    private String userPassword;

    private LocalDateTime userCreatedAt;
    private String roles;

    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "questionWriter")
    @JsonIgnore
    private List<Question> userQuestions = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "answerWriter")
    @JsonIgnore
    private List<Answer> userAnswers = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "questionCommentWriter")
    @JsonIgnore
    private List<QuestionComment> userQuestionComments = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.ALL},mappedBy = "answerCommentWriter")
    @JsonIgnore
    private List<AnswerComment> userAnswerComments = new ArrayList<>();

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

}
