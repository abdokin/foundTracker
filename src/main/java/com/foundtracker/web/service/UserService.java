package com.foundtracker.web.service;

import com.foundtracker.web.dto.ChangePasswordDto;
import com.foundtracker.web.dto.EditProfileDto;
import com.foundtracker.web.dto.UserDto;
import com.foundtracker.web.exception.FieldsNotMatch;
import com.foundtracker.web.exception.IncorrectPasswordException;
import com.foundtracker.web.model.User;
import com.foundtracker.web.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public Page<UserDto> getAllUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return users.map(UserDto::mapToUserDto);
    }

    public void changePassword(ChangePasswordDto request) throws FieldsNotMatch, IncorrectPasswordException {
        var user = getCurrentUser();
        if (!request.getNewPassword().equals(request.getConfirmationPassword()))
            throw new FieldsNotMatch("newPassword", "confirmationPassword");
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword()))
            throw new IncorrectPasswordException();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        assert currentUser != null;

        return currentUser;
    }

    public UserDto editProfile(EditProfileDto input) {
        User user = userRepository.findById(getCurrentUser().getId()).orElseThrow();
        user.setEmail(input.getEmail());
        user.setFirstname(input.getFirstname());
        user.setLastname(input.getLastname());
        userRepository.save(user);
        updateAuthentication(user);
        return UserDto.mapToUserDto(user);
    }

    private void updateAuthentication(User updatedUser) {
        Authentication updatedAuthentication = new UsernamePasswordAuthenticationToken(updatedUser,
                updatedUser.getPassword(), ((UserDetails) updatedUser).getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
    }
}
