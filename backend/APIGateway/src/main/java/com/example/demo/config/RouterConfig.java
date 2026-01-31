package com.example.demo.config;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class RouterConfig {
	@Bean
	public RouteLocator createRoutes(RouteLocatorBuilder builder) {
		
		return builder.routes()
			   .route("Authentication", r-> r.path("/user/**")
					   .uri("http://localhost:2026"))
					   //.uri("lb://Authentication"))
			   .route("Admin", r->r.path("/api/admin/**")
					   //.uri("http://localhost:8082"))
					   .uri("lb://Admin"))
			   .route("MessOwner", r->r.path("/api/messowner/**")
					   //.uri("http://localhost:8082"))
					   .uri("lb://MessOwner"))
			   .route("Customer", r->r.path("/api/customer/**")
					   //.uri("http://localhost:8082"))
					   .uri("lb://Customer"))
			   .build();
		
	}
	
	@Bean
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // Ensure it matches your frontend URL
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}
}
