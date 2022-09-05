package com.codestates.pre51.users.service;

import com.codestates.pre51.users.dto.UserPatchDto;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public User createUser(User user) {

        // 회원 미존재
        if (user == null || user.getUserEmail() == null) {
            throw new RuntimeException("Invalid arguments");
        }

        // 기존 이메일 존 / 회원 생성 실패
        User findUser = userRepository.findByUserEmail(user.getUserEmail());
        if (findUser != null)
            throw new IllegalStateException("이미 가입된 회원입니다.");

        //user.setUserPassword(bCryptPasswordEncoder.encode(user.getUserPassword()));
        user.setRoles("ROLE_USER");
        user.setUserImgUrl("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png");
        // DB에 회원 정보 저장
        return userRepository.save(user);
    }

    public User getByCredentials(String email, String password) {
        return userRepository.findByUserEmailAndUserPassword(email, password);
    }

    public void updateUser(long userId, UserPatchDto user) {
        User findUser = userRepository.findById(userId).get();
        if (user.getUserName() != null)
            findUser.setUserName(user.getUserName());
        if (user.getUserPassword() != null)
            findUser.setUserPassword(user.getUserPassword());
    }

    public User findUser(long userId) {
        Optional<User> optional = userRepository.findById(userId);

        return optional.get();
    }

    public void deleteUser(long userId) {
    }
}
