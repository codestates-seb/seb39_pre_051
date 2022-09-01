package com.codestates.pre51.users.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "MEMBER")
public class User {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long memberId;

    @Column
    private String memberName;

    @Column(unique = true)
    private String memberEmail;

    private String memberPassword;

    private String memberToken;

    private LocalDateTime memberCreatedAt;
}
