package com.codestates.pre51.users.service;

import com.codestates.pre51.users.dto.UserPatchDto;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    public User createUser(User user) {

        // 회원 미존재
        if (user == null || user.getMemberEmail() == null) {
            throw new RuntimeException("Invalid arguments");
        }

        // 기존 이메일 존 / 회원 생성 실패
        User findUser = userRepository.findByMemberEmail(user.getMemberEmail());
        if (findUser != null)
            throw new IllegalStateException("이미 가입된 회원입니다.");

        // DB에 회원 정보 저장
        return userRepository.save(user);
    }

    public User getByCredentials(String email, String password) {
        return userRepository.findByMemberEmailAndMemberPassword(email, password);
    }

    public void updateUser(long userId, UserPatchDto user) {
        User findUser = userRepository.findById(userId).get();
        if (user.getMemberName() != null)
            findUser.setMemberName(user.getMemberName());
        if (user.getMemberPassword() != null)
            findUser.setMemberPassword(user.getMemberPassword());
    }

    public User findUser(long userId) {
        Optional<User> optional = userRepository.findById(userId);

        return optional.get();
    }

    public void deleteUser(long userId) {
    }
}
