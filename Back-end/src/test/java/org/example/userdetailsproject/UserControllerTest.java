package org.example.userdetailsproject;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.example.userdetailsproject.controller.UserControllerIntr;
import org.example.userdetailsproject.entity.UserEntity;
import org.example.userdetailsproject.userservice.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    @Mock
    private UserService userService;

    @InjectMocks
    private UserControllerIntr userControllerIntr;


    UserEntity testUser ;

    @BeforeEach
    public void setup() {
        objectMapper = new ObjectMapper().registerModule(new JavaTimeModule())
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        mockMvc = MockMvcBuilders.standaloneSetup(userControllerIntr).build();


        testUser = new UserEntity(1L, "Sai", "Krishna", "sai.krishna@example.com", "Active", "+1234567890", LocalDate.of(1982, 1, 1), "123 Main St, NewYork, NY 12345");
    }

    @Test
    public void testCreateUser() throws Exception {
        mockMvc = MockMvcBuilders.standaloneSetup(userControllerIntr).build();

        given(userService.save(any(UserEntity.class))).willReturn(testUser);

        mockMvc.perform(post("/userdetails/createuser")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().registerModule(new JavaTimeModule())
                                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                                .writeValueAsString(testUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Sai"))
                .andExpect(jsonPath("$.lastName").value("Krishna"));
    }



    @Test
    public void testGetAllUsers() throws Exception {
        given(userService.findAll()).willReturn(Collections.singletonList(testUser));

        mockMvc.perform(get("/userdetails/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].firstName", is(testUser.getFirstName())));
    }

    @Test
    public void testUpdateUser() throws Exception {
        UserEntity updatedUser = new UserEntity(1L, "Jane", "Doe", "jane.doe@example.com", "Active", "+1234567890", LocalDate.of(1985, 1, 1), "456 Elm St, Anytown, AN 12345");
        given(userService.updateUser(anyLong(), any(UserEntity.class))).willReturn(updatedUser);

        mockMvc.perform(put("/userdetails/users/{id}", testUser.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().registerModule(new JavaTimeModule())
                                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
                                .writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName", is(updatedUser.getFirstName())))
                .andExpect(jsonPath("$.lastName", is(updatedUser.getLastName())));
    }

    @Test
    public void testDeleteUser() throws Exception {
        willDoNothing().given(userService).deleteUser(anyLong());

        mockMvc.perform(delete("/userdetails/users/{id}", testUser.getId()))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testFindUsersByFirstName() throws Exception {
        given(userService.findUsersByFirstName(anyString())).willReturn(Collections.singletonList(testUser));

        mockMvc.perform(get("/userdetails/users/search/byFirstName")
                        .param("firstName", testUser.getFirstName()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].firstName", is(testUser.getFirstName())));
    }

    @Test
    public void testFindUserById() throws Exception {
        given(userService.findUserById(anyLong())).willReturn(Optional.of(testUser));

        mockMvc.perform(get("/userdetails/users/{id}", testUser.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(testUser.getId().intValue())));
    }

}
