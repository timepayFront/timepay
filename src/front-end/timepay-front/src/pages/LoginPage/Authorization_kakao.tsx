//카카오 로그인 페이지

const REST_API_KEY = 'e4cddb50924dd3b6c7e747fbb029acd6'; //카카오-타임페이 커뮤니티 REST API 앱 키
//const REDIRECT_URI = 'http://13.125.249.51/oauth/redirect/kakao';
const REDIRECT_URI = 'http://localhost/app/oauth/redirect/kakao';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default KAKAO_AUTH_URL;