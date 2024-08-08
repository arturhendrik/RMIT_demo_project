FROM maven:3.9.8-eclipse-temurin-21 AS builder

COPY src /home/app/src
COPY pom.xml /home/app

WORKDIR /home/app
RUN mvn clean package -DskipTests

FROM openjdk:21
COPY --from=builder /home/app/target/*.jar /usr/app/app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/app/app.jar"]