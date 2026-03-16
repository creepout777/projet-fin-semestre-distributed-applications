package com.campusops.auth;

import com.campusops.auth.model.Role;
import com.campusops.auth.model.User;
import com.campusops.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class AdminBootstrap implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (!userRepository.existsByEmail("admin@campusops.com")) {
            User admin = User.builder()
                    .email("admin@campusops.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("Super")
                    .lastName("Admin")
                    .roles(Set.of(Role.ADMIN))
                    .build();
            userRepository.save(admin);
            System.out.println("Default Admin User Created: admin@campusops.com / admin123");
        }

        if (!userRepository.existsByEmail("student@campusops.com")) {
            User student = User.builder()
                    .email("student@campusops.com")
                    .password(passwordEncoder.encode("student123"))
                    .firstName("Demo")
                    .lastName("Student")
                    .roles(Set.of(Role.ETUDIANT))
                    .build();
            userRepository.save(student);
            System.out.println("Default Student User Created: student@campusops.com / student123");
        }

        if (!userRepository.existsByEmail("teacher@campusops.com")) {
            User teacher = User.builder()
                    .email("teacher@campusops.com")
                    .password(passwordEncoder.encode("teacher123"))
                    .firstName("Demo")
                    .lastName("Teacher")
                    .roles(Set.of(Role.ENSEIGNANT))
                    .build();
            userRepository.save(teacher);
            System.out.println("Default Teacher User Created: teacher@campusops.com / teacher123");
        }
    }
}
