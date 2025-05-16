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

# 환경 변수 전달 (Railway에서 설정된 값이 반영될 수 있도록 함)
# 이 방식은 빌드 타임이 아니라 실행 시 전달되어야 하므로,
# 실제로는 아래 ENV는 제거하고 docker run 시점에 전달하거나, Dockerfile에서는 설정하지 않습니다.
# Railway가 빌드 타임과 런타임을 분리하지 않기 때문에 필요 시 아래와 같이 ENV를 명시해야 할 수도 있습니다.

ENV MYSQLHOST=${MySQL.MYSQLHOST} \
    MYSQLUSER=${MySQL.MYSQLUSER} \
    MYSQLDATABASE=${MySQL.MYSQLDATABASE} \
    MYSQLPASSWORD=${MySQL.MYSQLPASSWORD} \
    MYSQLPORT=${MySQL.MYSQLPORT} \
    SERVER1=dev_test \
    SERVER2=$SERVER2

# 앱 실행
CMD ["node", "app.js"]
