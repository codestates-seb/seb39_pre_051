package com.codestates.pre51.users.entity;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.question.entity.Question;
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
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    @Column
    private String userName;

    private String userEmail;

    private String userPassword;

    private LocalDateTime userCreatedAt;
    private String roles;

    @OneToMany(mappedBy = "user")
    private List<Question> userQuestions = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Answer> userAnswers = new ArrayList<>();

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }

}
