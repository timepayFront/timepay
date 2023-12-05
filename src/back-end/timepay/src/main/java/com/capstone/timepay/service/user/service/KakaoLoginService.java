package com.capstone.timepay.service.user.service;
import com.capstone.timepay.domain.user.User;
import com.capstone.timepay.domain.user.UserRepository;

import com.capstone.timepay.domain.userProfile.UserProfile;
import com.capstone.timepay.domain.userProfile.UserProfileRepository;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class KakaoLoginService {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserProfileRepository userProfileRepository;

    public  String getKaKaoAccessToken(String code){
        String access_Token="";
        String refresh_Token ="";
        String line = "";
        String result = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";
        try{
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=" + System.getenv("KAKAO_CLIENT_ID"));
            //sb.append("&client_id=79587b639a3a9ca1c9433fa63bc55863");
            //sb.append("&redirect_uri=http://localhost:8080/oauth/redirect/kakao"); // 서버 로컬 테스트용
            //sb.append("&redirect_uri=http://localhost:3000/oauth/redirect/kakao"); // 프론트 로컬 테스트용
            //sb.append("&redirect_uri=http://13.125.249.51/oauth/redirect/kakao"); // 배포할 때 이 코드 사용
            sb.append("&redirect_uri=");
            sb.append(System.getenv("KAKAO_TOKEN_REDIRECT_URI")); // 배포할 때 이 코드 사용
            sb.append("&code=" + code);
            bw.write(sb.toString());
            bw.flush();

            int responseCode = conn.getResponseCode();
            // System.out.println("responseCode : " + responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            access_Token = element.getAsJsonObject().get("access_token").getAsString();
            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();

            System.out.println("access_token : " + access_Token);
            System.out.println("refresh_token : " + refresh_Token);

            br.close();
            bw.close();
        }catch (IOException e) {
            if(logger.isErrorEnabled()) {
                logger.error("FAILED WHEN GET ACCESS TOKEN = ", e);
            }
            // e.printStackTrace();
            throw new IllegalArgumentException("code is not valid");
        }

        return access_Token;
    }

    @Transactional
    public User createKakaoUser(String token) { // throws BaseException 오류나와서 보류
        String reqURL = "https://kapi.kakao.com/v2/user/me";
        String email = null;
        String sex = null;
        User kakaoUser = null;
        String Key = System.getenv("KAKAO_CLIENT_ID");

        if(token == null || token == "") {
            throw new IllegalArgumentException("access token must be has values.");
        }

        //access_token을 이용하여 사용자 정보 조회

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송

            //결과 코드가 200이라면 성공
            int responseCode = conn.getResponseCode();
            System.out.println("responseCode : " + responseCode);

            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }
            System.out.println("response body : " + result);

            //Gson 라이브러리로 JSON파싱
            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String password = null;



            boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();

            /* email 값 비교하여 중복된 데이터는 데이터베이스에 저장X */
            //if(hasEmail) {
                /* 이메일 가져오기 */
                //email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
                email = element.getAsJsonObject().get("id") + "@kakao.com";
                kakaoUser = userRepository.findByEmail(email).orElse(null);
                password = email + Key;
                if (kakaoUser == null) {
                    /* 성별 제공 여부 확인 및 성별 가져오기 */
                    boolean hasSex = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_gender").getAsBoolean();
                    if (hasSex) {
                        if(element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("gender_needs_agreement").getAsBoolean())
                            sex = "성별 동의하지 않음";
                        else
                            sex = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("gender").getAsString();

                    } else {
                        sex = "성별 데이터가 없음";
                    }

                    /* 생일 제공 여부 확인 및 생일 가져오기 */
                    /* 생년월일은 회원가입 폼에서 받기로 함 */
//                    boolean hasBirthday = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_birthday").getAsBoolean();
//                    if (hasBirthday) {
//                        birthday = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("birthday").getAsString();
//                    } else {
//                        birthday = "생일 동의하지 않음";
//                    }

                    String encodedPassword = passwordEncoder.encode(password);



                    User userTmp = createKakaoUsers(email, sex, encodedPassword);



                    System.out.println("email : " + userTmp.getEmail());
                    System.out.println("gender : " + userTmp.getSex());
                    System.out.println("회원가입 ~!!!");

                    return userTmp;

                }
                else if (!kakaoUser.isSignUp()) {
                    System.out.println("\n이미 회원가입 신청한 계정이래요~\n");

                    User user = userRepository.findByEmail(email).orElseThrow(IllegalArgumentException::new);
                    System.out.println("id : " + user.getUserId());
                    System.out.println("email : " + user.getEmail());
                    System.out.println("gender : " + user.getSex());

                    return user;
                } else {
                    System.out.println("\n이미 가입된 계정이래요~\n");
                }


                br.close();
            //} else{
                /* 이메일 항목을 동의하지 않으면 null 값을 리턴받음 */
                /* null 값을 리턴받으면 회원가입이 불가능함 */
                /* 즉 이메일 항목을 동의하지 않으면 회원가입 불가능 */
            //    return null;
            //}

        } catch (IOException e) {
            if(logger.isErrorEnabled()) {
                logger.error("faield when request user info by access token : ", e);
            }
            // e.printStackTrace();
            throw new IllegalArgumentException("access token is not valid");
        }

        return kakaoUser;
    }

    @Transactional
    /* 데이터베이스 추가 작업 */
    public User createKakaoUsers(String email, String sex, String encodePassword){
        return userRepository.save(User.builder()
                .email(email).sex(sex)
                .encodedPassword(encodePassword)
                .roles(Collections.singletonList("ROLE_USER"))
                .userProfile(userProfileRepository.save(new UserProfile()))
                .bookmark("")
                .build());
    }

    public boolean isUser(String email){
        if(userRepository.findByEmail(email).orElse(null) == null)
            return false;
        return true;
    }

}
