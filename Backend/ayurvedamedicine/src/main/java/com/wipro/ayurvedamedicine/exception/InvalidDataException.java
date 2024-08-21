package com.wipro.ayurvedamedicine.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidDataException extends Exception {

	public InvalidDataException(String message) {
		super(message);
	}
}
