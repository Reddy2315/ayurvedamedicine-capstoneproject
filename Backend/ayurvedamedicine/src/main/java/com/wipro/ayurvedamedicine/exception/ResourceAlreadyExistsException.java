package com.wipro.ayurvedamedicine.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceAlreadyExistsException extends Exception {
	public ResourceAlreadyExistsException(String message) {
        super(message);
    }
}
