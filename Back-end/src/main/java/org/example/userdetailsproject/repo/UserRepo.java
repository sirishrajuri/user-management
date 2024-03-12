package org.example.userdetailsproject.repo;

import org.example.userdetailsproject.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {

    @Query("Select u from UserEntity u where u.firstName like %:firstName%")
    List<UserEntity> findByFirstName( @Param("firstName") String firstName);
}
