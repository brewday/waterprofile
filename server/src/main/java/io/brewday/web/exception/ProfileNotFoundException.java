package io.brewday.web.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "No WaterProfile with that id was found")
public class ProfileNotFoundException extends RuntimeException {
}
