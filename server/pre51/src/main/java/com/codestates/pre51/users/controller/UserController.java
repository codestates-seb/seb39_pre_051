package com.codestates.pre51.users.controller;

import com.codestates.pre51.security.TokenProvider;
import com.codestates.pre51.users.dto.UserLoginDto;
import com.codestates.pre51.users.dto.UserPatchDto;
import com.codestates.pre51.users.dto.UserPostDto;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.mapper.UserMapper;
import com.codestates.pre51.users.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;
    private TokenProvider tokenProvider;

    // 가짜 데이터 넣기
    @PostConstruct
    public void init()   {
        for (int i=1; i<=10; i++) {
            User user = User.builder()
                    .userId(i)
                    .userName("김코딩" + i)
                    .userEmail("test" + i + "@gmail.com")
                    .userPassword("00000000" + i)
                    .userCreatedAt(LocalDateTime.now())
                    .userQuestions(new ArrayList<>(){})
                    .build();
            userService.createUser(user);
        }
    }

    @Autowired
    public UserController(UserService userService, UserMapper mapper, TokenProvider tokenProvider) {
        this.userService = userService;
        this.mapper = mapper;
        this.tokenProvider = tokenProvider;
    }

    // 회원가입
    @ApiOperation(value="회원 가입", notes = "회원-닉네임, 회원-이메일, 회원-비밀번호를 입력하여 회원가입을 합니다.")
    @PostMapping("/signup")
    public ResponseEntity postUser(@RequestBody @Valid UserPostDto userPostDto) {
        User user = mapper.userPostDtoToUser(userPostDto);

        User response = userService.createUser(user);
        return new ResponseEntity(mapper.userToUserResponseDto(response),
                HttpStatus.CREATED);
    }

    // 로그인
    @PostMapping("/login")
    @ApiOperation(value="로그인", notes = "회원-이메일과 회원-비밀번호를 입력해서 로그인을 합니다.")
    public ResponseEntity login(@RequestBody @Valid UserLoginDto userLoginDto) {

        User response = userService.getByCredentials(userLoginDto.getUserEmail(), userLoginDto.getUserPassword());

        return new ResponseEntity(mapper.userToUserResponseDto(response),
                HttpStatus.OK);

    }
    @ApiOperation(value="로그아웃")
    @PutMapping("/logout")
    public String logout() {
        return "로그아웃";
    }


    // 한 명의 사용자 정보 조회
    @ApiOperation(value="특정 회원 조회", notes = "회원-식별자를 이용하여 특정 회원을 조회합니다.")
    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@ApiParam("회원-식별자") @PathVariable("user-id") long userId)  {
        System.out.println("userId = " + userId);

        User response = userService.findUser(userId);

        return new ResponseEntity(mapper.userToUserResponseDto(response),
                HttpStatus.OK);
    }

    // 한 명의 사용자 정보 수정
    @ApiOperation(value="특정 회원 수정", notes = "회원-식별자와 수정데이터를 이용하여 특정 회원을 수정합니다.")
    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@ApiParam("회원-식별자") @PathVariable("user-id") long userId,
                            @RequestBody UserPatchDto userPatchDto)  {
        System.out.println("UserController.patchUser");

        userService.updateUser(userId , userPatchDto);
        User response = userService.findUser(userId);

        return new ResponseEntity<>(mapper.userToUserResponseDto(response),
                HttpStatus.OK);
    }

    // 한 명의 사용자 정보 삭제
    @ApiOperation(value="특정 회원 삭제", notes = "회원-식별자를 이용하여 특정 회원을 삭제합니다.")
    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@ApiParam("회원-식별자") @PathVariable("user-id") long userId)  {
        System.out.println("UserController.deleteUser");

        userService.deleteUser(userId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 테스트
    @PostMapping("/token")
    public String token() {
        return "<h1>token</h1>";
    }
}
