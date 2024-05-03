package com.foundtracker.web.service;

import com.foundtracker.web.dto.ChangePasswordDto;
import com.foundtracker.web.dto.EditProfileDto;
import com.foundtracker.web.dto.UserDto;
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

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;


    public Page<UserDto> getAll(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return  users.map(UserDto::mapToUserDto);
    }

    public void changePassword(ChangePasswordDto request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        userRepository.save(user);
    }
    public  User getCurrentUser() throws IllegalStateException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        if (currentUser == null) {
            throw new IllegalStateException("Current user is null");
        }
        currentUser.setTokens(null);
        currentUser.setItems(null);
        currentUser.setReclamations(null);
        return currentUser;
    }
    public UserDto editProfile(EditProfileDto input) {
        User user = userRepository.findById(getCurrentUser().getId()).orElseThrow(); // TODO :
        user.setEmail(input.getEmail());
        user.setFirstname(input.getFirstname());
        user.setLastname(input.getLastname());
        userRepository.save(user);
        updateAuthentication(user);
        return UserDto.mapToUserDto(user);
    }
    private void updateAuthentication(User updatedUser) {
        Authentication updatedAuthentication = new UsernamePasswordAuthenticationToken(updatedUser, updatedUser.getPassword(), ((UserDetails) updatedUser).getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(updatedAuthentication);
    }
}
