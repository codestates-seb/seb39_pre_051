package com.codestates.pre51.users.repository;

import com.codestates.pre51.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByMemberEmail(String email);

    User findByMemberEmailAndMemberPassword(String email, String password);
}
