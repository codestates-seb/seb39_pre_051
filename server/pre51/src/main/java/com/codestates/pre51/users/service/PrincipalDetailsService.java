package com.codestates.pre51.users.service;

import com.codestates.pre51.config.jwt.PrincipalDetails;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User userEntity = userRepository.findByMemberEmail(username);
        return new PrincipalDetails(userEntity);
    }
}