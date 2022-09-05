package com.codestates.pre51.security;

import com.codestates.pre51.users.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;

@Service
public class SecurityService {
    private final String SECRET_KEY = "vkaniddpVNKLDVNLnvlkKNDLVkvnlKNDVP124NLDVvkm";
    private final UserRepository userRepository;

    public SecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 로그인 할때 같이
    public String createToken(String subject, long expTime){
        if(expTime<=0){
            throw new RuntimeException("만료시간이 0 이상이어야 함");
        }
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        byte[] securityBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(securityBytes,signatureAlgorithm.getJcaName());

        return Jwts.builder()
                .setSubject(subject)
                .claim("userImgUrl", userRepository.findByUserId(Long.valueOf(subject)).getUserImgUrl())
                .signWith(signingKey,signatureAlgorithm)
                .setExpiration(new Date(System.currentTimeMillis()+expTime))
                .compact();
    }

    // 토큰 검증 메서드를 boolean으로 리턴
    public String getSubject(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    // 리프레시 토큰 생성
    public String createRefreshToken() {
        Date now = new Date();
        int refreshTokenValidMillisecond = 1000 * 60 * 10;
        return Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenValidMillisecond))
                .compact();
    }
}
