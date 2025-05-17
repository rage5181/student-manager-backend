# 1. Node.js 베이스 이미지 사용
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 패키지 복사 및 설치
COPY package*.json ./
RUN npm install

# 4. 앱 코드 복사
COPY . .

# 5. 실행 (빌드 타임에 ENV 넣지 않고 런타임에 Railway가 환경변수 주입함)
CMD ["node", "app.js"]
