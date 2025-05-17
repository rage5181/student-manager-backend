# Node.js 18 이미지 사용
FROM node:18

# 앱 디렉터리 생성 및 이동
WORKDIR /app

# package.json, package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 복사
COPY . .

# 앱 실행
CMD ["node", "app.js"]
