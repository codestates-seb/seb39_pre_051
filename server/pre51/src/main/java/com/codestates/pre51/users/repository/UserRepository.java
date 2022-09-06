package com.codestates.pre51.users.repository;

import com.codestates.pre51.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserEmail(String email);

    User findByUserId(long userId);
    User findByUserEmailAndUserPassword(String email, String password);

}
