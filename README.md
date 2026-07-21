# 바이오프로테크 홈페이지 v3-3-6 — Apple 스타일

v3-1 Apple Design System 토큰(흰 캔버스 + 잉크 블랙 #1d1d1f + Apple Blue #0071e3 단일 액센트 + 시네마틱 다크 히어로 + 980px 필 버튼 + 18px 라운드 카드 + 라이트 푸터)을 유지하되, 메인 페이지를 단(段) 구조로 재구성한 버전. 테마는 `Bioprotech Design System/colors_and_type.css`(토큰)와 `assets/css/theme-apple.css`(컴포넌트 오버라이드) 두 파일로 구성됨.

## v3-3-5 → v3-3-6 변경 사항

- **스페인어(ES) 추가** — 기존 한국어(KO)/영문(EN) 2개 언어에 **스페인어**를 더해 3개 언어 지원. 헤더 언어 토글에 `ES` 버튼 추가(KO / EN / ES), `localStorage`로 선택 유지.
- **적용 범위** — 전체 페이지. 공통(헤더·내비게이션·푸터, `chrome.js`)과 메인 페이지, 하위 페이지(회사소개·연혁·글로벌·연구개발·품질·제품·뉴스·자료실·고객지원·문의·검색·약관·404) 본문, 데이터 파일(`products.json`·`news.json`·`faq.json`)·`i18n.json`까지 스페인어 번역 포함.
- **메커니즘** — 본문은 `.es-only` 클래스(`site.css`의 `body[data-lang="es"]` 표시 규칙), 데이터는 각 다국어 객체에 `es` 키, JS UI 문자열은 3개국어 분기로 처리.
- ※ 스페인어 번역은 기계 번역 초안 수준이므로, 공개 전 원어민/전문 검수 권장.

## v3-3 → v3-3-5 변경 사항

- **폰트 통일** — 본문·제목을 모두 **Pretendard**로 적용. 제목용 IBM Plex Sans KR 참조(`--bp-font-head`)와 웹폰트 `@import`를 제거하고, 모노(IBM Plex Mono)만 유지.

## v3-2 → v3-3 변경 사항

- **히어로 텍스트 중앙정렬** — 최상단 이미지 위 태그·제목·설명·버튼·인디케이터를 중앙 정렬.
- **히어로 설명 문구 축소** — 가운데 설명을 한 줄(KO/EN 각 1문장)로 정리.
- **헤더 로고 교체** — 좌측 상단 "BP" 텍스트 마크를 바이오프로테크 실제 로고 이미지(`assets/img/bioprotech-logo.png`, 흰 배경을 투명 처리)로 변경.
- **헤더 워드마크 정리** — 로고 옆 표기를 영문 "Bioprotech"만 남기고 하단 "Bio sensors & Bio products" 보조 문구 삭제.
- 글로벌 섹션 세계지도(반전 이미지 + 진출국 마커)·폰트·단 구조 등 v3-2 구성은 그대로 유지.

## v3-1 → v3-2 변경 사항

- **좌측 고정 사이드박스 제거** — 메인 페이지의 2단(사이드바 + 콘텐츠) 그리드를 전폭(full-width) 레이아웃으로 전환. 사이드바 전용 폰트·텍스트도 함께 제거.
- **전체 폰트 교체** — Bioprotech Research PPTX 디자인 폰트 적용: 본문 Pretendard, 제목 IBM Plex Sans KR, 모노 IBM Plex Mono. `colors_and_type.css`의 `--bp-font-family`·`--bp-font-head`로 전 페이지에 일괄 적용됨.
- **메인 페이지 단 구조** — ① 히어로(배경 이미지 순차 전환 + 제품 카테고리 탭) → ② 회사 설명 + 통계 → ③ 글로벌 진출 현황(세계지도 + 4개 법인) → ④ 뉴스·공지(`news.json` 연동) → ⑤ 인증 현황 → 하단 푸터(회사 주소).
- **세계지도** — 진출국(한국·미국·중국 연태/광저우)을 마커로 표시한 인라인 SVG. 배경 그라데이션·위경도 그리드·거점 연결선·펄스 애니메이션 포함.
- 배경 이미지 순차 전환(5초)·언어 스위처(KO/EN)·반응형 등 기존 기능은 그대로 유지.

---

## 실행 방법

CORS 제한으로 JSON fetch가 `file://`에서 차단되므로 로컬 HTTP 서버로 실행 필요.

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .
```

브라우저에서 `http://localhost:8000/` 접속.

---

## 파일 구조

```
/
├── index.html                  메인 홈
├── search.html                 통합 검색
├── 404.html                    에러 페이지
├── sitemap.xml · robots.txt    SEO
│
├── products/
│   ├── index.html              전체 제품 카탈로그
│   ├── category.html?cat=xxx   카테고리별 목록
│   └── detail.html?id=xxx      제품 상세 (21건 데이터 연동)
│
├── company/
│   ├── about.html              회사소개
│   ├── history.html            연혁
│   ├── global.html             글로벌 네트워크
│   ├── rnd.html                연구개발
│   └── quality.html            품질·인증
│
├── news/
│   ├── index.html              뉴스 목록 (태그 필터)
│   └── detail.html?id=xxx      뉴스 상세
│
├── support/
│   ├── faq.html                FAQ (카테고리·검색)
│   └── contact.html            문의 양식
│
├── downloads/
│   └── index.html              자료실
│
├── legal/
│   ├── privacy.html            개인정보처리방침
│   └── terms.html              이용약관
│
├── assets/
│   ├── css/site.css            공통 스타일 (헤더·푸터·폼 등)
│   ├── js/chrome.js            공통 크롬 주입 (i18n·mobile nav·lang toggle)
│   └── data/
│       ├── products.json       21개 제품 데이터
│       ├── news.json           뉴스 스텁
│       ├── faq.json            8개 FAQ
│       └── i18n.json           KO/EN 사전
│
└── Bioprotech Design System/   원본 디자인 시스템 (건드리지 않음)
    ├── colors_and_type.css     컬러 토큰 + 타입 스케일
    └── assets/                 로고·히어로·제품 placeholder 이미지
```

---

## 구현된 기능

- 공통 헤더·푸터 자동 주입 (`chrome.js`)
- **언어 스위처 KO ↔ EN** — localStorage 저장, 전체 페이지 텍스트 전환
- 모바일 햄버거 메뉴
- 메인 히어로 슬라이드쇼 (5초 자동 전환)
- 제품 데이터 구동 — 카탈로그 → 카테고리 → 상세 3단계 네비게이션
- 뉴스 태그 필터
- FAQ 카테고리 탭 + 실시간 검색
- 통합 검색 (제품·뉴스·FAQ 교차 검색 + 하이라이트)
- 문의 폼 — 유효성 검증, 제품 드롭다운 자동 생성, 성공/에러 피드백
- 반응형 (900px 이하 모바일 레이아웃)
- SEO — sitemap.xml, robots.txt, 페이지별 meta description
- 404 페이지

---

## 공란(콘텐츠 대기 중) 항목

콘텐츠가 확정되지 않은 영역은 `.placeholder-empty` 또는 `.placeholder-img` 컴포넌트로 표시됨.

### 공란 처리된 항목
- **제품 상세**: 메인 이미지 4종, 스펙 테이블 7개 필드, 설명 본문, 카탈로그/SDS PDF
- **회사소개**: CEO 초상 사진, 대표이사 메시지 본문, 대표이사 성명
- **글로벌**: 미국·중국 3개 법인 주소, 지도 embed
- **품질·인증**: 인증서 PDF 다운로드 링크
- **자료실**: 카탈로그·SDS·인증서·마케팅 자료 PDF 전체
- **뉴스**: 본문 콘텐츠 (제목·요약만 스텁으로 존재)
- **개인정보처리방침**: 개인정보 보호책임자 정보
- **로고**: BP 텍스트 워드마크 플레이스홀더 (실 로고 PNG 대체 필요)

### 반영 방법
- `assets/data/products.json` — 제품별 `description`, `specs`, `images`, `downloads` 필드 추가
- `assets/data/news.json` — `body` 필드(HTML) 추가
- `products/detail.html` — 이미지 placeholder를 실제 `<img src>`로 교체
- `company/about.html` — CEO 메시지 영역의 placeholder를 텍스트로 교체

---

## 문의 폼 실제 전송

현재 `support/contact.html`의 폼 제출은 콘솔 출력 + 성공 메시지만 표시하는 데모 상태.
실 서비스에 연결하려면 다음 중 하나 선택:

1. **Formspree** — `<form>` 태그의 action을 `https://formspree.io/f/{FORM_ID}`로 교체
2. **Resend / SendGrid API** — 서버리스 함수(Vercel/Cloudflare Workers)에 폼 데이터 전달
3. **자체 SMTP** — 서버 측 `/api/inquiry` 엔드포인트 구현

`support/contact.html` 하단 스크립트의 `fetch(...)` 주석 처리된 라인을 해제하고 URL 지정.

---

## 다음 단계 권장

1. 제품 사진 21종 수급 및 업로드
2. 카탈로그·SDS PDF 수급 및 `assets/downloads/` 게시
3. 문의 폼 백엔드 연동 (Formspree 권장)
4. Google Analytics 4 스니펫 삽입
5. 실 도메인 + Vercel/Cloudflare Pages 배포
6. 법무 검토 후 privacy/terms 본문 확정
