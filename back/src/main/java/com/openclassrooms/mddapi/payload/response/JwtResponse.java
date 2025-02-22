package com.openclassrooms.mddapi.payload.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;

    public JwtResponse(String accessToken, Long id, String username) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
    }


}
