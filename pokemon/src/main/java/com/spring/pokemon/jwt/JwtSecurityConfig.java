package com.spring.pokemon.jwt;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.UUID;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.jdbc.JdbcDaoImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
//@EnableMethodSecurity(jsr250Enabled = true, securedEnabled = true)
public class JwtSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable) // (1)
                .sessionManagement(
                        session -> 
                            session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS)) // (2)
                .authorizeHttpRequests(
                        auth -> 
                            auth.requestMatchers("/", //#CHANGE
                            		"/authenticate", "/actuator", "/actuator/*")
                                .permitAll()
//                                .requestMatchers("/h2-console/**")
//                                .permitAll()
                                .requestMatchers(HttpMethod.OPTIONS,"/**")
                                .permitAll()
                                .anyRequest()
                                .authenticated()) // (3)
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(withDefaults())) // (4)
                .exceptionHandling(
                        (ex) -> 
                            ex.authenticationEntryPoint(
                                new BearerTokenAuthenticationEntryPoint())
                              .accessDeniedHandler(
                                new BearerTokenAccessDeniedHandler()))
                .httpBasic(
                        withDefaults()) // (5)
                .headers(header -> header.frameOptions(frameOptionsConfig -> frameOptionsConfig.sameOrigin()))
//        		.csrf().disable()
        		
//        		http.headers().frameOptions().sameOrigin();
        		
//        		.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService) {
        var authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public UserDetailsService userDetailsService(DataSource dataSource) {
//		var user = User
//				.withUsername("keith")
//				.password("dummy")
//				.passwordEncoder(str -> passwordEncoder().encode(str))
//				.roles("USER")
//				.build();
//		
//		var admin = User
//				.withUsername("in28minutes")
//				.password("dummy")
//				.passwordEncoder(str -> passwordEncoder().encode(str))
//				.roles("USER")
//				.build();
//		
//		var jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
//		jdbcUserDetailsManager.createUser(user);
//		jdbcUserDetailsManager.createUser(admin);
//		return jdbcUserDetailsManager;
        UserDetails user = User.withUsername("in28minutes")
                                .password("{noop}dummy1poke")
                                .authorities("read")
                                .roles("USER")
                                .build();
        UserDetails user2 = User.withUsername("keith")
                .password("{noop}dummy1poke")
                .authorities("read")
                .roles("USER")
                .build();
        UserDetails user3 = User.withUsername("computer")
                .password("{noop}dummy1poke")
                .authorities("read")
                .roles("USER")
                .build();
        return new InMemoryUserDetailsManager(user, user2, user3);
    }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        JWKSet jwkSet = new JWKSet(rsaKey());
        return (((jwkSelector, securityContext) 
                        -> jwkSelector.select(jwkSet)));
    }

    @Bean
    JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    JwtDecoder jwtDecoder() throws JOSEException {
        return NimbusJwtDecoder
                .withPublicKey(rsaKey().toRSAPublicKey())
                .build();
    }
    
    @Bean
    public RSAKey rsaKey() {
        
        KeyPair keyPair = keyPair();
        
        return new RSAKey
                .Builder((RSAPublicKey) keyPair.getPublic())
                .privateKey((RSAPrivateKey) keyPair.getPrivate())
                .keyID(UUID.randomUUID().toString())
                .build();
    }

    @Bean
    public KeyPair keyPair() {
        try {
            var keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalStateException(
                    "Unable to generate an RSA Key Pair", e);
        }
    }
    
//	@Bean
//	public DataSource dataSource() {
//		return new EmbeddedDatabaseBuilder()
//				.setType(EmbeddedDatabaseType.H2)
//				.addScript(JdbcDaoImpl.DEFAULT_USER_SCHEMA_DDL_LOCATION)
//				.build();
//	}
//    
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
