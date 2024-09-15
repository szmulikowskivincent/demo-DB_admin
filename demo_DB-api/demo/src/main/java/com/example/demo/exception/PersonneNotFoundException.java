package com.example.demo.exception;

public class PersonneNotFoundException extends RuntimeException {
    public PersonneNotFoundException(String message) {
        super(message);
    }
}
