package com.example.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.ForgotPasswordRequest;
import com.example.dto.ForgotPasswordResponse;
import com.example.entities.User;
import com.example.repository.UserRepository;

@Service
public class ForgotPasswordService {

    @Autowired
    private UserRepository userRepo;

    public ForgotPasswordResponse resetPassword(ForgotPasswordRequest req) {

        //  Fetch user	
        Optional<User> userOpt = userRepo.findById(req.getUserId());
        if (userOpt.isEmpty()) {
            return new ForgotPasswordResponse(
                "USER_NOT_FOUND",
                "User does not exist"
            );
        }

        User user = userOpt.get();

        //  Check if account locked
        if (Boolean.TRUE.equals(user.getAccountLocked())) {
            return new ForgotPasswordResponse(
                "ACCOUNT_LOCKED",
                "Maximum attempts exceeded. Please register again."
            );
        }

        // 3️⃣ Check security question safely
        Integer userQuestionId = (user.getQuestionId() != null) ? user.getQuestionId().getQuestionId() : null;
        Integer reqQuestionId = req.getQuestionId();

        if (userQuestionId == null || !userQuestionId.equals(reqQuestionId)) {
            return new ForgotPasswordResponse(
                "INVALID_QUESTION",
                "Security question mismatch"
            );
        }

        //  Check answer
        if (user.getQuestionAnswer() == null || 
            !user.getQuestionAnswer().equalsIgnoreCase(req.getAnswer())) {

            // increment attempts
            int attempts = (user.getForgotAttempts() != null ? user.getForgotAttempts() : 0) + 1;
            user.setForgotAttempts(attempts);

            // lock account if 3 attempts exceeded
            if (attempts >= 3) {
                user.setAccountLocked(true);
            }

            userRepo.save(user);

            return new ForgotPasswordResponse(
                "INVALID_ANSWER",
                attempts >= 3
                    ? "Maximum attempts exceeded. Please register again."
                    : "Incorrect answer. Attempts left: " + (3 - attempts)
            );
        }

        //  Correct answer → reset password
        user.setPassword(req.getNewPassword());
        user.setForgotAttempts(0);
        user.setAccountLocked(false);

        userRepo.save(user);

        return new ForgotPasswordResponse(
            "SUCCESS",
            "Password reset successfully"
        );
    }
}
