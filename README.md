# 공수뚝딱 개인정보처리방침

Google Play 등록에 필요한 개인정보처리방침 페이지다.
**외부 리소스가 하나도 없는 단일 HTML** 이라 GitHub Pages 에 그대로 올라간다.

- 공개 주소: https://loadguess-cyber.github.io/gongsu-privacy/
- 앱: 공수뚝딱 (`com.iroir.gongsu`) — 근로자 본인용 공수·급여 기록
- 문의: loadguess@gmail.com

## 고칠 때

`index.html` 하나만 고치고 밀어 넣으면 바로 반영된다.

```
git add index.html
git commit -m "방침 수정"
git push
```

시행일과 맨 아래 최종 수정일도 같이 고칠 것.

## 원본 위치

이 파일들의 정본은 앱 프로젝트 안에 있다.

```
클로드 앱메이킹\공수뚝딱\privacy-policy-site\
```

## ⚠ 앱이 바뀌면 방침도 바꿔야 한다

- **광고(AdMob)를 넣으면** → 5항(광고) 개정, Play 데이터 안전에 광고 식별자 추가
- **팀 연동(카카오 로그인·서버 전송)을 켜면** → 전면 개정.
  '수집하지 않습니다' 가 거짓이 되고, 제3자(카카오·Supabase)·국외 이전·계정 삭제 방법을 넣어야 한다.
  자세한 목록은 앱 프로젝트의 `SYNC_PLAN.md` 참고
