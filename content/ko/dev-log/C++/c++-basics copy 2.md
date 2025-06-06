---
title: "C++ 기초: 시작하기"
date: 2024-06-06
draft: false
tags: ["C++", "프로그래밍", "기초"]
categories: ["기술"]
---

# C++ 기초: 시작하기

C++는 강력하고 유연한 프로그래밍 언어로, 시스템 프로그래밍부터 게임 개발까지 다양한 분야에서 사용됩니다. 이 글에서는 C++의 기본 개념과 특징을 살펴보겠습니다.

## C++의 특징

1. **객체 지향 프로그래밍**
   - 클래스와 객체를 통한 데이터 캡슐화
   - 상속과 다형성 지원
   - 재사용 가능한 코드 작성

2. **저수준 메모리 관리**
   - 직접적인 메모리 접근
   - 포인터를 통한 메모리 조작
   - 효율적인 리소스 관리

3. **템플릿 프로그래밍**
   - 제네릭 프로그래밍 지원
   - 타입에 독립적인 코드 작성
   - STL(Standard Template Library) 활용

## 기본 문법 예제

```cpp
#include <iostream>

int main() {
    // 변수 선언과 초기화
    int number = 42;
    double pi = 3.14159;
    std::string message = "Hello, C++!";

    // 출력
    std::cout << "Number: " << number << std::endl;
    std::cout << "Pi: " << pi << std::endl;
    std::cout << "Message: " << message << std::endl;

    // 조건문
    if (number > 40) {
        std::cout << "Number is greater than 40" << std::endl;
    }

    // 반복문
    for (int i = 0; i < 5; i++) {
        std::cout << "Count: " << i << std::endl;
    }

    return 0;
}
```

## 클래스 예제

```cpp
class Person {
private:
    std::string name;
    int age;

public:
    // 생성자
    Person(const std::string& n, int a) : name(n), age(a) {}

    // 메서드
    void introduce() {
        std::cout << "안녕하세요, 저는 " << name << "이고 " 
                  << age << "살입니다." << std::endl;
    }
};
```

## 다음 단계

C++를 더 깊이 배우기 위해서는 다음과 같은 주제들을 공부해보세요:

1. 포인터와 참조
2. STL 컨테이너와 알고리즘
3. 예외 처리
4. 템플릿과 제네릭 프로그래밍
5. 스마트 포인터
6. 람다 표현식

## 결론

C++는 강력한 언어이지만, 그만큼 배우기 어려운 언어이기도 합니다. 하지만 기본을 잘 다지고 차근차근 공부한다면, 프로그래밍의 새로운 세계를 경험할 수 있을 것입니다.

다음 글에서는 C++의 포인터와 메모리 관리에 대해 자세히 다루도록 하겠습니다. 