FROM gradle:7.4-jdk17-alpine as builder
WORKDIR /build
COPY ./timepay/ /build
RUN apk add gettext
RUN gradle -i build -x test --parallel

FROM openjdk:11-jdk
COPY --from=builder /build/build/libs/timepay-*-SNAPSHOT.jar /app.jar
#ARG JAR_FILE=build/libs/timepay-0.0.1-SNAPSHOT.jar
#ARG JAR_FILE=build/libs/timepay-0.0.1-SNAPSHOT.jar
#COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
