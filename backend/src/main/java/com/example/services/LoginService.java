//package com.example.services;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.dto.LoginRequest;
//import com.example.dto.LoginResponse;
//import com.example.entities.Mess;
//import com.example.entities.User;
//import com.example.repository.MessRepository;
//import com.example.repository.UserRepository;
//
//@Service
//public class LoginService {
//
//    @Autowired
//    UserRepository urepo;
//
//    @Autowired
//    MessRepository messRepo;
//
//    public LoginResponse login(LoginRequest request) {
//
//        User user = urepo.findByUserName(request.getUserName());
//        LoginResponse response = new LoginResponse();
//
//        if (user == null) {
//            response.setStatus("USER_NOT_FOUND");
//            return response;
//        }
//
//        if (!user.getPassword().equals(request.getPassword())) {
//            response.setStatus("INVALID_PASSWORD");
//            return response;
//        }
//
//        // ✅ BASIC USER INFO
//        response.setStatus("SUCCESS");
//        response.setUid(user.getUserid());
//        response.setUname(user.getUserName());
//        response.setRole(user.getRoleId().getRoleName());
//
//        // ✅ FETCH MESS ONLY FOR MESS OWNER
//        if ("MESSOWNER".equalsIgnoreCase(response.getRole())) {
//
//            Mess mess = messRepo.findByUserId(user); 
//
//            if (mess != null) {
//                System.out.println("FOUND MESS ID = " + mess.getMessId());
//                response.setMessId(mess.getMessId());
//            }
//        }
//
//        return response;
//    }
//}
package com.example.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dto.LoginRequest;
import com.example.dto.LoginResponse;
import com.example.entities.User;
import com.example.repository.UserRepository;
@Service
public class LoginService {

    @Autowired
    UserRepository urepo;

    public LoginResponse login(LoginRequest request) {

        LoginResponse response = new LoginResponse();
        User user = urepo.findByUserName(request.getUserName());

        // User not found
        if (user == null) {
            response.setStatus("USER_NOT_FOUND");
            return response;
        }

        // Rejected by admin
        if ("REJECTED".equalsIgnoreCase(user.getStatus())) {
            response.setStatus("ACCESS_DENIED");
            return response;
        }

        // Pending approval
        if ("PENDING".equalsIgnoreCase(user.getStatus())) {
            response.setStatus("NOT_APPROVED");
            return response;
        }

        // Allow ONLY approved users
        if (!"APPROVED".equalsIgnoreCase(user.getStatus())) {
            response.setStatus("ACCESS_DENIED");
            return response;
        }

        // Password check
        if (!user.getPassword().equals(request.getPassword())) {
            response.setStatus("INVALID_PASSWORD");
            return response;
        }

        //  SUCCESS
        response.setStatus("SUCCESS");
        response.setUid(user.getUserid());
        response.setUname(user.getUserName());
        response.setRole(user.getRoleId().getRoleName());

        return response;
    }
}
